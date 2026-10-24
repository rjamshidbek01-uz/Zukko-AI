import { TestQuestion } from '../../types';

export const ENGLISH_QUESTIONS: TestQuestion[] = [
  {
    id: 'dtm-eng-01',
    subject: 'Ingliz tili',
    topic: 'Present Perfect Tense',
    question: 'Choose the correct form: "She ___ to London twice this year."',
    options: {
      A: "has been",
      B: "have been",
      C: "was being",
      D: "is been"
    },
    correct_answer: 'A',
    explanation_reference: "Third-person singular 'She' takes 'has' + past participle 'been' in the Present Perfect tense."
  },
  {
    id: 'dtm-eng-02',
    subject: 'Ingliz tili',
    topic: 'First Conditional',
    question: 'Complete the sentence: "If it rains tomorrow, we ___ at home."',
    options: {
      A: "will stay",
      B: "would stay",
      C: "stayed",
      D: "had stayed"
    },
    correct_answer: 'A',
    explanation_reference: "First Conditional: If + Present Simple (rains), Future Simple (will stay)."
  },
  {
    id: 'dtm-eng-03',
    subject: 'Ingliz tili',
    topic: 'Passive Voice',
    question: 'Convert to passive: "William Shakespeare wrote Hamlet."',
    options: {
      A: "Hamlet was written by William Shakespeare.",
      B: "Hamlet is written by William Shakespeare.",
      C: "Hamlet had been writing by William Shakespeare.",
      D: "Hamlet was wrote by William Shakespeare."
    },
    correct_answer: 'A',
    explanation_reference: "Past simple passive: was/were + V3 (past participle): 'Hamlet was written by...'."
  },
  {
    id: 'dtm-eng-04',
    subject: 'Ingliz tili',
    topic: 'Second Conditional',
    question: 'Choose the correct option: "If I ___ a million dollars, I would travel around the world."',
    options: {
      A: "had",
      B: "have",
      C: "will have",
      D: "would have"
    },
    correct_answer: 'A',
    explanation_reference: "Second Conditional: If + Past Simple (had), would + bare infinitive (would travel)."
  },
  {
    id: 'dtm-eng-05',
    subject: 'Ingliz tili',
    topic: 'Third Conditional',
    question: '"If she had studied harder, she ___ the entrance exam."',
    options: {
      A: "would have passed",
      B: "will pass",
      C: "passed",
      D: "would pass"
    },
    correct_answer: 'A',
    explanation_reference: "Third Conditional: If + Past Perfect (had studied), would have + past participle (would have passed)."
  },
  {
    id: 'dtm-eng-06',
    subject: 'Ingliz tili',
    topic: 'Modal Verbs',
    question: 'Choose the modal verb expressing strong necessity or rule: "Students ___ wear school uniforms."',
    options: {
      A: "must",
      B: "might",
      C: "could",
      D: "would"
    },
    correct_answer: 'A',
    explanation_reference: "'Must' expresses strong obligation and official rules."
  },
  {
    id: 'dtm-eng-07',
    subject: 'Ingliz tili',
    topic: 'Past Continuous vs Past Simple',
    question: '"While I ___ my homework, the telephone rang."',
    options: {
      A: "was doing",
      B: "did",
      C: "have done",
      D: "had done"
    },
    correct_answer: 'A',
    explanation_reference: "A longer continuous action in progress in the past is interrupted by a shorter action: 'While I was doing... rang'."
  },
  {
    id: 'dtm-eng-08',
    subject: 'Ingliz tili',
    topic: 'Relative Clauses',
    question: '"The boy ___ won the international mathematics olympiad is my classmate."',
    options: {
      A: "who",
      B: "which",
      C: "whose",
      D: "whom"
    },
    correct_answer: 'A',
    explanation_reference: "Use 'who' as a relative pronoun for persons as the subject of the clause."
  },
  {
    id: 'dtm-eng-09',
    subject: 'Ingliz tili',
    topic: 'Possessive Relative Pronoun',
    question: '"I met a famous writer ___ book became a worldwide bestseller."',
    options: {
      A: "whose",
      B: "which",
      C: "who",
      D: "where"
    },
    correct_answer: 'A',
    explanation_reference: "'Whose' is used to indicate possession for both people and things."
  },
  {
    id: 'dtm-eng-10',
    subject: 'Ingliz tili',
    topic: 'Prepositions of Time',
    question: 'Choose the correct preposition: "The national conference begins ___ 9:00 AM ___ Monday."',
    options: {
      A: "at / on",
      B: "in / at",
      C: "on / in",
      D: "at / in"
    },
    correct_answer: 'A',
    explanation_reference: "We use 'at' for precise clock times (at 9:00 AM) and 'on' for days of the week (on Monday)."
  },
  {
    id: 'dtm-eng-11',
    subject: 'Ingliz tili',
    topic: 'Prepositions of Place',
    question: '"He was born ___ Tashkent ___ Uzbekistan."',
    options: {
      A: "in / in",
      B: "at / on",
      C: "on / at",
      D: "to / for"
    },
    correct_answer: 'A',
    explanation_reference: "We use 'in' for cities, towns, and countries."
  },
  {
    id: 'dtm-eng-12',
    subject: 'Ingliz tili',
    topic: 'Gerund vs Infinitive',
    question: '"I look forward to ___ you at the scientific forum."',
    options: {
      A: "meeting",
      B: "meet",
      C: "met",
      D: "have met"
    },
    correct_answer: 'A',
    explanation_reference: "The phrasal verb 'look forward to' is followed by a gerund (V-ing): 'look forward to meeting'."
  },
  {
    id: 'dtm-eng-13',
    subject: 'Ingliz tili',
    topic: 'Gerund vs Infinitive',
    question: '"She avoided ___ questions about her private life."',
    options: {
      A: "answering",
      B: "to answer",
      C: "answered",
      D: "answer"
    },
    correct_answer: 'A',
    explanation_reference: "The verb 'avoid' is followed by a gerund (V-ing)."
  },
  {
    id: 'dtm-eng-14',
    subject: 'Ingliz tili',
    topic: 'Used to / Be used to',
    question: '"When my grandfather was young, he ___ walk 5 kilometers to school every morning."',
    options: {
      A: "used to",
      B: "is used to",
      C: "was using to",
      D: "got used to"
    },
    correct_answer: 'A',
    explanation_reference: "'Used to + infinitive' refers to past habitual actions that no longer happen."
  },
  {
    id: 'dtm-eng-15',
    subject: 'Ingliz tili',
    topic: 'Reported Speech',
    question: 'Direct speech: "I am working on my project," Tom said. Reported speech: Tom said that he ___ on his project.',
    options: {
      A: "was working",
      B: "is working",
      C: "had worked",
      D: "works"
    },
    correct_answer: 'A',
    explanation_reference: "In reported speech with past reporting verb, Present Continuous shifts back to Past Continuous (am working -> was working)."
  },
  {
    id: 'dtm-eng-16',
    subject: 'Ingliz tili',
    topic: 'Reported Questions',
    question: '"Where do you live?" she asked me. Choose the correct reported question:',
    options: {
      A: "She asked me where I lived.",
      B: "She asked me where did I live.",
      C: "She asked me where do I live.",
      D: "She asked me where I do live."
    },
    correct_answer: 'A',
    explanation_reference: "Reported questions take normal statement word order (Subject + Verb) without auxiliary 'do/did'."
  },
  {
    id: 'dtm-eng-17',
    subject: 'Ingliz tili',
    topic: 'Question Tags',
    question: '"You have never visited Samarkand, ___?"',
    options: {
      A: "have you",
      B: "haven't you",
      C: "did you",
      D: "do you"
    },
    correct_answer: 'A',
    explanation_reference: "Because 'never' gives the sentence a negative meaning, the question tag must be positive: 'have you?'."
  },
  {
    id: 'dtm-eng-18',
    subject: 'Ingliz tili',
    topic: 'Degrees of Comparison',
    question: '"Jupiter is by far ___ planet in our solar system."',
    options: {
      A: "the largest",
      B: "larger",
      C: "largest",
      D: "more large"
    },
    correct_answer: 'A',
    explanation_reference: "Superlative degree of one-syllable adjective 'large' requires the definite article 'the' + suffix -est: 'the largest'."
  },
  {
    id: 'dtm-eng-19',
    subject: 'Ingliz tili',
    topic: 'Degrees of Comparison',
    question: '"The more you read authentic literature, the ___ your vocabulary becomes."',
    options: {
      A: "richer",
      B: "richest",
      C: "more rich",
      D: "rich"
    },
    correct_answer: 'A',
    explanation_reference: "Parallel progression structure: 'The + comparative..., the + comparative...': 'The more..., the richer'."
  },
  {
    id: 'dtm-eng-20',
    subject: 'Ingliz tili',
    topic: 'Articles',
    question: 'Choose the correct articles: "___ Nile is ___ longest river in Africa."',
    options: {
      A: "The / the",
      B: "A / the",
      C: "- / the",
      D: "The / a"
    },
    correct_answer: 'A',
    explanation_reference: "Rivers take 'the' (The Nile) and superlatives take 'the' (the longest)."
  },
  {
    id: 'dtm-eng-21',
    subject: 'Ingliz tili',
    topic: 'Articles with Geographics',
    question: 'Which of the following requires the definite article "the"?',
    options: {
      A: "United Kingdom",
      B: "Uzbekistan",
      C: "France",
      D: "Japan"
    },
    correct_answer: 'A',
    explanation_reference: "Countries with 'Kingdom', 'Republic', 'States', or plural names take 'the': 'the United Kingdom'."
  },
  {
    id: 'dtm-eng-22',
    subject: 'Ingliz tili',
    topic: 'Phrasal Verbs',
    question: '"The firemen managed to ___ the fire within two hours."',
    options: {
      A: "put out",
      B: "put on",
      C: "put off",
      D: "put up with"
    },
    correct_answer: 'A',
    explanation_reference: "'Put out' means to extinguish a fire; 'put off' means to postpone."
  },
  {
    id: 'dtm-eng-23',
    subject: 'Ingliz tili',
    topic: 'Phrasal Verbs: Postpone',
    question: '"Due to heavy rain, the match was ___ until next Sunday."',
    options: {
      A: "put off",
      B: "put down",
      C: "given up",
      D: "called out"
    },
    correct_answer: 'A',
    explanation_reference: "'Put off' is a phrasal verb meaning to delay or postpone."
  },
  {
    id: 'dtm-eng-24',
    subject: 'Ingliz tili',
    topic: 'Vocabulary: Synonyms',
    question: 'Choose the best synonym for the word "ENORMOUS":',
    options: {
      A: "Gigantic / Huge",
      B: "Tiny",
      C: "Delicate",
      D: "Average"
    },
    correct_answer: 'A',
    explanation_reference: "'Enormous' means extremely large in size, synonymous with gigantic or huge."
  },
  {
    id: 'dtm-eng-25',
    subject: 'Ingliz tili',
    topic: 'Vocabulary: Antonyms',
    question: 'Choose the antonym of the word "GENEROUS":',
    options: {
      A: "Stingy / Mean",
      B: "Kind",
      C: "Helpful",
      D: "Wealthy"
    },
    correct_answer: 'A',
    explanation_reference: "'Generous' means willing to give; its opposite is 'stingy' or 'mean' (unwilling to spend/give)."
  },
  {
    id: 'dtm-eng-26',
    subject: 'Ingliz tili',
    topic: 'Countable and Uncountable Nouns',
    question: 'Which of the following nouns is uncountable in English?',
    options: {
      A: "Information",
      B: "Computer",
      C: "Suggestion",
      D: "Mistake"
    },
    correct_answer: 'A',
    explanation_reference: "'Information' is uncountable (does not take -s or 'an', uses 'a piece of information')."
  },
  {
    id: 'dtm-eng-27',
    subject: 'Ingliz tili',
    topic: 'Quantifiers',
    question: '"There is only ___ milk left in the fridge, so we should buy some."',
    options: {
      A: "a little",
      B: "a few",
      C: "many",
      D: "several"
    },
    correct_answer: 'A',
    explanation_reference: "We use 'a little' with uncountable nouns like 'milk'; 'a few' is used with countable nouns."
  },
  {
    id: 'dtm-eng-28',
    subject: 'Ingliz tili',
    topic: 'Subjunctive / Wish Clauses',
    question: '"I am not tall enough. I wish I ___ taller."',
    options: {
      A: "were / was",
      B: "am",
      C: "will be",
      D: "have been"
    },
    correct_answer: 'A',
    explanation_reference: "To express a wish about a present situation, use 'wish + past simple (were/was)'."
  },
  {
    id: 'dtm-eng-29',
    subject: 'Ingliz tili',
    topic: 'Inversion',
    question: '"Rarely ___ such a spectacular astronomical phenomenon."',
    options: {
      A: "have I seen",
      B: "I have seen",
      C: "I saw",
      D: "saw I"
    },
    correct_answer: 'A',
    explanation_reference: "Negative and restrictive adverbs at the beginning of a sentence (Rarely, Never, Seldom) trigger subject-auxiliary inversion: 'Rarely have I seen'."
  },
  {
    id: 'dtm-eng-30',
    subject: 'Ingliz tili',
    topic: 'Neither / Nor',
    question: '"Neither Bob nor his colleagues ___ ready for the presentation yesterday."',
    options: {
      A: "were",
      B: "was",
      C: "is",
      D: "are"
    },
    correct_answer: 'A',
    explanation_reference: "When 'neither... nor...' connects two subjects, the verb agrees with the subject closest to it (his colleagues -> plural were)."
  },
  {
    id: 'dtm-eng-31',
    subject: 'Ingliz tili',
    topic: 'Either / Or',
    question: '"You can choose ___ the red shirt ___ the blue one."',
    options: {
      A: "either / or",
      B: "neither / and",
      C: "both / or",
      D: "not / but"
    },
    correct_answer: 'A',
    explanation_reference: "Correlative conjunction pair is 'either ... or ...'."
  },
  {
    id: 'dtm-eng-32',
    subject: 'Ingliz tili',
    topic: 'Despite vs In spite of vs Although',
    question: '"___ the heavy snowfall, our flight departed on time."',
    options: {
      A: "Despite",
      B: "Although",
      C: "Even though",
      D: "Because"
    },
    correct_answer: 'A',
    explanation_reference: "'Despite' and 'In spite of' are prepositions followed by a noun phrase ('the heavy snowfall'); 'Although' requires a full clause."
  },
  {
    id: 'dtm-eng-33',
    subject: 'Ingliz tili',
    topic: 'Causative Verbs',
    question: '"The teacher made the noisy students ___ after class."',
    options: {
      A: "stay",
      B: "to stay",
      C: "stayed",
      D: "staying"
    },
    correct_answer: 'A',
    explanation_reference: "The causative verb 'make' (in active voice) takes an object + bare infinitive: 'made them stay'."
  },
  {
    id: 'dtm-eng-34',
    subject: 'Ingliz tili',
    topic: 'Have something done',
    question: '"I had my car ___ by a certified mechanic yesterday."',
    options: {
      A: "repaired",
      B: "repair",
      C: "to repair",
      D: "repairing"
    },
    correct_answer: 'A',
    explanation_reference: "Causative structure: have + object + past participle (V3): 'had my car repaired'."
  },
  {
    id: 'dtm-eng-35',
    subject: 'Ingliz tili',
    topic: 'Vocabulary in Context',
    question: '"The government took comprehensive measures to promote renewable energy." The word "PROMOTE" here is closest in meaning to:',
    options: {
      A: "encourage and support",
      B: "prevent",
      C: "criticize",
      D: "delay"
    },
    correct_answer: 'A',
    explanation_reference: "'Promote' means to encourage, support, or advance the development of something."
  }
];
