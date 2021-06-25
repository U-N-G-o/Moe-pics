import { urlList } from "../../configs/config";

const initialState = {
  api: urlList[0].name
}

export default function changeApiReducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_API':
      return {
        ...state,
        api: action.api
      }
    default:
      return state;
  }
}