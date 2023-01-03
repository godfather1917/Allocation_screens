import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftContainer from './LeftContainer'
import RightContainer from './RightContainer'
import Top from './Top';

import axios from "axios";
import { CONFIG } from "../../services/config";

import swal from '@sweetalert/with-react';
import { getALLOCHEADDETAILSRequest, getALLOCNODETAILSRequest } from "../../Redux/Action/quantityLimits";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import { makeStyles, withStyles } from "@mui/styles";
import Button from "@mui/material/Button";


const useStyles = makeStyles({
  divBox: {
    width: "100%",
    height: "100%",
  },
  divBoxLeft: {
    width: "50%",
    float: "left",
    height: "100%",
  },
  divBoxRight: {
    marginLeft: "50%",
    height: "100%",
  },
})


const RulesAndLocation = ({ allocNoData, tab, setTab,setIsValidQtyLimits}) => {
  // const leftContRef = useRef();
  const [submit, setSubmit] = useState([]);
  const [new_table, setNew_table] = useState([])
  const [allocNo, setAllocNo] = useState([]);
  const [allocLevel, setAllocLevel] = useState('');
  const [totalData, setTotalData] = useState([]);

  const RulesLocationClasses = useStyles();
  const [allocDetails, setAllocDetails] = useState([{}])


  const initialLeftRules={
    RULE_LEVEL:"",
    EXACT_IND:"",
    RULE_TYPE:"",
    NET_NEED_IND:"",
    REGULAR_SALES_IND:"Y",
    PROMO_SALES_IND:"Y",
    CLEARANCE_SALES_IND:"N",
    USESIZEPROFILE:"N",
    ENFORCE_PRES_MIN_IND:"N",
    START_DATE1:"",
    END_DATE1:"",
    START_DATE2:"",
    END_DATE2:"",
    WEEKS_THIS_YEAR:"",
    WEEKS_LAST_YEAR:"",
    ON_ORDER_COMMIT_WEEKS:"",
    ON_ORDER_COMMIT_DATE:"",
    EXACT_IND_VAL:"",
    NET_NEED_IND_VAL:"",
    ALLOC_NO:allocNoData.ALLOC_NO,
    CHANGEWEIGHTSCHECK:"N",
  }

  const [leftContData, setLeftContData] = useState(initialLeftRules)

  // console.log("allocNoData1234::", allocNoData,allocDetails,allocNoDtl);
  // const submit1 = async () => {
  //   console.log(leftContData);
  //   if (leftContData.CLEARANCE_SALES_IND == 'N' && leftContData.PROMO_SALES_IND == 'N' && leftContData.REGULAR_SALES_IND == 'N') {
  //     swal(
  //       <div>
  //         <p>{"Please select atleast one history type"}</p>
  //       </div>
  //     )
  //   }
  //   else if ((leftContData.RULE_TYPE == undefined || leftContData.RULE_TYPE == '') || (leftContData.RULE_LEVEL == undefined || leftContData.RULE_LEVEL == '') || (leftContData.NET_NEED_IND == undefined || leftContData.NET_NEED_IND == '') || (leftContData.EXACT_IND == undefined || leftContData.EXACT_IND == '')) {
  //     swal(
  //       <div>
  //         <p>{"Please give the inputs"}</p>
  //       </div>
  //     )
  //   }
  //   // &&leftContData.RULE_TYPE==undefined
  //   else {
  //     const temp = new_table.map(({ id, ...rest }) => {
  //       return { ...rest, ALLOC_ID: allocNoData["ALLOC_NO"] };
  //     })


      // let temp=[];
      //  await new_table.forEach( x => temp.push() )
      //leftContRef.current.handleClick1()
      // axios.post(CONFIG.BASE_URL + `/alloc_loc_Data_tab/`, temp).then(() => {
      //   axios.post(CONFIG.BASE_URL + `/alloc_rule_Data_tab/`, [{ ...leftContData, ALLOC_NO: allocNoData["ALLOC_NO"] }]).then(() =>
      //     swal(
      //       <div>
      //         <p>{"Data inserted successfully"}</p>
      //       </div>
      //     ))
      // })
      // const data1 = axios.post(`http://127.0.0.1:8000/alloc_rule_Data_tab/`, [leftContData])
      // console.log(temp);
  //   }

  // }

  console.log("totalData:::",leftContData,totalData);

  // const RulesAndLocationClasses = useStyles();

  // const RulesAndLocationData = useSelector(
  //   (state) => state.CreateAllocationReducers
  // );



  // useEffect(() => {
  //   setLoading(true);
  //   dispatch(getALLOCHEADDETAILSRequest([{}]));
  // }, [""]);
  // useEffect(() => {
  //   (async ()=>{
  //     let data=new_table;
  //     await data.forEach(function(item){ delete item.id });

  //   // let result = await data.forEach( x => { delete x.id } )
  // console.log(data);
  // })()}, [new_table]);
  return (

    <div >
      <div>
        <Top
          submit={submit}
          // submit1={submit1}
          leftContData={leftContData}
          setAllocNo={setAllocNo}
          allocNoData={allocNoData}
          setAllocLevel={setAllocLevel}
          allocDetails={allocDetails}
          setAllocDetails={setAllocDetails}
          setTab={setTab}
          tab={tab}
          setIsValidQtyLimits={setIsValidQtyLimits}
          totalData={totalData}
          setLeftContData={setLeftContData}
        />
      </div>
      {/* <div className={RulesLocationClasses.divBox}> */}
      <div>
        <Box
          display="grid"
          gridTemplateColumns="repeat(10, 1fr)" gap={1}
          sx={{
            backgroundColor: "",
            // height: "auto",
            // width: "100%",
            // width:"fit-screen",
            margin:"0px 0px 0px 0px"
          }}
        >
        <Box gridColumn="span 5">
        {/* <div className={RulesLocationClasses.divBoxLeft}> */}
          <LeftContainer
            // ref={leftContRef}
            setSubmit={setSubmit}
            setLeftContData={setLeftContData}
            allocLevel={allocLevel}
            allocNoData={allocNoData}
            allocDetails={allocDetails}
            leftContData={leftContData}
            totalData={totalData}
          />
        {/* </div> */}
        </Box>

        <Box gridColumn="span 5" >
        {/* <div className={RulesLocationClasses.divBoxRight}> */}
          <RightContainer
            new_table={new_table}
            setNew_table={setNew_table}
            allocNoData={allocNoData}
            setTotalData={setTotalData}
            totalData={totalData}
          />
        {/* </div> */}
        </Box>
        </Box>
      </div>
    </div>
  )
}

export default RulesAndLocation