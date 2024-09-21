import { ThunkDispatch } from 'redux-thunk';
import { Category } from './category';

export type RecordState = {
  data: Record[];
  loading: boolean;
  error: string;
};

export type Record = {
  title: string;
  id: number;
  amount: number;
  category: Category;
  createdAt: Date;
  updatedAt: Date;
};

export type recordForm = {
  title: string;
  amount: number;
  category_id?: number | null;
};

type GET_START = {
  type: 'GET_START';
};

type GET_SUCCESS = {
  type: 'GET_SUCCESS';
  payload: { data: Record[] };
};

type GET_ERROR = {
  type: 'GET_ERROR';
};

type ADD_START = {
  type: 'ADD_START';
};

type ADD_SUCCESS = {
  type: 'ADD_SUCCESS';
  payload: { data: Record };
};

type ADD_ERROR = {
  type: 'ADD_ERROR';
};

type UPDATE_START = {
  type: 'UPDATE_START';
};

type UPDATE_SUCCESS = {
  type: 'UPDATE_SUCCESS';
  payload: { data: Record };
};

type UPDATE_ERROR = {
  type: 'UPDATE_ERROR';
};

type DELETE_START = {
  type: 'DELETE_START';
};

type DELETE_SUCCESS = {
  type: 'DELETE_SUCCESS';
  payload: { id: number };
};

type DELETE_ERROR = {
  type: 'DELETE_ERROR';
};

export type RecordAction =
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

export type RecordDispatch = ThunkDispatch<RecordState, unknown, RecordAction>;
