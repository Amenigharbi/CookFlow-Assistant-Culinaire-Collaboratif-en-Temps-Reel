export interface LoginFormData {
  email: string
  password: string
}

export interface RegisterFormData extends LoginFormData {
  fullName: string
  confirmPassword: string
}