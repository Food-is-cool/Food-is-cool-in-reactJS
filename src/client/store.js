import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// Add middleware to createStore
var createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

// App Reducers
import UserReducer from 'reducers/user';

// Combine Reducers
var reducers = combineReducers({
  userReducer: UserReducer
  // more...
});

// Create Store
var store = createStoreWithMiddleware(reducers);

export default store;
