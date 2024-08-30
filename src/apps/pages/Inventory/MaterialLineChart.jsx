// import PropTypes from 'prop-types';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';

// third-party

import Chart from 'react-apexcharts';




// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const MaterialLineChart = ({ xData , yData, title }) => {



    const chartData = {
      height: 300,
      type: "line",
      options: {
        chart: {
          id: "bar-chart",
          stacked: false,
  
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: true,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "20px",
          },
        },
        xaxis: {
          type: "category",
          categories: xData ? xData : ["Loading..."],
        },
        colors: ["#77dd77", "#ef5350", "#F28C28"],
        legend: {
          show: true,
          fontSize: "14px",
          fontFamily: `'Roboto', sans-serif`,
          position: "bottom",
          offsetX: 20,
          labels: {
            useSeriesColors: false,
          },
          markers: {
            width: 16,
            height: 16,
            radius: 5,
          },
  
          itemMargin: {
            horizontal: 15,
            vertical: 8,
          },
        },
        fill: {
          type: "solid",
        },
        dataLabels: {
          enabled: false,
        },
        grid: {
          show: true,
        },
      },
    };
    return (
      <>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <Typography variant="subtitle2">
                      {title}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {yData && xData && (
              <Chart series={yData} {...chartData} />
            )}
          </Grid>
        </Grid>
        {/* </MainCard>
              )} */}
      </>
    );
  };


export default MaterialLineChart;
