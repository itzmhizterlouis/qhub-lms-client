export interface UserInputs {
  employeeNo: string;
  country: string;
  state: string;
  logo: string;
  address: string;
  city: string;
  zipCode: string;
  website: string;
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
export interface Module {
  id: string;
  name: string;
  summary?: string;
  moduleItems: Lesson[];
}
