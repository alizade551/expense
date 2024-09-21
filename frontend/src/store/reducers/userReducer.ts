import { UserAction, UserState, userType } from '../../types/user';

const initialState: UserState = {
  data: {} as userType,
  loading: false,
  error: '',
};

const userReducer = (state: UserState = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case 'LOGIN_START':
    case 'IS_LOGGED_IN_START': {
      return { ...state, loading: true, error: '' };
    }

    case 'LOGIN_SUCCESS':
    case 'IS_LOGGED_IN_SUCCESS': {
      return { ...state, data: action.payload, loading: false, error: '' };
    }

    case 'LOGIN_ERROR': {
      return { ...state, loading: false, error: 'Login failed.' };
    }
    case 'IS_LOGGED_IN_ERROR': {
      return { ...state, loading: false, error: 'Token missing or invalid' };
    }
    case 'LOGOUT': {
      return { ...state, data: {} as userType, error: '' };
    }

    default:
      return state;
  }
};

export default userReducer;
