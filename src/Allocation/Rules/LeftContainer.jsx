import "./Left.css"
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import axios from "axios";
import { CONFIG } from "../../services/config";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import Box from "@mui/material/Box";
import CardContent from '@mui/material/CardContent';
import { DataGrid, GridCellParams, GridCellModes, GridCellModesModel } from "@mui/x-data-grid";
// import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import { makeStyles, withStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import Toolbar from "@mui/material/Toolbar";
import { alpha } from "@mui/material/styles";
// import FormControlLabel from '@mui/material/FormControlLabel';
import { FormControlLabel } from '@material-ui/core';
import makeAnimated from 'react-select/animated';
import Checkbox from '@mui/material/Checkbox';
import {
    getRULESTYPERequest,
    getNEEDTYPERequest,
    getHIERARCHYTYPERequest,
    getALLOCATETOTYPERequest,
    getUPDATELOCATIONRLRequest,
    getDELETELOCATIONRLRequest,
    getLOADWEIGHTCHANGERLRequest,
    getLOADRULEDATERLRequest,
    getRETRIEVERULEDATERLRequest,
    getUPDATECHANGEWEIGHTSRLRequest,
    getUPDATERULESRLRLRequest,
} from "../../Redux/Action/rules&location";
import swal from "sweetalert";




const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
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

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};


const columns = [

    {
        field: "EOW",
        headerName: "EOW",
        width: 150,
    },


    {
        field: "WEIGHT",
        headerName: "WEIGHT %",
        description: "This column has a value getter and is not sortable.",
        editable: true,

        width: 150,
        //   renderHeader:likeWeightAction
    },

];
// const initialInd={
//     RULE_LEVEL: "",
//     EXACT_IND: "", 
//     RULE_TYPE: "", 
//     NET_NEED_IND: "", 
//     REGULAR_SALES_IND: "",
//     PROMO_SALES_IND: "", 
//     CLEARANCE_SALES_IND: "",
//     USESIZEPROFILE: "", 
//     DEFAULTAUTOPRESENTATIONMINANDQTYLIMITS: "", 
//     START_DATE1: "", 
//     END_DATE1: "", 
//     START_DATE2: "", 
//     END_DATE2: "", 
//     WEEKS_THIS_YEAR: "", 
//     WEEKS_LAST_YEAR: "", 
//     ON_ORDER_COMMIT_WEEKS: "", 
//     ON_ORDER_COMMIT_DATE: "", 
// }
const WeightsHeader = [
    { id: "EOW", label: "EOW" },
    { id: "WEIGHT", label: "Weight %" },
]


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
    // uploaddiv: {
    //     display: "flex",
    //     alignItems: "center",
    //     marginTop: "50px",
    //     textAlign: "start",
    //     gap: 20,
    //     // backgroundColor:"lightgreen"
    // },
    TitleHead: {
        // height: "25px",
        position: "sticky",
        top: -1,
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
    input: {
        // width: "250px",
        height: 37.8,
        // backgroundColor:"#f0f0f0",
        '& input + fieldset': {
            // borderColor: 'gray',
            borderRadius: "0",
            boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
        },
    },
    divBoxLeft: {
        width: "50%",
        float: "left"
    },
    divBoxRight: {
        marginLeft: "50%",
    },
    uploaddiv: {
        display: "flex",
        alignItems: "center",
        marginTop: "20px",
        textAlign: "start",
        gap: 10,
    },
    TableCell: {
        color: "#fff",
        padding: "6px 6px !important",
        lineHeight: "1.2rem !important",
    },
    float_container: {
        display: "inline-block",
        margin: "0rem 0.3rem",
        // padding: "1rem 1rem",
        // text-align: center;
    },
    container_child: {
        float: "left"
    },
    multiselectfield: {
        display: "inline-block",
        // border: "1px solid red",
        margin: "0rem",
        padding: "0rem 0rem",
        verticalAlign: "middle",
    },
    input: {
        // width: "250px",
        height: 37.8,
        // backgroundColor:"#f0f0f0",
        '& input + fieldset': {
            // borderColor: 'gray',
            borderRadius: "0",
            boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
        },
    },
    divHeight: {
        // flex: 1,
        padding: "0.2em",
        float: "left",
        minHeight: "100%",
    },
    divHeightMain: {
        display: "flex",
        alignItems: "stretch",
        justifyContent: "space-around"
    },
})

const styleSelect1 = {
    control: base => ({
        ...base,
        width: "200px",
        fontSize: "14px",
        margin: "0px 0px 0px 0px",
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
        height: '30px',
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
    menu: base => ({
        ...base,
        // override border radius to match the box
        borderRadius: 0,
        // backgroundColor: 'black',
        // kill the gap
        marginTop: 0
    }),
    menuList: base => ({
        ...base,
        // kill the white space on first and last option
        padding: 0
    })
};

const animatedComponents = makeAnimated();

const optionsTemplates = [
    { value: "Template Name", label: "Template Name" },
    { value: "option 2", label: "option 2" },
    { value: "option 3", label: "option 3" },
    { value: "option 4", label: "option 4" }
]


const LeftContainer = forwardRef(({ setSubmit, setLeftContData, ref, allocLevel, allocNoData, allocDetails, leftContData }) => {
    const [ruleType, setRuleType] = useState([]);
    const [Hierarchy, setHierarchy] = useState([]);
    const [Need, setNeed] = useState([]);
    const [Allocateto, setAllocateto] = useState([]);

    const [check1, setCheck1] = React.useState(true)
    const [check2, setCheck2] = React.useState(true)
    const [check3, setCheck3] = React.useState(false)
    const [check4, setCheck4] = React.useState(false)
    const [check5, setCheck5] = React.useState(false)
    const [check6, setCheck6] = React.useState(false)
    const [check7, setCheck7] = React.useState(false)
    const [check8, setCheck8] = React.useState(false)
    const [check9, setCheck9] = React.useState(false)

    const [changeWeights, setChangeWeights] = useState([])
    const [updateRulesRL, setUpdateRulesRL] = useState([]);

    // ****** DATE RANGE ***** //
    const [thisY, setThisY] = useState("")
    const [lastY, setLastY] = useState("")

    const [strt1, setStrt1] = useState("")
    const [strt2, setStrt2] = useState("")
    const [end1, setEnd1] = useState("")
    const [end2, setEnd2] = useState("")
    // const[ruleType,setRuleType]=useState();
    //for createalloc screen dailog
    // const [createAlloc,setCreateAlloc]=useState([])

    const [loading, setLoading] = useState(false);
    const [isSearch, setSearch] = useState(false);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    const [totalDataCwgt, setTotalDataCwgt] = useState([]);
    const [RuleRefreshCheck, setRuleRefreshCheck] = useState(false);

    const [updateLocationRL, setUpdateLocationRL] = React.useState([]);
    const [deleteLocationRL, setDeleteLocationRL] = React.useState([]);
    const [loadWeightChangeRL, setLoadWeightChangeRL] = React.useState([]);
    const [loadRuledateRL, setLoadRuledateRL] = React.useState([]);
    const [retrieveRuleDateRL, setRetrieveRuleDateRL] = React.useState([]);
    const [updateChangeWeightsRL, setUpdateChangeWeightsRL] = React.useState([]);
    const [retrieveRuleDateRLSample, setRetrieveRuleDateRLSample] = React.useState([]);


    const [updateRulesRLCheck, setupdateRulesRLcheck] = React.useState(false);
    const [loadWeightChangeRLCheck, setLoadWeightChangeRLCheck] = React.useState(false);
    const [loadRuledateRLCheck, setLoadRuledateRLCheck] = React.useState(false);
    const [retrieveRuleDateRLCheck, setRetrieveRuleDateRLCheck] = React.useState(false);
    const [validCheck, setValidCheck] = React.useState(false);
    const [validCheckOnce, setValidCheckOnce] = React.useState(false);

    const [error, setError] = useState(false);

    const [startd1, setStartd1] = useState();
    const [endd1, setEndd1] = useState();
    const [startd2, setStartd2] = useState();
    const [endd2, setEndd2] = useState();

    const RulesLocationLeftClasses = useStyles();

    const RulesLocationLeftData = useSelector(
        (state) => state.RulesLocationReducers
    );

    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        dispatch(getRULESTYPERequest([{}]));
        dispatch(getNEEDTYPERequest([{}]));
        dispatch(getHIERARCHYTYPERequest([{}]));
        dispatch(getALLOCATETOTYPERequest([{}]));
    }, [""]);

    useEffect(() => {
        setLeftContData({
            ...leftContData, END_DATE1: endd1,
            END_DATE2: endd2,
            START_DATE1: startd1,
            START_DATE2: startd2
        })
    }, [endd1, endd2, startd1, startd2])
    useEffect(() => {
        if (
            RulesLocationLeftData?.data?.ruleType
            && Array.isArray(RulesLocationLeftData?.data?.ruleType)
        ) {
            setRuleType(RulesLocationLeftData?.data?.ruleType);
            setLoading(false);
        } else if (
            RulesLocationLeftData?.data?.Need
            && Array.isArray(RulesLocationLeftData?.data?.Need)
        ) {
            setNeed(RulesLocationLeftData?.data?.Need);
            setLoading(false);
        } else if (
            RulesLocationLeftData?.data?.Hierarchy
            && Array.isArray(RulesLocationLeftData?.data?.Hierarchy)
        ) {
            setHierarchy(RulesLocationLeftData?.data?.Hierarchy);
            setLoading(false);
        } else if (
            RulesLocationLeftData?.data?.Allocateto
            && Array.isArray(RulesLocationLeftData?.data?.Allocateto)
        ) {
            setAllocateto(RulesLocationLeftData?.data?.Allocateto);
            setLoading(false);
        } else if (
            RulesLocationLeftData?.data?.updateLocationRL
            && Array.isArray(RulesLocationLeftData?.data?.updateLocationRL)
        ) {
            setUpdateLocationRL(RulesLocationLeftData?.data?.updateLocationRL);
            setLoading(false);
        } else if (
            RulesLocationLeftData?.data?.deleteLocationRL
            && Array.isArray(RulesLocationLeftData?.data?.deleteLocationRL)
        ) {
            setDeleteLocationRL(RulesLocationLeftData?.data?.deleteLocationRL);
            setLoading(false);
        } else if (
            RulesLocationLeftData?.data?.loadWeightChangeRL
            // && Array.isArray(RulesLocationLeftData?.data?.loadWeightChangeRL)
        ) {
            setLoadWeightChangeRL(RulesLocationLeftData?.data?.loadWeightChangeRL);
            setLoading(false);
        } else if (
            RulesLocationLeftData?.data?.loadRuledateRL
            && Array.isArray(RulesLocationLeftData?.data?.loadRuledateRL)
        ) {
            setLoadRuledateRL(RulesLocationLeftData?.data?.loadRuledateRL);
            setLoading(false);
        } else if (
            RulesLocationLeftData?.data?.retrieveRuleDateRL
            && Array.isArray(RulesLocationLeftData?.data?.retrieveRuleDateRL)
        ) {
            setRetrieveRuleDateRL(RulesLocationLeftData?.data?.retrieveRuleDateRL);
            setRetrieveRuleDateRLSample(RulesLocationLeftData?.data?.retrieveRuleDateRL);
            setLoading(false);
        } else if (
            RulesLocationLeftData?.data?.updateChangeWeightsRL
            // && Array.isArray(RulesLocationLeftData?.data?.updateChangeWeightsRL)
        ) {
            setUpdateChangeWeightsRL(RulesLocationLeftData?.data?.updateChangeWeightsRL);
            setLoading(false);
        } else if (
            RulesLocationLeftData?.data?.updateRulesRL
            // && Array.isArray(RulesLocationLeftData?.data?.updateRulesRL)
        ) {
            setUpdateRulesRL(RulesLocationLeftData?.data?.updateRulesRL);
            setLoading(false);
        } else {
            setSearch(false);
        }
    }, [RulesLocationLeftData?.data]);

    // const [checked, setChecked] = React.useState(false);

    console.log("loadWeightChangeRL123::", loadWeightChangeRL);

    //To open dialog
    const [open, setOpen] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleClickOpen = () => {
        setValidCheckOnce(true);

        if (leftContData.WEEKS_LAST_YEAR.length > 0 ||
            leftContData.WEEKS_THIS_YEAR.length > 0 ||
            (leftContData.START_DATE1.length > 0 && leftContData.END_DATE1.length > 0) ||
            (leftContData.START_DATE2.length > 0 && leftContData.END_DATE2.length > 0)
        ) {
            dispatch(getUPDATERULESRLRLRequest([leftContData]));

            setValidCheck(true)

        }
        else {
            console.log("retrieveRuleDateRL45678");
            swal(
                <div>
                    <p>Inputs required*</p>
                </div>
            )
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const HandleSaveChanges = () => {









        dispatch(getUPDATECHANGEWEIGHTSRLRequest(retrieveRuleDateRL));
        setOpen(false);
        setRetrieveRuleDateRLCheck(true);


    }

    if (retrieveRuleDateRLCheck) {
        // if (updateChangeWeightsRL.message==="Data Updated"){
        dispatch(getLOADRULEDATERLRequest([leftContData]));
        //}
        setRetrieveRuleDateRLCheck(false);
    }
    console.log("updateChangeWeightsRL::", updateChangeWeightsRL);


    if (validCheck) {
        // if (updateRulesRL.message === "Data Inserted" || updateRulesRL.message === "Data Updated") {
        setupdateRulesRLcheck(true)
        // }
        setValidCheck(false)
    }
    else if (updateRulesRLCheck) {
        dispatch(getLOADWEIGHTCHANGERLRequest([leftContData]));
        setupdateRulesRLcheck(false);
        setLoadWeightChangeRLCheck(true);
    }
    else if (loadWeightChangeRLCheck) {
        dispatch(getRETRIEVERULEDATERLRequest([leftContData]));
        setOpen(true)
        setLeftContData((prev) => {
            return {
                ...prev,
                CHANGEWEIGHTSCHECK: "Y"
            };
        })
        setLoadWeightChangeRLCheck(false);
        setValidCheckOnce(false)
    }

    //to open dialogfor changeweights
    // const handleClickOpen1 = () => {
    //     axios.post(CONFIG.BASE_URL + "/Alloc_change_weights_tab/", [{ "ALLOC_NO": "1234" }]).then(async (response) => {
    //         console.log(response);
    //         let data = await response.data.map((res, index) => ({ ...res, id: index + 1 }))
    //         setChangeWeights(data)
    //     });
    //     setOpenDialog(true);
    // };

    // const handleClose1 = () => {
    //     console.log("fdfdg");
    //     setOpenDialog(false);
    // }

    const handleRefreshRules = (e) => {
        setStartd1("");
        setStartd2("");
        setEndd1("");
        setEndd2("");
        setCheck1(true);
        setCheck2(true);
        setCheck3(false);
        setCheck4(false);
        setCheck5(false);
        setCheck6(false);
        setCheck7(false);
        setCheck8(false);
        setCheck9(false);
        setStrt1("");
        setStrt2("");
        setEnd1("");
        setEnd2("");
        setThisY("");
        setLastY("");
        setLeftContData((prev) => {
            return {
                ...prev,
                RULE_LEVEL: "",
                EXACT_IND: "",
                RULE_TYPE: "",
                NET_NEED_IND: "",
                REGULAR_SALES_IND: "Y",
                PROMO_SALES_IND: "Y",
                CLEARANCE_SALES_IND: "N",
                USESIZEPROFILE: "N",
                ENFORCE_PRES_MIN_IND: "N",
                START_DATE1: "",
                END_DATE1: "",
                START_DATE2: "",
                END_DATE2: "",
                WEEKS_THIS_YEAR: "",
                WEEKS_LAST_YEAR: "",
                ON_ORDER_COMMIT_WEEKS: "",
                ON_ORDER_COMMIT_DATE: "",
                EXACT_IND_VAL: "",
                NET_NEED_IND_VAL: "",
                CHANGEWEIGHTSCHECK: "N"
            };
        });
    }


    const handleswitchcheck = (e, val) => {
        console.log("e::.val", e, val)
        if (e.target.name === "check1") {
            setCheck1(val)
            if (val) {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        REGULAR_SALES_IND: "Y"
                    };
                })
            } else {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        REGULAR_SALES_IND: "N"
                    };
                })
            }
        }
        if (e.target.name === "check2") {
            setCheck2(val)
            if (val) {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        PROMO_SALES_IND: "Y"
                    };
                })
            } else {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        PROMO_SALES_IND: "N"
                    };
                })
            }
        }
        if (e.target.name === "check3") {
            setCheck3(e.target.checked)
            if (e.target.checked) {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        CLEARANCE_SALES_IND: "Y"
                    };
                })
            } else {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        CLEARANCE_SALES_IND: "N"
                    };
                })
            }
        }
        if (e.target.name === "check4") {
            setCheck4(val)
            if (val) {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        USESIZEPROFILE: "Y"
                    };
                })
            } else {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        USESIZEPROFILE: "N"
                    };
                })
            }
        }
        if (e.target.name === "check5") {
            setCheck5(val)
            if (val) {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        ENFORCE_PRES_MIN_IND: "Y"
                    };
                })
            } else {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        ENFORCE_PRES_MIN_IND: "N"
                    };
                })
            }
        }
        if (e.target.name === "check6") {
            console.log(123456)
            setCheck6(true);
            setCheck9(false);
        }
        if (e.target.name === "check7") {
            setCheck7(val)
            // setCheck8(!val)
        }
        if (e.target.name === "check8") {
            setCheck8(val)
            // setCheck7(!val)
        }
        if (e.target.name === "check9") {
            setCheck9(true)

        }
        if (e.target.name === "WEEKS_THIS_YEAR") {
            setLeftContData((prev) => {
                return {
                    ...prev,
                    WEEKS_THIS_YEAR: e.target.value,
                    END_DATE1: "",
                    END_DATE2: "",
                    START_DATE1: "",
                    START_DATE2: "",
                };
            })
            setRetrieveRuleDateRL([]);
        }
        if (e.target.name === "WEEKS_LAST_YEAR") {
            setLeftContData((prev) => {
                return {
                    ...prev,
                    WEEKS_LAST_YEAR: e.target.value,
                    END_DATE1: "",
                    END_DATE2: "",
                    START_DATE1: "",
                    START_DATE2: "",
                };
            })
            setRetrieveRuleDateRL([]);
        }
        if (e.target.name === "START_DATE1") {
            setLeftContData((prev) => {
                return {
                    ...prev,
                    START_DATE1: e.target.value,
                    WEEKS_THIS_YEAR: "",
                    WEEKS_LAST_YEAR: "",
                };
            })
            setRetrieveRuleDateRL([]);
        }
        if (e.target.name === "START_DATE2") {
            setLeftContData((prev) => {
                return {
                    ...prev,
                    START_DATE2: e.target.value,
                    WEEKS_THIS_YEAR: "",
                    WEEKS_LAST_YEAR: "",
                };
            })
            setRetrieveRuleDateRL([]);
        }
        if (e.target.name === "END_DATE1") {
            setLeftContData((prev) => {
                return {
                    ...prev,
                    END_DATE1: e.target.value,
                    WEEKS_THIS_YEAR: "",
                    WEEKS_LAST_YEAR: "",
                };
            })
            setRetrieveRuleDateRL([]);
        }
        if (e.target.name === "END_DATE2") {
            setLeftContData((prev) => {
                return {
                    ...prev,
                    END_DATE2: e.target.value,
                    WEEKS_THIS_YEAR: "",
                    WEEKS_LAST_YEAR: "",
                };
            })
            setRetrieveRuleDateRL([]);
        }
        if (e.target.name === "ON_ORDER_COMMIT_WEEKS") {
            setLeftContData((prev) => {
                return {
                    ...prev,
                    ON_ORDER_COMMIT_WEEKS: e.target.value,
                    ON_ORDER_COMMIT_DATE: "",
                };
            })
        }
        if (e.target.name === "ON_ORDER_COMMIT_DATE") {
            setLeftContData((prev) => {
                return {
                    ...prev,
                    ON_ORDER_COMMIT_DATE: e.target.value,
                    ON_ORDER_COMMIT_WEEKS: "",
                };
            })
        }
    }


    console.log("e::setLef:", leftContData, check1, check2, check3, check4)

    /////////////////////////////
    /////////////////////
    ////////////////////////////////
    const selectRuleType = (val) => {
        console.log("e::", val)
        if (val) {
            setLeftContData((prev) => {
                return {
                    ...prev,
                    RULE_TYPE: val.CODE_DESC
                };
            });
            if (val.CODE_DESC === "Forecast") {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        REGULAR_SALES_IND: "Y",
                        PROMO_SALES_IND: "N",
                        CLEARANCE_SALES_IND: "N",
                    };
                });
            }
            else if (val.CODE_DESC === "Manual") {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        REGULAR_SALES_IND: "Y",
                        PROMO_SALES_IND: "N",
                        CLEARANCE_SALES_IND: "N",
                        EXACT_IND: "",
                        RULE_LEVEL: "",
                        START_DATE1: "",
                        START_DATE2: "",
                        END_DATE1: "",
                        END_DATE2: "",
                        WEEKS_LAST_YEAR: "",
                        WEEKS_THIS_YEAR: "",
                    };
                });
                setCheck6(false);
                setCheck9(false);
                setStrt1("");
                setStrt2("");
                setEnd1("");
                setEnd2("");
                setThisY("");
                setLastY("");
            }
        }
        else {
            setLeftContData((prev) => {
                return {
                    ...prev,
                    RULE_TYPE: ""
                };
            });
        }
    }

    const selectNEEDType = (val) => {
        // console.log("value,e", val)
        if (val) {
            if (val.CODE_DESC === "Proportional") {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        EXACT_IND: "N",
                        EXACT_IND_VAL: val.CODE_DESC
                    };
                });
            }
            else if (val.CODE_DESC === "Exact") {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        EXACT_IND: "Y",
                        EXACT_IND_VAL: val.CODE_DESC
                    };
                });
            }
        }
        else {
            setLeftContData((prev) => {
                return {
                    ...prev,
                    EXACT_IND: ""
                };
            });
        }
    }

    const selectHierarchy = (val) => {
        console.log("e::555566", val)
        if (val) {
            setLeftContData((prev) => {
                return {
                    ...prev,
                    RULE_LEVEL: val.CODE_DESC
                };
            });
        }
        else {
            setLeftContData((prev) => {
                return {
                    ...prev,
                    RULE_LEVEL: ""
                };
            });
        }
    }

    const selectAllocateTo = (val) => {
        // console.log("value,e", val)
        if (val) {
            if (val.CODE_DESC === "Net Need") {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        NET_NEED_IND: "N",
                        NET_NEED_IND_VAL: val.CODE_DESC
                    };
                });
            }
            else if (val.CODE_DESC === "Gross Need") {
                setLeftContData((prev) => {
                    return {
                        ...prev,
                        NET_NEED_IND: "Y",
                        NET_NEED_IND_VAL: val.CODE_DESC
                    };
                });
            }
        }
        else {
            setLeftContData((prev) => {
                return {
                    ...prev,
                    NET_NEED_IND: "",
                    NET_NEED_IND_VAL: ""
                };
            });
        }
    }


    //////////////////////////////////
    /////////////////////
    //////////////////////////////////////

    const Inventory_Range = () => (
        <div className={RulesLocationLeftClasses.header_child}>
            <Box
                display="flex"
                sx={{
                    // width: "100%"
                }}
            >
                <div className={RulesLocationLeftClasses.divHeightMain}>
                    {(Object.keys(leftContData).length > 0 && leftContData.RULE_TYPE !== 'Manual')
                        ||
                        (Object.keys(leftContData).length > 0 && leftContData.RULE_TYPE.length === 0)
                        ?
                        <div className={RulesLocationLeftClasses.divHeight}>
                            <Box
                                component="fieldset"
                                display="inline-block"
                                sx={{
                                    backgroundColor: "",
                                    height: "100%",
                                    // width: "100%",
                                    margin: "10px 0px 0px 0px",
                                    // backgroundColor: "rgb(250, 250, 250)",
                                    borderRadius: 1,

                                    boxShadow: 2, border: 0,
                                    borderBottom: 3,
                                    border: "1px solid lightgrey",
                                    // border:"1px dotted gray",
                                    // borderRadius:"5px",
                                }}
                            >
                                <legend style={{ fontWeight: "bold", color: "#191970", }}>Date Range</legend>
                                <div>
                                    <FormControlLabel control={
                                        <Checkbox
                                            checked={check6}
                                            name="check6"
                                            // onChange={handleswitchcheck}
                                            onChange={(event) => {
                                                setCheck9(false)
                                                setCheck6(event.target.checked)
                                                if (!check6) {
                                                    setStartd1("");
                                                    setStartd2("");
                                                    setEndd1("");
                                                    setEndd2("");
                                                }
                                            }}
                                        />
                                    } label="Weeks from Today" />
                                </div>
                                {check6 ?
                                    <div>
                                        <div className={RulesLocationLeftClasses.header_child}>
                                            <InputLabel sx={{ fontWeight: "", fontSize: "14px", margin: "2px 5px 0px 2px", display: 'flex', float: 'left' }}>
                                                TY: </InputLabel>
                                            <TextField
                                                type="number"
                                                name="WEEKS_THIS_YEAR"
                                                // value={values.numberformat}
                                                onChange={handleswitchcheck}
                                                //onChange={(event)=>{setThisY(event.target.value)}}
                                                sx={{ width: "50px" }}
                                                // name="TY"
                                                id="formatted-numberformat-input"
                                                InputProps={{
                                                    style: { fontSize: 12, height: "25px" },
                                                }}
                                                variant="standard"
                                            />
                                        </div>

                                        <div className={RulesLocationLeftClasses.header_child}>
                                            <InputLabel sx={{ fontWeight: "", fontSize: "14px", margin: "2px 5px 0px 2px", display: 'flex', float: 'left' }}>
                                                LY: </InputLabel>
                                            <TextField
                                                type="number"
                                                sx={{ width: "50px" }}
                                                name="WEEKS_LAST_YEAR"
                                                // value={values.numberformat}
                                                onChange={handleswitchcheck}
                                                //onChange={(event)=>{setLastY(event.target.value)}}
                                                // name="LY"
                                                id="formatted-numberformat-input"
                                                InputProps={{
                                                    style: { fontSize: 12, height: "25px" },
                                                }}
                                                variant="standard"
                                            />

                                        </div>
                                    </div>
                                    : null}

                                <div>
                                    <Button
                                        sx={{
                                            fontSize: "12px",
                                            margin: "10px 0px 0px 0px",
                                        }}
                                        onClick={handleClickOpen}
                                        variant="contained">
                                        Change Weights
                                    </Button>
                                </div>

                                <div>
                                    <FormControlLabel control={
                                        <Checkbox
                                            checked={check9}
                                            name="check9"
                                            //onChange={handleswitchcheck}
                                            onChange={(event) => {
                                                setCheck6(false);
                                                setCheck9(event.target.checked);
                                                if (!check9) {
                                                    setThisY("");
                                                    setLastY("");
                                                }
                                            }}
                                        />
                                    } label="Start/End Dates" />

                                </div>

                                {check9 ?
                                    <div>
                                        <div className={RulesLocationLeftClasses.header_child}>
                                            <div>
                                                <InputLabel sx={{ fontWeight: "", fontSize: "14px", margin: "2px 5px 0px 2px", display: 'flex', float: 'left' }}>
                                                    Start: </InputLabel>
                                            </div>

                                            <div >
                                                <TextField
                                                    value={startd1}
                                                    onInput={(e) => {
                                                        let dayOfWeek = 6;
                                                        let date = new Date(e.target.value);
                                                        let diff = date.getDay() - dayOfWeek;
                                                        if (diff > 0) {
                                                            date.setDate(date.getDate() + 7);
                                                        }
                                                        else if (diff < 0) {
                                                            date.setDate(date.getDate() + ((-1) * diff))
                                                        }
                                                        setStartd1(date.toISOString().split('T')[0])
                                                        console.log(date.toISOString());
                                                    }}
                                                    variant="outlined"
                                                    type="date"
                                                    size="small"
                                                    name="START_DATE1"
                                                    format="yyyy/MM/dd"
                                                    //   inputProps={{ max: currentDate() }}
                                                    sx={{
                                                        margin: "0px 0px 10px 2px", width: "120px"
                                                        , "& .MuiInputBase-input.Mui-disabled": {
                                                            backgroundColor: "#f0f0f0"
                                                        }
                                                    }}
                                                    id="outlined-disabled"
                                                    label=""
                                                    // value={allocDetails[0].RELEASE_DATE}
                                                    // defaultValue={allocDetails[0].RELEASE_DATE}
                                                    InputProps={{
                                                        style: { fontSize: 12 },
                                                        shrink: true,
                                                        className: RulesLocationLeftClasses.input,
                                                    }}
                                                    onChange={handleswitchcheck}
                                                />
                                            </div>

                                            <div >
                                                <TextField
                                                    value={startd2}
                                                    onInput={(e) => {
                                                        let dayOfWeek = 6;//friday
                                                        let date = new Date(e.target.value);
                                                        let diff = date.getDay() - dayOfWeek;
                                                        if (diff > 0) {
                                                            date.setDate(date.getDate() + 7);
                                                        }
                                                        else if (diff < 0) {
                                                            date.setDate(date.getDate() + ((-1) * diff))
                                                        }
                                                        setStartd2(date.toISOString().split('T')[0])
                                                        console.log(date.toISOString());
                                                    }}
                                                    variant="outlined"
                                                    type="date"
                                                    size="small"
                                                    name="START_DATE2"
                                                    format="yyyy/MM/dd"
                                                    //   inputProps={{ max: currentDate() }}
                                                    sx={{
                                                        margin: "0px 0px 10px 2px", width: "120px"
                                                        , "& .MuiInputBase-input.Mui-disabled": {
                                                            backgroundColor: "#f0f0f0"
                                                        }
                                                    }}
                                                    id="outlined-disabled"
                                                    label=""
                                                    // value={allocDetails[0].RELEASE_DATE}
                                                    // defaultValue={allocDetails[0].RELEASE_DATE}
                                                    InputProps={{
                                                        style: { fontSize: 12 },
                                                        shrink: true,
                                                        className: RulesLocationLeftClasses.input,
                                                    }}
                                                    onChange={handleswitchcheck}

                                                />

                                            </div>
                                        </div>


                                        <div className={RulesLocationLeftClasses.header_child}>
                                            <div>
                                                <InputLabel sx={{ fontWeight: "", fontSize: "14px", margin: "2px 5px 0px 2px", display: 'flex', float: 'left' }}>
                                                    End: </InputLabel>
                                            </div>

                                            <div >

                                                <TextField
                                                    value={endd1}
                                                    onInput={(e) => {
                                                        let dayOfWeek = 6;//friday
                                                        let date = new Date(e.target.value);
                                                        let diff = date.getDay() - dayOfWeek;
                                                        if (diff > 0) {
                                                            date.setDate(date.getDate() + 7);
                                                        }
                                                        else if (diff < 0) {
                                                            date.setDate(date.getDate() + ((-1) * diff))
                                                        }
                                                        setEndd1(date.toISOString().split('T')[0])
                                                        console.log(date.toISOString());
                                                    }}
                                                    variant="outlined"
                                                    type="date"
                                                    size="small"
                                                    name="END_DATE1"
                                                    format="yyyy/MM/dd"
                                                    //   inputProps={{ max: currentDate() }}
                                                    sx={{
                                                        margin: "0px 0px 10px 2px", width: "120px"
                                                        , "& .MuiInputBase-input.Mui-disabled": {
                                                            backgroundColor: "#f0f0f0"
                                                        }
                                                    }}
                                                    id="outlined-disabled"
                                                    // value={allocDetails[0].RELEASE_DATE}
                                                    // defaultValue={allocDetails[0].RELEASE_DATE}
                                                    InputProps={{
                                                        style: { fontSize: 12 },
                                                        shrink: true,
                                                        className: RulesLocationLeftClasses.input,
                                                    }}
                                                    onChange={handleswitchcheck}

                                                />
                                            </div>

                                            <div >
                                                <TextField
                                                    value={endd2}
                                                    onInput={(e) => {
                                                        let dayOfWeek = 6;//friday
                                                        let date = new Date(e.target.value);
                                                        let diff = date.getDay() - dayOfWeek;
                                                        if (diff > 0) {
                                                            date.setDate(date.getDate() + 7);
                                                        }
                                                        else if (diff < 0) {
                                                            date.setDate(date.getDate() + ((-1) * diff))
                                                        }
                                                        setEndd2(date.toISOString().split('T')[0])
                                                        console.log(date.toISOString());
                                                    }}
                                                    variant="outlined"
                                                    type="date"
                                                    size="small"
                                                    name="END_DATE2"
                                                    format="yyyy/MM/dd"
                                                    //   inputProps={{ max: currentDate() }}
                                                    sx={{
                                                        margin: "0px 0px 10px 2px", width: "120px"
                                                        , "& .MuiInputBase-input.Mui-disabled": {
                                                            backgroundColor: "#f0f0f0"
                                                        }
                                                    }}
                                                    id="outlined-disabled"
                                                    label=""
                                                    // value={allocDetails[0].RELEASE_DATE}
                                                    // defaultValue={allocDetails[0].RELEASE_DATE}
                                                    InputProps={{
                                                        style: { fontSize: 12 },
                                                        shrink: true,
                                                        className: RulesLocationLeftClasses.input,
                                                    }}
                                                    onChange={handleswitchcheck}

                                                />

                                            </div>
                                        </div>
                                    </div>
                                    : null}
                            </Box>
                        </div> : null}

                    <div className={RulesLocationLeftClasses.divHeight}>
                        <Box
                            component="fieldset"
                            display="inline-block"
                            sx={{
                                backgroundColor: "",
                                height: "100%",
                                // width: "100%",
                                margin: "10px 0px 0px 0px",
                                // backgroundColor: "rgb(250, 250, 250)",
                                borderRadius: 1,

                                boxShadow: 2, border: 0,
                                borderBottom: 3,
                                border: "1px solid lightgrey",
                                // border:"1px dotted gray",
                                // borderRadius:"5px",
                            }}
                        >
                            <legend style={{ fontWeight: "bold", color: "#191970", }}>Include Inventory</legend>
                            <div>
                                <FormControlLabel control={
                                    <Checkbox
                                        checked={check7}
                                        name="check7"
                                        //onChange={handleswitchcheck}
                                        onChange={(event) => {
                                            setCheck8(false);
                                            setCheck7(event.target.checked);
                                        }}
                                    />
                                } label="Weeks from Today" />
                            </div>

                            {check7 ?
                                <div>
                                    <InputLabel sx={{ fontWeight: "", fontSize: "14px", margin: "2px 5px 0px 2px", display: 'flex', float: 'left' }}>
                                        WEEKS NO: </InputLabel>
                                    <TextField
                                        type="number"
                                        // value={values.numberformat}
                                        // onChange={handleChange}
                                        name="ON_ORDER_COMMIT_WEEKS"
                                        sx={{ width: "50px" }}
                                        // name="TY"
                                        id="formatted-numberformat-input"
                                        InputProps={{
                                            style: { fontSize: 12, height: "25px" },
                                        }}
                                        variant="standard"
                                        onChange={handleswitchcheck}
                                    />
                                </div>
                                : null}

                            <div>
                                <FormControlLabel control={
                                    <Checkbox
                                        checked={check8}
                                        name="check8"
                                        //onChange={handleswitchcheck}
                                        onChange={(event) => {
                                            setCheck7(false);
                                            setCheck8(event.target.checked);
                                        }}
                                    />
                                } label="On Order Commit Date" />
                            </div>

                            {check8 ?
                                <div>
                                    <div>
                                        <InputLabel sx={{ fontWeight: "", fontSize: "14px", margin: "2px 5px 0px 2px", display: 'flex', float: 'left' }}>
                                            Final Date: </InputLabel>
                                    </div>

                                    <div>
                                        <TextField
                                            variant="outlined"
                                            type="date"
                                            size="small"
                                            format="yyyy/MM/dd"
                                            name="ON_ORDER_COMMIT_DATE"
                                            //   inputProps={{ max: currentDate() }}
                                            sx={{
                                                margin: "0px 0px 10px 2px", width: "120px"
                                                , "& .MuiInputBase-input.Mui-disabled": {
                                                    backgroundColor: "#f0f0f0"
                                                }
                                            }}
                                            id="outlined-disabled"
                                            label=""
                                            // value={allocDetails[0].RELEASE_DATE}
                                            // defaultValue={allocDetails[0].RELEASE_DATE}
                                            InputProps={{
                                                style: { fontSize: 12 },
                                                shrink: true,
                                                className: RulesLocationLeftClasses.input,
                                            }}
                                            onChange={handleswitchcheck}
                                        />
                                    </div>
                                </div>
                                : null}

                        </Box>
                    </div>
                </div>
            </Box>
        </div>

    )


    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        root: {
            height: "10px",
        },
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

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





    function EnhancedTableHead(props) {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
            props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <>
                <TableHead className={RulesLocationLeftClasses.TitleHead}>
                    <TableRow >
                        {WeightsHeader.map((headCell) => (
                            <StyledTableCell
                                key={headCell.id}
                                className={RulesLocationLeftClasses.TableCell}
                                size="small"
                                sortDirection={orderBy === headCell.id ? order : false}
                                style={{
                                    whiteSpace: "nowrap"
                                }}
                            >
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : "asc"}
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
                                            {order === "desc"
                                                ? "sorted descending"
                                                : "sorted ascending"}
                                        </Box>
                                    ) : null}
                                </TableSortLabel>
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>

            </>
        );
    }

    EnhancedTableHead.propTypes = {
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        // onSelectAllClick: PropTypes.func.isRequired,
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
                    ...(retrieveRuleDateRL.length > 0 &&
                    {
                        minHeight: {
                            minHeight: "20px !important",
                        },
                        // border:"2px solid black", 
                        bgcolor: (theme) =>
                            alpha(
                                theme.palette.primary.main,
                                theme.palette.action.activatedOpacity
                            ),
                    }),
                }}
            >
                {retrieveRuleDateRL.length > 0 && (
                    <Typography
                        sx={{
                            flex: "1 1 100%", display: "flex",
                            justifyContent: "flex-end",
                            padding: "0px 20px 0px 0px"
                        }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        Rows {retrieveRuleDateRL.length}
                    </Typography>
                )}
            </Toolbar>
        );
    }

    function descendingComparator(a, b, orderBy) {
        let c, d;
        if (orderBy == "EOW") {
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

    const handleRequestSort = (event, property) => {
        const isAsc = (orderBy === property && order === 'asc');
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const onTableChange = (e, value) => {
        console.log("retrieveRuleDateRL33:", value, e, e.target.name, e.target.value, retrieveRuleDateRL);
        // setRetrieveRuleDateRLSample([])
        {
            retrieveRuleDateRL.map((row) => {
                console.log("retrieveRuleDateRL11:", row);
                if (row.EOW_DATE === value) {
                    row[e.target.name] = e.target.value
                    console.log("retrieveRuleDateRL22:", row);
                }
            })
        }
        setRetrieveRuleDateRL(retrieveRuleDateRL)

    };

    console.log("retrieveRuleDateRL::", retrieveRuleDateRL)

    return (
        // <div className={RulesLocationLeftClasses.divBoxLeft}>
        <Box
            component="fieldset"
            display="inline-block"
            sx={{
                backgroundColor: "",
                height: "100%",
                width: "98.5%",
                margin: "10px 0px 0px 0px",
                // backgroundColor: "rgb(250, 250, 250)",
                borderRadius: 1,

                boxShadow: 2, border: 0,
                borderBottom: 3,
                border: "1px solid lightgrey",
                // border:"1px dotted gray",
                // borderRadius:"5px",
            }}
        >
            <div className={RulesLocationLeftClasses.header_container}>
                <div className={RulesLocationLeftClasses.header_child}>
                    <InputLabel sx={{ fontWeight: "bold", fontSize: "18px", margin: "2px 0px -5px 2px", display: 'flex', float: 'left' }}>
                        Rules & History Range</InputLabel>
                </div>
                <div>
                    <div className={RulesLocationLeftClasses.header_child}>
                        <Button
                            sx={{
                                fontSize: "12px",
                                margin: "10px 0px 0px 0px",
                            }}
                            onClick={handleRefreshRules}
                            // value={leftContData}
                            variant="contained">
                            Refresh
                        </Button>
                    </div>
                    <div className={RulesLocationLeftClasses.header_child}>
                        <Button
                            sx={{
                                fontSize: "12px",
                                margin: "10px 0px 0px 0px",
                            }}
                            variant="contained">
                            Save Template
                        </Button>
                    </div>
                </div>

                <div>
                    {
                        (Object.keys(leftContData).length > 0 && leftContData.RULE_TYPE === 'History')
                            ||
                            (Object.keys(leftContData).length > 0 && leftContData.RULE_TYPE.length === 0)
                            ?
                            <div>
                                <div className={RulesLocationLeftClasses.header_child}>
                                    <InputLabel sx={{ fontWeight: "bold", fontSize: "18px", margin: "12px 0px 2px 2px", display: 'flex', float: 'left' }}>
                                        Sales history Types :</InputLabel>
                                </div>
                                <div>
                                    <div className={RulesLocationLeftClasses.header_child}>
                                        <FormControlLabel size="small" sx={{ margin: "0px", padding: "0px" }}
                                            control={
                                                <Switch
                                                    size="small"
                                                    name="check1"
                                                    defaultChecked
                                                    checked={check1}
                                                    onChange={handleswitchcheck}
                                                    value={leftContData.REGULAR_SALES_IND}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            }
                                            label={<InputLabel
                                                sx={{
                                                    fontWeight: "bold",
                                                    fontSize: "14px",
                                                    margin: "0px 0px 0px 0px",
                                                    padding: "0px 0px 0px 0px",
                                                    display: 'inline',
                                                    float: 'left'
                                                }}>
                                                Regular</InputLabel>}
                                        />
                                    </div>
                                    <div className={RulesLocationLeftClasses.header_child}>
                                        <FormControlLabel size="small" sx={{ margin: "0px", padding: "0px" }}
                                            control={
                                                <Switch
                                                    size="small"
                                                    name="check2"
                                                    defaultChecked
                                                    checked={check2}
                                                    onChange={handleswitchcheck}
                                                    //  onClick={() => { setCheck1(!check1) }}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            }
                                            label={<InputLabel
                                                sx={{
                                                    fontWeight: "bold",
                                                    fontSize: "14px",
                                                    margin: "0px 0px 0px 0px",
                                                    padding: "0px 0px 0px 0px",
                                                    display: 'inline',
                                                    float: 'left'
                                                }}>
                                                Promotional</InputLabel>}
                                        />
                                    </div>
                                    <div className={RulesLocationLeftClasses.header_child}>
                                        <FormControlLabel size="small" sx={{ margin: "0px", padding: "0px" }}
                                            control={
                                                <Switch
                                                    size="small"
                                                    name="check3"
                                                    checked={check3}
                                                    // onChange={handleswitchcheck}
                                                    onChange={handleswitchcheck}
                                                    // value={leftContData.CLEARANCE_SALES_IND}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            }
                                            label={<InputLabel
                                                sx={{
                                                    fontWeight: "bold",
                                                    fontSize: "14px",
                                                    margin: "0px 0px 0px 0px",
                                                    padding: "0px 0px 0px 0px",
                                                    display: 'inline',
                                                    float: 'left'
                                                }}>
                                                Clearance</InputLabel>}
                                        />
                                    </div>
                                </div>
                            </div>
                            : null}
                </div>




                {(allocDetails.length > 0 ? allocDetails[0].ALLOC_LEVEL == 'Style Diff' : allocDetails[0].ALLOC_LEVEL == 'Sku') ?
                    <div>
                        <FormControlLabel size="small" sx={{ margin: "0px", padding: "0px" }}
                            control={
                                <Switch
                                    size="small"
                                    name="check4"
                                    checked={check4}
                                    onChange={handleswitchcheck}
                                    // onClick={() => { setCheck1(!check1) }}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            }
                            label={<InputLabel
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: "14px",
                                    margin: "0px 0px 0px 0px",
                                    padding: "0px 0px 0px 0px",
                                    display: 'inline',
                                    float: 'left'
                                }}>
                                Use Size Profile</InputLabel>}
                        />
                    </div> : null}

                <div>
                    <FormControlLabel size="small" sx={{ margin: "0px", paddingBottom: "5px" }}
                        control={
                            <Switch
                                size="small"
                                name="check5"
                                checked={check5}
                                onChange={handleswitchcheck}
                                // onClick={() => { setCheck1(!check1) }}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        }
                        label={<InputLabel
                            sx={{
                                fontWeight: "bold",
                                fontSize: "14px",
                                margin: "0px 0px 0px 0px",
                                padding: "0px 0px 0px 2px",
                                display: 'inline',
                                float: 'left'
                            }}>
                            Default Auto Presentation Min and Qty Limits</InputLabel>}
                    />
                </div>

                <div>
                    <div className={RulesLocationLeftClasses.header_child}>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "16px", margin: "2px 0px 0px 2px", display: 'flex', float: 'left' }}>
                            Rules Template :</InputLabel>
                    </div>
                    <div className={RulesLocationLeftClasses.header_child}>
                        <Select
                            maxMenuHeight={180}
                            classNamePrefix="mySelect"
                            getOptionLabel={option =>
                                `${option.label.toString()}`}
                            getOptionValue={option => option.label}
                            options={optionsTemplates.length > 0 ? optionsTemplates : []}
                            isSearchable={true}
                            menuPlacement="auto"
                            isMulti
                            isClearable={true}
                            closeMenuOnSelect={true}
                            hideSelectedOptions={false}
                            // sx={{ width: "100%" }}
                            styles={styleSelect1}
                            components={animatedComponents}
                        />
                    </div>
                    <div className={RulesLocationLeftClasses.header_child}>
                        <Button
                            sx={{
                                // fontSize: "12px",
                                margin: "0px 0px 0px 0px",
                            }}
                            onClick={handleClickOpen}
                            variant="contained">
                            Apply
                        </Button>
                    </div>

                    {/* <button className='sub-container-btns' onClick={handleClickOpen}>Apply</button> */}
                </div>


                <div>
                    <div className={RulesLocationLeftClasses.header_child}>
                        <div>
                            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "12px 0px 0px 2px", display: 'flex', float: 'left' }}>
                                Rule Type</InputLabel>
                        </div>
                        <div>
                            <Select
                                maxMenuHeight={180}
                                classNamePrefix="mySelect"
                                getOptionLabel={option =>
                                    `${option.CODE_DESC.toString()}`}
                                getOptionValue={option => option.CODE_DESC}
                                options={ruleType.length > 0 ? ruleType : []}
                                isSearchable={true}
                                onChange={selectRuleType}
                                menuPlacement="auto"
                                // isMulti
                                isClearable={true}
                                closeMenuOnSelect={true}
                                hideSelectedOptions={false}
                                // sx={{ width: "100%" }}
                                value={ruleType.filter(obj => leftContData?.RULE_TYPE === (obj.CODE_DESC))}
                                styles={styleSelect1}
                                components={animatedComponents}
                            />
                        </div>
                    </div>

                    {(Object.keys(leftContData).length > 0 && leftContData.RULE_TYPE !== 'Manual')
                        ||
                        (Object.keys(leftContData).length > 0 && leftContData.RULE_TYPE.length === 0)
                        ?
                        <div className={RulesLocationLeftClasses.header_child}>
                            <div>
                                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "12px 0px 0px 2px", display: 'flex', float: 'left' }}>
                                    Need</InputLabel>
                            </div>
                            <div>
                                <Select
                                    maxMenuHeight={180}
                                    classNamePrefix="mySelect"
                                    getOptionLabel={option =>
                                        `${option.CODE_DESC.toString()}`}
                                    getOptionValue={option => option.CODE_DESC}
                                    options={Need.length > 0 ? Need : []}
                                    isSearchable={true}
                                    onChange={selectNEEDType}
                                    menuPlacement="auto"
                                    // isMulti
                                    isClearable={true}
                                    closeMenuOnSelect={true}
                                    hideSelectedOptions={false}
                                    // sx={{ width: "100%" }}
                                    value={Need.filter(obj => leftContData?.EXACT_IND_VAL === (obj.CODE_DESC))}
                                    styles={styleSelect1}
                                    components={animatedComponents}
                                />
                            </div>
                        </div> : null}

                    {(Object.keys(leftContData).length > 0 && leftContData.RULE_TYPE !== 'Manual')
                        ||
                        (Object.keys(leftContData).length > 0 && leftContData.RULE_TYPE.length === 0)
                        ?
                        <div className={RulesLocationLeftClasses.header_child}>
                            <div>
                                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "12px 0px 0px 2px", display: 'flex', float: 'left' }}>
                                    Hierarchy</InputLabel>
                            </div>
                            <div>
                                <Select
                                    maxMenuHeight={180}
                                    classNamePrefix="mySelect"
                                    getOptionLabel={option =>
                                        `${option.CODE_DESC.toString()}`}
                                    getOptionValue={option => option.CODE_DESC}
                                    options={Hierarchy.length > 0 ? Hierarchy : []}
                                    isSearchable={true}
                                    onChange={selectHierarchy}
                                    menuPlacement="auto"
                                    // isMulti
                                    isClearable={true}
                                    closeMenuOnSelect={true}
                                    hideSelectedOptions={false}
                                    // sx={{ width: "100%" }}
                                    styles={styleSelect1}
                                    components={animatedComponents}
                                    value={Hierarchy.filter(obj => leftContData?.RULE_LEVEL === (obj.CODE_DESC))}
                                />
                            </div>
                        </div> : null}

                    <div className={RulesLocationLeftClasses.header_child}>
                        <div>
                            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "12px 0px 0px 2px", display: 'flex', float: 'left' }}>
                                Allocate To</InputLabel>
                        </div>
                        <div>
                            <Select
                                maxMenuHeight={180}
                                classNamePrefix="mySelect"
                                getOptionLabel={option =>
                                    `${option.CODE_DESC.toString()}`}
                                getOptionValue={option => option.CODE_DESC}
                                options={Allocateto.length > 0 ? Allocateto : []}
                                isSearchable={true}
                                onChange={selectAllocateTo}
                                menuPlacement="auto"
                                // isMulti
                                isClearable={true}
                                closeMenuOnSelect={true}
                                hideSelectedOptions={false}
                                // sx={{ width: "100%" }}
                                styles={styleSelect1}
                                components={animatedComponents}
                                value={Allocateto.filter(obj => leftContData?.NET_NEED_IND_VAL === (obj.CODE_DESC))}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    {Inventory_Range()}
                </div>
            </div>


            <div>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    maxWidth="sm"
                >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                        <b>Change Weights</b>
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        <Box sx={{ height: "auto", width: "300px" }}>
                            <Paper sx={{ marginTop: "10px" }}>
                                <TableContainer style={{
                                    maxHeight: 360,
                                }} component={Paper}>
                                    <Table aria-label="customized table">
                                        <EnhancedTableHead
                                            //   numSelected={selected.length}
                                            order={order}
                                            orderBy={orderBy}
                                            // onSelectAllClick={handleSelectAllClick}
                                            onRequestSort={handleRequestSort}
                                            rowCount={retrieveRuleDateRL.length}
                                        />
                                        <TableBody >
                                            {stableSort(retrieveRuleDateRL, getComparator(order, orderBy))
                                                .map((row, index) => {
                                                    // const isItemSelected = isSelected(row.EOW);
                                                    console.log("retrieveRuleDateRL555", retrieveRuleDateRL);
                                                    const labelId = `enhanced-table-checkbox-${index}`;
                                                    return (
                                                        <TableRow
                                                            hover
                                                            role="checkbox"
                                                            // aria-checked={isItemSelected}
                                                            tabIndex={-1}
                                                            key={row.EOW}
                                                        // selected={isItemSelected}
                                                        >

                                                            <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}>
                                                                {row.EOW_DATE}
                                                            </StyledTableCell>

                                                            <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", padding: 0 }} textAlign="right">
                                                                <TextField

                                                                    InputProps={{

                                                                        style: { fontSize: 12, height: "30px", width: "100px" },

                                                                    }}
                                                                    defaultValue={row.WEIGHT}

                                                                    name="WEIGHT"
                                                                    onChange={(e) => onTableChange(e, row.EOW_DATE)}
                                                                    autoComplete="off"
                                                                    inputProps={{
                                                                        maxLength: 3,
                                                                    }}
                                                                    onKeyDown={((e) => {
                                                                        console.log(e.keyCode)
                                                                        if (e.keyCode < 91 && e.keyCode > 64) {
                                                                            e.preventDefault()
                                                                        }
                                                                    })}
                                                                //     inputProps={{
                                                                //         maxLength: 3,


                                                                //     }}

                                                                />
                                                            </StyledTableCell>
                                                        </TableRow >
                                                    );
                                                })}
                                            {retrieveRuleDateRL.length < 5 ?
                                                [...Array(5 - (retrieveRuleDateRL.length)).keys()].map(val => (
                                                    <TableRow  >
                                                        <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}></StyledTableCell>
                                                        <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}></StyledTableCell>
                                                    </TableRow >
                                                )) : false}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                {retrieveRuleDateRL.length > 0 ? <EnhancedTableToolbar /> : null}
                            </Paper>
                        </Box>
                    </DialogContent>
                    <DialogActions>



                        <Button autoFocus onClick={HandleSaveChanges}>
                            Save changes
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
            </div>


        </Box>
    )
})

export default LeftContainer