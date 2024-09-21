import { RecordAction, RecordState } from '../../types/record';
const defaultState: RecordState = {
  data: [],
  loading: false,
  error: '',
};

export const recordReducer = (state: RecordState = defaultState, action: RecordAction): RecordState => {
  switch (action.type) {
    case 'GET_START': {
      return { ...state, loading: true };
    }

    case 'GET_SUCCESS': {
      return { ...state, data: action.payload.data, loading: false };
    }

    case 'GET_ERROR': {
      return {
        ...state,
        error: 'Failed fetching records',
        loading: false,
      };
    }

    case 'ADD_START': {
      return { ...state, loading: true, error: '' };
    }

    case 'ADD_SUCCESS': {
      return { ...state, data: [action.payload.data, ...state.data], loading: false };
    }

    case 'ADD_ERROR': {
      return {
        ...state,
        loading: false,
        error: 'Failed adding record',
      };
    }

    case 'UPDATE_START': {
      return { ...state, loading: true, error: '' };
    }

    case 'UPDATE_SUCCESS': {
      return {
        ...state,
        data: state.data.map((category) => (category.id === action.payload.data.id ? action.payload.data : category)),
        loading: false,
        error: '',
      };
    }

    case 'UPDATE_ERROR': {
      return {
        ...state,
        error: 'Failed updating record',
        loading: false,
      };
    }

    case 'DELETE_START': {
      return { ...state, loading: true, error: '' };
    }

    case 'DELETE_SUCCESS': {
      return {
        ...state,
        data: state.data.filter((category) => category.id !== action.payload.id),
        loading: false,
        error: '',
      };
    }

    case 'DELETE_ERROR': {
      return {
        ...state,
        error: 'Failed deleting record',
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
};
