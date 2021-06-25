import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import imgListReducer from './reducers/imgList'
import listWithTagReducer from './reducers/listWithTag'
import showTypeReducer from './reducers/showType'
import collectionManager from './reducers/collectList'
import changeApiReducer from './reducers/selectApi'

const allReducers = combineReducers({
  img: imgListReducer,
  listWithTag: listWithTagReducer,
  showType: showTypeReducer,
  collectList: collectionManager,
  api: changeApiReducer,
})

const store = createStore(allReducers, applyMiddleware(ReduxThunk))

window.Store = store
export default store;