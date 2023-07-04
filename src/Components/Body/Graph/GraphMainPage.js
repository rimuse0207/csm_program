import React, { useState } from 'react';
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
import { FiSettings } from "react-icons/fi";
import Modal from "react-modal";
import GoalsChangeModal from './Change_Modal/GoalsChangeModal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '85%',
        height: '85%',
        zIndex: 100,
    },
};
Modal.setAppElement('#FilterSearchModal');


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
          position:relative;
          .Setting_Icons_Container{
            position:absolute;
            top:20px;
            right:20px;
            :hover{
              cursor:pointer;
            }
          }
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

const GraphMainPage = ({ Grinder_Datas, Laser_Datas, Dicer_Datas }) => {
  const [Select_Years,setSelect_Years] = useState(moment().format("YYYY"))
  const [Goals_Change_Modal_IsOpen, setGoals_Change_Modal_IsOpen] = useState(false);
  const [Select_Teams, setSelect_Teams] = useState(null);
  const Goals_Change_Modal_Close = () => {
    setGoals_Change_Modal_IsOpen(false)
  }

  const Handle_Goals_Change = (Select_Team) => {
    try {
      console.log(Select_Team);      
      setSelect_Teams(Select_Team)
      setGoals_Change_Modal_IsOpen(true);
    } catch (error) {
      console.log(error);
    }
  }

  const Grinder_Data = {
  labels,
  datasets: [
    {
        type:'bar',
          label: 'GRINDER CSM건수',
          data: Grinder_Datas,
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
  
  const Dicer_Data = {
  labels,
  datasets: [
   
    {
      type:'bar',
      label: 'DICER CSM건수',
      data: Dicer_Datas,
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
  const Laser_Data = {
  labels,
  datasets: [
   
    {
      type:'bar',
      label: 'LASER CSM건수',
      data: Laser_Datas,
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
    return (
        <GraphMainPageMainDivBox>
          <div className="chart-container">
              <div className="Chart_Sub_Container">
                <h5>GRINDER</h5>
                <Chart type="bar" options={Grinder_Options} data={Grinder_Data} width="30vw" />
                <div className="Setting_Icons_Container" onClick={()=>Handle_Goals_Change("Grinder")}>
                  <FiSettings></FiSettings>
                </div>
              </div>
              <div className="Chart_Sub_Container">
                <h5>DICER</h5>
                <Chart type="bar" options={Dicer_Options} data={Dicer_Data} width="30vw" />
                <div className="Setting_Icons_Container" onClick={()=>Handle_Goals_Change("Dicer")}>
                  <FiSettings></FiSettings>
                </div>
              </div>
              <div className="Chart_Sub_Container">
                <h5>LASER</h5>
                <Chart type="bar" options={Laser_Options} data={Laser_Data} width="30vw" />
                <div className="Setting_Icons_Container" onClick={()=>Handle_Goals_Change("Laser")}>
                  <FiSettings></FiSettings>
                </div>
              </div>
              
            </div>
            <Modal isOpen={Goals_Change_Modal_IsOpen} style={customStyles} onRequestClose={()=>Goals_Change_Modal_Close()} >
                  <GoalsChangeModal Goals_Change_Modal_Close={()=>Goals_Change_Modal_Close()} Select_Teams={Select_Teams} Select_Years={Select_Years}></GoalsChangeModal>
            </Modal>
        
        </GraphMainPageMainDivBox>
    )
}

export default GraphMainPage;