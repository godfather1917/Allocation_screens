import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import Table from "../../Components/Table/index";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import InputLabel from '@mui/material/InputLabel';
import Drawer from "@mui/material/Drawer";
import { makeStyles, withStyles } from "@mui/styles";
import {
  getWarehouseRequest,
  getSUPPLIERRequest,
  getSUPPLIERSITERequest,
  getPACKNORequest,
  getDIFFRequest,
  getSKURequest,
  getITEM_LIST_HEADRequest,
  getVPNRequest,
  getUDARequest,
  getPORequest,
  getHIERRequest,
  getEXCLUDEUDARequest,
  getALLOC_LEVELRequest,
  getALLOC_TYPERequest,
  getCONTEXT_TYPERequest,
  getPROMOTIONRequest,
  getSTATUSRequest,
  postALLOCRESULTRequest,
  getALLOC_CRITERIARequest,
  postALLOCINSERTRequest,
  getITEMPARENTRequest,
  getHIER2Request,
  getHIER3Request,
  postALLOCRESULTCWHRequest,
  getASNRequest,
  postALLOCRESULTCASNRequest,
  getTSFRequest,
  postALLOCRESULTCTSFRequest,
  getALLOCNORequest,
  getALLOC_AVAIL_SEARCHRequest,
  getALLOC_AVAIL_QTYRequest,
  getUPDATESELINDCREATERequest,
  getSWITCHTABFUNCRequest,
  getDELETECREATEGRIDRequest,
} from "../../Redux/Action/createAllocation";
import CircularProgress from "@mui/material/CircularProgress";
// import { headCells } from "./tableHead";
import SearchIcon from "@mui/icons-material/Search";
import { alpha } from "@mui/material/styles";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SendIcon from "@mui/icons-material/Send";
//import { trnType } from "./transType.js";
// import { errorList } from "./errorType.js";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import swal from '@sweetalert/with-react';
// import TrnTypeList from "../TRNTYPE";
import Select from 'react-select';
import makeAnimated, { Input } from 'react-select/animated';
import { ConstructionOutlined } from "@mui/icons-material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import { headCells } from "./tableHead";
import TableSortLabel from '@mui/material/TableSortLabel';
import PropTypes from 'prop-types';
import Toolbar from "@mui/material/Toolbar";
import Tab from "@mui/material/Tab";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from '@mui/icons-material/Info';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DataGrid } from '@mui/x-data-grid';
import ForwardIcon from '@mui/icons-material/Forward';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Card, CardContent, ListItemIcon } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { height } from "@mui/system";
//import "./index.css";
import QuantityLimits from "../QuantityLimits/index";
import LikeItemMap from "../LikeItem/index";
import RulesAndLocation from "../Rules/index";
// import { GET_SWITCHTABFUNC_REQUEST } from "../../Redux/constant";
// import { set } from "immer/dist/internal";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const animatedComponents = makeAnimated();

const styleSelect = {
  control: base => ({
    ...base,
    width: "200px",
    fontSize: "14px",
    // This line disable the blue border
    borderRadius: "0",
    // backgroundColor:"#f0f0f0",
    boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
    // borderColor: state.isFocused ?
    //       '#ddd' : isValid ?
    //       '#ddd' : 'red',
    // '&:hover': {
    //   borderColor: state.isFocused ?
    //     '#ddd' : isValid ?
    //     '#ddd' : 'red'
    // }
  })
  ,
  dropdownIndicator: (base) => ({
    ...base,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  clearIndicator: (base) => ({
    ...base,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  valueContainer: (provided) => ({
    ...provided,
    // minHeight: '1px',
    // height: '40px',
    paddingTop: '0',
    paddingBottom: '0',
  }),
  singleValue: (provided) => ({
    ...provided,
    // minHeight: '1px',
    // paddingBottom: '0px',

  }),
  input: (provided) => ({
    ...provided,
    width: "100%",
    // minHeight: '1px',
  }),
  option: provided => ({
    ...provided,
    // color: 'blue',
    fontSize: "12px",
  }),
};

const tabStyle = { border: "solid 1px", borderRadius: '12px 12px 0px 0px', marginRight: '5px' }

const useStyles = makeStyles({
  maindiv: {
    position: "relative",
    // backgroundColor:"yellow",
    // width:"100%",
    width: "calc(95vw - 0px)",
    "& table": {
      "& tr": {
        "& td:nth-child(29)": {
          display: "none",
        },
        "& td:nth-child(30)": {
          display: "none",
        },
        "& td:nth-child(31)": {
          display: "none",
        },
      },
    },
  },
  boxDiv: {
    textAlign: "initial",
    position: "relative",
    maxWidth: "1400px",
    // backgroundColor:"yellow"
  },
  uploaddiv: {
    display: "flex",
    alignItems: "center",
    marginTop: "50px",
    textAlign: "start",
    gap: 20,
    // backgroundColor:"lightgreen"
  },
  GobackDiv: {
    cursor: "pointer",
  },
  textField: {
    marginRight: "10px !important",
  },
  dateField: {
    "& .MuiInput-input": {
      color: "rgba(102,102,102,1)",
    },
  },
  popUp: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    padding: "20px 20px 20px 20px",
  },
  input: {
    // width: "250px",
    height: 37.8,
    // background: "rgb(255, 255, 255)",
    '& input + fieldset': {
      // borderColor: 'gray',
      borderRadius: "0",
      boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
      color: "green"
    },
    "& .MuiFilledInput-root": {
      backgroundColor: "rgb(255, 255, 255)"
    }
  },
  formRadio: {
    "& .MuiSvgIcon-root": {
      height: 18,
      width: 18,
    }
  },
  inputField: {
    width: "100%",
    height: 37.8,
    // margin:"10px 0px 0px 0px",
    // height: 30,

    backgroundColor: "#f0f0f0",
    '& input + fieldset': {
      // borderColor: 'gray',
      borderRadius: "0",
      boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
    },
  },
  inputFieldTable: {
    width: "100%",
    height: 37.8,
    // margin:"10px 0px 0px 0px",
    // height: 30,
    backgroundColor: "#f0f0f0",
    '& input + fieldset': {
      // borderColor: 'gray',
      borderRadius: "0",
      boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
    },
  },
  inputFielddate: {
    width: "200px",
    // margin:"10px 0px 0px 0px",
    height: 38,
    border: 0,

    // backgroundColor:"#f0f0f0",
    '& input + fieldset': {
      // borderColor: 'gray',
      borderRadius: "0",
      boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
    },
  },
  float_container: {
    display: "inline-block",
    // margin: "0.3rem",
    // padding: "1rem 1rem",
    // text-align: center;
  },
  float_child: {
    display: "inline-block",
    // border: "1px solid red",
    margin: "0.2rem",
    padding: "0rem 0rem",
    verticalAlign: "middle",
  },
  container: {
    display: "flex",
    float: "left"
  },
  container_child: {
    float: "left"
  },
  container_button: {
    // margin:"0.5rem"
  },
  grid_child: {
    display: "inline-block",
    // border: "1px solid red",
    padding: "0rem 0.5rem",
    // verticalAlign: "middle",
  },
  course_box: {
    width: "100%",
    // margin:"0 auto",
    // display: "block",
    // flexWrap:"wrap",
  },
  course_list: {
    // backgroundColor:"lightgreen",
    // position: "relative"
  },
  listdropdown: {
    padding: "0"
  },
  hoverdropdown: {
    display: "inline-block",
    fontSize: "20px",
  },
  grid_block: {
    display: "inline-block",
    // border: "1px solid red",
    padding: "0rem 0rem",
    verticalAlign: "middle",
  },
  grid_container: {
    display: "inline-block",
    // margin: "0.3rem",
  },
  header_container: {
    display: "inline-block",
    // marginTop: "0.2rem",
    // padding: "1rem 1rem",
    // text-align: center;
  },
  header_child: {
    display: "inline-block",
    // border: "1px solid red",
    padding: "0rem 0.2rem",
    verticalAlign: "middle",
  },
  grid_child1: {
    display: "inline-block",
    border: "2px solid #0087ff",
    padding: "0px 5px 2px 5px",
    // verticalAlign: "middle",
  },
  TableCell: {
    color: "#fff",
    padding: "6px 6px !important",
    lineHeight: "1.2rem !important",
  },
  TitleHead: {
    // height: "25px",
    position: "sticky",
    top: -1,
  },
  multiselectfield: {
    display: "inline-block",
    // border: "1px solid red",
    margin: "0rem",
    padding: "0rem 0rem",
    verticalAlign: "middle",
  },
  root: {
    "& .MuiFilledInput-root": {
      background: "rgb(232, 241, 250)"
    }
  },
});



// const useStyles = makeStyles({
//     input: {
//       width: 400,
//       height: 150,
//       '& input + fieldset': {
//         borderColor: 'hotpink',
//       },
//     },
//   });
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-container": {
    "& .MuiPaper-root": {
      width: "100%",
      maxWidth: "1000px",  // Set your width here
    },
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const initialDataPO = {

  HIER1: [],
  HIER2: [],
  HIER3: [],
  WH: [],
  SUPPLIER: [],
  SUPPLIER_SITE: [],
  PACK_NO: [],
  ITEM_PARENT: [],
  DIFF_ID: [],
  SKU: [],
  ITEM_LIST_NO: [],
  VPN: [],
  UDA: [],
  PO: [],
  PO_TYPE: [],
  ESID_FROM: [],
  ESID_TO: [],
  NOT_BEFORE_DATE_FROM: [],
  NOT_BEFORE_DATE_TO: [],
  UDA: [],
  UDA_VALUE: [],
  EXCLUDE_UDA: [],
  EXCLUDE_UDA_VALUE: [],
}

const initialDataWH = {

  HIER1: [],
  HIER2: [],
  HIER3: [],
  WH: [],
  SUPPLIER: [],
  SUPPLIER_SITE: [],
  PACK_NO: [],
  ITEM_PARENT: [],
  DIFF_ID: [],
  SKU: [],
  ITEM_LIST_NO: [],
  VPN: [],
  UDA: [],
  AVAIL_QTY_GREATER: "",
  AVAIL_QTY_LESS: "",
  UDA: [],
  UDA_VALUE: [],
  EXCLUDE_UDA: [],
  EXCLUDE_UDA_VALUE: [],
}

const initialDataASN = {
  HIER1: [],
  HIER2: [],
  HIER3: [],
  WH: [],
  SUPPLIER: [],
  SUPPLIER_SITE: [],
  PACK_NO: [],
  ITEM_PARENT: [],
  DIFF_ID: [],
  SKU: [],
  ITEM_LIST_NO: [],
  VPN: [],
  UDA: [],
  ASN: [],
  UDA: [],
  UDA_VALUE: [],
  EXCLUDE_UDA: [],
  EXCLUDE_UDA_VALUE: [],
}

const initialDataTSF = {
  HIER1: [],
  HIER2: [],
  HIER3: [],
  WH: [],
  SUPPLIER: [],
  SUPPLIER_SITE: [],
  PACK_NO: [],
  ITEM_PARENT: [],
  DIFF_ID: [],
  SKU: [],
  ITEM_LIST_NO: [],
  VPN: [],
  UDA: [],
  TSF: [],
  UDA: [],
  UDA_VALUE: [],
  EXCLUDE_UDA: [],
  EXCLUDE_UDA_VALUE: [],
}

const initialHeaderData = {
  ALLOC_CRITERIA: "",
  CONTEXT: "",
  ALLOC_LEVEL: "",
  ALLOC_TYPE: "",
  STATUS: "",
  PROMOTION: "",
  CREATE_ID: JSON.parse(localStorage.getItem("userData"))?.username,
  ALLOC_DESC: "",
  RELEASE_DATE: new Date().toISOString().slice(0, 10),
  ALLOC_NO: "",
  ALLOC_LEVEL_CODE: "",
  ALLOC_TYPE_CODE: "",
  STATUS_CODE: "",
  PROMOTION_CODE: "",
  CONTEXT_CODE: "",
}

const options = [
  // { value: "None" },
  { value: "PURCHASE_ORDER" },
  { value: "WAREHOUSE" },
  { value: "ASN" },
  { value: "TRANSFER" },
  { value: "WHAT_IF" },
];




const CreateAllocation = () => {
  const [searchDataCPO, setSearchDataCPO] = useState(initialDataPO);
  const [searchDataCWH, setSearchDataCWH] = useState(initialDataWH);
  const [searchDataCASN, setSearchDataCASN] = useState(initialDataASN);
  const [searchDataCTSF, setSearchDataCTSF] = useState(initialDataTSF);
  const [isSearch, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
  const [tabledata, setTabledata] = useState("");
  const [totalData, setTotalData] = useState([]);
  const [allData, setAllData] = useState("");
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [selected, setSelected] = React.useState([]);
  const [searchHeaderData, setSearchHeaderData] = useState(initialHeaderData);
  const [headerDis, setHeaderDis] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const [tab, setTab] = React.useState('1');

  const [isValidCTEDF, setIsValidCTEDF] = useState(false);
  const [isValidCTNDF, setIsValidCTNDF] = useState(false);
  const [isValidCTEDT, setIsValidCTEDT] = useState(false);
  const [isValidCTNDT, setIsValidCTNDT] = useState(false);
  const [isGreatCTEDF, setIsGreatCTEDF] = useState(false);
  const [isGreatCTNDF, setIsGreatCTNDF] = useState(false);
  const [isGreatCTEDT, setIsGreatCTEDT] = useState(false);
  const [isGreatCTNDT, setIsGreatCTNDT] = useState(false);


  ///////////////////////////////////////////
  ///API WEB SERVICE DATA //
  ////////////////////////////////////

  const [warehouseData, setWarehouseData] = useState([{}]);
  const [supplierData, setSupplierData] = useState([{}]);
  const [supplerSiteData, setSupplerSiteData] = useState([{}]);
  const [packNoData, setPackNoData] = useState([{}]);
  const [diffData, setDIffData] = useState([{}]);
  const [skuData, setSkuData] = useState([{}]);
  const [itemListHeadData, setItemListHeadData] = useState([{}]);
  const [vpnData, setVpnData] = useState([{}]);
  const [udaData, setUdaData] = useState([{}]);
  const [poData, setPoData] = useState([{}]);
  const [hierData, setHierData] = useState([{}]);
  const [hier2Data, setHier2Data] = useState([{}]);
  const [hier3Data, setHier3Data] = useState([{}]);
  const [excludeUdaData, setExcludeUdaData] = useState([{}]);
  const [allocLevelData, setAllocLevelData] = useState([{}]);
  const [allocTypeData, setAllocTypeData] = useState([{}]);
  const [contextTypeData, setContextTypeData] = useState([{}]);
  const [promotionData, setPromotionData] = useState([{}]);
  const [statusData, setStatusData] = useState([{}]);
  const [asnData, setAsnData] = useState([{}]);
  const [tsfData, setTsfData] = useState([{}]);
  const [criteriaData, setCriteriaData] = useState([{}]);
  const [totalDataCPO, setTotalDataCPO] = useState([]);
  const [itemParentData, setItemParentData] = useState([{}]);
  const [totalDataCWH, setTotalDataCWH] = useState([]);
  const [totalDataCASN, setTotalDataCASN] = useState([]);
  const [totalDataCTSF, setTotalDataCTSF] = useState([]);
  const [allocNoData, setAllocNoData] = useState([]);
  const [statusCreateData, setStatusCreateData] = useState([{}]);
  const [availQty, setAvailQty] = useState([]);
  const [availSearch, setAvailSearch] = useState([]);
  const [valAvailQty, setValAvailQty] = useState([]);

  const [openAvailDialog, setOpenAvailDialog] = React.useState(false);
  const [availCheck, setAvailCheck] = useState(false);
  const [totalAvailQty, setTotalAvailQty] = useState(0)
  const [valueSelIndCreate, setValueSelIndCreate] = useState([]);
  const [UpdateSelIndCreate, setUpdateSelIndCreate] = useState([{}]);
  const [deleteCreateGrid, setDeleteCreateGrid] = useState([]);
  const [isValidQtyLimits, setIsValidQtyLimits] = useState(false);


  ///////////////////////////////////////////
  ///CRITERIA PURCHASE ORDER//
  ////////////////////////////////////

  const [inputHIER1CPO, setInputHIER1CPO] = useState("");
  const [inputHIER2CPO, setInputHIER2CPO] = useState("");
  const [inputHIER3CPO, setInputHIER3CPO] = useState("");
  const [inputITEM_PARENTCPO, setInputITEM_PARENTCPO] = useState("");
  const [valHIER1CPO, setValHIER1CPO] = useState([]);
  const [valHIER2CPO, setValHIER2CPO] = useState([]);
  const [valHIER3CPO, setValHIER3CPO] = useState([]);
  const [valITEM_PARENTCPO, setValITEM_PARENTCPO] = useState([]);
  const [inputWHCPO, setInputWHCPO] = useState("");
  const [valWHCPO, setValWHCPO] = useState([]);
  const [inputSUPPLIERCPO, setInputSUPPLIERCPO] = useState("");
  const [valSUPPLIERCPO, setValSUPPLIERCPO] = useState([]);
  const [inputSUPPLIER_SITECPO, setInputSUPPLIER_SITECPO] = useState("");
  const [valSUPPLIER_SITECPO, setValSUPPLIER_SITECPO] = useState([]);
  const [inputPACK_NOCPO, setInputPACK_NOCPO] = useState("");
  const [valPACK_NOCPO, setValPACK_NOCPO] = useState([]);
  const [inputDIFF_IDCPO, setInputDIFF_IDCPO] = useState("");
  const [valDIFF_IDCPO, setValDIFF_IDCPO] = useState([]);
  const [inputSKUCPO, setInputSKUCPO] = useState("");
  const [valSKUCPO, setValSKUCPO] = useState([]);
  const [inputITEM_LIST_NOCPO, setInputITEM_LIST_NOCPO] = useState("");
  const [valITEM_LIST_NOCPO, setValITEM_LIST_NOCPO] = useState([]);
  const [inputVPNCPO, setInputVPNCPO] = useState("");
  const [valVPNCPO, setValVPNCPO] = useState([]);
  const [inputUDACPO, setInputUDACPO] = useState("");
  const [valUDACPO, setValUDACPO] = useState([]);
  const [inputPOCPO, setInputPOCPO] = useState("");
  const [valPOCPO, setValPOCPO] = useState([]);
  const [inputPO_TYPECPO, setInputPO_TYPECPO] = useState("");
  const [valPO_TYPECPO, setValPO_TYPECPO] = useState([]);
  const [inputUDA_VALUECPO, setInputUDA_VALUECPO] = useState("");
  const [valUDA_VALUECPO, setValUDA_VALUECPO] = useState([]);
  const [filterUDAValueCPO, setFilterUDAValueCPO] = useState([]);
  const [inputEXCLUDE_UDACPO, setInputEXCLUDE_UDACPO] = useState("");
  const [valEXCLUDE_UDACPO, setValEXCLUDE_UDACPO] = useState([]);
  const [filterEXCLUDE_UDAValueCPO, setFilterEXCLUDE_UDAValueCPO] = useState([]);
  const [inputEXCLUDE_UDA_VALUECPO, setInputEXCLUDE_UDA_VALUECPO] = useState("");
  const [valEXCLUDE_UDA_VALUECPO, setValEXCLUDE_UDA_VALUECPO] = useState([]);

  ///////////////////////////////////////////
  ///CRITERIA WAREHOUSE//
  ////////////////////////////////////

  const [inputHIER1CWH, setInputHIER1CWH] = useState("");
  const [inputHIER2CWH, setInputHIER2CWH] = useState("");
  const [inputHIER3CWH, setInputHIER3CWH] = useState("");
  const [inputITEM_PARENTCWH, setInputITEM_PARENTCWH] = useState("");
  const [valHIER1CWH, setValHIER1CWH] = useState([]);
  const [valHIER2CWH, setValHIER2CWH] = useState([]);
  const [valHIER3CWH, setValHIER3CWH] = useState([]);
  const [valITEM_PARENTCWH, setValITEM_PARENTCWH] = useState([]);
  const [inputWHCWH, setInputWHCWH] = useState("");
  const [valWHCWH, setValWHCWH] = useState([]);
  const [inputSUPPLIERCWH, setInputSUPPLIERCWH] = useState("");
  const [valSUPPLIERCWH, setValSUPPLIERCWH] = useState([]);
  const [inputSUPPLIER_SITECWH, setInputSUPPLIER_SITECWH] = useState("");
  const [valSUPPLIER_SITECWH, setValSUPPLIER_SITECWH] = useState([]);
  const [inputPACK_NOCWH, setInputPACK_NOCWH] = useState("");
  const [valPACK_NOCWH, setValPACK_NOCWH] = useState([]);
  const [inputDIFF_IDCWH, setInputDIFF_IDCWH] = useState("");
  const [valDIFF_IDCWH, setValDIFF_IDCWH] = useState([]);
  const [inputSKUCWH, setInputSKUCWH] = useState("");
  const [valSKUCWH, setValSKUCWH] = useState([]);
  const [inputITEM_LIST_NOCWH, setInputITEM_LIST_NOCWH] = useState("");
  const [valITEM_LIST_NOCWH, setValITEM_LIST_NOCWH] = useState([]);
  const [inputVPNCWH, setInputVPNCWH] = useState("");
  const [valVPNCWH, setValVPNCWH] = useState([]);
  const [inputASNCASN, setInputASNCASN] = useState("");
  const [valASNCASN, setValASNCASN] = useState([]);
  const [inputUDACWH, setInputUDACWH] = useState("");
  const [valUDACWH, setValUDACWH] = useState([]);
  const [inputUDA_VALUECWH, setInputUDA_VALUECWH] = useState("");
  const [valUDA_VALUECWH, setValUDA_VALUECWH] = useState([]);
  const [filterUDAValueCWH, setFilterUDAValueCWH] = useState([]);
  const [inputEXCLUDE_UDACWH, setInputEXCLUDE_UDACWH] = useState("");
  const [valEXCLUDE_UDACWH, setValEXCLUDE_UDACWH] = useState([]);
  const [filterEXCLUDE_UDAValueCWH, setFilterEXCLUDE_UDAValueCWH] = useState([]);
  const [inputEXCLUDE_UDA_VALUECWH, setInputEXCLUDE_UDA_VALUECWH] = useState("");
  const [valEXCLUDE_UDA_VALUECWH, setValEXCLUDE_UDA_VALUECWH] = useState([]);

  ///////////////////////////////////////////
  ///CRITERIA ASN//
  ////////////////////////////////////

  const [inputHIER1CASN, setInputHIER1CASN] = useState("");
  const [inputHIER2CASN, setInputHIER2CASN] = useState("");
  const [inputHIER3CASN, setInputHIER3CASN] = useState("");
  const [inputITEM_PARENTCASN, setInputITEM_PARENTCASN] = useState("");
  const [valHIER1CASN, setValHIER1CASN] = useState([]);
  const [valHIER2CASN, setValHIER2CASN] = useState([]);
  const [valHIER3CASN, setValHIER3CASN] = useState([]);
  const [valITEM_PARENTCASN, setValITEM_PARENTCASN] = useState([]);
  const [inputWHCASN, setInputWHCASN] = useState("");
  const [valWHCASN, setValWHCASN] = useState([]);
  const [inputSUPPLIERCASN, setInputSUPPLIERCASN] = useState("");
  const [valSUPPLIERCASN, setValSUPPLIERCASN] = useState([]);
  const [inputSUPPLIER_SITECASN, setInputSUPPLIER_SITECASN] = useState("");
  const [valSUPPLIER_SITECASN, setValSUPPLIER_SITECASN] = useState([]);
  const [inputPACK_NOCASN, setInputPACK_NOCASN] = useState("");
  const [valPACK_NOCASN, setValPACK_NOCASN] = useState([]);
  const [inputDIFF_IDCASN, setInputDIFF_IDCASN] = useState("");
  const [valDIFF_IDCASN, setValDIFF_IDCASN] = useState([]);
  const [inputSKUCASN, setInputSKUCASN] = useState("");
  const [valSKUCASN, setValSKUCASN] = useState([]);
  const [inputITEM_LIST_NOCASN, setInputITEM_LIST_NOCASN] = useState("");
  const [valITEM_LIST_NOCASN, setValITEM_LIST_NOCASN] = useState([]);
  const [inputVPNCASN, setInputVPNCASN] = useState("");
  const [valVPNCASN, setValVPNCASN] = useState([]);
  const [inputTSFCTSF, setInputTSFCTSF] = useState("");
  const [valTSFCTSF, setValTSFCTSF] = useState([]);
  const [inputUDACASN, setInputUDACASN] = useState("");
  const [valUDACASN, setValUDACASN] = useState([]);
  const [inputUDA_VALUECASN, setInputUDA_VALUECASN] = useState("");
  const [valUDA_VALUECASN, setValUDA_VALUECASN] = useState([]);
  const [filterUDAValueCASN, setFilterUDAValueCASN] = useState([]);
  const [inputEXCLUDE_UDACASN, setInputEXCLUDE_UDACASN] = useState("");
  const [valEXCLUDE_UDACASN, setValEXCLUDE_UDACASN] = useState([]);
  const [filterEXCLUDE_UDAValueCASN, setFilterEXCLUDE_UDAValueCASN] = useState([]);
  const [inputEXCLUDE_UDA_VALUECASN, setInputEXCLUDE_UDA_VALUECASN] = useState("");
  const [valEXCLUDE_UDA_VALUECASN, setValEXCLUDE_UDA_VALUECASN] = useState([]);


  ///////////////////////////////////////////
  ///CRITERIA TSF//
  ////////////////////////////////////

  const [inputHIER1CTSF, setInputHIER1CTSF] = useState("");
  const [inputHIER2CTSF, setInputHIER2CTSF] = useState("");
  const [inputHIER3CTSF, setInputHIER3CTSF] = useState("");
  const [inputITEM_PARENTCTSF, setInputITEM_PARENTCTSF] = useState("");
  const [valHIER1CTSF, setValHIER1CTSF] = useState([]);
  const [valHIER2CTSF, setValHIER2CTSF] = useState([]);
  const [valHIER3CTSF, setValHIER3CTSF] = useState([]);
  const [valITEM_PARENTCTSF, setValITEM_PARENTCTSF] = useState([]);
  const [inputWHCTSF, setInputWHCTSF] = useState("");
  const [valWHCTSF, setValWHCTSF] = useState([]);
  const [inputSUPPLIERCTSF, setInputSUPPLIERCTSF] = useState("");
  const [valSUPPLIERCTSF, setValSUPPLIERCTSF] = useState([]);
  const [inputSUPPLIER_SITECTSF, setInputSUPPLIER_SITECTSF] = useState("");
  const [valSUPPLIER_SITECTSF, setValSUPPLIER_SITECTSF] = useState([]);
  const [inputPACK_NOCTSF, setInputPACK_NOCTSF] = useState("");
  const [valPACK_NOCTSF, setValPACK_NOCTSF] = useState([]);
  const [inputDIFF_IDCTSF, setInputDIFF_IDCTSF] = useState("");
  const [valDIFF_IDCTSF, setValDIFF_IDCTSF] = useState([]);
  const [inputSKUCTSF, setInputSKUCTSF] = useState("");
  const [valSKUCTSF, setValSKUCTSF] = useState([]);
  const [inputITEM_LIST_NOCTSF, setInputITEM_LIST_NOCTSF] = useState("");
  const [valITEM_LIST_NOCTSF, setValITEM_LIST_NOCTSF] = useState([]);
  const [inputVPNCTSF, setInputVPNCTSF] = useState("");
  const [valVPNCTSF, setValVPNCTSF] = useState([]);
  const [inputUDACTSF, setInputUDACTSF] = useState("");
  const [valUDACTSF, setValUDACTSF] = useState([]);
  const [inputUDA_VALUECTSF, setInputUDA_VALUECTSF] = useState("");
  const [valUDA_VALUECTSF, setValUDA_VALUECTSF] = useState([]);
  const [filterUDAValueCTSF, setFilterUDAValueCTSF] = useState([]);
  const [inputEXCLUDE_UDACTSF, setInputEXCLUDE_UDACTSF] = useState("");
  const [valEXCLUDE_UDACTSF, setValEXCLUDE_UDACTSF] = useState([]);
  const [filterEXCLUDE_UDAValueCTSF, setFilterEXCLUDE_UDAValueCTSF] = useState([]);
  const [inputEXCLUDE_UDA_VALUECTSF, setInputEXCLUDE_UDA_VALUECTSF] = useState("");
  const [valEXCLUDE_UDA_VALUECTSF, setValEXCLUDE_UDA_VALUECTSF] = useState([]);

  // **** Selected Data ****
  const [selData, setSelData] = useState([]);
  var check = false;

  const theme = useTheme();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const CreateAllocationClasses = useStyles();

  const CreateAllocationData = useSelector(
    (state) => state.CreateAllocationReducers
  );

  const dispatch = useDispatch();


  //   //////console.log(":",)
  // {if(searchDataCPO.CRITERIA.length===0){
  //   searchDataCPO.CRITERIA="PURCHASE_ORDER"
  // }}
  useEffect(() => {
    document.title = 'Create Allocation';
  }, []);


  var valPost = [];

  useEffect(() => {
    setLoading(true);
    dispatch(getWarehouseRequest([{}]));
    dispatch(getSUPPLIERRequest([{}]));
    dispatch(getSUPPLIERSITERequest([{}]));
    dispatch(getPACKNORequest([{}]));
    dispatch(getDIFFRequest([{}]));
    dispatch(getSKURequest([{}]));
    dispatch(getITEM_LIST_HEADRequest([{}]));
    dispatch(getVPNRequest([{}]));
    dispatch(getUDARequest([{}]));
    dispatch(getPORequest([{}]));
    dispatch(getHIERRequest([{}]));
    dispatch(getEXCLUDEUDARequest([{}]));
    dispatch(getALLOC_LEVELRequest([{}]));
    dispatch(getALLOC_TYPERequest([{}]));
    dispatch(getCONTEXT_TYPERequest([{}]));
    dispatch(getPROMOTIONRequest([{}]));
    dispatch(getSTATUSRequest([{}]));
    dispatch(getALLOC_CRITERIARequest([{}]));
    dispatch(getITEMPARENTRequest([{}]));
    dispatch(getHIER2Request([{}]));
    dispatch(getHIER3Request([{}]));
    dispatch(getASNRequest([{}]));
    dispatch(getTSFRequest([{}]));

    setTotalData([]);
    setTotalDataCPO([]);
    setTotalDataCWH([]);
    setTotalDataCASN([]);
    setTotalDataCTSF([]);
  }, [""]);


  useEffect(() => {
    // setLoading(true);
    if (!check) {
      dispatch(getALLOCNORequest([{}]));
      check = true
    }
  }, [""]);



  const serializedata = (datatable) => {
    let newTabledata = [];
    let count = 1;
    if (datatable.length > 0) {
      datatable.map(item => {
        item['SR_NO'] = count;
        const reorder = {
          'ALLOC_NO': [],
          'ALLOC_CRITERIA': [],
          'SPLIT_IND': [],
          'ALLOC_TYPE': [],
          'CREATE_ID': [],
          'CREATE_DATETIME': [],
          'ITEM': [],
          'ITEM_DESC': [],
          'DIFF_ID': [],
          'HIER1': [],
          'HIER2': [],
          'HIER3': [],
          'LOC': [],
          'AVAIL_QTY': [],
          'CLEARANCE_IND': [],
          'REF_1': [],
          'VPN': [],
          'INACTIVE_QTY': [],
          'HOLDBACK_QTY': [],
          'HOLDBACK_TYPE': [],
        }
        count++;

        let test = Object.assign(reorder, item);
        newTabledata.push(test);
      })
      // setTabledataclone(newTabledata)
      return newTabledata;
    }
  }




  useEffect(() => {
    // //////console.log("CreateAllocationData?.data?.Data:",CreateAllocationData?.data?.totalData)
    if (CreateAllocationData?.data?.totalData && Array.isArray(CreateAllocationData?.data?.totalData)) {
      // //////console.log("CreateAllocationData?.data?.Data:",CreateAllocationData?.data?.totalData)
      setTotalData([]);
      setTotalDataCWH([]);
      setTotalDataCASN([]);
      setTotalDataCTSF([]);
      setTabledata(serializedata(CreateAllocationData?.data?.totalData));
      setAllData(serializedata(CreateAllocationData?.data?.totalData));
      setTotalData(serializedata(CreateAllocationData?.data?.totalData))
      setTotalDataCPO(serializedata(CreateAllocationData?.data?.totalData))
      setLoading(false);
      setSubmit(false);
      setSearch(false);
    }
    else if (CreateAllocationData?.data?.totalData && Array.isArray(CreateAllocationData?.data?.totalData)) {
      setTotalData([]);
      setTotalDataCPO([]);
      setTotalDataCASN([]);
      setTotalDataCTSF([]);
      setTabledata(serializedata(CreateAllocationData?.data?.totalData));
      setAllData(serializedata(CreateAllocationData?.data?.totalData));
      setTotalData(serializedata(CreateAllocationData?.data?.totalData))
      setTotalDataCWH(serializedata(CreateAllocationData?.data?.totalData))
      setLoading(false);
      setSubmit(false);
      setSearch(false);
    }
    else if (CreateAllocationData?.data?.totalData && Array.isArray(CreateAllocationData?.data?.totalData)) {
      // //////console.log("CreateAllocationData?.data?.Data:",CreateAllocationData?.data?.totalData)
      setTotalData([]);
      setTotalDataCPO([]);
      setTotalDataCWH([]);
      setTotalDataCTSF([]);
      setTabledata(serializedata(CreateAllocationData?.data?.totalData));
      setAllData(serializedata(CreateAllocationData?.data?.totalData));
      setTotalData(serializedata(CreateAllocationData?.data?.totalData))
      setTotalDataCASN(serializedata(CreateAllocationData?.data?.totalData))
      setLoading(false);
      setSubmit(false);
      setSearch(false);
    }
    else if (CreateAllocationData?.data?.totalData && Array.isArray(CreateAllocationData?.data?.totalData)) {
      // //////console.log("CreateAllocationData?.data?.Data:",CreateAllocationData?.data?.totalData)
      setTotalData([]);
      setTotalDataCPO([]);
      setTotalDataCWH([]);
      setTotalDataCASN([]);
      setTabledata(serializedata(CreateAllocationData?.data?.totalData));
      setAllData(serializedata(CreateAllocationData?.data?.totalData));
      setTotalData(serializedata(CreateAllocationData?.data?.totalData))
      setTotalDataCTSF(serializedata(CreateAllocationData?.data?.totalData))
      setLoading(false);
      setSubmit(false);
      setSearch(false);
    }
    else if (CreateAllocationData?.data?.warehouseData && Array.isArray(CreateAllocationData?.data?.warehouseData)
    ) {
      ////////console.log("CreateAllocationData?.data?.warehouseData:",CreateAllocationData?.data?.warehouseData)
      setWarehouseData(CreateAllocationData?.data?.warehouseData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.supplierData &&
      Array.isArray(CreateAllocationData?.data?.supplierData)
    ) {
      setSupplierData(CreateAllocationData?.data?.supplierData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.supplerSiteData &&
      Array.isArray(CreateAllocationData?.data?.supplerSiteData)
    ) {
      setSupplerSiteData(CreateAllocationData?.data?.supplerSiteData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.packNoData &&
      Array.isArray(CreateAllocationData?.data?.packNoData)
    ) {
      setPackNoData(CreateAllocationData?.data?.packNoData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.diffData &&
      Array.isArray(CreateAllocationData?.data?.diffData)
    ) {
      //////console.log("CreateAllocationData?.data?.diffData:",CreateAllocationData?.data)
      setDIffData(CreateAllocationData?.data?.diffData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.skuData &&
      Array.isArray(CreateAllocationData?.data?.skuData)
    ) {
      setSkuData(CreateAllocationData?.data?.skuData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.itemListHeadData &&
      Array.isArray(CreateAllocationData?.data?.itemListHeadData)
    ) {
      setItemListHeadData(CreateAllocationData?.data?.itemListHeadData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.vpnData &&
      Array.isArray(CreateAllocationData?.data?.vpnData)
    ) {
      setVpnData(CreateAllocationData?.data?.vpnData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.udaData &&
      Array.isArray(CreateAllocationData?.data?.udaData)
    ) {
      setUdaData(CreateAllocationData?.data?.udaData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.poData &&
      Array.isArray(CreateAllocationData?.data?.poData)
    ) {
      setPoData(CreateAllocationData?.data?.poData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.hierData &&
      Array.isArray(CreateAllocationData?.data?.hierData)
    ) {
      setHierData(CreateAllocationData?.data?.hierData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.hier2Data &&
      Array.isArray(CreateAllocationData?.data?.hier2Data)
    ) {
      setHier2Data(CreateAllocationData?.data?.hier2Data);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.hier3Data &&
      Array.isArray(CreateAllocationData?.data?.hier3Data)
    ) {
      setHier3Data(CreateAllocationData?.data?.hier3Data);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.excludeUdaData &&
      Array.isArray(CreateAllocationData?.data?.excludeUdaData)
    ) {
      setExcludeUdaData(CreateAllocationData?.data?.excludeUdaData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.allocLevelData &&
      Array.isArray(CreateAllocationData?.data?.allocLevelData)
    ) {
      setAllocLevelData(CreateAllocationData?.data?.allocLevelData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.allocTypeData &&
      Array.isArray(CreateAllocationData?.data?.allocTypeData)
    ) {
      setAllocTypeData(CreateAllocationData?.data?.allocTypeData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.contextTypeData &&
      Array.isArray(CreateAllocationData?.data?.contextTypeData)
    ) {
      setContextTypeData(CreateAllocationData?.data?.contextTypeData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.promotionData &&
      Array.isArray(CreateAllocationData?.data?.promotionData)
    ) {
      setPromotionData(CreateAllocationData?.data?.promotionData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.statusData &&
      Array.isArray(CreateAllocationData?.data?.statusData)
    ) {
      setStatusData(CreateAllocationData?.data?.statusData);
      CreateAllocationData?.data?.statusData.map((option) => { if (option.STATUS === "Worksheet") { setStatusCreateData(option) } })
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.criteriaData &&
      Array.isArray(CreateAllocationData?.data?.criteriaData)
    ) {
      setCriteriaData(CreateAllocationData?.data?.criteriaData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.itemParentData &&
      Array.isArray(CreateAllocationData?.data?.itemParentData)
    ) {
      setItemParentData(CreateAllocationData?.data?.itemParentData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.asnData &&
      Array.isArray(CreateAllocationData?.data?.asnData)
    ) {
      setAsnData(CreateAllocationData?.data?.asnData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.tsfData &&
      Array.isArray(CreateAllocationData?.data?.tsfData)
    ) {
      setTsfData(CreateAllocationData?.data?.tsfData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.allocNoData
    ) {
      setAllocNoData(CreateAllocationData?.data?.allocNoData);
      setLoading(false);
    } else if (
      CreateAllocationData?.data?.availQty &&
      Array.isArray(CreateAllocationData?.data?.availQty)
    ) {
      setAvailQty(CreateAllocationData?.data?.availQty);
      setLoading(false);
      setAvailCheck(true);
    } else if (
      CreateAllocationData?.data?.availSearch &&
      Array.isArray(CreateAllocationData?.data?.availSearch)
    ) {
      setAvailSearch(CreateAllocationData?.data?.availSearch);
      setLoading(false);
    } else {
      setSearch(false);
    }
  }, [CreateAllocationData?.data]);

  //console.log("CreateAllocationData?.data:", searchHeaderData)


  // //////console.log("warehouseData:",warehouseData)
  // //////console.log("supplierData:",supplierData)
  // //////console.log("supplerSiteData:",supplerSiteData)
  // //////console.log("packNoData:",packNoData)
  // ////console.log("diffData:",diffData)
  // //////console.log("skuData:",skuData)
  // //////console.log("itemListHeadData:",itemListHeadData)
  // //////console.log("vpnData:",vpnData)
  // //////console.log("udaData:",udaData)
  // //////console.log("poData:",poData)
  // //////console.log("hierData:",hierData)
  // //////console.log("excludeudaData:",excludeUdaData)
  // //////console.log("allocLevelData:",allocLevelData)
  // //////console.log("allocTypeData:",allocTypeData)
  // //////console.log("contextTypeData:",contextTypeData)
  // //////console.log("promotionData:",promotionData)
  // //////console.log("statusData:",statusData)
  //  //////console.log("tabledata:",tabledata)
  ////console.log("totalData:",totalData,tabledata)
  //  ////console.log("totalDataCPO:",totalDataCPO)
  // ////console.log("totalDataCWH:",totalDataCWH)
  // ////console.log("totalDataCASN:",totalDataCASN)
  // //////console.log("itemParentData:",itemParentData)
  // //////console.log("hier2Data:",hier2Data)
  // //////console.log("hier3Data:",hier3Data)
  // //console.log("allocNoData:::", allocNoData, allocNoData["ALLOC_NO"])
  // ////console.log("statusCreateData:::",statusCreateData)
  //console.log(":",);
  //console.log(":",);

  useEffect(() => {
    if (CreateAllocationData.isError) {
      setIsError(true)
      if (totalData.length === 0) {
        swal(
          <div>
            <p>{CreateAllocationData["message"]}</p>
          </div>
        )
      }
      CreateAllocationData.isError = false;
    } else if (CreateAllocationData.isSuccess) {
      setIsSuccess(true);
      if (CreateAllocationData?.data?.totalData) {
        if (CreateAllocationData?.data?.totalData?.message) {
          setHeaderDis(false);
          swal(
            <div>
              <p>{CreateAllocationData?.data?.totalData["message"]}</p>
            </div>
          )
        }
        setLoading(true);
      }

    } else {
      setIsError(false)
      setTabledata("")
    }
  }, [CreateAllocationData])

  ///////////////////////////////////////////
  /////////CSS functions////////////////////
  ///////////////////////////////////////////

  const styleSelect1 = {
    control: base => ({
      ...base,
      width: "200px",
      fontSize: "14px",
      margin: "0px 0px 10px 0px",
      // This line disable the blue border
      borderRadius: "0",
      // backgroundColor:"#f0f0f0",
      //border:"1px solid red",
      boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
      // (isValid && searchHeaderData.CONTEXT.length===0)
      // '& input + fieldset': {
      //   // borderColor: 'gray',
      //   // borderRadius:"0",
      //   // boxShadow:"rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
      // },
    })
    ,
    dropdownIndicator: (base) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
    }),
    clearIndicator: (base) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
    }),
    valueContainer: (provided) => ({
      ...provided,
      // minHeight: '1px',
      // height: '40px',
      paddingTop: '0',
      paddingBottom: '0',
    }),
    singleValue: (provided) => ({
      ...provided,
      // minHeight: '1px',
      // paddingBottom: '0px',

    }),
    input: (provided) => ({
      ...provided,
      width: "100%",
      // minHeight: '1px',
    }),
    option: provided => ({
      ...provided,
      // color: 'blue',
      fontSize: "12px",
    }),
  };

  const styleSelect2 = {
    control: base => ({
      ...base,
      width: "200px",
      fontSize: "14px",
      margin: "0px 0px 10px 0px",
      // This line disable the blue border
      borderRadius: "0",
      // backgroundColor:"#f0f0f0",
      border: "1px solid #b22222",
      boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
      // (isValid && searchHeaderData.CONTEXT.length===0)
      // '& input + fieldset': {
      //   // borderColor: 'gray',
      //   // borderRadius:"0",
      //   // boxShadow:"rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
      // },
    })
    ,
    dropdownIndicator: (base) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
    }),
    clearIndicator: (base) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
    }),
    valueContainer: (provided) => ({
      ...provided,
      // minHeight: '1px',
      // height: '40px',
      paddingTop: '0',
      paddingBottom: '0',
    }),
    singleValue: (provided) => ({
      ...provided,
      // minHeight: '1px',
      // paddingBottom: '0px',

    }),
    input: (provided) => ({
      ...provided,
      width: "100%",
      // minHeight: '1px',
    }),
    option: provided => ({
      ...provided,
      // color: 'blue',
      fontSize: "12px",
    }),
  };

  ///////////////////////////////////////////
  /////////Submit functions////////////////////
  ///////////////////////////////////////////

  const SubmitList = () => {
    setLoading(true);
    setTotalData([]);
    setHeaderDis(true);
    setIsValid(false);
    if (searchHeaderData["CONTEXT"] === "PROM") {
      if (searchHeaderData["ALLOC_DESC"].length === 0 || searchHeaderData["ALLOC_LEVEL"].length === 0 || searchHeaderData["RELEASE_DATE"].length === 0 || searchHeaderData["CONTEXT"].length === 0 || searchHeaderData["ALLOC_TYPE"].length === 0 || searchHeaderData["PROMOTION"].length === 0) {
        setIsError(true)
        swal(
          <div>
            <p>All fields are required in Header*</p>
          </div>
        )
        setHeaderDis(false);
        setLoading(true);
        setIsValid(true);
      }
      else {
        if (searchHeaderData.ALLOC_CRITERIA === "PURCHASE_ORDER") {
          if (
            searchDataCPO["HIER1"].length === 0 &&
            searchDataCPO["HIER2"].length === 0 &&
            searchDataCPO["HIER3"].length === 0 &&
            searchDataCPO["WH"].length === 0 &&
            searchDataCPO["SUPPLIER"].length === 0 &&
            searchDataCPO["SUPPLIER_SITE"].length === 0 &&
            searchDataCPO["PACK_NO"].length === 0 &&
            searchDataCPO["ITEM_PARENT"].length === 0 &&
            searchDataCPO["DIFF_ID"].length === 0 &&
            searchDataCPO["SKU"].length === 0 &&
            searchDataCPO["ITEM_LIST_NO"].length === 0 &&
            searchDataCPO["VPN"].length === 0 &&
            searchDataCPO["UDA"].length === 0 &&
            searchDataCPO["PO"].length === 0 &&
            searchDataCPO["PO_TYPE"].length === 0 &&
            searchDataCPO["ESID_FROM"].length === 0 &&
            searchDataCPO["ESID_TO"].length === 0 &&
            searchDataCPO["NOT_BEFORE_DATE_FROM"].length === 0 &&
            searchDataCPO["NOT_BEFORE_DATE_TO"].length === 0 &&
            searchDataCPO["UDA"].length === 0 &&
            searchDataCPO["UDA_VALUE"].length === 0 &&
            searchDataCPO["EXCLUDE_UDA"].length === 0 &&
            searchDataCPO["EXCLUDE_UDA_VALUE"].length === 0
          ) {
            swal(
              <div>
                <p>Give any Criteria input field*</p>
              </div>
            )
            setHeaderDis(false);
            setLoading(true);
          }
          if (
            searchDataCPO["HIER1"].length > 0 ||
            searchDataCPO["HIER2"].length > 0 ||
            searchDataCPO["HIER3"].length > 0 ||
            searchDataCPO["WH"].length > 0 ||
            searchDataCPO["SUPPLIER"].length > 0 ||
            searchDataCPO["SUPPLIER_SITE"].length > 0 ||
            searchDataCPO["PACK_NO"].length > 0 ||
            searchDataCPO["ITEM_PARENT"].length > 0 ||
            searchDataCPO["DIFF_ID"].length > 0 ||
            searchDataCPO["SKU"].length > 0 ||
            searchDataCPO["ITEM_LIST_NO"].length > 0 ||
            searchDataCPO["VPN"].length > 0 ||
            searchDataCPO["UDA"].length > 0 ||
            searchDataCPO["PO"].length > 0 ||
            searchDataCPO["PO_TYPE"].length > 0 ||
            searchDataCPO["ESID_FROM"].length > 0 ||
            searchDataCPO["ESID_TO"].length > 0 ||
            searchDataCPO["NOT_BEFORE_DATE_FROM"].length > 0 ||
            searchDataCPO["NOT_BEFORE_DATE_TO"].length > 0 ||
            searchDataCPO["UDA"].length > 0 ||
            searchDataCPO["UDA_VALUE"].length > 0 ||
            searchDataCPO["EXCLUDE_UDA"].length > 0 ||
            searchDataCPO["EXCLUDE_UDA_VALUE"].length > 0) {
            if (searchDataCPO["ESID_FROM"].length > 0 && searchDataCPO["ESID_TO"].length === 0) {
              swal(
                <div>
                  <p>"ESID To is required"</p>
                </div>
              )
              setIsValidCTEDF(true);
            }
            else if (searchDataCPO["ESID_TO"].length > 0 && searchDataCPO["ESID_FROM"].length === 0) {
              swal(
                <div>
                  <p>"ESID From is required"</p>
                </div>
              )
              setIsValidCTEDT(true);
            }
            else if (searchDataCPO["NOT_BEFORE_DATE_FROM"].length > 0 && searchDataCPO["NOT_BEFORE_DATE_TO"].length === 0) {
              swal(
                <div>
                  <p>"Not Before Date To is required"</p>
                </div>
              )
              setIsValidCTNDF(true);
            }
            else if (searchDataCPO["NOT_BEFORE_DATE_TO"].length > 0 && searchDataCPO["NOT_BEFORE_DATE_FROM"].length === 0) {
              swal(
                <div>
                  <p>"Not Before Date From is required"</p>
                </div>
              )
              setIsValidCTNDT(true);
            }
            else if ((searchDataCPO.ESID_FROM.length) > 0 && (searchDataCPO.ESID_TO.length) > 0 &&
              searchDataCPO.ESID_TO.toString().slice(8, 10) < searchDataCPO.ESID_FROM.toString().slice(8, 10)) {
              var Date_From = searchDataCPO.ESID_FROM.toString().slice(8, 10)
              var Date_To = searchDataCPO.ESID_TO.toString().slice(8, 10)
              if (Date_To < Date_From) {
                swal(
                  <div>
                    <p>ESID From is not greater than ESID To</p>
                  </div>
                )
                setIsGreatCTEDF(true);
                setIsGreatCTEDT(true);
              }
            }
            else if ((searchDataCPO.NOT_BEFORE_DATE_FROM.length) > 0 && (searchDataCPO.NOT_BEFORE_DATE_TO.length) > 0
              && searchDataCPO.NOT_BEFORE_DATE_TO.toString().slice(8, 10) < searchDataCPO.NOT_BEFORE_DATE_FROM.toString().slice(8, 10)) {
              var Date_From = searchDataCPO.NOT_BEFORE_DATE_FROM.toString().slice(8, 10)
              var Date_To = searchDataCPO.NOT_BEFORE_DATE_TO.toString().slice(8, 10)
              if (Date_To < Date_From) {
                swal(
                  <div>
                    <p>Not Before Date From is not greater than Not Before Date To</p>
                  </div>
                )
                setIsGreatCTNDF(true);
                setIsGreatCTNDT(true);
              }
            }
            else {
              if (searchHeaderData["CONTEXT"] === "PROM") {
                if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length && searchHeaderData["ALLOC_TYPE"].length && searchHeaderData["PROMOTION"].length) > 0) {
                  let merged = { ...searchDataCPO, ...searchHeaderData }
                  ////console.log("pomerged::", merged);
                  dispatch(postALLOCRESULTRequest([merged]));
                  setIsValid(false);
                }
              }
              else {
                if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length && searchHeaderData["ALLOC_TYPE"].length) > 0) {
                  let merged = { ...searchDataCPO, ...searchHeaderData }
                  ////console.log("pomerged::", merged);
                  dispatch(postALLOCRESULTRequest([merged]));
                  setIsValid(false);
                }
              }
            }
          }
        }

        if (searchHeaderData.ALLOC_CRITERIA === "WAREHOUSE") {
          if (
            searchDataCWH["HIER1"].length === 0 &&
            searchDataCWH["HIER2"].length === 0 &&
            searchDataCWH["HIER3"].length === 0 &&
            searchDataCWH["WH"].length === 0 &&
            searchDataCWH["SUPPLIER"].length === 0 &&
            searchDataCWH["SUPPLIER_SITE"].length === 0 &&
            searchDataCWH["PACK_NO"].length === 0 &&
            searchDataCWH["ITEM_PARENT"].length === 0 &&
            searchDataCWH["DIFF_ID"].length === 0 &&
            searchDataCWH["SKU"].length === 0 &&
            searchDataCWH["ITEM_LIST_NO"].length === 0 &&
            searchDataCWH["VPN"].length === 0 &&
            searchDataCWH["UDA"].length === 0 &&
            searchDataCWH["AVAIL_QTY_GREATER"].length === 0 &&
            searchDataCWH["AVAIL_QTY_LESS"].length === 0 &&
            searchDataCWH["UDA"].length === 0 &&
            searchDataCWH["UDA_VALUE"].length === 0 &&
            searchDataCWH["EXCLUDE_UDA"].length === 0 &&
            searchDataCWH["EXCLUDE_UDA_VALUE"].length === 0
          ) {
            swal(
              <div>
                <p>Give any Criteria input field*</p>
              </div>
            )
            setHeaderDis(false);
            setLoading(true);
          }
          if (
            searchDataCWH["HIER1"].length > 0 ||
            searchDataCWH["HIER2"].length > 0 ||
            searchDataCWH["HIER3"].length > 0 ||
            searchDataCWH["WH"].length > 0 ||
            searchDataCWH["SUPPLIER"].length > 0 ||
            searchDataCWH["SUPPLIER_SITE"].length > 0 ||
            searchDataCWH["PACK_NO"].length > 0 ||
            searchDataCWH["ITEM_PARENT"].length > 0 ||
            searchDataCWH["DIFF_ID"].length > 0 ||
            searchDataCWH["SKU"].length > 0 ||
            searchDataCWH["ITEM_LIST_NO"].length > 0 ||
            searchDataCWH["VPN"].length > 0 ||
            searchDataCWH["UDA"].length > 0 ||
            searchDataCWH["AVAIL_QTY_GREATER"].length > 0 ||
            searchDataCWH["AVAIL_QTY_LESS"].length > 0 ||
            searchDataCWH["UDA"].length > 0 ||
            searchDataCWH["UDA_VALUE"].length > 0 ||
            searchDataCWH["EXCLUDE_UDA"].length > 0 ||
            searchDataCWH["EXCLUDE_UDA_VALUE"].length > 0
          ) {
            if (searchHeaderData["CONTEXT"] === "PROM") {
              if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length && searchHeaderData["ALLOC_TYPE"].length && searchHeaderData["PROMOTION"].length) > 0) {
                let merged = { ...searchDataCWH, ...searchHeaderData }
                ////console.log("whmerged::", merged);
                dispatch(postALLOCRESULTCWHRequest([merged]));
                setIsValid(false);
              }
            }
            else {
              if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length && searchHeaderData["ALLOC_TYPE"].length) > 0) {
                let merged = { ...searchDataCWH, ...searchHeaderData }
                ////console.log("whmerged::", merged);
                dispatch(postALLOCRESULTCWHRequest([merged]));
                setIsValid(false);
              }
            }
          }
        }

        if (searchHeaderData.ALLOC_CRITERIA === "ASN") {
          if (
            searchDataCASN["HIER1"].length === 0 &&
            searchDataCASN["HIER2"].length === 0 &&
            searchDataCASN["HIER3"].length === 0 &&
            searchDataCASN["WH"].length === 0 &&
            searchDataCASN["SUPPLIER"].length === 0 &&
            searchDataCASN["SUPPLIER_SITE"].length === 0 &&
            searchDataCASN["PACK_NO"].length === 0 &&
            searchDataCASN["ITEM_PARENT"].length === 0 &&
            searchDataCASN["DIFF_ID"].length === 0 &&
            searchDataCASN["SKU"].length === 0 &&
            searchDataCASN["ITEM_LIST_NO"].length === 0 &&
            searchDataCASN["VPN"].length === 0 &&
            searchDataCASN["UDA"].length === 0 &&
            searchDataCASN["ASN"].length === 0 &&
            searchDataCASN["UDA"].length === 0 &&
            searchDataCASN["UDA_VALUE"].length === 0 &&
            searchDataCASN["EXCLUDE_UDA"].length === 0 &&
            searchDataCASN["EXCLUDE_UDA_VALUE"].length === 0
          ) {
            swal(
              <div>
                <p>Give any Criteria input field*</p>
              </div>
            )
            setHeaderDis(false);
            setLoading(true);
          }
          if (
            searchDataCASN["HIER1"].length > 0 ||
            searchDataCASN["HIER2"].length > 0 ||
            searchDataCASN["HIER3"].length > 0 ||
            searchDataCASN["WH"].length > 0 ||
            searchDataCASN["SUPPLIER"].length > 0 ||
            searchDataCASN["SUPPLIER_SITE"].length > 0 ||
            searchDataCASN["PACK_NO"].length > 0 ||
            searchDataCASN["ITEM_PARENT"].length > 0 ||
            searchDataCASN["DIFF_ID"].length > 0 ||
            searchDataCASN["SKU"].length > 0 ||
            searchDataCASN["ITEM_LIST_NO"].length > 0 ||
            searchDataCASN["VPN"].length > 0 ||
            searchDataCASN["UDA"].length > 0 ||
            searchDataCASN["ASN"].length > 0 ||
            searchDataCASN["UDA"].length > 0 ||
            searchDataCASN["UDA_VALUE"].length > 0 ||
            searchDataCASN["EXCLUDE_UDA"].length > 0 ||
            searchDataCASN["EXCLUDE_UDA_VALUE"].length > 0
          ) {
            if (searchHeaderData["CONTEXT"] === "PROM") {
              if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length && searchHeaderData["ALLOC_TYPE"].length && searchHeaderData["PROMOTION"].length) > 0) {
                let merged = { ...searchDataCASN, ...searchHeaderData }
                ////console.log("ASNmerged::", merged);
                dispatch(postALLOCRESULTCASNRequest([merged]));
                setIsValid(false);
              }
            }
            else {
              if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length && searchHeaderData["ALLOC_TYPE"].length) > 0) {
                let merged = { ...searchDataCASN, ...searchHeaderData }
                ////console.log("ASNmerged::", merged);
                dispatch(postALLOCRESULTCASNRequest([merged]));
                setIsValid(false);
              }
            }
          }
        }

        if (searchHeaderData.ALLOC_CRITERIA === "TRANSFER") {
          if (
            searchDataCTSF["HIER1"].length === 0 &&
            searchDataCTSF["HIER2"].length === 0 &&
            searchDataCTSF["HIER3"].length === 0 &&
            searchDataCTSF["WH"].length === 0 &&
            searchDataCTSF["SUPPLIER"].length === 0 &&
            searchDataCTSF["SUPPLIER_SITE"].length === 0 &&
            searchDataCTSF["PACK_NO"].length === 0 &&
            searchDataCTSF["ITEM_PARENT"].length === 0 &&
            searchDataCTSF["DIFF_ID"].length === 0 &&
            searchDataCTSF["SKU"].length === 0 &&
            searchDataCTSF["ITEM_LIST_NO"].length === 0 &&
            searchDataCTSF["VPN"].length === 0 &&
            searchDataCTSF["UDA"].length === 0 &&
            searchDataCTSF["TSF"].length === 0 &&
            searchDataCTSF["UDA"].length === 0 &&
            searchDataCTSF["UDA_VALUE"].length === 0 &&
            searchDataCTSF["EXCLUDE_UDA"].length === 0 &&
            searchDataCTSF["EXCLUDE_UDA_VALUE"].length === 0
          ) {
            swal(
              <div>
                <p>Give any Criteria input field*</p>
              </div>
            )
            setHeaderDis(false);
            setLoading(true);
          }
          if (
            searchDataCTSF["HIER1"].length > 0 ||
            searchDataCTSF["HIER2"].length > 0 ||
            searchDataCTSF["HIER3"].length > 0 ||
            searchDataCTSF["WH"].length > 0 ||
            searchDataCTSF["SUPPLIER"].length > 0 ||
            searchDataCTSF["SUPPLIER_SITE"].length > 0 ||
            searchDataCTSF["PACK_NO"].length > 0 ||
            searchDataCTSF["ITEM_PARENT"].length > 0 ||
            searchDataCTSF["DIFF_ID"].length > 0 ||
            searchDataCTSF["SKU"].length > 0 ||
            searchDataCTSF["ITEM_LIST_NO"].length > 0 ||
            searchDataCTSF["VPN"].length > 0 ||
            searchDataCTSF["UDA"].length > 0 ||
            searchDataCTSF["TSF"].length > 0 ||
            searchDataCTSF["UDA"].length > 0 ||
            searchDataCTSF["UDA_VALUE"].length > 0 ||
            searchDataCTSF["EXCLUDE_UDA"].length > 0 ||
            searchDataCTSF["EXCLUDE_UDA_VALUE"].length > 0
          ) {
            if (searchHeaderData["CONTEXT"] === "PROM") {
              if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length && searchHeaderData["ALLOC_TYPE"].length && searchHeaderData["PROMOTION"].length) > 0) {
                let merged = { ...searchDataCTSF, ...searchHeaderData }
                ////console.log("TSFmerged::", merged);
                dispatch(postALLOCRESULTCTSFRequest([merged]));
                setIsValid(false);
              }
            }
            else {
              if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length && searchHeaderData["ALLOC_TYPE"].length) > 0) {
                let merged = { ...searchDataCTSF, ...searchHeaderData }
                ////console.log("TSFmerged::", merged);
                dispatch(postALLOCRESULTCTSFRequest([merged]));
                setIsValid(false);
              }
            }
          }
        }
      }
    }
    else {
      if (searchHeaderData["ALLOC_DESC"].length === 0 || searchHeaderData["ALLOC_LEVEL"].length === 0 || searchHeaderData["RELEASE_DATE"].length === 0 || searchHeaderData["CONTEXT"].length === 0 || searchHeaderData["ALLOC_TYPE"].length === 0) {
        setIsError(true)
        swal(
          <div>
            <p>All fields are required in Header*</p>
          </div>
        )
        setHeaderDis(false);
        setLoading(true);
        setIsValid(true);
      }
      else {
        if (searchHeaderData.ALLOC_CRITERIA === "PURCHASE_ORDER") {
          if (
            searchDataCPO["HIER1"].length === 0 &&
            searchDataCPO["HIER2"].length === 0 &&
            searchDataCPO["HIER3"].length === 0 &&
            searchDataCPO["WH"].length === 0 &&
            searchDataCPO["SUPPLIER"].length === 0 &&
            searchDataCPO["SUPPLIER_SITE"].length === 0 &&
            searchDataCPO["PACK_NO"].length === 0 &&
            searchDataCPO["ITEM_PARENT"].length === 0 &&
            searchDataCPO["DIFF_ID"].length === 0 &&
            searchDataCPO["SKU"].length === 0 &&
            searchDataCPO["ITEM_LIST_NO"].length === 0 &&
            searchDataCPO["VPN"].length === 0 &&
            searchDataCPO["UDA"].length === 0 &&
            searchDataCPO["PO"].length === 0 &&
            searchDataCPO["PO_TYPE"].length === 0 &&
            searchDataCPO["ESID_FROM"].length === 0 &&
            searchDataCPO["ESID_TO"].length === 0 &&
            searchDataCPO["NOT_BEFORE_DATE_FROM"].length === 0 &&
            searchDataCPO["NOT_BEFORE_DATE_TO"].length === 0 &&
            searchDataCPO["UDA"].length === 0 &&
            searchDataCPO["UDA_VALUE"].length === 0 &&
            searchDataCPO["EXCLUDE_UDA"].length === 0 &&
            searchDataCPO["EXCLUDE_UDA_VALUE"].length === 0
          ) {
            swal(
              <div>
                <p>Give any Criteria input field*</p>
              </div>
            )
            setHeaderDis(false);
            setLoading(true);
          }
          if (
            searchDataCPO["HIER1"].length > 0 ||
            searchDataCPO["HIER2"].length > 0 ||
            searchDataCPO["HIER3"].length > 0 ||
            searchDataCPO["WH"].length > 0 ||
            searchDataCPO["SUPPLIER"].length > 0 ||
            searchDataCPO["SUPPLIER_SITE"].length > 0 ||
            searchDataCPO["PACK_NO"].length > 0 ||
            searchDataCPO["ITEM_PARENT"].length > 0 ||
            searchDataCPO["DIFF_ID"].length > 0 ||
            searchDataCPO["SKU"].length > 0 ||
            searchDataCPO["ITEM_LIST_NO"].length > 0 ||
            searchDataCPO["VPN"].length > 0 ||
            searchDataCPO["UDA"].length > 0 ||
            searchDataCPO["PO"].length > 0 ||
            searchDataCPO["PO_TYPE"].length > 0 ||
            searchDataCPO["ESID_FROM"].length > 0 ||
            searchDataCPO["ESID_TO"].length > 0 ||
            searchDataCPO["NOT_BEFORE_DATE_FROM"].length > 0 ||
            searchDataCPO["NOT_BEFORE_DATE_TO"].length > 0 ||
            searchDataCPO["UDA"].length > 0 ||
            searchDataCPO["UDA_VALUE"].length > 0 ||
            searchDataCPO["EXCLUDE_UDA"].length > 0 ||
            searchDataCPO["EXCLUDE_UDA_VALUE"].length > 0) {
            //console.log("876543");
            if (searchDataCPO["ESID_FROM"].length > 0 && searchDataCPO["ESID_TO"].length === 0) {
              swal(
                <div>
                  <p>ESID To is required</p>
                </div>
              )
              setIsValidCTEDF(true);
            }
            else if (searchDataCPO["ESID_TO"].length > 0 && searchDataCPO["ESID_FROM"].length === 0) {
              swal(
                <div>
                  <p>ESID From is required</p>
                </div>
              )
              setIsValidCTEDT(true);
            }
            else if (searchDataCPO["NOT_BEFORE_DATE_FROM"].length > 0 && searchDataCPO["NOT_BEFORE_DATE_TO"].length === 0) {
              swal(
                <div>
                  <p>Not Before Date To is required</p>
                </div>
              )
              setIsValidCTNDF(true);
            }
            else if (searchDataCPO["NOT_BEFORE_DATE_TO"].length > 0 && searchDataCPO["NOT_BEFORE_DATE_FROM"].length === 0) {
              swal(
                <div>
                  <p>Not Before Date From is required</p>
                </div>
              )
              setIsValidCTNDT(true);
            }
            else if ((searchDataCPO.ESID_FROM.length) > 0 && (searchDataCPO.ESID_TO.length) > 0 &&
              searchDataCPO.ESID_TO.toString().slice(8, 10) < searchDataCPO.ESID_FROM.toString().slice(8, 10)) {
              var Date_From = searchDataCPO.ESID_FROM.toString().slice(8, 10)
              var Date_To = searchDataCPO.ESID_TO.toString().slice(8, 10)
              if (Date_To < Date_From) {
                swal(
                  <div>
                    <p>ESID From is not greater than ESID To</p>
                  </div>
                )
                setIsGreatCTEDF(true);
                setIsGreatCTEDT(true);
              }
            }
            else if ((searchDataCPO.NOT_BEFORE_DATE_FROM.length) > 0 && (searchDataCPO.NOT_BEFORE_DATE_TO.length) > 0
              && searchDataCPO.NOT_BEFORE_DATE_TO.toString().slice(8, 10) < searchDataCPO.NOT_BEFORE_DATE_FROM.toString().slice(8, 10)) {
              var Date_From = searchDataCPO.NOT_BEFORE_DATE_FROM.toString().slice(8, 10)
              var Date_To = searchDataCPO.NOT_BEFORE_DATE_TO.toString().slice(8, 10)
              if (Date_To < Date_From) {
                swal(
                  <div>
                    <p>Not Before Date From is not greater than Not Before Date To</p>
                  </div>
                )
                setIsGreatCTNDF(true);
                setIsGreatCTNDT(true);
              }
            }
            else {
              if (searchHeaderData["CONTEXT"] === "PROM") {
                if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length && searchHeaderData["ALLOC_TYPE"].length && searchHeaderData["PROMOTION"].length) > 0) {
                  let merged = { ...searchDataCPO, ...searchHeaderData }
                  ////console.log("pomerged::", merged);
                  dispatch(postALLOCRESULTRequest([merged]));
                  setIsValid(false);
                }
              }
              else {
                if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length && searchHeaderData["ALLOC_TYPE"].length) > 0) {
                  let merged = { ...searchDataCPO, ...searchHeaderData }
                  ////console.log("pomerged::", merged);
                  dispatch(postALLOCRESULTRequest([merged]));
                  setIsValid(false);
                }
              }
            }
          }
        }

        if (searchHeaderData.ALLOC_CRITERIA === "WAREHOUSE") {
          if (
            searchDataCWH["HIER1"].length === 0 &&
            searchDataCWH["HIER2"].length === 0 &&
            searchDataCWH["HIER3"].length === 0 &&
            searchDataCWH["WH"].length === 0 &&
            searchDataCWH["SUPPLIER"].length === 0 &&
            searchDataCWH["SUPPLIER_SITE"].length === 0 &&
            searchDataCWH["PACK_NO"].length === 0 &&
            searchDataCWH["ITEM_PARENT"].length === 0 &&
            searchDataCWH["DIFF_ID"].length === 0 &&
            searchDataCWH["SKU"].length === 0 &&
            searchDataCWH["ITEM_LIST_NO"].length === 0 &&
            searchDataCWH["VPN"].length === 0 &&
            searchDataCWH["UDA"].length === 0 &&
            searchDataCWH["AVAIL_QTY_GREATER"].length === 0 &&
            searchDataCWH["AVAIL_QTY_LESS"].length === 0 &&
            searchDataCWH["UDA"].length === 0 &&
            searchDataCWH["UDA_VALUE"].length === 0 &&
            searchDataCWH["EXCLUDE_UDA"].length === 0 &&
            searchDataCWH["EXCLUDE_UDA_VALUE"].length === 0
          ) {
            //console.log("555555555555555555555")
            swal(
              <div>
                <p>Give any Criteria input field*</p>
              </div>
            )
            setHeaderDis(false);
            setLoading(true);
          }
          if (
            searchDataCWH["HIER1"].length > 0 ||
            searchDataCWH["HIER2"].length > 0 ||
            searchDataCWH["HIER3"].length > 0 ||
            searchDataCWH["WH"].length > 0 ||
            searchDataCWH["SUPPLIER"].length > 0 ||
            searchDataCWH["SUPPLIER_SITE"].length > 0 ||
            searchDataCWH["PACK_NO"].length > 0 ||
            searchDataCWH["ITEM_PARENT"].length > 0 ||
            searchDataCWH["DIFF_ID"].length > 0 ||
            searchDataCWH["SKU"].length > 0 ||
            searchDataCWH["ITEM_LIST_NO"].length > 0 ||
            searchDataCWH["VPN"].length > 0 ||
            searchDataCWH["UDA"].length > 0 ||
            searchDataCWH["AVAIL_QTY_GREATER"].length > 0 ||
            searchDataCWH["AVAIL_QTY_LESS"].length > 0 ||
            searchDataCWH["UDA"].length > 0 ||
            searchDataCWH["UDA_VALUE"].length > 0 ||
            searchDataCWH["EXCLUDE_UDA"].length > 0 ||
            searchDataCWH["EXCLUDE_UDA_VALUE"].length > 0
          ) {
            if (searchHeaderData["CONTEXT"] === "PROM") {
              if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length && searchHeaderData["ALLOC_TYPE"].length && searchHeaderData["PROMOTION"].length) > 0) {
                let merged = { ...searchDataCWH, ...searchHeaderData }
                ////console.log("whmerged::", merged);
                dispatch(postALLOCRESULTCWHRequest([merged]));
                setIsValid(false);
              }
            }
            else {
              if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length && searchHeaderData["ALLOC_TYPE"].length) > 0) {
                let merged = { ...searchDataCWH, ...searchHeaderData }
                ////console.log("whmerged::", merged);
                dispatch(postALLOCRESULTCWHRequest([merged]));
                setIsValid(false);
              }
            }
          }
        }

        if (searchHeaderData.ALLOC_CRITERIA === "ASN") {
          if (
            searchDataCASN["HIER1"].length === 0 &&
            searchDataCASN["HIER2"].length === 0 &&
            searchDataCASN["HIER3"].length === 0 &&
            searchDataCASN["WH"].length === 0 &&
            searchDataCASN["SUPPLIER"].length === 0 &&
            searchDataCASN["SUPPLIER_SITE"].length === 0 &&
            searchDataCASN["PACK_NO"].length === 0 &&
            searchDataCASN["ITEM_PARENT"].length === 0 &&
            searchDataCASN["DIFF_ID"].length === 0 &&
            searchDataCASN["SKU"].length === 0 &&
            searchDataCASN["ITEM_LIST_NO"].length === 0 &&
            searchDataCASN["VPN"].length === 0 &&
            searchDataCASN["UDA"].length === 0 &&
            searchDataCASN["ASN"].length === 0 &&
            searchDataCASN["UDA"].length === 0 &&
            searchDataCASN["UDA_VALUE"].length === 0 &&
            searchDataCASN["EXCLUDE_UDA"].length === 0 &&
            searchDataCASN["EXCLUDE_UDA_VALUE"].length === 0
          ) {
            swal(
              <div>
                <p>Give any Criteria input field*</p>
              </div>
            )
            setHeaderDis(false);
            setLoading(true);
          }
          if (
            searchDataCASN["HIER1"].length > 0 ||
            searchDataCASN["HIER2"].length > 0 ||
            searchDataCASN["HIER3"].length > 0 ||
            searchDataCASN["WH"].length > 0 ||
            searchDataCASN["SUPPLIER"].length > 0 ||
            searchDataCASN["SUPPLIER_SITE"].length > 0 ||
            searchDataCASN["PACK_NO"].length > 0 ||
            searchDataCASN["ITEM_PARENT"].length > 0 ||
            searchDataCASN["DIFF_ID"].length > 0 ||
            searchDataCASN["SKU"].length > 0 ||
            searchDataCASN["ITEM_LIST_NO"].length > 0 ||
            searchDataCASN["VPN"].length > 0 ||
            searchDataCASN["UDA"].length > 0 ||
            searchDataCASN["ASN"].length > 0 ||
            searchDataCASN["UDA"].length > 0 ||
            searchDataCASN["UDA_VALUE"].length > 0 ||
            searchDataCASN["EXCLUDE_UDA"].length > 0 ||
            searchDataCASN["EXCLUDE_UDA_VALUE"].length > 0
          ) {
            if (searchHeaderData["CONTEXT"] === "PROM") {
              if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length && searchHeaderData["ALLOC_TYPE"].length && searchHeaderData["PROMOTION"].length) > 0) {
                let merged = { ...searchDataCASN, ...searchHeaderData }
                ////console.log("ASNmerged::", merged);
                dispatch(postALLOCRESULTCASNRequest([merged]));
                setIsValid(false);
              }
            }
            else {
              if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length && searchHeaderData["ALLOC_TYPE"].length) > 0) {
                let merged = { ...searchDataCASN, ...searchHeaderData }
                ////console.log("ASNmerged::", merged);
                dispatch(postALLOCRESULTCASNRequest([merged]));
                setIsValid(false);
              }
            }
          }
        }

        if (searchHeaderData.ALLOC_CRITERIA === "TRANSFER") {
          if (
            searchDataCTSF["HIER1"].length === 0 &&
            searchDataCTSF["HIER2"].length === 0 &&
            searchDataCTSF["HIER3"].length === 0 &&
            searchDataCTSF["WH"].length === 0 &&
            searchDataCTSF["SUPPLIER"].length === 0 &&
            searchDataCTSF["SUPPLIER_SITE"].length === 0 &&
            searchDataCTSF["PACK_NO"].length === 0 &&
            searchDataCTSF["ITEM_PARENT"].length === 0 &&
            searchDataCTSF["DIFF_ID"].length === 0 &&
            searchDataCTSF["SKU"].length === 0 &&
            searchDataCTSF["ITEM_LIST_NO"].length === 0 &&
            searchDataCTSF["VPN"].length === 0 &&
            searchDataCTSF["UDA"].length === 0 &&
            searchDataCTSF["TSF"].length === 0 &&
            searchDataCTSF["UDA"].length === 0 &&
            searchDataCTSF["UDA_VALUE"].length === 0 &&
            searchDataCTSF["EXCLUDE_UDA"].length === 0 &&
            searchDataCTSF["EXCLUDE_UDA_VALUE"].length === 0
          ) {
            swal(
              <div>
                <p>Give any Criteria input field*</p>
              </div>
            )
            setHeaderDis(false);
            setLoading(true);
          }
          if (
            searchDataCTSF["HIER1"].length > 0 ||
            searchDataCTSF["HIER2"].length > 0 ||
            searchDataCTSF["HIER3"].length > 0 ||
            searchDataCTSF["WH"].length > 0 ||
            searchDataCTSF["SUPPLIER"].length > 0 ||
            searchDataCTSF["SUPPLIER_SITE"].length > 0 ||
            searchDataCTSF["PACK_NO"].length > 0 ||
            searchDataCTSF["ITEM_PARENT"].length > 0 ||
            searchDataCTSF["DIFF_ID"].length > 0 ||
            searchDataCTSF["SKU"].length > 0 ||
            searchDataCTSF["ITEM_LIST_NO"].length > 0 ||
            searchDataCTSF["VPN"].length > 0 ||
            searchDataCTSF["UDA"].length > 0 ||
            searchDataCTSF["TSF"].length > 0 ||
            searchDataCTSF["UDA"].length > 0 ||
            searchDataCTSF["UDA_VALUE"].length > 0 ||
            searchDataCTSF["EXCLUDE_UDA"].length > 0 ||
            searchDataCTSF["EXCLUDE_UDA_VALUE"].length > 0
          ) {
            if (searchHeaderData["CONTEXT"] === "PROM") {
              if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length && searchHeaderData["ALLOC_TYPE"].length && searchHeaderData["PROMOTION"].length) > 0) {
                let merged = { ...searchDataCTSF, ...searchHeaderData }
                ////console.log("TSFmerged::", merged);
                dispatch(postALLOCRESULTCTSFRequest([merged]));
                setIsValid(false);
              }
            }
            else {
              if ((searchHeaderData["ALLOC_DESC"].length && searchHeaderData["ALLOC_LEVEL"].length && searchHeaderData["RELEASE_DATE"].length && searchHeaderData["CONTEXT"].length && searchHeaderData["ALLOC_TYPE"].length) > 0) {
                let merged = { ...searchDataCTSF, ...searchHeaderData }
                ////console.log("TSFmerged::", merged);
                dispatch(postALLOCRESULTCTSFRequest([merged]));
                setIsValid(false);
              }
            }
          }
        }
      }
    }
  }



  if (searchHeaderData.ALLOC_TYPE_CODE === "Child") {
    swal(
      <div>
        <p>Cannot select the Child*</p>
      </div>
    )
    setSearchHeaderData((prev) => {
      return {
        ...prev,
        ALLOC_TYPE_CODE: "Ad-Hoc",
        ALLOC_TYPE: "A",
      };
    })
  }

  ///////////////////////////////////////////
  /////////Menu functions////////////////////
  ///////////////////////////////////////////

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setLoading(true);
    setSearchHeaderData((prev) => {
      return {
        ...prev,
        ALLOC_CRITERIA: options[selectedIndex].value,
      };
    })
  }, [""]);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    if (index || index === 0) {
      setSearchHeaderData((prev) => {
        return {
          ...prev,
          ALLOC_CRITERIA: options[index].value,
        };
      })
    }
    else if (event.target.value) {
      setSearchHeaderData((prev) => {
        return {
          ...prev,
          ALLOC_CRITERIA: event.target.value,
        };
      });
    }
    setSelectedIndex(index);
    setAnchorEl(null);
    setTotalData([]);
    setTotalDataCPO([]);
    setTotalDataCWH([]);
    setTotalDataCASN([]);
    setTotalDataCTSF([]);

    if (event.target.value === "PURCHASE_ORDER") {
      setInputHIER1CWH("");
      setInputHIER2CWH("");
      setInputHIER3CWH("");
      setInputITEM_PARENTCWH("");
      setInputWHCWH("");
      setInputSUPPLIERCWH("");
      setInputSUPPLIER_SITECWH("");
      setInputPACK_NOCWH("");
      setInputDIFF_IDCWH("");
      setInputSKUCWH("");
      setInputITEM_LIST_NOCWH("");
      setInputVPNCWH("");
      setInputUDACWH("");
      setInputUDA_VALUECWH("");
      setInputEXCLUDE_UDACWH("");
      setInputEXCLUDE_UDA_VALUECWH("");
      setValHIER1CWH([]);
      setValHIER2CWH([]);
      setValHIER3CWH([]);
      setValITEM_PARENTCWH([]);
      setValWHCWH([]);
      setValSUPPLIERCWH([]);
      setValSUPPLIER_SITECWH([]);
      setValPACK_NOCWH([]);
      setValDIFF_IDCWH([]);
      setValSKUCWH([]);
      setValITEM_LIST_NOCWH([]);
      setValVPNCWH([]);
      setValUDACWH([]);
      setValUDA_VALUECWH([]);
      setFilterUDAValueCWH([]);
      setValEXCLUDE_UDACWH([]);
      setFilterEXCLUDE_UDAValueCWH([]);
      setValEXCLUDE_UDA_VALUECWH([]);
      setSearchDataCWH(initialDataWH)
      setIsValidCTEDF(false);
      setIsValidCTNDF(false);
      setIsValidCTEDT(false);
      setIsValidCTNDT(false);
    }

    if (event.target.value === "WAREHOUSE") {
      setInputHIER1CPO("");
      setInputHIER2CPO("");
      setInputHIER3CPO("");
      setInputITEM_PARENTCPO("");
      setInputWHCPO("");
      setInputSUPPLIERCPO("");
      setInputSUPPLIER_SITECPO("");
      setInputPACK_NOCPO("");
      setInputDIFF_IDCPO("");
      setInputSKUCPO("");
      setInputITEM_LIST_NOCPO("");
      setInputVPNCPO("");
      setInputUDACPO("");
      setInputPOCPO("");
      setInputPO_TYPECPO("");
      setInputUDA_VALUECPO("");
      setInputEXCLUDE_UDACPO("");
      setInputEXCLUDE_UDA_VALUECPO("");
      setValHIER1CPO([]);
      setValHIER2CPO([]);
      setValHIER3CPO([]);
      setValITEM_PARENTCPO([]);
      setValWHCPO([]);
      setValSUPPLIERCPO([]);
      setValSUPPLIER_SITECPO([]);
      setValPACK_NOCPO([]);
      setValDIFF_IDCPO([]);
      setValSKUCPO([]);
      setValITEM_LIST_NOCPO([]);
      setValVPNCPO([]);
      setValUDACPO([]);
      setValPOCPO([]);
      setValPO_TYPECPO([]);
      setValUDA_VALUECPO([]);
      setFilterUDAValueCPO([]);
      setValEXCLUDE_UDACPO([]);
      setFilterEXCLUDE_UDAValueCPO([]);
      setValEXCLUDE_UDA_VALUECPO([]);
      setSearchDataCPO(initialDataPO)
    }

    if (event.target.value === "ASN") {
      setInputHIER1CASN("");
      setInputHIER2CASN("");
      setInputHIER3CASN("");
      setInputITEM_PARENTCASN("");
      setInputWHCASN("");
      setInputSUPPLIERCASN("");
      setInputSUPPLIER_SITECASN("");
      setInputPACK_NOCASN("");
      setInputDIFF_IDCASN("");
      setInputSKUCASN("");
      setInputITEM_LIST_NOCASN("");
      setInputVPNCASN("");
      setInputUDACASN("");
      setInputASNCASN("");
      setInputUDA_VALUECASN("");
      setInputEXCLUDE_UDACASN("");
      setInputEXCLUDE_UDA_VALUECASN("");
      setValHIER1CASN([]);
      setValHIER2CASN([]);
      setValHIER3CASN([]);
      setValITEM_PARENTCASN([]);
      setValWHCASN([]);
      setValSUPPLIERCASN([]);
      setValSUPPLIER_SITECASN([]);
      setValPACK_NOCASN([]);
      setValDIFF_IDCASN([]);
      setValSKUCASN([]);
      setValITEM_LIST_NOCASN([]);
      setValVPNCASN([]);
      setValUDACASN([]);
      setValASNCASN([]);
      setValUDA_VALUECASN([]);
      setFilterUDAValueCASN([]);
      setValEXCLUDE_UDACASN([]);
      setFilterEXCLUDE_UDAValueCASN([]);
      setValEXCLUDE_UDA_VALUECASN([]);
      setSearchDataCASN(initialDataASN)
    }

    if (event.target.value === "TSF") {
      setInputHIER1CTSF("");
      setInputHIER2CTSF("");
      setInputHIER3CTSF("");
      setInputITEM_PARENTCTSF("");
      setInputWHCTSF("");
      setInputSUPPLIERCTSF("");
      setInputSUPPLIER_SITECTSF("");
      setInputPACK_NOCTSF("");
      setInputDIFF_IDCTSF("");
      setInputSKUCTSF("");
      setInputITEM_LIST_NOCTSF("");
      setInputVPNCTSF("");
      setInputUDACTSF("");
      setInputTSFCTSF("");
      setInputUDA_VALUECTSF("");
      setInputEXCLUDE_UDACTSF("");
      setInputEXCLUDE_UDA_VALUECTSF("");
      setValHIER1CTSF([]);
      setValHIER2CTSF([]);
      setValHIER3CTSF([]);
      setValITEM_PARENTCTSF([]);
      setValWHCTSF([]);
      setValSUPPLIERCTSF([]);
      setValSUPPLIER_SITECTSF([]);
      setValPACK_NOCTSF([]);
      setValDIFF_IDCTSF([]);
      setValSKUCTSF([]);
      setValITEM_LIST_NOCTSF([]);
      setValVPNCTSF([]);
      setValUDACTSF([]);
      setValTSFCTSF([]);
      setValUDA_VALUECTSF([]);
      setFilterUDAValueCTSF([]);
      setValEXCLUDE_UDACTSF([]);
      setFilterEXCLUDE_UDAValueCTSF([]);
      setValEXCLUDE_UDA_VALUECTSF([]);
      setSearchDataCTSF(initialDataTSF)
    }
  };


  const handleClose = () => {
    setAnchorEl(null);
  };


  ///////////////////////////////////////////////////////////////////////////////
  /////////Tablecell and Table Row Customization functions////////////////////
  ///////////////////////////////////////////////////////////////////////////

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.root}`]: {
      height: "30px",
      padding: 0,
    },
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "DodgerBlue",
      color: theme.palette.common.black,
      fontSize: 14,
      textAlign: "left"
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
      textAlign: "left"
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    root: {
      height: "30px",
    },
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  //////////////////////////////////////////////////
  /////////TextField Functions////////////////////
  //////////////////////////////////////////////


  const onChange = (e) => {
    ////console.log("e",e)
    setSearchHeaderData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onChangeCPO = (e) => {
    setSearchDataCPO((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onChangeCWH = (e) => {
    setSearchDataCWH((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };


  //////////////////////////////////////
  ////////REFRESH CRITERIA INPUTS SCREEN/////////
  //////////////////////////////////////

  const RefreshGrid = () => {
    setAvailCheck(false);

    setIsValidCTEDF(false);
    setIsValidCTNDF(false);
    setIsValidCTEDT(false);
    setIsValidCTNDT(false);

    setIsGreatCTEDF(false);
    setIsGreatCTNDF(false);
    setIsGreatCTEDT(false);
    setIsGreatCTNDT(false);

    setInputHIER1CPO("");
    setInputHIER2CPO("");
    setInputHIER3CPO("");
    setInputITEM_PARENTCPO("");
    setInputWHCPO("");
    setInputSUPPLIERCPO("");
    setInputSUPPLIER_SITECPO("");
    setInputPACK_NOCPO("");
    setInputDIFF_IDCPO("");
    setInputSKUCPO("");
    setInputITEM_LIST_NOCPO("");
    setInputVPNCPO("");
    setInputUDACPO("");
    setInputPOCPO("");
    setInputPO_TYPECPO("");
    setInputUDA_VALUECPO("");
    setInputEXCLUDE_UDACPO("");
    setInputEXCLUDE_UDA_VALUECPO("");
    setValHIER1CPO([]);
    setValHIER2CPO([]);
    setValHIER3CPO([]);
    setValITEM_PARENTCPO([]);
    setValWHCPO([]);
    setValSUPPLIERCPO([]);
    setValSUPPLIER_SITECPO([]);
    setValPACK_NOCPO([]);
    setValDIFF_IDCPO([]);
    setValSKUCPO([]);
    setValITEM_LIST_NOCPO([]);
    setValVPNCPO([]);
    setValUDACPO([]);
    setValPOCPO([]);
    setValPO_TYPECPO([]);
    setValUDA_VALUECPO([]);
    setFilterUDAValueCPO([]);
    setValEXCLUDE_UDACPO([]);
    setFilterEXCLUDE_UDAValueCPO([]);
    setValEXCLUDE_UDA_VALUECPO([]);
    setSearchDataCPO(initialDataPO)

    setInputHIER1CWH("");
    setInputHIER2CWH("");
    setInputHIER3CWH("");
    setInputITEM_PARENTCWH("");
    setInputWHCWH("");
    setInputSUPPLIERCWH("");
    setInputSUPPLIER_SITECWH("");
    setInputPACK_NOCWH("");
    setInputDIFF_IDCWH("");
    setInputSKUCWH("");
    setInputITEM_LIST_NOCWH("");
    setInputVPNCWH("");
    setInputUDACWH("");
    setInputUDA_VALUECWH("");
    setInputEXCLUDE_UDACWH("");
    setInputEXCLUDE_UDA_VALUECWH("");
    setValHIER1CWH([]);
    setValHIER2CWH([]);
    setValHIER3CWH([]);
    setValITEM_PARENTCWH([]);
    setValWHCWH([]);
    setValSUPPLIERCWH([]);
    setValSUPPLIER_SITECWH([]);
    setValPACK_NOCWH([]);
    setValDIFF_IDCWH([]);
    setValSKUCWH([]);
    setValITEM_LIST_NOCWH([]);
    setValVPNCWH([]);
    setValUDACWH([]);
    setValUDA_VALUECWH([]);
    setFilterUDAValueCWH([]);
    setValEXCLUDE_UDACWH([]);
    setFilterEXCLUDE_UDAValueCWH([]);
    setValEXCLUDE_UDA_VALUECWH([]);
    setSearchDataCWH(initialDataWH)


    setInputHIER1CASN("");
    setInputHIER2CASN("");
    setInputHIER3CASN("");
    setInputITEM_PARENTCASN("");
    setInputWHCASN("");
    setInputSUPPLIERCASN("");
    setInputSUPPLIER_SITECASN("");
    setInputPACK_NOCASN("");
    setInputDIFF_IDCASN("");
    setInputSKUCASN("");
    setInputITEM_LIST_NOCASN("");
    setInputVPNCASN("");
    setInputUDACASN("");
    setInputASNCASN("");
    setInputUDA_VALUECASN("");
    setInputEXCLUDE_UDACASN("");
    setInputEXCLUDE_UDA_VALUECASN("");
    setValHIER1CASN([]);
    setValHIER2CASN([]);
    setValHIER3CASN([]);
    setValITEM_PARENTCASN([]);
    setValWHCASN([]);
    setValSUPPLIERCASN([]);
    setValSUPPLIER_SITECASN([]);
    setValPACK_NOCASN([]);
    setValDIFF_IDCASN([]);
    setValSKUCASN([]);
    setValITEM_LIST_NOCASN([]);
    setValVPNCASN([]);
    setValUDACASN([]);
    setValASNCASN([]);
    setValUDA_VALUECASN([]);
    setFilterUDAValueCASN([]);
    setValEXCLUDE_UDACASN([]);
    setFilterEXCLUDE_UDAValueCASN([]);
    setValEXCLUDE_UDA_VALUECASN([]);
    setSearchDataCASN(initialDataASN)

    setInputHIER1CTSF("");
    setInputHIER2CTSF("");
    setInputHIER3CTSF("");
    setInputITEM_PARENTCTSF("");
    setInputWHCTSF("");
    setInputSUPPLIERCTSF("");
    setInputSUPPLIER_SITECTSF("");
    setInputPACK_NOCTSF("");
    setInputDIFF_IDCTSF("");
    setInputSKUCTSF("");
    setInputITEM_LIST_NOCTSF("");
    setInputVPNCTSF("");
    setInputUDACTSF("");
    setInputTSFCTSF("");
    setInputUDA_VALUECTSF("");
    setInputEXCLUDE_UDACTSF("");
    setInputEXCLUDE_UDA_VALUECTSF("");
    setValHIER1CTSF([]);
    setValHIER2CTSF([]);
    setValHIER3CTSF([]);
    setValITEM_PARENTCTSF([]);
    setValWHCTSF([]);
    setValSUPPLIERCTSF([]);
    setValSUPPLIER_SITECTSF([]);
    setValPACK_NOCTSF([]);
    setValDIFF_IDCTSF([]);
    setValSKUCTSF([]);
    setValITEM_LIST_NOCTSF([]);
    setValVPNCTSF([]);
    setValUDACTSF([]);
    setValTSFCTSF([]);
    setValUDA_VALUECTSF([]);
    setFilterUDAValueCTSF([]);
    setValEXCLUDE_UDACTSF([]);
    setFilterEXCLUDE_UDAValueCTSF([]);
    setValEXCLUDE_UDA_VALUECTSF([]);
    setSearchDataCTSF(initialDataTSF)
  }


  //////////////////////////////////////
  ////////REFRESH ENTIRE SCREEN/////////
  //////////////////////////////////////
  const RefreshTableGrid = () => {

    setTotalData([]);
    setTotalDataCPO([]);
    setTotalDataCWH([]);
    setTotalDataCASN([]);
    setTotalDataCTSF([]);

    setSelected([])

    setInputHIER1CPO("");
    setInputHIER2CPO("");
    setInputHIER3CPO("");
    setInputITEM_PARENTCPO("");
    setInputWHCPO("");
    setInputSUPPLIERCPO("");
    setInputSUPPLIER_SITECPO("");
    setInputPACK_NOCPO("");
    setInputDIFF_IDCPO("");
    setInputSKUCPO("");
    setInputITEM_LIST_NOCPO("");
    setInputVPNCPO("");
    setInputUDACPO("");
    setInputPOCPO("");
    setInputPO_TYPECPO("");
    setInputUDA_VALUECPO("");
    setInputEXCLUDE_UDACPO("");
    setInputEXCLUDE_UDA_VALUECPO("");
    setValHIER1CPO([]);
    setValHIER2CPO([]);
    setValHIER3CPO([]);
    setValITEM_PARENTCPO([]);
    setValWHCPO([]);
    setValSUPPLIERCPO([]);
    setValSUPPLIER_SITECPO([]);
    setValPACK_NOCPO([]);
    setValDIFF_IDCPO([]);
    setValSKUCPO([]);
    setValITEM_LIST_NOCPO([]);
    setValVPNCPO([]);
    setValUDACPO([]);
    setValPOCPO([]);
    setValPO_TYPECPO([]);
    setValUDA_VALUECPO([]);
    setFilterUDAValueCPO([]);
    setValEXCLUDE_UDACPO([]);
    setFilterEXCLUDE_UDAValueCPO([]);
    setValEXCLUDE_UDA_VALUECPO([]);
    setSearchDataCPO(initialDataPO)

    setInputHIER1CWH("");
    setInputHIER2CWH("");
    setInputHIER3CWH("");
    setInputITEM_PARENTCWH("");
    setInputWHCWH("");
    setInputSUPPLIERCWH("");
    setInputSUPPLIER_SITECWH("");
    setInputPACK_NOCWH("");
    setInputDIFF_IDCWH("");
    setInputSKUCWH("");
    setInputITEM_LIST_NOCWH("");
    setInputVPNCWH("");
    setInputUDACWH("");
    setInputUDA_VALUECWH("");
    setInputEXCLUDE_UDACWH("");
    setInputEXCLUDE_UDA_VALUECWH("");
    setValHIER1CWH([]);
    setValHIER2CWH([]);
    setValHIER3CWH([]);
    setValITEM_PARENTCWH([]);
    setValWHCWH([]);
    setValSUPPLIERCWH([]);
    setValSUPPLIER_SITECWH([]);
    setValPACK_NOCWH([]);
    setValDIFF_IDCWH([]);
    setValSKUCWH([]);
    setValITEM_LIST_NOCWH([]);
    setValVPNCWH([]);
    setValUDACWH([]);
    setValUDA_VALUECWH([]);
    setFilterUDAValueCWH([]);
    setValEXCLUDE_UDACWH([]);
    setFilterEXCLUDE_UDAValueCWH([]);
    setValEXCLUDE_UDA_VALUECWH([]);
    setSearchDataCWH(initialDataWH)


    setInputHIER1CASN("");
    setInputHIER2CASN("");
    setInputHIER3CASN("");
    setInputITEM_PARENTCASN("");
    setInputWHCASN("");
    setInputSUPPLIERCASN("");
    setInputSUPPLIER_SITECASN("");
    setInputPACK_NOCASN("");
    setInputDIFF_IDCASN("");
    setInputSKUCASN("");
    setInputITEM_LIST_NOCASN("");
    setInputVPNCASN("");
    setInputUDACASN("");
    setInputASNCASN("");
    setInputUDA_VALUECASN("");
    setInputEXCLUDE_UDACASN("");
    setInputEXCLUDE_UDA_VALUECASN("");
    setValHIER1CASN([]);
    setValHIER2CASN([]);
    setValHIER3CASN([]);
    setValITEM_PARENTCASN([]);
    setValWHCASN([]);
    setValSUPPLIERCASN([]);
    setValSUPPLIER_SITECASN([]);
    setValPACK_NOCASN([]);
    setValDIFF_IDCASN([]);
    setValSKUCASN([]);
    setValITEM_LIST_NOCASN([]);
    setValVPNCASN([]);
    setValUDACASN([]);
    setValASNCASN([]);
    setValUDA_VALUECASN([]);
    setFilterUDAValueCASN([]);
    setValEXCLUDE_UDACASN([]);
    setFilterEXCLUDE_UDAValueCASN([]);
    setValEXCLUDE_UDA_VALUECASN([]);
    setSearchDataCASN(initialDataASN)

    setInputHIER1CTSF("");
    setInputHIER2CTSF("");
    setInputHIER3CTSF("");
    setInputITEM_PARENTCTSF("");
    setInputWHCTSF("");
    setInputSUPPLIERCTSF("");
    setInputSUPPLIER_SITECTSF("");
    setInputPACK_NOCTSF("");
    setInputDIFF_IDCTSF("");
    setInputSKUCTSF("");
    setInputITEM_LIST_NOCTSF("");
    setInputVPNCTSF("");
    setInputUDACTSF("");
    setInputTSFCTSF("");
    setInputUDA_VALUECTSF("");
    setInputEXCLUDE_UDACTSF("");
    setInputEXCLUDE_UDA_VALUECTSF("");
    setValHIER1CTSF([]);
    setValHIER2CTSF([]);
    setValHIER3CTSF([]);
    setValITEM_PARENTCTSF([]);
    setValWHCTSF([]);
    setValSUPPLIERCTSF([]);
    setValSUPPLIER_SITECTSF([]);
    setValPACK_NOCTSF([]);
    setValDIFF_IDCTSF([]);
    setValSKUCTSF([]);
    setValITEM_LIST_NOCTSF([]);
    setValVPNCTSF([]);
    setValUDACTSF([]);
    setValTSFCTSF([]);
    setValUDA_VALUECTSF([]);
    setFilterUDAValueCTSF([]);
    setValEXCLUDE_UDACTSF([]);
    setFilterEXCLUDE_UDAValueCTSF([]);
    setValEXCLUDE_UDA_VALUECTSF([]);
    setSearchDataCTSF(initialDataTSF)

    setSearchHeaderData((prev) => {
      return {
        ...prev,
        // CONTEXT: "",
        // ALLOC_LEVEL: "",
        // ALLOC_TYPE: "",
        // STATUS: "",
        // PROMOTION: "",
        // ALLOC_DESC: "",
        RELEASE_DATE: new Date().toISOString().slice(0, 10),
        // ALLOC_LEVEL_CODE: "",
        // ALLOC_TYPE_CODE: "",
        // STATUS_CODE: "",
        // PROMOTION_CODE: "",
        // CONTEXT_CODE: "",
      };
    });


    dispatch(getWarehouseRequest([{}]));
    dispatch(getSUPPLIERRequest([{}]));
    dispatch(getSUPPLIERSITERequest([{}]));
    dispatch(getPACKNORequest([{}]));
    dispatch(getDIFFRequest([{}]));
    dispatch(getSKURequest([{}]));
    dispatch(getITEM_LIST_HEADRequest([{}]));
    dispatch(getVPNRequest([{}]));
    dispatch(getUDARequest([{}]));
    dispatch(getPORequest([{}]));
    dispatch(getHIERRequest([{}]));
    dispatch(getEXCLUDEUDARequest([{}]));
    dispatch(getALLOC_LEVELRequest([{}]));
    dispatch(getALLOC_TYPERequest([{}]));
    dispatch(getCONTEXT_TYPERequest([{}]));
    dispatch(getPROMOTIONRequest([{}]));
    dispatch(getSTATUSRequest([{}]));
    dispatch(getALLOC_CRITERIARequest([{}]));
    dispatch(getITEMPARENTRequest([{}]));
    dispatch(getHIER2Request([{}]));
    dispatch(getHIER3Request([{}]));
    dispatch(getASNRequest([{}]));
    dispatch(getTSFRequest([{}]));

    setHeaderDis(false);
    setIsValid(false);
    setAvailCheck(false);

    setIsValidCTEDF(false);
    setIsValidCTNDF(false);
    setIsValidCTEDT(false);
    setIsValidCTNDT(false);

    setIsGreatCTEDF(false);
    setIsGreatCTNDF(false);
    setIsGreatCTEDT(false);
    setIsGreatCTNDT(false);
  }

  //////////////////////////////////////////////////
  const handleDelete = () => {
    const id = selected;
    const data = [...totalData];
    const updatedTable = data.filter((val) => {
      return !id.includes(val.SR_NO);
    });
    // //////console.log("updatedTable:",updatedTable)
    setTabledata(updatedTable)
    setTotalData(updatedTable)
    dispatch(getDELETECREATEGRIDRequest(selData));
    setSelected([]);
    setSelData([]);
  };


  // const SubmitTableList = () => {
  //   setLoading(true);
  //   dispatch(postALLOCINSERTRequest(totalData));
  //   // setTotalData([]);
  // }
  ////////////////////////////////////////////////


  ///////////////////////////////////////////
  ///SINGLE SELECT CODE FOR HEADER//
  ////////////////////////////////////


  const selectALLOC_LEVEL = (val) => {
    //////console.log("value,e",val)
    if (val) {
      setSearchHeaderData((prev) => {
        return {
          ...prev,
          ALLOC_LEVEL: val.CODE,
          ALLOC_LEVEL_CODE: val.ALLOC_LEVEL
        };
      });
    }
    else {
      setSearchHeaderData((prev) => {
        return {
          ...prev,
          ALLOC_LEVEL: "",
          ALLOC_LEVEL_CODE: "",
        };
      });
    }
  }

  const selectALLOC_TYPE = (val) => {
    // //////console.log("value,e",val)
    if (val) {
      setSearchHeaderData((prev) => {
        return {
          ...prev,
          ALLOC_TYPE: val.CODE,
          ALLOC_TYPE_CODE: val.ALLOC_TYPE
        };
      });
    }
    else {
      setSearchHeaderData((prev) => {
        return {
          ...prev,
          ALLOC_TYPE: "",
          ALLOC_TYPE_CODE: "",
        };
      });
    }
  }

  const selectCONTEXT_TYPE = (val) => {
    // //////console.log("value,e",val)
    if (val) {
      setSearchHeaderData((prev) => {
        return {
          ...prev,
          CONTEXT: val.CODE,
          CONTEXT_CODE: val.CONTEXT
        };
      });
    }
    else {
      setSearchHeaderData((prev) => {
        return {
          ...prev,
          CONTEXT: "",
          CONTEXT_CODE: "",
        };
      });
    }
  }

  const selectPROMOTION = (val) => {
    //////console.log("value,e",val)
    if (val) {
      setSearchHeaderData((prev) => {
        return {
          ...prev,
          PROMOTION: val.PROMOTION,
          PROMOTION_CODE: val.PROMOTION
        };
      });
    }
    else {
      setSearchHeaderData((prev) => {
        return {
          ...prev,
          PROMOTION: "",
          PROMOTION_CODE: "",
        };
      });
    }
  }



  /////////////////////////////////
  //search data unique functions///
  /////////////////////////////////


  let UniqTableCPO =
    totalData.length > 0
      ? [...new Map(totalData.map((item) => [item["ITEM"], item])).values()]
      : [];

  // ////console.log("UniqTableCPO:",UniqTableCPO.length)

  let UniqDept =
    hierData.length > 0
      ? [...new Map(hierData.map((item) => [item["HIER1"], item])).values()]
      : [];


  let UniqClass =
    hier2Data.length > 0
      ? [...new Map(hier2Data.map((item) => [item["HIER2"], item])).values()]
      : [];


  let UniqSubClass =
    hier3Data.length > 0
      ? [...new Map(hier3Data.map((item) => [item["HIER3"], item])).values()]
      : [];


  let UniqItemParent =
    itemParentData.length > 0
      ? [...new Map(itemParentData.map((item) => [item["ITEM_PARENT"], item])).values()]
      : [];


  let UniqPOType =
    poData.length > 0
      ? [...new Map(poData.map((item) => [item["PO_TYPE"], item])).values()]
      : [];


  let UniqUDA =
    udaData.length > 0
      ? [...new Map(udaData.map((item) => [item["UDA"], item])).values()]
      : [];

  let UniqExcludeUDA =
    excludeUdaData.length > 0
      ? [...new Map(excludeUdaData.map((item) => [item["EXCLUDE_UDA"], item])).values()]
      : [];

  let UniqVPN =
    vpnData.length > 0
      ? [...new Map(vpnData.map((item) => [item["VPN"], item])).values()]
      : [];


  ///////////////////////////////////////////
  ///MULTI SELECT CODE FOR PURSCHASE ORDER///
  ////////////////////////////////////

  const selectHIER1 = (event, value) => {
    let selectedHIER1 = [];
    if (value.option) {
      valHIER1CPO.push(value.option);
      if (String(value.option.HIER1).includes(inputHIER1CPO)) {
        setInputHIER1CPO("");
      }
      if (String(value.option.HIER1).substring(inputHIER1CPO)) {
        setInputHIER1CPO("");
      }

    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valHIER1CPO.length; i++) {
        if (valHIER1CPO[i]["HIER1"] === value.removedValue.HIER1) {
          index = i;
          break;
        }
      }
      valHIER1CPO.splice(index, 1);
    } else if (value.action === "clear") {
      valHIER1CPO.splice(0, valHIER1CPO.length);
    }

    if (event === 0) {
      valHIER1CPO.push(value)
    }

    if (valHIER1CPO.length > 0 && typeof valHIER1CPO[0]['HIER1'] !== "undefined") {
      valHIER1CPO.map(
        (item) => {
          selectedHIER1.push(item.HIER1);
        }
      )
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          HIER1: selectedHIER1,
        };
      });

      if (valHIER1CPO.length > 0 || valHIER2CPO.length > 0 || valHIER3CPO.length > 0 || valITEM_PARENTCPO.length > 0 || valPACK_NOCPO.length > 0 || valSKUCPO.length > 0 || valDIFF_IDCPO.length > 0 || valVPNCPO.length > 0 || valUDACPO.length > 0) {
        valPost = [...valHIER1CPO, ...valHIER2CPO, ...valHIER3CPO, ...valITEM_PARENTCPO, ...valPACK_NOCPO, ...valSKUCPO, ...valDIFF_IDCPO, ...valVPNCPO, ...valUDACPO]
        dispatch(getHIER2Request(valPost));
        dispatch(getHIER3Request(valPost));
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
      } else {
        valPost = [...valHIER1CPO]
        dispatch(getHIER3Request(valPost));
        dispatch(getHIER2Request(valPost));
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
      }
      //////console.log("valPosthier1:",valPost)



    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid HIER1"}</p>
        </div>
      )
    } else {
      initialDataPO.HIER1 = "";
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          HIER1: [],
        };
      });
      if (valHIER1CPO.length > 0 || valHIER2CPO.length > 0 || valHIER3CPO.length > 0 || valITEM_PARENTCPO.length > 0 || valPACK_NOCPO.length > 0 || valSKUCPO.length > 0 || valDIFF_IDCPO.length > 0 || valVPNCPO.length > 0 || valUDACPO.length > 0) {
        valPost = [...valHIER1CPO, ...valHIER2CPO, ...valHIER3CPO, ...valITEM_PARENTCPO, ...valPACK_NOCPO, ...valSKUCPO, ...valDIFF_IDCPO, ...valVPNCPO, ...valUDACPO]
        dispatch(getHIER2Request(valPost));
        dispatch(getHIER3Request(valPost));
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
      } else {
        dispatch(getHIER2Request([{}]));
        dispatch(getHIER3Request([{}]));
        dispatch(getITEMPARENTRequest([{}]));
        dispatch(getPACKNORequest([{}]));
        dispatch(getSKURequest([{}]));
        dispatch(getDIFFRequest([{}]));
        dispatch(getVPNRequest([{}]));
        dispatch(getUDARequest([{}]));
      }
    }
  }


  const selectHIER2 = (event, value) => {
    let selectedHIER2 = [];
    if (value.option) {
      valHIER2CPO.push(value.option);
      if (String(value.option.HIER2).includes(inputHIER2CPO)) {
        setInputHIER2CPO("");
      }
      if (String(value.option.HIER2).substring(inputHIER2CPO)) {
        setInputHIER2CPO("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valHIER2CPO.length; i++) {
        if (valHIER2CPO[i]["HIER2"] === value.removedValue.HIER2) {
          index = i;
          break;
        }
      }
      valHIER2CPO.splice(index, 1);
    } else if (value.action === "clear") {
      valHIER2CPO.splice(0, valHIER2CPO.length);
    }
    if (event === 0) {
      valHIER2CPO.push(value)
    }
    if (valHIER2CPO.length > 0 && typeof valHIER2CPO[0]['HIER2'] !== "undefined") {
      valHIER2CPO.map(
        (item) => {
          selectedHIER2.push(item.HIER2);
        }
      )
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          HIER2: selectedHIER2,
        };
      });

      // if (valHIER1CPO.length>0 && valHIER3CPO.length>0){
      //   valPost=[...valHIER1CPO,...valHIER2CPO,...valHIER3CPO]
      //   dispatch(getITEMPARENTRequest(valPost));
      // }
      // else if (valHIER3CPO.length>0){
      //   valPost=[...valHIER2CPO,...valHIER3CPO]
      //   dispatch(getITEMPARENTRequest(valPost));
      // }
      // else if (valHIER1CPO.length>0){
      //   valPost=[...valHIER1CPO,...valHIER2CPO]
      //   dispatch(getHIER3Request(valPost));
      //   dispatch(getITEMPARENTRequest(valPost));
      // }else{
      //   valPost=[...valHIER2CPO]
      //   dispatch(getHIER3Request(valPost));
      //   dispatch(getITEMPARENTRequest(valPost));
      // }


      if (valHIER1CPO.length > 0 || valHIER2CPO.length > 0 || valHIER3CPO.length > 0 || valITEM_PARENTCPO.length > 0 || valPACK_NOCPO.length > 0 || valSKUCPO.length > 0 || valDIFF_IDCPO.length > 0 || valVPNCPO.length > 0 || valUDACPO.length > 0) {
        valPost = [...valHIER1CPO, ...valHIER2CPO, ...valHIER3CPO, ...valITEM_PARENTCPO, ...valPACK_NOCPO, ...valSKUCPO, ...valDIFF_IDCPO, ...valVPNCPO, ...valUDACPO]
        dispatch(getHIER3Request(valPost));
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
      } else {
        valPost = [...valHIER2CPO]
        dispatch(getHIER3Request(valPost));
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
      }
      //////console.log("valPost:",valPost)




    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid HIER2"}</p>
        </div>
      )
    } else {
      initialDataPO.HIER2 = "";
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          HIER2: [],
        };
      });
      if (valHIER1CPO.length > 0 || valHIER2CPO.length > 0 || valHIER3CPO.length > 0 || valITEM_PARENTCPO.length > 0 || valPACK_NOCPO.length > 0 || valSKUCPO.length > 0 || valDIFF_IDCPO.length > 0 || valVPNCPO.length > 0 || valUDACPO.length > 0) {
        valPost = [...valHIER1CPO, ...valHIER2CPO, ...valHIER3CPO, ...valITEM_PARENTCPO, ...valPACK_NOCPO, ...valSKUCPO, ...valDIFF_IDCPO, ...valVPNCPO, ...valUDACPO]
        dispatch(getHIER3Request(valPost));
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
      } else {
        dispatch(getHIER3Request([{}]));
        dispatch(getITEMPARENTRequest([{}]));
        dispatch(getPACKNORequest([{}]));
        dispatch(getSKURequest([{}]));
        dispatch(getDIFFRequest([{}]));
        dispatch(getVPNRequest([{}]));
        dispatch(getUDARequest([{}]));
      }
    }
  }


  const selectHIER3 = (event, value) => {
    let selectedHIER3 = [];
    if (value.option) {
      valHIER3CPO.push(value.option);
      if (String(value.option.HIER3).includes(inputHIER3CPO)) {
        setInputHIER3CPO("");
      }
      if (String(value.option.HIER3).substring(inputHIER3CPO)) {
        setInputHIER3CPO("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valHIER3CPO.length; i++) {
        if (valHIER3CPO[i]["HIER3"] === value.removedValue.HIER3) {
          index = i;
          break;
        }
      }
      valHIER3CPO.splice(index, 1);
    } else if (value.action === "clear") {
      valHIER3CPO.splice(0, valHIER3CPO.length);
    }
    if (event === 0) {
      valHIER3CPO.push(value)
    }
    if (valHIER3CPO.length > 0 && typeof valHIER3CPO[0]['HIER3'] !== "undefined") {
      valHIER3CPO.map(
        (item) => {
          selectedHIER3.push(item.HIER3);
        }
      )
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          HIER3: selectedHIER3,
        };
      });

      if (valHIER1CPO.length > 0 || valHIER2CPO.length > 0 || valHIER3CPO.length > 0 || valITEM_PARENTCPO.length > 0 || valPACK_NOCPO.length > 0 || valSKUCPO.length > 0 || valDIFF_IDCPO.length > 0 || valVPNCPO.length > 0 || valUDACPO.length > 0) {
        valPost = [...valHIER1CPO, ...valHIER2CPO, ...valHIER3CPO, ...valITEM_PARENTCPO, ...valPACK_NOCPO, ...valSKUCPO, ...valDIFF_IDCPO, ...valVPNCPO, ...valUDACPO]
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
      } else {
        valPost = [...valHIER3CPO]
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
      }

    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid HIER3"}</p>
        </div>
      )
    } else {
      initialDataPO.HIER3 = "";
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          HIER3: [],
        };
      });
      if (valHIER1CPO.length > 0 || valHIER2CPO.length > 0 || valHIER3CPO.length > 0 || valITEM_PARENTCPO.length > 0 || valPACK_NOCPO.length > 0 || valSKUCPO.length > 0 || valDIFF_IDCPO.length > 0 || valVPNCPO.length > 0 || valUDACPO.length > 0) {
        valPost = [...valHIER1CPO, ...valHIER2CPO, ...valHIER3CPO, ...valITEM_PARENTCPO, ...valPACK_NOCPO, ...valSKUCPO, ...valDIFF_IDCPO, ...valVPNCPO, ...valUDACPO]
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
      } else {
        dispatch(getITEMPARENTRequest([{}]));
        dispatch(getPACKNORequest([{}]));
        dispatch(getSKURequest([{}]));
        dispatch(getDIFFRequest([{}]));
        dispatch(getVPNRequest([{}]));
        dispatch(getUDARequest([{}]));
      }
    }
  }


  const selectITEM_PARENT = (event, value) => {
    let selectedITEM_PARENT = [];
    if (value.option) {
      valITEM_PARENTCPO.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputITEM_PARENTCPO("");
      // }
      if (String(value.option.ITEM_PARENT).includes(inputITEM_PARENTCPO)) {
        setInputITEM_PARENTCPO("");
      }
      if (String(value.option.ITEM_PARENT).substring(inputITEM_PARENTCPO)) {
        setInputITEM_PARENTCPO("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valITEM_PARENTCPO.length; i++) {
        if (valITEM_PARENTCPO[i]["ITEM_PARENT"] === value.removedValue.ITEM_PARENT) {
          index = i;
          break;
        }
      }
      valITEM_PARENTCPO.splice(index, 1);
    } else if (value.action === "clear") {
      valITEM_PARENTCPO.splice(0, valITEM_PARENTCPO.length);
    }
    if (event === 0) {
      valITEM_PARENTCPO.push(value)
    }
    if (valITEM_PARENTCPO.length > 0 && typeof valITEM_PARENTCPO[0]['ITEM_PARENT'] !== "undefined") {
      valITEM_PARENTCPO.map(
        (item) => {
          selectedITEM_PARENT.push(item.ITEM_PARENT);
        }
      )
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          ITEM_PARENT: selectedITEM_PARENT,
        };
      });
      if (valHIER1CPO.length > 0 || valHIER2CPO.length > 0 || valHIER3CPO.length > 0 || valITEM_PARENTCPO.length > 0 || valPACK_NOCPO.length > 0 || valSKUCPO.length > 0 || valDIFF_IDCPO.length > 0 || valVPNCPO.length > 0 || valUDACPO.length > 0) {
        valPost = [...valHIER1CPO, ...valHIER2CPO, ...valHIER3CPO, ...valITEM_PARENTCPO, ...valPACK_NOCPO, ...valSKUCPO, ...valDIFF_IDCPO, ...valVPNCPO, ...valUDACPO]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getPACKNORequest(valPost));
      } else {
        valPost = [...valITEM_PARENTCPO]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getPACKNORequest(valPost));
      }

    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid ITEM_PARENT"}</p>
        </div>
      )
    } else {
      initialDataPO.ITEM_PARENT = "";
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          ITEM_PARENT: [],
        };
      });
      if (valHIER1CPO.length > 0 || valHIER2CPO.length > 0 || valHIER3CPO.length > 0 || valITEM_PARENTCPO.length > 0 || valPACK_NOCPO.length > 0 || valSKUCPO.length > 0 || valDIFF_IDCPO.length > 0 || valVPNCPO.length > 0 || valUDACPO.length > 0) {
        valPost = [...valHIER1CPO, ...valHIER2CPO, ...valHIER3CPO, ...valITEM_PARENTCPO, ...valPACK_NOCPO, ...valSKUCPO, ...valDIFF_IDCPO, ...valVPNCPO, ...valUDACPO]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getPACKNORequest(valPost));
      } else {
        dispatch(getDIFFRequest([{}]));
        dispatch(getVPNRequest([{}]));
        dispatch(getUDARequest([{}]));
        dispatch(getPACKNORequest([{}]));
      }
    }
  }


  const selectWH = (event, value) => {
    let selectedWH = [];
    if (value.option) {
      valWHCPO.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputWHCPO("");
      // }
      if (String(value.option.WH).includes(inputWHCPO)) {
        setInputWHCPO("");
      }
      if (String(value.option.WH).substring(inputWHCPO)) {
        setInputWHCPO("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valWHCPO.length; i++) {
        if (valWHCPO[i]["WH"] === value.removedValue.WH) {
          index = i;
          break;
        }
      }
      valWHCPO.splice(index, 1);
    } else if (value.action === "clear") {
      valWHCPO.splice(0, valWHCPO.length);
    }
    if (event === 0) {
      valWHCPO.push(value)
    }
    if (valWHCPO.length > 0 && typeof valWHCPO[0]['WH'] !== "undefined") {
      valWHCPO.map(
        (item) => {
          selectedWH.push(item.WH);
        }
      )
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          WH: selectedWH,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid WH"}</p>
        </div>
      )
    } else {
      initialDataPO.WH = "";
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          WH: [],
        };
      });
    }
  }


  const selectSUPPLIER = (event, value) => {
    let selectedSUPPLIER = [];
    if (value.option) {
      valSUPPLIERCPO.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputWHCPO("");
      // }
      if (String(value.option.SUPPLIER).includes(inputSUPPLIERCPO)) {
        setInputSUPPLIERCPO("");
      }
      if (String(value.option.SUPPLIER).substring(inputSUPPLIERCPO)) {
        setInputSUPPLIERCPO("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valSUPPLIERCPO.length; i++) {
        if (valSUPPLIERCPO[i]["SUPPLIER"] === value.removedValue.SUPPLIER) {
          index = i;
          break;
        }
      }
      valSUPPLIERCPO.splice(index, 1);
    } else if (value.action === "clear") {
      valSUPPLIERCPO.splice(0, valSUPPLIERCPO.length);
    }
    if (event === 0) {
      valSUPPLIERCPO.push(value)
    }
    if (valSUPPLIERCPO.length > 0 && typeof valSUPPLIERCPO[0]['SUPPLIER'] !== "undefined") {
      valSUPPLIERCPO.map(
        (item) => {
          selectedSUPPLIER.push(item.SUPPLIER);
        }
      )
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          SUPPLIER: selectedSUPPLIER,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid SUPPLIER"}</p>
        </div>
      )
    } else {
      initialDataPO.SUPPLIER = "";
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          SUPPLIER: [],
        };
      });
    }
  }


  const selectSUPPLIER_SITE = (event, value) => {
    let selectedSUPPLIER_SITE = [];
    if (value.option) {
      valSUPPLIER_SITECPO.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputWHCPO("");
      // }
      if (String(value.option.SUPPLIER_SITE).includes(inputSUPPLIER_SITECPO)) {
        setInputSUPPLIER_SITECPO("");
      }
      if (String(value.option.SUPPLIER_SITE).substring(inputSUPPLIER_SITECPO)) {
        setInputSUPPLIER_SITECPO("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valSUPPLIER_SITECPO.length; i++) {
        if (valSUPPLIER_SITECPO[i]["SUPPLIER_SITE"] === value.removedValue.SUPPLIER_SITE) {
          index = i;
          break;
        }
      }
      valSUPPLIER_SITECPO.splice(index, 1);
    } else if (value.action === "clear") {
      valSUPPLIER_SITECPO.splice(0, valSUPPLIER_SITECPO.length);
    }
    if (event === 0) {
      valSUPPLIER_SITECPO.push(value)
    }
    if (valSUPPLIER_SITECPO.length > 0 && typeof valSUPPLIER_SITECPO[0]['SUPPLIER_SITE'] !== "undefined") {
      valSUPPLIER_SITECPO.map(
        (item) => {
          selectedSUPPLIER_SITE.push(item.SUPPLIER_SITE);
        }
      )
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          SUPPLIER_SITE: selectedSUPPLIER_SITE,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid SUPPLIER_SITE"}</p>
        </div>
      )
    } else {
      initialDataPO.SUPPLIER_SITE = "";
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          SUPPLIER_SITE: [],
        };
      });
    }
  }


  const selectPACK_NO = (event, value) => {
    let selectedPACK_NO = [];
    if (value.option) {
      valPACK_NOCPO.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputWHCPO("");
      // }
      if (String(value.option.PACK_NO).includes(inputPACK_NOCPO)) {
        setInputPACK_NOCPO("");
      }
      if (String(value.option.PACK_NO).substring(inputPACK_NOCPO)) {
        setInputPACK_NOCPO("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valPACK_NOCPO.length; i++) {
        if (valPACK_NOCPO[i]["PACK_NO"] === value.removedValue.PACK_NO) {
          index = i;
          break;
        }
      }
      valPACK_NOCPO.splice(index, 1);
    } else if (value.action === "clear") {
      valPACK_NOCPO.splice(0, valPACK_NOCPO.length);
    }
    if (event === 0) {
      valPACK_NOCPO.push(value)
    }
    if (valPACK_NOCPO.length > 0 && typeof valPACK_NOCPO[0]['PACK_NO'] !== "undefined") {
      valPACK_NOCPO.map(
        (item) => {
          selectedPACK_NO.push(item.PACK_NO);
        }
      )
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          PACK_NO: selectedPACK_NO,
        };
      });
      if (valHIER1CPO.length > 0 || valHIER2CPO.length > 0 || valHIER3CPO.length > 0 || valITEM_PARENTCPO.length > 0 || valPACK_NOCPO.length > 0 || valSKUCPO.length > 0 || valDIFF_IDCPO.length > 0 || valVPNCPO.length > 0 || valUDACPO.length > 0) {
        valPost = [...valHIER1CPO, ...valHIER2CPO, ...valHIER3CPO, ...valITEM_PARENTCPO, ...valPACK_NOCPO, ...valSKUCPO, ...valDIFF_IDCPO, ...valVPNCPO, ...valUDACPO]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
      } else {
        valPost = [...valPACK_NOCPO]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
      }

    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid PACK_NO"}</p>
        </div>
      )
    } else {
      initialDataPO.PACK_NO = "";
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          PACK_NO: [],
        };
      });
      if (valHIER1CPO.length > 0 || valHIER2CPO.length > 0 || valHIER3CPO.length > 0 || valITEM_PARENTCPO.length > 0 || valPACK_NOCPO.length > 0 || valSKUCPO.length > 0 || valDIFF_IDCPO.length > 0 || valVPNCPO.length > 0 || valUDACPO.length > 0) {
        valPost = [...valHIER1CPO, ...valHIER2CPO, ...valHIER3CPO, ...valITEM_PARENTCPO, ...valPACK_NOCPO, ...valSKUCPO, ...valDIFF_IDCPO, ...valVPNCPO, ...valUDACPO]
        // //////console.log("valPost:111234",valPost)
        // //////console.log("diffData.length > 0 ? diffData : []",diffData.length > 0 ? diffData : [])
        // if (valPost){
        //   //////console.log("valPost:33333",valPost)
        //   var check=false
        //   // valPost.map(object => {delete object["DIFF_ID"];});
        //   // valPost.map(obj=>{if((Object.keys(obj))){
        //   //   //////console.log("valPost:1234444",obj)
        //   // }})
        //   // const filteredvalPost = valPost.splice(valPost.findIndex((item) => Object.keys(item)!=="DIFF_ID"),1)
        //   valPost.filter((obj) =>delete obj.DIFF_ID)
        //   // var newArray = valPost.filter(value => Object.keys(value).length !== 0);


        //   // array.filter(value => Object.keys(value).length !== 0);
        //   //////console.log("value123456::",valPost.findIndex((item) => Object.keys(item)!=="DIFF_ID"))
        //   //////console.log("valPost:5555",check,Object.keys(valPost[0]).length,"  valPost ","filteredvalPost::::")
        //   // for 
        //   if (Object.keys(valPost[0]).length>0){
        //     //////console.log("deelete",valPost)
        //     dispatch(getDIFFRequest(valPost));

        //   }else{
        //     //////console.log("apply")
        //     setDIffData(postval1)
        //     dispatch(getDIFFRequest([{}]));
        //   }
        // }
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
      } else {
        dispatch(getDIFFRequest([{}]));
        dispatch(getVPNRequest([{}]));
        dispatch(getUDARequest([{}]));
      }
    }
  }


  const selectDIFF_ID = (event, value) => {
    let selectedDIFF_ID = [];
    if (value.option) {
      valDIFF_IDCPO.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputWHCPO("");
      // }
      // //////console.log("inputDIFF_IDCPO:",inputDIFF_IDCPO)
      // //////console.log("valDIFF_IDCPO:",valDIFF_IDCPO)
      if (String(value.option.DIFF_ID).substring(inputDIFF_IDCPO)) {
        setInputDIFF_IDCPO("");
      }
      if (String(value.option.DIFF_ID).includes(inputDIFF_IDCPO)) {
        setInputDIFF_IDCPO("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valDIFF_IDCPO.length; i++) {
        if (valDIFF_IDCPO[i]["DIFF_ID"] === value.removedValue.DIFF_ID) {
          index = i;
          break;
        }
      }
      valDIFF_IDCPO.splice(index, 1);
    } else if (value.action === "clear") {
      valDIFF_IDCPO.splice(0, valDIFF_IDCPO.length);
    }
    if (event === 0) {
      valDIFF_IDCPO.push(value)
    }
    if (valDIFF_IDCPO.length > 0 && typeof valDIFF_IDCPO[0]['DIFF_ID'] !== "undefined") {
      valDIFF_IDCPO.map(
        (item) => {
          selectedDIFF_ID.push(item.DIFF_ID);
        }
      )
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          DIFF_ID: selectedDIFF_ID,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid DIFF_ID"}</p>
        </div>
      )
    } else {
      initialDataPO.DIFF_ID = "";
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          DIFF_ID: [],
        };
      });
    }
  }


  const selectSKU = (event, value) => {
    let selectedSKU = [];
    if (value.option) {
      valSKUCPO.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputWHCPO("");
      // }
      if (String(value.option.SKU).includes(inputSKUCPO)) {
        setInputSKUCPO("");
      }
      if (String(value.option.SKU).substring(inputSKUCPO)) {
        setInputSKUCPO("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valSKUCPO.length; i++) {
        if (valSKUCPO[i]["SKU"] === value.removedValue.SKU) {
          index = i;
          break;
        }
      }
      valSKUCPO.splice(index, 1);
    } else if (value.action === "clear") {
      valSKUCPO.splice(0, valSKUCPO.length);
    }
    if (event === 0) {
      valSKUCPO.push(value)
    }
    if (valSKUCPO.length > 0 && typeof valSKUCPO[0]['SKU'] !== "undefined") {
      valSKUCPO.map(
        (item) => {
          selectedSKU.push(item.SKU);
        }
      )
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          SKU: selectedSKU,
        };
      });
      if (valHIER1CPO.length > 0 || valHIER2CPO.length > 0 || valHIER3CPO.length > 0 || valITEM_PARENTCPO.length > 0 || valPACK_NOCPO.length > 0 || valSKUCPO.length > 0 || valDIFF_IDCPO.length > 0 || valVPNCPO.length > 0 || valUDACPO.length > 0) {
        valPost = [...valHIER1CPO, ...valHIER2CPO, ...valHIER3CPO, ...valITEM_PARENTCPO, ...valPACK_NOCPO, ...valSKUCPO, ...valDIFF_IDCPO, ...valVPNCPO, ...valUDACPO]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
      } else {
        valPost = [...valSKUCPO]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
      }
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid SKU"}</p>
        </div>
      )
    } else {
      initialDataPO.SKU = "";
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          SKU: [],
        };
      });
      if (valHIER1CPO.length > 0 || valHIER2CPO.length > 0 || valHIER3CPO.length > 0 || valITEM_PARENTCPO.length > 0 || valPACK_NOCPO.length > 0 || valSKUCPO.length > 0 || valDIFF_IDCPO.length > 0 || valVPNCPO.length > 0 || valUDACPO.length > 0) {
        valPost = [...valHIER1CPO, ...valHIER2CPO, ...valHIER3CPO, ...valITEM_PARENTCPO, ...valPACK_NOCPO, ...valSKUCPO, ...valDIFF_IDCPO, ...valVPNCPO, ...valUDACPO]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
      } else {
        dispatch(getDIFFRequest([{}]));
        dispatch(getVPNRequest([{}]));
        dispatch(getUDARequest([{}]));
      }
    }
  }


  const selectITEM_LIST_NO = (event, value) => {
    let selectedITEM_LIST_NO = [];
    if (value.option) {
      valITEM_LIST_NOCPO.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputWHCPO("");
      // }
      if (String(value.option.ITEM_LIST_NO).includes(inputITEM_LIST_NOCPO)) {
        setInputITEM_LIST_NOCPO("");
      }
      if (String(value.option.ITEM_LIST_NO).substring(inputITEM_LIST_NOCPO)) {
        setInputITEM_LIST_NOCPO("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valITEM_LIST_NOCPO.length; i++) {
        if (valITEM_LIST_NOCPO[i]["ITEM_LIST_NO"] === value.removedValue.ITEM_LIST_NO) {
          index = i;
          break;
        }
      }
      valITEM_LIST_NOCPO.splice(index, 1);
    } else if (value.action === "clear") {
      valITEM_LIST_NOCPO.splice(0, valITEM_LIST_NOCPO.length);
    }
    if (event === 0) {
      valITEM_LIST_NOCPO.push(value)
    }
    if (valITEM_LIST_NOCPO.length > 0 && typeof valITEM_LIST_NOCPO[0]['ITEM_LIST_NO'] !== "undefined") {
      valITEM_LIST_NOCPO.map(
        (item) => {
          selectedITEM_LIST_NO.push(item.ITEM_LIST_NO);
        }
      )
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          ITEM_LIST_NO: selectedITEM_LIST_NO,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid ITEM_LIST_NO"}</p>
        </div>
      )
    } else {
      initialDataPO.ITEM_LIST_NO = "";
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          ITEM_LIST_NO: [],
        };
      });
    }
  }


  const selectVPN = (event, value) => {
    let selectedVPN = [];
    if (value.option) {
      valVPNCPO.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputWHCPO("");
      // }
      if (String(value.option.VPN).substring(inputVPNCPO)) {
        setInputVPNCPO("");
      }
      if (String(value.option.VPN).includes(inputVPNCPO)) {
        setInputVPNCPO("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valVPNCPO.length; i++) {
        if (valVPNCPO[i]["VPN"] === value.removedValue.VPN) {
          index = i;
          break;
        }
      }
      valVPNCPO.splice(index, 1);
    } else if (value.action === "clear") {
      valVPNCPO.splice(0, valVPNCPO.length);
    }
    if (event === 0) {
      valVPNCPO.push(value)
    }
    if (valVPNCPO.length > 0 && typeof valVPNCPO[0]['VPN'] !== "undefined") {
      valVPNCPO.map(
        (item) => {
          selectedVPN.push(item.VPN);
        }
      )
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          VPN: selectedVPN,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid VPN"}</p>
        </div>
      )
    } else {
      initialDataPO.VPN = "";
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          VPN: [],
        };
      });
    }
  }


  const selectPO = (event, value) => {
    let selectedPO = [];
    if (value.option) {
      valPOCPO.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputWHCPO("");
      // }
      if (String(value.option.PO).includes(inputPOCPO)) {
        setInputPOCPO("");
      }
      if (String(value.option.PO).substring(inputPOCPO)) {
        setInputPOCPO("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valPOCPO.length; i++) {
        if (valPOCPO[i]["PO"] === value.removedValue.PO) {
          index = i;
          break;
        }
      }
      valPOCPO.splice(index, 1);
    } else if (value.action === "clear") {
      valPOCPO.splice(0, valPOCPO.length);
    }
    if (event === 0) {
      valPOCPO.push(value)
    }
    if (valPOCPO.length > 0 && typeof valPOCPO[0]['PO'] !== "undefined") {
      valPOCPO.map(
        (item) => {
          selectedPO.push(item.PO);
        }
      )
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          PO: selectedPO,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid PO"}</p>
        </div>
      )
    } else {
      initialDataPO.PO = "";
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          PO: [],
        };
      });
    }
  }


  const selectPO_TYPE = (event, value) => {
    let selectedPO_TYPE = [];
    if (value.option) {
      valPO_TYPECPO.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputWHCPO("");
      // }
      if (String(value.option.PO_TYPE).substring(inputPO_TYPECPO)) {
        setInputPO_TYPECPO("");
      }
      if (String(value.option.PO_TYPE).includes(inputPO_TYPECPO)) {
        setInputPO_TYPECPO("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valPO_TYPECPO.length; i++) {
        if (valPO_TYPECPO[i]["PO_TYPE"] === value.removedValue.PO_TYPE) {
          index = i;
          break;
        }
      }
      valPO_TYPECPO.splice(index, 1);
    } else if (value.action === "clear") {
      valPO_TYPECPO.splice(0, valPO_TYPECPO.length);
    }
    if (event === 0) {
      valPO_TYPECPO.push(value)
    }
    if (valPO_TYPECPO.length > 0 && typeof valPO_TYPECPO[0]['PO_TYPE'] !== "undefined") {
      valPO_TYPECPO.map(
        (item) => {
          selectedPO_TYPE.push(item.PO_TYPE);
        }
      )
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          PO_TYPE: selectedPO_TYPE,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid PO_TYPE"}</p>
        </div>
      )
    } else {
      initialDataPO.PO_TYPE = "";
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          PO_TYPE: [],
        };
      });
    }
  }


  const selectUDA = (e, value) => {
    if (e === "Filter") {
      valUDACPO.splice(0, valUDACPO.length);
      valUDACPO.push(...value);
    }

    let selectedUDA = [];
    if (value.option) {
      valUDACPO.push(value.option)
      if (String(value.option.UDA).includes(inputUDACPO)) {
        setInputUDACPO("");
      }
      if (String(value.option.UDA).substring(inputUDACPO)) {
        setInputUDACPO("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valUDACPO.length; i++) {
        if (valUDACPO[i]["UDA"] === value.removedValue.UDA) {
          index = i;
          break;
        }
      }
      valUDACPO.splice(index, 1);

    } else if (value.action === "clear") {
      valUDACPO.splice(0, valUDACPO.length);
      valUDA_VALUECPO.splice(0, valUDA_VALUECPO.length);
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          UDA_VALUE: [],
        };

      });
    }
    //manual input handle input and filter itemdata
    if (e === 0) {
      valUDACPO.push(value)
    }
    //Filtering UDA_VALUE based on UDA
    if (valUDACPO.length > 0) {
      //////console.log("valUDACPO",valUDACPO)
      const filterUDAValueCPO = udaData.filter((item) => {
        return (valUDACPO).some((val) => {
          return item.UDA === val.UDA;
        });
      });
      //////console.log("filterUDAValueCPO",filterUDAValueCPO)
      setFilterUDAValueCPO(filterUDAValueCPO);
      valUDACPO.map((item) => {
        selectedUDA.push(item.UDA);
      });
      if (e !== "Filter") {
        setSearchDataCPO((prev) => {
          return {
            ...prev,
            UDA: selectedUDA,
          };
        });
      }
      var filter_rem1 = selectedUDA.filter(function (i) {
        return this.indexOf(i) < 0;
      },
        searchDataCPO.UDA)

      var filter_rem2 = searchDataCPO.UDA.filter(function (i) {
        return this.indexOf(i) < 0;
      },
        selectedUDA)
      //////////console.log("wew",elmts)
      if (filter_rem1.length > 0 || filter_rem2.length > 0) {
        var temp = [];
        filter_rem1.length > 0 ? temp = [...filter_rem1] : temp = [...filter_rem2]
        ////////console.log("wew",temp)
        for (var i = 0; i < temp.length; i++) {////////console.log("Afvsd")
          const index = searchDataCPO.UDA.indexOf(temp[i]);
          if (index > -1) {
            searchDataCPO.UDA.splice(index, 1);
          }
          ////////console.log("searchDataCPO.UDA",searchDataCPO.UDA)
        }
      }
    } else {
      setFilterUDAValueCPO([]);
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          UDA: []
        };
      });
    }
  }


  const selectUDA_VALUE = (e, value) => {
    let selectedUDA_VALUE = [];
    if (value.option) {
      valUDA_VALUECPO.push(value.option)
      if (String(value.option.UDA_VALUE).includes(inputUDA_VALUECPO)) {
        setInputUDA_VALUECPO("");
      }
      if (String(value.option.UDA_VALUE).substring(inputUDA_VALUECPO)) {
        setInputUDA_VALUECPO("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valUDA_VALUECPO.length; i++) {
        if (valUDA_VALUECPO[i]["UDA_VALUE"] === value.removedValue.UDA_VALUE) {
          index = i;
          break;
        }
      }
      valUDA_VALUECPO.splice(index, 1);

    } else if (value.action === "clear") {
      valUDA_VALUECPO.splice(0, valUDA_VALUECPO.length);
    }
    //manual input handle input and filter itemdata
    if (e === 0) {
      valUDA_VALUECPO.push(value);
    }
    //Filtering UDA_VALUE based on UDA
    if (valUDA_VALUECPO.length > 0) {

      valUDA_VALUECPO.map((item) => {
        selectedUDA_VALUE.push(item.UDA_VALUE);
      });
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          UDA_VALUE: selectedUDA_VALUE,
        };
      });
    } else {
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          UDA_VALUE: selectedUDA_VALUE,
        };
      });
    }
  }


  const selectEXCLUDE_UDA = (e, value) => {
    if (e === "Filter") {
      valEXCLUDE_UDACPO.splice(0, valEXCLUDE_UDACPO.length);
      valEXCLUDE_UDACPO.push(...value);
    }

    let selectedEXCLUDE_UDA = [];
    if (value.option) {
      valEXCLUDE_UDACPO.push(value.option)
      if (String(value.option.EXCLUDE_UDA).includes(inputEXCLUDE_UDACPO)) {
        setInputEXCLUDE_UDACPO("");
      }
      if (String(value.option.EXCLUDE_UDA).substring(inputEXCLUDE_UDACPO)) {
        setInputEXCLUDE_UDACPO("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valEXCLUDE_UDACPO.length; i++) {
        if (valEXCLUDE_UDACPO[i]["EXCLUDE_UDA"] === value.removedValue.EXCLUDE_UDA) {
          index = i;
          break;
        }
      }
      valEXCLUDE_UDACPO.splice(index, 1);

    } else if (value.action === "clear") {
      valEXCLUDE_UDACPO.splice(0, valEXCLUDE_UDACPO.length);
      valEXCLUDE_UDA_VALUECPO.splice(0, valEXCLUDE_UDA_VALUECPO.length);
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          EXCLUDE_UDA_VALUE: [],
        };

      });
    }
    //manual input handle input and filter itemdata
    if (e === 0) {
      valEXCLUDE_UDACPO.push(value)
    }
    //Filtering EXCLUDE_UDA_VALUE based on EXCLUDE_UDA
    if (valEXCLUDE_UDACPO.length > 0) {
      //////console.log("valEXCLUDE_UDACPO",valEXCLUDE_UDACPO)
      const filterEXCLUDE_UDAValueCPO = excludeUdaData.filter((item) => {
        return (valEXCLUDE_UDACPO).some((val) => {
          return item.EXCLUDE_UDA === val.EXCLUDE_UDA;
        });
      });
      //////console.log("filterEXCLUDE_UDAValueCPO",filterEXCLUDE_UDAValueCPO)
      setFilterEXCLUDE_UDAValueCPO(filterEXCLUDE_UDAValueCPO);
      valEXCLUDE_UDACPO.map((item) => {
        selectedEXCLUDE_UDA.push(item.EXCLUDE_UDA);
      });
      if (e !== "Filter") {
        setSearchDataCPO((prev) => {
          return {
            ...prev,
            EXCLUDE_UDA: selectedEXCLUDE_UDA,
          };
        });
      }
      var filter_rem1 = selectedEXCLUDE_UDA.filter(function (i) {
        return this.indexOf(i) < 0;
      },
        searchDataCPO.EXCLUDE_UDA)

      var filter_rem2 = searchDataCPO.EXCLUDE_UDA.filter(function (i) {
        return this.indexOf(i) < 0;
      },
        selectedEXCLUDE_UDA)
      //////////console.log("wew",elmts)
      if (filter_rem1.length > 0 || filter_rem2.length > 0) {
        var temp = [];
        filter_rem1.length > 0 ? temp = [...filter_rem1] : temp = [...filter_rem2]
        ////////console.log("wew",temp)
        for (var i = 0; i < temp.length; i++) {////////console.log("Afvsd")
          const index = searchDataCPO.EXCLUDE_UDA.indexOf(temp[i]);
          if (index > -1) {
            searchDataCPO.EXCLUDE_UDA.splice(index, 1);
          }
          ////////console.log("searchDataCPO.EXCLUDE_UDA",searchDataCPO.EXCLUDE_UDA)
        }
      }
    } else {
      setFilterEXCLUDE_UDAValueCPO([]);
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          EXCLUDE_UDA: []
        };
      });
    }
  }


  const selectEXCLUDE_UDA_VALUE = (e, value) => {
    let selectedEXCLUDE_UDA_VALUE = [];
    if (value.option) {
      valEXCLUDE_UDA_VALUECPO.push(value.option)
      if (String(value.option.EXCLUDE_UDA_VALUE).includes(inputEXCLUDE_UDA_VALUECPO)) {
        setInputEXCLUDE_UDA_VALUECPO("");
      }
      if (String(value.option.EXCLUDE_UDA_VALUE).substring(inputEXCLUDE_UDA_VALUECPO)) {
        setInputEXCLUDE_UDA_VALUECPO("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valEXCLUDE_UDA_VALUECPO.length; i++) {
        if (valEXCLUDE_UDA_VALUECPO[i]["EXCLUDE_UDA_VALUE"] === value.removedValue.EXCLUDE_UDA_VALUE) {
          index = i;
          break;
        }
      }
      valEXCLUDE_UDA_VALUECPO.splice(index, 1);

    } else if (value.action === "clear") {
      valEXCLUDE_UDA_VALUECPO.splice(0, valEXCLUDE_UDA_VALUECPO.length);
    }
    //manual input handle input and filter itemdata
    if (e === 0) {
      valEXCLUDE_UDA_VALUECPO.push(value);
    }
    //Filtering EXCLUDE_UDA_VALUE based on UDA
    if (valEXCLUDE_UDA_VALUECPO.length > 0) {

      valEXCLUDE_UDA_VALUECPO.map((item) => {
        selectedEXCLUDE_UDA_VALUE.push(item.EXCLUDE_UDA_VALUE);
      });
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          EXCLUDE_UDA_VALUE: selectedEXCLUDE_UDA_VALUE,
        };
      });
    } else {
      setSearchDataCPO((prev) => {
        return {
          ...prev,
          EXCLUDE_UDA_VALUE: selectedEXCLUDE_UDA_VALUE,
        };
      });
    }
  }



  ///////////////////////////////////////////
  ///MULTI SELECT CODE FOR WAREHOUSE///
  ////////////////////////////////////

  const selectHIER1CWH = (event, value) => {
    let selectedHIER1 = [];
    if (value.option) {
      valHIER1CWH.push(value.option);
      if (String(value.option.HIER1).includes(inputHIER1CWH)) {
        setInputHIER1CWH("");
      }
      if (String(value.option.HIER1).substring(inputHIER1CWH)) {
        setInputHIER1CWH("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valHIER1CWH.length; i++) {
        if (valHIER1CWH[i]["HIER1"] === value.removedValue.HIER1) {
          index = i;
          break;
        }
      }
      valHIER1CWH.splice(index, 1);
    } else if (value.action === "clear") {
      valHIER1CWH.splice(0, valHIER1CWH.length);
    }
    if (event === 0) {
      valHIER1CWH.push(value)
    }
    if (valHIER1CWH.length > 0 && typeof valHIER1CWH[0]['HIER1'] !== "undefined") {
      valHIER1CWH.map(
        (item) => {
          selectedHIER1.push(item.HIER1);
        }
      )
      setSearchDataCWH((prev) => {
        return {
          ...prev,
          HIER1: selectedHIER1,
        };
      });


      // if (valHIER2CWH.length>0 && valHIER3CWH.length>0){
      //   valPost=[...valHIER1CWH,...valHIER2CWH,...valHIER3CWH]
      //   dispatch(getITEMPARENTRequest(valPost));
      // }
      // else if (valHIER2CWH.length>0){
      //   valPost=[...valHIER1CWH,...valHIER2CWH]
      //   dispatch(getHIER3Request(valPost));
      //   dispatch(getITEMPARENTRequest([{}]));
      // }
      // else if (valHIER3CWH.length>0){
      //   valPost=[...valHIER1CWH,...valHIER3CWH]
      //   dispatch(getITEMPARENTRequest(valPost));
      // }
      // else{
      // valPost=[...valHIER1CWH]
      // dispatch(getHIER3Request(valPost));
      // dispatch(getITEMPARENTRequest(valPost));
      // }
      if (valHIER1CWH.length > 0 || valHIER2CWH.length > 0 || valHIER3CWH.length > 0 || valITEM_PARENTCWH.length > 0 || valPACK_NOCWH.length > 0 || valSKUCWH.length > 0 || valDIFF_IDCWH.length > 0 || valVPNCWH.length > 0 || valUDACWH.length > 0) {
        valPost = [...valHIER1CWH, ...valHIER2CWH, ...valHIER3CWH, ...valITEM_PARENTCWH, ...valPACK_NOCWH, ...valSKUCWH, ...valDIFF_IDCWH, ...valVPNCWH, ...valUDACWH]
        dispatch(getHIER2Request(valPost));
        dispatch(getHIER3Request(valPost));
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
      } else {
        valPost = [...valHIER1CWH]
        dispatch(getHIER3Request(valPost));
        dispatch(getHIER2Request(valPost));
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
      }
      //////console.log("valPosthier1:",valPost)



    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid HIER1"}</p>
        </div>
      )
    } else {
      initialDataPO.HIER1 = "";
      setSearchDataCWH((prev) => {
        return {
          ...prev,
          HIER1: [],
        };
      });
      if (valHIER1CWH.length > 0 || valHIER2CWH.length > 0 || valHIER3CWH.length > 0 || valITEM_PARENTCWH.length > 0 || valPACK_NOCWH.length > 0 || valSKUCWH.length > 0 || valDIFF_IDCWH.length > 0 || valVPNCWH.length > 0 || valUDACWH.length > 0) {
        valPost = [...valHIER1CWH, ...valHIER2CWH, ...valHIER3CWH, ...valITEM_PARENTCWH, ...valPACK_NOCWH, ...valSKUCWH, ...valDIFF_IDCWH, ...valVPNCWH, ...valUDACWH]
        dispatch(getHIER2Request(valPost));
        dispatch(getHIER3Request(valPost));
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
      } else {
        dispatch(getHIER2Request([{}]));
        dispatch(getHIER3Request([{}]));
        dispatch(getITEMPARENTRequest([{}]));
        dispatch(getPACKNORequest([{}]));
        dispatch(getSKURequest([{}]));
        dispatch(getDIFFRequest([{}]));
        dispatch(getVPNRequest([{}]));
        dispatch(getUDARequest([{}]));
      }
    }
  }


  const selectHIER2CWH = (event, value) => {
    let selectedHIER2 = [];
    if (value.option) {
      valHIER2CWH.push(value.option);
      if (String(value.option.HIER2).includes(inputHIER2CWH)) {
        setInputHIER2CWH("");
      }
      if (String(value.option.HIER2).substring(inputHIER2CWH)) {
        setInputHIER2CWH("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valHIER2CWH.length; i++) {
        if (valHIER2CWH[i]["HIER2"] === value.removedValue.HIER2) {
          index = i;
          break;
        }
      }
      valHIER2CWH.splice(index, 1);
    } else if (value.action === "clear") {
      valHIER2CWH.splice(0, valHIER2CWH.length);
    }
    if (event === 0) {
      valHIER2CWH.push(value)
    }
    if (valHIER2CWH.length > 0 && typeof valHIER2CWH[0]['HIER2'] !== "undefined") {
      valHIER2CWH.map(
        (item) => {
          selectedHIER2.push(item.HIER2);
        }
      )
      setSearchDataCWH((prev) => {
        return {
          ...prev,
          HIER2: selectedHIER2,
        };
      });

      // if (valHIER1CWH.length>0 && valHIER3CWH.length>0){
      //   valPost=[...valHIER1CWH,...valHIER2CWH,...valHIER3CWH]
      //   dispatch(getITEMPARENTRequest(valPost));
      // }
      // else if (valHIER3CWH.length>0){
      //   valPost=[...valHIER2CWH,...valHIER3CWH]
      //   dispatch(getITEMPARENTRequest(valPost));
      // }
      // else if (valHIER1CWH.length>0){
      //   valPost=[...valHIER1CWH,...valHIER2CWH]
      //   dispatch(getHIER3Request(valPost));
      //   dispatch(getITEMPARENTRequest(valPost));
      // }else{
      //   valPost=[...valHIER2CWH]
      //   dispatch(getHIER3Request(valPost));
      //   dispatch(getITEMPARENTRequest(valPost));
      // }


      if (valHIER1CWH.length > 0 || valHIER2CWH.length > 0 || valHIER3CWH.length > 0 || valITEM_PARENTCWH.length > 0 || valPACK_NOCWH.length > 0 || valSKUCWH.length > 0 || valDIFF_IDCWH.length > 0 || valVPNCWH.length > 0 || valUDACWH.length > 0) {
        valPost = [...valHIER1CWH, ...valHIER2CWH, ...valHIER3CWH, ...valITEM_PARENTCWH, ...valPACK_NOCWH, ...valSKUCWH, ...valDIFF_IDCWH, ...valVPNCWH, ...valUDACWH]
        dispatch(getHIER3Request(valPost));
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
      } else {
        valPost = [...valHIER2CWH]
        dispatch(getHIER3Request(valPost));
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
      }
      //////console.log("valPost:",valPost)




    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid HIER2"}</p>
        </div>
      )
    } else {
      initialDataPO.HIER2 = "";
      setSearchDataCWH((prev) => {
        return {
          ...prev,
          HIER2: [],
        };
      });
      if (valHIER1CWH.length > 0 || valHIER2CWH.length > 0 || valHIER3CWH.length > 0 || valITEM_PARENTCWH.length > 0 || valPACK_NOCWH.length > 0 || valSKUCWH.length > 0 || valDIFF_IDCWH.length > 0 || valVPNCWH.length > 0 || valUDACWH.length > 0) {
        valPost = [...valHIER1CWH, ...valHIER2CWH, ...valHIER3CWH, ...valITEM_PARENTCWH, ...valPACK_NOCWH, ...valSKUCWH, ...valDIFF_IDCWH, ...valVPNCWH, ...valUDACWH]
        dispatch(getHIER3Request(valPost));
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
      } else {
        dispatch(getHIER3Request([{}]));
        dispatch(getITEMPARENTRequest([{}]));
        dispatch(getPACKNORequest([{}]));
        dispatch(getSKURequest([{}]));
        dispatch(getDIFFRequest([{}]));
        dispatch(getVPNRequest([{}]));
        dispatch(getUDARequest([{}]));
      }
    }
  }


  const selectHIER3CWH = (event, value) => {
    let selectedHIER3 = [];
    if (value.option) {
      valHIER3CWH.push(value.option);
      if (String(value.option.HIER3).includes(inputHIER3CWH)) {
        setInputHIER3CWH("");
      }
      if (String(value.option.HIER3).substring(inputHIER3CWH)) {
        setInputHIER3CWH("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valHIER3CWH.length; i++) {
        if (valHIER3CWH[i]["HIER3"] === value.removedValue.HIER3) {
          index = i;
          break;
        }
      }
      valHIER3CWH.splice(index, 1);
    } else if (value.action === "clear") {
      valHIER3CWH.splice(0, valHIER3CWH.length);
    }
    if (event === 0) {
      valHIER3CWH.push(value)
    }
    if (valHIER3CWH.length > 0 && typeof valHIER3CWH[0]['HIER3'] !== "undefined") {
      valHIER3CWH.map(
        (item) => {
          selectedHIER3.push(item.HIER3);
        }
      )
      setSearchDataCWH((prev) => {
        return {
          ...prev,
          HIER3: selectedHIER3,
        };
      });

      if (valHIER1CWH.length > 0 || valHIER2CWH.length > 0 || valHIER3CWH.length > 0 || valITEM_PARENTCWH.length > 0 || valPACK_NOCWH.length > 0 || valSKUCWH.length > 0 || valDIFF_IDCWH.length > 0 || valVPNCWH.length > 0 || valUDACWH.length > 0) {
        valPost = [...valHIER1CWH, ...valHIER2CWH, ...valHIER3CWH, ...valITEM_PARENTCWH, ...valPACK_NOCWH, ...valSKUCWH, ...valDIFF_IDCWH, ...valVPNCWH, ...valUDACWH]
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
      } else {
        valPost = [...valHIER3CWH]
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
      }

    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid HIER3"}</p>
        </div>
      )
    } else {
      initialDataPO.HIER3 = "";
      setSearchDataCWH((prev) => {
        return {
          ...prev,
          HIER3: [],
        };
      });
      if (valHIER1CWH.length > 0 || valHIER2CWH.length > 0 || valHIER3CWH.length > 0 || valITEM_PARENTCWH.length > 0 || valPACK_NOCWH.length > 0 || valSKUCWH.length > 0 || valDIFF_IDCWH.length > 0 || valVPNCWH.length > 0 || valUDACWH.length > 0) {
        valPost = [...valHIER1CWH, ...valHIER2CWH, ...valHIER3CWH, ...valITEM_PARENTCWH, ...valPACK_NOCWH, ...valSKUCWH, ...valDIFF_IDCWH, ...valVPNCWH, ...valUDACWH]
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
      } else {
        dispatch(getITEMPARENTRequest([{}]));
        dispatch(getPACKNORequest([{}]));
        dispatch(getSKURequest([{}]));
        dispatch(getDIFFRequest([{}]));
        dispatch(getVPNRequest([{}]));
        dispatch(getUDARequest([{}]));
      }
    }
  }


  const selectITEM_PARENTCWH = (event, value) => {
    let selectedITEM_PARENT = [];
    if (value.option) {
      valITEM_PARENTCWH.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputITEM_PARENTCWH("");
      // }
      if (String(value.option.ITEM_PARENT).includes(inputITEM_PARENTCWH)) {
        setInputITEM_PARENTCWH("");
      }
      if (String(value.option.ITEM_PARENT).substring(inputITEM_PARENTCWH)) {
        setInputITEM_PARENTCWH("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valITEM_PARENTCWH.length; i++) {
        if (valITEM_PARENTCWH[i]["ITEM_PARENT"] === value.removedValue.ITEM_PARENT) {
          index = i;
          break;
        }
      }
      valITEM_PARENTCWH.splice(index, 1);
    } else if (value.action === "clear") {
      valITEM_PARENTCWH.splice(0, valITEM_PARENTCWH.length);
    }
    if (event === 0) {
      valITEM_PARENTCWH.push(value)
    }
    if (valITEM_PARENTCWH.length > 0 && typeof valITEM_PARENTCWH[0]['ITEM_PARENT'] !== "undefined") {
      valITEM_PARENTCWH.map(
        (item) => {
          selectedITEM_PARENT.push(item.ITEM_PARENT);
        }
      )
      setSearchDataCWH((prev) => {
        return {
          ...prev,
          ITEM_PARENT: selectedITEM_PARENT,
        };
      });
      if (valHIER1CWH.length > 0 || valHIER2CWH.length > 0 || valHIER3CWH.length > 0 || valITEM_PARENTCWH.length > 0 || valPACK_NOCWH.length > 0 || valSKUCWH.length > 0 || valDIFF_IDCWH.length > 0 || valVPNCWH.length > 0 || valUDACWH.length > 0) {
        valPost = [...valHIER1CWH, ...valHIER2CWH, ...valHIER3CWH, ...valITEM_PARENTCWH, ...valPACK_NOCWH, ...valSKUCWH, ...valDIFF_IDCWH, ...valVPNCWH, ...valUDACWH]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getPACKNORequest(valPost));
      } else {
        valPost = [...valITEM_PARENTCWH]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getPACKNORequest(valPost));
      }

    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid ITEM_PARENT"}</p>
        </div>
      )
    } else {
      initialDataPO.ITEM_PARENT = "";
      setSearchDataCWH((prev) => {
        return {
          ...prev,
          ITEM_PARENT: [],
        };
      });
      if (valHIER1CWH.length > 0 || valHIER2CWH.length > 0 || valHIER3CWH.length > 0 || valITEM_PARENTCWH.length > 0 || valPACK_NOCWH.length > 0 || valSKUCWH.length > 0 || valDIFF_IDCWH.length > 0 || valVPNCWH.length > 0 || valUDACWH.length > 0) {
        valPost = [...valHIER1CWH, ...valHIER2CWH, ...valHIER3CWH, ...valITEM_PARENTCWH, ...valPACK_NOCWH, ...valSKUCWH, ...valDIFF_IDCWH, ...valVPNCWH, ...valUDACWH]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getPACKNORequest(valPost));
      } else {
        dispatch(getDIFFRequest([{}]));
        dispatch(getVPNRequest([{}]));
        dispatch(getUDARequest([{}]));
        dispatch(getPACKNORequest([{}]));
      }
    }
  }


  const selectWHCWH = (event, value) => {
    let selectedWH = [];
    if (value.option) {
      valWHCWH.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputWHCWH("");
      // }
      if (String(value.option.WH).includes(inputWHCWH)) {
        setInputWHCWH("");
      }
      if (String(value.option.WH).substring(inputWHCWH)) {
        setInputWHCWH("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valWHCWH.length; i++) {
        if (valWHCWH[i]["WH"] === value.removedValue.WH) {
          index = i;
          break;
        }
      }
      valWHCWH.splice(index, 1);
    } else if (value.action === "clear") {
      valWHCWH.splice(0, valWHCWH.length);
    }
    if (event === 0) {
      valWHCWH.push(value)
    }
    if (valWHCWH.length > 0 && typeof valWHCWH[0]['WH'] !== "undefined") {
      valWHCWH.map(
        (item) => {
          selectedWH.push(item.WH);
        }
      )
      setSearchDataCWH((prev) => {
        return {
          ...prev,
          WH: selectedWH,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid WH"}</p>
        </div>
      )
    } else {
      initialDataPO.WH = "";
      setSearchDataCWH((prev) => {
        return {
          ...prev,
          WH: [],
        };
      });
    }
  }


  const selectSUPPLIERCWH = (event, value) => {
    let selectedSUPPLIER = [];
    if (value.option) {
      valSUPPLIERCWH.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputWHCWH("");
      // }
      if (String(value.option.SUPPLIER).includes(inputSUPPLIERCWH)) {
        setInputSUPPLIERCWH("");
      }
      if (String(value.option.SUPPLIER).substring(inputSUPPLIERCWH)) {
        setInputSUPPLIERCWH("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valSUPPLIERCWH.length; i++) {
        if (valSUPPLIERCWH[i]["SUPPLIER"] === value.removedValue.SUPPLIER) {
          index = i;
          break;
        }
      }
      valSUPPLIERCWH.splice(index, 1);
    } else if (value.action === "clear") {
      valSUPPLIERCWH.splice(0, valSUPPLIERCWH.length);
    }
    if (event === 0) {
      valSUPPLIERCWH.push(value)
    }
    if (valSUPPLIERCWH.length > 0 && typeof valSUPPLIERCWH[0]['SUPPLIER'] !== "undefined") {
      valSUPPLIERCWH.map(
        (item) => {
          selectedSUPPLIER.push(item.SUPPLIER);
        }
      )
      setSearchDataCWH((prev) => {
        return {
          ...prev,
          SUPPLIER: selectedSUPPLIER,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid SUPPLIER"}</p>
        </div>
      )
    } else {
      initialDataPO.SUPPLIER = "";
      setSearchDataCWH((prev) => {
        return {
          ...prev,
          SUPPLIER: [],
        };
      });
    }
  }


  const selectSUPPLIER_SITECWH = (event, value) => {
    let selectedSUPPLIER_SITE = [];
    if (value.option) {
      valSUPPLIER_SITECWH.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputWHCWH("");
      // }
      if (String(value.option.SUPPLIER_SITE).includes(inputSUPPLIER_SITECWH)) {
        setInputSUPPLIER_SITECWH("");
      }
      if (String(value.option.SUPPLIER_SITE).substring(inputSUPPLIER_SITECWH)) {
        setInputSUPPLIER_SITECWH("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valSUPPLIER_SITECWH.length; i++) {
        if (valSUPPLIER_SITECWH[i]["SUPPLIER_SITE"] === value.removedValue.SUPPLIER_SITE) {
          index = i;
          break;
        }
      }
      valSUPPLIER_SITECWH.splice(index, 1);
    } else if (value.action === "clear") {
      valSUPPLIER_SITECWH.splice(0, valSUPPLIER_SITECWH.length);
    }
    if (event === 0) {
      valSUPPLIER_SITECWH.push(value)
    }
    if (valSUPPLIER_SITECWH.length > 0 && typeof valSUPPLIER_SITECWH[0]['SUPPLIER_SITE'] !== "undefined") {
      valSUPPLIER_SITECWH.map(
        (item) => {
          selectedSUPPLIER_SITE.push(item.SUPPLIER_SITE);
        }
      )
      setSearchDataCWH((prev) => {
        return {
          ...prev,
          SUPPLIER_SITE: selectedSUPPLIER_SITE,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid SUPPLIER_SITE"}</p>
        </div>
      )
    } else {
      initialDataPO.SUPPLIER_SITE = "";
      setSearchDataCWH((prev) => {
        return {
          ...prev,
          SUPPLIER_SITE: [],
        };
      });
    }
  }


  const selectPACK_NOCWH = (event, value) => {
    let selectedPACK_NO = [];
    // ////console.log("selectPACK_NOCWHvalue.option:",String(value.option.PACK_NO).includes(inputPACK_NOCWH))
    if (value.option) {
      valPACK_NOCWH.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputWHCWH("");
      // }
      if (String(value.option.PACK_NO).includes(inputPACK_NOCWH)) {
        setInputPACK_NOCWH("");
      }
      if (String(value.option.PACK_NO).substring(inputPACK_NOCWH)) {
        setInputPACK_NOCWH("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valPACK_NOCWH.length; i++) {
        if (valPACK_NOCWH[i]["PACK_NO"] === value.removedValue.PACK_NO) {
          index = i;
          break;
        }
      }
      valPACK_NOCWH.splice(index, 1);
    } else if (value.action === "clear") {
      valPACK_NOCWH.splice(0, valPACK_NOCWH.length);
    }
    if (event === 0) {
      valPACK_NOCWH.push(value)
    }
    if (valPACK_NOCWH.length > 0 && typeof valPACK_NOCWH[0]['PACK_NO'] !== "undefined") {
      valPACK_NOCWH.map(
        (item) => {
          selectedPACK_NO.push(item.PACK_NO);
        }
      )
      setSearchDataCWH((prev) => {
        return {
          ...prev,
          PACK_NO: selectedPACK_NO,
        };
      });
      if (valHIER1CWH.length > 0 || valHIER2CWH.length > 0 || valHIER3CWH.length > 0 || valITEM_PARENTCWH.length > 0 || valPACK_NOCWH.length > 0 || valSKUCWH.length > 0 || valDIFF_IDCWH.length > 0 || valVPNCWH.length > 0 || valUDACWH.length > 0) {
        valPost = [...valHIER1CWH, ...valHIER2CWH, ...valHIER3CWH, ...valITEM_PARENTCWH, ...valPACK_NOCWH, ...valSKUCWH, ...valDIFF_IDCWH, ...valVPNCWH, ...valUDACWH]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
      } else {
        valPost = [...valPACK_NOCWH]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
      }

    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid PACK_NO"}</p>
        </div>
      )
    } else {
      initialDataPO.PACK_NO = "";
      setSearchDataCWH((prev) => {
        return {
          ...prev,
          PACK_NO: [],
        };
      });
      if (valHIER1CWH.length > 0 || valHIER2CWH.length > 0 || valHIER3CWH.length > 0 || valITEM_PARENTCWH.length > 0 || valPACK_NOCWH.length > 0 || valSKUCWH.length > 0 || valDIFF_IDCWH.length > 0 || valVPNCWH.length > 0 || valUDACWH.length > 0) {
        valPost = [...valHIER1CWH, ...valHIER2CWH, ...valHIER3CWH, ...valITEM_PARENTCWH, ...valPACK_NOCWH, ...valSKUCWH, ...valDIFF_IDCWH, ...valVPNCWH, ...valUDACWH]
        // //////console.log("valPost:111234",valPost)
        // //////console.log("diffData.length > 0 ? diffData : []",diffData.length > 0 ? diffData : [])
        // if (valPost){
        //   //////console.log("valPost:33333",valPost)
        //   var check=false
        //   // valPost.map(object => {delete object["DIFF_ID"];});
        //   // valPost.map(obj=>{if((Object.keys(obj))){
        //   //   //////console.log("valPost:1234444",obj)
        //   // }})
        //   // const filteredvalPost = valPost.splice(valPost.findIndex((item) => Object.keys(item)!=="DIFF_ID"),1)
        //   valPost.filter((obj) =>delete obj.DIFF_ID)
        //   // var newArray = valPost.filter(value => Object.keys(value).length !== 0);


        //   // array.filter(value => Object.keys(value).length !== 0);
        //   //////console.log("value123456::",valPost.findIndex((item) => Object.keys(item)!=="DIFF_ID"))
        //   //////console.log("valPost:5555",check,Object.keys(valPost[0]).length,"  valPost ","filteredvalPost::::")
        //   // for 
        //   if (Object.keys(valPost[0]).length>0){
        //     //////console.log("deelete",valPost)
        //     dispatch(getDIFFRequest(valPost));

        //   }else{
        //     //////console.log("apply")
        //     setDIffData(postval1)
        //     dispatch(getDIFFRequest([{}]));
        //   }
        // }
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
      } else {
        dispatch(getDIFFRequest([{}]));
        dispatch(getVPNRequest([{}]));
        dispatch(getUDARequest([{}]));
      }
    }
  }


  const selectDIFF_IDCWH = (event, value) => {
    let selectedDIFF_ID = [];
    // ////console.log("value.option:",value.option.DIFF_ID,String(value.option[(Object.keys(value.option))[0]]).includes(inputDIFF_IDCWH),String(value.option.DIFF_ID),inputDIFF_IDCWH)
    if (value.option) {
      valDIFF_IDCWH.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputWHCWH("");
      // }
      if (String(value.option.DIFF_ID).substring(inputDIFF_IDCWH)) {
        setInputDIFF_IDCWH("");
      }
      if (String(value.option.DIFF_ID).includes(inputDIFF_IDCWH)) {
        setInputDIFF_IDCWH("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valDIFF_IDCWH.length; i++) {
        if (valDIFF_IDCWH[i]["DIFF_ID"] === value.removedValue.DIFF_ID) {
          index = i;
          break;
        }
      }
      valDIFF_IDCWH.splice(index, 1);
    } else if (value.action === "clear") {
      valDIFF_IDCWH.splice(0, valDIFF_IDCWH.length);
    }
    if (event === 0) {
      valDIFF_IDCWH.push(value)
    }
    if (valDIFF_IDCWH.length > 0 && typeof valDIFF_IDCWH[0]['DIFF_ID'] !== "undefined") {
      valDIFF_IDCWH.map(
        (item) => {
          selectedDIFF_ID.push(item.DIFF_ID);
        }
      )
      setSearchDataCWH((prev) => {
        return {
          ...prev,
          DIFF_ID: selectedDIFF_ID,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid DIFF_ID"}</p>
        </div>
      )
    } else {
      initialDataPO.DIFF_ID = "";
      setSearchDataCWH((prev) => {
        return {
          ...prev,
          DIFF_ID: [],
        };
      });
    }
  }


  const selectSKUCWH = (event, value) => {
    let selectedSKU = [];
    if (value.option) {
      valSKUCWH.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputWHCWH("");
      // }
      if (String(value.option.SKU).includes(inputSKUCWH)) {
        setInputSKUCWH("");
      }
      if (String(value.option.SKU).substring(inputSKUCWH)) {
        setInputSKUCWH("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valSKUCWH.length; i++) {
        if (valSKUCWH[i]["SKU"] === value.removedValue.SKU) {
          index = i;
          break;
        }
      }
      valSKUCWH.splice(index, 1);
    } else if (value.action === "clear") {
      valSKUCWH.splice(0, valSKUCWH.length);
    }
    if (event === 0) {
      valSKUCWH.push(value)
    }
    if (valSKUCWH.length > 0 && typeof valSKUCWH[0]['SKU'] !== "undefined") {
      valSKUCWH.map(
        (item) => {
          selectedSKU.push(item.SKU);
        }
      )
      setSearchDataCWH((prev) => {
        return {
          ...prev,
          SKU: selectedSKU,
        };
      });
      if (valHIER1CWH.length > 0 || valHIER2CWH.length > 0 || valHIER3CWH.length > 0 || valITEM_PARENTCWH.length > 0 || valPACK_NOCWH.length > 0 || valSKUCWH.length > 0 || valDIFF_IDCWH.length > 0 || valVPNCWH.length > 0 || valUDACWH.length > 0) {
        valPost = [...valHIER1CWH, ...valHIER2CWH, ...valHIER3CWH, ...valITEM_PARENTCWH, ...valPACK_NOCWH, ...valSKUCWH, ...valDIFF_IDCWH, ...valVPNCWH, ...valUDACWH]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
      } else {
        valPost = [...valSKUCWH]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
      }
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid SKU"}</p>
        </div>
      )
    } else {
      initialDataPO.SKU = "";
      setSearchDataCWH((prev) => {
        return {
          ...prev,
          SKU: [],
        };
      });
      if (valHIER1CWH.length > 0 || valHIER2CWH.length > 0 || valHIER3CWH.length > 0 || valITEM_PARENTCWH.length > 0 || valPACK_NOCWH.length > 0 || valSKUCWH.length > 0 || valDIFF_IDCWH.length > 0 || valVPNCWH.length > 0 || valUDACWH.length > 0) {
        valPost = [...valHIER1CWH, ...valHIER2CWH, ...valHIER3CWH, ...valITEM_PARENTCWH, ...valPACK_NOCWH, ...valSKUCWH, ...valDIFF_IDCWH, ...valVPNCWH, ...valUDACWH]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
      } else {
        dispatch(getDIFFRequest([{}]));
        dispatch(getVPNRequest([{}]));
        dispatch(getUDARequest([{}]));
      }
    }
  }


  const selectITEM_LIST_NOCWH = (event, value) => {
    let selectedITEM_LIST_NO = [];
    if (value.option) {
      valITEM_LIST_NOCWH.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputWHCWH("");
      // }
      if (String(value.option.ITEM_LIST_NO).includes(inputITEM_LIST_NOCWH)) {
        setInputITEM_LIST_NOCWH("");
      }
      if (String(value.option.ITEM_LIST_NO).substring(inputITEM_LIST_NOCWH)) {
        setInputITEM_LIST_NOCWH("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valITEM_LIST_NOCWH.length; i++) {
        if (valITEM_LIST_NOCWH[i]["ITEM_LIST_NO"] === value.removedValue.ITEM_LIST_NO) {
          index = i;
          break;
        }
      }
      valITEM_LIST_NOCWH.splice(index, 1);
    } else if (value.action === "clear") {
      valITEM_LIST_NOCWH.splice(0, valITEM_LIST_NOCWH.length);
    }
    if (event === 0) {
      valITEM_LIST_NOCWH.push(value)
    }
    if (valITEM_LIST_NOCWH.length > 0 && typeof valITEM_LIST_NOCWH[0]['ITEM_LIST_NO'] !== "undefined") {
      valITEM_LIST_NOCWH.map(
        (item) => {
          selectedITEM_LIST_NO.push(item.ITEM_LIST_NO);
        }
      )
      setSearchDataCWH((prev) => {
        return {
          ...prev,
          ITEM_LIST_NO: selectedITEM_LIST_NO,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid ITEM_LIST_NO"}</p>
        </div>
      )
    } else {
      initialDataPO.ITEM_LIST_NO = "";
      setSearchDataCWH((prev) => {
        return {
          ...prev,
          ITEM_LIST_NO: [],
        };
      });
    }
  }


  const selectVPNCWH = (event, value) => {
    let selectedVPN = [];
    if (value.option) {
      valVPNCWH.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputWHCWH("");
      // }
      if (String(value.option.VPN).substring(inputVPNCWH)) {
        setInputVPNCWH("");
      }
      if (String(value.option.VPN).includes(inputVPNCWH)) {
        setInputVPNCWH("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valVPNCWH.length; i++) {
        if (valVPNCWH[i]["VPN"] === value.removedValue.VPN) {
          index = i;
          break;
        }
      }
      valVPNCWH.splice(index, 1);
    } else if (value.action === "clear") {
      valVPNCWH.splice(0, valVPNCWH.length);
    }
    if (event === 0) {
      valVPNCWH.push(value)
    }
    if (valVPNCWH.length > 0 && typeof valVPNCWH[0]['VPN'] !== "undefined") {
      valVPNCWH.map(
        (item) => {
          selectedVPN.push(item.VPN);
        }
      )
      setSearchDataCWH((prev) => {
        return {
          ...prev,
          VPN: selectedVPN,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid VPN"}</p>
        </div>
      )
    } else {
      initialDataPO.VPN = "";
      setSearchDataCWH((prev) => {
        return {
          ...prev,
          VPN: [],
        };
      });
    }
  }


  const selectUDACWH = (e, value) => {
    if (e === "Filter") {
      valUDACWH.splice(0, valUDACWH.length);
      valUDACWH.push(...value);
    }

    let selectedUDA = [];
    if (value.option) {
      valUDACWH.push(value.option)
      if (String(value.option.UDA).includes(inputUDACWH)) {
        setInputUDACWH("");
      }
      if (String(value.option.UDA).substring(inputUDACWH)) {
        setInputUDACWH("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valUDACWH.length; i++) {
        if (valUDACWH[i]["UDA"] === value.removedValue.UDA) {
          index = i;
          break;
        }
      }
      valUDACWH.splice(index, 1);

    } else if (value.action === "clear") {
      valUDACWH.splice(0, valUDACWH.length);
      valUDA_VALUECWH.splice(0, valUDA_VALUECWH.length);
      setSearchDataCWH((prev) => {
        return {
          ...prev,
          UDA_VALUE: [],
        };

      });
    }
    //manual input handle input and filter itemdata
    if (e === 0) {
      valUDACWH.push(value)
    }
    //Filtering UDA_VALUE based on UDA
    if (valUDACWH.length > 0) {
      //////console.log("valUDACWH",valUDACWH)
      const filterUDAValueCWH = udaData.filter((item) => {
        return (valUDACWH).some((val) => {
          return item.UDA === val.UDA;
        });
      });
      //////console.log("filterUDAValueCWH",filterUDAValueCWH)
      setFilterUDAValueCWH(filterUDAValueCWH);
      valUDACWH.map((item) => {
        selectedUDA.push(item.UDA);
      });
      if (e !== "Filter") {
        setSearchDataCWH((prev) => {
          return {
            ...prev,
            UDA: selectedUDA,
          };
        });
      }
      var filter_rem1 = selectedUDA.filter(function (i) {
        return this.indexOf(i) < 0;
      },
        searchDataCWH.UDA)

      var filter_rem2 = searchDataCWH.UDA.filter(function (i) {
        return this.indexOf(i) < 0;
      },
        selectedUDA)
      //////////console.log("wew",elmts)
      if (filter_rem1.length > 0 || filter_rem2.length > 0) {
        var temp = [];
        filter_rem1.length > 0 ? temp = [...filter_rem1] : temp = [...filter_rem2]
        ////////console.log("wew",temp)
        for (var i = 0; i < temp.length; i++) {////////console.log("Afvsd")
          const index = searchDataCWH.UDA.indexOf(temp[i]);
          if (index > -1) {
            searchDataCWH.UDA.splice(index, 1);
          }
          ////////console.log("searchDataCWH.UDA",searchDataCWH.UDA)
        }
      }
    } else {
      setFilterUDAValueCWH([]);
      setSearchDataCWH((prev) => {
        return {
          ...prev,
          UDA: []
        };
      });
    }
  }


  const selectUDA_VALUECWH = (e, value) => {
    let selectedUDA_VALUE = [];
    if (value.option) {
      valUDA_VALUECWH.push(value.option)
      if (String(value.option.UDA_VALUE).includes(inputUDA_VALUECWH)) {
        setInputUDA_VALUECWH("");
      }
      if (String(value.option.UDA_VALUE).substring(inputUDA_VALUECWH)) {
        setInputUDA_VALUECWH("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valUDA_VALUECWH.length; i++) {
        if (valUDA_VALUECWH[i]["UDA_VALUE"] === value.removedValue.UDA_VALUE) {
          index = i;
          break;
        }
      }
      valUDA_VALUECWH.splice(index, 1);

    } else if (value.action === "clear") {
      valUDA_VALUECWH.splice(0, valUDA_VALUECWH.length);
    }
    //manual input handle input and filter itemdata
    if (e === 0) {
      valUDA_VALUECWH.push(value);
    }
    //Filtering UDA_VALUE based on UDA
    if (valUDA_VALUECWH.length > 0) {

      valUDA_VALUECWH.map((item) => {
        selectedUDA_VALUE.push(item.UDA_VALUE);
      });
      setSearchDataCWH((prev) => {
        return {
          ...prev,
          UDA_VALUE: selectedUDA_VALUE,
        };
      });
    } else {
      setSearchDataCWH((prev) => {
        return {
          ...prev,
          UDA_VALUE: selectedUDA_VALUE,
        };
      });
    }
  }


  const selectEXCLUDE_UDACWH = (e, value) => {
    if (e === "Filter") {
      valEXCLUDE_UDACWH.splice(0, valEXCLUDE_UDACWH.length);
      valEXCLUDE_UDACWH.push(...value);
    }

    let selectedEXCLUDE_UDA = [];
    if (value.option) {
      valEXCLUDE_UDACWH.push(value.option)
      if (String(value.option.EXCLUDE_UDA).includes(inputEXCLUDE_UDACWH)) {
        setInputEXCLUDE_UDACWH("");
      }
      if (String(value.option.EXCLUDE_UDA).substring(inputEXCLUDE_UDACWH)) {
        setInputEXCLUDE_UDACWH("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valEXCLUDE_UDACWH.length; i++) {
        if (valEXCLUDE_UDACWH[i]["EXCLUDE_UDA"] === value.removedValue.EXCLUDE_UDA) {
          index = i;
          break;
        }
      }
      valEXCLUDE_UDACWH.splice(index, 1);

    } else if (value.action === "clear") {
      valEXCLUDE_UDACWH.splice(0, valEXCLUDE_UDACWH.length);
      valEXCLUDE_UDA_VALUECWH.splice(0, valEXCLUDE_UDA_VALUECWH.length);
      setSearchDataCWH((prev) => {
        return {
          ...prev,
          EXCLUDE_UDA_VALUE: [],
        };

      });
    }
    //manual input handle input and filter itemdata
    if (e === 0) {
      valEXCLUDE_UDACWH.push(value)
    }
    //Filtering EXCLUDE_UDA_VALUE based on EXCLUDE_UDA
    if (valEXCLUDE_UDACWH.length > 0) {
      //////console.log("valEXCLUDE_UDACWH",valEXCLUDE_UDACWH)
      const filterEXCLUDE_UDAValueCWH = excludeUdaData.filter((item) => {
        return (valEXCLUDE_UDACWH).some((val) => {
          return item.EXCLUDE_UDA === val.EXCLUDE_UDA;
        });
      });
      //////console.log("filterEXCLUDE_UDAValueCWH",filterEXCLUDE_UDAValueCWH)
      setFilterEXCLUDE_UDAValueCWH(filterEXCLUDE_UDAValueCWH);
      valEXCLUDE_UDACWH.map((item) => {
        selectedEXCLUDE_UDA.push(item.EXCLUDE_UDA);
      });
      if (e !== "Filter") {
        setSearchDataCWH((prev) => {
          return {
            ...prev,
            EXCLUDE_UDA: selectedEXCLUDE_UDA,
          };
        });
      }
      var filter_rem1 = selectedEXCLUDE_UDA.filter(function (i) {
        return this.indexOf(i) < 0;
      },
        searchDataCWH.EXCLUDE_UDA)

      var filter_rem2 = searchDataCWH.EXCLUDE_UDA.filter(function (i) {
        return this.indexOf(i) < 0;
      },
        selectedEXCLUDE_UDA)
      //////////console.log("wew",elmts)
      if (filter_rem1.length > 0 || filter_rem2.length > 0) {
        var temp = [];
        filter_rem1.length > 0 ? temp = [...filter_rem1] : temp = [...filter_rem2]
        ////////console.log("wew",temp)
        for (var i = 0; i < temp.length; i++) {////////console.log("Afvsd")
          const index = searchDataCWH.EXCLUDE_UDA.indexOf(temp[i]);
          if (index > -1) {
            searchDataCWH.EXCLUDE_UDA.splice(index, 1);
          }
          ////////console.log("searchDataCWH.EXCLUDE_UDA",searchDataCWH.EXCLUDE_UDA)
        }
      }
    } else {
      setFilterEXCLUDE_UDAValueCWH([]);
      setSearchDataCWH((prev) => {
        return {
          ...prev,
          EXCLUDE_UDA: []
        };
      });
    }
  }


  const selectEXCLUDE_UDA_VALUECWH = (e, value) => {
    let selectedEXCLUDE_UDA_VALUE = [];
    if (value.option) {
      valEXCLUDE_UDA_VALUECWH.push(value.option)
      if (String(value.option.EXCLUDE_UDA_VALUE).includes(inputEXCLUDE_UDA_VALUECWH)) {
        setInputEXCLUDE_UDA_VALUECWH("");
      }
      if (String(value.option.EXCLUDE_UDA_VALUE).substring(inputEXCLUDE_UDA_VALUECWH)) {
        setInputEXCLUDE_UDA_VALUECWH("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valEXCLUDE_UDA_VALUECWH.length; i++) {
        if (valEXCLUDE_UDA_VALUECWH[i]["EXCLUDE_UDA_VALUE"] === value.removedValue.EXCLUDE_UDA_VALUE) {
          index = i;
          break;
        }
      }
      valEXCLUDE_UDA_VALUECWH.splice(index, 1);

    } else if (value.action === "clear") {
      valEXCLUDE_UDA_VALUECWH.splice(0, valEXCLUDE_UDA_VALUECWH.length);
    }
    //manual input handle input and filter itemdata
    if (e === 0) {
      valEXCLUDE_UDA_VALUECWH.push(value);
    }

    //Filtering EXCLUDE_UDA_VALUE based on UDA
    if (valEXCLUDE_UDA_VALUECWH.length > 0) {

      valEXCLUDE_UDA_VALUECWH.map((item) => {
        selectedEXCLUDE_UDA_VALUE.push(item.EXCLUDE_UDA_VALUE);
      });
      setSearchDataCWH((prev) => {
        return {
          ...prev,
          EXCLUDE_UDA_VALUE: selectedEXCLUDE_UDA_VALUE,
        };
      });
    } else {
      setSearchDataCWH((prev) => {
        return {
          ...prev,
          EXCLUDE_UDA_VALUE: selectedEXCLUDE_UDA_VALUE,
        };
      });
    }
  }

  ///////////////////////////////////////////
  ///MULTI SELECT CODE FOR WAREHOUSE///
  ////////////////////////////////////

  const selectHIER1CASN = (event, value) => {
    let selectedHIER1 = [];
    if (value.option) {
      valHIER1CASN.push(value.option);
      if (String(value.option.HIER1).includes(inputHIER1CASN)) {
        setInputHIER1CASN("");
      }
      if (String(value.option.HIER1).substring(inputHIER1CASN)) {
        setInputHIER1CASN("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valHIER1CASN.length; i++) {
        if (valHIER1CASN[i]["HIER1"] === value.removedValue.HIER1) {
          index = i;
          break;
        }
      }
      valHIER1CASN.splice(index, 1);
    } else if (value.action === "clear") {
      valHIER1CASN.splice(0, valHIER1CASN.length);
    }
    if (event === 0) {
      valHIER1CASN.push(value)
    }
    if (valHIER1CASN.length > 0 && typeof valHIER1CASN[0]['HIER1'] !== "undefined") {
      valHIER1CASN.map(
        (item) => {
          selectedHIER1.push(item.HIER1);
        }
      )
      setSearchDataCASN((prev) => {
        return {
          ...prev,
          HIER1: selectedHIER1,
        };
      });


      // if (valHIER2CASN.length>0 && valHIER3CASN.length>0){
      //   valPost=[...valHIER1CASN,...valHIER2CASN,...valHIER3CASN]
      //   dispatch(getITEMPARENTRequest(valPost));
      // }
      // else if (valHIER2CASN.length>0){
      //   valPost=[...valHIER1CASN,...valHIER2CASN]
      //   dispatch(getHIER3Request(valPost));
      //   dispatch(getITEMPARENTRequest([{}]));
      // }
      // else if (valHIER3CASN.length>0){
      //   valPost=[...valHIER1CASN,...valHIER3CASN]
      //   dispatch(getITEMPARENTRequest(valPost));
      // }
      // else{
      // valPost=[...valHIER1CASN]
      // dispatch(getHIER3Request(valPost));
      // dispatch(getITEMPARENTRequest(valPost));
      // }
      if (valHIER1CASN.length > 0 || valHIER2CASN.length > 0 || valHIER3CASN.length > 0 || valITEM_PARENTCASN.length > 0 || valPACK_NOCASN.length > 0 || valSKUCASN.length > 0 || valDIFF_IDCASN.length > 0 || valVPNCASN.length > 0 || valUDACASN.length > 0) {
        valPost = [...valHIER1CASN, ...valHIER2CASN, ...valHIER3CASN, ...valITEM_PARENTCASN, ...valPACK_NOCASN, ...valSKUCASN, ...valDIFF_IDCASN, ...valVPNCASN, ...valUDACASN]
        dispatch(getHIER2Request(valPost));
        dispatch(getHIER3Request(valPost));
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getASNRequest(valPost));
      } else {
        valPost = [...valHIER1CASN]
        dispatch(getHIER3Request(valPost));
        dispatch(getHIER2Request(valPost));
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getASNRequest(valPost));
      }
      //////console.log("valPosthier1:",valPost)



    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid HIER1"}</p>
        </div>
      )
    } else {
      initialDataPO.HIER1 = "";
      setSearchDataCASN((prev) => {
        return {
          ...prev,
          HIER1: [],
        };
      });
      if (valHIER1CASN.length > 0 || valHIER2CASN.length > 0 || valHIER3CASN.length > 0 || valITEM_PARENTCASN.length > 0 || valPACK_NOCASN.length > 0 || valSKUCASN.length > 0 || valDIFF_IDCASN.length > 0 || valVPNCASN.length > 0 || valUDACASN.length > 0) {
        valPost = [...valHIER1CASN, ...valHIER2CASN, ...valHIER3CASN, ...valITEM_PARENTCASN, ...valPACK_NOCASN, ...valSKUCASN, ...valDIFF_IDCASN, ...valVPNCASN, ...valUDACASN]
        dispatch(getHIER2Request(valPost));
        dispatch(getHIER3Request(valPost));
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getASNRequest(valPost));
      } else {
        dispatch(getHIER2Request([{}]));
        dispatch(getHIER3Request([{}]));
        dispatch(getITEMPARENTRequest([{}]));
        dispatch(getPACKNORequest([{}]));
        dispatch(getSKURequest([{}]));
        dispatch(getDIFFRequest([{}]));
        dispatch(getVPNRequest([{}]));
        dispatch(getUDARequest([{}]));
        dispatch(getASNRequest([{}]));
      }
    }
  }


  const selectHIER2CASN = (event, value) => {
    let selectedHIER2 = [];
    if (value.option) {
      valHIER2CASN.push(value.option);
      if (String(value.option.HIER2).includes(inputHIER2CASN)) {
        setInputHIER2CASN("");
      }
      if (String(value.option.HIER2).substring(inputHIER2CASN)) {
        setInputHIER2CASN("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valHIER2CASN.length; i++) {
        if (valHIER2CASN[i]["HIER2"] === value.removedValue.HIER2) {
          index = i;
          break;
        }
      }
      valHIER2CASN.splice(index, 1);
    } else if (value.action === "clear") {
      valHIER2CASN.splice(0, valHIER2CASN.length);
    }
    if (event === 0) {
      valHIER2CASN.push(value)
    }
    if (valHIER2CASN.length > 0 && typeof valHIER2CASN[0]['HIER2'] !== "undefined") {
      valHIER2CASN.map(
        (item) => {
          selectedHIER2.push(item.HIER2);
        }
      )
      setSearchDataCASN((prev) => {
        return {
          ...prev,
          HIER2: selectedHIER2,
        };
      });

      // if (valHIER1CASN.length>0 && valHIER3CASN.length>0){
      //   valPost=[...valHIER1CASN,...valHIER2CASN,...valHIER3CASN]
      //   dispatch(getITEMPARENTRequest(valPost));
      // }
      // else if (valHIER3CASN.length>0){
      //   valPost=[...valHIER2CASN,...valHIER3CASN]
      //   dispatch(getITEMPARENTRequest(valPost));
      // }
      // else if (valHIER1CASN.length>0){
      //   valPost=[...valHIER1CASN,...valHIER2CASN]
      //   dispatch(getHIER3Request(valPost));
      //   dispatch(getITEMPARENTRequest(valPost));
      // }else{
      //   valPost=[...valHIER2CASN]
      //   dispatch(getHIER3Request(valPost));
      //   dispatch(getITEMPARENTRequest(valPost));
      // }


      if (valHIER1CASN.length > 0 || valHIER2CASN.length > 0 || valHIER3CASN.length > 0 || valITEM_PARENTCASN.length > 0 || valPACK_NOCASN.length > 0 || valSKUCASN.length > 0 || valDIFF_IDCASN.length > 0 || valVPNCASN.length > 0 || valUDACASN.length > 0) {
        valPost = [...valHIER1CASN, ...valHIER2CASN, ...valHIER3CASN, ...valITEM_PARENTCASN, ...valPACK_NOCASN, ...valSKUCASN, ...valDIFF_IDCASN, ...valVPNCASN, ...valUDACASN]
        dispatch(getHIER3Request(valPost));
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getASNRequest(valPost));
      } else {
        valPost = [...valHIER2CASN]
        dispatch(getHIER3Request(valPost));
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getASNRequest(valPost));
      }
      //////console.log("valPost:",valPost)




    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid HIER2"}</p>
        </div>
      )
    } else {
      initialDataPO.HIER2 = "";
      setSearchDataCASN((prev) => {
        return {
          ...prev,
          HIER2: [],
        };
      });
      if (valHIER1CASN.length > 0 || valHIER2CASN.length > 0 || valHIER3CASN.length > 0 || valITEM_PARENTCASN.length > 0 || valPACK_NOCASN.length > 0 || valSKUCASN.length > 0 || valDIFF_IDCASN.length > 0 || valVPNCASN.length > 0 || valUDACASN.length > 0) {
        valPost = [...valHIER1CASN, ...valHIER2CASN, ...valHIER3CASN, ...valITEM_PARENTCASN, ...valPACK_NOCASN, ...valSKUCASN, ...valDIFF_IDCASN, ...valVPNCASN, ...valUDACASN]
        dispatch(getHIER3Request(valPost));
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getASNRequest(valPost));
      } else {
        dispatch(getHIER3Request([{}]));
        dispatch(getITEMPARENTRequest([{}]));
        dispatch(getPACKNORequest([{}]));
        dispatch(getSKURequest([{}]));
        dispatch(getDIFFRequest([{}]));
        dispatch(getVPNRequest([{}]));
        dispatch(getUDARequest([{}]));
        dispatch(getASNRequest([{}]));
      }
    }
  }


  const selectHIER3CASN = (event, value) => {
    let selectedHIER3 = [];
    if (value.option) {
      valHIER3CASN.push(value.option);
      if (String(value.option.HIER3).includes(inputHIER3CASN)) {
        setInputHIER3CASN("");
      }
      if (String(value.option.HIER3).substring(inputHIER3CASN)) {
        setInputHIER3CASN("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valHIER3CASN.length; i++) {
        if (valHIER3CASN[i]["HIER3"] === value.removedValue.HIER3) {
          index = i;
          break;
        }
      }
      valHIER3CASN.splice(index, 1);
    } else if (value.action === "clear") {
      valHIER3CASN.splice(0, valHIER3CASN.length);
    }
    if (event === 0) {
      valHIER3CASN.push(value)
    }
    if (valHIER3CASN.length > 0 && typeof valHIER3CASN[0]['HIER3'] !== "undefined") {
      valHIER3CASN.map(
        (item) => {
          selectedHIER3.push(item.HIER3);
        }
      )
      setSearchDataCASN((prev) => {
        return {
          ...prev,
          HIER3: selectedHIER3,
        };
      });

      if (valHIER1CASN.length > 0 || valHIER2CASN.length > 0 || valHIER3CASN.length > 0 || valITEM_PARENTCASN.length > 0 || valPACK_NOCASN.length > 0 || valSKUCASN.length > 0 || valDIFF_IDCASN.length > 0 || valVPNCASN.length > 0 || valUDACASN.length > 0) {
        valPost = [...valHIER1CASN, ...valHIER2CASN, ...valHIER3CASN, ...valITEM_PARENTCASN, ...valPACK_NOCASN, ...valSKUCASN, ...valDIFF_IDCASN, ...valVPNCASN, ...valUDACASN]
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getASNRequest(valPost));
      } else {
        valPost = [...valHIER3CASN]
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getASNRequest(valPost));
      }

    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid HIER3"}</p>
        </div>
      )
    } else {
      initialDataPO.HIER3 = "";
      setSearchDataCASN((prev) => {
        return {
          ...prev,
          HIER3: [],
        };
      });
      if (valHIER1CASN.length > 0 || valHIER2CASN.length > 0 || valHIER3CASN.length > 0 || valITEM_PARENTCASN.length > 0 || valPACK_NOCASN.length > 0 || valSKUCASN.length > 0 || valDIFF_IDCASN.length > 0 || valVPNCASN.length > 0 || valUDACASN.length > 0) {
        valPost = [...valHIER1CASN, ...valHIER2CASN, ...valHIER3CASN, ...valITEM_PARENTCASN, ...valPACK_NOCASN, ...valSKUCASN, ...valDIFF_IDCASN, ...valVPNCASN, ...valUDACASN]
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getASNRequest(valPost));
      } else {
        dispatch(getITEMPARENTRequest([{}]));
        dispatch(getPACKNORequest([{}]));
        dispatch(getSKURequest([{}]));
        dispatch(getDIFFRequest([{}]));
        dispatch(getVPNRequest([{}]));
        dispatch(getUDARequest([{}]));
        dispatch(getASNRequest([{}]));
      }
    }
  }


  const selectITEM_PARENTCASN = (event, value) => {
    let selectedITEM_PARENT = [];
    if (value.option) {
      valITEM_PARENTCASN.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputITEM_PARENTCASN("");
      // }
      if (String(value.option.ITEM_PARENT).includes(inputITEM_PARENTCASN)) {
        setInputITEM_PARENTCASN("");
      }
      if (String(value.option.ITEM_PARENT).substring(inputITEM_PARENTCASN)) {
        setInputITEM_PARENTCASN("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valITEM_PARENTCASN.length; i++) {
        if (valITEM_PARENTCASN[i]["ITEM_PARENT"] === value.removedValue.ITEM_PARENT) {
          index = i;
          break;
        }
      }
      valITEM_PARENTCASN.splice(index, 1);
    } else if (value.action === "clear") {
      valITEM_PARENTCASN.splice(0, valITEM_PARENTCASN.length);
    }
    if (event === 0) {
      valITEM_PARENTCASN.push(value)
    }
    if (valITEM_PARENTCASN.length > 0 && typeof valITEM_PARENTCASN[0]['ITEM_PARENT'] !== "undefined") {
      valITEM_PARENTCASN.map(
        (item) => {
          selectedITEM_PARENT.push(item.ITEM_PARENT);
        }
      )
      setSearchDataCASN((prev) => {
        return {
          ...prev,
          ITEM_PARENT: selectedITEM_PARENT,
        };
      });
      if (valHIER1CASN.length > 0 || valHIER2CASN.length > 0 || valHIER3CASN.length > 0 || valITEM_PARENTCASN.length > 0 || valPACK_NOCASN.length > 0 || valSKUCASN.length > 0 || valDIFF_IDCASN.length > 0 || valVPNCASN.length > 0 || valUDACASN.length > 0) {
        valPost = [...valHIER1CASN, ...valHIER2CASN, ...valHIER3CASN, ...valITEM_PARENTCASN, ...valPACK_NOCASN, ...valSKUCASN, ...valDIFF_IDCASN, ...valVPNCASN, ...valUDACASN]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getASNRequest(valPost));
        dispatch(getPACKNORequest(valPost));
      } else {
        valPost = [...valITEM_PARENTCASN]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getASNRequest(valPost));
        dispatch(getPACKNORequest(valPost));
      }

    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid ITEM_PARENT"}</p>
        </div>
      )
    } else {
      initialDataPO.ITEM_PARENT = "";
      setSearchDataCASN((prev) => {
        return {
          ...prev,
          ITEM_PARENT: [],
        };
      });
      if (valHIER1CASN.length > 0 || valHIER2CASN.length > 0 || valHIER3CASN.length > 0 || valITEM_PARENTCASN.length > 0 || valPACK_NOCASN.length > 0 || valSKUCASN.length > 0 || valDIFF_IDCASN.length > 0 || valVPNCASN.length > 0 || valUDACASN.length > 0) {
        valPost = [...valHIER1CASN, ...valHIER2CASN, ...valHIER3CASN, ...valITEM_PARENTCASN, ...valPACK_NOCASN, ...valSKUCASN, ...valDIFF_IDCASN, ...valVPNCASN, ...valUDACASN]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getASNRequest(valPost));
        dispatch(getPACKNORequest(valPost));
      } else {
        dispatch(getDIFFRequest([{}]));
        dispatch(getVPNRequest([{}]));
        dispatch(getUDARequest([{}]));
        dispatch(getASNRequest([{}]));
        dispatch(getPACKNORequest([{}]));
      }
    }
  }


  const selectWHCASN = (event, value) => {
    let selectedWH = [];
    if (value.option) {
      valWHCASN.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputWHCASN("");
      // }
      if (String(value.option.WH).includes(inputWHCASN)) {
        setInputWHCASN("");
      }
      if (String(value.option.WH).substring(inputWHCASN)) {
        setInputWHCASN("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valWHCASN.length; i++) {
        if (valWHCASN[i]["WH"] === value.removedValue.WH) {
          index = i;
          break;
        }
      }
      valWHCASN.splice(index, 1);
    } else if (value.action === "clear") {
      valWHCASN.splice(0, valWHCASN.length);
    }
    if (event === 0) {
      valWHCASN.push(value)
    }
    if (valWHCASN.length > 0 && typeof valWHCASN[0]['WH'] !== "undefined") {
      valWHCASN.map(
        (item) => {
          selectedWH.push(item.WH);
        }
      )
      setSearchDataCASN((prev) => {
        return {
          ...prev,
          WH: selectedWH,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid WH"}</p>
        </div>
      )
    } else {
      initialDataPO.WH = "";
      setSearchDataCASN((prev) => {
        return {
          ...prev,
          WH: [],
        };
      });
    }
  }


  const selectSUPPLIERCASN = (event, value) => {
    let selectedSUPPLIER = [];
    if (value.option) {
      valSUPPLIERCASN.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputWHCASN("");
      // }
      if (String(value.option.SUPPLIER).includes(inputSUPPLIERCASN)) {
        setInputSUPPLIERCASN("");
      }
      if (String(value.option.SUPPLIER).substring(inputSUPPLIERCASN)) {
        setInputSUPPLIERCASN("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valSUPPLIERCASN.length; i++) {
        if (valSUPPLIERCASN[i]["SUPPLIER"] === value.removedValue.SUPPLIER) {
          index = i;
          break;
        }
      }
      valSUPPLIERCASN.splice(index, 1);
    } else if (value.action === "clear") {
      valSUPPLIERCASN.splice(0, valSUPPLIERCASN.length);
    }
    if (event === 0) {
      valSUPPLIERCASN.push(value)
    }
    if (valSUPPLIERCASN.length > 0 && typeof valSUPPLIERCASN[0]['SUPPLIER'] !== "undefined") {
      valSUPPLIERCASN.map(
        (item) => {
          selectedSUPPLIER.push(item.SUPPLIER);
        }
      )
      setSearchDataCASN((prev) => {
        return {
          ...prev,
          SUPPLIER: selectedSUPPLIER,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid SUPPLIER"}</p>
        </div>
      )
    } else {
      initialDataPO.SUPPLIER = "";
      setSearchDataCASN((prev) => {
        return {
          ...prev,
          SUPPLIER: [],
        };
      });
    }
  }


  const selectSUPPLIER_SITECASN = (event, value) => {
    let selectedSUPPLIER_SITE = [];
    if (value.option) {
      valSUPPLIER_SITECASN.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputWHCASN("");
      // }
      if (String(value.option.SUPPLIER_SITE).includes(inputSUPPLIER_SITECASN)) {
        setInputSUPPLIER_SITECASN("");
      }
      if (String(value.option.SUPPLIER_SITE).substring(inputSUPPLIER_SITECASN)) {
        setInputSUPPLIER_SITECASN("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valSUPPLIER_SITECASN.length; i++) {
        if (valSUPPLIER_SITECASN[i]["SUPPLIER_SITE"] === value.removedValue.SUPPLIER_SITE) {
          index = i;
          break;
        }
      }
      valSUPPLIER_SITECASN.splice(index, 1);
    } else if (value.action === "clear") {
      valSUPPLIER_SITECASN.splice(0, valSUPPLIER_SITECASN.length);
    }
    if (event === 0) {
      valSUPPLIER_SITECASN.push(value)
    }
    if (valSUPPLIER_SITECASN.length > 0 && typeof valSUPPLIER_SITECASN[0]['SUPPLIER_SITE'] !== "undefined") {
      valSUPPLIER_SITECASN.map(
        (item) => {
          selectedSUPPLIER_SITE.push(item.SUPPLIER_SITE);
        }
      )
      setSearchDataCASN((prev) => {
        return {
          ...prev,
          SUPPLIER_SITE: selectedSUPPLIER_SITE,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid SUPPLIER_SITE"}</p>
        </div>
      )
    } else {
      initialDataPO.SUPPLIER_SITE = "";
      setSearchDataCASN((prev) => {
        return {
          ...prev,
          SUPPLIER_SITE: [],
        };
      });
    }
  }


  const selectPACK_NOCASN = (event, value) => {
    let selectedPACK_NO = [];
    // ////console.log("selectPACK_NOCASNvalue.option:",String(value.option.PACK_NO).includes(inputPACK_NOCASN))
    if (value.option) {
      valPACK_NOCASN.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputWHCASN("");
      // }
      if (String(value.option.PACK_NO).includes(inputPACK_NOCASN)) {
        setInputPACK_NOCASN("");
      }
      if (String(value.option.PACK_NO).substring(inputPACK_NOCASN)) {
        setInputPACK_NOCASN("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valPACK_NOCASN.length; i++) {
        if (valPACK_NOCASN[i]["PACK_NO"] === value.removedValue.PACK_NO) {
          index = i;
          break;
        }
      }
      valPACK_NOCASN.splice(index, 1);
    } else if (value.action === "clear") {
      valPACK_NOCASN.splice(0, valPACK_NOCASN.length);
    }
    if (event === 0) {
      valPACK_NOCASN.push(value)
    }
    if (valPACK_NOCASN.length > 0 && typeof valPACK_NOCASN[0]['PACK_NO'] !== "undefined") {
      valPACK_NOCASN.map(
        (item) => {
          selectedPACK_NO.push(item.PACK_NO);
        }
      )
      setSearchDataCASN((prev) => {
        return {
          ...prev,
          PACK_NO: selectedPACK_NO,
        };
      });
      if (valHIER1CASN.length > 0 || valHIER2CASN.length > 0 || valHIER3CASN.length > 0 || valITEM_PARENTCASN.length > 0 || valPACK_NOCASN.length > 0 || valSKUCASN.length > 0 || valDIFF_IDCASN.length > 0 || valVPNCASN.length > 0 || valUDACASN.length > 0) {
        valPost = [...valHIER1CASN, ...valHIER2CASN, ...valHIER3CASN, ...valITEM_PARENTCASN, ...valPACK_NOCASN, ...valSKUCASN, ...valDIFF_IDCASN, ...valVPNCASN, ...valUDACASN]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getASNRequest(valPost));
      } else {
        valPost = [...valPACK_NOCASN]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getASNRequest(valPost));
      }

    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid PACK_NO"}</p>
        </div>
      )
    } else {
      initialDataPO.PACK_NO = "";
      setSearchDataCASN((prev) => {
        return {
          ...prev,
          PACK_NO: [],
        };
      });
      if (valHIER1CASN.length > 0 || valHIER2CASN.length > 0 || valHIER3CASN.length > 0 || valITEM_PARENTCASN.length > 0 || valPACK_NOCASN.length > 0 || valSKUCASN.length > 0 || valDIFF_IDCASN.length > 0 || valVPNCASN.length > 0 || valUDACASN.length > 0) {
        valPost = [...valHIER1CASN, ...valHIER2CASN, ...valHIER3CASN, ...valITEM_PARENTCASN, ...valPACK_NOCASN, ...valSKUCASN, ...valDIFF_IDCASN, ...valVPNCASN, ...valUDACASN]
        // //////console.log("valPost:111234",valPost)
        // //////console.log("diffData.length > 0 ? diffData : []",diffData.length > 0 ? diffData : [])
        // if (valPost){
        //   //////console.log("valPost:33333",valPost)
        //   var check=false
        //   // valPost.map(object => {delete object["DIFF_ID"];});
        //   // valPost.map(obj=>{if((Object.keys(obj))){
        //   //   //////console.log("valPost:1234444",obj)
        //   // }})
        //   // const filteredvalPost = valPost.splice(valPost.findIndex((item) => Object.keys(item)!=="DIFF_ID"),1)
        //   valPost.filter((obj) =>delete obj.DIFF_ID)
        //   // var newArray = valPost.filter(value => Object.keys(value).length !== 0);


        //   // array.filter(value => Object.keys(value).length !== 0);
        //   //////console.log("value123456::",valPost.findIndex((item) => Object.keys(item)!=="DIFF_ID"))
        //   //////console.log("valPost:5555",check,Object.keys(valPost[0]).length,"  valPost ","filteredvalPost::::")
        //   // for 
        //   if (Object.keys(valPost[0]).length>0){
        //     //////console.log("deelete",valPost)
        //     dispatch(getDIFFRequest(valPost));

        //   }else{
        //     //////console.log("apply")
        //     setDIffData(postval1)
        //     dispatch(getDIFFRequest([{}]));
        //   }
        // }
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getASNRequest(valPost));
      } else {
        dispatch(getDIFFRequest([{}]));
        dispatch(getVPNRequest([{}]));
        dispatch(getUDARequest([{}]));
        dispatch(getASNRequest([{}]));
      }
    }
  }


  const selectDIFF_IDCASN = (event, value) => {
    let selectedDIFF_ID = [];
    if (value.option) {
      valDIFF_IDCASN.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputWHCASN("");
      // }
      if (String(value.option.DIFF_ID).substring(inputDIFF_IDCASN)) {
        setInputDIFF_IDCASN("");
      }
      if (String(value.option.DIFF_ID).includes(inputDIFF_IDCASN)) {
        setInputDIFF_IDCASN("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valDIFF_IDCASN.length; i++) {
        if (valDIFF_IDCASN[i]["DIFF_ID"] === value.removedValue.DIFF_ID) {
          index = i;
          break;
        }
      }
      valDIFF_IDCASN.splice(index, 1);
    } else if (value.action === "clear") {
      valDIFF_IDCASN.splice(0, valDIFF_IDCASN.length);
    }
    if (event === 0) {
      valDIFF_IDCASN.push(value)
    }
    if (valDIFF_IDCASN.length > 0 && typeof valDIFF_IDCASN[0]['DIFF_ID'] !== "undefined") {
      valDIFF_IDCASN.map(
        (item) => {
          selectedDIFF_ID.push(item.DIFF_ID);
        }
      )
      setSearchDataCASN((prev) => {
        return {
          ...prev,
          DIFF_ID: selectedDIFF_ID,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid DIFF_ID"}</p>
        </div>
      )
    } else {
      initialDataPO.DIFF_ID = "";
      setSearchDataCASN((prev) => {
        return {
          ...prev,
          DIFF_ID: [],
        };
      });
    }
  }


  const selectSKUCASN = (event, value) => {
    let selectedSKU = [];
    if (value.option) {
      valSKUCASN.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputWHCASN("");
      // }
      if (String(value.option.SKU).includes(inputSKUCASN)) {
        setInputSKUCASN("");
      }
      if (String(value.option.SKU).substring(inputSKUCASN)) {
        setInputSKUCASN("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valSKUCASN.length; i++) {
        if (valSKUCASN[i]["SKU"] === value.removedValue.SKU) {
          index = i;
          break;
        }
      }
      valSKUCASN.splice(index, 1);
    } else if (value.action === "clear") {
      valSKUCASN.splice(0, valSKUCASN.length);
    }
    if (event === 0) {
      valSKUCASN.push(value)
    }
    if (valSKUCASN.length > 0 && typeof valSKUCASN[0]['SKU'] !== "undefined") {
      valSKUCASN.map(
        (item) => {
          selectedSKU.push(item.SKU);
        }
      )
      setSearchDataCASN((prev) => {
        return {
          ...prev,
          SKU: selectedSKU,
        };
      });
      if (valHIER1CASN.length > 0 || valHIER2CASN.length > 0 || valHIER3CASN.length > 0 || valITEM_PARENTCASN.length > 0 || valPACK_NOCASN.length > 0 || valSKUCASN.length > 0 || valDIFF_IDCASN.length > 0 || valVPNCASN.length > 0 || valUDACASN.length > 0) {
        valPost = [...valHIER1CASN, ...valHIER2CASN, ...valHIER3CASN, ...valITEM_PARENTCASN, ...valPACK_NOCASN, ...valSKUCASN, ...valDIFF_IDCASN, ...valVPNCASN, ...valUDACASN]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getASNRequest(valPost));
      } else {
        valPost = [...valSKUCASN]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getASNRequest(valPost));
      }
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid SKU"}</p>
        </div>
      )
    } else {
      initialDataPO.SKU = "";
      setSearchDataCASN((prev) => {
        return {
          ...prev,
          SKU: [],
        };
      });
      if (valHIER1CASN.length > 0 || valHIER2CASN.length > 0 || valHIER3CASN.length > 0 || valITEM_PARENTCASN.length > 0 || valPACK_NOCASN.length > 0 || valSKUCASN.length > 0 || valDIFF_IDCASN.length > 0 || valVPNCASN.length > 0 || valUDACASN.length > 0) {
        valPost = [...valHIER1CASN, ...valHIER2CASN, ...valHIER3CASN, ...valITEM_PARENTCASN, ...valPACK_NOCASN, ...valSKUCASN, ...valDIFF_IDCASN, ...valVPNCASN, ...valUDACASN]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getASNRequest(valPost));
      } else {
        dispatch(getDIFFRequest([{}]));
        dispatch(getVPNRequest([{}]));
        dispatch(getUDARequest([{}]));
        dispatch(getASNRequest([{}]));
      }
    }
  }


  const selectITEM_LIST_NOCASN = (event, value) => {
    let selectedITEM_LIST_NO = [];
    if (value.option) {
      valITEM_LIST_NOCASN.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputWHCASN("");
      // }
      if (String(value.option.ITEM_LIST_NO).includes(inputITEM_LIST_NOCASN)) {
        setInputITEM_LIST_NOCASN("");
      }
      if (String(value.option.ITEM_LIST_NO).substring(inputITEM_LIST_NOCASN)) {
        setInputITEM_LIST_NOCASN("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valITEM_LIST_NOCASN.length; i++) {
        if (valITEM_LIST_NOCASN[i]["ITEM_LIST_NO"] === value.removedValue.ITEM_LIST_NO) {
          index = i;
          break;
        }
      }
      valITEM_LIST_NOCASN.splice(index, 1);
    } else if (value.action === "clear") {
      valITEM_LIST_NOCASN.splice(0, valITEM_LIST_NOCASN.length);
    }
    if (event === 0) {
      valITEM_LIST_NOCASN.push(value)
    }
    if (valITEM_LIST_NOCASN.length > 0 && typeof valITEM_LIST_NOCASN[0]['ITEM_LIST_NO'] !== "undefined") {
      valITEM_LIST_NOCASN.map(
        (item) => {
          selectedITEM_LIST_NO.push(item.ITEM_LIST_NO);
        }
      )
      setSearchDataCASN((prev) => {
        return {
          ...prev,
          ITEM_LIST_NO: selectedITEM_LIST_NO,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid ITEM_LIST_NO"}</p>
        </div>
      )
    } else {
      initialDataPO.ITEM_LIST_NO = "";
      setSearchDataCASN((prev) => {
        return {
          ...prev,
          ITEM_LIST_NO: [],
        };
      });
    }
  }


  const selectVPNCASN = (event, value) => {
    let selectedVPN = [];
    if (value.option) {
      valVPNCASN.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputWHCASN("");
      // }
      if (String(value.option.VPN).substring(inputVPNCASN)) {
        setInputVPNCASN("");
      }
      if (String(value.option.VPN).includes(inputVPNCASN)) {
        setInputVPNCASN("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valVPNCASN.length; i++) {
        if (valVPNCASN[i]["VPN"] === value.removedValue.VPN) {
          index = i;
          break;
        }
      }
      valVPNCASN.splice(index, 1);
    } else if (value.action === "clear") {
      valVPNCASN.splice(0, valVPNCASN.length);
    }
    if (event === 0) {
      valVPNCASN.push(value)
    }
    if (valVPNCASN.length > 0 && typeof valVPNCASN[0]['VPN'] !== "undefined") {
      valVPNCASN.map(
        (item) => {
          selectedVPN.push(item.VPN);
        }
      )
      setSearchDataCASN((prev) => {
        return {
          ...prev,
          VPN: selectedVPN,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid VPN"}</p>
        </div>
      )
    } else {
      initialDataPO.VPN = "";
      setSearchDataCASN((prev) => {
        return {
          ...prev,
          VPN: [],
        };
      });
    }
  }


  const selectASNCASN = (event, value) => {
    let selectedASN = [];
    if (value.option) {
      valASNCASN.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputWHCASN("");
      // }
      if (String(value.option.ASN).substring(inputASNCASN)) {
        setInputASNCASN("");
      }
      if (String(value.option.ASN).includes(inputASNCASN)) {
        setInputASNCASN("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valASNCASN.length; i++) {
        if (valASNCASN[i]["ASN"] === value.removedValue.ASN) {
          index = i;
          break;
        }
      }
      valASNCASN.splice(index, 1);
    } else if (value.action === "clear") {
      valASNCASN.splice(0, valASNCASN.length);
    }
    if (event === 0) {
      valASNCASN.push(value)
    }
    if (valASNCASN.length > 0 && typeof valASNCASN[0]['ASN'] !== "undefined") {
      valASNCASN.map(
        (item) => {
          selectedASN.push(item.ASN);
        }
      )
      setSearchDataCASN((prev) => {
        return {
          ...prev,
          ASN: selectedASN,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid ASN"}</p>
        </div>
      )
    } else {
      initialDataASN.ASN = "";
      setSearchDataCASN((prev) => {
        return {
          ...prev,
          ASN: [],
        };
      });
    }
  }


  const selectUDACASN = (e, value) => {
    if (e === "Filter") {
      valUDACASN.splice(0, valUDACASN.length);
      valUDACASN.push(...value);
    }

    let selectedUDA = [];
    if (value.option) {
      valUDACASN.push(value.option)
      if (String(value.option.UDA).includes(inputUDACASN)) {
        setInputUDACASN("");
      }
      if (String(value.option.UDA).substring(inputUDACASN)) {
        setInputUDACASN("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valUDACASN.length; i++) {
        if (valUDACASN[i]["UDA"] === value.removedValue.UDA) {
          index = i;
          break;
        }
      }
      valUDACASN.splice(index, 1);

    } else if (value.action === "clear") {
      valUDACASN.splice(0, valUDACASN.length);
      valUDA_VALUECASN.splice(0, valUDA_VALUECASN.length);
      setSearchDataCASN((prev) => {
        return {
          ...prev,
          UDA_VALUE: [],
        };

      });
    }
    //manual input handle input and filter itemdata
    if (e === 0) {
      valUDACASN.push(value)
    }
    //Filtering UDA_VALUE based on UDA
    if (valUDACASN.length > 0) {
      //////console.log("valUDACASN",valUDACASN)
      const filterUDAValueCASN = udaData.filter((item) => {
        return (valUDACASN).some((val) => {
          return item.UDA === val.UDA;
        });
      });
      //////console.log("filterUDAValueCASN",filterUDAValueCASN)
      setFilterUDAValueCASN(filterUDAValueCASN);
      valUDACASN.map((item) => {
        selectedUDA.push(item.UDA);
      });
      if (e !== "Filter") {
        setSearchDataCASN((prev) => {
          return {
            ...prev,
            UDA: selectedUDA,
          };
        });
      }
      var filter_rem1 = selectedUDA.filter(function (i) {
        return this.indexOf(i) < 0;
      },
        searchDataCASN.UDA)

      var filter_rem2 = searchDataCASN.UDA.filter(function (i) {
        return this.indexOf(i) < 0;
      },
        selectedUDA)
      //////////console.log("wew",elmts)
      if (filter_rem1.length > 0 || filter_rem2.length > 0) {
        var temp = [];
        filter_rem1.length > 0 ? temp = [...filter_rem1] : temp = [...filter_rem2]
        ////////console.log("wew",temp)
        for (var i = 0; i < temp.length; i++) {////////console.log("Afvsd")
          const index = searchDataCASN.UDA.indexOf(temp[i]);
          if (index > -1) {
            searchDataCASN.UDA.splice(index, 1);
          }
          ////////console.log("searchDataCASN.UDA",searchDataCASN.UDA)
        }
      }
    } else {
      setFilterUDAValueCASN([]);
      setSearchDataCASN((prev) => {
        return {
          ...prev,
          UDA: []
        };
      });
    }
  }


  const selectUDA_VALUECASN = (e, value) => {
    let selectedUDA_VALUE = [];
    if (value.option) {
      valUDA_VALUECASN.push(value.option)
      if (String(value.option.UDA_VALUE).includes(inputUDA_VALUECASN)) {
        setInputUDA_VALUECASN("");
      }
      if (String(value.option.UDA_VALUE).substring(inputUDA_VALUECASN)) {
        setInputUDA_VALUECASN("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valUDA_VALUECASN.length; i++) {
        if (valUDA_VALUECASN[i]["UDA_VALUE"] === value.removedValue.UDA_VALUE) {
          index = i;
          break;
        }
      }
      valUDA_VALUECASN.splice(index, 1);

    } else if (value.action === "clear") {
      valUDA_VALUECASN.splice(0, valUDA_VALUECASN.length);
    }
    //manual input handle input and filter itemdata
    if (e === 0) {
      valUDA_VALUECASN.push(value);
    }
    //Filtering UDA_VALUE based on UDA
    if (valUDA_VALUECASN.length > 0) {

      valUDA_VALUECASN.map((item) => {
        selectedUDA_VALUE.push(item.UDA_VALUE);
      });
      setSearchDataCASN((prev) => {
        return {
          ...prev,
          UDA_VALUE: selectedUDA_VALUE,
        };
      });
    } else {
      setSearchDataCASN((prev) => {
        return {
          ...prev,
          UDA_VALUE: selectedUDA_VALUE,
        };
      });
    }
  }


  const selectEXCLUDE_UDACASN = (e, value) => {
    if (e === "Filter") {
      valEXCLUDE_UDACASN.splice(0, valEXCLUDE_UDACASN.length);
      valEXCLUDE_UDACASN.push(...value);
    }

    let selectedEXCLUDE_UDA = [];
    if (value.option) {
      valEXCLUDE_UDACASN.push(value.option)
      if (String(value.option.EXCLUDE_UDA).includes(inputEXCLUDE_UDACASN)) {
        setInputEXCLUDE_UDACASN("");
      }
      if (String(value.option.EXCLUDE_UDA).substring(inputEXCLUDE_UDACASN)) {
        setInputEXCLUDE_UDACASN("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valEXCLUDE_UDACASN.length; i++) {
        if (valEXCLUDE_UDACASN[i]["EXCLUDE_UDA"] === value.removedValue.EXCLUDE_UDA) {
          index = i;
          break;
        }
      }
      valEXCLUDE_UDACASN.splice(index, 1);

    } else if (value.action === "clear") {
      valEXCLUDE_UDACASN.splice(0, valEXCLUDE_UDACASN.length);
      valEXCLUDE_UDA_VALUECASN.splice(0, valEXCLUDE_UDA_VALUECASN.length);
      setSearchDataCASN((prev) => {
        return {
          ...prev,
          EXCLUDE_UDA_VALUE: [],
        };

      });
    }
    //manual input handle input and filter itemdata
    if (e === 0) {
      valEXCLUDE_UDACASN.push(value)
    }
    //Filtering EXCLUDE_UDA_VALUE based on EXCLUDE_UDA
    if (valEXCLUDE_UDACASN.length > 0) {
      //////console.log("valEXCLUDE_UDACASN",valEXCLUDE_UDACASN)
      const filterEXCLUDE_UDAValueCASN = excludeUdaData.filter((item) => {
        return (valEXCLUDE_UDACASN).some((val) => {
          return item.EXCLUDE_UDA === val.EXCLUDE_UDA;
        });
      });
      //////console.log("filterEXCLUDE_UDAValueCASN",filterEXCLUDE_UDAValueCASN)
      setFilterEXCLUDE_UDAValueCASN(filterEXCLUDE_UDAValueCASN);
      valEXCLUDE_UDACASN.map((item) => {
        selectedEXCLUDE_UDA.push(item.EXCLUDE_UDA);
      });
      if (e !== "Filter") {
        setSearchDataCASN((prev) => {
          return {
            ...prev,
            EXCLUDE_UDA: selectedEXCLUDE_UDA,
          };
        });
      }
      var filter_rem1 = selectedEXCLUDE_UDA.filter(function (i) {
        return this.indexOf(i) < 0;
      },
        searchDataCASN.EXCLUDE_UDA)

      var filter_rem2 = searchDataCASN.EXCLUDE_UDA.filter(function (i) {
        return this.indexOf(i) < 0;
      },
        selectedEXCLUDE_UDA)
      //////////console.log("wew",elmts)
      if (filter_rem1.length > 0 || filter_rem2.length > 0) {
        var temp = [];
        filter_rem1.length > 0 ? temp = [...filter_rem1] : temp = [...filter_rem2]
        ////////console.log("wew",temp)
        for (var i = 0; i < temp.length; i++) {////////console.log("Afvsd")
          const index = searchDataCASN.EXCLUDE_UDA.indexOf(temp[i]);
          if (index > -1) {
            searchDataCASN.EXCLUDE_UDA.splice(index, 1);
          }
          ////////console.log("searchDataCASN.EXCLUDE_UDA",searchDataCASN.EXCLUDE_UDA)
        }
      }
    } else {
      setFilterEXCLUDE_UDAValueCASN([]);
      setSearchDataCASN((prev) => {
        return {
          ...prev,
          EXCLUDE_UDA: []
        };
      });
    }
  }


  const selectEXCLUDE_UDA_VALUECASN = (e, value) => {
    let selectedEXCLUDE_UDA_VALUE = [];
    if (value.option) {
      valEXCLUDE_UDA_VALUECASN.push(value.option)
      if (String(value.option.EXCLUDE_UDA_VALUE).includes(inputEXCLUDE_UDA_VALUECASN)) {
        setInputEXCLUDE_UDA_VALUECASN("");
      }
      if (String(value.option.EXCLUDE_UDA_VALUE).substring(inputEXCLUDE_UDA_VALUECASN)) {
        setInputEXCLUDE_UDA_VALUECASN("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valEXCLUDE_UDA_VALUECASN.length; i++) {
        if (valEXCLUDE_UDA_VALUECASN[i]["EXCLUDE_UDA_VALUE"] === value.removedValue.EXCLUDE_UDA_VALUE) {
          index = i;
          break;
        }
      }
      valEXCLUDE_UDA_VALUECASN.splice(index, 1);

    } else if (value.action === "clear") {
      valEXCLUDE_UDA_VALUECASN.splice(0, valEXCLUDE_UDA_VALUECASN.length);
    }
    //manual input handle input and filter itemdata
    if (e === 0) {
      valEXCLUDE_UDA_VALUECASN.push(value);
    }

    //Filtering EXCLUDE_UDA_VALUE based on UDA
    if (valEXCLUDE_UDA_VALUECASN.length > 0) {

      valEXCLUDE_UDA_VALUECASN.map((item) => {
        selectedEXCLUDE_UDA_VALUE.push(item.EXCLUDE_UDA_VALUE);
      });
      setSearchDataCASN((prev) => {
        return {
          ...prev,
          EXCLUDE_UDA_VALUE: selectedEXCLUDE_UDA_VALUE,
        };
      });
    } else {
      setSearchDataCASN((prev) => {
        return {
          ...prev,
          EXCLUDE_UDA_VALUE: selectedEXCLUDE_UDA_VALUE,
        };
      });
    }
  }



  ///////////////////////////////////////////
  ///MULTI SELECT CODE FOR WAREHOUSE///
  ////////////////////////////////////

  const selectHIER1CTSF = (event, value) => {
    let selectedHIER1 = [];
    if (value.option) {
      valHIER1CTSF.push(value.option);
      if (String(value.option.HIER1).includes(inputHIER1CTSF)) {
        setInputHIER1CTSF("");
      }
      if (String(value.option.HIER1).substring(inputHIER1CTSF)) {
        setInputHIER1CTSF("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valHIER1CTSF.length; i++) {
        if (valHIER1CTSF[i]["HIER1"] === value.removedValue.HIER1) {
          index = i;
          break;
        }
      }
      valHIER1CTSF.splice(index, 1);
    } else if (value.action === "clear") {
      valHIER1CTSF.splice(0, valHIER1CTSF.length);
    }
    if (event === 0) {
      valHIER1CTSF.push(value)
    }
    if (valHIER1CTSF.length > 0 && typeof valHIER1CTSF[0]['HIER1'] !== "undefined") {
      valHIER1CTSF.map(
        (item) => {
          selectedHIER1.push(item.HIER1);
        }
      )
      setSearchDataCTSF((prev) => {
        return {
          ...prev,
          HIER1: selectedHIER1,
        };
      });


      // if (valHIER2CTSF.length>0 && valHIER3CTSF.length>0){
      //   valPost=[...valHIER1CTSF,...valHIER2CTSF,...valHIER3CTSF]
      //   dispatch(getITEMPARENTRequest(valPost));
      // }
      // else if (valHIER2CTSF.length>0){
      //   valPost=[...valHIER1CTSF,...valHIER2CTSF]
      //   dispatch(getHIER3Request(valPost));
      //   dispatch(getITEMPARENTRequest([{}]));
      // }
      // else if (valHIER3CTSF.length>0){
      //   valPost=[...valHIER1CTSF,...valHIER3CTSF]
      //   dispatch(getITEMPARENTRequest(valPost));
      // }
      // else{
      // valPost=[...valHIER1CTSF]
      // dispatch(getHIER3Request(valPost));
      // dispatch(getITEMPARENTRequest(valPost));
      // }
      if (valHIER1CTSF.length > 0 || valHIER2CTSF.length > 0 || valHIER3CTSF.length > 0 || valITEM_PARENTCTSF.length > 0 || valPACK_NOCTSF.length > 0 || valSKUCTSF.length > 0 || valDIFF_IDCTSF.length > 0 || valVPNCTSF.length > 0 || valUDACTSF.length > 0) {
        valPost = [...valHIER1CTSF, ...valHIER2CTSF, ...valHIER3CTSF, ...valITEM_PARENTCTSF, ...valPACK_NOCTSF, ...valSKUCTSF, ...valDIFF_IDCTSF, ...valVPNCTSF, ...valUDACTSF]
        dispatch(getHIER2Request(valPost));
        dispatch(getHIER3Request(valPost));
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getTSFRequest(valPost));
      } else {
        valPost = [...valHIER1CTSF]
        dispatch(getHIER3Request(valPost));
        dispatch(getHIER2Request(valPost));
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getTSFRequest(valPost));
      }
      //////console.log("valPosthier1:",valPost)



    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid HIER1"}</p>
        </div>
      )
    } else {
      initialDataPO.HIER1 = "";
      setSearchDataCTSF((prev) => {
        return {
          ...prev,
          HIER1: [],
        };
      });
      if (valHIER1CTSF.length > 0 || valHIER2CTSF.length > 0 || valHIER3CTSF.length > 0 || valITEM_PARENTCTSF.length > 0 || valPACK_NOCTSF.length > 0 || valSKUCTSF.length > 0 || valDIFF_IDCTSF.length > 0 || valVPNCTSF.length > 0 || valUDACTSF.length > 0) {
        valPost = [...valHIER1CTSF, ...valHIER2CTSF, ...valHIER3CTSF, ...valITEM_PARENTCTSF, ...valPACK_NOCTSF, ...valSKUCTSF, ...valDIFF_IDCTSF, ...valVPNCTSF, ...valUDACTSF]
        dispatch(getHIER2Request(valPost));
        dispatch(getHIER3Request(valPost));
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getTSFRequest(valPost));
      } else {
        dispatch(getHIER2Request([{}]));
        dispatch(getHIER3Request([{}]));
        dispatch(getITEMPARENTRequest([{}]));
        dispatch(getPACKNORequest([{}]));
        dispatch(getSKURequest([{}]));
        dispatch(getDIFFRequest([{}]));
        dispatch(getVPNRequest([{}]));
        dispatch(getUDARequest([{}]));
        dispatch(getTSFRequest([{}]));
      }
    }
  }


  const selectHIER2CTSF = (event, value) => {
    let selectedHIER2 = [];
    if (value.option) {
      valHIER2CTSF.push(value.option);
      if (String(value.option.HIER2).includes(inputHIER2CTSF)) {
        setInputHIER2CTSF("");
      }
      if (String(value.option.HIER2).substring(inputHIER2CTSF)) {
        setInputHIER2CTSF("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valHIER2CTSF.length; i++) {
        if (valHIER2CTSF[i]["HIER2"] === value.removedValue.HIER2) {
          index = i;
          break;
        }
      }
      valHIER2CTSF.splice(index, 1);
    } else if (value.action === "clear") {
      valHIER2CTSF.splice(0, valHIER2CTSF.length);
    }
    if (event === 0) {
      valHIER2CTSF.push(value)
    }
    if (valHIER2CTSF.length > 0 && typeof valHIER2CTSF[0]['HIER2'] !== "undefined") {
      valHIER2CTSF.map(
        (item) => {
          selectedHIER2.push(item.HIER2);
        }
      )
      setSearchDataCTSF((prev) => {
        return {
          ...prev,
          HIER2: selectedHIER2,
        };
      });

      // if (valHIER1CTSF.length>0 && valHIER3CTSF.length>0){
      //   valPost=[...valHIER1CTSF,...valHIER2CTSF,...valHIER3CTSF]
      //   dispatch(getITEMPARENTRequest(valPost));
      // }
      // else if (valHIER3CTSF.length>0){
      //   valPost=[...valHIER2CTSF,...valHIER3CTSF]
      //   dispatch(getITEMPARENTRequest(valPost));
      // }
      // else if (valHIER1CTSF.length>0){
      //   valPost=[...valHIER1CTSF,...valHIER2CTSF]
      //   dispatch(getHIER3Request(valPost));
      //   dispatch(getITEMPARENTRequest(valPost));
      // }else{
      //   valPost=[...valHIER2CTSF]
      //   dispatch(getHIER3Request(valPost));
      //   dispatch(getITEMPARENTRequest(valPost));
      // }


      if (valHIER1CTSF.length > 0 || valHIER2CTSF.length > 0 || valHIER3CTSF.length > 0 || valITEM_PARENTCTSF.length > 0 || valPACK_NOCTSF.length > 0 || valSKUCTSF.length > 0 || valDIFF_IDCTSF.length > 0 || valVPNCTSF.length > 0 || valUDACTSF.length > 0) {
        valPost = [...valHIER1CTSF, ...valHIER2CTSF, ...valHIER3CTSF, ...valITEM_PARENTCTSF, ...valPACK_NOCTSF, ...valSKUCTSF, ...valDIFF_IDCTSF, ...valVPNCTSF, ...valUDACTSF]
        dispatch(getHIER3Request(valPost));
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getTSFRequest(valPost));
      } else {
        valPost = [...valHIER2CTSF]
        dispatch(getHIER3Request(valPost));
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getTSFRequest(valPost));
      }
      //////console.log("valPost:",valPost)




    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid HIER2"}</p>
        </div>
      )
    } else {
      initialDataPO.HIER2 = "";
      setSearchDataCTSF((prev) => {
        return {
          ...prev,
          HIER2: [],
        };
      });
      if (valHIER1CTSF.length > 0 || valHIER2CTSF.length > 0 || valHIER3CTSF.length > 0 || valITEM_PARENTCTSF.length > 0 || valPACK_NOCTSF.length > 0 || valSKUCTSF.length > 0 || valDIFF_IDCTSF.length > 0 || valVPNCTSF.length > 0 || valUDACTSF.length > 0) {
        valPost = [...valHIER1CTSF, ...valHIER2CTSF, ...valHIER3CTSF, ...valITEM_PARENTCTSF, ...valPACK_NOCTSF, ...valSKUCTSF, ...valDIFF_IDCTSF, ...valVPNCTSF, ...valUDACTSF]
        dispatch(getHIER3Request(valPost));
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getTSFRequest(valPost));
      } else {
        dispatch(getHIER3Request([{}]));
        dispatch(getITEMPARENTRequest([{}]));
        dispatch(getPACKNORequest([{}]));
        dispatch(getSKURequest([{}]));
        dispatch(getDIFFRequest([{}]));
        dispatch(getVPNRequest([{}]));
        dispatch(getUDARequest([{}]));
        dispatch(getTSFRequest([{}]));
      }
    }
  }


  const selectHIER3CTSF = (event, value) => {
    let selectedHIER3 = [];
    if (value.option) {
      valHIER3CTSF.push(value.option);
      if (String(value.option.HIER3).includes(inputHIER3CTSF)) {
        setInputHIER3CTSF("");
      }
      if (String(value.option.HIER3).substring(inputHIER3CTSF)) {
        setInputHIER3CTSF("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valHIER3CTSF.length; i++) {
        if (valHIER3CTSF[i]["HIER3"] === value.removedValue.HIER3) {
          index = i;
          break;
        }
      }
      valHIER3CTSF.splice(index, 1);
    } else if (value.action === "clear") {
      valHIER3CTSF.splice(0, valHIER3CTSF.length);
    }
    if (event === 0) {
      valHIER3CTSF.push(value)
    }
    if (valHIER3CTSF.length > 0 && typeof valHIER3CTSF[0]['HIER3'] !== "undefined") {
      valHIER3CTSF.map(
        (item) => {
          selectedHIER3.push(item.HIER3);
        }
      )
      setSearchDataCTSF((prev) => {
        return {
          ...prev,
          HIER3: selectedHIER3,
        };
      });

      if (valHIER1CTSF.length > 0 || valHIER2CTSF.length > 0 || valHIER3CTSF.length > 0 || valITEM_PARENTCTSF.length > 0 || valPACK_NOCTSF.length > 0 || valSKUCTSF.length > 0 || valDIFF_IDCTSF.length > 0 || valVPNCTSF.length > 0 || valUDACTSF.length > 0) {
        valPost = [...valHIER1CTSF, ...valHIER2CTSF, ...valHIER3CTSF, ...valITEM_PARENTCTSF, ...valPACK_NOCTSF, ...valSKUCTSF, ...valDIFF_IDCTSF, ...valVPNCTSF, ...valUDACTSF]
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getTSFRequest(valPost));
      } else {
        valPost = [...valHIER3CTSF]
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getTSFRequest(valPost));
      }

    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid HIER3"}</p>
        </div>
      )
    } else {
      initialDataPO.HIER3 = "";
      setSearchDataCTSF((prev) => {
        return {
          ...prev,
          HIER3: [],
        };
      });
      if (valHIER1CTSF.length > 0 || valHIER2CTSF.length > 0 || valHIER3CTSF.length > 0 || valITEM_PARENTCTSF.length > 0 || valPACK_NOCTSF.length > 0 || valSKUCTSF.length > 0 || valDIFF_IDCTSF.length > 0 || valVPNCTSF.length > 0 || valUDACTSF.length > 0) {
        valPost = [...valHIER1CTSF, ...valHIER2CTSF, ...valHIER3CTSF, ...valITEM_PARENTCTSF, ...valPACK_NOCTSF, ...valSKUCTSF, ...valDIFF_IDCTSF, ...valVPNCTSF, ...valUDACTSF]
        dispatch(getITEMPARENTRequest(valPost));
        dispatch(getPACKNORequest(valPost));
        dispatch(getSKURequest(valPost));
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getTSFRequest(valPost));
      } else {
        dispatch(getITEMPARENTRequest([{}]));
        dispatch(getPACKNORequest([{}]));
        dispatch(getSKURequest([{}]));
        dispatch(getDIFFRequest([{}]));
        dispatch(getVPNRequest([{}]));
        dispatch(getUDARequest([{}]));
        dispatch(getTSFRequest([{}]));
      }
    }
  }


  const selectITEM_PARENTCTSF = (event, value) => {
    let selectedITEM_PARENT = [];
    if (value.option) {
      valITEM_PARENTCTSF.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputITEM_PARENTCTSF("");
      // }
      if (String(value.option.ITEM_PARENT).includes(inputITEM_PARENTCTSF)) {
        setInputITEM_PARENTCTSF("");
      }
      if (String(value.option.ITEM_PARENT).substring(inputITEM_PARENTCTSF)) {
        setInputITEM_PARENTCTSF("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valITEM_PARENTCTSF.length; i++) {
        if (valITEM_PARENTCTSF[i]["ITEM_PARENT"] === value.removedValue.ITEM_PARENT) {
          index = i;
          break;
        }
      }
      valITEM_PARENTCTSF.splice(index, 1);
    } else if (value.action === "clear") {
      valITEM_PARENTCTSF.splice(0, valITEM_PARENTCTSF.length);
    }
    if (event === 0) {
      valITEM_PARENTCTSF.push(value)
    }
    if (valITEM_PARENTCTSF.length > 0 && typeof valITEM_PARENTCTSF[0]['ITEM_PARENT'] !== "undefined") {
      valITEM_PARENTCTSF.map(
        (item) => {
          selectedITEM_PARENT.push(item.ITEM_PARENT);
        }
      )
      setSearchDataCTSF((prev) => {
        return {
          ...prev,
          ITEM_PARENT: selectedITEM_PARENT,
        };
      });
      if (valHIER1CTSF.length > 0 || valHIER2CTSF.length > 0 || valHIER3CTSF.length > 0 || valITEM_PARENTCTSF.length > 0 || valPACK_NOCTSF.length > 0 || valSKUCTSF.length > 0 || valDIFF_IDCTSF.length > 0 || valVPNCTSF.length > 0 || valUDACTSF.length > 0) {
        valPost = [...valHIER1CTSF, ...valHIER2CTSF, ...valHIER3CTSF, ...valITEM_PARENTCTSF, ...valPACK_NOCTSF, ...valSKUCTSF, ...valDIFF_IDCTSF, ...valVPNCTSF, ...valUDACTSF]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getTSFRequest(valPost));
        dispatch(getPACKNORequest(valPost));
      } else {
        valPost = [...valITEM_PARENTCTSF]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getTSFRequest(valPost));
        dispatch(getPACKNORequest(valPost));
      }

    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid ITEM_PARENT"}</p>
        </div>
      )
    } else {
      initialDataPO.ITEM_PARENT = "";
      setSearchDataCTSF((prev) => {
        return {
          ...prev,
          ITEM_PARENT: [],
        };
      });
      if (valHIER1CTSF.length > 0 || valHIER2CTSF.length > 0 || valHIER3CTSF.length > 0 || valITEM_PARENTCTSF.length > 0 || valPACK_NOCTSF.length > 0 || valSKUCTSF.length > 0 || valDIFF_IDCTSF.length > 0 || valVPNCTSF.length > 0 || valUDACTSF.length > 0) {
        valPost = [...valHIER1CTSF, ...valHIER2CTSF, ...valHIER3CTSF, ...valITEM_PARENTCTSF, ...valPACK_NOCTSF, ...valSKUCTSF, ...valDIFF_IDCTSF, ...valVPNCTSF, ...valUDACTSF]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getTSFRequest(valPost));
        dispatch(getPACKNORequest(valPost));
      } else {
        dispatch(getDIFFRequest([{}]));
        dispatch(getVPNRequest([{}]));
        dispatch(getUDARequest([{}]));
        dispatch(getTSFRequest([{}]));
        dispatch(getPACKNORequest([{}]));
      }
    }
  }


  const selectWHCTSF = (event, value) => {
    let selectedWH = [];
    if (value.option) {
      valWHCTSF.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputWHCTSF("");
      // }
      if (String(value.option.WH).includes(inputWHCTSF)) {
        setInputWHCTSF("");
      }
      if (String(value.option.WH).substring(inputWHCTSF)) {
        setInputWHCTSF("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valWHCTSF.length; i++) {
        if (valWHCTSF[i]["WH"] === value.removedValue.WH) {
          index = i;
          break;
        }
      }
      valWHCTSF.splice(index, 1);
    } else if (value.action === "clear") {
      valWHCTSF.splice(0, valWHCTSF.length);
    }
    if (event === 0) {
      valWHCTSF.push(value)
    }
    if (valWHCTSF.length > 0 && typeof valWHCTSF[0]['WH'] !== "undefined") {
      valWHCTSF.map(
        (item) => {
          selectedWH.push(item.WH);
        }
      )
      setSearchDataCTSF((prev) => {
        return {
          ...prev,
          WH: selectedWH,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid WH"}</p>
        </div>
      )
    } else {
      initialDataPO.WH = "";
      setSearchDataCTSF((prev) => {
        return {
          ...prev,
          WH: [],
        };
      });
    }
  }


  const selectSUPPLIERCTSF = (event, value) => {
    let selectedSUPPLIER = [];
    if (value.option) {
      valSUPPLIERCTSF.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputWHCTSF("");
      // }
      if (String(value.option.SUPPLIER).includes(inputSUPPLIERCTSF)) {
        setInputSUPPLIERCTSF("");
      }
      if (String(value.option.SUPPLIER).substring(inputSUPPLIERCTSF)) {
        setInputSUPPLIERCTSF("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valSUPPLIERCTSF.length; i++) {
        if (valSUPPLIERCTSF[i]["SUPPLIER"] === value.removedValue.SUPPLIER) {
          index = i;
          break;
        }
      }
      valSUPPLIERCTSF.splice(index, 1);
    } else if (value.action === "clear") {
      valSUPPLIERCTSF.splice(0, valSUPPLIERCTSF.length);
    }
    if (event === 0) {
      valSUPPLIERCTSF.push(value)
    }
    if (valSUPPLIERCTSF.length > 0 && typeof valSUPPLIERCTSF[0]['SUPPLIER'] !== "undefined") {
      valSUPPLIERCTSF.map(
        (item) => {
          selectedSUPPLIER.push(item.SUPPLIER);
        }
      )
      setSearchDataCTSF((prev) => {
        return {
          ...prev,
          SUPPLIER: selectedSUPPLIER,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid SUPPLIER"}</p>
        </div>
      )
    } else {
      initialDataPO.SUPPLIER = "";
      setSearchDataCTSF((prev) => {
        return {
          ...prev,
          SUPPLIER: [],
        };
      });
    }
  }


  const selectSUPPLIER_SITECTSF = (event, value) => {
    let selectedSUPPLIER_SITE = [];
    if (value.option) {
      valSUPPLIER_SITECTSF.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputWHCTSF("");
      // }
      if (String(value.option.SUPPLIER_SITE).includes(inputSUPPLIER_SITECTSF)) {
        setInputSUPPLIER_SITECTSF("");
      }
      if (String(value.option.SUPPLIER_SITE).substring(inputSUPPLIER_SITECTSF)) {
        setInputSUPPLIER_SITECTSF("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valSUPPLIER_SITECTSF.length; i++) {
        if (valSUPPLIER_SITECTSF[i]["SUPPLIER_SITE"] === value.removedValue.SUPPLIER_SITE) {
          index = i;
          break;
        }
      }
      valSUPPLIER_SITECTSF.splice(index, 1);
    } else if (value.action === "clear") {
      valSUPPLIER_SITECTSF.splice(0, valSUPPLIER_SITECTSF.length);
    }
    if (event === 0) {
      valSUPPLIER_SITECTSF.push(value)
    }
    if (valSUPPLIER_SITECTSF.length > 0 && typeof valSUPPLIER_SITECTSF[0]['SUPPLIER_SITE'] !== "undefined") {
      valSUPPLIER_SITECTSF.map(
        (item) => {
          selectedSUPPLIER_SITE.push(item.SUPPLIER_SITE);
        }
      )
      setSearchDataCTSF((prev) => {
        return {
          ...prev,
          SUPPLIER_SITE: selectedSUPPLIER_SITE,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid SUPPLIER_SITE"}</p>
        </div>
      )
    } else {
      initialDataPO.SUPPLIER_SITE = "";
      setSearchDataCTSF((prev) => {
        return {
          ...prev,
          SUPPLIER_SITE: [],
        };
      });
    }
  }


  const selectPACK_NOCTSF = (event, value) => {
    let selectedPACK_NO = [];
    // ////console.log("selectPACK_NOCTSFvalue.option:",String(value.option.PACK_NO).includes(inputPACK_NOCTSF))
    if (value.option) {
      valPACK_NOCTSF.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputWHCTSF("");
      // }
      if (String(value.option.PACK_NO).includes(inputPACK_NOCTSF)) {
        setInputPACK_NOCTSF("");
      }
      if (String(value.option.PACK_NO).substring(inputPACK_NOCTSF)) {
        setInputPACK_NOCTSF("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valPACK_NOCTSF.length; i++) {
        if (valPACK_NOCTSF[i]["PACK_NO"] === value.removedValue.PACK_NO) {
          index = i;
          break;
        }
      }
      valPACK_NOCTSF.splice(index, 1);
    } else if (value.action === "clear") {
      valPACK_NOCTSF.splice(0, valPACK_NOCTSF.length);
    }
    if (event === 0) {
      valPACK_NOCTSF.push(value)
    }
    if (valPACK_NOCTSF.length > 0 && typeof valPACK_NOCTSF[0]['PACK_NO'] !== "undefined") {
      valPACK_NOCTSF.map(
        (item) => {
          selectedPACK_NO.push(item.PACK_NO);
        }
      )
      setSearchDataCTSF((prev) => {
        return {
          ...prev,
          PACK_NO: selectedPACK_NO,
        };
      });
      if (valHIER1CTSF.length > 0 || valHIER2CTSF.length > 0 || valHIER3CTSF.length > 0 || valITEM_PARENTCTSF.length > 0 || valPACK_NOCTSF.length > 0 || valSKUCTSF.length > 0 || valDIFF_IDCTSF.length > 0 || valVPNCTSF.length > 0 || valUDACTSF.length > 0) {
        valPost = [...valHIER1CTSF, ...valHIER2CTSF, ...valHIER3CTSF, ...valITEM_PARENTCTSF, ...valPACK_NOCTSF, ...valSKUCTSF, ...valDIFF_IDCTSF, ...valVPNCTSF, ...valUDACTSF]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getTSFRequest(valPost));
      } else {
        valPost = [...valPACK_NOCTSF]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getTSFRequest(valPost));
      }

    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid PACK_NO"}</p>
        </div>
      )
    } else {
      initialDataPO.PACK_NO = "";
      setSearchDataCTSF((prev) => {
        return {
          ...prev,
          PACK_NO: [],
        };
      });
      if (valHIER1CTSF.length > 0 || valHIER2CTSF.length > 0 || valHIER3CTSF.length > 0 || valITEM_PARENTCTSF.length > 0 || valPACK_NOCTSF.length > 0 || valSKUCTSF.length > 0 || valDIFF_IDCTSF.length > 0 || valVPNCTSF.length > 0 || valUDACTSF.length > 0) {
        valPost = [...valHIER1CTSF, ...valHIER2CTSF, ...valHIER3CTSF, ...valITEM_PARENTCTSF, ...valPACK_NOCTSF, ...valSKUCTSF, ...valDIFF_IDCTSF, ...valVPNCTSF, ...valUDACTSF]
        // //////console.log("valPost:111234",valPost)
        // //////console.log("diffData.length > 0 ? diffData : []",diffData.length > 0 ? diffData : [])
        // if (valPost){
        //   //////console.log("valPost:33333",valPost)
        //   var check=false
        //   // valPost.map(object => {delete object["DIFF_ID"];});
        //   // valPost.map(obj=>{if((Object.keys(obj))){
        //   //   //////console.log("valPost:1234444",obj)
        //   // }})
        //   // const filteredvalPost = valPost.splice(valPost.findIndex((item) => Object.keys(item)!=="DIFF_ID"),1)
        //   valPost.filter((obj) =>delete obj.DIFF_ID)
        //   // var newArray = valPost.filter(value => Object.keys(value).length !== 0);


        //   // array.filter(value => Object.keys(value).length !== 0);
        //   //////console.log("value123456::",valPost.findIndex((item) => Object.keys(item)!=="DIFF_ID"))
        //   //////console.log("valPost:5555",check,Object.keys(valPost[0]).length,"  valPost ","filteredvalPost::::")
        //   // for 
        //   if (Object.keys(valPost[0]).length>0){
        //     //////console.log("deelete",valPost)
        //     dispatch(getDIFFRequest(valPost));

        //   }else{
        //     //////console.log("apply")
        //     setDIffData(postval1)
        //     dispatch(getDIFFRequest([{}]));
        //   }
        // }
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getTSFRequest(valPost));
      } else {
        dispatch(getDIFFRequest([{}]));
        dispatch(getVPNRequest([{}]));
        dispatch(getUDARequest([{}]));
        dispatch(getTSFRequest([{}]));
      }
    }
  }


  const selectDIFF_IDCTSF = (event, value) => {
    let selectedDIFF_ID = [];
    if (value.option) {
      valDIFF_IDCTSF.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputWHCTSF("");
      // }
      if (String(value.option.DIFF_ID).substring(inputDIFF_IDCTSF)) {
        setInputDIFF_IDCTSF("");
      }
      if (String(value.option.DIFF_ID).includes(inputDIFF_IDCTSF)) {
        setInputDIFF_IDCTSF("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valDIFF_IDCTSF.length; i++) {
        if (valDIFF_IDCTSF[i]["DIFF_ID"] === value.removedValue.DIFF_ID) {
          index = i;
          break;
        }
      }
      valDIFF_IDCTSF.splice(index, 1);
    } else if (value.action === "clear") {
      valDIFF_IDCTSF.splice(0, valDIFF_IDCTSF.length);
    }
    if (event === 0) {
      valDIFF_IDCTSF.push(value)
    }
    if (valDIFF_IDCTSF.length > 0 && typeof valDIFF_IDCTSF[0]['DIFF_ID'] !== "undefined") {
      valDIFF_IDCTSF.map(
        (item) => {
          selectedDIFF_ID.push(item.DIFF_ID);
        }
      )
      setSearchDataCTSF((prev) => {
        return {
          ...prev,
          DIFF_ID: selectedDIFF_ID,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid DIFF_ID"}</p>
        </div>
      )
    } else {
      initialDataPO.DIFF_ID = "";
      setSearchDataCTSF((prev) => {
        return {
          ...prev,
          DIFF_ID: [],
        };
      });
    }
  }


  const selectSKUCTSF = (event, value) => {
    let selectedSKU = [];
    if (value.option) {
      valSKUCTSF.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputWHCTSF("");
      // }
      if (String(value.option.SKU).includes(inputSKUCTSF)) {
        setInputSKUCTSF("");
      }
      if (String(value.option.SKU).substring(inputSKUCTSF)) {
        setInputSKUCTSF("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valSKUCTSF.length; i++) {
        if (valSKUCTSF[i]["SKU"] === value.removedValue.SKU) {
          index = i;
          break;
        }
      }
      valSKUCTSF.splice(index, 1);
    } else if (value.action === "clear") {
      valSKUCTSF.splice(0, valSKUCTSF.length);
    }
    if (event === 0) {
      valSKUCTSF.push(value)
    }
    if (valSKUCTSF.length > 0 && typeof valSKUCTSF[0]['SKU'] !== "undefined") {
      valSKUCTSF.map(
        (item) => {
          selectedSKU.push(item.SKU);
        }
      )
      setSearchDataCTSF((prev) => {
        return {
          ...prev,
          SKU: selectedSKU,
        };
      });
      if (valHIER1CTSF.length > 0 || valHIER2CTSF.length > 0 || valHIER3CTSF.length > 0 || valITEM_PARENTCTSF.length > 0 || valPACK_NOCTSF.length > 0 || valSKUCTSF.length > 0 || valDIFF_IDCTSF.length > 0 || valVPNCTSF.length > 0 || valUDACTSF.length > 0) {
        valPost = [...valHIER1CTSF, ...valHIER2CTSF, ...valHIER3CTSF, ...valITEM_PARENTCTSF, ...valPACK_NOCTSF, ...valSKUCTSF, ...valDIFF_IDCTSF, ...valVPNCTSF, ...valUDACTSF]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getTSFRequest(valPost));
      } else {
        valPost = [...valSKUCTSF]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getTSFRequest(valPost));
      }
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid SKU"}</p>
        </div>
      )
    } else {
      initialDataPO.SKU = "";
      setSearchDataCTSF((prev) => {
        return {
          ...prev,
          SKU: [],
        };
      });
      if (valHIER1CTSF.length > 0 || valHIER2CTSF.length > 0 || valHIER3CTSF.length > 0 || valITEM_PARENTCTSF.length > 0 || valPACK_NOCTSF.length > 0 || valSKUCTSF.length > 0 || valDIFF_IDCTSF.length > 0 || valVPNCTSF.length > 0 || valUDACTSF.length > 0) {
        valPost = [...valHIER1CTSF, ...valHIER2CTSF, ...valHIER3CTSF, ...valITEM_PARENTCTSF, ...valPACK_NOCTSF, ...valSKUCTSF, ...valDIFF_IDCTSF, ...valVPNCTSF, ...valUDACTSF]
        dispatch(getDIFFRequest(valPost));
        dispatch(getVPNRequest(valPost));
        dispatch(getUDARequest(valPost));
        dispatch(getTSFRequest(valPost));
      } else {
        dispatch(getDIFFRequest([{}]));
        dispatch(getVPNRequest([{}]));
        dispatch(getUDARequest([{}]));
        dispatch(getTSFRequest([{}]));
      }
    }
  }


  const selectITEM_LIST_NOCTSF = (event, value) => {
    let selectedITEM_LIST_NO = [];
    if (value.option) {
      valITEM_LIST_NOCTSF.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputWHCTSF("");
      // }
      if (String(value.option.ITEM_LIST_NO).includes(inputITEM_LIST_NOCTSF)) {
        setInputITEM_LIST_NOCTSF("");
      }
      if (String(value.option.ITEM_LIST_NO).substring(inputITEM_LIST_NOCTSF)) {
        setInputITEM_LIST_NOCTSF("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valITEM_LIST_NOCTSF.length; i++) {
        if (valITEM_LIST_NOCTSF[i]["ITEM_LIST_NO"] === value.removedValue.ITEM_LIST_NO) {
          index = i;
          break;
        }
      }
      valITEM_LIST_NOCTSF.splice(index, 1);
    } else if (value.action === "clear") {
      valITEM_LIST_NOCTSF.splice(0, valITEM_LIST_NOCTSF.length);
    }
    if (event === 0) {
      valITEM_LIST_NOCTSF.push(value)
    }
    if (valITEM_LIST_NOCTSF.length > 0 && typeof valITEM_LIST_NOCTSF[0]['ITEM_LIST_NO'] !== "undefined") {
      valITEM_LIST_NOCTSF.map(
        (item) => {
          selectedITEM_LIST_NO.push(item.ITEM_LIST_NO);
        }
      )
      setSearchDataCTSF((prev) => {
        return {
          ...prev,
          ITEM_LIST_NO: selectedITEM_LIST_NO,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid ITEM_LIST_NO"}</p>
        </div>
      )
    } else {
      initialDataPO.ITEM_LIST_NO = "";
      setSearchDataCTSF((prev) => {
        return {
          ...prev,
          ITEM_LIST_NO: [],
        };
      });
    }
  }


  const selectVPNCTSF = (event, value) => {
    let selectedVPN = [];
    if (value.option) {
      valVPNCTSF.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputWHCTSF("");
      // }
      if (String(value.option.VPN).substring(inputVPNCTSF)) {
        setInputVPNCTSF("");
      }
      if (String(value.option.VPN).includes(inputVPNCTSF)) {
        setInputVPNCTSF("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valVPNCTSF.length; i++) {
        if (valVPNCTSF[i]["VPN"] === value.removedValue.VPN) {
          index = i;
          break;
        }
      }
      valVPNCTSF.splice(index, 1);
    } else if (value.action === "clear") {
      valVPNCTSF.splice(0, valVPNCTSF.length);
    }
    if (event === 0) {
      valVPNCTSF.push(value)
    }
    if (valVPNCTSF.length > 0 && typeof valVPNCTSF[0]['VPN'] !== "undefined") {
      valVPNCTSF.map(
        (item) => {
          selectedVPN.push(item.VPN);
        }
      )
      setSearchDataCTSF((prev) => {
        return {
          ...prev,
          VPN: selectedVPN,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid VPN"}</p>
        </div>
      )
    } else {
      initialDataPO.VPN = "";
      setSearchDataCTSF((prev) => {
        return {
          ...prev,
          VPN: [],
        };
      });
    }
  }


  const selectTSFCTSF = (event, value) => {
    let selectedTSF = [];
    if (value.option) {
      valTSFCTSF.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   //////////console.log(1234)
      //   setInputWHCTSF("");
      // }
      if (String(value.option.TSF).substring(inputTSFCTSF)) {
        setInputTSFCTSF("");
      }
      if (String(value.option.TSF).includes(inputTSFCTSF)) {
        setInputTSFCTSF("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valTSFCTSF.length; i++) {
        if (valTSFCTSF[i]["TSF"] === value.removedValue.TSF) {
          index = i;
          break;
        }
      }
      valTSFCTSF.splice(index, 1);
    } else if (value.action === "clear") {
      valTSFCTSF.splice(0, valTSFCTSF.length);
    }
    if (event === 0) {
      valTSFCTSF.push(value)
    }
    if (valTSFCTSF.length > 0 && typeof valTSFCTSF[0]['TSF'] !== "undefined") {
      valTSFCTSF.map(
        (item) => {
          selectedTSF.push(item.TSF);
        }
      )
      setSearchDataCTSF((prev) => {
        return {
          ...prev,
          TSF: selectedTSF,
        };
      });
    } else if (value.length > 0) {
      swal(
        <div>
          <p>{"Please Choose valid TSF"}</p>
        </div>
      )
    } else {
      initialDataTSF.TSF = "";
      setSearchDataCTSF((prev) => {
        return {
          ...prev,
          TSF: [],
        };
      });
    }
  }


  const selectUDACTSF = (e, value) => {
    if (e === "Filter") {
      valUDACTSF.splice(0, valUDACTSF.length);
      valUDACTSF.push(...value);
    }

    let selectedUDA = [];
    if (value.option) {
      valUDACTSF.push(value.option)
      if (String(value.option.UDA).includes(inputUDACTSF)) {
        setInputUDACTSF("");
      }
      if (String(value.option.UDA).substring(inputUDACTSF)) {
        setInputUDACTSF("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valUDACTSF.length; i++) {
        if (valUDACTSF[i]["UDA"] === value.removedValue.UDA) {
          index = i;
          break;
        }
      }
      valUDACTSF.splice(index, 1);

    } else if (value.action === "clear") {
      valUDACTSF.splice(0, valUDACTSF.length);
      valUDA_VALUECTSF.splice(0, valUDA_VALUECTSF.length);
      setSearchDataCTSF((prev) => {
        return {
          ...prev,
          UDA_VALUE: [],
        };

      });
    }
    //manual input handle input and filter itemdata
    if (e === 0) {
      valUDACTSF.push(value)
    }
    //Filtering UDA_VALUE based on UDA
    if (valUDACTSF.length > 0) {
      //////console.log("valUDACTSF",valUDACTSF)
      const filterUDAValueCTSF = udaData.filter((item) => {
        return (valUDACTSF).some((val) => {
          return item.UDA === val.UDA;
        });
      });
      //////console.log("filterUDAValueCTSF",filterUDAValueCTSF)
      setFilterUDAValueCTSF(filterUDAValueCTSF);
      valUDACTSF.map((item) => {
        selectedUDA.push(item.UDA);
      });
      if (e !== "Filter") {
        setSearchDataCTSF((prev) => {
          return {
            ...prev,
            UDA: selectedUDA,
          };
        });
      }
      var filter_rem1 = selectedUDA.filter(function (i) {
        return this.indexOf(i) < 0;
      },
        searchDataCTSF.UDA)

      var filter_rem2 = searchDataCTSF.UDA.filter(function (i) {
        return this.indexOf(i) < 0;
      },
        selectedUDA)
      //////////console.log("wew",elmts)
      if (filter_rem1.length > 0 || filter_rem2.length > 0) {
        var temp = [];
        filter_rem1.length > 0 ? temp = [...filter_rem1] : temp = [...filter_rem2]
        ////////console.log("wew",temp)
        for (var i = 0; i < temp.length; i++) {////////console.log("Afvsd")
          const index = searchDataCTSF.UDA.indexOf(temp[i]);
          if (index > -1) {
            searchDataCTSF.UDA.splice(index, 1);
          }
          ////////console.log("searchDataCTSF.UDA",searchDataCTSF.UDA)
        }
      }
    } else {
      setFilterUDAValueCTSF([]);
      setSearchDataCTSF((prev) => {
        return {
          ...prev,
          UDA: []
        };
      });
    }
  }


  const selectUDA_VALUECTSF = (e, value) => {
    let selectedUDA_VALUE = [];
    if (value.option) {
      valUDA_VALUECTSF.push(value.option)
      if (String(value.option.UDA_VALUE).includes(inputUDA_VALUECTSF)) {
        setInputUDA_VALUECTSF("");
      }
      if (String(value.option.UDA_VALUE).substring(inputUDA_VALUECTSF)) {
        setInputUDA_VALUECTSF("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valUDA_VALUECTSF.length; i++) {
        if (valUDA_VALUECTSF[i]["UDA_VALUE"] === value.removedValue.UDA_VALUE) {
          index = i;
          break;
        }
      }
      valUDA_VALUECTSF.splice(index, 1);

    } else if (value.action === "clear") {
      valUDA_VALUECTSF.splice(0, valUDA_VALUECTSF.length);
    }
    //manual input handle input and filter itemdata
    if (e === 0) {
      valUDA_VALUECTSF.push(value);
    }
    //Filtering UDA_VALUE based on UDA
    if (valUDA_VALUECTSF.length > 0) {

      valUDA_VALUECTSF.map((item) => {
        selectedUDA_VALUE.push(item.UDA_VALUE);
      });
      setSearchDataCTSF((prev) => {
        return {
          ...prev,
          UDA_VALUE: selectedUDA_VALUE,
        };
      });
    } else {
      setSearchDataCTSF((prev) => {
        return {
          ...prev,
          UDA_VALUE: selectedUDA_VALUE,
        };
      });
    }
  }


  const selectEXCLUDE_UDACTSF = (e, value) => {
    if (e === "Filter") {
      valEXCLUDE_UDACTSF.splice(0, valEXCLUDE_UDACTSF.length);
      valEXCLUDE_UDACTSF.push(...value);
    }

    let selectedEXCLUDE_UDA = [];
    if (value.option) {
      valEXCLUDE_UDACTSF.push(value.option)
      if (String(value.option.EXCLUDE_UDA).includes(inputEXCLUDE_UDACTSF)) {
        setInputEXCLUDE_UDACTSF("");
      }
      if (String(value.option.EXCLUDE_UDA).substring(inputEXCLUDE_UDACTSF)) {
        setInputEXCLUDE_UDACTSF("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valEXCLUDE_UDACTSF.length; i++) {
        if (valEXCLUDE_UDACTSF[i]["EXCLUDE_UDA"] === value.removedValue.EXCLUDE_UDA) {
          index = i;
          break;
        }
      }
      valEXCLUDE_UDACTSF.splice(index, 1);

    } else if (value.action === "clear") {
      valEXCLUDE_UDACTSF.splice(0, valEXCLUDE_UDACTSF.length);
      valEXCLUDE_UDA_VALUECTSF.splice(0, valEXCLUDE_UDA_VALUECTSF.length);
      setSearchDataCTSF((prev) => {
        return {
          ...prev,
          EXCLUDE_UDA_VALUE: [],
        };

      });
    }
    //manual input handle input and filter itemdata
    if (e === 0) {
      valEXCLUDE_UDACTSF.push(value)
    }
    //Filtering EXCLUDE_UDA_VALUE based on EXCLUDE_UDA
    if (valEXCLUDE_UDACTSF.length > 0) {
      //////console.log("valEXCLUDE_UDACTSF",valEXCLUDE_UDACTSF)
      const filterEXCLUDE_UDAValueCTSF = excludeUdaData.filter((item) => {
        return (valEXCLUDE_UDACTSF).some((val) => {
          return item.EXCLUDE_UDA === val.EXCLUDE_UDA;
        });
      });
      //////console.log("filterEXCLUDE_UDAValueCTSF",filterEXCLUDE_UDAValueCTSF)
      setFilterEXCLUDE_UDAValueCTSF(filterEXCLUDE_UDAValueCTSF);
      valEXCLUDE_UDACTSF.map((item) => {
        selectedEXCLUDE_UDA.push(item.EXCLUDE_UDA);
      });
      if (e !== "Filter") {
        setSearchDataCTSF((prev) => {
          return {
            ...prev,
            EXCLUDE_UDA: selectedEXCLUDE_UDA,
          };
        });
      }
      var filter_rem1 = selectedEXCLUDE_UDA.filter(function (i) {
        return this.indexOf(i) < 0;
      },
        searchDataCTSF.EXCLUDE_UDA)

      var filter_rem2 = searchDataCTSF.EXCLUDE_UDA.filter(function (i) {
        return this.indexOf(i) < 0;
      },
        selectedEXCLUDE_UDA)
      //////////console.log("wew",elmts)
      if (filter_rem1.length > 0 || filter_rem2.length > 0) {
        var temp = [];
        filter_rem1.length > 0 ? temp = [...filter_rem1] : temp = [...filter_rem2]
        ////////console.log("wew",temp)
        for (var i = 0; i < temp.length; i++) {////////console.log("Afvsd")
          const index = searchDataCTSF.EXCLUDE_UDA.indexOf(temp[i]);
          if (index > -1) {
            searchDataCTSF.EXCLUDE_UDA.splice(index, 1);
          }
          ////////console.log("searchDataCTSF.EXCLUDE_UDA",searchDataCTSF.EXCLUDE_UDA)
        }
      }
    } else {
      setFilterEXCLUDE_UDAValueCTSF([]);
      setSearchDataCTSF((prev) => {
        return {
          ...prev,
          EXCLUDE_UDA: []
        };
      });
    }
  }


  const selectEXCLUDE_UDA_VALUECTSF = (e, value) => {
    let selectedEXCLUDE_UDA_VALUE = [];
    if (value.option) {
      valEXCLUDE_UDA_VALUECTSF.push(value.option)
      if (String(value.option.EXCLUDE_UDA_VALUE).includes(inputEXCLUDE_UDA_VALUECTSF)) {
        setInputEXCLUDE_UDA_VALUECTSF("");
      }
      if (String(value.option.EXCLUDE_UDA_VALUE).substring(inputEXCLUDE_UDA_VALUECTSF)) {
        setInputEXCLUDE_UDA_VALUECTSF("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valEXCLUDE_UDA_VALUECTSF.length; i++) {
        if (valEXCLUDE_UDA_VALUECTSF[i]["EXCLUDE_UDA_VALUE"] === value.removedValue.EXCLUDE_UDA_VALUE) {
          index = i;
          break;
        }
      }
      valEXCLUDE_UDA_VALUECTSF.splice(index, 1);

    } else if (value.action === "clear") {
      valEXCLUDE_UDA_VALUECTSF.splice(0, valEXCLUDE_UDA_VALUECTSF.length);
    }
    //manual input handle input and filter itemdata
    if (e === 0) {
      valEXCLUDE_UDA_VALUECTSF.push(value);
    }

    //Filtering EXCLUDE_UDA_VALUE based on UDA
    if (valEXCLUDE_UDA_VALUECTSF.length > 0) {

      valEXCLUDE_UDA_VALUECTSF.map((item) => {
        selectedEXCLUDE_UDA_VALUE.push(item.EXCLUDE_UDA_VALUE);
      });
      setSearchDataCTSF((prev) => {
        return {
          ...prev,
          EXCLUDE_UDA_VALUE: selectedEXCLUDE_UDA_VALUE,
        };
      });
    } else {
      setSearchDataCTSF((prev) => {
        return {
          ...prev,
          EXCLUDE_UDA_VALUE: selectedEXCLUDE_UDA_VALUE,
        };
      });
    }
  }

  ///////////////////////////////////////////
  const [openItem, setOpenItem] = React.useState(false);
  const [openDept, setOpenDept] = React.useState(false);
  const [openClass, setOpenClass] = React.useState(false);
  const [openSubclass, setOpenSubclass] = React.useState(false);
  const [openDiffID, setOpenDiffID] = React.useState(false);
  const [openWH, setOpenWH] = React.useState(false);

  /////////////////////////////////////////
  ////////////
  /////////////////////////////////////////
  const handleClickOpenItem = () => {
    setOpenItem(true);
  };
  const handleCloseItem = () => {
    setOpenItem(false);
  };

  const SearchGridAvailITEM = () => (
    <IconButton sx={{ padding: "0px", margin: "0px", border: 0, borderRadius: 0 }} size="small">
      <InfoIcon onClick={handleClickOpenItem} size="small" variant="outlined" sx={{ height: '0.7em', width: '0.7em', color: "CadetBlue" }} />
    </IconButton>
  )

  /////////////////////////////////////////
  ////////////
  /////////////////////////////////////////
  const handleClickOpenDept = () => {
    setOpenDept(true);
  };
  const handleCloseDept = () => {
    setOpenDept(false);
  };

  const SearchGridAvailDept = () => (
    <IconButton sx={{ padding: "0px", margin: "0px", border: 0, borderRadius: 0 }} size="small">
      <InfoIcon onClick={handleClickOpenDept} size="small" variant="outlined" sx={{ height: '0.7em', width: '0.7em', color: "CadetBlue" }} />
    </IconButton>
  )


  /////////////////////////////////////////
  ////////////
  /////////////////////////////////////////
  const handleClickOpenClass = () => {
    setOpenClass(true);
  };
  const handleCloseClass = () => {
    setOpenClass(false);
  };

  const SearchGridAvailClass = () => (
    <IconButton sx={{ padding: "0px", margin: "0px", border: 0, borderRadius: 0 }} size="small">
      <InfoIcon onClick={handleClickOpenClass} size="small" variant="outlined" sx={{ height: '0.7em', width: '0.7em', color: "CadetBlue" }} />
    </IconButton>
  )

  /////////////////////////////////////////
  ////////////
  /////////////////////////////////////////
  const handleClickOpenSubclass = () => {
    setOpenSubclass(true);
  };
  const handleCloseSubclass = () => {
    setOpenSubclass(false);
  };

  const SearchGridAvailSubclass = () => (
    <IconButton sx={{ padding: "0px", margin: "0px", border: 0, borderRadius: 0 }} size="small">
      <InfoIcon onClick={handleClickOpenSubclass} size="small" variant="outlined" sx={{ height: '0.7em', width: '0.7em', color: "CadetBlue" }} />
    </IconButton>
  )


  /////////////////////////////////////////
  ////////////
  /////////////////////////////////////////
  const handleClickOpenDiffID = () => {
    setOpenDiffID(true);
  };
  const handleCloseDiffID = () => {
    setOpenDiffID(false);
  };

  const SearchGridAvailDiffID = () => (
    <IconButton sx={{ padding: "0px", margin: "0px", border: 0, borderRadius: 0 }} size="small">
      <InfoIcon onClick={handleClickOpenDiffID} size="small" variant="outlined" sx={{ height: '0.7em', width: '0.7em', color: "CadetBlue" }} />
    </IconButton>
  )


  /////////////////////////////////////////
  ////////////
  /////////////////////////////////////////
  const handleClickOpenWH = () => {
    setOpenWH(true);
  };
  const handleCloseWH = () => {
    setOpenWH(false);
  };

  const SearchGridAvailWH = () => (
    <IconButton sx={{ padding: "0px", margin: "0px", border: 0, borderRadius: 0 }} size="small">
      <InfoIcon onClick={handleClickOpenWH} size="small" variant="outlined" sx={{ height: '0.7em', width: '0.7em', color: "CadetBlue" }} />
    </IconButton>
  )

  ///////////////////////////////////////
  //HTML CRITERIA//////////////////////
  ///////////////

  const SearchPO = () => (
    <Box
      display="inline-block"
      sx={{
        backgroundColor: "",
        height: "auto",
        // marginLeft: "5px",
        padding: "0rem 0rem",
        width: "100%",
        // border:"1px solid gray",
        // borderRadius:"5px",
      }}
    >
      <div className={CreateAllocationClasses.float_container}>
        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Dept</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              // className= {CreateAllocationClasses.inputField}
              classNamePrefix="mySelect"
              getOptionLabel={option =>
                `${option.HIER1.toString()}-${option.HIER1_DESC.toString()}`}
              getOptionValue={option => option.HIER1}
              options={UniqDept.length > 0 ? UniqDept : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputHIER1CPO(value); // <---
              }}
              inputValue={inputHIER1CPO}
              onChange={selectHIER1}
              maxMenuHeight={180}
              // placeholder={"Choose a Dept"}
              styles={styleSelect}
              components={animatedComponents}
              isMulti
              isClearable={true}
              value={UniqDept.filter(obj => searchDataCPO?.HIER1.includes(obj.HIER1))}
              closeMenuOnSelect={true}
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Class:</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              closeMenuOnSelect={true}
              // className= {CreateAllocationClasses.inputField}
              classNamePrefix="mySelect"
              getOptionLabel={option =>
                `${option.HIER2.toString()}-${option.HIER2_DESC.toString()}`}
              getOptionValue={option => option.HIER2}
              options={(UniqClass.length > 0) ? UniqClass : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputHIER2CPO(value);
              }}
              inputValue={inputHIER2CPO}
              onChange={selectHIER2}
              maxMenuHeight={180}
              // placeholder={"Choose a Class"}
              styles={styleSelect}
              components={animatedComponents}
              isMulti
              value={UniqClass.filter(obj => searchDataCPO?.HIER2.includes(obj.HIER2))}
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCPO["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCPO["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Subclass:</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              closeMenuOnSelect={true}
              // className= {CreateAllocationClasses.inputField}
              classNamePrefix="mySelect"
              getOptionLabel={option =>
                `${option.HIER3.toString()}-${option.HIER3_DESC.toString()}`}
              getOptionValue={option => option.HIER3}
              options={(UniqSubClass.length > 0) ? UniqSubClass : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputHIER3CPO(value);
              }}
              inputValue={inputHIER3CPO}
              onChange={selectHIER3}
              maxMenuHeight={180}
              // placeholder={"Subclass"}
              styles={styleSelect}
              components={animatedComponents}
              isMulti
              // value={searchDataCPO.HIER3}
              value={UniqSubClass.filter(obj => searchDataCPO?.HIER3.includes(obj.HIER3))}
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCPO["HIER1"].length
                  && searchDataCPO["HIER2"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCPO["HIER1"].length
                    && searchDataCPO["HIER2"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              WH:</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.WH.toString()}-(${option.WH_DESC.toString()})`}
              getOptionValue={option => option.WH}
              options={warehouseData.length > 0 ? warehouseData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputWHCPO(value);
              }}
              inputValue={inputWHCPO}
              onChange={selectWH}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={warehouseData.filter(obj => searchDataCPO?.WH.includes(obj.WH))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Supplier:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.SUPPLIER.toString()}-(${option.SUPPLIER_NAME.toString()})`}
              getOptionValue={option => option.SUPPLIER}
              options={supplierData.length > 0 ? supplierData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputSUPPLIERCPO(value);
              }}
              inputValue={inputSUPPLIERCPO}
              onChange={selectSUPPLIER}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={supplierData.filter(obj => searchDataCPO?.SUPPLIER.includes(obj.SUPPLIER))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Supplier Site:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.SUPPLIER_SITE.toString()}-(${option.SUPPLIER_NAME.toString()})`}
              getOptionValue={option => option.SUPPLIER_SITE}
              options={supplerSiteData.length > 0 ? supplerSiteData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputSUPPLIER_SITECPO(value);
              }}
              inputValue={inputSUPPLIER_SITECPO}
              onChange={selectSUPPLIER_SITE}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={supplerSiteData.filter(obj => searchDataCPO?.SUPPLIER_SITE.includes(obj.SUPPLIER_SITE))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)
              }
            />
          </div>
        </div>


        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Pack No:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.PACK_NO.toString()}`}
              getOptionValue={option => option.PACK_NO}
              options={packNoData.length > 0 ? packNoData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputPACK_NOCPO(value);
              }}
              inputValue={inputPACK_NOCPO}
              onChange={selectPACK_NO}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={packNoData.filter(obj => searchDataCPO?.PACK_NO.includes(obj.PACK_NO))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCPO["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCPO["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Item Parent:</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              //disabled={filterItem.length > 0 ?false:true}
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.ITEM_PARENT.toString()}`}
              getOptionValue={option => option.ITEM_PARENT}
              options={(UniqItemParent.length > 0) ? UniqItemParent : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputITEM_PARENTCPO(value);
              }}
              inputValue={inputITEM_PARENTCPO}
              onChange={selectITEM_PARENT}
              maxMenuHeight={180}
              // placeholder={"Choose a ITEM"}
              styles={styleSelect}
              components={animatedComponents}
              isMulti
              value={UniqItemParent.filter(obj => searchDataCPO?.ITEM_PARENT.includes(obj.ITEM_PARENT))}
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCPO["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCPO["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Diff ID:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.DIFF_ID.toString()}`}
              getOptionValue={option => option.DIFF_ID}
              options={diffData.length > 0 ? diffData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputDIFF_IDCPO(value);
              }}
              inputValue={inputDIFF_IDCPO}
              onChange={selectDIFF_ID}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={diffData.filter(obj => searchDataCPO?.DIFF_ID.includes(obj.DIFF_ID))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCPO["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCPO["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Sku:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.SKU.toString()}`}
              getOptionValue={option => option.SKU}
              options={skuData.length > 0 ? skuData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputSKUCPO(value);
              }}
              inputValue={inputSKUCPO}
              onChange={selectSKU}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={skuData.filter(obj => searchDataCPO?.SKU.includes(obj.SKU))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCPO["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCPO["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Item List:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.ITEM_LIST_NO.toString()}-${option.ITEM_LIST_DESC.toString()}`}
              getOptionValue={option => option.ITEM_LIST_NO}
              options={itemListHeadData.length > 0 ? itemListHeadData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputITEM_LIST_NOCPO(value);
              }}
              inputValue={inputITEM_LIST_NOCPO}
              onChange={selectITEM_LIST_NO}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={itemListHeadData.filter(obj => searchDataCPO?.ITEM_LIST_NO.includes(obj.ITEM_LIST_NO))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              VPN:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.VPN.toString()}`}
              getOptionValue={option => option.VPN}
              options={UniqVPN.length > 0 ? UniqVPN : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputVPNCPO(value);
              }}
              inputValue={inputVPNCPO}
              onChange={selectVPN}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={UniqVPN.filter(obj => searchDataCPO?.VPN.includes(obj.VPN))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCPO["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCPO["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              PO:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.PO.toString()}`}
              getOptionValue={option => option.PO}
              options={poData.length > 0 ? poData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputPOCPO(value);
              }}
              inputValue={inputPOCPO}
              onChange={selectPO}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={poData.filter(obj => searchDataCPO?.PO.includes(obj.PO))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            {(isValidCTEDT && searchDataCPO["ESID_TO"].length > 0 && searchDataCPO["ESID_FROM"].length === 0) ||
              (isGreatCTEDF && isGreatCTEDT && searchDataCPO["ESID_TO"].length > 0 && searchDataCPO["ESID_FROM"].length > 0) ?
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left', color: "#b22222" }}>
                EISD From*</InputLabel> :
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                EISD From:</InputLabel>}
          </div>
          <div>
            <TextField
              size="small"
              variant="outlined"
              type="date"
              name="ESID_FROM"
              autoComplete='off'
              helperText=""
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "#f0f0f0"
                }
              }}
              onChange={onChangeCPO}
              value={searchDataCPO.ESID_FROM}
              id="outlined-disabled"
              // label="EISD From"
              InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
              InputProps={{
                style: { fontSize: 12 },
                className: CreateAllocationClasses.inputFielddate,
              }}
              error={
                (isValidCTEDT && searchDataCPO["ESID_TO"].length > 0 && searchDataCPO["ESID_FROM"].length === 0) ||
                (isGreatCTEDF && isGreatCTEDT && searchDataCPO["ESID_TO"].length > 0 && searchDataCPO["ESID_FROM"].length > 0)
              }
              disabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCPO["PO"].length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCPO["PO"].length > 0
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            {(isValidCTEDF && searchDataCPO["ESID_FROM"].length > 0 && searchDataCPO["ESID_TO"].length === 0) ||
              (isGreatCTEDF && isGreatCTEDT && searchDataCPO["ESID_TO"].length > 0 && searchDataCPO["ESID_FROM"].length > 0) ?
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left', color: "#b22222" }}>
                EISD To*</InputLabel> :
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                EISD To:</InputLabel>}
          </div>
          <div>
            <TextField
              size="small"
              type="date"
              name="ESID_TO"
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "#f0f0f0"
                }
              }}
              onChange={onChangeCPO}
              value={searchDataCPO.ESID_TO}
              autoComplete='off'
              id="outlined-disabled"
              // label="EISD To"
              InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
              InputProps={{
                style: { fontSize: 12 },
                className: CreateAllocationClasses.inputFielddate,
              }}
              error={(isValidCTEDF && searchDataCPO["ESID_FROM"].length > 0 && searchDataCPO["ESID_TO"].length === 0) ||
                (isGreatCTEDF && isGreatCTEDT && searchDataCPO["ESID_TO"].length > 0 && searchDataCPO["ESID_FROM"].length > 0)
              }
              disabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCPO["PO"].length > 0
                  // && searchDataCPO["ESID_FROM"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCPO["PO"].length > 0
                    // && searchDataCPO["ESID_FROM"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            {(isValidCTNDT && searchDataCPO["NOT_BEFORE_DATE_TO"].length > 0 && searchDataCPO["NOT_BEFORE_DATE_FROM"].length === 0) ||
              (isGreatCTNDT && isGreatCTNDF && searchDataCPO["NOT_BEFORE_DATE_FROM"].length > 0 && searchDataCPO["NOT_BEFORE_DATE_TO"].length > 0) ?
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left', color: "#b22222" }}>
                Not Before Date From*</InputLabel> :
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                Not Before Date From:</InputLabel>}
          </div>
          <div>
            <TextField
              size="small"
              type="date"
              name="NOT_BEFORE_DATE_FROM"
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "#f0f0f0"
                }
              }}
              onChange={onChangeCPO}
              value={searchDataCPO.NOT_BEFORE_DATE_FROM}
              id="outlined-disabled"
              autoComplete='off'
              // label="Not Before Date From"
              InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
              InputProps={{
                style: { fontSize: 12 },
                className: CreateAllocationClasses.inputFielddate,
              }}
              error={
                (isValidCTNDT && searchDataCPO["NOT_BEFORE_DATE_TO"].length > 0 && searchDataCPO["NOT_BEFORE_DATE_FROM"].length === 0) ||
                (isGreatCTNDT && isGreatCTNDF && searchDataCPO["NOT_BEFORE_DATE_FROM"].length > 0 && searchDataCPO["NOT_BEFORE_DATE_TO"].length > 0)
              }
              disabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCPO["PO"].length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCPO["PO"].length > 0
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            {(isValidCTNDF && searchDataCPO["NOT_BEFORE_DATE_FROM"].length > 0 && searchDataCPO["NOT_BEFORE_DATE_TO"].length === 0) ||
              (isGreatCTNDT && isGreatCTNDF && searchDataCPO["NOT_BEFORE_DATE_FROM"].length > 0 && searchDataCPO["NOT_BEFORE_DATE_TO"].length > 0) ?
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left', color: "#b22222" }}>
                Not Before Date To*</InputLabel> :
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
                Not Before Date To:</InputLabel>}
          </div>
          <div>
            <TextField
              size="small"
              type="date"
              name="NOT_BEFORE_DATE_TO"
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "#f0f0f0"
                }
              }}
              onChange={onChangeCPO}
              value={searchDataCPO.NOT_BEFORE_DATE_TO}
              id="outlined-disabled"
              autoComplete='off'
              // label="Not Before Date To"
              InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
              InputProps={{
                style: { fontSize: 12 },
                className: CreateAllocationClasses.inputFielddate,
              }}
              error={
                (isValidCTNDF && searchDataCPO["NOT_BEFORE_DATE_FROM"].length > 0 && searchDataCPO["NOT_BEFORE_DATE_TO"].length === 0) ||
                (isGreatCTNDT && isGreatCTNDF && searchDataCPO["NOT_BEFORE_DATE_FROM"].length > 0 && searchDataCPO["NOT_BEFORE_DATE_TO"].length > 0)
              }
              disabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCPO["PO"].length > 0
                  // && searchDataCPO["NOT_BEFORE_DATE_FROM"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCPO["PO"].length > 0
                    // && searchDataCPO["NOT_BEFORE_DATE_FROM"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              PO Type:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.PO_TYPE.toString()}`}
              getOptionValue={option => option.PO_TYPE}
              options={UniqPOType.length > 0 ? UniqPOType : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputPO_TYPECPO(value);
              }}
              inputValue={inputPO_TYPECPO}
              onChange={selectPO_TYPE}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={UniqPOType.filter(obj => searchDataCPO?.PO_TYPE.includes(obj.PO_TYPE))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              UDA:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.UDA.toString()}-${option.USER_ATTR_DESC.toString()}`}
              getOptionValue={option => option.UDA}
              options={UniqUDA.length > 0 ? UniqUDA : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputUDACPO(value);
              }}
              inputValue={inputUDACPO}
              onChange={selectUDA}
              maxMenuHeight={180}
              isOptionDisabled={() => valUDACPO.length >= 3}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={UniqUDA.filter(obj => searchDataCPO?.UDA.includes(obj.UDA))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCPO["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCPO["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              UDA Value:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.UDA_VALUE.toString()} (${option.USER_ATTR_VALUE_DESC.toString()})`}
              getOptionValue={option => option.UDA_VALUE}
              options={filterUDAValueCPO.length > 0 ? filterUDAValueCPO : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputUDA_VALUECPO(value);
              }}
              inputValue={inputUDA_VALUECPO}
              onChange={selectUDA_VALUE}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={filterUDAValueCPO.filter(obj => searchDataCPO?.UDA_VALUE.includes(obj.UDA_VALUE))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCPO["HIER1"].length
                  && searchDataCPO["UDA"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCPO["HIER1"].length
                    && searchDataCPO["UDA"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Exclude UDA:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.EXCLUDE_UDA.toString()}-${option.USER_ATTR_DESC.toString()}`}
              getOptionValue={option => option.EXCLUDE_UDA}
              options={UniqExcludeUDA.length > 0 ? UniqExcludeUDA : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputEXCLUDE_UDACPO(value);
              }}
              inputValue={inputEXCLUDE_UDACPO}
              onChange={selectEXCLUDE_UDA}
              maxMenuHeight={180}
              // isOptionDisabled={() => valEXCLUDE_UDACPO.length >= 3}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={UniqExcludeUDA.filter(obj => searchDataCPO?.EXCLUDE_UDA.includes(obj.EXCLUDE_UDA))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCPO["HIER1"].length
                  && searchDataCPO["UDA"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCPO["HIER1"].length
                    && searchDataCPO["UDA"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Exclude UDA Value:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.EXCLUDE_UDA_VALUE.toString()}-${option.USER_ATTR_VALUE_DESC.toString()}`}
              getOptionValue={option => option.EXCLUDE_UDA_VALUE}
              options={filterEXCLUDE_UDAValueCPO.length > 0 ? filterEXCLUDE_UDAValueCPO : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputEXCLUDE_UDA_VALUECPO(value);
              }}
              inputValue={inputEXCLUDE_UDA_VALUECPO}
              onChange={selectEXCLUDE_UDA_VALUE}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={filterEXCLUDE_UDAValueCPO.filter(obj => searchDataCPO?.EXCLUDE_UDA_VALUE.includes(obj.EXCLUDE_UDA_VALUE))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCPO["HIER1"].length
                  && searchDataCPO["EXCLUDE_UDA"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCPO["HIER1"].length
                    && searchDataCPO["EXCLUDE_UDA"].length
                    ? false : true)
              }
            />
          </div>
        </div>

      </div>
    </Box>
  )

  const SearchWH = () => (
    <Box
      display="inline-block"
      sx={{
        backgroundColor: "",
        height: "auto",
        // marginLeft: "5px",
        padding: "0rem 0rem",
        width: "100%",
        // border:"1px solid gray",
        // borderRadius:"5px",
      }}
    >
      <div className={CreateAllocationClasses.float_container}>
        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Dept</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              // className= {CreateAllocationClasses.inputField}
              classNamePrefix="mySelect"
              getOptionLabel={option =>
                `${option.HIER1.toString()}-${option.HIER1_DESC.toString()}`}
              getOptionValue={option => option.HIER1}
              options={UniqDept.length > 0 ? UniqDept : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputHIER1CWH(value); // <---
              }}
              inputValue={inputHIER1CWH}
              onChange={selectHIER1CWH}
              maxMenuHeight={180}
              // placeholder={"Choose a Dept"}
              styles={styleSelect}
              components={animatedComponents}
              isMulti
              isClearable={true}
              value={UniqDept.filter(obj => searchDataCWH?.HIER1.includes(obj.HIER1))}
              closeMenuOnSelect={true}
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Class:</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              closeMenuOnSelect={true}
              // className= {CreateAllocationClasses.inputField}
              classNamePrefix="mySelect"
              getOptionLabel={option =>
                `${option.HIER2.toString()}-${option.HIER2_DESC.toString()}`}
              getOptionValue={option => option.HIER2}
              options={(UniqClass.length > 0) ? UniqClass : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputHIER2CWH(value);
              }}
              inputValue={inputHIER2CWH}
              onChange={selectHIER2CWH}
              maxMenuHeight={180}
              // placeholder={"Choose a Class"}
              styles={styleSelect}
              components={animatedComponents}
              isMulti
              value={UniqClass.filter(obj => searchDataCWH?.HIER2.includes(obj.HIER2))}
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCWH["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCWH["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Subclass:</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              closeMenuOnSelect={true}
              // className= {CreateAllocationClasses.inputField}
              classNamePrefix="mySelect"
              getOptionLabel={option =>
                `${option.HIER3.toString()}-${option.HIER3_DESC.toString()}`}
              getOptionValue={option => option.HIER3}
              options={(UniqSubClass.length > 0) ? UniqSubClass : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputHIER3CWH(value);
              }}
              inputValue={inputHIER3CWH}
              onChange={selectHIER3CWH}
              maxMenuHeight={180}
              // placeholder={"Subclass"}
              styles={styleSelect}
              components={animatedComponents}
              isMulti
              value={UniqSubClass.filter(obj => searchDataCWH?.HIER3.includes(obj.HIER3))}
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCWH["HIER1"].length
                  && searchDataCWH["HIER2"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCWH["HIER1"].length
                    && searchDataCWH["HIER2"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              WH:</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.WH.toString()}-(${option.WH_DESC.toString()})`}
              getOptionValue={option => option.WH}
              options={warehouseData.length > 0 ? warehouseData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputWHCWH(value);
              }}
              inputValue={inputWHCWH}
              onChange={selectWHCWH}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={warehouseData.filter(obj => searchDataCWH?.WH.includes(obj.WH))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Supplier:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.SUPPLIER.toString()}-(${option.SUPPLIER_NAME.toString()})`}
              getOptionValue={option => option.SUPPLIER}
              options={supplierData.length > 0 ? supplierData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputSUPPLIERCWH(value);
              }}
              inputValue={inputSUPPLIERCWH}
              onChange={selectSUPPLIERCWH}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={supplierData.filter(obj => searchDataCWH?.SUPPLIER.includes(obj.SUPPLIER))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Supplier Site:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.SUPPLIER_SITE.toString()}-(${option.SUPPLIER_NAME.toString()})`}
              getOptionValue={option => option.SUPPLIER_SITE}
              options={supplerSiteData.length > 0 ? supplerSiteData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputSUPPLIER_SITECWH(value);
              }}
              inputValue={inputSUPPLIER_SITECWH}
              onChange={selectSUPPLIER_SITECWH}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={supplerSiteData.filter(obj => searchDataCWH?.SUPPLIER_SITE.includes(obj.SUPPLIER_SITE))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)
              }
            />
          </div>
        </div>


        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Pack No:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.PACK_NO.toString()}`}
              getOptionValue={option => option.PACK_NO}
              options={packNoData.length > 0 ? packNoData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputPACK_NOCWH(value);
              }}
              inputValue={inputPACK_NOCWH}
              onChange={selectPACK_NOCWH}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={packNoData.filter(obj => searchDataCWH?.PACK_NO.includes(obj.PACK_NO))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCWH["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCWH["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Item Parent:</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              //disabled={filterItem.length > 0 ?false:true}
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.ITEM_PARENT.toString()}`}
              getOptionValue={option => option.ITEM_PARENT}
              options={(UniqItemParent.length > 0) ? UniqItemParent : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputITEM_PARENTCWH(value);
              }}
              inputValue={inputITEM_PARENTCWH}
              onChange={selectITEM_PARENTCWH}
              maxMenuHeight={180}
              // placeholder={"Choose a ITEM"}
              styles={styleSelect}
              components={animatedComponents}
              isMulti
              value={UniqItemParent.filter(obj => searchDataCWH?.ITEM_PARENT.includes(obj.ITEM_PARENT))}
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCWH["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCWH["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Diff ID:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.DIFF_ID.toString()}`}
              getOptionValue={option => option.DIFF_ID}
              options={diffData.length > 0 ? diffData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputDIFF_IDCWH(value);
              }}
              inputValue={inputDIFF_IDCWH}
              onChange={selectDIFF_IDCWH}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={diffData.filter(obj => searchDataCWH?.DIFF_ID.includes(obj.DIFF_ID))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCWH["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCWH["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Sku:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.SKU.toString()}`}
              getOptionValue={option => option.SKU}
              options={skuData.length > 0 ? skuData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputSKUCWH(value);
              }}
              inputValue={inputSKUCWH}
              onChange={selectSKUCWH}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={skuData.filter(obj => searchDataCWH?.SKU.includes(obj.SKU))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCWH["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCWH["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Item List:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.ITEM_LIST_NO.toString()}-${option.ITEM_LIST_DESC.toString()}`}
              getOptionValue={option => option.ITEM_LIST_NO}
              options={itemListHeadData.length > 0 ? itemListHeadData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputITEM_LIST_NOCWH(value);
              }}
              inputValue={inputITEM_LIST_NOCWH}
              onChange={selectITEM_LIST_NOCWH}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={itemListHeadData.filter(obj => searchDataCWH?.ITEM_LIST_NO.includes(obj.ITEM_LIST_NO))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              VPN:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.VPN.toString()}`}
              getOptionValue={option => option.VPN}
              options={UniqVPN.length > 0 ? UniqVPN : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputVPNCWH(value);
              }}
              inputValue={inputVPNCWH}
              onChange={selectVPNCWH}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={UniqVPN.filter(obj => searchDataCWH?.VPN.includes(obj.VPN))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCWH["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCWH["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Avail Qty &gt;=</InputLabel>
          </div>
          <div>
            <TextField
              size="small"
              name="AVAIL_QTY_GREATER"
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "#f0f0f0"
                }
              }}
              onChange={onChangeCWH}
              value={searchDataCWH.AVAIL_QTY_GREATER}
              id="outlined-disabled"
              autoComplete='off'
              // label="Not Before Date From"
              InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
              InputProps={{
                style: { fontSize: 12 },
                className: CreateAllocationClasses.inputFielddate,
              }}
              disabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCWH["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCWH["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Avail Qty &lt;=</InputLabel>
          </div>
          <div>
            <TextField
              size="small"
              name="AVAIL_QTY_LESS"
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "#f0f0f0"
                }
              }}
              onChange={onChangeCWH}
              value={searchDataCWH.AVAIL_QTY_LESS}
              id="outlined-disabled"
              autoComplete='off'
              // label="Not Before Date To"
              InputLabelProps={{ style: { fontSize: "12px" }, shrink: "true" }}
              InputProps={{
                style: { fontSize: 12 },
                className: CreateAllocationClasses.inputFielddate,
              }}
              disabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCWH["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCWH["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>


        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              UDA:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.UDA.toString()}-${option.USER_ATTR_DESC.toString()}`}
              getOptionValue={option => option.UDA}
              options={UniqUDA.length > 0 ? UniqUDA : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputUDACWH(value);
              }}
              inputValue={inputUDACWH}
              onChange={selectUDACWH}
              maxMenuHeight={180}
              isOptionDisabled={() => valUDACWH.length >= 3}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={UniqUDA.filter(obj => searchDataCWH?.UDA.includes(obj.UDA))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCWH["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCWH["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              UDA Value:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.UDA_VALUE.toString()} (${option.USER_ATTR_VALUE_DESC.toString()})`}
              getOptionValue={option => option.UDA_VALUE}
              options={filterUDAValueCWH.length > 0 ? filterUDAValueCWH : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputUDA_VALUECWH(value);
              }}
              inputValue={inputUDA_VALUECWH}
              onChange={selectUDA_VALUECWH}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={filterUDAValueCWH.filter(obj => searchDataCWH?.UDA_VALUE.includes(obj.UDA_VALUE))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCWH["HIER1"].length
                  && searchDataCWH["UDA"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCWH["HIER1"].length
                    && searchDataCWH["UDA"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Exclude UDA:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.EXCLUDE_UDA.toString()}-${option.USER_ATTR_DESC.toString()}`}
              getOptionValue={option => option.EXCLUDE_UDA}
              options={UniqExcludeUDA.length > 0 ? UniqExcludeUDA : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputEXCLUDE_UDACWH(value);
              }}
              inputValue={inputEXCLUDE_UDACWH}
              onChange={selectEXCLUDE_UDACWH}
              maxMenuHeight={180}
              isOptionDisabled={() => valEXCLUDE_UDACWH.length >= 3}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={UniqExcludeUDA.filter(obj => searchDataCWH?.EXCLUDE_UDA.includes(obj.EXCLUDE_UDA))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCWH["HIER1"].length
                  && searchDataCWH["UDA"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCWH["HIER1"].length
                    && searchDataCWH["UDA"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Exclude UDA Value:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.EXCLUDE_UDA_VALUE.toString()}-${option.USER_ATTR_VALUE_DESC.toString()}`}
              getOptionValue={option => option.EXCLUDE_UDA_VALUE}
              options={filterEXCLUDE_UDAValueCWH.length > 0 ? filterEXCLUDE_UDAValueCWH : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputEXCLUDE_UDA_VALUECWH(value);
              }}
              inputValue={inputEXCLUDE_UDA_VALUECWH}
              onChange={selectEXCLUDE_UDA_VALUECWH}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={filterEXCLUDE_UDAValueCWH.filter(obj => searchDataCWH?.EXCLUDE_UDA_VALUE.includes(obj.EXCLUDE_UDA_VALUE))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCWH["HIER1"].length
                  && searchDataCWH["EXCLUDE_UDA"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCWH["HIER1"].length
                    && searchDataCWH["EXCLUDE_UDA"].length
                    ? false : true)
              }
            />
          </div>
        </div>

      </div>
    </Box>
  )

  const SearchASN = () => (
    <Box
      display="inline-block"
      sx={{
        backgroundColor: "",
        height: "auto",
        margin: "0rem",
        padding: "0rem 0rem",
        width: "100%",
        // border:"1px solid gray",
        // borderRadius:"5px",
      }}
    >
      <div className={CreateAllocationClasses.float_container}>
        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Dept</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              // className= {CreateAllocationClasses.inputField}
              classNamePrefix="mySelect"
              getOptionLabel={option =>
                `${option.HIER1.toString()}-${option.HIER1_DESC.toString()}`}
              getOptionValue={option => option.HIER1}
              options={UniqDept.length > 0 ? UniqDept : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputHIER1CASN(value); // <---
              }}
              inputValue={inputHIER1CASN}
              onChange={selectHIER1CASN}
              maxMenuHeight={180}
              // placeholder={"Choose a Dept"}
              styles={styleSelect}
              components={animatedComponents}
              isMulti
              isClearable={true}
              value={UniqDept.filter(obj => searchDataCASN?.HIER1.includes(obj.HIER1))}
              closeMenuOnSelect={true}
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Class:</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              closeMenuOnSelect={true}
              // className= {CreateAllocationClasses.inputField}
              classNamePrefix="mySelect"
              getOptionLabel={option =>
                `${option.HIER2.toString()}-${option.HIER2_DESC.toString()}`}
              getOptionValue={option => option.HIER2}
              options={(UniqClass.length > 0) ? UniqClass : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputHIER2CASN(value);
              }}
              inputValue={inputHIER2CASN}
              onChange={selectHIER2CASN}
              maxMenuHeight={180}
              // placeholder={"Choose a Class"}
              styles={styleSelect}
              components={animatedComponents}
              isMulti
              value={UniqClass.filter(obj => searchDataCASN?.HIER2.includes(obj.HIER2))}
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCASN["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCASN["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Subclass:</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              closeMenuOnSelect={true}
              // className= {CreateAllocationClasses.inputField}
              classNamePrefix="mySelect"
              getOptionLabel={option =>
                `${option.HIER3.toString()}-${option.HIER3_DESC.toString()}`}
              getOptionValue={option => option.HIER3}
              options={(UniqSubClass.length > 0) ? UniqSubClass : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputHIER3CASN(value);
              }}
              inputValue={inputHIER3CASN}
              onChange={selectHIER3CASN}
              maxMenuHeight={180}
              // placeholder={"Subclass"}
              styles={styleSelect}
              components={animatedComponents}
              isMulti
              value={UniqSubClass.filter(obj => searchDataCASN?.HIER3.includes(obj.HIER3))}
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCASN["HIER1"].length
                  && searchDataCASN["HIER2"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCASN["HIER1"].length
                    && searchDataCASN["HIER2"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              WH:</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.WH.toString()}-(${option.WH_DESC.toString()})`}
              getOptionValue={option => option.WH}
              options={warehouseData.length > 0 ? warehouseData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputWHCASN(value);
              }}
              inputValue={inputWHCASN}
              onChange={selectWHCASN}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={warehouseData.filter(obj => searchDataCASN?.WH.includes(obj.WH))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Supplier:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.SUPPLIER.toString()}-(${option.SUPPLIER_NAME.toString()})`}
              getOptionValue={option => option.SUPPLIER}
              options={supplierData.length > 0 ? supplierData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputSUPPLIERCASN(value);
              }}
              inputValue={inputSUPPLIERCASN}
              onChange={selectSUPPLIERCASN}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={supplierData.filter(obj => searchDataCASN?.SUPPLIER.includes(obj.SUPPLIER))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Supplier Site:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.SUPPLIER_SITE.toString()}-(${option.SUPPLIER_NAME.toString()})`}
              getOptionValue={option => option.SUPPLIER_SITE}
              options={supplerSiteData.length > 0 ? supplerSiteData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputSUPPLIER_SITECASN(value);
              }}
              inputValue={inputSUPPLIER_SITECASN}
              onChange={selectSUPPLIER_SITECASN}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={supplerSiteData.filter(obj => searchDataCASN?.SUPPLIER_SITE.includes(obj.SUPPLIER_SITE))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)
              }
            />
          </div>
        </div>


        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Pack No:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.PACK_NO.toString()}`}
              getOptionValue={option => option.PACK_NO}
              options={packNoData.length > 0 ? packNoData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputPACK_NOCASN(value);
              }}
              inputValue={inputPACK_NOCASN}
              onChange={selectPACK_NOCASN}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={packNoData.filter(obj => searchDataCASN?.PACK_NO.includes(obj.PACK_NO))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCASN["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCASN["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Item Parent:</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              //disabled={filterItem.length > 0 ?false:true}
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.ITEM_PARENT.toString()}`}
              getOptionValue={option => option.ITEM_PARENT}
              options={(UniqItemParent.length > 0) ? UniqItemParent : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputITEM_PARENTCASN(value);
              }}
              inputValue={inputITEM_PARENTCASN}
              onChange={selectITEM_PARENTCASN}
              maxMenuHeight={180}
              // placeholder={"Choose a ITEM"}
              styles={styleSelect}
              components={animatedComponents}
              isMulti
              value={UniqItemParent.filter(obj => searchDataCASN?.ITEM_PARENT.includes(obj.ITEM_PARENT))}
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCASN["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCASN["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Diff ID:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.DIFF_ID.toString()}`}
              getOptionValue={option => option.DIFF_ID}
              options={diffData.length > 0 ? diffData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputDIFF_IDCASN(value);
              }}
              inputValue={inputDIFF_IDCASN}
              onChange={selectDIFF_IDCASN}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={diffData.filter(obj => searchDataCASN?.DIFF_ID.includes(obj.DIFF_ID))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCASN["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCASN["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Sku:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.SKU.toString()}`}
              getOptionValue={option => option.SKU}
              options={skuData.length > 0 ? skuData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputSKUCASN(value);
              }}
              inputValue={inputSKUCASN}
              onChange={selectSKUCASN}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={skuData.filter(obj => searchDataCASN?.SKU.includes(obj.SKU))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCASN["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCASN["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Item List:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.ITEM_LIST_NO.toString()}-${option.ITEM_LIST_DESC.toString()}`}
              getOptionValue={option => option.ITEM_LIST_NO}
              options={itemListHeadData.length > 0 ? itemListHeadData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputITEM_LIST_NOCASN(value);
              }}
              inputValue={inputITEM_LIST_NOCASN}
              onChange={selectITEM_LIST_NOCASN}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={itemListHeadData.filter(obj => searchDataCASN?.ITEM_LIST_NO.includes(obj.ITEM_LIST_NO))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              VPN:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.VPN.toString()}`}
              getOptionValue={option => option.VPN}
              options={UniqVPN.length > 0 ? UniqVPN : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputVPNCASN(value);
              }}
              inputValue={inputVPNCASN}
              onChange={selectVPNCASN}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={UniqVPN.filter(obj => searchDataCASN?.VPN.includes(obj.VPN))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCASN["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCASN["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              ASN:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.ASN.toString()}`}
              getOptionValue={option => option.ASN}
              options={asnData.length > 0 ? asnData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputASNCASN(value);
              }}
              inputValue={inputASNCASN}
              onChange={selectASNCASN}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={asnData.filter(obj => searchDataCASN?.ASN.includes(obj.ASN))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCASN["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCASN["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>


        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              UDA:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.UDA.toString()}-${option.USER_ATTR_DESC.toString()}`}
              getOptionValue={option => option.UDA}
              options={UniqUDA.length > 0 ? UniqUDA : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputUDACASN(value);
              }}
              inputValue={inputUDACASN}
              onChange={selectUDACASN}
              maxMenuHeight={180}
              isOptionDisabled={() => valUDACASN.length >= 3}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={UniqUDA.filter(obj => searchDataCASN?.UDA.includes(obj.UDA))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCASN["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCASN["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              UDA Value:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.UDA_VALUE.toString()} (${option.USER_ATTR_VALUE_DESC.toString()})`}
              getOptionValue={option => option.UDA_VALUE}
              options={filterUDAValueCASN.length > 0 ? filterUDAValueCASN : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputUDA_VALUECASN(value);
              }}
              inputValue={inputUDA_VALUECASN}
              onChange={selectUDA_VALUECASN}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={filterUDAValueCASN.filter(obj => searchDataCASN?.UDA_VALUE.includes(obj.UDA_VALUE))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCASN["HIER1"].length
                  && searchDataCASN["UDA"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCASN["HIER1"].length
                    && searchDataCASN["UDA"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Exclude UDA:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.EXCLUDE_UDA.toString()}-${option.USER_ATTR_DESC.toString()}`}
              getOptionValue={option => option.EXCLUDE_UDA}
              options={UniqExcludeUDA.length > 0 ? UniqExcludeUDA : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputEXCLUDE_UDACASN(value);
              }}
              inputValue={inputEXCLUDE_UDACASN}
              onChange={selectEXCLUDE_UDACASN}
              maxMenuHeight={180}
              isOptionDisabled={() => valEXCLUDE_UDACASN.length >= 3}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={UniqExcludeUDA.filter(obj => searchDataCASN?.EXCLUDE_UDA.includes(obj.EXCLUDE_UDA))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCASN["HIER1"].length
                  && searchDataCASN["UDA"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCASN["HIER1"].length
                    && searchDataCASN["UDA"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Exclude UDA Value:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.EXCLUDE_UDA_VALUE.toString()}-${option.USER_ATTR_VALUE_DESC.toString()}`}
              getOptionValue={option => option.EXCLUDE_UDA_VALUE}
              options={filterEXCLUDE_UDAValueCASN.length > 0 ? filterEXCLUDE_UDAValueCASN : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputEXCLUDE_UDA_VALUECASN(value);
              }}
              inputValue={inputEXCLUDE_UDA_VALUECASN}
              onChange={selectEXCLUDE_UDA_VALUECASN}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={filterEXCLUDE_UDAValueCASN.filter(obj => searchDataCASN?.EXCLUDE_UDA_VALUE.includes(obj.EXCLUDE_UDA_VALUE))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCASN["HIER1"].length
                  && searchDataCASN["EXCLUDE_UDA"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCASN["HIER1"].length
                    && searchDataCASN["EXCLUDE_UDA"].length
                    ? false : true)
              }
            />
          </div>
        </div>

      </div>
    </Box>
  )

  const SearchTSF = () => (
    <Box
      display="inline-block"
      sx={{
        backgroundColor: "",
        height: "auto",
        margin: "0rem",
        padding: "0rem 0rem",
        width: "100%",
        // border:"1px solid gray",
        // borderRadius:"5px",
      }}
    >
      <div className={CreateAllocationClasses.float_container}>
        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Dept</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              // className= {CreateAllocationClasses.inputField}
              classNamePrefix="mySelect"
              getOptionLabel={option =>
                `${option.HIER1.toString()}-${option.HIER1_DESC.toString()}`}
              getOptionValue={option => option.HIER1}
              options={UniqDept.length > 0 ? UniqDept : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputHIER1CTSF(value); // <---
              }}
              inputValue={inputHIER1CTSF}
              onChange={selectHIER1CTSF}
              maxMenuHeight={180}
              // placeholder={"Choose a Dept"}
              styles={styleSelect}
              components={animatedComponents}
              isMulti
              isClearable={true}
              value={UniqDept.filter(obj => searchDataCTSF?.HIER1.includes(obj.HIER1))}
              closeMenuOnSelect={true}
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Class:</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              closeMenuOnSelect={true}
              // className= {CreateAllocationClasses.inputField}
              classNamePrefix="mySelect"
              getOptionLabel={option =>
                `${option.HIER2.toString()}-${option.HIER2_DESC.toString()}`}
              getOptionValue={option => option.HIER2}
              options={(UniqClass.length > 0) ? UniqClass : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputHIER2CTSF(value);
              }}
              inputValue={inputHIER2CTSF}
              onChange={selectHIER2CTSF}
              maxMenuHeight={180}
              // placeholder={"Choose a Class"}
              styles={styleSelect}
              components={animatedComponents}
              isMulti
              value={UniqClass.filter(obj => searchDataCTSF?.HIER2.includes(obj.HIER2))}
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCTSF["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCTSF["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Subclass:</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              closeMenuOnSelect={true}
              // className= {CreateAllocationClasses.inputField}
              classNamePrefix="mySelect"
              getOptionLabel={option =>
                `${option.HIER3.toString()}-${option.HIER3_DESC.toString()}`}
              getOptionValue={option => option.HIER3}
              options={(UniqSubClass.length > 0) ? UniqSubClass : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputHIER3CTSF(value);
              }}
              inputValue={inputHIER3CTSF}
              onChange={selectHIER3CTSF}
              maxMenuHeight={180}
              // placeholder={"Subclass"}
              styles={styleSelect}
              components={animatedComponents}
              isMulti
              value={UniqSubClass.filter(obj => searchDataCTSF?.HIER3.includes(obj.HIER3))}
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCTSF["HIER1"].length
                  && searchDataCTSF["HIER2"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCTSF["HIER1"].length
                    && searchDataCTSF["HIER2"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              WH:</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.WH.toString()}-(${option.WH_DESC.toString()})`}
              getOptionValue={option => option.WH}
              options={warehouseData.length > 0 ? warehouseData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputWHCTSF(value);
              }}
              inputValue={inputWHCTSF}
              onChange={selectWHCTSF}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={warehouseData.filter(obj => searchDataCTSF?.WH.includes(obj.WH))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Supplier:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.SUPPLIER.toString()}-(${option.SUPPLIER_NAME.toString()})`}
              getOptionValue={option => option.SUPPLIER}
              options={supplierData.length > 0 ? supplierData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputSUPPLIERCTSF(value);
              }}
              inputValue={inputSUPPLIERCTSF}
              onChange={selectSUPPLIERCTSF}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={supplierData.filter(obj => searchDataCTSF?.SUPPLIER.includes(obj.SUPPLIER))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Supplier Site:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.SUPPLIER_SITE.toString()}-(${option.SUPPLIER_NAME.toString()})`}
              getOptionValue={option => option.SUPPLIER_SITE}
              options={supplerSiteData.length > 0 ? supplerSiteData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputSUPPLIER_SITECTSF(value);
              }}
              inputValue={inputSUPPLIER_SITECTSF}
              onChange={selectSUPPLIER_SITECTSF}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={supplerSiteData.filter(obj => searchDataCTSF?.SUPPLIER_SITE.includes(obj.SUPPLIER_SITE))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)
              }
            />
          </div>
        </div>


        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Pack No:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.PACK_NO.toString()}`}
              getOptionValue={option => option.PACK_NO}
              options={packNoData.length > 0 ? packNoData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputPACK_NOCTSF(value);
              }}
              inputValue={inputPACK_NOCTSF}
              onChange={selectPACK_NOCTSF}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={packNoData.filter(obj => searchDataCTSF?.PACK_NO.includes(obj.PACK_NO))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCTSF["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCTSF["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Item Parent:</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              //disabled={filterItem.length > 0 ?false:true}
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.ITEM_PARENT.toString()}`}
              getOptionValue={option => option.ITEM_PARENT}
              options={(UniqItemParent.length > 0) ? UniqItemParent : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputITEM_PARENTCTSF(value);
              }}
              inputValue={inputITEM_PARENTCTSF}
              onChange={selectITEM_PARENTCTSF}
              maxMenuHeight={180}
              // placeholder={"Choose a ITEM"}
              styles={styleSelect}
              components={animatedComponents}
              isMulti
              value={UniqItemParent.filter(obj => searchDataCTSF?.ITEM_PARENT.includes(obj.ITEM_PARENT))}
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCTSF["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCTSF["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Diff ID:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.DIFF_ID.toString()}`}
              getOptionValue={option => option.DIFF_ID}
              options={diffData.length > 0 ? diffData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputDIFF_IDCTSF(value);
              }}
              inputValue={inputDIFF_IDCTSF}
              onChange={selectDIFF_IDCTSF}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={diffData.filter(obj => searchDataCTSF?.DIFF_ID.includes(obj.DIFF_ID))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCTSF["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCTSF["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Sku:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.SKU.toString()}`}
              getOptionValue={option => option.SKU}
              options={skuData.length > 0 ? skuData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputSKUCTSF(value);
              }}
              inputValue={inputSKUCTSF}
              onChange={selectSKUCTSF}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={skuData.filter(obj => searchDataCTSF?.SKU.includes(obj.SKU))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCTSF["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCTSF["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Item List:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.ITEM_LIST_NO.toString()}-${option.ITEM_LIST_DESC.toString()}`}
              getOptionValue={option => option.ITEM_LIST_NO}
              options={itemListHeadData.length > 0 ? itemListHeadData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputITEM_LIST_NOCTSF(value);
              }}
              inputValue={inputITEM_LIST_NOCTSF}
              onChange={selectITEM_LIST_NOCTSF}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={itemListHeadData.filter(obj => searchDataCTSF?.ITEM_LIST_NO.includes(obj.ITEM_LIST_NO))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              VPN:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.VPN.toString()}`}
              getOptionValue={option => option.VPN}
              options={UniqVPN.length > 0 ? UniqVPN : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputVPNCTSF(value);
              }}
              inputValue={inputVPNCTSF}
              onChange={selectVPNCTSF}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={UniqVPN.filter(obj => searchDataCTSF?.VPN.includes(obj.VPN))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCTSF["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCTSF["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Transfer:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.TSF.toString()}`}
              getOptionValue={option => option.TSF}
              options={tsfData.length > 0 ? tsfData : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputTSFCTSF(value);
              }}
              inputValue={inputTSFCTSF}
              onChange={selectTSFCTSF}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={tsfData.filter(obj => searchDataCTSF?.TSF.includes(obj.TSF))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCTSF["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCTSF["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>


        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              UDA:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.UDA.toString()}-${option.USER_ATTR_DESC.toString()}`}
              getOptionValue={option => option.UDA}
              options={UniqUDA.length > 0 ? UniqUDA : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputUDACTSF(value);
              }}
              inputValue={inputUDACTSF}
              onChange={selectUDACTSF}
              maxMenuHeight={180}
              isOptionDisabled={() => valUDACTSF.length >= 3}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={UniqUDA.filter(obj => searchDataCTSF?.UDA.includes(obj.UDA))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCTSF["HIER1"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCTSF["HIER1"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              UDA Value:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.UDA_VALUE.toString()} (${option.USER_ATTR_VALUE_DESC.toString()})`}
              getOptionValue={option => option.UDA_VALUE}
              options={filterUDAValueCTSF.length > 0 ? filterUDAValueCTSF : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputUDA_VALUECTSF(value);
              }}
              inputValue={inputUDA_VALUECTSF}
              onChange={selectUDA_VALUECTSF}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={filterUDAValueCTSF.filter(obj => searchDataCTSF?.UDA_VALUE.includes(obj.UDA_VALUE))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCTSF["HIER1"].length
                  && searchDataCTSF["UDA"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCTSF["HIER1"].length
                    && searchDataCTSF["UDA"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Exclude UDA:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.EXCLUDE_UDA.toString()}-${option.USER_ATTR_DESC.toString()}`}
              getOptionValue={option => option.EXCLUDE_UDA}
              options={UniqExcludeUDA.length > 0 ? UniqExcludeUDA : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputEXCLUDE_UDACTSF(value);
              }}
              inputValue={inputEXCLUDE_UDACTSF}
              onChange={selectEXCLUDE_UDACTSF}
              maxMenuHeight={180}
              isOptionDisabled={() => valEXCLUDE_UDACTSF.length >= 3}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={UniqExcludeUDA.filter(obj => searchDataCTSF?.EXCLUDE_UDA.includes(obj.EXCLUDE_UDA))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCTSF["HIER1"].length
                  && searchDataCTSF["UDA"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCTSF["HIER1"].length
                    && searchDataCTSF["UDA"].length
                    ? false : true)
              }
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 0px 0px", display: 'inline', float: 'left' }}>
              Exclude UDA Value:</InputLabel>
          </div>
          <div>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.EXCLUDE_UDA_VALUE.toString()}-${option.USER_ATTR_VALUE_DESC.toString()}`}
              getOptionValue={option => option.EXCLUDE_UDA_VALUE}
              options={filterEXCLUDE_UDAValueCTSF.length > 0 ? filterEXCLUDE_UDAValueCTSF : []}
              isSearchable={true}
              onInputChange={(value, action) => {
                if (action.action === "input-change") setInputEXCLUDE_UDA_VALUECTSF(value);
              }}
              inputValue={inputEXCLUDE_UDA_VALUECTSF}
              onChange={selectEXCLUDE_UDA_VALUECTSF}
              maxMenuHeight={180}
              // placeholder={"Choose a Warehouse"}
              styles={styleSelect}
              components={animatedComponents}
              value={filterEXCLUDE_UDAValueCTSF.filter(obj => searchDataCTSF?.EXCLUDE_UDA_VALUE.includes(obj.EXCLUDE_UDA_VALUE))}
              isMulti
              isDisabled={(searchHeaderData["CONTEXT"] === "PROM") ? (
                searchHeaderData["ALLOC_DESC"].length > 0
                  && searchHeaderData["ALLOC_LEVEL"].length > 0
                  && searchHeaderData["CONTEXT"].length > 0
                  && searchHeaderData["ALLOC_TYPE"].length > 0
                  && searchHeaderData["RELEASE_DATE"].length > 0
                  && searchHeaderData["PROMOTION"].toString().length > 0
                  && searchDataCTSF["HIER1"].length
                  && searchDataCTSF["EXCLUDE_UDA"].length
                  ? false : true)
                :
                (
                  searchHeaderData["ALLOC_DESC"].length > 0
                    && searchHeaderData["ALLOC_LEVEL"].length > 0
                    && searchHeaderData["CONTEXT"].length > 0
                    && searchHeaderData["ALLOC_TYPE"].length > 0
                    && searchHeaderData["RELEASE_DATE"].length > 0
                    && searchDataCTSF["HIER1"].length
                    && searchDataCTSF["EXCLUDE_UDA"].length
                    ? false : true)
              }

            />
          </div>
        </div>

      </div>
    </Box>
  )

  const SearchWhatIf = () => (
    <Box
      display="inline-block"
      sx={{
        backgroundColor: "",
        height: "auto",
        margin: "0rem",
        padding: "0rem 0rem",
        width: "100%",
        // border:"1px solid gray",
        // borderRadius:"5px",
      }}
    >
      <div className={CreateAllocationClasses.float_container}>
        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Dept:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="Dept"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Class:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="Class"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Subclass:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="Subclass"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          WH:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="WH"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Supplier:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="Supplier"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Supplier Site:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="Supplier Site"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Pack No:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="Pack No"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Item Parent:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="Item Parent"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Diff ID:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="Diff ID"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Sku:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="Sku"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Item List:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="Item List"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          VPN:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="VPN"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Avail Qty &gt;=:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="Avail Qty &gt;="
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
        Avail Qty &lt;=:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="Avail Qty &lt;="
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          UDA1:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="UDA1"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          UDA1 Value:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="UDA1 Value"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          UDA2:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="UDA2"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          UDA2 Value:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="UDA2 Value"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          UDA3:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="UDA3"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          UDA3 Value:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="UDA3 Value"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Exclude UDA:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="Exclude UDA"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

        <div className={CreateAllocationClasses.float_child}>
          {/* <InputLabel sx={{fontWeight:"bold",fontSize:"12px",margin:"5px 0px 0px 0px", display: 'inline', float: 'left'}}>
          Exclude UDA Value:</InputLabel> */}
          <TextField
            size="small"
            sx={{ margin: "0px 0px 0px 0px" }}
            id="outlined-disabled"
            label="Exclude UDA Value"
            InputLabelProps={{ style: { fontSize: "12px" } }}
            InputProps={{
              style: { fontSize: 12 },
              className: CreateAllocationClasses.inputField,
            }}
          />
        </div>

      </div>
    </Box>
  )

  const SearchButtonGrid = () => (
    <Box
      display="flex"
      sx={{
        backgroundColor: "",
        height: "auto",
        width: "100%",
        padding: "5px 0px 0px 0px",
        justifyContent: "end"
      }}
    >
      <div className={CreateAllocationClasses.grid_container}>
        <div className={CreateAllocationClasses.grid_child}>
          <Button sx={{ backgroundColor: "", fontSize: "12px" }}
            variant="contained"
            className={CreateAllocationClasses.textField}
            type="submit"
            onClick={SubmitList}
          >
            Add</Button>
        </div>
        {/* <div className={CreateAllocationClasses.grid_child}>
          <Button sx={{ backgroundColor: "", fontSize: "12px" }}
            variant="contained"
            className={CreateAllocationClasses.textField}
            type="submit"
            onClick={SubmitTableList}
          >
            Apply</Button>
        </div> */}
        <div className={CreateAllocationClasses.grid_child}>
          <Button
            sx={{
              backgroundColor: "", fontSize: "12px"
            }}
            variant="contained"
            onClick={handleDelete}
          >Delete</Button>
        </div>
        <div className={CreateAllocationClasses.grid_child}>
          <Button sx={{ backgroundColor: "", fontSize: "12px" }} variant="contained">Errors</Button>
        </div>
        <div className={CreateAllocationClasses.grid_child}>
          <Button sx={{ backgroundColor: "", fontSize: "12px" }} variant="contained">Split</Button>
        </div>
        <div className={CreateAllocationClasses.grid_child}>
          <Button
            sx={{
              backgroundColor: "", fontSize: "12px"
            }}
            variant="contained"
            onClick={RefreshTableGrid}
          >Refresh Grid</Button>
        </div>
      </div>
    </Box>
  )

  const SearchButton = () => (
    <Box
      display="inline-block"
      sx={{
        backgroundColor: "",
        height: "auto",
        margin: "0rem",
        padding: "5px 0px 10px 0px",
        width: "100%",
      }}
    >
      <div className={CreateAllocationClasses.float_container}>
        <div className={CreateAllocationClasses.grid_child}>
          <Button
            sx={{
              fontSize: "12px",
              backgroundColor: "MediumSeaGreen",
            }}
            variant="contained">
            Submit</Button>
        </div>
        <div className={CreateAllocationClasses.grid_child}>
          <Button sx={{ backgroundColor: "rgb(255, 0, 9)", fontSize: "12px" }} variant="contained">Cancel</Button>
        </div>
        <div className={CreateAllocationClasses.grid_child}>
          <Button
            sx={{
              backgroundColor: "", fontSize: "12px"
            }}
            variant="contained"
            onClick={RefreshGrid}
          >Refresh</Button>
        </div>
      </div>
    </Box>
  )

  const SearchHeader = () => (
    <Box
      component="fieldset"
      display="inline-block"
      sx={{
        backgroundColor: "",
        height: "auto",
        width: "100%",
        // backgroundColor: "rgb(250, 250, 250)",
        borderRadius: 1,

        boxShadow: 2, border: 0,
        borderBottom: 3,
        border: "1px solid lightgrey",
        // border:"1px dotted gray",
        // borderRadius:"5px",
      }}
    >
      <legend style={{ fontWeight: "bold" }}>Header</legend>
      {/* <div>
      <InputLabel sx={{ fontWeight: "bold", fontSize: "16px", margin: "2px 0px 5px 5px", float: 'left', color: "black" }}>
        Header</InputLabel>
        </div> */}

      <div className={CreateAllocationClasses.header_container}>
        <div className={CreateAllocationClasses.header_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
              Allocation ID</InputLabel>
          </div>
          <div>
            <TextField
              size="small"
              sx={{
                margin: "0px 0px 10px 2px", width: "200px"
                , "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "#f0f0f0"
                }
              }}
              disabled
              name="ALLOC_NO"
              value={searchHeaderData.ALLOC_NO = allocNoData["ALLOC_NO"]}
              // onChange={onChange}
              id="outlined-disabled"
              defaultValue={allocNoData["ALLOC_NO"]}
              InputProps={{
                style: { fontSize: 12 },
                className: CreateAllocationClasses.input,
              }}
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.header_child}>
          <div>
            {(isValid && searchHeaderData.ALLOC_DESC.length === 0) ?
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left', color: "#b22222" }}>
                Desc*</InputLabel> :
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                Desc</InputLabel>}
          </div>
          <div>
            <TextField
              size="small"
              sx={{
                margin: "0px 0px 10px 2px", width: "30vh"
                , "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "#f0f0f0"
                },

              }}
              id="outlined-disabled"
              name="ALLOC_DESC"
              autoComplete='off'
              value={searchHeaderData.ALLOC_DESC}
              defaultValue=""
              onChange={onChange}
              inputProps={{
                maxLength: 100,
              }}
              required
              InputProps={{
                className: CreateAllocationClasses.input,
                style: { fontSize: 12 },
              }}
              disabled={headerDis}
              error={searchHeaderData.ALLOC_DESC.length === 0 && isValid}
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.header_child}>
          <div>
            {(isValid && searchHeaderData.CONTEXT.length === 0) ?
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left', color: "#b22222" }}>
                Context Type*</InputLabel> :
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                Context Type</InputLabel>}
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              // className= {CreateAllocationClasses.inputField}
              classNamePrefix="mySelect"
              getOptionLabel={option =>
                `${option.CONTEXT.toString()}`}
              getOptionValue={option => option.CONTEXT}
              options={contextTypeData.length > 0 ? contextTypeData : []}
              isSearchable={true}
              onChange={selectCONTEXT_TYPE}
              maxMenuHeight={180}
              // placeholder={"Choose a Dept"}
              styles={(isValid && searchHeaderData.CONTEXT.length === 0) ? styleSelect2 : styleSelect1}
              components={animatedComponents}
              // isClearable={true}
              value={contextTypeData.filter(obj => searchHeaderData?.CONTEXT_CODE === (obj.CONTEXT))}
              closeMenuOnSelect={true}
              isDisabled={headerDis}
              theme={(isValid && searchHeaderData.CONTEXT.length === 0) ? theme => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  neutral50: '#b22222',  // Placeholder color //slategrey
                },
              }) : false}
            />
          </div>
        </div>

        {searchHeaderData.CONTEXT_CODE === "Promotion" ?
          [
            <div className={CreateAllocationClasses.header_child}>
              <div>
                {(isValid && searchHeaderData.PROMOTION.length === 0) ?
                  <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left', color: "#b22222" }}>
                    Promotion*</InputLabel> :
                  <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                    Promotion</InputLabel>}
              </div>
              <div className={CreateAllocationClasses.multiselectfield}>
                <Select
                  // className= {CreateAllocationClasses.inputField}
                  classNamePrefix="mySelect"
                  getOptionLabel={option =>
                    `${option.PROMOTION.toString()} -${option.DESCRIPTION.toString()} (${option.START_DATE.toString()})-(${option.END_DATE.toString()})`}
                  getOptionValue={option => option.PROMOTION}
                  options={promotionData.length > 0 ? promotionData : []}
                  isSearchable={true}
                  onChange={selectPROMOTION}
                  maxMenuHeight={180}
                  // placeholder={"Choose a Dept"}
                  styles={(isValid && searchHeaderData.PROMOTION.length === 0) ? styleSelect2 : styleSelect1}
                  components={animatedComponents}
                  // isClearable={true}
                  value={promotionData.filter(obj => searchHeaderData?.PROMOTION_CODE === obj.PROMOTION)}
                  closeMenuOnSelect={true}
                  isDisabled={headerDis}
                  theme={(isValid && searchHeaderData.PROMOTION.length === 0) ? theme => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      neutral50: '#b22222',  // Placeholder color //slategrey
                    },
                  }) : false}
                />
              </div>
            </div>
          ] : null}


        <div className={CreateAllocationClasses.header_child}>
          <div >
            {(isValid && searchHeaderData.ALLOC_LEVEL.length === 0) ?
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left', color: "#b22222" }}>
                Alloc Level*</InputLabel> :
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                Alloc Level</InputLabel>}
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              // className= {CreateAllocationClasses.inputField}
              classNamePrefix="mySelect"
              getOptionLabel={option =>
                `${option.ALLOC_LEVEL.toString()}`}
              getOptionValue={option => option.ALLOC_LEVEL}
              options={allocLevelData.length > 0 ? allocLevelData : []}
              isSearchable={true}
              onChange={selectALLOC_LEVEL}
              maxMenuHeight={180}
              // placeholder={"Choose a Dept"}
              styles={(isValid && searchHeaderData.ALLOC_LEVEL.length === 0) ? styleSelect2 : styleSelect1}
              components={animatedComponents}
              // isClearable={true}
              value={allocLevelData.filter(obj => searchHeaderData?.ALLOC_LEVEL_CODE === (obj.ALLOC_LEVEL))}
              closeMenuOnSelect={true}
              isDisabled={headerDis}
              theme={(isValid && searchHeaderData.ALLOC_LEVEL.length === 0) ? theme => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  neutral50: '#b22222',  // Placeholder color //slategrey
                },
              }) : false}
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.header_child}>
          <div>
            {(isValid && searchHeaderData.RELEASE_DATE.length === 0) ?
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left', color: "#b22222" }}>
                Release Date*</InputLabel> :
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                Release Date</InputLabel>}
          </div>
          <div>
            <TextField
              variant="outlined"
              type="date"
              size="small"
              name="RELEASE_DATE"
              format="yyyy/MM/dd"
              autoComplete='off'
              inputProps={{ min: new Date().toISOString().slice(0, 10) }}
              sx={{
                margin: "0px 0px 10px 2px"
                , "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "#f0f0f0",
                },
              }}
              id="outlined-disabled"
              disabled={headerDis}
              label=""
              value={searchHeaderData.RELEASE_DATE}
              onChange={onChange}
              error={searchHeaderData.RELEASE_DATE.length === 0 && isValid}
              // helperText={(searchHeaderData.RELEASE_DATE.length===0 && isValid)=== true ? null : null}
              InputProps={{
                style: { fontSize: 12 },
                shrink: true,
                className: CreateAllocationClasses.input,
              }}
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.header_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
              Status</InputLabel>
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <TextField
              size="small"
              sx={{
                margin: "0px 0px 10px 2px", width: "200px"
                , "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "#f0f0f0"
                }
              }}
              disabled
              name="STATUS"
              value={(searchHeaderData.STATUS = statusCreateData.CODE) && (searchHeaderData.STATUS_CODE = statusCreateData.STATUS)}
              // onChange={onChange}
              id="outlined-disabled"
              autoComplete='off'
              defaultValue={statusCreateData.STATUS}
              InputProps={{
                style: { fontSize: 12 },
                className: CreateAllocationClasses.input,
              }}
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.header_child}>
          <div>
            {(isValid && searchHeaderData.ALLOC_TYPE.length === 0) ?
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left', color: "#b22222" }}>
                Alloc Type*</InputLabel> :
              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                Alloc Type</InputLabel>}
          </div>
          <div className={CreateAllocationClasses.multiselectfield}>
            <Select
              closeMenuOnSelect={true}
              className="basic-multi-select"
              classNamePrefix="select"
              getOptionLabel={option =>
                `${option.ALLOC_TYPE.toString()}`}
              getOptionValue={option => option.ALLOC_TYPE}
              options={allocTypeData.length > 0 ? allocTypeData : []}
              isSearchable={true}
              onChange={selectALLOC_TYPE}
              maxMenuHeight={180}
              // isClearable={true}
              // placeholder={"Choose a Warehouse"}
              styles={(isValid && searchHeaderData.ALLOC_TYPE.length === 0) ? styleSelect2 : styleSelect1}
              components={animatedComponents}
              value={allocTypeData.filter(obj => searchHeaderData?.ALLOC_TYPE_CODE === (obj.ALLOC_TYPE))}
              // isMulti 
              isDisabled={headerDis}
              theme={(isValid && searchHeaderData.ALLOC_TYPE.length === 0) ? theme => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  neutral50: '#b22222',  // Placeholder color //slategrey
                },
              }) : false}
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.header_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
              Allocator</InputLabel>
          </div>
          <div>
            <TextField
              variant="outlined"
              size="small"
              sx={{
                margin: "0px 0px 10px 2px", width: "14vh"
                , "& .MuiInputBase-input.Mui-disabled": {
                  backgroundColor: "#f0f0f0"
                }
              }}
              disabled
              name="CREATE_ID"
              id="outlined-disabled"
              autoComplete='off'
              value={searchHeaderData.CREATE_ID}
              onChange={onChange}
              InputProps={{
                style: { fontSize: 12 },
                className: CreateAllocationClasses.input,
              }}
            />
          </div>
        </div>
      </div>
    </Box>
  )


  const SearchAvailQty = () => (
    <Box
      display="inline-block"
      sx={{
        backgroundColor: "",
        height: "auto",
        width: "100%",
        // border:"1px dotted gray",
        // borderRadius:"5px",
      }}
    >
      <div className={CreateAllocationClasses.float_container}>
        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
              Dept</InputLabel>
          </div>
          <div>
            {/* <Tooltip title={availSearch.length > 0 ? availSearch[0].HIER1_DESC : null} placement="top"> */}
            <TextField id="filled-disabled" size="small" variant="outlined"
              value={availSearch.length > 0 ? [(availSearch[0].HIER1) + (" - ") + (
                String(availSearch[0].HIER1_DESC).length > 0 && String(availSearch[0].HIER1_DESC).length < 8 ?
                  availSearch[0].HIER1_DESC === "NULL" ? null : availSearch[0].HIER1_DESC
                  : String(availSearch[0].HIER1_DESC).substring(0, 8) + "..."
              )
              ] : null}
              InputProps={{
                readOnly: true,
                style: {
                  fontSize: 12,
                  border: 0,
                  borderRadius: "0px",
                  boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
                  padding: '0px 0px 0px 0px'
                },
                endAdornment: <SearchGridAvailDept />,
                className: CreateAllocationClasses.inputFieldTable,
              }}
            />
            {/* </Tooltip> */}

          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
              Class</InputLabel>
          </div>
          <div>
            {/* <Tooltip title={availSearch.length > 0 ? availSearch[0].HIER2_DESC : null} placement="top"> */}
            <TextField id="filled-disabled" size="small" variant="outlined"
              value={availSearch.length > 0 ? [(availSearch[0].HIER2) + (" - ") + (
                String(availSearch[0].HIER2_DESC).length > 0 && String(availSearch[0].HIER2_DESC).length < 8 ?
                  availSearch[0].HIER2_DESC === "NULL" ? null : availSearch[0].HIER2_DESC
                  : String(availSearch[0].HIER2_DESC).substring(0, 8) + "..."
              )
              ] : null}
              InputProps={{
                readOnly: true,
                style: {
                  fontSize: 12,
                  border: 0,
                  borderRadius: "0px",
                  boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
                  padding: '0px 0px 0px 0px'
                },
                endAdornment: <SearchGridAvailClass />,
                className: CreateAllocationClasses.inputFieldTable,
              }}
            />
            {/* </Tooltip> */}
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
              Subclass</InputLabel>
          </div>
          <div>
            {/* <Tooltip title={availSearch.length > 0 ? availSearch[0].HIER3_DESC : null} placement="top"> */}
            <TextField id="filled-disabled" size="small" variant="outlined"
              value={availSearch.length > 0 ? [(availSearch[0].HIER3) + (" - ") + (
                String(availSearch[0].HIER3_DESC).length > 0 && String(availSearch[0].HIER3_DESC).length < 8 ?
                  availSearch[0].HIER3_DESC === "NULL" ? null : availSearch[0].HIER3_DESC
                  : String(availSearch[0].HIER3_DESC).substring(0, 8) + "..."
              )
              ] : null}
              InputProps={{
                readOnly: true,
                style: {
                  fontSize: 12,
                  border: 0,
                  borderRadius: "0px",
                  boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
                  padding: '0px 0px 0px 0px'
                },
                endAdornment: <SearchGridAvailSubclass />,
                className: CreateAllocationClasses.inputFieldTable,
              }}
            />
            {/* </Tooltip> */}
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
              Item Parent</InputLabel>
          </div>
          <div>
            <TextField id="filled-disabled" size="small" variant="outlined"
              value={availSearch.length > 0 ? [(availSearch[0].ITEM) + (" - ") + (
                String(availSearch[0].ITEM_DESC).length > 0 && String(availSearch[0].ITEM_DESC).length < 8 ?
                  availSearch[0].ITEM_DESC === "NULL" ? null : availSearch[0].ITEM_DESC
                  : String(availSearch[0].ITEM_DESC).substring(0, 12) + "..."
              )
              ] : null}
              InputProps={{
                readOnly: true,
                style: {
                  fontSize: 12,
                  border: 0,
                  borderRadius: "0px",
                  boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
                  padding: '0px 0px 0px 0px'
                },
                endAdornment: <SearchGridAvailITEM />,
                className: CreateAllocationClasses.inputFieldTable,
              }}
            // sx={{
            //   ".MuiOutlinedInput-input-1708": {
            //     padding: 0,
            //   }
            // }}
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
              Diff ID</InputLabel>
          </div>
          <div>
            {/* <Tooltip title={availSearch.length > 0 ? availSearch[0].DIFF_DESC : null} placement="top"> */}
            <TextField id="filled-disabled" size="small" variant="outlined"
              value={availSearch.length > 0 ? [(availSearch[0].DIFF_ID) + (" - ") + (
                String(availSearch[0].DIFF_DESC).length > 0 && String(availSearch[0].DIFF_DESC).length < 8 ?
                  availSearch[0].DIFF_DESC === "NULL" ? null : availSearch[0].DIFF_DESC
                  : String(availSearch[0].DIFF_DESC).substring(0, 12) + "..."
              )
              ] : null}
              InputProps={{
                readOnly: true,
                style: {
                  fontSize: 12,
                  border: 0,
                  borderRadius: "0px",
                  boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
                  padding: '0px 0px 0px 0px'
                },
                endAdornment: <SearchGridAvailDiffID />,
                className: CreateAllocationClasses.inputFieldTable,
              }}
            />
            {/* </Tooltip> */}
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
              Doc No</InputLabel>
          </div>
          <div>
            <TextField id="filled-disabled" size="small" variant="outlined"
              InputProps={{
                readOnly: true,
                style: { fontSize: 12 },
                className: CreateAllocationClasses.inputField,
              }}
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
              Doc Type</InputLabel>
          </div>
          <div>
            <TextField id="filled-disabled" size="small" variant="outlined"
              InputProps={{
                readOnly: true,
                style: { fontSize: 12 },
                className: CreateAllocationClasses.inputField,
              }}
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
              WH</InputLabel>
          </div>
          <div>
            {/* <Tooltip title={availSearch.length > 0 ? availSearch[0].WH_DESC : null} placement="top"> */}
            <TextField id="filled-disabled" size="small" variant="outlined"
              value={availSearch.length > 0 ? [(availSearch[0].LOC) + (" - ") + (
                String(availSearch[0].WH_DESC).length > 0 && String(availSearch[0].WH_DESC).length < 8 ?
                  availSearch[0].WH_DESC === "NULL" ? null : availSearch[0].WH_DESC
                  : String(availSearch[0].WH_DESC).substring(0, 12) + "..."
              )
              ] : null}
              InputProps={{
                readOnly: true,
                style: {
                  fontSize: 12,
                  border: 0,
                  borderRadius: "0px",
                  boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px",
                  padding: '0px 0px 0px 0px'
                },
                endAdornment: <SearchGridAvailWH />,
                className: CreateAllocationClasses.inputFieldTable,
              }}
            />
            {/* </Tooltip> */}
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
              Avail Qty</InputLabel>
          </div>
          <div>
            <TextField value={totalAvailQty} id="filled-disabled" size="small"
              variant="outlined"
              InputProps={{
                readOnly: true,
                style: { fontSize: 12 },
                className: CreateAllocationClasses.inputField,
              }}
            />
          </div>
        </div>

        <div className={CreateAllocationClasses.float_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
              Inactive Qty</InputLabel>
          </div>
          <div>
            <TextField id="filled-disabled" size="small" variant="outlined"
              InputProps={{
                readOnly: true,
                style: { fontSize: 12 },
                className: CreateAllocationClasses.inputField,
              }}
            />
          </div>
        </div>
      </div>
    </Box>
  )


  // var headerscell=headCells;
  if (searchHeaderData.ALLOC_LEVEL_CODE === "Style Diff") {
    headCells.map((option) => { if (option.label === "Item") { option.label = "Item parent" } })
  } else if (searchHeaderData.ALLOC_LEVEL_CODE === "Sku") {
    headCells.map((option) => { if (option.label === "Item parent") { option.label = "Item" } })
  }


  // //////console.log("sagfsdfcsaasdd",totalData.length)

  function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead className={CreateAllocationClasses.TitleHead}>
        <TableRow >
          <StyledTableCell padding="checkbox" style={{
            whiteSpace: "nowrap",
          }}
          >
            <Checkbox
              color="primary"
              indeterminate={selected.length > 0 && selected.length < totalData.length}
              checked={totalData.length > 0 && selected.length === totalData.length}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all data',
              }}
              style={{
                color: "#fff",
              }}
            />
          </StyledTableCell>
          {headCells.map((headCell) => (
            <StyledTableCell
              className={CreateAllocationClasses.TableCell}
              size="small"
              key={headCell.id}
              // align={headCell.numeric ? 'right' : 'left'}
              // padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
              style={{
                whiteSpace: "nowrap"
              }}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                sx={{
                  "&.MuiTableSortLabel-root": {
                    color: "white",
                    fontSize: "0.775rem",
                  },
                  "&.MuiTableSortLabel-root:hover": {
                    color: "#fff",
                  },
                  "&.Mui-active": {
                    color: "#fff",
                  },
                  "& .MuiTableSortLabel-icon": {
                    color: "#fff !important",
                  },
                }}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  function EnhancedTableToolbar(props) {
    const { numSelected } = props;
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(totalData.length > 0 && {
            minHeight: {
              minHeight: "40px !important",
            },
            // border:"2px solid black", 
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
          padding: "0px"
        }}
      >
        {totalData.length > 0 && (
          <Typography
            sx={{
              flex: "1 1 100%",
              display: "flex",
              justifyContent: "flex-end",
              padding: "0px 20px 0px 0px"
            }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            Rows {selected.length} of {totalData.length}
          </Typography>
        )}
      </Toolbar>
    );
  }

  function descendingComparator(a, b, orderBy) {
    let c, d;
    if (orderBy == "SR_NO") {
      c = (b[orderBy]);
      d = (a[orderBy]);
    } else {
      c = isNaN(b[orderBy]) ? b[orderBy] : parseInt(b[orderBy]);
      d = isNaN(a[orderBy]) ? a[orderBy] : parseInt(a[orderBy]);
    }
    if (c === "NULL" || d === "NULL") {
      if (c === "NULL" && d !== "NULL") {
        return -1
      }
      else if (d === "NULL" && c !== "NULL") {
        return 1
      }
      else {
        return 1
      }
    }
    else {
      if (c < d) {
        return -1;
      }
      if (c > d) {
        return 1;
      }
    }
    return 0;
  }
  //   if (b[orderBy] < a[orderBy]) {
  //     return -1;
  //   }
  //   if (b[orderBy] > a[orderBy]) {
  //     return 1;
  //   }
  //   return 0;
  // }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  // This method is created for cross-browser compatibility, if you don't
  // need to support IE11, you can use Array.prototype.sort() directly
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }


  // const [page, setPage] = React.useState(0);

  const handleRequestSort = (event, property) => {
    const isAsc = (orderBy === property && order === 'asc');
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked && selected.length === 0) {
      const newSelected = totalData.map((n) => n.SR_NO);
      setSelected(newSelected);
      if (newSelected.length > 0) {
        var temp = [];
        newSelected.map((val) => {
          temp.push(totalData[val - 1]);
        });
        setSelData(temp);
      }
      return;
    }
    setSelected([]);
    setSelData([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    if (newSelected.length > 0) {
      var temp = [];
      newSelected.map((val) => {
        temp.push(totalData[val - 1]);
        //console.log("Akhil selec",val,"dfg",temp,"dff",totalData);
      });
      setSelData(temp);
    }
    else{
      setSelData([]);
    }
    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  //console.log("newValue::", UpdateSelIndCreate);

  // ****  
  const handleSelectInd = () => {
    console.log("d.....", selData)

    dispatch(getUPDATESELINDCREATERequest(selData));
    dispatch(getSWITCHTABFUNCRequest([allocNoData]));
    console.log(23456)
  }
  const switchTFunc = () => {
    dispatch(getSWITCHTABFUNCRequest([allocNoData]));
  }




  //   if (event.target.checked) {
  //     // const SelectInd = []
  //     // totalData.map((row) => {
  //     //   if (row.SR_NO === val) {
  //     //     SelectInd.push(row)
  //     //     //console.log("newValue:",row);
  //     //     setUpdateSelIndCreate([row])
  //     //     // 
  //     //   }
  //     // }
  //     // );
  // setUpdateSelIndCreate([])
  // //console.log("newValue123456:",SelectInd);
  // setUpdateSelIndCreate(SelectInd)
  //   return;
  // }
  // }
  ///////////////////////////////////

  const handleTabChange = (event, newValue) => {
    setValueSelIndCreate(selected)
    setTab(newValue);
    if (newValue) {
      //console.log("newValue::", newValue, selected);
    }
  }


  const handleCloseAvailDialog = () => {
    setOpenAvailDialog(false);
  };


  const showAvailDialog = (e, values) => {
    setOpenAvailDialog(true);
    if (values) {
      dispatch(getALLOC_AVAIL_QTYRequest([{ DIFF_ID: values.DIFF_ID, ITEM: values.ITEM }]));
      dispatch(getALLOC_AVAIL_SEARCHRequest([{ DIFF_ID: values.DIFF_ID, ITEM: values.ITEM }]));
    }
  }

  if (availCheck) {
    let availQtyVal = 0;
    availQty.map((data) => {
      availQtyVal = availQtyVal + data.AVAILABLE_QTY;
    })
    setTotalAvailQty(availQtyVal);
    setAvailCheck(false);
  }


  //console.log("availQty123:", availQty)
  //console.log("availQty:", availSearch, totalAvailQty)
  //console.log("allocNoData::", allocNoData);
  console.log("selData:", selData)


  return (
    <Box className={CreateAllocationClasses.maindiv}>
      <Box sx={{ paddingTop: "70px" }}>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleTabChange} aria-label="lab API tabs example"
              sx={{
                margin: "0px 0px 0px 10px"
              }}>
              <Tab label="CREATE ALLOCATION" value="1" sx={tabStyle} />
              <Tab label="RULES AND LOCATION" value="2" sx={tabStyle} disabled={selData.length > 0 ? false : true} onClick={handleSelectInd} />
              <Tab label="LIKE ITEM MAP" value="3" sx={tabStyle} disabled={selData.length > 0 ? false : true} onClick={handleSelectInd} />
              <Tab label="QUANITITY LIMITS" value="4" sx={tabStyle} disabled={isValidQtyLimits ? false : true} onClick={switchTFunc} />
              {/* <Tab label="CALCULATE" value="5" sx={tabStyle} />
            <Tab label="ALLOCATION DETAILS" value="6" sx={tabStyle} /> */}
            </TabList>
          </Box>

          <TabPanel value="1" sx={{ padding: '12px 20px 0px 10px' }}>
            <Grid >
              <Box
                display="inline-block"
                sx={{
                  backgroundColor: "",
                  // boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
                  // border:"1px solid gray",
                  width: "100%",
                  height: "auto",
                }}
              >
                <div sx={{ display: "flex", flexDirection: "column" }}>
                  <Grid id="top-row" container spacing={0} >
                    <div className={CreateAllocationClasses.course_box}>
                      {SearchHeader()}
                    </div>
                  </Grid>
                </div>
              </Box>
            </Grid>

            <Grid>
              <Box
                component="fieldset"
                display="inline-block"
                sx={{
                  backgroundColor: "",
                  // border:"1px solid gray",
                  // boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
                  // marginTop:"0.1px",
                  width: "100%",
                  height: "auto",
                  marginTop: "10px",
                  borderRadius: 1,

                  boxShadow: 2, border: 0,
                  borderBottom: 3,
                  border: "1px solid lightgrey",
                }}
              >
                <div sx={{ display: "flex", flexDirection: "row" }}>
                  <Grid id="top-row" container spacing={0}>
                    <div className={CreateAllocationClasses.course_box}>
                      <Box
                        display="inline-block"
                        sx={{
                          backgroundColor: "",
                          width: "100%",
                          height: "auto"
                        }}
                      >
                        <div className={CreateAllocationClasses.grid_block}>
                          <Box
                            // display="inline-block"
                            sx={{
                              backgroundColor: "",
                              height: "auto",
                              margin: "0.2rem 0rem",
                              width: "100%",
                              marginLeft: "",
                              // boxShadow:"0 3px 10px 3px LightGray",
                              // border:"1px solid gray",
                              // borderRadius:"5px",
                            }}
                          >
                            <List
                              component="nav"
                              size="small"
                              aria-label="comment"
                              sx={{
                                bgcolor: '',
                                width: "100%",
                                // maxWidth: "360",
                                padding: "0px",
                                margin: "0px"
                              }}
                              MenuListProps={{
                                disablePadding: "true",
                              }}
                            >
                              <ListItem
                                button
                                id="lock-button"
                                aria-label="Criteria"
                                onClick={handleClickListItem}
                                onMouseOver={handleClickListItem}
                                onMouseDown={handleClose}
                              // onMouseOut={handleClose}
                              // onMouseEnter={handleClickListItem}
                              // onMouseLeave={handleClose}
                              >
                                <ListItemText
                                  primary={<Typography type="body2" style={{ bgcolor: '', fontSize: "14px", fontWeight: "bold", position: "static" }}>
                                    CRITERIA: {options[selectedIndex].value}</Typography>}

                                />
                              </ListItem>
                            </List>
                            <Menu
                              id="simple-menu"
                              className={CreateAllocationClasses.listdropdown}
                              anchorEl={anchorEl}
                              keepMounted
                              open={open}
                              onClose={handleClose}
                              onMouseLeave={handleClose}
                              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                              // transformOrigin={{ vertical: 'buttom', horizontal: 'left' }}
                              disableScrollLock={true}
                              PaperProps={{
                                style: {
                                  width: "auto",
                                  height: "auto",
                                  margin: "0.2rem 0.2rem",
                                  // bgcolor: 'red',
                                  // border:"1px solid blue",
                                }
                              }}
                              MenuListProps={{
                                disablePadding: "true",
                                'aria-labelledby': 'lock-button',
                                role: 'li  stbox',
                              }}
                            >
                              {options.map((option, index) => (
                                <MenuItem
                                  dense="true"
                                  sx={{
                                    backgroundColor: "",
                                    display: "inline-block",
                                    padding: "0px 0px 0px 1px",
                                    // border:"1px solid red",
                                    // position:"sticky"
                                  }}
                                  value={option.value}
                                  key={option.value}
                                  selected={index === selectedIndex}
                                  onClick={(event) => handleMenuItemClick(event, index)}
                                >
                                  {/* {option.value} */}
                                  <RadioGroup
                                    sx={{ backgroundColor: "white", padding: "0px 0px 0px 0px" }}
                                    size="small"
                                    value={option.value}
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    defaultValue={option.value}
                                    name="row-radio-buttons-group"
                                  >
                                    <FormControlLabel
                                      value={searchHeaderData.ALLOC_CRITERIA}
                                      onClick={handleClickListItem}
                                      control={
                                        <Radio size="small"
                                          onClick={handleClickListItem}
                                          className={CreateAllocationClasses.formRadio} />
                                      }
                                      label={<Typography sx={{ fontSize: "12px", padding: "0px 0px 0px 0px", fontWeight: "bold" }}>{option.value}</Typography>} />

                                  </RadioGroup>
                                </MenuItem>
                              ))}
                            </Menu>
                          </Box>
                        </div>

                        <div className={CreateAllocationClasses.course_list}>
                          <Box
                            onMouseOver={handleClose}
                            sx={{
                              backgroundColor: "",
                              borderBottom: "1px dotted gray",
                              // borderRadius:"5px"
                            }}
                          >
                            <div className={CreateAllocationClasses.grid_block}>
                              {searchHeaderData.ALLOC_CRITERIA === "PURCHASE_ORDER" ?
                                [(<div> {SearchPO()}</div>)]
                                : null}
                              {searchHeaderData.ALLOC_CRITERIA === "WAREHOUSE" ?
                                [(<div> {SearchWH()}</div>)]
                                : null}
                              {searchHeaderData.ALLOC_CRITERIA === "ASN" ?
                                [(<div> {SearchASN()}</div>)]
                                : null}
                              {searchHeaderData.ALLOC_CRITERIA === "TRANSFER" ?
                                [(<div> {SearchTSF()}</div>)]
                                : null}
                              {searchHeaderData.ALLOC_CRITERIA === "WHAT_IF" ?
                                [(<div> {SearchWhatIf()}</div>)]
                                : null}
                              <div className={CreateAllocationClasses.grid_block}>
                                {SearchButton()}
                              </div>
                            </div>
                          </Box>
                        </div>
                      </Box>
                      <div className={CreateAllocationClasses.course_list}>
                        {SearchButtonGrid()}
                      </div>
                    </div>
                  </Grid>
                </div>
              </Box>
            </Grid>

            <Grid>
              <Box
                // component="fieldset"
                display="inline-block"
                sx={{
                  backgroundColor: "",
                  // boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
                  marginTop: "10px",
                  width: "100%",
                  height: "auto",
                  borderRadius: 1,

                  boxShadow: 2, border: 0,
                  borderBottom: 3,
                  border: "1px solid lightgrey",
                }}
              >
                <div sx={{ display: "flex", flexDirection: "row" }}>
                  <Grid id="top-row" container spacing={0}>
                    <Box
                      // component="fieldset"
                      sx={{
                        backgroundColor: "",
                        width: "100%",
                        height: "auto",
                        margin: "0px 0px 5px 0px"
                      }}
                    >
                      <Paper sx={{ width: '100%', mb: 0 }}>
                        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                        <TableContainer style={{ maxHeight: 300, borderRadius: '5px' }} className={CreateAllocationClasses.TitleHead}>
                          <Table
                            aria-labelledby="tableTitle"
                          >
                            <EnhancedTableHead
                              numSelected={selected.length}
                              order={order}
                              orderBy={orderBy}
                              onSelectAllClick={handleSelectAllClick}
                              onRequestSort={handleRequestSort}
                              rowCount={UniqTableCPO.length}
                            />
                            <TableBody >
                              {UniqTableCPO.length > 0 ?
                                stableSort(UniqTableCPO, getComparator(order, orderBy))
                                  .map((row, index) => {
                                    const isItemSelected = isSelected(row?.SR_NO ? row?.SR_NO : row?.ITEM);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    // ////console.log("hvjgjdatatdat");
                                    return (
                                      <StyledTableRow
                                        hover
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row?.SR_NO ? row?.SR_NO : row?.ITEM}
                                        selected={isItemSelected}
                                      >
                                        <StyledTableCell padding="checkbox">
                                          <Checkbox
                                            color="primary"
                                            onClick={(event) => [handleClick(event, row?.SR_NO)]}//,handleSelectInd(event,row?.SR_NO)]}
                                            checked={isItemSelected}
                                            inputProps={{
                                              'aria-labelledby': labelId,
                                            }}
                                          />
                                        </StyledTableCell>

                                        <StyledTableCell align="right" onDoubleClick={(event) => showAvailDialog(event, row)}>{row.LOC === "NULL" ? null : row.LOC}</StyledTableCell>
                                        <StyledTableCell align="right" onClick={(event) => showAvailDialog(event, row)}>{row.ITEM === "NULL" ? null : row.ITEM}</StyledTableCell>
                                        <StyledTableCell align="right" >
                                          {/* {row.ITEM_DESC} */}
                                          <Box
                                            display="flex"
                                            justifyContent="space-between"
                                            sx={{ border: 0, }}>
                                            <p>{String(row.ITEM_DESC).length > 0 && String(row.ITEM_DESC).length < 5 ?
                                              row.ITEM_DESC === "NULL" ? null : row.ITEM_DESC
                                              : String(row.ITEM_DESC).substring(0, 8) + "..."}</p>
                                            <Button sx={{
                                              backgroundColor: "", '&:hover': {
                                                backgroundColor: "",
                                              }, border: 0, color: "CadetBlue"
                                            }}
                                              style={{
                                                maxWidth: '25px', minWidth: '25px', justifyContent: "flex-start"
                                              }}
                                              size='small'
                                              className={CreateAllocationClasses.textField}
                                              onClick={() => {
                                                swal(
                                                  <div>
                                                    <p>{row.ITEM_DESC}</p>
                                                  </div>
                                                )
                                              }}
                                              startIcon={<InfoIcon />}
                                            >
                                            </Button>
                                          </Box>
                                        </StyledTableCell>
                                        <StyledTableCell align="right" onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.DIFF_ID === "NULL" ? null : row.DIFF_ID}
                                        </StyledTableCell>
                                        <StyledTableCell align="right" onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.VPN === "NULL" ? null : row.VPN}
                                        </StyledTableCell>
                                        <StyledTableCell align="right" onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.HIER1 === "NULL" ? null : row.HIER1}
                                        </StyledTableCell>
                                        <StyledTableCell align="right" onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.HIER2 === "NULL" ? null : row.HIER2}
                                        </StyledTableCell>
                                        <StyledTableCell align="right" onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.HIER3 === "NULL" ? null : row.HIER3}
                                        </StyledTableCell>
                                        <StyledTableCell align="right" onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.AVAIL_QTY === "NULL" ? null : row.AVAIL_QTY}
                                        </StyledTableCell>
                                        <StyledTableCell align="right" onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.INACTIVE_QTY === "NULL" ? null : row.INACTIVE_QTY}
                                        </StyledTableCell>
                                        <StyledTableCell align="right" onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.HOLDBACK_TYPE === "NULL" ? null : row.HOLDBACK_TYPE}
                                        </StyledTableCell>
                                        <StyledTableCell align="right" onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.HOLDBACK_TYPE === "NULL" ? null : row.HOLDBACK_TYPE}
                                        </StyledTableCell>
                                        <StyledTableCell align="right" onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.PO_TYPE === "NULL" ? null : row.PO_TYPE}
                                        </StyledTableCell>
                                        <StyledTableCell align="right" onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.HOLDBACK_TYPE === "NULL" ? null : row.HOLDBACK_TYPE}
                                        </StyledTableCell>
                                        <StyledTableCell align="right" onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.HOLDBACK_TYPE === "NULL" ? null : row.HOLDBACK_TYPE}
                                        </StyledTableCell>
                                        <StyledTableCell align="right" onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.SOM_QTY === "NULL" ? null : row.SOM_QTY}
                                        </StyledTableCell>
                                        <StyledTableCell align="right" onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.HOLDBACK_TYPE === "NULL" ? null : row.HOLDBACK_QTY}
                                        </StyledTableCell>
                                        <StyledTableCell align="right" onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.ERR_IND === "NULL" ? null : row.ERR_IND}
                                        </StyledTableCell>
                                        <StyledTableCell align="right" onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.HOLDBACK_TYPE === "NULL" ? null : row.HOLDBACK_QTY}
                                        </StyledTableCell>
                                        <StyledTableCell align="right" onDoubleClick={(event) => showAvailDialog(event, row)}>
                                          {row.ERR_MESSAGE === "NULL" ? null : row.ERR_MESSAGE}
                                        </StyledTableCell>
                                      </StyledTableRow >
                                    );
                                  })
                                : null}

                              {UniqTableCPO.length < 5 ?
                                [...Array(5 - (UniqTableCPO.length)).keys()].map(val => (
                                  <StyledTableRow >
                                    <StyledTableCell padding="checkbox"> <Checkbox color="primary" disabled={true} /></StyledTableCell>
                                    <StyledTableCell align="right"></StyledTableCell>
                                    <StyledTableCell align="right"></StyledTableCell>
                                    <StyledTableCell align="right"></StyledTableCell>
                                    <StyledTableCell align="right"></StyledTableCell>
                                    <StyledTableCell align="right"></StyledTableCell>
                                    <StyledTableCell align="right"></StyledTableCell>
                                    <StyledTableCell align="right"></StyledTableCell>
                                    <StyledTableCell align="right"></StyledTableCell>
                                    <StyledTableCell align="right"></StyledTableCell>
                                    <StyledTableCell align="right"></StyledTableCell>
                                    <StyledTableCell align="right"></StyledTableCell>
                                    <StyledTableCell align="right"></StyledTableCell>
                                    <StyledTableCell align="right"></StyledTableCell>
                                    <StyledTableCell align="right"></StyledTableCell>
                                    <StyledTableCell align="right"></StyledTableCell>
                                    <StyledTableCell align="right"></StyledTableCell>
                                    <StyledTableCell align="right"></StyledTableCell>
                                    <StyledTableCell align="right"></StyledTableCell>
                                    <StyledTableCell align="right"></StyledTableCell>
                                    <StyledTableCell align="right"></StyledTableCell>
                                  </StyledTableRow>
                                )) : false}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                      {totalData.length > 0 ? <EnhancedTableToolbar numSelected={totalData.length} /> : null}
                    </Box>
                  </Grid>
                </div>
              </Box>
            </Grid>
          </TabPanel>

          {/* {"akhil032"} */}
          {/* {selData.length>0? dispatch(getUPDATESELINDCREATERequest(selData)):null} */}
          <TabPanel value="2" sx={{ padding: '2px 20px 0px 5px' }} >
            <RulesAndLocation
              allocNoData={allocNoData}
              tab={tab}
              setTab={setTab}
              setIsValidQtyLimits={setIsValidQtyLimits}
            />

            {/* // <RulesAndLocation ALLOC_NO={allocNoData["ALLOC_NO"]} /> */}
          </TabPanel>
          {/* <TabPanel value="3" sx={{ padding: '2px 20px 0px 5px' }}>
            <LikeItemMap />
          </TabPanel> */}
          <TabPanel value="3" sx={{ padding: '2px 20px 0px 5px' }}>
            <LikeItemMap
              allocNoData={allocNoData}
              tab={tab}
              setTab={setTab}
            />
          </TabPanel>

          <TabPanel value="4" sx={{ padding: '12px 20px 0px 10px' }}>
            <QuantityLimits
              allocNoData={allocNoData}
              tab={tab}
              setTab={setTab}
            />
          </TabPanel>
        </TabContext>
      </Box>


      <div>
        <BootstrapDialog
          onClose={handleCloseAvailDialog}
          aria-labelledby="customized-dialog-title"
          open={openAvailDialog}
          fullWidth={true}
          maxWidth="md"
        // sx={{width:"1000px"}}
        >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseAvailDialog}>
            Available quantity details by size
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Card >
              <CardContent>
                <Grid container spacing={1}>
                  <div>{SearchAvailQty()}</div>
                </Grid>
              </CardContent>
            </Card>

            <br></br>

            <Card >
              <CardContent sx={{ maxHeight: '200px', overflowY: 'scroll' }}>
                <TableContainer style={{ maxHeight: 300 }} className={CreateAllocationClasses.TitleHead}>
                  <Table
                    aria-labelledby="tableTitle"
                  >
                    <TableHead className={CreateAllocationClasses.TitleHead}>
                      <StyledTableRow >
                        <StyledTableCell align="right">Item</StyledTableCell>
                        <StyledTableCell align="right">Diff1 ID</StyledTableCell>
                        <StyledTableCell align="right">Diff2 ID</StyledTableCell>
                        <StyledTableCell align="right">Diff3 ID</StyledTableCell>
                        <StyledTableCell align="right">Diff4 ID</StyledTableCell>
                        <StyledTableCell align="right">Avail Qty</StyledTableCell>
                        <StyledTableCell align="right">Inactive Qty</StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody >
                      <StyledTableRow>
                        {availQty.map((row) => (
                          <>
                            <StyledTableCell align="right">{row.ITEM === "NULL" ? null : row.ITEM}</StyledTableCell>
                            <StyledTableCell align="right">{row.DIFF1 === "NULL" ? null : row.DIFF1}</StyledTableCell>
                            <StyledTableCell align="right">{row.DIFF2 === "NULL" ? null : row.DIFF2}</StyledTableCell>
                            <StyledTableCell align="right">{row.DIFF3 === "NULL" ? null : row.DIFF3}</StyledTableCell>
                            <StyledTableCell align="right">{row.DIFF4 === "NULL" ? null : row.DIFF4}</StyledTableCell>
                            <StyledTableCell align="right">{row.AVAILABLE_QTY === "NULL" ? null : row.AVAILABLE_QTY}</StyledTableCell>
                            <StyledTableCell align="right">{row.INACTIVE_QTY === "NULL" ? null : row.INACTIVE_QTY}</StyledTableCell>
                          </>
                        ))}
                      </StyledTableRow>
                      {availQty.length < 3 ?
                        [...Array(3 - (availQty.length)).keys()].map(val => (
                          <StyledTableRow >
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                          </StyledTableRow>
                        )) : false}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleCloseAvailDialog}>
              Ok
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>

      <div>
        <Dialog
          fullWidth={true}
          maxWidth="xs"
          open={openItem}
          onClose={handleCloseItem}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {availSearch.length > 0 ? (availSearch[0].ITEM_DESC) : null}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseItem} autoFocus variant="contained">
              Ok
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          fullWidth={true}
          maxWidth="xs"
          open={openDept}
          onClose={handleCloseDept}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {availSearch.length > 0 ? (availSearch[0].HIER1_DESC) : null}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseDept} autoFocus variant="contained">
              Ok
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          fullWidth={true}
          maxWidth="xs"
          open={openClass}
          onClose={handleCloseClass}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {availSearch.length > 0 ? (availSearch[0].HIER2_DESC) : null}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseClass} autoFocus variant="contained">
              Ok
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          fullWidth={true}
          maxWidth="xs"
          open={openSubclass}
          onClose={handleCloseSubclass}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {availSearch.length > 0 ? (availSearch[0].HIER3_DESC) : null}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseSubclass} autoFocus variant="contained">
              Ok
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          fullWidth={true}
          maxWidth="xs"
          open={openDiffID}
          onClose={handleCloseDiffID}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {availSearch.length > 0 ? (availSearch[0].DIFF_DESC) : null}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseDiffID} autoFocus variant="contained">
              Ok
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          fullWidth={true}
          maxWidth="xs"
          open={openWH}
          onClose={handleCloseWH}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {availSearch.length > 0 ? (availSearch[0].WH_DESC) : null}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseWH} autoFocus variant="contained">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  );
};

export default CreateAllocation;

