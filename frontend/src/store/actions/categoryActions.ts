import { Category, CategoryDispatch, categoryForm } from '../../types/category';
import api from '../../utils/api';

export const getCategories = () => async (dispatch: CategoryDispatch) => {
  dispatch({ type: 'GET_CATEGORIES_START' });
  try {
    const response = await api().get<Category[]>('/categories');
    dispatch({ type: 'GET_CATEGORIES_SUCCESS', payload: response.data });
  } catch {
    dispatch({ type: 'GET_CATEGORIES_ERROR' });
  }
};

export const addCategory = (form: categoryForm) => async (dispatch: CategoryDispatch) => {
  dispatch({ type: 'ADD_CATEGORIES_START' });

  try {
    const response = await api().post<Category>('/categories', form);
    dispatch({ type: 'ADD_CATEGORIES_SUCCESS', payload: response.data });
  } catch {
    dispatch({ type: 'ADD_CATEGORIES_ERROR' });
  }
};

export const updateCategory = (id: number, form: Partial<categoryForm>) => async (dispatch: CategoryDispatch) => {
  dispatch({ type: 'UPDATE_CATEGORIES_START' });
  try {
    const response = await api().put<Category>(`/categories/${id}`, form);
    dispatch({ type: 'UPDATE_CATEGORIES_SUCCESS', payload: response.data });
  } catch {
    dispatch({ type: 'UPDATE_CATEGORIES_ERROR' });
  }
};

export const deleteCategory = (id: number) => async (dispatch: CategoryDispatch) => {
  dispatch({ type: 'DELETE_CATEGORIES_START' });
  try {
    await api().delete(`/categories/${id}`);
    dispatch({ type: 'DELETE_CATEGORIES_SUCCESS', payload: { id } });
  } catch {
    dispatch({ type: 'DELETE_CATEGORIES_ERROR' });
  }
};
