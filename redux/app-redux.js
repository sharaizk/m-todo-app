import {createStore, applyMiddleware,compose} from 'redux'
import reduxThunk from 'redux-thunk'
import reducers from './reducers'
// store


export const store = createStore(
    reducers,
    compose(applyMiddleware(reduxThunk))
)