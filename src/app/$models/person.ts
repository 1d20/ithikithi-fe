export interface PersonResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  studentCardNumber: string | null;
  userId: number | null;
}

export interface UserRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  email: string;
}
