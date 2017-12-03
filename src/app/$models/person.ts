export interface PersonResponse {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  student_card_number: string | null;
  user_id: number | null;
}

export interface UserRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  email: string;
}
