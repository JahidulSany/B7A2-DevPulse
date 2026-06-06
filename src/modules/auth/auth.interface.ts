export interface IAuthUser {
  name: string;
  email: string;
  password: string;
  role: 'contributor' | 'maintainer';
}

export interface IUserLogin {
  email: string;
  password: string;
}
