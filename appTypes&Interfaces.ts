export type alertType = {
  msg?: string;
  alertType?: string;
  id?: string;
};

export type authReducerType = {
  token: string;
  isAuthenticated: boolean | null;
  loading: boolean;
  user: userType;
};

export type userType = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  createdAt: string;
  status: string;
};

export interface IRouteProps {
  component: any;
  auth: authReducerType;
  path: string;
  exact: any;
}

export type loginFormDataType = {
  email: string;
  password: string;
};
