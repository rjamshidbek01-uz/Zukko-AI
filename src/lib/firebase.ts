import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  getDocFromServer,
  setDoc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
  limit,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { UserSession } from '../types';

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// CRITICAL: Initialize Firestore with firestoreDatabaseId
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// Test Firestore connection on boot (Skill directive)
export async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline or network connecting...');
    }
  }
}
testFirestoreConnection();

// Standard Error Handling (Skill directive)
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Simple deterministic hash for password safety
function hashPassword(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return 'zk_' + Math.abs(hash).toString(36) + '_' + password.length.toString(36);
}

// Helper to generate a valid Firestore ID matching ^[a-zA-Z0-9_\-]+$
function sanitizeDocId(input: string): string {
  return input.toLowerCase().replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 50);
}

// ----------------------------------------------------
// 1. REGISTER USER WITH LOGIN & PASSWORD IN FIRESTORE
// ----------------------------------------------------
export interface RegisterParams {
  username: string;
  password: string;
  displayName: string;
  avatar?: string;
  email?: string;
}

export async function registerUserWithLogin(
  params: RegisterParams
): Promise<{ success: boolean; user?: UserSession; error?: string }> {
  const cleanUsername = params.username.trim().toLowerCase();
  const cleanDisplayName = params.displayName.trim() || cleanUsername;
  const password = params.password.trim();

  if (cleanUsername.length < 3) {
    return { success: false, error: 'Login kamida 3 ta belgidan iborat boʻlishi kerak!' };
  }
  if (!/^[a-zA-Z0-9_]+$/.test(cleanUsername)) {
    return { success: false, error: 'Login faqat lotin harflari, raqamlar va pastki chiziqdan iborat boʻlishi mumkin!' };
  }
  if (password.length < 4) {
    return { success: false, error: 'Parol kamida 4 ta belgidan iborat boʻlishi kerak!' };
  }

  const userId = 'u_' + sanitizeDocId(cleanUsername);
  const userDocRef = doc(db, 'users', userId);

  try {
    // Check if user already exists
    const existingDoc = await getDoc(userDocRef);
    if (existingDoc.exists()) {
      return { success: false, error: 'Bu login allaqachon band. Iltimos, boshqa login tanlang!' };
    }

    const now = new Date().toISOString();
    const newUserRecord = {
      userId,
      username: cleanUsername,
      displayName: cleanDisplayName,
      email: params.email ? params.email.trim() : '',
      avatar: params.avatar || '👨‍🎓',
      passwordHash: hashPassword(password),
      role: 'student',
      xp: 0,
      level: 1,
      streakDays: 1,
      createdAt: now,
      updatedAt: now,
    };

    // Save to Firestore
    await setDoc(userDocRef, newUserRecord);

    const userSession: UserSession = {
      session_id: userId,
      user_name: cleanDisplayName,
      username: cleanUsername,
      email: params.email ? params.email.trim() : '',
      avatar: params.avatar || '👨‍🎓',
      is_admin: false,
      is_super_admin: false,
      has_account: true,
      firestore_id: userId,
      xp: 0,
      level: 1,
      streak_days: 1,
      last_streak_date: now.split('T')[0],
      completed_subjects: [],
      total_tests_taken: 0,
      total_correct_answers: 0,
      accuracy_percentage: 0,
      topic_mastery: {},
      last_active: now,
      created_at: now,
    };

    return { success: true, user: userSession };
  } catch (err) {
    console.error('Registration Firestore error:', err);
    try {
      handleFirestoreError(err, OperationType.WRITE, `users/${userId}`);
    } catch {
      // Return human-readable Uzbek error
    }
    return { success: false, error: 'Bazada hisob yaratishda xatolik yuz berdi. Qayta urinib koʻring.' };
  }
}

// ----------------------------------------------------
// 2. LOGIN USER WITH LOGIN & PASSWORD FROM FIRESTORE
// ----------------------------------------------------
export async function loginUserWithLogin(
  username: string,
  password: string
): Promise<{ success: boolean; user?: UserSession; error?: string }> {
  const cleanUsername = username.trim().toLowerCase();
  const cleanPassword = password.trim();

  if (!cleanUsername || !cleanPassword) {
    return { success: false, error: 'Login va parolni kiriting!' };
  }

  const userId = 'u_' + sanitizeDocId(cleanUsername);
  const userDocRef = doc(db, 'users', userId);

  try {
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      return { success: false, error: 'Bunday loginli hisob topilmadi!' };
    }

    const data = userDoc.data();
    const expectedHash = hashPassword(cleanPassword);

    if (data.passwordHash && data.passwordHash !== expectedHash) {
      return { success: false, error: 'Kiritilgan parol notoʻgʻri!' };
    }

    const now = new Date().toISOString();
    const userSession: UserSession = {
      session_id: userId,
      user_name: data.displayName || data.username || 'Oʻquvchi',
      username: data.username,
      email: data.email || '',
      avatar: data.avatar || '👨‍🎓',
      is_admin: data.role === 'admin',
      is_super_admin: data.email === 'rjamshidbek01@gmail.com',
      has_account: true,
      firestore_id: userId,
      xp: Number(data.xp) || 0,
      level: Number(data.level) || 1,
      streak_days: Number(data.streakDays) || 1,
      last_streak_date: now.split('T')[0],
      completed_subjects: [],
      total_tests_taken: 0,
      total_correct_answers: 0,
      accuracy_percentage: 0,
      topic_mastery: {},
      last_active: now,
      created_at: data.createdAt || now,
    };

    return { success: true, user: userSession };
  } catch (err) {
    console.error('Login Firestore error:', err);
    return { success: false, error: 'Tizimga kirishda xatolik yuz berdi.' };
  }
}

// ----------------------------------------------------
// 3. GOOGLE SIGN-IN VIA FIREBASE AUTH & FIRESTORE SYNC
// ----------------------------------------------------
export async function signInWithGoogle(): Promise<{
  success: boolean;
  user?: UserSession;
  error?: string;
}> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const fbUser = result.user;
    const userId = 'g_' + sanitizeDocId(fbUser.uid);
    const userDocRef = doc(db, 'users', userId);

    const now = new Date().toISOString();
    const existingDoc = await getDoc(userDocRef);

    let profileData: any;
    if (existingDoc.exists()) {
      profileData = existingDoc.data();
      await updateDoc(userDocRef, {
        updatedAt: now,
        lastActive: now,
      });
    } else {
      profileData = {
        userId,
        username: (fbUser.email?.split('@')[0] || 'student_' + fbUser.uid.slice(0, 5)).toLowerCase(),
        displayName: fbUser.displayName || 'Oʻquvchi',
        email: fbUser.email || '',
        avatar: '👨‍🎓',
        role: fbUser.email === 'rjamshidbek01@gmail.com' ? 'admin' : 'student',
        xp: 0,
        level: 1,
        streakDays: 1,
        createdAt: now,
        updatedAt: now,
      };
      await setDoc(userDocRef, profileData);
    }

    const userSession: UserSession = {
      session_id: userId,
      user_name: profileData.displayName || fbUser.displayName || 'Oʻquvchi',
      username: profileData.username,
      email: fbUser.email || '',
      avatar: profileData.avatar || '👨‍🎓',
      is_admin: profileData.role === 'admin' || fbUser.email === 'rjamshidbek01@gmail.com',
      is_super_admin: fbUser.email === 'rjamshidbek01@gmail.com',
      has_account: true,
      firestore_id: userId,
      xp: Number(profileData.xp) || 0,
      level: Number(profileData.level) || 1,
      streak_days: Number(profileData.streakDays) || 1,
      last_streak_date: now.split('T')[0],
      completed_subjects: [],
      total_tests_taken: 0,
      total_correct_answers: 0,
      accuracy_percentage: 0,
      topic_mastery: {},
      last_active: now,
      created_at: profileData.createdAt || now,
    };

    return { success: true, user: userSession };
  } catch (err: any) {
    console.error('Google sign-in error:', err);
    if (err.code === 'auth/popup-closed-by-user') {
      return { success: false, error: 'Google oynasi yopildi. Qayta urinib koʻring.' };
    }
    return { success: false, error: err.message || 'Google orqali kirishda xatolik yuz berdi.' };
  }
}

// ----------------------------------------------------
// 4. SYNC PROFILE TO FIRESTORE
// ----------------------------------------------------
export async function syncProfileToFirestore(user: UserSession): Promise<void> {
  if (!user.firestore_id) return;
  const userDocRef = doc(db, 'users', user.firestore_id);
  try {
    await updateDoc(userDocRef, {
      displayName: user.user_name,
      avatar: user.avatar,
      xp: user.xp,
      level: user.level,
      streakDays: user.streak_days,
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    // best-effort sync
    console.warn('Sync profile to Firestore non-fatal:', err);
  }
}
