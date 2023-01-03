import { call, put, takeLatest } from "redux-saga/effects";
import {
  getWarehouseSuccess,
  getWarehouseError,
  getSUPPLIERSuccess,
  getSUPPLIERError,
  getSUPPLIERSITESuccess,
  getSUPPLIERSITEError,
  getPACKNOSuccess,
  getPACKNOError,
  getDIFFSuccess,
  getDIFFError,
  getSKUSuccess,
  getSKUError,
  getITEM_LIST_HEADSuccess,
  getITEM_LIST_HEADError,
  getVPNSuccess,
  getVPNError,
  getUDASuccess,
  getUDAError,
  getPOSuccess,
  getPOError,
  getHIERSuccess,
  getHIERError,
  getEXCLUDEUDASuccess,
  getEXCLUDEUDAError,
  getALLOC_LEVELSuccess,
  getALLOC_LEVELError,
  getALLOC_TYPESuccess,
  getALLOC_TYPEError,
  getCONTEXT_TYPESuccess,
  getCONTEXT_TYPEError,
  getPROMOTIONSuccess,
  getPROMOTIONError,
  getSTATUSSuccess,
  getSTATUSError,
  postALLOCRESULTSuccess,
  postALLOCRESULTError,
  getALLOC_CRITERIASuccess,
  getALLOC_CRITERIAError,
  postALLOCINSERTSuccess,
  postALLOCINSERTError,
  getITEMPARENTSuccess,
  getITEMPARENTError,
  getHIER2Success,
  getHIER2Error,
  getHIER3Success,
  getHIER3Error,
  postALLOCRESULTCWHSuccess,
  postALLOCRESULTCWHError,
  getASNSuccess,
  getASNError,
  postALLOCRESULTCASNSuccess,
  postALLOCRESULTCASNError,
  getTSFSuccess,
  getTSFError,
  postALLOCRESULTCTSFSuccess,
  postALLOCRESULTCTSFError,
  getALLOCNOSuccess,
  getALLOCNOError,
  getALLOC_AVAIL_SEARCHSuccess,
  getALLOC_AVAIL_SEARCHError,
  getALLOC_AVAIL_QTYSuccess,
  getALLOC_AVAIL_QTYError,
  getUPDATESELINDCREATESuccess,
  getUPDATESELINDCREATEError,
  getSWITCHTABFUNCSuccess,
  getSWITCHTABFUNCError,
  getDELETECREATEGRIDSuccess,
  getDELETECREATEGRIDError,
} from "../Action/createAllocation";
import * as actions from "../constant";
import axiosCall from "../../services/index";
import { API } from "../../services/api";


function* fetchWHSaga(action) {
  try {
    const response = yield call(axiosCall, "GET", API.FETCHWH, action.payload);
    if (response?.status == 200) {
      yield put(getWarehouseSuccess({ warehouseData: response?.data }));
    } else {
      yield put(getWarehouseError(response?.data?.message));
    }
  } catch (e) {
    yield put(getWarehouseError(e.message));
  }
}

export function* WarehouseData() {
  yield takeLatest(actions.GET_WAREHOUSE_REQUEST, fetchWHSaga);
}


function* fetchSUPSaga(action) {
  try {
    const response = yield call(axiosCall, "GET", API.FETCHSUP, action.payload);
    if (response?.status == 200) {
      yield put(getSUPPLIERSuccess({ supplierData: response?.data }));
    } else {
      yield put(getSUPPLIERError(response?.data?.message));
    }
  } catch (e) {
    yield put(getSUPPLIERError(e.message));
  }
}

export function* SupplierData() {
  yield takeLatest(actions.GET_SUPPLIER_REQUEST, fetchSUPSaga);
}


function* fetchSUPSITESaga(action) {
  try {
    const response = yield call(axiosCall, "GET", API.FETCHSUPSITE, action.payload);
    if (response?.status == 200) {
      yield put(getSUPPLIERSITESuccess({ supplerSiteData: response?.data }));
    } else {
      yield put(getSUPPLIERSITEError(response?.data?.message));
    }
  } catch (e) {
    yield put(getSUPPLIERSITEError(e.message));
  }
}

export function* SuppliersSiteData() {
  yield takeLatest(actions.GET_SUPPLIERSITE_REQUEST, fetchSUPSITESaga);
}


function* fetchPACKNOSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.FETCHPKN, action.payload);
    if (response?.status == 200) {
      yield put(getPACKNOSuccess({ packNoData: response?.data }));
    } else {
      yield put(getPACKNOError(response?.data?.message));
    }
  } catch (e) {
    yield put(getPACKNOError(e.message));
  }
}

export function* PackNoData() {
  yield takeLatest(actions.GET_PACKNO_REQUEST, fetchPACKNOSaga);
}


function* fetchDIFFSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.FETCHDIF, action.payload);
    // console.log("response2345:",response)
    if (response?.status == 200) {
      yield put(getDIFFSuccess({ diffData: response?.data }));
    } else {
      yield put(getDIFFError(response?.data?.message));
    }
  } catch (e) {
    yield put(getDIFFError(e.message));
  }
}

export function* DIFFData() {
  yield takeLatest(actions.GET_DIFF_REQUEST, fetchDIFFSaga);
}


function* fetchSKUSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.FETCHSKU, action.payload);
    if (response?.status == 200) {
      yield put(getSKUSuccess({ skuData: response?.data }));
    } else {
      yield put(getSKUError(response?.data?.message));
    }
  } catch (e) {
    yield put(getSKUError(e.message));
  }
}

export function* SkuData() {
  yield takeLatest(actions.GET_SKU_REQUEST, fetchSKUSaga);
}



function* fetchItemListHeadSaga(action) {
  try {
    const response = yield call(axiosCall, "GET", API.FETCHILH, action.payload);
    if (response?.status == 200) {
      yield put(getITEM_LIST_HEADSuccess({ itemListHeadData: response?.data }));
    } else {
      yield put(getITEM_LIST_HEADError(response?.data?.message));
    }
  } catch (e) {
    yield put(getITEM_LIST_HEADError(e.message));
  }
}

export function* ItemListHead() {
  yield takeLatest(actions.GET_ITEM_LIST_HEAD_REQUEST, fetchItemListHeadSaga);
}



function* fetchVPNSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.FETCHVPN, action.payload);
    if (response?.status == 200) {
      yield put(getVPNSuccess({ vpnData: response?.data }));
    } else {
      yield put(getVPNError(response?.data?.message));
    }
  } catch (e) {
    yield put(getVPNError(e.message));
  }
}

export function* VPNData() {
  yield takeLatest(actions.GET_VPN_REQUEST, fetchVPNSaga);
}



function* fetchUDASaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.FETCHUDA, action.payload);
    if (response?.status == 200) {
      yield put(getUDASuccess({ udaData: response?.data }));
    } else {
      yield put(getUDAError(response?.data?.message));
    }
  } catch (e) {
    yield put(getUDAError(e.message));
  }
}

export function* UDAData() {
  yield takeLatest(actions.GET_UDA_REQUEST, fetchUDASaga);
}



function* fetchPOSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.FETCHPO, action.payload);
    if (response?.status == 200) {
      yield put(getPOSuccess({ poData: response?.data }));
    } else {
      yield put(getPOError(response?.data?.message));
    }
  } catch (e) {
    yield put(getPOError(e.message));
  }
}

export function* POData() {
  yield takeLatest(actions.GET_PO_REQUEST, fetchPOSaga);
}



function* fetchHIERSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.FETCHHIER, action.payload);
    if (response?.status == 200) {
      yield put(getHIERSuccess({ hierData: response?.data }));
    } else {
      yield put(getHIERError(response?.data?.message));
    }
  } catch (e) {
    yield put(getHIERError(e.message));
  }
}

export function* HIERData() {
  yield takeLatest(actions.GET_HIER_REQUEST, fetchHIERSaga);
}


function* fetchHIER2Saga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.FETCHHIER2, action.payload);
    if (response?.status == 200) {
      yield put(getHIER2Success({ hier2Data: response?.data }));
    } else {
      yield put(getHIER2Error(response?.data?.message));
    }
  } catch (e) {
    yield put(getHIER2Error(e.message));
  }
}

export function* HIER2Data() {
  yield takeLatest(actions.GET_HIER2_REQUEST, fetchHIER2Saga);
}

function* fetchHIER3Saga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.FETCHHIER3, action.payload);
    if (response?.data?.status == 500) {
      yield put(getHIER3Error(response?.data?.message));
    } else {
      yield put(getHIER3Success({ hier3Data: response?.data }));
    }
  } catch (e) {
    yield put(getHIER3Error(e.message));
  }
}

export function* HIER3Data() {
  yield takeLatest(actions.GET_HIER3_REQUEST, fetchHIER3Saga);
}



function* fetchITEMPARENTSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.FETCHITEMPRT, action.payload);
    if (response?.status == 200) {
      yield put(getITEMPARENTSuccess({ itemParentData: response?.data }));
    } else {
      yield put(getITEMPARENTError(response?.data?.message));
    }
  } catch (e) {
    yield put(getITEMPARENTError(e.message));
  }
}

export function* ITEMPARENTData() {
  yield takeLatest(actions.GET_ITEMPARENT_REQUEST, fetchITEMPARENTSaga);
}


function* fetchASNSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.FETCHASN, action.payload);
    if (response?.status == 200) {
      yield put(getASNSuccess({ asnData: response?.data }));
    } else {
      yield put(getASNError(response?.data?.message));
    }
  } catch (e) {
    yield put(getASNError(e.message));
  }
}

export function* ASNData() {
  yield takeLatest(actions.GET_ASN_REQUEST, fetchASNSaga);
}


function* fetchTSFSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.FETCHTSF, action.payload);
    if (response?.status == 200) {
      yield put(getTSFSuccess({ tsfData: response?.data }));
    } else {
      yield put(getTSFError(response?.data?.message));
    }
  } catch (e) {
    yield put(getTSFError(e.message));
  }
}

export function* TSFData() {
  yield takeLatest(actions.GET_TSF_REQUEST, fetchTSFSaga);
}


function* fetchEXCLUDEUDASaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.FETCHEXCLUDEUDA, action.payload);
    if (response?.status == 200) {
      yield put(getEXCLUDEUDASuccess({ excludeUdaData: response?.data }));
    } else {
      yield put(getEXCLUDEUDAError(response?.data?.message));
    }
  } catch (e) {
    yield put(getEXCLUDEUDAError(e.message));
  }
}

export function* EXCLUDEUDAData() {
  yield takeLatest(actions.GET_UDA_REQUEST, fetchEXCLUDEUDASaga);
}


function* fetchALLOC_LEVELSaga(action) {
  try {
    const response = yield call(axiosCall, "GET", API.FETCHALLEVEL, action.payload);
    if (response?.status == 200) {
      yield put(getALLOC_LEVELSuccess({ allocLevelData: response?.data }));
    } else {
      yield put(getALLOC_LEVELError(response?.data?.message));
    }
  } catch (e) {
    yield put(getALLOC_LEVELError(e.message));
  }
}

export function* ALLOC_LEVELData() {
  yield takeLatest(actions.GET_ALLOC_LEVEL_REQUEST, fetchALLOC_LEVELSaga);
}


function* fetchALLOC_TYPESaga(action) {
  try {
    const response = yield call(axiosCall, "GET", API.FETCHALTYPE, action.payload);
    if (response?.status == 200) {
      yield put(getALLOC_TYPESuccess({ allocTypeData: response?.data }));
    } else {
      yield put(getALLOC_TYPEError(response?.data?.message));
    }
  } catch (e) {
    yield put(getALLOC_TYPEError(e.message));
  }
}

export function* ALLOC_TYPEData() {
  yield takeLatest(actions.GET_ALLOC_TYPE_REQUEST, fetchALLOC_TYPESaga);
}


function* fetchCONTEXT_TYPESaga(action) {
  try {
    const response = yield call(axiosCall, "GET", API.FETCHCNTYPE, action.payload);
    if (response?.status == 200) {
      yield put(getCONTEXT_TYPESuccess({ contextTypeData: response?.data }));
    } else {
      yield put(getCONTEXT_TYPEError(response?.data?.message));
    }
  } catch (e) {
    yield put(getCONTEXT_TYPEError(e.message));
  }
}

export function* CONTEXT_TYPEData() {
  yield takeLatest(actions.GET_CONTEXT_TYPE_REQUEST, fetchCONTEXT_TYPESaga);
}


function* fetchPROMOTIONSaga(action) {
  try {
    const response = yield call(axiosCall, "GET", API.FETCHPROM, action.payload);
    if (response?.status == 200) {
      yield put(getPROMOTIONSuccess({ promotionData: response?.data }));
    } else {
      yield put(getPROMOTIONError(response?.data?.message));
    }
  } catch (e) {
    yield put(getPROMOTIONError(e.message));
  }
}

export function* PROMOTIONData() {
  yield takeLatest(actions.GET_PROMOTION_REQUEST, fetchPROMOTIONSaga);
}


function* fetchSTATUSSaga(action) {
  try {
    const response = yield call(axiosCall, "GET", API.FETCHSTATUS, action.payload);
    if (response?.status == 200) {
      yield put(getSTATUSSuccess({ statusData: response?.data }));
    } else {
      yield put(getSTATUSError(response?.data?.message));
    }
  } catch (e) {
    yield put(getSTATUSError(e.message));
  }
}

export function* STATUSData() {
  yield takeLatest(actions.GET_STATUS_REQUEST, fetchSTATUSSaga);
}


function* fetchALLOCNOSaga(action) {
  try {
    const response = yield call(axiosCall, "GET", API.FETCHALLOCNO, action.payload);
    // console.log("responsealloc_no",response);
    if (response?.status == 200) {
      yield put(getALLOCNOSuccess({ allocNoData: response?.data }));
    } else {
      yield put(getALLOCNOError(response?.data?.message));
    }
  } catch (e) {
    yield put(getALLOCNOError(e.message));
  }
}

export function* ALLOCNOData() {
  yield takeLatest(actions.GET_ALLOCNO_REQUEST, fetchALLOCNOSaga);
}


function* updateALLOCRESULTSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.UPDATEALLOCRES, action.payload);
    if (response?.status == 200) {
      yield put(postALLOCRESULTSuccess({ totalData: response?.data }));
    } else {
      yield put(postALLOCRESULTError(response?.data?.message));
    }
  } catch (e) {
    yield put(postALLOCRESULTError(e.message));
  }
}

export function* ALLOCRESULTData() {
  yield takeLatest(actions.POST_ALLOCRESULT_REQUEST, updateALLOCRESULTSaga);
}


function* fetchALLOC_CRITERIASaga(action) {
  try {
    const response = yield call(axiosCall, "GET", API.FETCHALOCRITERIA, action.payload);
    if (response?.status == 200) {
      yield put(getALLOC_CRITERIASuccess({ criteriaData: response?.data }));
    } else {
      yield put(getALLOC_CRITERIAError(response?.data?.message));
    }
  } catch (e) {
    yield put(getALLOC_CRITERIAError(e.message));
  }
}

export function* ALLOC_CRITERIAData() {
  yield takeLatest(actions.GET_ALLOC_CRITERIA_REQUEST, fetchALLOC_CRITERIASaga);
}



function* updateALLOCINSERTSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.UPDATEALLOCINSERT, action.payload);
    if (response?.status == 201) {
      yield put(postALLOCINSERTSuccess({ Data: response?.data }));
    } else {
      yield put(postALLOCINSERTError(response?.data?.message));
    }
  } catch (e) {
    yield put(postALLOCINSERTError(e.message));
  }
}

export function* ALLOCINSERTData() {
  yield takeLatest(actions.POST_ALLOCINSERT_REQUEST, updateALLOCINSERTSaga);
}


function* updateALLOCRESULTCWHSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.UPDATEALLOCRESWH, action.payload);
    if (response?.status == 200) {
      yield put(postALLOCRESULTCWHSuccess({ totalData: response?.data }));
    } else {
      yield put(postALLOCRESULTCWHError(response?.data?.message));
    }
  } catch (e) {
    yield put(postALLOCRESULTCWHError(e.message));
  }
}

export function* ALLOCRESULTCWHData() {
  yield takeLatest(actions.POST_ALLOCRESULTCWH_REQUEST, updateALLOCRESULTCWHSaga);
}


function* updateALLOCRESULTCASNSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.UPDATEALLOCRESASN, action.payload);
    if (response?.status == 200) {
      yield put(postALLOCRESULTCASNSuccess({ totalData: response?.data }));
    } else {
      yield put(postALLOCRESULTCASNError(response?.data?.message));
    }
  } catch (e) {
    yield put(postALLOCRESULTCASNError(e.message));
  }
}

export function* ALLOCRESULTCASNData() {
  yield takeLatest(actions.POST_ALLOCRESULTCASN_REQUEST, updateALLOCRESULTCASNSaga);
}


function* updateALLOCRESULTCTSFSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.UPDATEALLOCRESTSF, action.payload);
    if (response?.status == 200) {
      yield put(postALLOCRESULTCTSFSuccess({ totalData: response?.data }));
    } else {
      yield put(postALLOCRESULTCTSFError(response?.data?.message));
    }
  } catch (e) {
    yield put(postALLOCRESULTCTSFError(e.message));
  }
}

export function* ALLOCRESULTCTSFData() {
  yield takeLatest(actions.POST_ALLOCRESULTCTSF_REQUEST, updateALLOCRESULTCTSFSaga);
}

function* fetchALLOC_AVAIL_QTYSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.FETCHAVAILQTY, action.payload);
    if (response?.status == 200) {
      yield put(getALLOC_AVAIL_QTYSuccess({ availQty: response?.data }));
    } else {
      yield put(getALLOC_AVAIL_QTYError(response?.data?.message));
    }
  } catch (e) {
    yield put(getALLOC_AVAIL_QTYError(e.message));
  }
}

export function* ALLOC_AVAIL_QTYData() {
  yield takeLatest(actions.GET_ALLOC_AVAIL_QTY_REQUEST, fetchALLOC_AVAIL_QTYSaga);
}

function* fetchALLOC_AVAIL_SEARCHSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.FETCHAVAILSEARCH, action.payload);
    if (response?.status == 200) {
      yield put(getALLOC_AVAIL_SEARCHSuccess({ availSearch: response?.data }));
    } else {
      yield put(getALLOC_AVAIL_SEARCHError(response?.data?.message));
    }
  } catch (e) {
    yield put(getALLOC_AVAIL_SEARCHError(e.message));
  }
}

export function* ALLOC_AVAIL_SEARCHData() {
  yield takeLatest(actions.GET_ALLOC_AVAIL_SEARCH_REQUEST, fetchALLOC_AVAIL_SEARCHSaga);
}


function* fetchUPDATESELINDCREATESaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.UPDATESELINDCREATE, action.payload);
    if (response?.status == 200) {
      yield put(getUPDATESELINDCREATESuccess({ valueSelIndCreate: response?.data }));
    } else {
      yield put(getUPDATESELINDCREATEError(response?.data?.message));
    }
  } catch (e) {
    yield put(getUPDATESELINDCREATEError(e.message));
  }
}

export function* UPDATESELINDCREATEData() {
  yield takeLatest(actions.GET_UPDATESELINDCREATE_REQUEST, fetchUPDATESELINDCREATESaga);
}


function* fetchSWITCHTABFUNCSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.SWITCHTABFUNC, action.payload);
    if (response?.status == 200) {
      yield put(getSWITCHTABFUNCSuccess({ switchTab: response?.data }));
    } else {
      yield put(getSWITCHTABFUNCError(response?.data?.message));
    }
  } catch (e) {
    yield put(getSWITCHTABFUNCError(e.message));
  }
}

export function* switchTabData() {
  yield takeLatest(actions.GET_SWITCHTABFUNC_REQUEST, fetchSWITCHTABFUNCSaga);
}

function* fetchDELETECREATEGRIDSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.DELETECREATEGRID, action.payload);
    if (response?.status == 200) {
      yield put(getDELETECREATEGRIDSuccess({ deleteCreateGrid: response?.data }));
    } else {
      yield put(getDELETECREATEGRIDError(response?.data?.message));
    }
  } catch (e) {
    yield put(getDELETECREATEGRIDError(e.message));
  }
}

export function* DELETECREATEGRIDData() {
  yield takeLatest(actions.GET_DELETECREATEGRID_REQUEST, fetchDELETECREATEGRIDSaga);
}
