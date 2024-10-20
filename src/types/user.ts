export type UserType = {
  id: number,
  username: string,
  first_name: string,
  last_name: string,
  email: string,
}

export type FormDataType = {
  email: string;
  password: string;
  username: string;
}

export type ShortFormDataType = Omit<FormDataType, "username">
