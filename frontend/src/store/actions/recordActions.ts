import { Record, RecordDispatch, recordForm } from '../../types/record';
import api from '../../utils/api';

export const getRecords = () => async (dispatch: RecordDispatch) => {
  dispatch({ type: 'GET_START' });

  try {
    const response = await api().get<Record[]>('/records');
    response.data.sort((a, b) => b.id - a.id);
    dispatch({ type: 'GET_SUCCESS', payload: { data: response.data } });
  } catch {
    dispatch({ type: 'GET_ERROR' });
  }
};

export const addRecord = (recordForm: recordForm) => async (dispatch: RecordDispatch) => {
  dispatch({ type: 'ADD_START' });
  try {
    const response = await api().post('/records', { ...recordForm });
    dispatch({ type: 'ADD_SUCCESS', payload: { data: response.data } });
  } catch (error) {
    console.error('Error adding record:', error);
    dispatch({ type: 'ADD_ERROR' });
  }
};

export const updateRecord = (id: number, form: Partial<recordForm>) => async (dispatch: RecordDispatch) => {
  dispatch({ type: 'UPDATE_START' });

  try {
    const response = await api().put(`/records/${id}`, form);
    dispatch({ type: 'UPDATE_SUCCESS', payload: { data: response.data } });
  } catch {
    dispatch({ type: 'UPDATE_ERROR' });
  }
};

export const deleteRecord = (id: number) => async (dispatch: RecordDispatch) => {
  dispatch({ type: 'DELETE_START' });
  try {
    await api().delete(`/records/${id}`);
    dispatch({ type: 'DELETE_SUCCESS', payload: { id } });
  } catch {
    dispatch({ type: 'DELETE_ERROR' });
  }
};
