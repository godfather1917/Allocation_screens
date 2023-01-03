import React from "react";
import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import "./Right.css";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridCellModes } from "@mui/x-data-grid";
import { CONFIG } from "../../services/config";

// import data12 from './data.json'
// import locationlistjson from '../Components/data/store_list.json'
// import locationtraitsjson from '../Components/data/store_traits.json'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import {
  getFETCHLOCATIONDATARequest,
  getLOCATIONRLRequest,
  getLOCATIONLISTRLRequest,
  getLOCATIONTRAITSRLRequest,
  getCLEARANCERLRequest,
  getSTATUSRLRequest,
  getFETCHLOCGRIDRequest,
  getDELETELOCATIONRLRequest,
} from "../../Redux/Action/rules&location";
import InputLabel from '@mui/material/InputLabel';
import { makeStyles, withStyles } from "@mui/styles";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types';
import Toolbar from "@mui/material/Toolbar";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import makeAnimated from 'react-select/animated';
import IconButton from "@mui/material/IconButton";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import swal from "@sweetalert/with-react";


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
    // position: "sticky",
    // top: -1,
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
    width: "100%",
    float: "left"
  },
  TableCell: {
    color: "#fff",
    padding: "6px 6px !important",
    lineHeight: "1.2rem !important",
  },
  course_box: {
    // width: "100%",
    // margin:"0 auto",
    // display: "block",
    // flexWrap:"wrap",
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



const LocationHeader = [
  { id: "LOCATION", label: "Location" },
  { id: "LOC_DESC", label: "Loc Desc" },
  { id: "LOC_TYPE", label: "Loc Type" },
  { id: "DEFAULT_WH", label: "Default WH" },
  { id: "GROUP_ID", label: "Group ID" },
  { id: "GROUP_DESC", label: "Group Desc" },
  { id: "LIKE_LOC", label: "Like Loc" },
  { id: "LIKE_LOC_DESC", label: "Like Loc Desc" },
  { id: "WEIGHT", label: "Weight" },
  { id: "CLEARANCE_FLAG", label: "Clearance Flag" },
  { id: "STATUS", label: "Status" },
]




const optionsTemplates = [
  { value: "Template Name", label: "Template Name" },
  { value: "option 2", label: "option 2" },
  { value: "option 3", label: "option 3" },
  { value: "option 4", label: "option 4" }
]


const RightContainer = ({ new_table, setNew_table, allocNoData, setTotalData, totalData }) => {
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const [locations, setLocations] = useState([])
  //to store list of loc as array
  const [locArray, setLocArray] = useState([])
  const [locDescArray, setLocDescArray] = useState([])
  const [clearanceArray, setClearanceArray] = useState([])
  const [statusArray, setStatusArray] = useState([])

  const [tableData, settableData] = useState([])
  const [locationsTraits, setLocationTraits] = useState([])
  const [locationList, setLocationList] = useState([])
  const [check1, setCheck1] = React.useState(false)
  const [check2, setCheck2] = React.useState(false);
  const [checkStore, setCheckStore] = useState(false);
  const [inputLoc, setInputLoc] = useState("");
  const [valLoc, setValLoc] = useState([]);
  const [inputLoc1, setInputLoc1] = useState("");
  const [valLoc1, setValLoc1] = useState([]);
  const [inputLoc2, setInputLoc2] = useState("");
  const [inputLoc3, setInputLoc3] = useState("");
  const [valLoc2, setValLoc2] = useState([]);
  const [valLoc3, setValLoc3] = useState([]);
  const [post, updatePost] = useState({ title: '' })
  const [page, setPage] = useState(0);
  const [splitpage, setSplitpage] = useState([])
  const [table_data, setTable_data] = useState([])
  const [selectedLoc, setSelectedLoc] = useState([])
  const [selectedLocList, setSelectedLocList] = useState([])
  const [selectedLoctrait, setSelectedLoctrait] = useState([])
  const [selectedExcluded, setSelectedExcluded] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [search, setsearch] = useState({
    "location": "",
    "loc_desc": "",
    "loc_type": "",
    "default_wh": "",
    "group_id": "",
    "group_desc": ""
  });
  // const [searcharray, setSearcharray] = useState([])
  const [status, setStatus] = useState([])
  const [clearance, setClearance] = useState([])


  const initialsearch = {
    LOCATION: [],
    LOCATION_LIST: [],
    LOCATION_TRAITS: [],
    EXCLUDE_LOCATION: [],
    ALL_STORES: "N",
    ALLOC_NO: allocNoData.ALLOC_NO
  }

  const [searchData, setSearchData] = useState(initialsearch);
  //////////////////////////////////////////////
  /////////////////////////
  ///////////////////////////////////////////////////////
  const [tableLocData, setTableLocData] = useState([]);
  const [switchTableData, setSwitchTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const [selected, setSelected] = useState([]);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [inputValue, setInputValue] = useState([]);
  const [sampleVal, setSampleVal] = useState([]);

  const [locationRL, setLocationRl] = useState([]);
  const [locationListRL, setLocationListRl] = useState([]);
  const [locationTraitRL, setLocationTraitRl] = useState([]);
  const [clearanceRL, setClearanceRl] = useState([]);
  const [statusRL, setStatusRl] = useState([]);

  const RulesLocationRightClasses = useStyles();

  const RulesLocationRightData = useSelector(
    (state) => state.RulesLocationReducers
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(getLOCATIONRLRequest([{}]));
    dispatch(getLOCATIONLISTRLRequest([{}]));
    dispatch(getLOCATIONTRAITSRLRequest([{}]));
    dispatch(getCLEARANCERLRequest([{}]));
    dispatch(getSTATUSRLRequest([{}]));
    dispatch(getFETCHLOCGRIDRequest([allocNoData]));
  }, [""]);

  console.log("Akhil3456", RulesLocationRightData?.data)
  useEffect(() => {
    if (tableData.length === 0 &&
      RulesLocationRightData?.data?.locGrid
      && Array.isArray(RulesLocationRightData?.data?.locGrid)
    ) {
      setSwitchTableData(RulesLocationRightData?.data?.locGrid);
      console.log("Akhil345", RulesLocationRightData?.data?.locGrid)
      setLoading(false);
    }

    if (
      RulesLocationRightData?.data?.tableLocData
      && Array.isArray(RulesLocationRightData?.data?.tableLocData)
    ) {
      setTotalData(RulesLocationRightData?.data?.tableLocData);
      setTableLocData(RulesLocationRightData?.data?.tableLocData);
      setLoading(false);
    } else if (
      RulesLocationRightData?.data?.locationRL
      && Array.isArray(RulesLocationRightData?.data?.locationRL)
    ) {
      setLocationRl(RulesLocationRightData?.data?.locationRL);
      setLoading(false);
    } else if (
      RulesLocationRightData?.data?.locationListRL
      && Array.isArray(RulesLocationRightData?.data?.locationListRL)
    ) {
      setLocationListRl(RulesLocationRightData?.data?.locationListRL);
      setLoading(false);
    } else if (
      RulesLocationRightData?.data?.locationTraitRL
      && Array.isArray(RulesLocationRightData?.data?.locationTraitRL)
    ) {
      setLocationTraitRl(RulesLocationRightData?.data?.locationTraitRL);
      setLoading(false);
    } else if (
      RulesLocationRightData?.data?.clearanceRL
      && Array.isArray(RulesLocationRightData?.data?.clearanceRL)
    ) {
      setClearanceRl(RulesLocationRightData?.data?.clearanceRL);
      setLoading(false);
    } else if (
      RulesLocationRightData?.data?.statusRL
      && Array.isArray(RulesLocationRightData?.data?.statusRL)
    ) {
      setStatusRl(RulesLocationRightData?.data?.statusRL);
      setLoading(false);
    } else {
      setSearch(false);
    }
  }, [RulesLocationRightData?.data]);


  //console.log("locationRL:", locationRL);
  //console.log("locationListRL:", locationListRL);
  //console.log("locationTraitRL:", locationTraitRL);
  //console.log("clearanceRL:", clearanceRL);
  //console.log("statusRL:", statusRL);
  console.log("totalData::", totalData);

  const HandleRefreshLocationRL = () => {
    setLoading(false);
    setSearchData(initialsearch);
    setTableLocData([]);
    setSelected([]);
    setInputValue([]);
    setSampleVal([]);
    settableData([]);
    setCheck1(false);
    setCheck2(false);
    setCheckStore(false);
    setValLoc([]);
    setValLoc1([]);
    setValLoc2([]);
    setValLoc3([]);
    setInputLoc("");
    setInputLoc1("");
    setInputLoc2("");
    setInputLoc3("");

  }



  const HandleAddButton = () => {
    if (check1) {
      setLoading(true);
      dispatch(getFETCHLOCATIONDATARequest([searchData]));
    }
    else if (searchData.LOCATION.length > 0 || searchData.LOCATION_LIST.length > 0 || searchData.LOCATION_TRAITS.length > 0) {
      setLoading(true);
      dispatch(getFETCHLOCATIONDATARequest([searchData]));
    }
    else {
      swal(
        <div>
          <p>Give any input field*</p>
        </div>
      )
    }
  }


  const handleswitchcheck = (e, val) => {
    if (e.target.name === "check1") {
      setCheckStore(true)
      setCheck1(val)
      if (val === true) {
        setSearchData((prev) => {
          return {
            ...prev,
            ALL_STORES: "Y",
            LOCATION: [],
            LOCATION_LIST: [],
            LOCATION_TRAITS: [],
          };
        });

        console.log()
      }
      else {
        setCheckStore(false);
        setSearchData((prev) => {
          return {
            ...prev,
            ALL_STORES: "N",
          };
        });
      }

    }
    if (e.target.name === "check2") {
      setCheck2(val)
    }
  }



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
        <TableHead className={RulesLocationRightClasses.TitleHead}>
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


            {LocationHeader.map((headCell) => (
              <StyledTableCell
                key={headCell.id}
                // className={RulesLocationRightClasses.TableCell}
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
          ...(totalData.length > 0 &&
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
        {totalData.length > 0 && (
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
            Rows {selected.length} of {totalData.length}
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
    ////console.log("event::",event)
    if (event.target.checked && selected.length === 0) {
      const newSelected = totalData.map((n) => n.LOCATION);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleSingleClick = (event, name) => {
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



  ///////////////////////////////////////////
  ///////////////
  //////////////////////////////////////////////



  // const chack = "chacked"


  // const handledata_change = async () => {
  //   if (check1) {

  //     setTable_data(tableData)
  //     setNew_table(tableData)

  //   } else {
  //     setTable_data([])
  //     setNew_table([])
  //   }

  // }



  const r1 = useRef()
  const r2 = useRef()
  const r3 = useRef()
  const r4 = useRef()


  const selectLocation = (event, value) => {

    let updatedData = []
    let selectedLocOptions = []
    event.map((res) => {
      selectedLocOptions.push(res.STORE)
    })
    updatedData = locationRL.filter((res) => !selectedLocOptions.includes(res.STORE))
    updatedData = [...event, ...updatedData];
    setLocationRl(updatedData)
    // setSelectedLoc(event);

    let selectedLocation = [];
    if (value.option) {
      valLoc.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   ////////console.log(1234)
      //   setInputLoc("");
      // }
      if (String(value.option.STORE).includes(inputLoc)) {
        setInputLoc("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valLoc.length; i++) {
        if (valLoc[i]["STORE"] === value.removedValue.STORE) {
          index = i;
          break;
        }
      }
      valLoc.splice(index, 1);

    } else if (value.action === "clear") {
      valLoc.splice(0, valLoc.length);
    }
    if (event === 0) {
      valLoc.push(event)
    }
    if (valLoc.length > 0 && typeof valLoc[0]['STORE'] !== "undefined") {
      setCheckStore(false);
      valLoc.map(
        (item) => {
          selectedLocation.push(item.STORE);
        }
      )
      setSearchData((prev) => {
        return {
          ...prev,
          ALL_STORES: "N",
          LOCATION: selectedLocation,
        };
      });
      // }else if(value.length > 0){
      //       swal(
      //         <div>     
      //           <p>{"Please Choose valid LOCATION"}</p>
      //         </div>
      //       )  
      // }
    } else {
      initialsearch.LOCATION = "";
      setSearchData((prev) => {
        return {
          ...prev,
          LOCATION: [],
        };
      });
    }
  }

  const selectLocationlist = (event, value) => {
    setSelectedLocList(event)
    let selectedLocationlist = [];
    if (value.option) {
      valLoc1.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   ////////console.log(1234)
      //   setInputLoc("");
      // }
      if (String(value.option.LOC_LIST).includes(inputLoc1)) {
        setInputLoc("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valLoc.length; i++) {
        if (valLoc1[i]["LOCATIONLIST"] === value.removedValue.LOCATIONLIST) {
          index = i;
          break;
        }
      }
      valLoc1.splice(index, 1);
    } else if (value.action === "clear") {
      valLoc1.splice(0, valLoc1.length);
    }
    if (event === 0) {
      valLoc1.push(event)
    }
    if (valLoc1.length > 0 && typeof valLoc1[0]['LOC_LIST'] !== "undefined") {
      setCheckStore(false);
      valLoc1.map(
        (item) => {
          selectedLocationlist.push(item.LOC_LIST);
        }
      )
      setSearchData((prev) => {
        return {
          ...prev,
          ALL_STORES: "N",
          LOCATION_LIST: selectedLocationlist,
        };
      });
      // }else if(value.length > 0){
      //       swal(
      //         <div>     
      //           <p>{"Please Choose valid LOCATION"}</p>
      //         </div>
      //       )  
      // }
    } else {
      ////console.log("clear:")
      initialsearch.LOCATIONLIST = "";
      setSearchData((prev) => {
        return {
          ...prev,
          LOCATION_LIST: [],
        };
      });
    }
  }

  const selectLocationtraits = (event, value) => {
    ////console.log("event:", event)
    ////console.log("value:", value)
    setSelectedLoctrait(event)
    let selectedLocationtraits = [];
    if (value.option) {
      valLoc2.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   ////////console.log(1234)
      //   setInputLoc("");
      // }
      if (String(value.option.LOC_TRAIT).includes(inputLoc2)) {
        setInputLoc("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valLoc2.length; i++) {
        if (valLoc2[i]["LOCATION_TRAITS"] === value.removedValue.LOCATION_TRAITS) {
          index = i;
          break;
        }
      }
      valLoc2.splice(index, 1);
    } else if (value.action === "clear") {
      valLoc2.splice(0, valLoc2.length);
    }
    if (event === 0) {
      valLoc2.push(event)
    }
    if (valLoc2.length > 0 && typeof valLoc2[0]['LOC_TRAIT'] !== "undefined") {
      setCheckStore(false);
      valLoc2.map(
        (item) => {
          selectedLocationtraits.push(item.LOC_TRAIT);
        }
      )
      setSearchData((prev) => {
        return {
          ...prev,
          ALL_STORES: "N",
          LOCATION_TRAITS: selectedLocationtraits,
        };
      });
      // }else if(value.length > 0){
      //       swal(
      //         <div>     
      //           <p>{"Please Choose valid LOCATION"}</p>
      //         </div>
      //       )  
      // }
    } else {
      ////console.log("clear:")
      initialsearch.LOCATION_TRAITS = "";
      setSearchData((prev) => {
        return {
          ...prev,
          LOCATION_TRAITS: [],
        };
      });
    }
  }

  const selectExcludedlocation = (event, value) => {

    ////console.log("event:", event)
    ////console.log("value:", value)
    setSelectedExcluded(event)
    let selectedExcluded_list = [];
    if (value.option) {
      valLoc3.push(value.option);
      // if (value.option.LOCATION===parseInt(inputLoc)){ 
      //   ////////console.log(1234)
      //   setInputLoc("");
      // }
      if (String(value.option.STORE).includes(inputLoc3)) {
        setInputLoc3("");
      }
    } else if (value.removedValue) {
      let index = 0
      for (var i = 0; i < valLoc3.length; i++) {
        if (valLoc3[i]["STORE"] === value.removedValue.STORE) {
          index = i;
          break;
        }
      }
      valLoc3.splice(index, 1);
    } else if (value.action === "clear") {
      valLoc3.splice(0, valLoc3.length);
    }
    if (event === 0) {
      valLoc3.push(event)
    }
    if (valLoc3.length > 0 && typeof valLoc3[0]['STORE'] !== "undefined") {
      valLoc3.map(
        (item) => {
          selectedExcluded_list.push(item.STORE);
        }
      )
      setSearchData((prev) => {
        return {
          ...prev,
          EXCLUDE_LOCATION: selectedExcluded_list,
        };
      });

    } else {
      ////console.log("clear:")
      initialsearch.EXCLUDE_LOCATION = "";
      setSearchData((prev) => {
        return {
          ...prev,
          EXCLUDE_LOCATION: [],
        };
      });
    }
  }



  const deleteRecords = () => {

    const loc_ids = selected;
    var data = [];
    if (totalData.length > 0) {
      data.push(...totalData);
    } else if (switchTableData.length > 0) {
      data.push(...switchTableData);
    }

    if (data.length > 0) {
      const updatedTable = data.filter((val) => {
        return !loc_ids.includes(val.LOCATION);
      });
      const delRows = data.filter((val) => {
        return loc_ids.includes(val.LOCATION);
      });
      if (delRows.length > 0) {
        dispatch(getDELETELOCATIONRLRequest(delRows));
      }
      setTotalData(updatedTable);
      setSelected([]);
    }
  };

  // ======================================================================================================================





  // ===========================================================================================================
  // const handleClick = () => {

  //   r1.current.clearValue()
  //   r2.current.clearValue()
  //   r3.current.clearValue()
  //   r4.current.clearValue()

  //   setCheck1(true)
  //   setCheck2(true)
  //   setNew_table([])
  //   settableData([])
  //   // window.location.reload(false);

  //   // setCheck3(true)
  //   // setCheck4(true)
  //   // setCheck5(true)
  //   // setCheck6(true)
  //   // setCheck7(true)
  //   // setCheck8(true)



  // }


  // useEffect(() => {
  //   (async () => {
  //     let data = await tableData.filter((res) => selectedRows.includes(res.id))
  //     setNew_table([].concat(data))
  //     //console.log(data);
  //   })();
  // }, [selectedRows]);

  // const handlechange = (e) => {
  //   const { name, checked } = e.target;
  //   if (name === "allSelect") {
  //     let tempuserdata = data.map((ele) => {
  //       return { ...ele, isChecked: checked };
  //     });
  //     setData(tempuserdata);
  //   } else {
  //     let tempuserdata = data.map((ele) =>
  //       ele.Loc == name ? { ...ele, isChecked: checked } : ele
  //     );
  //     setData(tempuserdata);
  //   }
  // };



  // const onClickFile = () => {

  // }
  // const copyDown = () => {
  //   //console.log(selectedRows);
  //   const temp = [].concat(tableData);
  //   let selectedRow = tableData[temp.findIndex(p => p.id == selectedRows[0])]
  //   //   let updatedData=tableData.forEach((data,index)=>{
  //   // return data
  //   //   })
  //   selectedRows.forEach((data) => {
  //     let row = temp.filter((res) => res.id == data)
  //     let index = temp.findIndex(p => p.id == data)
  //     //console.log(selectedRow);
  //     temp[index] = { ...row[0], LIKE_LOC: selectedRow.LIKE_LOC }
  //     //console.log(temp, index);
  //     //  temp[data]={...temp[data],LIKE_LOC:selectedRow.LIKE_LOC}
  //   })
  //   settableData(temp)
  // }
  // console.log("SerchData :", selected)
  // //console.log("location.......",locationRL)


  const LocationTopPart = () => (
    <div className={RulesLocationRightClasses.header_container}>
      <div className={RulesLocationRightClasses.header_child}>
        <InputLabel sx={{ fontWeight: "bold", fontSize: "18px", margin: "2px 0px -5px 2px", display: 'flex', float: 'left' }}>
          Location</InputLabel>
      </div>

      <div>
        <div className={RulesLocationRightClasses.header_child}>
          <Button
            sx={{
              fontSize: "12px",
              margin: "10px 0px 0px 0px",
            }}
            variant="contained">
            Save Template
          </Button>
        </div>
        <div className={RulesLocationRightClasses.header_child}>
          <Button
            sx={{
              fontSize: "12px",
              margin: "10px 0px 0px 0px",
            }}
            onClick={HandleRefreshLocationRL}
            variant="contained">
            Refresh
          </Button>
        </div>
        <div className={RulesLocationRightClasses.header_child}>
          <Button
            sx={{
              fontSize: "12px",
              margin: "10px 0px 0px 0px",
            }}
            onClick={HandleAddButton}
            variant="contained">
            Add
          </Button>
        </div>
        <div className={RulesLocationRightClasses.header_child}>
          <Button
            sx={{
              fontSize: "12px",
              margin: "10px 0px 0px 0px",
            }}
            onClick={deleteRecords}
            variant="contained">
            Delete
          </Button>
        </div>
      </div>

      <div>
        <div className={RulesLocationRightClasses.header_child}>
          <FormControlLabel size="small" sx={{ margin: "0px", padding: "0px" }}
            control={
              <Switch
                size="small"
                name="check1"
                checked={checkStore}
                onChange={handleswitchcheck}
                // onClick={() => { setCheck1(!check1) }}
                inputProps={{ 'aria-label': 'controlled' }}
                disabled={searchData?.LOCATION.length != 0 || searchData?.LOCATION_LIST.length != 0 || searchData?.LOCATION_TRAITS.length != 0}

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
              All stores</InputLabel>}
          />
        </div>

        <div className={RulesLocationRightClasses.header_child}>
          <FormControlLabel size="small" sx={{ margin: "0px", padding: "0px" }}
            control={
              <Switch
                size="small"
                name="check2"
                checked={check2}
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
              Enforce Store-WH relationship</InputLabel>}
          />
        </div>
      </div>

      <div>
        <div className={RulesLocationRightClasses.header_child}>
          <div className={RulesLocationRightClasses.header_child}>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "16px", margin: "2px 0px 0px 2px", display: 'flex', float: 'left' }}>
              Location Template :</InputLabel>
          </div>
          <div className={RulesLocationRightClasses.header_child}>
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
          <div className={RulesLocationRightClasses.header_child}>
            <Button
              sx={{
                // fontSize: "12px",
                margin: "0px 0px 0px 0px",
              }}
              variant="contained">
              Apply
            </Button>
          </div>
        </div>
      </div>

      <div>
        <div className={RulesLocationRightClasses.header_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "12px 0px 0px 2px", display: 'flex', float: 'left' }}>
              Location</InputLabel>
          </div>
          <div>
            <Select
              isDisabled={checkStore}
              maxMenuHeight={180}
              classNamePrefix="mySelect"
              getOptionLabel={option =>
                `${option.STORE.toString()} - ${option.STORE_DESC.toString()}`}
              getOptionValue={option => option.STORE}
              options={locationRL.length > 0 ? locationRL : []}
              isSearchable={true}
              onChange={selectLocation}
              menuPlacement="auto"
              isMulti
              isClearable={true}
              closeMenuOnSelect={true}
              hideSelectedOptions={false}
              // sx={{ width: "100%" }}

              styles={styleSelect1}
              value={locationRL.filter(obj => searchData?.LOCATION.includes(obj.STORE))}
              components={animatedComponents}
            />
          </div>
        </div>

        <div className={RulesLocationRightClasses.header_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "12px 0px 0px 2px", display: 'flex', float: 'left' }}>
              Location List</InputLabel>
          </div>
          <div>
            <Select
              isDisabled={checkStore}

              maxMenuHeight={180}
              classNamePrefix="mySelect"
              getOptionLabel={option =>
                `${option.LOC_LIST.toString()} - ${option.LOC_LIST_DESC.toString()}`}
              getOptionValue={option => option.LOC_LIST}
              options={locationListRL.length > 0 ? locationListRL : []}
              isSearchable={true}
              onChange={selectLocationlist}
              menuPlacement="auto"
              isMulti
              isClearable={true}
              closeMenuOnSelect={true}
              hideSelectedOptions={false}
              // sx={{ width: "100%" }}
              styles={styleSelect1}
              value={locationListRL.filter(obj => searchData?.LOCATION_LIST.includes(obj.LOC_LIST))}
              components={animatedComponents}
            />
          </div>
        </div>

        <div className={RulesLocationRightClasses.header_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "12px 0px 0px 2px", display: 'flex', float: 'left' }}>
              Location Traits</InputLabel>
          </div>
          <div>
            <Select
              isDisabled={checkStore}

              maxMenuHeight={180}
              classNamePrefix="mySelect"
              getOptionLabel={option =>
                `${option.LOC_TRAIT.toString()} - ${option.TRAIT_DESC.toString()}`}
              getOptionValue={option => option.LOC_TRAIT}
              options={locationTraitRL.length > 0 ? locationTraitRL : []}
              isSearchable={true}
              onChange={selectLocationtraits}
              menuPlacement="auto"
              isMulti
              isClearable={true}
              closeMenuOnSelect={true}
              hideSelectedOptions={false}
              // sx={{ width: "100%" }}
              value={locationTraitRL.filter(obj => searchData?.LOCATION_TRAITS.includes(obj.LOC_TRAIT))}
              styles={styleSelect1}
              components={animatedComponents}
            />
          </div>
        </div>

        <div className={RulesLocationRightClasses.header_child}>
          <div>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "12px 0px 0px 2px", display: 'flex', float: 'left' }}>
              Exclude Location</InputLabel>
          </div>
          <div>
            <Select
              maxMenuHeight={180}
              classNamePrefix="mySelect"
              getOptionLabel={option =>
                `${option.STORE.toString()} - ${option.STORE_DESC.toString()}`}
              getOptionValue={option => option.STORE}
              options={locationRL.length > 0 ? locationRL : []}
              isSearchable={true}
              onChange={selectExcludedlocation}
              menuPlacement="auto"
              isMulti
              isClearable={true}
              closeMenuOnSelect={true}
              hideSelectedOptions={false}
              // sx={{ width: "100%" }}
              value={locationRL.filter(obj => searchData?.EXCLUDE_LOCATION.includes(obj.STORE))}
              styles={styleSelect1}
              components={animatedComponents}
            />
          </div>
        </div>
      </div>

    </div>
  )

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
      const filteredTable = tableLocData.filter((props) =>
        Object.entries(inputValue).every(
          ([key, val]) =>
            !val.length ||
            props[key]
              ?.toString()
              .toLowerCase()
              .includes(val?.toString().toLowerCase())
        )
      );
      setTotalData(filteredTable);
    }
  }, [inputValue]);



  return (
    // <div className="right-container">
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

      <div>
        <Box
          display="inline-block"
          sx={{
            // width: "100%",
            height: "auto",
          }}
        >
          <div className={RulesLocationRightClasses.course_box}>
            <div>
              {LocationTopPart()}
            </div>

            <div>
              <Paper sx={{ marginTop: "10px" }}>
                <TableContainer style={{
                  maxHeight: 360,
                  width: "95vh",
                }} component={Paper}>
                  <Table aria-label="customized table">
                    <EnhancedTableHead
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                      rowCount={totalData.length}
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
                          name="LOC_DESC"
                          onChange={testChange}
                          placeholder="Loc Desc"
                          autoComplete="off"
                          InputProps={{
                            style: { fontSize: 12, height: "30px" },
                          }}
                        />
                      </TableCell>

                      <TableCell sx={{ padding: "0px" }}>
                        <TextField
                          name="LOC_TYPE"
                          onChange={testChange}
                          autoComplete="off"
                          placeholder="Loc Type"
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
                          placeholder="Default WH"
                          InputProps={{
                            style: { fontSize: 12, height: "30px" },
                          }}
                        />
                      </TableCell>

                      <TableCell sx={{ padding: "0px" }}>
                        <TextField
                          name="GROUP_ID"
                          onChange={testChange}
                          autoComplete="off"
                          placeholder="Group ID"
                          InputProps={{
                            style: { fontSize: 12, height: "30px" },
                          }}
                        />
                      </TableCell>

                      <TableCell sx={{ padding: "0px" }}>
                        <TextField
                          name="GROUP_DESC"
                          onChange={testChange}
                          autoComplete="off"
                          placeholder="Group Desc"
                          InputProps={{
                            style: { fontSize: 12, height: "30px" },
                          }}
                        />
                      </TableCell>

                      <TableCell sx={{ padding: "0px" }}>
                        <TextField
                          name="LIKE_LOC"
                          // onChange={handleChangeValue}
                          autoComplete="off"
                          InputProps={{ style: { fontSize: 12, height: "30px" } }}
                        />
                      </TableCell>

                      <TableCell sx={{ padding: "0px" }}>
                        <TextField
                          name="LIKE_LOC_DESC"
                          // onChange={handleChangeValue}
                          autoComplete="off"
                          InputProps={{ style: { fontSize: 12, height: "30px" } }}
                        />
                      </TableCell>

                      <TableCell sx={{ padding: "0px" }}>
                        <TextField
                          name="WEIGHT"
                          // onChange={handleChangeValue}
                          autoComplete="off"
                          InputProps={{ style: { fontSize: 12, height: "30px" } }}
                        />
                      </TableCell>

                      <TableCell sx={{ padding: "0px" }}>
                        <TextField
                          name="CLEARANCE_FLAG"
                          // onChange={handleChangeValue}
                          autoComplete="off"
                          InputProps={{ style: { fontSize: 12, height: "30px" } }}
                        />
                      </TableCell>

                      <TableCell sx={{ padding: "0px" }}>
                        <TextField
                          name="STATUS"
                          // onChange={handleChangeValue}
                          autoComplete="off"
                          InputProps={{ style: { fontSize: 12, height: "30px" } }}
                        />
                      </TableCell>


                      {stableSort(totalData, getComparator(order, orderBy))
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
                                  onClick={(event) => handleSingleClick(event, row?.LOCATION)}
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
                                {row.LOC_DESC}
                              </StyledTableCell>

                              <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} >
                                {row.LOC_TYPE}
                              </StyledTableCell>

                              <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right">
                                {row.DEFAULT_WH}
                              </StyledTableCell>

                              <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right">
                                {row.GROUP_ID}
                              </StyledTableCell>

                              <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right">
                                {row.GROUP_DESC}
                              </StyledTableCell>

                              <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", padding: 0 }} textAlign="right">
                                <TextField
                                  InputProps={{
                                    style: { fontSize: 12, height: "30px" },
                                  }}
                                  value={row.LIKE_LOC}
                                  name="LIKE_LOC"
                                  // onChange={(e) => onChange(e, row.ITEM)}
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
                                  value={row.LIKE_LOC_DESC}
                                  name="LIKE_LOC_DESC"
                                  // onChange={(e) => onChange(e, row.ITEM)}
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
                                  value={row.WEIGHT}
                                  name="WEIGHT"
                                  // onChange={(e) => onChange(e, row.ITEM)}
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
                                  value={row.CLEARANCE_FLAG}
                                  name="CLEARANCE_FLAG"
                                  // onChange={(e) => onChange(e, row.ITEM)}
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
                                  value={row.STATUS}
                                  name="STATUS"
                                  // onChange={(e) => onChange(e, row.ITEM)}
                                  autoComplete="off"
                                  inputProps={{
                                    maxLength: 20,
                                  }}
                                />
                              </StyledTableCell>
                              {/* <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", padding: 0 }} textAlign="right">
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
                            </StyledTableCell> */}

                            </TableRow >
                          );
                        })}
                      {/*  switch Data*/}


                      {totalData.length === 0 ?
                        stableSort(switchTableData, getComparator(order, orderBy))
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
                                    onClick={(event) => handleSingleClick(event, row?.LOCATION)}
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
                                  {row.LOC_DESC}
                                </StyledTableCell>

                                <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} >
                                  {row.LOC_TYPE}
                                </StyledTableCell>

                                <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right">
                                  {row.DEFAULT_WH}
                                </StyledTableCell>

                                <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right">
                                  {row.GROUP_ID}
                                </StyledTableCell>

                                <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} textAlign="right">
                                  {row.GROUP_DESC}
                                </StyledTableCell>

                                <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", padding: 0 }} textAlign="right">
                                  <TextField
                                    InputProps={{
                                      style: { fontSize: 12, height: "30px" },
                                    }}
                                    value={row.LIKE_LOC}
                                    name="LIKE_LOC"
                                    // onChange={(e) => onChange(e, row.ITEM)}
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
                                    value={row.LIKE_LOC_DESC}
                                    name="LIKE_LOC_DESC"
                                    // onChange={(e) => onChange(e, row.ITEM)}
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
                                    value={row.WEIGHT}
                                    name="WEIGHT"
                                    // onChange={(e) => onChange(e, row.ITEM)}
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
                                    value={row.CLEARANCE_FLAG}
                                    name="CLEARANCE_FLAG"
                                    // onChange={(e) => onChange(e, row.ITEM)}
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
                                    value={row.STATUS}
                                    name="STATUS"
                                    // onChange={(e) => onChange(e, row.ITEM)}
                                    autoComplete="off"
                                    inputProps={{
                                      maxLength: 20,
                                    }}
                                  />
                                </StyledTableCell>
                                {/* <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", padding: 0 }} textAlign="right">
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
                            </StyledTableCell> */}

                              </TableRow >
                            );
                          })
                        : null
                      }
                      {totalData.length < 5 ?
                        [...Array(5 - (totalData.length)).keys()].map(val => (
                          <TableRow  >
                            <StyledTableCell padding="checkbox"> <Checkbox color="primary" disabled={true} /></StyledTableCell>
                            <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}></StyledTableCell>
                            <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }}></StyledTableCell>
                            <StyledTableCell align="right" sx={{ fontFamily: "system-ui", textAlign: "left", fontSize: "75%", padding: 0 }} ></StyledTableCell>
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
                          </TableRow >
                        )) : false}
                    </TableBody>
                  </Table>
                </TableContainer>
                {totalData.length > 0 ? <EnhancedTableToolbar numSelected={selected.length} /> : null}
              </Paper>
            </div>
          </div>
        </Box>
      </div>
    </Box>
  );
};

export default RightContainer;







