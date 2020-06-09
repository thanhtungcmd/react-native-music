import { createStore, applyMiddleware } from 'redux'
import reducer from '../reducer/index.reducer'
import thunk from 'redux-thunk'

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

export default store
