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

export type AuthState = {
  token: string | null;
  isAuthenticated: any;
  registrationMessage: boolean;
  loading: boolean;
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
  friends: Array<UserType>;
};

export type FriendshipType = {
  _id: string;
  requester: UserType;
  recipient: UserType;
  status: string;
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
