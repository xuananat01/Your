import {combineReducers} from 'redux';
import {addCityReducer} from './addCity-reducer';
import {addTemp} from './addTemp-reducer';

export const rootReducer = combineReducers({
  addCityReducer: addCityReducer,
  addTemp: addTemp,
});
