export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  first_name: string;
  last_name: string;
  address: string;
  phone_no: string;
  role: '' | 'recruiter' | 'applicant' | 'admin';
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LaravelValidationErrors {
  [key: string]: string[];
}
