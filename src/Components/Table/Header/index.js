import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";
import SearchTableData from "../Search";
import { makeStyles } from "@mui/styles";
import IconButton from '@mui/material/IconButton';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Grid from '@mui/material/Grid';
import { CoPresentOutlined } from "@mui/icons-material";
const useStyles = makeStyles({
  TableCell: {
    color: "#fff",
    padding: "6px 6px !important",
    lineHeight: "1.2rem !important",
  },
  SearchHead: {
    position: "sticky",
    top: "31px",
    background:'#fff',
  },
  TitleHead: {
    height: "25px",
    position: "sticky",
    top: -1,
  },
  resetfilter:{
    padding: "6px 6px !important",
    // top: "0px",
  }
});

export default function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    handleSearch,
    searchText,
    headCells,
    handleSearchClick,
    freeze,
    setFreeze,
    handleCopyDown,
    pageName,
    tableData,
    setAllData,
    tabledataclone,
    setInputValue,
    setSearched,
    setTabledata,
    inputValue,
    selected,
    rowsPerPage,
    page,
    selectPageNo,
    allSelectObject,
    s_object,
    s_selecVal
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  var pageCount=0
  var check=false
  var check2=false
 if( pageCount===0 && Object.keys(allSelectObject).length>0){
      pageCount=(Object.keys(allSelectObject).length) * rowsPerPage
      //check= false
    }
  
    // if((pageCount===0 ||numSelected>(Object.keys(allSelectObject).length) * rowsPerPage) && numSelected>0){
    //   //pageCount=numSelected+1
    //   check= true
      
    // }
    if(!allSelectObject.hasOwnProperty(page)){
      console.log(123)
      check=true
    }
    console.log("condition",numSelected > 0  &&  check,
    rowCount > 0 && (numSelected <= pageCount || numSelected >= pageCount)  && allSelectObject.hasOwnProperty(page)  )
  console.log("header setAllData",numSelected,pageCount);
  
  const resetFilter = () => {
    setSearched("");
    setInputValue("");

    if (inputValue.length===0){
      //  console.log("if:",freeze)
    setTabledata(tableData);
    setAllData(tableData);
    setFreeze(false);
    }else{
      //  console.log("else:",freeze)
    setTabledata(tabledataclone);
    setAllData(tabledataclone);
     setFreeze(false);
    }
  }
  const headerclasses = useStyles();
  return (
    <>
      <TableHead className={headerclasses.TitleHead}>
        <TableRow>
          <TableCell padding="checkbox" style={{
                whiteSpace: "nowrap", 
              }}>
            <Checkbox
              color="primary"
              // indeterminate={(numSelected > 0 && check) }
              // checked={rowCount > 0 && numSelected <= pageCount && allSelectObject.hasOwnProperty(page)}
              indeterminate={(numSelected > 0 && numSelected < pageCount)}
              checked={rowCount > 0 && numSelected <= pageCount && allSelectObject.hasOwnProperty(page)}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all data",
              }}
              style={{
                color: "#fff",
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <>
              <TableCell
                key={headCell.id}
                className={headerclasses.TableCell}
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
              </TableCell>
            </>
          ))}
        </TableRow>
      </TableHead>
      <TableHead className={headerclasses.SearchHead} >
      <TableCell padding="checkbox">
      <Grid item xs={1} style={{ padding: "0px",margin:"0px 0px 0px -6px"}}>
            <IconButton className={headerclasses.resetfilter} onClick={resetFilter}>
              <RestartAltIcon />
            </IconButton>
          </Grid>
        </TableCell>
        {headCells.map((searchData, index) => (
          <>
            <TableCell className={headerclasses.TableCell}>
              <SearchTableData
                type="search"
                name={searchData.id}
                placeholder={searchData.label}
                value={
                  searchText && searchText[searchData.id]
                    ? searchText[searchData.id]
                    : ""
                }
                width={searchData.width}
                onChange={handleSearch}
                onClick={handleSearchClick}
                freeze={freeze}
                onCopy={handleCopyDown}
                colEnabled={searchText}
                selected={selected}
                pageName={pageName}
              />
            </TableCell>
          </>
        ))}
      </TableHead>
    </>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
