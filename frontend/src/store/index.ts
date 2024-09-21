import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import { UserState } from '../types/user';
import categoryReducer from './reducers/categoryReducer';
import { CategoryState } from '../types/category';
import { RecordState } from '../types/record';
import { recordReducer } from './reducers/recordReducer';

export type AppState = {
  user: UserState;
  categories: CategoryState;
  records: RecordState;
};

const rootReducer = combineReducers({
  user: userReducer,
  categories: categoryReducer,
  records: recordReducer,
});

export default rootReducer;
