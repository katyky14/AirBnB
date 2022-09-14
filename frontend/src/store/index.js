import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import spotReducer from './spot';
import reviewReducer from './review'
import { update } from 'lodash';
import { useSelector } from 'react-redux';
import bookingReducer from './booking';


const rootReducer = combineReducers({
    session: sessionReducer,
    spot: spotReducer,
    review: reviewReducer,
    booking: bookingReducer
  });


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}


const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};
// Probably what createStore does
// function createStore(reducer, startingStore) {
//   class Store {
//     constructor(reducer, startingStore) {
//       this.reducer = reducer;
//       this.store = startingStore;
//     }

//     getStoreValue() {
//       return this.store;
//     }

//     updateStore( action) {
//       this.store = reducer(this.store, action);
//     }

//     dispatch(action) {
//       this.updateStore(action)
//     }

//     getHook() {
//       return function useSelector(slicer) {
//         // ...
//       }
//     }
//   }
//   return new Store(reducer, startingStore);
// }

export default configureStore;
