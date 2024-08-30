// import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';
import { stockRequirementFetchapiData } from '../../store/reducers/Formapireducer';
import { useDispatch } from 'react-redux';

// project imports
// import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
// import MainCard from 'ui-component/cards/MainCard';
// import { gridSpacing } from 'store/constant';






// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const PieChart = ({ Data }) => {
    const [value, setValue] = useState('today');
    const theme = useTheme();
    const dispatch = useDispatch()
    const finYear = sessionStorage.getItem("year")
    // const seriesData = useSelector((state) => state.formApi.stockReqData);
    // console.log("🚀 ~ file: BarChart.jsx:113 ~ TotalGrowthBarChart ~ seriesData:", seriesData)


    // const { navType } = customization;
    // const { primary } = theme.palette.text;
    // const darkLight = theme.palette.dark.light;
    // const grey200 = theme.palette.grey[200];
    // const grey500 = theme.palette.grey[500];

    // const primary200 = theme.palette.primary[200];
    // const primaryDark = theme.palette.primary.dark;
    // const secondaryMain = theme.palette.secondary.main;
    // const secondaryLight = theme.palette.secondary.light;

    // useEffect(() => {
    //     const newChartData = {
    //         ...chartData.options,
    //         colors: [primary200, primaryDark, secondaryMain, secondaryLight],
    //         xaxis: {
    //             labels: {
    //                 style: {
    //                     colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary]
    //                 }
    //             }
    //         },
    //         yaxis: {
    //             labels: {
    //                 style: {
    //                     colors: [primary]
    //                 }
    //             }
    //         },
    //         grid: {
    //             borderColor: grey200
    //         },
    //         tooltip: {
    //             theme: 'light'
    //         },
    //         legend: {
    //             labels: {
    //                 colors: grey500
    //             }
    //         }
    //     };

    //     // do not load chart when loading
    //     if (!isLoading) {
    //         ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
    //     }
    // }, [ primary200, primaryDark, secondaryMain, secondaryLight, primary, darkLight, grey200, isLoading, grey500]);
    const chartData = {
        
            options: {},
            series: [44, 55, 41],
            chartOptions: {
                labels: ['Apple', 'Mango', 'Orange', 'Watermelon']
              }
          
        
    };
    return (
        <>
            {/* {isLoading ? (
                <SkeletonTotalGrowthBarChart />
            ) : (
                <MainCard> */}
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="subtitle2">Customer Order Status</Typography>
                                        </Grid>
                                       
                                    </Grid>
                                </Grid>
                                {/* <Grid item>
                                    <TextField
                                        id="standard-select-currency"
                                        select
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                    >
                                        {status.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid> */}
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Chart
                            height={180}
                            series={Data.series ? Data.series : [0]}
                            options={{
                                labels: Data.labels ? Data.labels : ["Loading..."],

                              
                                  
                       
                                    dataLabels:{
                                       enabled:true,
                                    }
                            }}
                            type="pie"
                            />
                        </Grid>
                    </Grid>
                {/* </MainCard>
            )} */}
        </>
    );
};



export default PieChart;
