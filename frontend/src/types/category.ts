import { ThunkDispatch } from 'redux-thunk';

export type Category = {
  id: number;
  name: string;
  type: 'expense' | 'income';
  color: string;
};

export type CategoryState = {
  data: Category[];
  loading: boolean;
  error: string;
};

export type categoryType = 'income' | 'expense';
export type categoryForm = {
  name: string;
  type: categoryType;
  color?: string;
};

type GET_START = {
  type: 'GET_CATEGORIES_START';
};

type GET_SUCCESS = {
  type: 'GET_CATEGORIES_SUCCESS';
  payload: Category[];
};

type GET_ERROR = {
  type: 'GET_CATEGORIES_ERROR';
};

type ADD_START = {
  type: 'ADD_CATEGORIES_START';
};

type ADD_SUCCESS = {
  type: 'ADD_CATEGORIES_SUCCESS';
  payload: Category;
};

type ADD_ERROR = {
  type: 'ADD_CATEGORIES_ERROR';
};

type UPDATE_START = {
  type: 'UPDATE_CATEGORIES_START';
};

type UPDATE_SUCCESS = {
  type: 'UPDATE_CATEGORIES_SUCCESS';
  payload: Category;
};

type UPDATE_ERROR = {
  type: 'UPDATE_CATEGORIES_ERROR';
};

type DELETE_START = {
  type: 'DELETE_CATEGORIES_START';
};

type DELETE_SUCCESS = {
  type: 'DELETE_CATEGORIES_SUCCESS';
  payload: {
    id: number;
  };
};

type DELETE_ERROR = {
  type: 'DELETE_CATEGORIES_ERROR';
};

export type CategoryAction =
  | GET_START
  | GET_SUCCESS
  | GET_ERROR
  | ADD_START
  | ADD_SUCCESS
  | ADD_ERROR
  | UPDATE_START
  | UPDATE_SUCCESS
  | UPDATE_ERROR
  | DELETE_START
  | DELETE_SUCCESS
  | DELETE_ERROR;
export type CategoryDispatch = ThunkDispatch<CategoryState, unknown, CategoryAction>;
