import { pick } from 'lodash';
import { configureStore as reduxConfigureStore } from '@reduxjs/toolkit';
import { AppConstant, localStorageKeys } from './constants/app.constants';
import { appReducer, appActions } from './redux/app/app.reducer';

const statesToBeStoredInLocalStorage: { stateKey?: Function} = {
    [AppConstant.redux.APP_STATE]: appActions.restoreApp
  };
  
  const createAppReducer = () => ({
    [AppConstant.redux.APP_STATE]: appReducer
  });
  
  const restoreState = (store: any) => {
    const stateStr = localStorage.getItem(localStorageKeys.WCState);
    const rootStateFromStorage: any = JSON.parse(stateStr);
    if (!rootStateFromStorage) return;
  
    Object.entries(statesToBeStoredInLocalStorage).forEach(([stateKey, restoreFunc]) => {
      const state = rootStateFromStorage[stateKey];
      if (state) {
        store.dispatch(restoreFunc(state));
      }
    });
  };
  
  export const getInitialState = () => ({});
  
  const storageMiddleware = ({ getState }: any) => next => action => {
    const result = next(action);
    const state = pick(getState(), Object.keys(statesToBeStoredInLocalStorage));
    localStorage.setItem(localStorageKeys.WCState, JSON.stringify(state));
    return result;
  };
  
  export const configureStore = () => {
    const middlewares = [storageMiddleware];
    const store = reduxConfigureStore({
      reducer: createAppReducer(),
      middleware: middlewares,
      devTools: process.env.NODE_ENV === 'development',
      preloadedState: getInitialState()
    });
    // restoreState(store);
  
    return store;
  };