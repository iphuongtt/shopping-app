import {combineReducers} from 'redux';
import {useSelector, TypedUseSelectorHook} from 'react-redux';
import productsReducer from './products';

export const rootReducer = combineReducers({
  products: productsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
