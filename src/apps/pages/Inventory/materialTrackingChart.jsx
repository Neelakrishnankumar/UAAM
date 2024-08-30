// import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';
import { useDispatch } from 'react-redux';
import { MaterialTrackingFetchData, materialDcTrckChartData } from '../../../store/reducers/Formapireducer';
// project imports
// import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
// import MainCard from 'ui-component/cards/MainCard';
// import { gridSpacing } from 'store/constant';



const status = [
    {
        value: 'today',
        label: 'Today'
    },
    {
        value: 'month',
        label: 'This Month'
    },
    {
        value: 'year',
        label: 'This Year'
    }
];



// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const MaterialBarChart = ({ RecordID,Type }) => {

    const dispatch = useDispatch()

    const seriesData = useSelector((state) => state.formApi.stockReqData);

    useEffect(() => {
        dispatch(materialDcTrckChartData({RecordID,Type}))
    },[])
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
        height: 480,
        type: 'bar',
        options: {
            chart: {
               
                id: 'bar-chart',
                stacked: false,
                
                toolbar: {
                    show: true
                  },
                  zoom: {
                    enabled: true
                  }
                
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0
                        }
                    }
                }
            ],
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '20px'
                }
            },
            xaxis: {
                type: 'category',
                categories: seriesData ?  seriesData.categories : ["Loading..."]  },
                 colors: ['#77dd77','#ef5350', '#F28C28',],
            legend: {
                show: true,
                fontSize: '14px',
                fontFamily: `'Roboto', sans-serif`,
                position: 'bottom',
                offsetX: 20,
                labels: {
                    useSeriesColors: false
                },
                markers: {
                    width: 16,
                    height: 16,
                    radius: 5
                },
                
                itemMargin: {
                    horizontal: 15,
                    vertical: 8
                }
            },
            fill: {
                type: 'solid'
            },
            dataLabels: {
                enabled: false
            },
            grid: {
                show: true
            }
        },
       
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
                                            <Typography variant="subtitle2">Stock Requirements</Typography>
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
                        {seriesData && seriesData.categories &&(
                        <Chart
                            
                            series={seriesData.series}
                            {...chartData} 
                            
                            />)}
                            
                        </Grid>
                    </Grid>
                {/* </MainCard>
            )} */}
        </>
    );
};



export default MaterialBarChart;
