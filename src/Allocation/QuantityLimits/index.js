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
    getALLOCHEADDETAILSRequest,
    getQTYLIMITSRequest,
    getALLOCNODETAILSRequest,
    getUPDATEQTYLIMITSRequest,
    getOKQTYLIMITSSRNRequest,
} from "../../Redux/Action/quantityLimits";
import CircularProgress from "@mui/material/CircularProgress";
// import { headCells } from "./tableHead";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SendIcon from "@mui/icons-material/Send";
//import { trnType } from "./transType.js";
// import { errorList } from "./errorType.js";
import { alpha } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import swal from '@sweetalert/with-react';
// import TrnTypeList from "../TRNTYPE";
import Select, { useStateManager } from 'react-select';
import CreateAllocation from "../../Allocation/CreateScreen/index"
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
import Switch from '@mui/material/Switch';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import Toolbar from "@mui/material/Toolbar";
// import SearchTableData from "../Search";
import { visuallyHidden } from '@mui/utils';
import { headCells } from "./tableHead";
import TableSortLabel from '@mui/material/TableSortLabel';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import ForwardIcon from '@mui/icons-material/Forward';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Card, CardContent, ListItemIcon } from "@mui/material";
import { height } from "@mui/system";
import { BsFillEraserFill } from 'react-icons/bs';
import ClearIcon from '@mui/icons-material/Clear';
import PassAllocNoScreen from "../CreateScreen/index";
// BsFillEraserFill


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const animatedComponents = makeAnimated();



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
    inputFielddate: {
        width: "200px",
        // margin:"10px 0px 0px 0px",
        height: 38,
        border: 0,
        // backgroundColor:"#f0f0f0",
        '& input + fieldset': {
            // borderColor: 'gray',
            borderRadius: "0",
            boxShadow: "rgba(0, 0, 0, 0.19) 0px 1px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px"
        },
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
    inputtable: {
        height: "30px"
    },
    float_child: {
        display: "inline-block",
        marginBottom: "0.2rem",
        // padding: "0rem 0rem",
        // verticalAlign: "middle",
    },
    sample: {
        border: "1px solid red"
    },
    TableCell: {
        color: "#fff",
        padding: "6px 6px !important",
        lineHeight: "1.2rem !important",
    },
});

const initialHeaderData = {
    ALLOC_CRITERIA: "",
    CONTEXT: "",
    ALLOC_LEVEL: "",
    ALLOC_TYPE: "",
    STATUS: "",
    PROMOTION: "",
    CREATE_ID: JSON.parse(localStorage.getItem("userData"))?.username,
    ALLOC_DESC: "",
    RELEASE_DATE: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),
    ALLOC_NO: "",
    ALLOC_LEVEL_CODE: "",
    ALLOC_TYPE_CODE: "",
    STATUS_CODE: "",
    PROMOTION_CODE: "",
    CONTEXT_CODE: "",
}

const QtyHeader = [
    { id: "LOCATION", label: "Location" },
    { id: "GROUP_ID", label: "Loc Group" },
    { id: "DEFAULT_WH", label: "Def WH" },
    { id: "ITEM", label: "Item" },
    { id: "ITEM_DESC", label: "Item Desc" },
    { id: "DIFF_ID", label: "Diff ID" },
    { id: "SKU_COUNT", label: "No of SKU's" },
    { id: "SOM_QTY", label: "SOM Qty" },
    { id: "TREND", label: "Trend" },
    { id: "WOS", label: "WOS" },
    { id: "MIN", label: "Min" },
    { id: "TRESHOLD", label: "Threshold" },
    { id: "MAX", label: "Max" },
    { id: "MIN_NEED", label: "Min Need" },
]

const InlineHeader = {
    LOCATION: "",
    GROUP_ID: "",
    DEFAULT_WH: "",
    ITEM: "",
    ITEM_DESC: "",
    DIFF_ID: "",
    SKU_COUNT: "",
    SOM_QTY: "",
}


const QuantityLimits = ({ allocNoData, tab, setTab }) => {
    const [isSearch, setSearch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isSubmit, setSubmit] = useState(false);
    const [searchHeaderData, setSearchHeaderData] = useState(initialHeaderData);

    const [allocDetails, setAllocDetails] = useState([{}]);
    const [selected, setSelected] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [qtyLimitsData, setQtyLimitsData] = useState([]);
    const [inputValue, setInputValue] = useState([]);
    const [copyValue, setCopyValue] = useState([]);
    // const [InCheck, setInCheck] = React.useState(false);
    const [checked, setChecked] = React.useState(true);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    const [eraseValue, setEraseValue] = useState([]);
    const [sampleVal, setSampleVal] = useState([]);
    const [allocNoDtl, setAllocNoDtl] = useState([]);
    const [updateQtyLimitsData, setUpdateQtyLimitsData] = useState([]);
    const [OkQtyLimitsData, setOkQtyLimitsData] = useState([]);

    const [validCheckQty, setvalidCheckQty] = React.useState(false);

    var I_MODE={"I_MODE":"New"}

    const theme = useTheme();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const QuantityLimitsClasses = useStyles();

    const QuantityLimitsData = useSelector(
        (state) => state.QuantityLimitsReducers
    );

    const dispatch = useDispatch();

    useEffect(() => {
        document.title = 'Quantity Limits';
    }, []);

    useEffect(() => {
        setLoading(true);
        
        dispatch(getALLOCNODETAILSRequest([{}]))
        dispatch(getQTYLIMITSRequest([{...allocNoData,...I_MODE}]));
        dispatch(getALLOCHEADDETAILSRequest([allocNoData]));
    }, [""]);


    useEffect(() => {
        if (
            QuantityLimitsData?.data?.allocDetails
            && Array.isArray(QuantityLimitsData?.data?.allocDetails)
        ) {
            setAllocDetails(QuantityLimitsData?.data?.allocDetails);
            setLoading(false);
        } else if (
            QuantityLimitsData?.data?.qtyLimitsData
            && Array.isArray(QuantityLimitsData?.data?.qtyLimitsData)
        ) {
            setQtyLimitsData(QuantityLimitsData?.data?.qtyLimitsData);
            setTableData(QuantityLimitsData?.data?.qtyLimitsData)
            setLoading(false);

        } else if (
            QuantityLimitsData?.data?.allocNoDtl
            && Array.isArray(QuantityLimitsData?.data?.allocNoDtl)
        ) {
            setAllocNoDtl(QuantityLimitsData?.data?.allocNoDtl);
            setLoading(false);
        } else if (
            QuantityLimitsData?.data?.updateQtyLimitsData
            // && Array.isArray(QuantityLimitsData?.data?.updateQtyLimitsData)
        ) {
            setUpdateQtyLimitsData(QuantityLimitsData?.data?.updateQtyLimitsData);
            setLoading(false);
        } else if (
            QuantityLimitsData?.data?.OkQtyLimitsData
            // && Array.isArray(QuantityLimitsData?.data?.allocNoDtl)
        ) {
            setOkQtyLimitsData(QuantityLimitsData?.data?.OkQtyLimitsData);
            setLoading(false);
        } else {
            setSearch(false);
        }
    }, [QuantityLimitsData?.data]);


    // console.log("qtyLimitsData:::", qtyLimitsData)
    // console.log("searchHeaderData:::", searchHeaderData)

    const onChange = (e, value) => {
        {
            qtyLimitsData.map((row) => {
                if (row.ITEM === value) {
                    row[e.target.name] = e.target.value
                }
            })
        }
    };



    // useEffect(() => {
    //     console.log("inputValue::",inputValue)
    //     if (inputValue) {
    //         const filteredTable = tableData.filter((props) =>
    //             Object.entries(inputValue).every(
    //                 ([key, val]) =>
    //                     !val.length ||
    //                     props[key]
    //                         ?.toString()
    //                         .toLowerCase()
    //                         .includes(val?.toString().toLowerCase())
    //             )
    //         );
    //         setQtyLimitsData(filteredTable);
    //     }
    // }, [inputValue]);

    ///////////////////////////////////////////
    /////////CSS functions////////////////////
    ///////////////////////////////////////////

    const styleSelect1 = {
        control: base => ({
            ...base,
            width: "250px",
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

    const handleChangeSwitch = (event) => {
        setChecked(event.target.checked);
    };

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
                <TableHead className={QuantityLimitsData.TitleHead}>
                    <TableRow >
                        <StyledTableCell padding="checkbox" style={{
                            whiteSpace: "nowrap",
                        }}
                        >
                            <Checkbox
                                color="primary"
                                indeterminate={selected.length > 0 && selected.length < qtyLimitsData.length}
                                checked={qtyLimitsData.length > 0 && selected.length === qtyLimitsData.length}
                                onChange={onSelectAllClick}
                                inputProps={{
                                    'aria-label': 'select all data',
                                }}
                                style={{
                                    color: "#fff",
                                }}
                            />
                        </StyledTableCell>


                        {QtyHeader.map((headCell) => (
                            <StyledTableCell
                                key={headCell.id}
                                className={QuantityLimitsData.TableCell}
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

    const testChange = (e) => {
        setInputValue((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
        setSampleVal((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))

    }

    useEffect(() => {
        // console.log("inputValue::", inputValue)
        if (inputValue) {
            const filteredTable = tableData.filter((props) =>
                Object.entries(inputValue).every(
                    ([key, val]) =>
                        !val.length ||
                        props[key]
                            ?.toString()
                            .toLowerCase()
                            .includes(val?.toString().toLowerCase())
                )
            );
            setQtyLimitsData(filteredTable);
        }
    }, [inputValue]);


    const SubmitValueList = () => {
        setLoading(true);
        dispatch(getUPDATEQTYLIMITSRequest(qtyLimitsData));
        setvalidCheckQty(true)
    }
    if (validCheckQty) {
        dispatch(getOKQTYLIMITSSRNRequest([allocNoData]));
        setvalidCheckQty(false);
        setTab('1')
    }

    // console.log("inputValue::",inputValue)


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
                    ...(qtyLimitsData.length > 0 &&
                    {
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
                }}
            >
                {qtyLimitsData.length > 0 && (
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
                        Rows {selected.length} of {qtyLimitsData.length}
                    </Typography>
                )}
            </Toolbar>
        );
    }

    function descendingComparator(a, b, orderBy) {
        let c, d;
        if (orderBy == "LOCATION") {
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

    const handleSelectAllClick = (event) => {
        //console.log("event::",event)
        if (event.target.checked && selected.length === 0) {
            const newSelected = qtyLimitsData.map((n) => n.LOCATION);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
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

        setSelected(newSelected);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;



    const handleChangeValue = (e) => {
        setCopyValue((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    // console.log("inVal", inputValue, selected, copyValue);

    const handleCopyDown = (e) => {
        console.log("e:234:", e)
        for (const key in copyValue) {
            if (copyValue[key] === '') {
                delete copyValue[key];
            }
        }
        if (selected.length > 0) {
            const editData = tableData.filter((item) => {
                return selected.some((val) => {
                    return item.LOCATION === val;
                });
            });

            const copyUpdate = editData.map(item => {
                Object.assign(item, copyValue);
                return item;
            })

            console.log("copyUpdate::", copyUpdate);
            copyUpdate.map((obj) => {
                if (Object.keys(obj).includes("LOCATION")) {
                    const temp = qtyLimitsData.filter((obj1) =>
                        obj1["LOCATION"] === obj["LOCATION"]

                    )
                }
            })

            console.log("qtyLimitsData12345:", qtyLimitsData);

        }
        setQtyLimitsData(qtyLimitsData)
        setSampleVal([]);
    }

    ////////////////////////////////////////
    //////ERASER COMPLETE///////////////////////
    ////////////////////////////////////////

    const columnNames = ["TREND", "WOS", "MIN", "TRESHOLD", "MAX", "MIN_NEED"]

    const eraseVal = (e) => {
        for (const key in copyValue) {
            if (copyValue[key] === '') {
                delete copyValue[key];
            }
        }

        if (selected.length > 0) {
            const editData = tableData.filter((item) => {
                return selected.some((val) => {
                    return item.LOCATION === val;
                });
            });

            columnNames.map((name) => editData.map((row) => {
                if (Object.keys(row).includes(name)) {
                    delete row[name]
                }
            }
            ))

            console.log("editData::", editData)
            editData.map((obj) => {
                if (Object.keys(obj).includes("LOCATION")) {
                    const temp = qtyLimitsData.filter((obj1) =>
                        obj1["LOCATION"] === obj["LOCATION"]

                    )
                }
            })


        }
        setQtyLimitsData(qtyLimitsData)
        setSampleVal([]);
    }

    ////////////////////////////////////////
    //////INDIVIDUAL ERASER///////////////////////
    ////////////////////////////////////////

    const eraseValTrend = (e) => {
        for (const key in copyValue) {
            if (copyValue[key] === '') {
                delete copyValue[key];
            }
        }

        if (selected.length > 0) {
            const editData = tableData.filter((item) => {
                return selected.some((val) => {
                    return item.LOCATION === val;
                });
            });

            editData.map((row) => {
                if (Object.keys(row).includes("TREND")) {
                    delete row["TREND"]
                }
            }
            )

            editData.map((obj) => {
                if (Object.keys(obj).includes("LOCATION")) {
                    const temp = qtyLimitsData.filter((obj1) =>
                        obj1["LOCATION"] === obj["LOCATION"]

                    )
                }
            })
        }
        setQtyLimitsData(qtyLimitsData)
        setSampleVal([]);
    }

    const eraseValWOS = (e) => {
        for (const key in copyValue) {
            if (copyValue[key] === '') {
                delete copyValue[key];
            }
        }

        if (selected.length > 0) {
            const editData = tableData.filter((item) => {
                return selected.some((val) => {
                    return item.LOCATION === val;
                });
            });

            editData.map((row) => {
                if (Object.keys(row).includes("WOS")) {
                    delete row["WOS"]
                }
            }
            )

            editData.map((obj) => {
                if (Object.keys(obj).includes("LOCATION")) {
                    const temp = qtyLimitsData.filter((obj1) =>
                        obj1["LOCATION"] === obj["LOCATION"]

                    )
                }
            })
        }
        setQtyLimitsData(qtyLimitsData)
        setSampleVal([]);
    }

    const eraseValMIN = (e) => {
        for (const key in copyValue) {
            if (copyValue[key] === '') {
                delete copyValue[key];
            }
        }

        if (selected.length > 0) {
            const editData = tableData.filter((item) => {
                return selected.some((val) => {
                    return item.LOCATION === val;
                });
            });

            editData.map((row) => {
                if (Object.keys(row).includes("MIN")) {
                    delete row["MIN"]
                }
            }
            )

            editData.map((obj) => {
                if (Object.keys(obj).includes("LOCATION")) {
                    const temp = qtyLimitsData.filter((obj1) =>
                        obj1["LOCATION"] === obj["LOCATION"]

                    )
                }
            })
        }
        setQtyLimitsData(qtyLimitsData)
        setSampleVal([]);
    }

    const eraseValTreshold = (e) => {
        for (const key in copyValue) {
            if (copyValue[key] === '') {
                delete copyValue[key];
            }
        }

        if (selected.length > 0) {
            const editData = tableData.filter((item) => {
                return selected.some((val) => {
                    return item.LOCATION === val;
                });
            });

            editData.map((row) => {
                if (Object.keys(row).includes("TRESHOLD")) {
                    delete row["TRESHOLD"]
                }
            }
            )

            editData.map((obj) => {
                if (Object.keys(obj).includes("LOCATION")) {
                    const temp = qtyLimitsData.filter((obj1) =>
                        obj1["LOCATION"] === obj["LOCATION"]

                    )
                }
            })
        }
        setQtyLimitsData(qtyLimitsData)
        setSampleVal([]);
    }

    const eraseValMAX = (e) => {
        for (const key in copyValue) {
            if (copyValue[key] === '') {
                delete copyValue[key];
            }
        }

        if (selected.length > 0) {
            const editData = tableData.filter((item) => {
                return selected.some((val) => {
                    return item.LOCATION === val;
                });
            });

            editData.map((row) => {
                if (Object.keys(row).includes("MAX")) {
                    delete row["MAX"]
                }
            }
            )

            editData.map((obj) => {
                if (Object.keys(obj).includes("LOCATION")) {
                    const temp = qtyLimitsData.filter((obj1) =>
                        obj1["LOCATION"] === obj["LOCATION"]

                    )
                }
            })
        }
        setQtyLimitsData(qtyLimitsData)
        setSampleVal([]);
    }

    const eraseValMIN_NEED = (e) => {
        for (const key in copyValue) {
            if (copyValue[key] === '') {
                delete copyValue[key];
            }
        }

        if (selected.length > 0) {
            const editData = tableData.filter((item) => {
                return selected.some((val) => {
                    return item.LOCATION === val;
                });
            });

            editData.map((row) => {
                if (Object.keys(row).includes("MIN_NEED")) {
                    delete row["MIN_NEED"]
                }
            }
            )

            editData.map((obj) => {
                if (Object.keys(obj).includes("LOCATION")) {
                    const temp = qtyLimitsData.filter((obj1) =>
                        obj1["LOCATION"] === obj["LOCATION"]

                    )
                }
            })
        }
        setQtyLimitsData(qtyLimitsData)
        setSampleVal([]);
    }

    ////////////////////////////////////////////////////////////////////
    //////INDIVIDUAL INLINE FILTER COPY AND ERASER///////////////////////
    ///////////////////////////////////////////////////////////////////////


    const SearchButtonTrend = () => (
        [
            <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} >
                <CopyAllIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em' }} onClick={handleCopyDown} />
            </IconButton>
            ,
            <IconButton sx={{ padding: "0px 0px 0px 5px", margin: "0px" }} >
                <BsFillEraserFill fontSize="small" onClick={eraseValTrend} />
            </IconButton>
        ]
    )

    const SearchButtonWOS = () => (
        [
            <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} >
                <CopyAllIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em' }} onClick={handleCopyDown} />
            </IconButton>
            ,
            <IconButton sx={{ padding: "0px 0px 0px 5px", margin: "0px" }} >
                <BsFillEraserFill fontSize="small" onClick={eraseValWOS} />
            </IconButton>
        ]
    )

    const SearchButtonMIN = () => (
        [
            <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} >
                <CopyAllIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em' }} onClick={handleCopyDown} />
            </IconButton>
            ,
            <IconButton sx={{ padding: "0px 0px 0px 5px", margin: "0px" }} >
                <BsFillEraserFill fontSize="small" onClick={eraseValMIN} />
            </IconButton>
        ]
    )

    const SearchButtonTreshold = () => (
        [
            <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} >
                <CopyAllIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em' }} onClick={handleCopyDown} />
            </IconButton>
            ,
            <IconButton sx={{ padding: "0px 0px 0px 5px", margin: "0px" }} >
                <BsFillEraserFill fontSize="small" onClick={eraseValTreshold} />
            </IconButton>
        ]
    )

    const SearchButtonMAX = () => (
        [
            <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} >
                <CopyAllIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em' }} onClick={handleCopyDown} />
            </IconButton>
            ,
            <IconButton sx={{ padding: "0px 0px 0px 5px", margin: "0px" }} >
                <BsFillEraserFill fontSize="small" onClick={eraseValMAX} />
            </IconButton>
        ]
    )

    const SearchButtonMIN_NEED = () => (
        [
            <IconButton sx={{ padding: "0px 0px 0px 0px", margin: "0px" }} >
                <CopyAllIcon fontSize="small" sx={{ height: '0.8em', width: '0.8em' }} onClick={handleCopyDown} />
            </IconButton>
            ,
            <IconButton sx={{ padding: "0px 0px 0px 5px", margin: "0px" }} >
                <BsFillEraserFill fontSize="small" onClick={eraseValMIN_NEED} />
            </IconButton>
        ]
    )

    ////////////////////////////////////////
    //////HTML HEADER///////////////////////
    ////////////////////////////////////////

    const SearchHeader = () => (
        <Box
            component="fieldset"
            display="inline-block"
            sx={{
                backgroundColor: "",
                height: "auto",
                width: "100%",
                borderRadius: 1,

                boxShadow: 2, border: 0,
                borderBottom: 3,
                border: "1px solid lightgrey",
            }}
        >

            <legend style={{ fontWeight: "bold" }}>Header</legend>

            <div className={QuantityLimitsClasses.header_container}>
                <div className={QuantityLimitsClasses.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Allocation ID</InputLabel>
                    </div>
                    <div>
                        <TextField
                            size="small"
                            sx={{
                                margin: "0px 0px 10px 2px",
                                width: "30vh",
                                "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: "#f0f0f0"
                                }
                            }}
                            id="outlined-disabled"
                            name="ALLOC_NO"

                            //   value={searchHeaderData.ALLOC_DESC}
                            value={allocDetails.length > 0 ? allocDetails[0].ALLOC_NO : null}
                            defaultValue={allocDetails.length > 0 ? allocDetails[0].ALLOC_NO : null}
                            inputProps={{
                                maxLength: 100,
                            }}
                            InputProps={{
                                style: { fontSize: 12 },
                                className: QuantityLimitsClasses.input,
                            }}
                            disabled
                        />
                    </div>
                </div>

                <div className={QuantityLimitsClasses.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Desc</InputLabel>
                    </div>
                    <div>
                        <TextField
                            size="small"
                            sx={{
                                margin: "0px 0px 10px 2px", width: "30vh"
                                , "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: "#f0f0f0"
                                }
                            }}
                            id="outlined-disabled"
                            name="ALLOC_DESC"

                            //   value={searchHeaderData.ALLOC_DESC}
                            value={allocDetails[0].ALLOC_DESC}
                            defaultValue={allocDetails[0].ALLOC_DESC}
                            inputProps={{
                                maxLength: 100,
                            }}
                            InputProps={{
                                style: { fontSize: 12 },
                                className: QuantityLimitsClasses.input,
                            }}
                            disabled
                        />
                    </div>
                </div>

                <div className={QuantityLimitsClasses.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Context Type</InputLabel>
                    </div>
                    <div className={QuantityLimitsClasses.multiselectfield}>
                        <TextField
                            size="small"
                            sx={{
                                margin: "0px 0px 10px 2px", width: "200px"
                                , "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: "#f0f0f0"
                                }
                            }}
                            id="outlined-disabled"
                            name="CONTEXT_TYPE"

                            value={allocDetails[0].CONTEXT}
                            defaultValue={allocDetails[0].CONTEXT}
                            inputProps={{
                                maxLength: 100,
                            }}
                            InputProps={{
                                style: { fontSize: 12 },
                                className: QuantityLimitsClasses.input,
                            }}
                            disabled
                        />
                    </div>
                </div>

                {allocDetails[0].CONTEXT === "Promotion" ?
                    [
                        <div className={QuantityLimitsClasses.header_child}>
                            <div>
                                <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                                    Promotion</InputLabel>
                            </div>
                            <div className={QuantityLimitsClasses.multiselectfield}>
                                <TextField
                                    size="small"
                                    sx={{
                                        margin: "0px 0px 10px 2px", width: "200px"
                                        , "& .MuiInputBase-input.Mui-disabled": {
                                            backgroundColor: "#f0f0f0"
                                        }
                                    }}
                                    id="outlined-disabled"
                                    name="PROMOTION"

                                    value={allocDetails[0].PROMOTION}
                                    defaultValue={allocDetails[0].PROMOTION}
                                    inputProps={{
                                        maxLength: 100,
                                    }}
                                    InputProps={{
                                        style: { fontSize: 12 },
                                        className: QuantityLimitsClasses.input,
                                    }}
                                    disabled
                                />
                            </div>
                        </div>
                    ] : null}


                <div className={QuantityLimitsClasses.header_child}>
                    <div >
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Alloc Level</InputLabel>
                    </div>
                    <div className={QuantityLimitsClasses.multiselectfield}>
                        <TextField
                            size="small"
                            sx={{
                                margin: "0px 0px 10px 2px", width: "200px"
                                , "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: "#f0f0f0"
                                }
                            }}
                            id="outlined-disabled"
                            name="ALLOC_LEVEL"

                            value={allocDetails[0].ALLOC_LEVEL}
                            defaultValue={allocDetails[0].ALLOC_LEVEL}
                            inputProps={{
                                maxLength: 100,
                            }}
                            InputProps={{
                                style: { fontSize: 12 },
                                className: QuantityLimitsClasses.input,
                            }}
                            disabled
                        />
                    </div>
                </div>

                <div className={QuantityLimitsClasses.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Release Date</InputLabel>
                    </div>
                    <div>
                        <TextField
                            variant="outlined"
                            type="date"
                            size="small"
                            name="RELEASE_DATE"
                            format="yyyy/MM/dd"
                            //   inputProps={{ max: currentDate() }}
                            sx={{
                                margin: "0px 0px 10px 2px", width: "200px"
                                , "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: "#f0f0f0"
                                }
                            }}
                            id="outlined-disabled"
                            disabled
                            label=""
                            value={allocDetails[0].RELEASE_DATE}
                            defaultValue={allocDetails[0].RELEASE_DATE}
                            InputProps={{
                                style: { fontSize: 12 },
                                shrink: true,
                                className: QuantityLimitsClasses.input,
                            }}
                        />
                    </div>
                </div>

                <div className={QuantityLimitsClasses.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Status</InputLabel>
                    </div>
                    <div className={QuantityLimitsClasses.multiselectfield}>
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
                            value={allocDetails[0].STATUS}
                            defaultValue={allocDetails[0].STATUS}
                            id="outlined-disabled"
                            InputProps={{
                                style: { fontSize: 12 },
                                className: QuantityLimitsClasses.input,
                            }}
                        />
                    </div>
                </div>

                <div className={QuantityLimitsClasses.header_child}>
                    <div>
                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                            Alloc Type</InputLabel>
                    </div>
                    <div className={QuantityLimitsClasses.multiselectfield}>
                        <TextField
                            size="small"
                            sx={{
                                margin: "0px 0px 10px 2px", width: "200px"
                                , "& .MuiInputBase-input.Mui-disabled": {
                                    backgroundColor: "#f0f0f0"
                                }
                            }}
                            id="outlined-disabled"
                            name="ALLOC_TYPE"

                            value={allocDetails[0].ALLOC_TYPE}
                            defaultValue={allocDetails[0].ALLOC_TYPE}
                            inputProps={{
                                maxLength: 100,
                            }}
                            InputProps={{
                                style: { fontSize: 12 },
                                className: QuantityLimitsClasses.input,
                            }}
                            disabled
                        />
                    </div>
                </div>

                <div className={QuantityLimitsClasses.header_child}>
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
                            value={allocDetails[0].ALLOCATOR}
                            defaultValue={allocDetails[0].ALLOCATOR}
                            InputProps={{
                                style: { fontSize: 12 },
                                className: QuantityLimitsClasses.input,
                            }}
                        />
                    </div>
                </div>
            </div>
        </Box>
    )

    return (
        <Box className={QuantityLimitsClasses.maindiv} sx={{ width: "99.5%" }}>
            {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6} sx={{ backgroundColor: "" }}>
                    <Box className={QuantityLimitsClasses.boxDiv}>
                        <div className={QuantityLimitsClasses.uploaddiv}>
                            <h4>Quantity Limits</h4>
                        </div>
                    </Box>
                </Grid>
            </Grid> */}

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
                            <div className={QuantityLimitsClasses.course_box}>
                                {/* <div className={QuantityLimitsClasses.container_child}>
                                    <Box>
                                        <div>
                                            <InputLabel sx={{ fontWeight: "bold", fontSize: "15px", margin: "10px 0px 0px 5px", float: 'left', color: "black" }}>
                                                Header</InputLabel>
                                        </div>
                                        <div> */}
                                {SearchHeader()}
                                {/* </div>
                                    </Box>
                                </div> */}
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
                        height: "auto",
                        width: "100%",
                        borderRadius: 1,

                        boxShadow: 2, border: 0,
                        borderBottom: 3,
                        border: "1px solid lightgrey",
                        marginTop: "5px"
                    }}
                >
                    <div sx={{ display: "flex", flexDirection: "row" }}>
                        <Grid id="top-row" container spacing={0}>
                            <div className={QuantityLimitsClasses.course_box}>
                                <div className={QuantityLimitsClasses.grid_block}>
                                    <div></div>
                                    <Box
                                        display="inline-block"
                                        sx={{
                                            backgroundColor: "",
                                            margin: "10px 0px 10px 5px"
                                        }}
                                    >
                                        <div >
                                            <div className={QuantityLimitsClasses.float_child}>
                                                <FormControlLabel
                                                    size="small"
                                                    sx={{
                                                        margin: "0px",
                                                        padding: "0px"
                                                    }}
                                                    control={
                                                        <Switch
                                                            size="small"
                                                            disabled
                                                            // checked={checked?false:true}
                                                            onChange={handleChangeSwitch}
                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                        />
                                                    }
                                                    label={<InputLabel
                                                        sx={{
                                                            fontWeight: "bold",
                                                            fontSize: "12px",
                                                            margin: "0px 0px 0px 0px",
                                                            padding: "0px 0px 0px 0px",
                                                            display: 'inline',
                                                            float: 'left'
                                                        }}>
                                                        Include Inventory - Minimum</InputLabel>}
                                                />
                                            </div>

                                        </div>

                                        <div>
                                            <div className={QuantityLimitsClasses.float_child}>
                                                <FormControlLabel
                                                    size="small"
                                                    sx={{
                                                        margin: "0px",
                                                        padding: "0px"
                                                    }}
                                                    control={
                                                        <Switch
                                                            size="small"
                                                            disabled
                                                            // checked={checked?false:true}
                                                            onChange={handleChangeSwitch}
                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                        />
                                                    }
                                                    label={<InputLabel
                                                        sx={{
                                                            fontWeight: "bold",
                                                            fontSize: "12px",
                                                            margin: "0px 0px 0px 0px",
                                                            padding: "0px 0px 0px 0px",
                                                            display: 'inline',
                                                            float: 'left'
                                                        }}>
                                                        Include Inventory - Maximum</InputLabel>}
                                                />
                                            </div>
                                        </div>
                                    </Box>

                                    <Box
                                        display="inline-block"
                                        // justifyContent="end"
                                        sx={{
                                            backgroundColor: "",
                                            margin: "0px 0px 0px 0px",
                                            justifyContent: "end",
                                            marginLeft: "125vh",
                                            marginRight: "0%",
                                            // textAlign:"left"
                                        }}
                                    >
                                        <div className={QuantityLimitsClasses.float_child}>
                                            <Button sx={{ backgroundColor: "", fontSize: "12px", margin: "0px 20px 0px 0px" }}
                                                variant="contained"
                                                // className={QuantityLimitsData.textField}
                                                type="submit"
                                                onClick={SubmitValueList}
                                            >
                                                Ok</Button>

                                            <Button sx={{ backgroundColor: "", fontSize: "12px", margin: "0px 20px 0px 0px" }}
                                                variant="contained"
                                                // className={QuantityLimitsData.textField}
                                                type="submit"
                                            // onClick={SubmitList}
                                            >
                                                Cancel</Button>

                                            <Button sx={{ backgroundColor: "", fontSize: "12px", margin: "0px 0px 0px 0px" }}
                                                variant="contained"
                                                // className={QuantityLimitsData.textField}
                                                type="submit"
                                                onClick={eraseVal}
                                            >
                                                Clear All</Button>

                                        </div>
                                    </Box>

                                </div>
                                <div className={QuantityLimitsClasses.grid_block}>
                                    <InputLabel sx={{
                                        fontWeight: "bold",
                                        fontSize: "14px",
                                        margin: "5px 0px 10px 5px",
                                        display: 'inline',
                                        float: 'left',
                                        color: "black",
                                    }}>
                                        Sku Quantity Limits</InputLabel>
                                </div>

                                <div className={QuantityLimitsClasses.course_list}>
                                    <Box
                                        sx={{
                                            backgroundColor: "",
                                            width: "100%",
                                            height: "auto",
                                            display: "flex"
                                        }}
                                    >
                                        <Paper sx={{ width: '100%', mb: 2 }}>
                                            {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                                            <TableContainer style={{ maxHeight: 360 }} component={Paper}>
                                                <Table aria-label="customized table">
                                                    <EnhancedTableHead
                                                        numSelected={selected.length}
                                                        order={order}
                                                        orderBy={orderBy}
                                                        onSelectAllClick={handleSelectAllClick}
                                                        onRequestSort={handleRequestSort}
                                                        rowCount={qtyLimitsData.length}
                                                    />
                                                    <TableBody >
                                                        <TableCell padding="checkbox">
                                                            <Grid item xs={1} style={{ padding: "0px", margin: "0px 0px 0px -6px" }}>
                                                                <IconButton >
                                                                    <RestartAltIcon />
                                                                </IconButton>
                                                            </Grid>
                                                        </TableCell>
                                                        <TableCell sx={{ padding: "0px" }}>
                                                            <TextField
                                                                name="LOCATION"
                                                                onChange={testChange}
                                                                placeholder="Location"
                                                                autoComplete="off"
                                                                InputProps={{
                                                                    style: { fontSize: 12, height: "30px" },
                                                                }}
                                                            />
                                                        </TableCell>

                                                        <TableCell sx={{ padding: "0px" }}>
                                                            <TextField
                                                                name="GROUP_ID"
                                                                onChange={testChange}
                                                                placeholder="Loc Group"
                                                                autoComplete="off"
                                                                InputProps={{
                                                                    style: { fontSize: 12, height: "30px" },
                                                                }}
                                                            />
                                                        </TableCell>

                                                        <TableCell sx={{ padding: "0px" }}>
                                                            <TextField
                                                                name="DEFAULT_WH"
                                                                onChange={testChange}
                                                                autoComplete="off"
                                                                placeholder="Def WH"
                                                                InputProps={{
                                                                    style: { fontSize: 12, height: "30px" },
                                                                }}
                                                            />
                                                        </TableCell>

                                                        <TableCell sx={{ padding: "0px" }}>
                                                            <TextField
                                                                name="ITEM"
                                                                onChange={testChange}
                                                                autoComplete="off"
                                                                placeholder="Item"
                                                                InputProps={{
                                                                    style: { fontSize: 12, height: "30px" },
                                                                }}
                                                            />
                                                        </TableCell>

                                                        <TableCell sx={{ padding: "0px" }}>
                                                            <TextField
                                                                name="ITEM_DESC"
                                                                onChange={testChange}
                                                                autoComplete="off"
                                                                placeholder="Item Desc"
                                                                InputProps={{
                                                                    style: { fontSize: 12, height: "30px" },
                                                                }}
                                                            />
                                                        </TableCell>

                                                        <TableCell sx={{ padding: "0px" }}>
                                                            <TextField
                                                                name="DIFF_ID"
                                                                onChange={testChange}
                                                                autoComplete="off"
                                                                placeholder="Diff ID"
                                                                InputProps={{
                                                                    style: { fontSize: 12, height: "30px" },
                                                                }}
                                                            />
                                                        </TableCell>

                                                        <TableCell sx={{ padding: "0px" }}>
                                                            <TextField
                                                                name="SKU_COUNT"
                                                                onChange={testChange}
                                                                autoComplete="off"
                                                                placeholder="No of SKU's"
                                                                InputProps={{
                                                                    style: { fontSize: 12, height: "30px" },
                                                                }}
                                                            />
                                                        </TableCell>

                                                        <TableCell sx={{ padding: "0px" }}>
                                                            <TextField
                                                                name="SOM_QTY"
                                                                onChange={testChange}
                                                                autoComplete="off"
                                                                placeholder="SOM Qty"
                                                                InputProps={{
                                                                    style: { fontSize: 12, height: "30px" },
                                                                }}
                                                            />
                                                        </TableCell>

                                                        <TableCell sx={{ padding: "0px" }}>
                                                            <TextField
                                                                name="TREND"
                                                                onChange={handleChangeValue}
                                                                autoComplete="off"
                                                                InputProps={{ endAdornment: <SearchButtonTrend />, style: { fontSize: 12, height: "30px" } }}
                                                            />
                                                        </TableCell>

                                                        <TableCell sx={{ padding: "0px" }}>
                                                            <TextField
                                                                name="WOS"
                                                                onChange={handleChangeValue}
                                                                autoComplete="off"
                                                                InputProps={{ endAdornment: <SearchButtonWOS />, style: { fontSize: 12, height: "30px" } }}
                                                            />
                                                        </TableCell>

                                                        <TableCell sx={{ padding: "0px" }}>
                                                            <TextField
                                                                name="MIN"
                                                                onChange={handleChangeValue}
                                                                autoComplete="off"
                                                                InputProps={{ endAdornment: <SearchButtonMIN />, style: { fontSize: 12, height: "30px" } }}
                                                            />
                                                        </TableCell>

                                                        <TableCell sx={{ padding: "0px" }}>
                                                            <TextField
                                                                name="TRESHOLD"
                                                                onChange={handleChangeValue}
                                                                autoComplete="off"
                                                                InputProps={{ endAdornment: <SearchButtonTreshold />, style: { fontSize: 12, height: "30px" } }}
                                                            />
                                                        </TableCell>

                                                        <TableCell sx={{ padding: "0px" }}>
                                                            <TextField
                                                                name="MAX"
                                                                onChange={handleChangeValue}
                                                                autoComplete="off"
                                                                InputProps={{ endAdornment: <SearchButtonMAX />, style: { fontSize: 12, height: "30px" } }}
                                                            />
                                                        </TableCell>

                                                        <TableCell sx={{ padding: "0px" }}>
                                                            <TextField
                                                                name="MIN_NEED"
                                                                onChange={handleChangeValue}
                                                                autoComplete="off"
                                                                InputProps={{ endAdornment: <SearchButtonMIN_NEED />, style: { fontSize: 12, height: "30px" } }}
                                                            />
                                                        </TableCell>
                                                        {stableSort(qtyLimitsData, getComparator(order, orderBy))
                                                            .map((row, index) => {
                                                                const isItemSelected = isSelected(row.LOCATION);
                                                                const labelId = `enhanced-table-checkbox-${index}`;
                                                                return (
                                                                    <TableRow
                                                                        hover
                                                                        role="checkbox"
                                                                        aria-checked={isItemSelected}
                                                                        tabIndex={-1}
                                                                        key={row.LOCATION}
                                                                        selected={isItemSelected}
                                                                    >
                                                                        <StyledTableCell padding="checkbox">
                                                                            <Checkbox
                                                                                onClick={(event) => handleClick(event, row?.LOCATION)}
                                                                                color="primary"
                                                                                checked={isItemSelected}
                                                                                inputProps={{
                                                                                    'aria-labelledby': labelId,
                                                                                }}
                                                                            />
                                                                        </StyledTableCell>

                                                                        <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}>
                                                                            {row.LOCATION}
                                                                        </StyledTableCell>

                                                                        <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}>
                                                                            {row.GROUP_ID}
                                                                        </StyledTableCell>

                                                                        <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} >
                                                                            {row.DEFAULT_WH}
                                                                        </StyledTableCell>

                                                                        <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right">
                                                                            {row.ITEM}
                                                                        </StyledTableCell>

                                                                        <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right">
                                                                            {row.ITEM_DESC}
                                                                        </StyledTableCell>

                                                                        <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right">
                                                                            {row.DIFF_ID}
                                                                        </StyledTableCell>

                                                                        <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right">
                                                                            {row.SKU_COUNT}
                                                                        </StyledTableCell>

                                                                        <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right">
                                                                            {row.SOM_QTY}
                                                                        </StyledTableCell>

                                                                        <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", padding: 0 }} textAlign="right">
                                                                            <TextField
                                                                                InputProps={{
                                                                                    style: { fontSize: 12, height: "30px" },
                                                                                }}
                                                                                value={row.TREND}
                                                                                name="TREND"
                                                                                onChange={(e) => onChange(e, row.ITEM)}
                                                                                autoComplete="off"
                                                                                inputProps={{
                                                                                    maxLength: 20,
                                                                                }}
                                                                            />
                                                                        </StyledTableCell>
                                                                        <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", padding: 0 }} textAlign="right">
                                                                            <TextField
                                                                                InputProps={{
                                                                                    style: { fontSize: 12, height: "30px" },
                                                                                }}
                                                                                value={row.WOS}
                                                                                name="WOS"
                                                                                onChange={(e) => onChange(e, row.ITEM)}
                                                                                autoComplete="off"
                                                                                inputProps={{
                                                                                    maxLength: 20,
                                                                                }}
                                                                            />
                                                                        </StyledTableCell>
                                                                        <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", padding: 0 }} textAlign="right">
                                                                            <TextField
                                                                                InputProps={{
                                                                                    style: { fontSize: 12, height: "30px" },
                                                                                }}
                                                                                value={row.MIN}
                                                                                name="MIN"
                                                                                onChange={(e) => onChange(e, row.ITEM)}
                                                                                autoComplete="off"
                                                                                inputProps={{
                                                                                    maxLength: 20,
                                                                                }}
                                                                            />
                                                                        </StyledTableCell>
                                                                        <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", padding: 0 }} textAlign="right">
                                                                            <TextField
                                                                                InputProps={{
                                                                                    style: { fontSize: 12, height: "30px" },
                                                                                }}
                                                                                value={row.TRESHOLD}
                                                                                name="TRESHOLD"
                                                                                onChange={(e) => onChange(e, row.ITEM)}
                                                                                autoComplete="off"
                                                                                inputProps={{
                                                                                    maxLength: 20,
                                                                                }}
                                                                            />
                                                                        </StyledTableCell>
                                                                        <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", padding: 0 }} textAlign="right">
                                                                            <TextField
                                                                                InputProps={{
                                                                                    style: { fontSize: 12, height: "30px" },
                                                                                }}
                                                                                value={row.MAX}
                                                                                name="MAX"
                                                                                onChange={(e) => onChange(e, row.ITEM)}
                                                                                autoComplete="off"
                                                                                inputProps={{
                                                                                    maxLength: 20,
                                                                                }}
                                                                            />
                                                                        </StyledTableCell>
                                                                        <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", padding: 0 }} textAlign="right">
                                                                            <TextField
                                                                                InputProps={{
                                                                                    style: { fontSize: 12, height: "30px" },
                                                                                }}
                                                                                value={row.MIN_NEED}
                                                                                name="MIN_NEED"
                                                                                onChange={(e) => onChange(e, row.ITEM)}
                                                                                autoComplete="off"
                                                                                inputProps={{
                                                                                    maxLength: 20,
                                                                                }}
                                                                            />
                                                                        </StyledTableCell>

                                                                    </TableRow >
                                                                );
                                                            })}
                                                        {qtyLimitsData.length < 5 ?
                                                            [...Array(5 - (qtyLimitsData.length)).keys()].map(val => (
                                                                <TableRow  >
                                                                    <StyledTableCell padding="checkbox"> <Checkbox color="primary" disabled={true} /></StyledTableCell>
                                                                    <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}></StyledTableCell>
                                                                    <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}></StyledTableCell>
                                                                    <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} ></StyledTableCell>
                                                                    <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></StyledTableCell>
                                                                    <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></StyledTableCell>
                                                                    <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></StyledTableCell>
                                                                    <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></StyledTableCell>
                                                                    <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right"></StyledTableCell>
                                                                    <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", padding: 0 }} textAlign="right">
                                                                        <TextField
                                                                            InputProps={{
                                                                                style: { fontSize: 12, height: "30px" },
                                                                            }}
                                                                            disabled
                                                                            inputProps={{
                                                                                maxLength: 20,
                                                                            }}
                                                                        />
                                                                    </StyledTableCell>
                                                                    <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", padding: 0 }} textAlign="right">
                                                                        <TextField
                                                                            InputProps={{
                                                                                style: { fontSize: 12, height: "30px" },
                                                                            }}
                                                                            disabled
                                                                            inputProps={{
                                                                                maxLength: 20,
                                                                            }}
                                                                        />
                                                                    </StyledTableCell>
                                                                    <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", padding: 0 }} textAlign="right">
                                                                        <TextField
                                                                            InputProps={{
                                                                                style: { fontSize: 12, height: "30px" },
                                                                            }}
                                                                            disabled
                                                                            inputProps={{
                                                                                maxLength: 20,
                                                                            }}
                                                                        />
                                                                    </StyledTableCell>
                                                                    <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", padding: 0 }} textAlign="right">
                                                                        <TextField
                                                                            InputProps={{
                                                                                style: { fontSize: 12, height: "30px" },
                                                                            }}
                                                                            disabled
                                                                            inputProps={{
                                                                                maxLength: 20,
                                                                            }}
                                                                        />
                                                                    </StyledTableCell>
                                                                    <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", padding: 0 }} textAlign="right">
                                                                        <TextField
                                                                            InputProps={{
                                                                                style: { fontSize: 12, height: "30px" },
                                                                            }}
                                                                            disabled
                                                                            inputProps={{
                                                                                maxLength: 20,
                                                                            }}
                                                                        />
                                                                    </StyledTableCell>
                                                                    <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", padding: 0 }} textAlign="right">
                                                                        <TextField
                                                                            InputProps={{
                                                                                style: { fontSize: 12, height: "30px" },
                                                                            }}
                                                                            disabled
                                                                            inputProps={{
                                                                                maxLength: 20,
                                                                            }}
                                                                        />
                                                                    </StyledTableCell>
                                                                </TableRow >
                                                            )) : false}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                            <EnhancedTableToolbar numSelected={selected.length} />
                                        </Paper>
                                    </Box>
                                </div>

                            </div>
                        </Grid>
                    </div>
                </Box>
            </Grid>
        </Box>
    );
};

export default QuantityLimits;
