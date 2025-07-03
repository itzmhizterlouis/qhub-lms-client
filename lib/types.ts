export interface UserInputs {
  employeeNo: string;
  country: string;
  state: string;
  logo: string;
  address: string;
  city: string;
  zipCode: string;
  website: string;
  name: string;
}
export type Employee = {
  id: string;
  name: string;
  role: string;
  status: string;
  email: string;
};
export interface Lesson {
  id: string;
  name: string;
  content: string;
  featuredImage: string;
  video: string;
  exerciseFiles: File[];
}
export interface Quiz {
  id: string;
  name: string;
  summary: string;
  questions: Question[];
}
export interface Module {
  id: string;
  name: string;
  summary?: string;
  lessons?: Lesson[];
  quizzes?: Quiz[];
}
export interface Option {
  id: string;
  name: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  question: string;
  questionType: string;
  points: number;
  description: string;
  options: Option[];
  answerExplanation: string;
}

export interface AppContextType {
  modules: Module[];
  setModules: React.Dispatch<React.SetStateAction<Module[]>>;
}

export interface Course {
  id: string;
  name: string;
  category: string;
  duration: string;
  students: string;
  startDate: string;
  endDate: string;
}

// Course Types
export interface CourseType {
  _id: string;
  category: string;
  createdAt: string;
  description: string;
  displayImageUrl: string;
  duration: string;
  introVideoUrl: string;
  organization: OrganizationType;
  title: string;
  updatedAt: string;
}

export interface CourseInput {
  category: string;
  description: string;
  displayImageUrl: string;
  duration: string;
  introVideoUrl: string;
  organizationId: string;
  title: string;
}

export interface CourseModuleType {
  _id: string;
  course: CourseType;
  createdAt: string;
  name: string;
  summary: string;
  updatedAt: string;
}

export interface CourseModuleInput {
  courseId: string;
  name: string;
  summary: string;
}

export interface LessonType {
  _id: string;
  contentUrl: string;
  courseModule: CourseModuleType;
  createdAt: string;
  extraResourcesUrl: string;
  imageUrl: string;
  index: number;
  name: string;
  updatedAt: string;
  videoUrl: string;
}

export interface LessonInput {
  contentUrl: string;
  extraResourcesUrl: string;
  imageUrl: string;
  index: number;
  moduleId: string;
  name: string;
  videoUrl: string;
}

export interface QuizType {
  _id: string;
  createdAt: string;
  module: CourseModuleType;
  summary: string;
  title: string;
  updatedAt: string;
}

export interface QuizInput {
  moduleId: string;
  summary: string;
  title: string;
}

export interface QuizQuestionType {
  _id: string;
  createdAt: string;
  displayPoint: boolean;
  options: AnswerType[];
  point: number;
  quiz: QuizType;
  text: string;
  type: string;
  updatedAt: string;
}

export interface QuizQuestionInput {
  displayPoint: boolean;
  options: AnswerInput[];
  point: number;
  quizId: string;
  text: string;
  type: string;
}

export interface AnswerType {
  _id: string;
  text: string;
  isCorrect: boolean;
}

export interface AnswerInput {
  text: string;
  isCorrect: boolean;
}

// Resource Types
export interface ResourceType {
  _id: string;
  author: string;
  createdAt: string;
  description: string;
  fileType: string;
  fileUrl: string;
  name: string;
  organization: OrganizationType;
  updatedAt: string;
}

export interface OrganizationType {
  _id: string;
  name: string;
  logo?: string;
}

export interface ResourceInput {
  author: string;
  description: string;
  fileType: string;
  fileUrl: string;
  name: string;
  organizationId: string;
}
