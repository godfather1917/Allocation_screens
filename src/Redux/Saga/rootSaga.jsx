import { all, fork } from "redux-saga/effects";
import StagingProcessing from "./stagingProcessingSaga";
import { ErrorProcessing, updateErrorProcessing, getClassData, getLocationData } from "./errorProcessingSaga";
import { updateSystemConfig, SystemConfig } from "./systemConfigSaga";
import { DailyCountData, StageCountData, ErrorCountData } from "./dashBoardSaga";
import { DailySkuRollupData, getLocationRecData, getDeptRecData } from "./reconciliationSaga";
import { InquiryData } from "./inquirySaga";
import { TransactionReversal, updateTransactionReversal, cancelTransactionReversal, getClassDataTrans, getLocationDataTrans } from "./transactionReversalSaga";
import { CostChange, updateCostChange } from "./CostChangeSaga";
import { GlAccount, updateGlAccount, GLcurrency } from "./glaccountSaga";
import { GlAccountcreation } from "./glaccountSagacreation";
import { FinanceInterface } from "./FinanceInterfaceSaga";
import { DailyView } from "./DailyViewSaga";
import { SubLedgerCost } from "./subLedgerCostSaga";
import { SysConfigcreation, GlPrimary } from "./SysConfigCreationSaga";
import {
  WarehouseData, SupplierData, SuppliersSiteData, PackNoData,
  DIFFData, SkuData, ItemListHead, VPNData, UDAData, POData, HIERData, EXCLUDEUDAData,
  ALLOC_LEVELData, ALLOC_TYPEData, CONTEXT_TYPEData, PROMOTIONData, STATUSData, ALLOCRESULTData,
  ALLOC_CRITERIAData, ALLOCINSERTData, ITEMPARENTData, HIER2Data, HIER3Data, ALLOCRESULTCWHData,
  ASNData, ALLOCRESULTCASNData, TSFData, ALLOCRESULTCTSFData, ALLOCNOData, ALLOC_AVAIL_QTYData,
  ALLOC_AVAIL_SEARCHData, UPDATESELINDCREATEData, switchTabData, DELETECREATEGRIDData
} from "./CreateAllocationSaga";
import {
  ALLOCHEADDETAILSData, QTYLIMITSData, ALLOCNODETAILSData,
  UPDATEQTYLIMITSData, OKQTYLIMITSSRNData
} from "./quantityLimitsSaga";
import { likeItemTableData, insertLikeItemData, LIKEALLOCHEADDETAILSData, LIKEALLOCNODETAILSData } from "./LikeItemMapSaga";
import {
  RULESTYPEData, NEEDTYPEData, ALLOCATETOTYPEData, HIERARCHYTYPEData,
  FETCHLOCATIONDATAData, LOCATIONRLData, LOCATIONLISTRLData,
  LOCATIONTRAITSRLData, CLEARANCERLData, STATUSRLData, UPDATERULESRLRLData,
  UPDATELOCATIONRLData, DELETELOCATIONRLData, LOADWEIGHTCHANGERLData,
  LOADRULEDATERLData, RETRIEVERULEDATERLData, UPDATECHANGEWEIGHTSRLData, FETCHLOCGRIDData
} from "./RulesLocationSaga";

export function* rootSaga() {
  yield all([
    fork(StagingProcessing),
    fork(ErrorProcessing),
    fork(updateErrorProcessing),
    fork(getClassData),
    fork(getLocationData),
    fork(SystemConfig),
    fork(updateSystemConfig),
    fork(DailyCountData),
    fork(StageCountData),
    fork(ErrorCountData),
    fork(DailySkuRollupData),
    fork(getDeptRecData),
    fork(getLocationRecData),
    fork(InquiryData),
    fork(TransactionReversal),
    fork(updateTransactionReversal),
    fork(getClassDataTrans),
    fork(getLocationDataTrans),
    fork(cancelTransactionReversal),
    fork(CostChange),
    fork(updateCostChange),
    fork(updateGlAccount),
    fork(GlAccount),
    fork(GLcurrency),
    fork(GlAccountcreation),
    fork(FinanceInterface),
    fork(DailyView),
    fork(SubLedgerCost),
    fork(SysConfigcreation),
    fork(GlPrimary),
    fork(WarehouseData),
    fork(SupplierData),
    fork(SuppliersSiteData),
    fork(PackNoData),
    fork(DIFFData),
    fork(SkuData),
    fork(ItemListHead),
    fork(VPNData),
    fork(UDAData),
    fork(POData),
    fork(HIERData),
    fork(EXCLUDEUDAData),
    fork(ALLOC_LEVELData),
    fork(ALLOC_TYPEData),
    fork(CONTEXT_TYPEData),
    fork(PROMOTIONData),
    fork(STATUSData),
    fork(ALLOCRESULTData),
    fork(ALLOC_CRITERIAData),
    fork(ALLOCINSERTData),
    fork(ITEMPARENTData),
    fork(HIER2Data),
    fork(HIER3Data),
    fork(ALLOCRESULTCWHData),
    fork(ASNData),
    fork(ALLOCRESULTCASNData),
    fork(TSFData),
    fork(ALLOCRESULTCTSFData),
    fork(ALLOCNOData),
    fork(ALLOCHEADDETAILSData),
    fork(QTYLIMITSData),
    fork(ALLOCNODETAILSData),
    fork(UPDATEQTYLIMITSData),
    fork(likeItemTableData),
    fork(insertLikeItemData),
    fork(LIKEALLOCHEADDETAILSData),
    fork(LIKEALLOCNODETAILSData),
    fork(ALLOC_AVAIL_QTYData),
    fork(ALLOC_AVAIL_SEARCHData),
    fork(RULESTYPEData),
    fork(NEEDTYPEData),
    fork(HIERARCHYTYPEData),
    fork(ALLOCATETOTYPEData),
    fork(FETCHLOCATIONDATAData),
    fork(LOCATIONRLData),
    fork(LOCATIONLISTRLData),
    fork(LOCATIONTRAITSRLData),
    fork(CLEARANCERLData),
    fork(STATUSRLData),
    fork(UPDATERULESRLRLData),
    fork(UPDATELOCATIONRLData),
    fork(DELETELOCATIONRLData),
    fork(LOADWEIGHTCHANGERLData),
    fork(LOADRULEDATERLData),
    fork(RETRIEVERULEDATERLData),
    fork(UPDATECHANGEWEIGHTSRLData),
    fork(UPDATESELINDCREATEData),
    fork(FETCHLOCGRIDData),
    fork(switchTabData),
    fork(DELETECREATEGRIDData),
    fork(OKQTYLIMITSSRNData),
  ]);
}
