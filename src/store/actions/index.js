const HAS_COLLECTED = 'HAS_COLLECTED';
const CHANGE_IMGLIST = 'CHANGE_IMGLIST';
const CHANGE_PAGE = 'CHANGE_PAGE';
const CHANGE_SEARCH_VAL = 'CHANGE_SEARCH_VAL';
const HAS_TAG = 'HAS_TAG';
const CHANGE_API = 'CHANGE_API';
const SHOW_TYPE = 'SHOW_TYPE';
const IS_SHOW = 'IS_SHOW';
const SCROLL_TOP = 'SCROLL_TOP';

function changeShowType(showType) {
  return {
    type: SHOW_TYPE,
    showType
  }
}

function changeIsShow(isShow) {
  return {
    type: IS_SHOW,
    isShow
  }
}

function changeOffsety(scrollTop) {
  return {
    type: SCROLL_TOP,
    scrollTop
  }
}

function changeApi(api) {
  return {
    type: CHANGE_API,
    api
  }
}

function listWithTag(hasTag) {
  return {
    type: HAS_TAG,
    hasTag
  }
}

function collectionManager(collectList) {
  return {
    type: HAS_COLLECTED,
    collectList
  }
}

function changeImgList(imgList) {
  return {
    type: CHANGE_IMGLIST,
    imgList
  }
}

function changePage(currentPage) {
  return {
    type: CHANGE_PAGE,
    currentPage
  }
}

function changeSearchVal(searchVal) {
  return {
    type: CHANGE_SEARCH_VAL,
    searchVal
  }
}

export {
  changeShowType,
  changeIsShow,
  changeOffsety,
  changeApi,
  listWithTag,
  collectionManager,
  changeImgList,
  changePage,
  changeSearchVal,
}