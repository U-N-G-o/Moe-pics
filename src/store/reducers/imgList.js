const initialState = {
    imgList: [],
    currentPage: 1,
    searchVal: ''
}

export default function imgListReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_IMGLIST':
            return {
                ...state,
                imgList: action.imgList
            }


        case 'CHANGE_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }


        case 'CHANGE_SEARCH_VAL':
            return {
                ...state,
                searchVal: action.searchVal
            }
        default:
            return state;
    }
}