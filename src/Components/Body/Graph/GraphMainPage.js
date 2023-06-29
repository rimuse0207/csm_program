import React from 'react';
import { styled } from 'styled-components';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';

const GraphMainPageMainDivBox = styled.div`
    
    height:45vh;
    width:100%;
    .chart-container{
        height:45vh;
        width:100%;
        display:flex;
        justify-content:space-around;
        .Chart_Sub_Container{
          width:30%;
        }

    }

  
`

const labels = ['01월', '02월', '03월', '04월', '05월', '06월', '07월', '08월', '09월', '10월', '11월', '12월'];
ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);
export const Grinder_Data = {
  labels,
  datasets: [
    {
        type:'bar',
          label: 'GRINDER CSM건수',
          data: ['1','2','3','4','5','6','1','2','3','4','5','6'],
          backgroundColor:'rgb(75, 192, 192,0.5)',
       stack: 'Stack 0',
      },
    {
       type:'line',
          label: 'GRINDER 목표치',
      data: ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21'],
          borderColor:'rgb(75, 192, 192)',
          backgroundColor: 'rgb(75, 192, 192)',
    },
    
  ],
};
export const Dicer_Data = {
  labels,
  datasets: [
   
    {
      type:'bar',
      label: 'DICER CSM건수',
      data: ['1','2','3','4','5','6','7','8','9','10','11','12'],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
         stack: 'Stack 2',
    }, {
      type:'line',
      label: 'DICER 목표치',
      data: ['21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32'],
      borderColor:'rgba(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235)',
    },
  ],
};
export const Laser_Data = {
  labels,
  datasets: [
   
    {
      type:'bar',
      label: 'LASER CSM건수',
      data: ['10','20','30','40','50','60','10','2','3','4','5','6'],
        backgroundColor:'rgba(255, 99, 132, 0.5)',
       stack: 'Stack 1',
      },
    {
      
         type:'line',
      label: 'LASER 목표치',
      data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
         borderColor:'rgba(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132)',
      },
 
  ],
};
export const Grinder_Options = {
    responsive: true,
   
    plugins: {
        legend: {
         position: 'top' ,
        },
        title: {
         display: true,
         text: `Grinder ${moment().format("YYYY")}년 팀별 CSM건수`,
        },
         tooltip: {
          callbacks: {
            label: function (context) {
              var label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += context.parsed.y;
              }
              return label;
            },
          },
    },
  },
   
    
     maintainAspectRatio:false
};
export const Laser_Options = {
    responsive: true,
   
    plugins: {
        legend: {
         position: 'top' ,
        },
        title: {
         display: true,
         text: `Laser ${moment().format("YYYY")}년 팀별 CSM건수`,
        },
  },
  
    
     maintainAspectRatio:false
};
export const Dicer_Options = {
    responsive: true,
   
    plugins: {
        legend: {
         position: 'top' ,
        },
        title: {
         display: true,
         text: `Dicer ${moment().format("YYYY")}년 팀별 CSM건수`,
        },
  },
  
    
     maintainAspectRatio:false
};

const GraphMainPage = () => {
  
    return (
        <GraphMainPageMainDivBox>
        <div className="chart-container">
          <div className="Chart_Sub_Container">
            <h5>GRINDER</h5>
            <Chart type="bar" options={Grinder_Options} data={Grinder_Data} width="30vw" />
          </div>
          <div className="Chart_Sub_Container">
            <h5>DICER</h5>
            <Chart type="bar" options={Dicer_Options} data={Dicer_Data} width="30vw" />
          </div>
          <div className="Chart_Sub_Container">
            <h5>LASER</h5>
            <Chart type="bar" options={Laser_Options} data={Laser_Data} width="30vw" />
          </div>
          
            </div>
        </GraphMainPageMainDivBox>
    )
}

export default GraphMainPage;