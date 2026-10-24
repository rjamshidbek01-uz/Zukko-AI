import { BookChapter, TestQuestion } from '../types';
import { DTM_TEST_QUESTIONS } from './dtmQuestions';
import { COMPREHENSIVE_TEXTBOOKS_KNOWLEDGE } from './textbooksData';

export const INITIAL_BOOK_KNOWLEDGE: BookChapter[] = [
  ...COMPREHENSIVE_TEXTBOOKS_KNOWLEDGE,
];

export const INITIAL_TEST_QUESTIONS: TestQuestion[] = [
  ...DTM_TEST_QUESTIONS,
];

export const ALL_SUBJECTS = [
  'Matematika',
  'Fizika',
  'Tarix',
  'Biologiya',
  'Kimyo',
  'Ona tili va adabiyot',
  'Astronomiya',
  'Geografiya',
  'Ingliz tili'
] as const;
