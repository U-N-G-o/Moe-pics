const initialState ={
    hasTag: []
}

export default function listWithTagReducer(state = initialState, action) {
    switch (action.type) {
        case 'HAS_TAG':
                return {
                    ...state,
                    hasTag: action.hasTag
                }
        default:
            return state;
    }
}