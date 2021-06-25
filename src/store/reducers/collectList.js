import {collections} from '../../models/index'
import {getCollectList} from '../../utils/functions'

const initialState ={
    collectList: getCollectList(collections())
}

export default function collectionManagerReducer(state = initialState, action) {
    switch (action.type) {
        case 'HAS_COLLECTED':
                return {
                    ...state,
                    collectList: action.collectList
                }
        default:
            return state;
    }
}