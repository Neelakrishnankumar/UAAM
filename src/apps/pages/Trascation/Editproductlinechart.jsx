import React from "react";
import { TextField, Box, Typography, FormControl, FormLabel, Button, IconButton, } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Formik } from "formik";
// import CustomerLineChart from "./CustomerLine";
import Chart from 'react-apexcharts';
import ResetTvIcon from "@mui/icons-material/ResetTv";
const Editproductlinechart = () => {

    const isNonMobile = useMediaQuery("(min-width:600px)")


    const state = {
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
            }
        },
        series: [
            {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            }
        ]
    };

    return (
        <React.Fragment>
            <Box display="flex" justifyContent="space-between" p={2}>
                <Box
                    display="flex"
                    borderRadius="3px"
                    alignItems="center"
                >
                    <Typography variant="h3">Product Analysis</Typography>
                </Box>
                <Box display="flex">
                <IconButton>
            <ResetTvIcon color="error" />
          </IconButton>
                    <IconButton>
                        <LogoutOutlinedIcon color="error" />
                    </IconButton>

                </Box>
            </Box>



            <Box
                m="20px"
            >
                <Formik>{({ }) => (
                    <form>
                        <Box
                            display="grid"
                            gridTemplateColumns="repeat(4 , minMax(0,1fr))"
                            gap="30px"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span4" }
                            }}
                        >
                            <FormControl
                                fullWidth
                                sx={{ gridColumn: "span 2", gap: "40px" }}
                            >
                                <TextField
                                    id="outlined-basic"
                                    label="ID"
                                    variant="filled"
                                    // value={selectSMLookupData.SMlookupRecordid}
                                    focused
                                    sx={{ display: "none" }}
                                />

                                <FormControl
                                    sx={{
                                        gridColumn: "span 2",
                                        display: "flex",

                                    }}
                                >
                                    {/* <FormLabel>Material </FormLabel> */}
                                    <FormControl
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginTop: "50px",
                                        }}
                                    >
                                        <TextField
                                            id="outlined-basic"
                                            label="Product"
                                            variant="filled"
                                            // value={selectSMLookupData.SMlookupCode}
                                            focused
                                            required
                                            inputProps={{ tabIndex: "-1" }}
                                        />
                                        <IconButton 
                                            sx={{ height: 40, width: 40 }}
                                        // onClick={() => handleShow("SM")}
                                        >
                                            <img src="https://img.icons8.com/color/48/null/details-popup.png" />
                                        </IconButton>
                                        {/* <MoreHorizIcon  onClick={()=>handleShow('SM')} color='white' sx={{height:'30px'}} mt='15px' fontSize='medium' /> */}

                                        <TextField
                                            id="outlined-basic"
                                            // label="Description"
                                            variant="filled"
                                            // value={selectSMLookupData.SMlookupDesc}
                                            fullWidth
                                            inputProps={{ tabIndex: "-1" }}
                                            focused
                                        />
                                    </FormControl>
                                </FormControl>

                            </FormControl>
                            
                        </Box>
                       
                        <Box display="flex" justifyContent="end" mt="20px" gap="20px">
<Button variant="contained" color="secondary">
    APPLY
</Button>
<Button variant="contained" color="error">
    RESET
</Button>
                 </Box>
                        <Box sx={{ gridColumn: "span 4" ,m:10}}>
                            <Chart
                                options={state.options}
                                series={state.series}
                                type="line"
                                width="100%"
                            />
                        </Box>
                    </form>
                )}
                </Formik>
            </Box>

        </React.Fragment>
    )
}

export default Editproductlinechart;
