import { ThunkDispatch } from 'redux-thunk';

export type userType = {
  username: string;
  email: string;
  full_name: string;
  token: string;
  message: string;
};

export type UserState = {
  data: userType;
  loading: boolean;
  error: string;
};

export type LoginForm = {
  username: string;
  password: string;
};

type LOGIN_START = {
  type: 'LOGIN_START';
};

type LOGIN_SUCCESS = {
  type: 'LOGIN_SUCCESS';
  payload: userType;
};

type LOGIN_ERROR = {
  type: 'LOGIN_ERROR';
};

type IS_LOGGED_IN_START = {
  type: 'IS_LOGGED_IN_START';
};

type IS_LOGGED_IN_SUCCESS = {
  type: 'IS_LOGGED_IN_SUCCESS';
  payload: userType;
};

type IS_LOGGED_IN_ERROR = {
  type: 'IS_LOGGED_IN_ERROR';
};

type LOGOUT = {
  type: 'LOGOUT';
};

export type UserAction =
  | LOGIN_START
  | LOGIN_SUCCESS
  | LOGIN_ERROR
  | IS_LOGGED_IN_START
  | IS_LOGGED_IN_SUCCESS
  | IS_LOGGED_IN_ERROR
  | LOGOUT;
export type UserDispatch = ThunkDispatch<UserState, unknown, UserAction>;
