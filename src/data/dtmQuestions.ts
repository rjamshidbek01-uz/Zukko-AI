import { TestQuestion } from '../types';
import { MATH_QUESTIONS } from './questions/math';
import { PHYSICS_QUESTIONS } from './questions/physics';
import { HISTORY_QUESTIONS } from './questions/history';
import { BIOLOGY_QUESTIONS } from './questions/biology';
import { LITERATURE_QUESTIONS } from './questions/literature';
import { ASTRONOMY_QUESTIONS } from './questions/astronomy';
import { CHEMISTRY_QUESTIONS } from './questions/chemistry';
import { GEOGRAPHY_QUESTIONS } from './questions/geography';
import { ENGLISH_QUESTIONS } from './questions/english';

export const DTM_TEST_QUESTIONS: TestQuestion[] = [
  ...MATH_QUESTIONS,
  ...PHYSICS_QUESTIONS,
  ...HISTORY_QUESTIONS,
  ...BIOLOGY_QUESTIONS,
  ...LITERATURE_QUESTIONS,
  ...ASTRONOMY_QUESTIONS,
  ...CHEMISTRY_QUESTIONS,
  ...GEOGRAPHY_QUESTIONS,
  ...ENGLISH_QUESTIONS,
];
