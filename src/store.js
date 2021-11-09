import { getFirebase } from 'react-redux-firebase'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducers'

const middlewares = [
  thunk.withExtraArgument(getFirebase)
]

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(...middlewares)
  )
)

export default store