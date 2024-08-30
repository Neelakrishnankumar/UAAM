import React from "react";
import { useTheme,TextField, Box,InputLabel,Select,MenuItem, Typography, FormControl, FormLabel, Button, IconButton,  FormControlLabel, Checkbox,Tooltip } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Formik, Field} from "formik";
import basicSchema from '../../Security/validation'
import { useParams, useNavigate } from "react-router-dom";
import { tokens } from "../../../Theme";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridToolbarContainer,
  GridToolbarExport,
   
} from "@mui/x-data-grid";
import ResetTvIcon from '@mui/icons-material/ResetTv';
import { LoadingButton } from "@mui/lab";

const Editcustomerorder = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let params = useParams();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [pageSize, setPageSize] = React.useState(10);
  const YearFlag = sessionStorage.getItem("YearFlag")
  const mode = params.Mode;
  // const [ini,setIni] = useState(true)
  // const [loading, setLoading] = useState(false)

  const initialValues={
           receiverid:"",
           sample:"",
           orderno:"",
           date:"",
           dispatch:"",
           proformano:"",
           customerid:"",
           customerorderid:"",
           approvaldate:"",
           destinationdate:"",
           freight:"",
           sortorder:"",
  }
  const summaryinitialvalues={
    frieghtbasedonprice:"",
    frieghtbasedontariff:"",
    weight:"",
    priceperkg:"",
    handlingcharge:"",
    adjustment:"",
    currencyvalue:"",
    totalinchf:"",
    totalinrs:"",
    localagentcommision:"",
    foriegnagentcommision:"",
    sortorder:"",
    customerorderid:"",
  }


  const columns =[
    {
      field: "RecordID",
      headerName: "ID",
      flex: 1
    },
    {
      field: "code",
      headerName: "Code",
      flex: 1
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1
    }
  ]


  const row = [
    {
      code: 'code',
      RecordID:1,
      description: 'Description'
    }
  ]

  const [show, setScreen] = React.useState(0);
  const screenChange = (event) => {
    setScreen(event.target.value);}
  return (
    <React.Fragment>
      <Box display="flex" justifyContent="space-between" p={2}>
        <Box
          display="flex"
          borderRadius="3px"
          alignItems="center"
        >
           {show === 0 ? (
              <Typography variant="h3">Customer Order</Typography>
            ) : (
              false
            )}
            {show === 1 ? (
              <Typography variant="h3">Items</Typography>
            ) : (
              false
            )}
            {show === 2 ? (
              <Typography variant="h3">Summary</Typography>
            ) : (
              false
            )}
        </Box>
        <Box display="flex">
        {mode !== "A" ? (
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel >Explore</InputLabel>
                <Select
                 
                  value={show}
                  label="Explore"
                  onChange={screenChange}
                >
                  <MenuItem value={0}>Customer Order</MenuItem>
                  <MenuItem value={1}>Items</MenuItem>
                  <MenuItem value={2}>Summary</MenuItem>
                </Select>
              </FormControl>
            ) : (
              false
            )}
          <Tooltip title="Close">
          <IconButton onClick={() =>  navigate("/Apps/TR056/Customer Order")} color="error">
              <ResetTvIcon />
            </IconButton>
            </Tooltip>
            <Tooltip title="Logout">
            <IconButton onClick={() => navigate("/")} color="error">
              <LogoutOutlinedIcon />
            </IconButton>
            </Tooltip>

        </Box>
      </Box>
      {show == "0" ? (
      <Box m="20px">
        <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={basicSchema}
        >
          {({values,errors,touched,handleBlur,handleChange }) => (
          <form>
            <Box
              display="grid"
              gridTemplateColumns="repeat(4 , minMax(0,1fr))"
              gap="30px"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span2" }
              }}
            >

              <FormControl fullWidth sx={{ gridColumn: "span 2", gap: "40px" }}>
                <TextField
                  name="ReceiverId"
                  type="number"
                  id="ReceiverId"
                  label="Receiver Id"
                  variant="filled"
                  focused
                  values={values.receiverid}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  sx={{ background: "#fff6c3" }}
                  error={!!touched.receiverId && !!errors.receiverId}
                  helperText={touched.receiverId && errors.receiverId}
                  InputProps={{
                    inputProps: {
                      style: { textAlign: "right",  },
                    },
                  }}
                />

                <TextField
                  name="Sample"
                  type="text"
                  id="Sample"
                  label="Sample"
                  variant="filled"
                  focused
                  values={values.smaple}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.sample && !!errors.sample}
                  helperText={touched.sample && errors.sample}
                />

                <TextField
                  name="OrderNo"
                  type="text"
                  id="OrderNo"
                  label="Order No"
                  variant="filled"
                  focused
                  values={values.orderno}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.orderno && !!errors.orderno}
                  helperText={touched.orderno && errors.orderno}

                />
                <TextField
                  name="Date"
                  type="Date"
                  id="Date"
                  label="Date"
                  variant="filled"
                  focused
                  values={values.date}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.date && !!errors.date}
                  helperText={touched.date && errors.date}

                />
                <TextField
                  name="DispatchDate"
                  type="Date"
                  id="DispatchDate"
                  label="Dispatch Date"
                  variant="filled"
                  focused
                  values={values.dispatchdate}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.dispatchdate && !!errors.dispatchdate}
                  helperText={touched.dispatchdate && errors.dispatchdate}

                />
                <TextField
                  name="ProformaNo"
                  type="number"
                  id="ProformaNo"
                  label="Proforma No"
                  variant="filled"
                  focused
                  values={values.proformano}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.proformano && !!errors.proformano}
                  helperText={touched.proformano && errors.proformano}
                  sx={{ background: "#fff6c3" }}
                  InputProps={{
                    inputProps: {
                      style: { textAlign: "right",  },
                    },
                  }}

                />
                <TextField
                  name="CustomerId"
                  type="number"
                  id="CustomerId"
                  label="Customer Id"
                  variant="filled"
                  focused
                  values={values.customerid}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.customerid && !!errors.customerid}
                  helperText={touched.customerid && errors.customerid}
                  sx={{ background: "#fff6c3" }}
                  InputProps={{
                    inputProps: {
                      style: { textAlign: "right", },
                    },
                  }}

                />
              </FormControl>
              <FormControl fullWidth sx={{ gridColumn: "span 2", gap: "40px" }}>
                <TextField
                  name="CustomerOrderId"
                  type="number"
                  id="CustomerOrderId"
                  label="Customer Order Id"
                  variant="filled"
                  focused
                  values={values.customerorderid}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.customerorderid && !!errors.customerorderid}
                  helperText={touched.customerorderid && errors.customerorderid}
                  sx={{ background: "#fff6c3" }}
                  InputProps={{
                    inputProps: {
                      style: { textAlign: "right",  },
                    },
                  }}

                />
                <TextField
                  name="ApprovalDate"
                  type="Date"
                  id="ApprovalDate"
                  label="Approval Date"
                  variant="filled"
                  focused
                  values={values.approvaldate}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.approvaldate && !!errors.approvaldate}
                  helperText={touched.approvaldate && errors.approvaldate}

                />
                <TextField
                  name="DestinationDate"
                  type="Date"
                  id="DestinationDate"
                  label="Destination Date"
                  variant="filled"
                  focused
                  values={values.destinationdate}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.destinationdate && !!errors.destinationdate}
                  helperText={touched.destinationdate && errors.destinationdate}

                />
                <TextField
                  name="Freight"
                  type="number"
                  id="Freight"
                  label="Freight"
                  variant="filled"
                  focused
                  values={values.freight}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.freight && !!errors.freight}
                  helperText={touched.freight && errors.freight}

                />

                <TextField
                  name="FreightPercent"
                  type="number"
                  id="FreightPercent"
                  label="Freight  Percent"
                  variant="filled"
                  focused
                  values={values.freightpercent}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  sx={{ background: "#fff6c3" }}
                  error={!!touched.freightpercent && !!errors.freightpercent}
                  helperText={touched.freightpercent && errors.freightpercent}
                  InputProps={{
                    inputProps: {
                      style: { textAlign: "right", },
                    },
                  }}

                />
                <TextField
                  name="SortOrder"
                  type="number"
                  id="SortOrder"
                  label="Sort Order"
                  variant="filled"
                  focused
                  values={values.sortorder}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  sx={{ background: "#fff6c3" }}
                  error={!!touched.sortorder && !!errors.sortorder}
                  helperText={touched.sortorder && errors.sortorder}
                  InputProps={{
                    inputProps: {
                      style: { textAlign: "right", },
                    },
                  }}

                />
                <FormControl>
                  <Field
                    type="checkbox"
                    name="checkbox"
                    id="checkbox"
                    as={FormControlLabel}
                    control={<Checkbox checked={true} />}
                    label="Disable"
                  />
                </FormControl>

              </FormControl>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px" gap="20px">
              <Button variant="contained" color="secondary">
                SAVE
              </Button>
              <Button variant="contained" color="error"
              onClick={() =>  navigate("/Apps/TR056/Customer Order")}>
                CANCEL
              </Button>
            </Box>

          </form>



        )}</Formik>
      </Box>
      ) : (
          false
        )}
         {show == "1" ? (
          <Box m="20px" sx={{ m: 2 }}>
       
                 
                      

                      <Box m="5px">
                        <Box
                          m="5px 0 0 0"
                          height="55vh"
                          sx={{
                            "& .MuiDataGrid-root": {
                              border: "none",
                            },
                            "& .MuiDataGrid-cell": {
                              borderBottom: "none",
                            },
                            "& .name-column--cell": {
                              color: colors.greenAccent[300],
                            },
                            "& .MuiDataGrid-columnHeaders": {
                              backgroundColor: colors.blueAccent[800],
                              borderBottom: "none",
                            },
                            "& .MuiDataGrid-virtualScroller": {
                              backgroundColor: colors.primary[400],
                            },
                            "& .MuiDataGrid-footerContainer": {
                              borderTop: "none",
                              backgroundColor: colors.blueAccent[800],
                            },
                            "& .MuiCheckbox-root": {
                              color: `${colors.greenAccent[200]} !important`,
                            },
                          }}
                        >
                          <DataGrid
                            // checkboxSelection
                            rows={row}
                            columns={columns}
                            disableSelectionOnClick
                            getRowId={(row) => row.RecordID}
                            pageSize={pageSize}
                            onPageSizeChange={(newPageSize) =>
                              setPageSize(newPageSize)
                            }
                            rowsPerPageOptions={[5, 10, 20]}
                            pagination
                          
                         
                          />
                        </Box>
                      </Box>
                   
                  
                           
                          
                          
                        
                      
                    
                 
                
          </Box>
        ) : (
          false
        )}
 {show == "2" ? (
          <Box m="20px" sx={{ m: 2 }}>
            <Formik
              // onSubmit={handleFormSubmit}
              summaryinitialvalues={summaryinitialvalues}
              enableReinitialize={true}
              validationSchema={basicSchema}
            >
              {({ values, errors, touched, handleBlur, handleChange }) => (
                <form>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    {/* <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}> */}
                      

                      {/* <Box m="5px">
                        <Box
                          m="5px 0 0 0"
                          height="55vh"
                          sx={{
                            "& .MuiDataGrid-root": {
                              border: "none",
                            },
                            "& .MuiDataGrid-cell": {
                              borderBottom: "none",
                            },
                            "& .name-column--cell": {
                              color: colors.greenAccent[300],
                            },
                            "& .MuiDataGrid-columnHeaders": {
                              backgroundColor: colors.blueAccent[800],
                              borderBottom: "none",
                            },
                            "& .MuiDataGrid-virtualScroller": {
                              backgroundColor: colors.primary[400],
                            },
                            "& .MuiDataGrid-footerContainer": {
                              borderTop: "none",
                              backgroundColor: colors.blueAccent[800],
                            },
                            "& .MuiCheckbox-root": {
                              color: `${colors.greenAccent[200]} !important`,
                            },
                          }}
                        >
                          <DataGrid
                            // checkboxSelection
                            rows={explorelistViewData}
                            columns={columns}
                            disableSelectionOnClick
                            getRowId={(row) => row.RecordID}
                            pageSize={pageSize}
                            onPageSizeChange={(newPageSize) =>
                              setPageSize(newPageSize)
                            }
                            rowsPerPageOptions={[5, 10, 20]}
                            pagination
                            onCellClick={(params) => {
                              const currentRow = params.row;
                              const currentcellField = params.field;
                              selectcelldata(currentRow, "E", currentcellField);
                            }}
                            components={{
                              Toolbar: Custombar,
                            }}
                            componentsProps={{
                              toolbar: {
                                showQuickFilter: true,
                                quickFilterProps: { debounceMs: 500 },
                              },
                            }}
                          />
                        </Box>
                      </Box> */}
                    {/* </FormControl> */}
                    <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                            <TextField
                            name="frieghtbasedonprice"
                            type="number"
                            id="frieghtbasedonprice"
                            label="Frieght Based On Price"
                            variant="filled"
                            focused
                            // value={values.frieghtbasedonprice}
                            onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.frieghtbasedonprice && !!errors.frieghtbasedonprice}
                        helperText={touched.frieghtbasedonprice && errors.frieghtbasedonprice}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: "right",background: "#fff6c3" },
                              },
                            }}
                            />
                            <TextField
                            name="frieghtbasedontariff"
                            type="number"
                            id="frieghtbasedontariff"
                            label="Frieght Based On Tariff"
                            variant="filled"
                            focused
                            // value={values.frieghtbasedontariff}
                            onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.frieghtbasedontariff && !!errors.frieghtbasedontariff}
                        helperText={touched.frieghtbasedontariff && errors.frieghtbasedontariff}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: "right",background: "#fff6c3" },
                              },
                            }}
                            />
                            <TextField
                            name="weight"
                            type="number"
                            id="weight"
                            label="Weight"
                            variant="filled"
                            focused
                            // value={values.weight}
                            onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.weight && !!errors.weight}
                        helperText={touched.weight && errors.weight}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: "right",background: "#fff6c3" },
                              },
                            }}
                            />
                            <TextField
                            name="priceperkg"
                            type="number"
                            id="priceperkg"
                            label="Price Per Kg"
                            variant="filled"
                            focused
                            // value={values.priceperkg}
                            onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.priceperkg && !!errors.priceperkg}
                        helperText={touched.priceperkg && errors.priceperkg}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: "right",background: "#fff6c3" },
                              },
                            }}
                            />
                            <TextField
                            name="handlingcharge"
                            type="number"
                            id="handlingcharge"
                            label="Handling Charge"
                            variant="filled"
                            focused
                            // value={values.handlingcharge}
                            onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.handlingcharge && !!errors.handlingcharge}
                        helperText={touched.handlingcharge && errors.handlingcharge}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: "right",background: "#fff6c3" },
                              },
                            }}
                            />
                            <TextField
                            name="adjustment"
                            type="number"
                            id="adjustment"
                            label="Adjustment"
                            variant="filled"
                            focused
                            // value={values.adjustment}
                            onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.adjustment && !!errors.adjustment}
                        helperText={touched.adjustment && errors.adjustment}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: "right",background: "#fff6c3" },
                              },
                            }}
                            />
                            <TextField
                            name="currencyvalue"
                            type="number"
                            id="currencyvalue"
                            label="Currency Value"
                            variant="filled"
                            focused
                            // value={values.currencyvalue}
                            onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.currencyvalue && !!errors.currencyvalue}
                        helperText={touched.currencyvalue && errors.currencyvalue}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: "right",background: "#fff6c3" },
                              },
                            }}
                            />
                             </FormControl>
                             <FormControl sx={{ gridColumn: "span 2", gap: "40px" }}>
                            <TextField
                            name="totalinchf"
                            type="number"
                            id="totalinchf"
                            label="Total In Chf"
                            variant="filled"
                            focused
                            // value={values.totalinchf}
                            onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.totalinchf && !!errors.totalinchf}
                        helperText={touched.totalinchf && errors.totalinchf}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: "right",background: "#fff6c3" },
                              },
                            }}
                            />
                            <TextField
                            name="totalinrs"
                            type="number"
                            id="totalinrs"
                            label="Total In Rs"
                            variant="filled"
                            focused
                            // value={values.totalinrs}
                            onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.totalinrs && !!errors.totalinrs}
                        helperText={touched.totalinrs && errors.totalinrs}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: "right",background: "#fff6c3" },
                              },
                            }}
                            />
                            <TextField
                            name="localagentcommision"
                            type="text"
                            id="localagentcommision"
                            label="Local Agent Commision"
                            variant="filled"
                            focused
                            // value={values.localagentcommision}
                            onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.localagentcommision && !!errors.localagentcommision}
                        helperText={touched.localagentcommision && errors.localagentcommision}
                            />
                            <TextField
                            name="foriegnagentcommision"
                            type="text"
                            id="foriegnagentcommision"
                            label="Foriegn Agent Commision"
                            variant="filled"
                            focused
                            // value={values.foriegnagentcommision}
                            onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.foriegnagentcommision && !!errors.foriegnagentcommision}
                        helperText={touched.foriegnagentcommision && errors.foriegnagentcommision}
                            />
                            <TextField
                            name="sortorder"
                            type="number"
                            id="sortorder"
                            label="Sort Order"
                            variant="filled"
                            focused
                            // value={values.sortorder}
                            onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.sortorder && !!errors.sortorder}
                        helperText={touched.sortorder && errors.sortorder}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: "right",background: "#fff6c3" },
                              },
                            }}
                            />
                            <TextField
                            name="customerorderid"
                            type="text"
                            id="customerorderid"
                            label="Customer Order Id"
                            variant="filled"
                            focused
                            // value={values.customerorderid}
                            onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.customerorderid && !!errors.customerorderid}
                        helperText={touched.customerorderid && errors.customerorderid}
                            />
                           

                            <Box
                              display="flex"
                              justifyContent="end"
                              mt="30px"
                              gap={2}
                            >
                              <Button
                                color="secondary"
                                variant="contained"
                              
                              >
                                Save
                              </Button>
                              <Button
                                type="reset"
                                color="error"
                                variant="contained"
                                onClick={() => {
                                  setScreen(0);
                                }}
                              >
                                Cancel
                              </Button>
                            </Box>
                            </FormControl>
                          
                          
                        
                      
                    
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        ) : (
          false
        )}
    </React.Fragment>
  )
}

export default Editcustomerorder;