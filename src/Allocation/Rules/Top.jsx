import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Top.css"
import axios from "axios";
import { default as ReactSelect } from "react-select";
// import { useState } from 'react';
import data from './RightContainer';
import { CONFIG } from "../../services/config";
import {
     getALLOCHEADDETAILSRequest,
     getALLOCNODETAILSRequest,

} from "../../Redux/Action/quantityLimits";
import {
     getUPDATERULESRLRLRequest,
     getUPDATELOCATIONRLRequest,

} from "../../Redux/Action/rules&location";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import { makeStyles, withStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { NumbersOutlined } from "@mui/icons-material";
import swal from "sweetalert";

// import { setActionOptionsFor } from 'sweetalert/typings/modules/state';
// import LeftContData from './LeftContainer';
const inputField = {
     backgroundColor: '#e9e0e0'
}

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
})


const Top = ({ submit, submit1, leftContData, setAllocNo, allocNo, allocNoData, setAllocLevel, allocDetails, setAllocDetails, setTab, tab, setIsValidQtyLimits, totalData, setLeftContData }) => {

     // console.log("allocDetails::",allocDetails);

     const [loading, setLoading] = useState(false);
     const [isSearch, setSearch] = useState(false);
     const [allocNoDtl, setAllocNoDtl] = useState([]);
     const [tableData, setTableData] = useState([]);
     const [updateRulesRL, setUpdateRulesRL] = useState([]);
     // const [searchHeaderData, setSearchHeaderData] = useState(initialHeaderData);

     useEffect(() => {
          document.title = 'Rule And Location';
     }, []);

     const RulesLocationData = useSelector(
          (state) => state.RulesLocationReducers
     );

     const dispatch = useDispatch();

     const RulesLocationHeaderClasses = useStyles();

     useEffect(() => {
          setLoading(true);
          dispatch(getALLOCNODETAILSRequest([{}]))
          dispatch(getALLOCHEADDETAILSRequest([allocNoData]));
     }, [""]);

     useEffect(() => {
          if (
               RulesLocationData?.data?.allocDetails
               && Array.isArray(RulesLocationData?.data?.allocDetails)
          ) {
               setAllocDetails(RulesLocationData?.data?.allocDetails);
               setLoading(false);
          } else if (
               RulesLocationData?.data?.allocNoDtl
               && Array.isArray(RulesLocationData?.data?.allocNoDtl)
          ) {
               setAllocNoDtl(RulesLocationData?.data?.allocNoDtl);
               setLoading(false);
          } else if (
               RulesLocationData?.data?.updateRulesRL
               && Array.isArray(RulesLocationData?.data?.updateRulesRL)
          ) {
               setUpdateRulesRL(RulesLocationData?.data?.updateRulesRL);
               setLoading(false);
          } else {
               setSearch(false);
          }
     }, [RulesLocationData?.data]);

     console.log("allocDetails::", allocDetails, allocNoData);

     const handlesubmitRules = () => {
          console.log(leftContData);
          if (!((totalData.length > 0) && (leftContData.RULE_TYPE != '' && leftContData.EXACT_IND_VAL != ''
               && leftContData.RULE_LEVEL != '' && leftContData.NET_NEED_IND_VAL != '') && (leftContData.ON_ORDER_COMMIT_WEEKS != '' || leftContData.ON_ORDER_COMMIT_DATE != '') && ((leftContData.WEEKS_LAST_YEAR != '' || leftContData.WEEKS_THIS_YEAR != '') ||
                    (leftContData.START_DATE1 != '' && leftContData.START_DATE2 != '' && leftContData.END_DATE1 != ''
                         && leftContData.END_DATE2 != '')))) {
               swal(
                    "Please give inputs* "
               )
               console.log((totalData.length > 0) && (leftContData.RULE_TYPE != '' && leftContData.EXACT_IND_VAL != ''
                    && leftContData.RULE_LEVEL != '' && leftContData.NET_NEED_IND_VAL != '') && (leftContData.ON_ORDER_COMMIT_WEEKS != '' || leftContData.ON_ORDER_COMMIT_DATE != '') &&
                    ((leftContData.WEEKS_LAST_YEAR != '' && leftContData.WEEKS_THIS_YEAR != '') ||
                         (leftContData.START_DATE1 != '' && leftContData.START_DATE2 != '' && leftContData.END_DATE1 != ''
                              && leftContData.END_DATE2 != '')));
          } else {

               setLoading(true);
               console.log("new_table333:", leftContData);
               if (Object.keys(leftContData).length > 0) {
                    dispatch(getUPDATERULESRLRLRequest([leftContData]));
               }
               dispatch(getUPDATELOCATIONRLRequest(totalData))
               // setIsValidQtyLimits(true);
               swal(
                    "Data inserted"
               )
               setLeftContData((prev) => {
                    return {
                         ...prev,
                         CHANGEWEIGHTSCHECK: "Y"
                    };
               })
               setTab('1')


          }
          // dispatch(getUPDATELOCATIONRLRequest(totalData))
          // setIsValidQtyLimits(true);
          // setLeftContData((prev) => {
          // return {
          // ...prev,
          // CHANGEWEIGHTSCHECK: "Y"
          // };
          // })
          // setTab('1')
          // }


















     }


     console.log("totalData123::", totalData);
     console.log("totalData5555::", totalData, totalData.length);
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

               <div className={RulesLocationHeaderClasses.header_container}>
                    <div className={RulesLocationHeaderClasses.header_child}>
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
                                        className: RulesLocationHeaderClasses.input,
                                   }}
                                   disabled
                              />
                         </div>
                    </div>

                    <div className={RulesLocationHeaderClasses.header_child}>
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
                                   value={allocDetails.length > 0 ? allocDetails[0].ALLOC_DESC : null}
                                   defaultValue={allocDetails.length > 0 ? allocDetails[0].ALLOC_DESC : null}
                                   inputProps={{
                                        maxLength: 100,
                                   }}
                                   InputProps={{
                                        style: { fontSize: 12 },
                                        className: RulesLocationHeaderClasses.input,
                                   }}
                                   disabled
                              />
                         </div>
                    </div>

                    <div className={RulesLocationHeaderClasses.header_child}>
                         <div>
                              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                                   Context Type</InputLabel>
                         </div>
                         <div className={RulesLocationHeaderClasses.multiselectfield}>
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

                                   value={allocDetails.length > 0 ? allocDetails[0].CONTEXT : null}
                                   defaultValue={allocDetails.length > 0 ? allocDetails[0].CONTEXT : null}
                                   inputProps={{
                                        maxLength: 100,
                                   }}
                                   InputProps={{
                                        style: { fontSize: 12 },
                                        className: RulesLocationHeaderClasses.input,
                                   }}
                                   disabled
                              />
                         </div>
                    </div>

                    {(allocDetails.length > 0 ? allocDetails[0].CONTEXT === "Promotion" : null) ?
                         [
                              <div className={RulesLocationHeaderClasses.header_child}>
                                   <div>
                                        <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                                             Promotion</InputLabel>
                                   </div>
                                   <div className={RulesLocationHeaderClasses.multiselectfield}>
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

                                             value={allocDetails.length > 0 ? allocDetails[0].PROMOTION : null}
                                             defaultValue={allocDetails.length > 0 ? allocDetails[0].PROMOTION : null}
                                             inputProps={{
                                                  maxLength: 100,
                                             }}
                                             InputProps={{
                                                  style: { fontSize: 12 },
                                                  className: RulesLocationHeaderClasses.input,
                                             }}
                                             disabled
                                        />
                                   </div>
                              </div>
                         ] : null}


                    <div className={RulesLocationHeaderClasses.header_child}>
                         <div >
                              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                                   Alloc Level</InputLabel>
                         </div>
                         <div className={RulesLocationHeaderClasses.multiselectfield}>
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

                                   value={allocDetails.length > 0 ? allocDetails[0].ALLOC_LEVEL : null}
                                   defaultValue={allocDetails.length > 0 ? allocDetails[0].ALLOC_LEVEL : null}
                                   inputProps={{
                                        maxLength: 100,
                                   }}
                                   InputProps={{
                                        style: { fontSize: 12 },
                                        className: RulesLocationHeaderClasses.input,
                                   }}
                                   disabled
                              />
                         </div>
                    </div>

                    <div className={RulesLocationHeaderClasses.header_child}>
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
                                   value={allocDetails.length > 0 ? allocDetails[0].RELEASE_DATE : null}
                                   defaultValue={allocDetails.length > 0 ? allocDetails[0].RELEASE_DATE : null}
                                   InputProps={{
                                        style: { fontSize: 12 },
                                        shrink: true,
                                        className: RulesLocationHeaderClasses.input,
                                   }}
                              />
                         </div>
                    </div>

                    <div className={RulesLocationHeaderClasses.header_child}>
                         <div>
                              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                                   Status</InputLabel>
                         </div>
                         <div className={RulesLocationHeaderClasses.multiselectfield}>
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
                                   value={allocDetails.length > 0 ? allocDetails[0].STATUS : null}
                                   defaultValue={allocDetails.length > 0 ? allocDetails[0].STATUS : null}
                                   id="outlined-disabled"
                                   InputProps={{
                                        style: { fontSize: 12 },
                                        className: RulesLocationHeaderClasses.input,
                                   }}
                              />
                         </div>
                    </div>

                    <div className={RulesLocationHeaderClasses.header_child}>
                         <div>
                              <InputLabel sx={{ fontWeight: "bold", fontSize: "12px", margin: "2px 0px 2px 2px", display: 'inline', float: 'left' }}>
                                   Alloc Type</InputLabel>
                         </div>
                         <div className={RulesLocationHeaderClasses.multiselectfield}>
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

                                   value={allocDetails.length > 0 ? allocDetails[0].ALLOC_TYPE : null}
                                   defaultValue={allocDetails.length > 0 ? allocDetails[0].ALLOC_TYPE : null}
                                   inputProps={{
                                        maxLength: 100,
                                   }}
                                   InputProps={{
                                        style: { fontSize: 12 },
                                        className: RulesLocationHeaderClasses.input,
                                   }}
                                   disabled
                              />
                         </div>
                    </div>

                    <div className={RulesLocationHeaderClasses.header_child}>
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
                                   value={allocDetails.length > 0 ? allocDetails[0].ALLOCATOR : null}
                                   defaultValue={allocDetails.length > 0 ? allocDetails[0].ALLOCATOR : null}
                                   InputProps={{
                                        style: { fontSize: 12 },
                                        className: RulesLocationHeaderClasses.input,
                                   }}
                              />
                         </div>
                    </div>

                    <div className={RulesLocationHeaderClasses.header_child}>
                         <Button
                              sx={{
                                   // fontSize: "12px",
                                   margin: "10px 0px 0px 0px",
                                   backgroundColor: "MediumSeaGreen",
                              }}
                              variant="contained"
                              onClick={handlesubmitRules}
                         //disabled={totalData.length > 0 ? false : true}
                         >
                              Submit
                         </Button>
                    </div>

                    <div className={RulesLocationHeaderClasses.header_child}>
                         <Button
                              sx={{
                                   backgroundColor: "rgb(255, 0, 9)",
                                   //  fontSize: "12px",
                                   margin: "10px 0px 0px 0px",
                              }}
                              variant="contained">
                              Cancel
                         </Button>
                    </div>
               </div>
          </Box>
     )


     return (
          <Box className={RulesLocationHeaderClasses.maindiv}>
               <Grid >
                    <Box
                         display="inline-block"
                         sx={{
                              backgroundColor: "",
                              width: "100%",
                              height: "auto",
                         }}
                    >
                         <div sx={{ display: "flex", flexDirection: "column" }}>
                              <Grid id="top-row" container spacing={0} >
                                   <div className={RulesLocationHeaderClasses.course_box}>
                                        {SearchHeader()}
                                   </div>
                              </Grid>
                         </div>
                    </Box>
               </Grid>
          </Box>
     )
}

export default Top;