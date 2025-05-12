export interface SubChapter {
  id: string;
  title: string;
  completed: boolean;
  timeSpent: number; // in minutes
  quizScore: number; // percentage
  quizAttempts: number;
}

export interface Chapter {
  id: string;
  title: string;
  progress: number; // percentage
  quizAverage: number; // percentage
  subChapters: SubChapter[];
}

export interface BookStats {
  overallProgress: number; // percentage
  knowledgeScore: number; // percentage
  totalTimeSpent: number; // in minutes
  chaptersCompleted: number;
  totalChapters: number;
  totalQuizAttempts: number;
  averageQuizScore: number; // percentage
  chapters: Chapter[];
}

export const bookData: BookStats = {
  overallProgress: 68,
  knowledgeScore: 72,
  totalTimeSpent: 1240,
  chaptersCompleted: 4,
  totalChapters: 7,
  totalQuizAttempts: 23,
  averageQuizScore: 78,
  chapters: [
    {
      id: 'ch1',
      title: 'Introduction to Programming',
      progress: 100,
      quizAverage: 92,
      subChapters: [
        {
          id: 'ch1-sub1',
          title: 'What is Programming?',
          completed: true,
          timeSpent: 45,
          quizScore: 95,
          quizAttempts: 1,
        },
        {
          id: 'ch1-sub2',
          title: 'Programming Languages Overview',
          completed: true,
          timeSpent: 60,
          quizScore: 90,
          quizAttempts: 2,
        },
        {
          id: 'ch1-sub3',
          title: 'Basic Programming Concepts',
          completed: true,
          timeSpent: 75,
          quizScore: 88,
          quizAttempts: 1,
        },
      ],
    },
    {
      id: 'ch2',
      title: 'Variables and Data Types',
      progress: 100,
      quizAverage: 85,
      subChapters: [
        {
          id: 'ch2-sub1',
          title: 'Understanding Variables',
          completed: true,
          timeSpent: 55,
          quizScore: 80,
          quizAttempts: 2,
        },
        {
          id: 'ch2-sub2',
          title: 'Primitive Data Types',
          completed: true,
          timeSpent: 65,
          quizScore: 90,
          quizAttempts: 1,
        },
        {
          id: 'ch2-sub3',
          title: 'Complex Data Structures',
          completed: true,
          timeSpent: 80,
          quizScore: 85,
          quizAttempts: 2,
        },
      ],
    },
    {
      id: 'ch3',
      title: 'Control Flow',
      progress: 100,
      quizAverage: 76,
      subChapters: [
        {
          id: 'ch3-sub1',
          title: 'Conditional Statements',
          completed: true,
          timeSpent: 60,
          quizScore: 80,
          quizAttempts: 1,
        },
        {
          id: 'ch3-sub2',
          title: 'Loops and Iterations',
          completed: true,
          timeSpent: 70,
          quizScore: 72,
          quizAttempts: 2,
        },
        {
          id: 'ch3-sub3',
          title: 'Switch Statements',
          completed: true,
          timeSpent: 50,
          quizScore: 75,
          quizAttempts: 1,
        },
      ],
    },
    {
      id: 'ch4',
      title: 'Functions and Methods',
      progress: 100,
      quizAverage: 83,
      subChapters: [
        {
          id: 'ch4-sub1',
          title: 'Function Basics',
          completed: true,
          timeSpent: 50,
          quizScore: 85,
          quizAttempts: 1,
        },
        {
          id: 'ch4-sub2',
          title: 'Parameters and Return Values',
          completed: true,
          timeSpent: 65,
          quizScore: 80,
          quizAttempts: 2,
        },
        {
          id: 'ch4-sub3',
          title: 'Function Expressions',
          completed: true,
          timeSpent: 55,
          quizScore: 85,
          quizAttempts: 1,
        },
      ],
    },
    {
      id: 'ch5',
      title: 'Object Oriented Programming',
      progress: 67,
      quizAverage: 70,
      subChapters: [
        {
          id: 'ch5-sub1',
          title: 'Classes and Objects',
          completed: true,
          timeSpent: 70,
          quizScore: 75,
          quizAttempts: 2,
        },
        {
          id: 'ch5-sub2',
          title: 'Inheritance',
          completed: true,
          timeSpent: 60,
          quizScore: 65,
          quizAttempts: 1,
        },
        {
          id: 'ch5-sub3',
          title: 'Polymorphism',
          completed: false,
          timeSpent: 0,
          quizScore: 0,
          quizAttempts: 0,
        },
      ],
    },
    {
      id: 'ch6',
      title: 'Error Handling',
      progress: 33,
      quizAverage: 60,
      subChapters: [
        {
          id: 'ch6-sub1',
          title: 'Try-Catch Blocks',
          completed: true,
          timeSpent: 45,
          quizScore: 60,
          quizAttempts: 2,
        },
        {
          id: 'ch6-sub2',
          title: 'Error Types',
          completed: false,
          timeSpent: 0,
          quizScore: 0,
          quizAttempts: 0,
        },
        {
          id: 'ch6-sub3',
          title: 'Custom Error Classes',
          completed: false,
          timeSpent: 0,
          quizScore: 0,
          quizAttempts: 0,
        },
      ],
    },
    {
      id: 'ch7',
      title: 'Asynchronous Programming',
      progress: 0,
      quizAverage: 0,
      subChapters: [
        {
          id: 'ch7-sub1',
          title: 'Callbacks',
          completed: false,
          timeSpent: 0,
          quizScore: 0,
          quizAttempts: 0,
        },
        {
          id: 'ch7-sub2',
          title: 'Promises',
          completed: false,
          timeSpent: 0,
          quizScore: 0,
          quizAttempts: 0,
        },
        {
          id: 'ch7-sub3',
          title: 'Async/Await',
          completed: false,
          timeSpent: 0,
          quizScore: 0,
          quizAttempts: 0,
        },
      ],
    },
  ],
};
