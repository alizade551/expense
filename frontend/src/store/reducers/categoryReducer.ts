import { CategoryAction, CategoryState } from '../../types/category';

const defaultState: CategoryState = {
  data: [],
  loading: false,
  error: '',
};

const categoryReducer = (state: CategoryState = defaultState, action: CategoryAction) => {
  switch (action.type) {
    case 'GET_CATEGORIES_START': {
      return { ...state, loading: true, error: '' };
    }

    case 'GET_CATEGORIES_SUCCESS': {
      return { ...state, data: action.payload, loading: false };
    }

    case 'GET_CATEGORIES_ERROR': {
      return { ...state, error: 'Error fetching categories', loading: false };
    }

    case 'ADD_CATEGORIES_START': {
      return { ...state, loading: true, error: '' };
    }

    case 'ADD_CATEGORIES_SUCCESS': {
      return { ...state, data: [action.payload, ...state.data], loading: false };
    }

    case 'ADD_CATEGORIES_ERROR': {
      return { ...state, error: 'Error adding category', loading: false };
    }

    case 'UPDATE_CATEGORIES_START': {
      return { ...state, loading: true, error: '' };
    }

    case 'UPDATE_CATEGORIES_SUCCESS': {
      return {
        ...state,
        data: state.data.map((category) => (category.id === action.payload.id ? action.payload : category)),
        loading: false,
      };
    }

    case 'UPDATE_CATEGORIES_ERROR': {
      return { ...state, error: 'Error updating category', loading: false };
    }

    case 'DELETE_CATEGORIES_START': {
      return { ...state, loading: true, error: '' };
    }

    case 'DELETE_CATEGORIES_SUCCESS': {
      return {
        ...state,
        loading: false,
        data: state.data.filter((category) => category.id !== action.payload.id),
      };
    }

    default:
      return state;
  }
};

export default categoryReducer;
