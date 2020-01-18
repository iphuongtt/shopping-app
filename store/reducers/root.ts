import {combineReducers} from 'redux';
import {useSelector, TypedUseSelectorHook} from 'react-redux';
import productsReducer from './products';
import cartReducer from './cart';

export const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
