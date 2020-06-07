export type AlertType = {
  msg?: string;
  alertType?: string;
  id?: string;
};

export type AuthReducerType = {
  token: string;
  isAuthenticated: boolean | null;
  loading: boolean;
  user: UserType;
};

export type UserType = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  gender: string;
  relationship: string;
  hometown: string;
  createdAt: string;
  status: string;
  friends: Array<string>;
};

export interface IRouteProps {
  component: any;
  auth: AuthReducerType;
  path: string;
  exact: any;
}

export type LoginFormDataType = {
  email: string;
  password: string;
};
