import {combineReducers} from 'redux';
import {addCityReducer} from './addCity-reducer';
import {addTemp} from './addTemp-reducer';
import {SET_LOADING} from './loading-reducer';
import {setLoading} from '../action/loading-action';

export const rootReducer = combineReducers({
  addCityReducer: addCityReducer,
  addTemp: addTemp,
  setLoading: SET_LOADING,
});
