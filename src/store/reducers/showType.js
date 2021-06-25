const initialState = {
    showType: 'grid',
    isShow: false,
    scrollTop: 0,
}

export default function showTypeReducer(state = initialState, action) {
    switch (action.type) {
        case 'SHOW_TYPE':
            return {
                ...state,
                showType: action.showType
            }

        case 'IS_SHOW':
            return {
                ...state,
                isShow: action.isShow
            }

        case 'SCROLL_TOP':
            return {
                ...state,
                scrollTop: action.scrollTop
            }
        default:
            return state;
    }
}