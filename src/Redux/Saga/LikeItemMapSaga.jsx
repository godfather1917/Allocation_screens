import { call, put, takeLatest } from "redux-saga/effects";
import {
  getAllocItemsSuccess,
  getAllocItemsError,
  postLIkeInsertSuccess,
  postLIkeInsertError,
} from "../Action/likeItemMap";
import {
  getALLOCHEADDETAILSSuccess,
  getALLOCHEADDETAILSError,
  getALLOCNODETAILSSuccess,
    getALLOCNODETAILSError,
} from "../Action/quantityLimits";
import * as actions from "../constant";
import axiosCall from "../../services/index";
import { API } from "../../services/api";


function* fetchAllocItemsSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.FETCHALLOCITEMS,action.payload);
    if (response?.status == 200) {
      yield put(getAllocItemsSuccess({ likeItemTableData: response?.data }));
    } else {
      yield put(getAllocItemsError(response?.data?.message));
    }
  } catch (e) {
    yield put(getAllocItemsError(e.message));
  }
}

export function* likeItemTableData() {
  yield takeLatest(actions.GET_ALLOC_ITEMS_REQUEST, fetchAllocItemsSaga);
}
function* insertLikeItem(action) {
try {
  const response = yield call(axiosCall, "POST", API.INSERTLIKEITEM, action.payload);
  if (response?.status == 200) {
    yield put(postLIkeInsertSuccess({ insertLikeItemData: response?.data }));
  } else {
    yield put(postLIkeInsertError(response?.data?.message));
  }
} catch (e) {
  yield put(postLIkeInsertError(e.message));
}
}

export function* insertLikeItemData() {
  yield takeLatest(actions.POST_LIKE_INSERT_REQUEST, insertLikeItem);
}

function* fetchALLOCHEADDETAILSSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.FETCHALLOCHEADDETAILS,action.payload);
    // console.log("responsealloc_no",response);
    if (response?.status == 200) {
      yield put(getALLOCHEADDETAILSSuccess({ allocHDetails: response?.data }));
    } else {
      yield put(getALLOCHEADDETAILSError(response?.data?.message));
    }
  } catch (e) {
    yield put(getALLOCHEADDETAILSError(e.message));
  }
}

export function* LIKEALLOCHEADDETAILSData() {
  yield takeLatest(actions.GET_ALLOCHEADDETAILS_REQUEST, fetchALLOCHEADDETAILSSaga);
}


function* fetchALLOCNODETAILSSaga(action) {
  try {
    const response = yield call(axiosCall, "GET", API.FETCHALLOCNODTLS,action.payload);
    // console.log("responsealloc_no",response);
    if (response?.status == 200) {
      yield put(getALLOCNODETAILSSuccess({ allocIDs: response?.data }));
    } else {
      yield put(getALLOCNODETAILSError(response?.data?.message));
    }
  } catch (e) {
    yield put(getALLOCNODETAILSError(e.message));
  }
}

export function* LIKEALLOCNODETAILSData() {
  yield takeLatest(actions.GET_ALLOCNODETAILS_REQUEST, fetchALLOCNODETAILSSaga);
}