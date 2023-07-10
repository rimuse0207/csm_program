import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Navigation from '../../../Nav/Navigation';
import { useParams } from 'react-router-dom';
import { request } from '../../../../../APIs';
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const DistanceUpdatePageMainDivBox = styled.div`
    
    font-size:0.8em;

    .Main_container{
        padding:30px;
    }

    .Sub_container{
        display:flex;
        align-items:center;
        margin-top:10px;
        margin-bottom:10px;
        .Content_Input{
            input{
                border:1px solid lightgray;
                height:40px;
                border-radius:5px;
                padding-left:10px;
                margin-left:20px;
                min-width:300px;
            }
        }
    }


      .btns {
        margin-top:20px;
        margin-bottom:20px;
        text-align: end;
        margin-right:30px;
        font-size: 1em;
        .btn {
            display: inline-block;
            margin-right: 2px;
            padding: 10px 20px;
            background: none;
            border: 1px solid #c0c0c0;
            border-radius: 2px;
            color: #666;
            font-size: 1em;
            outline: none;
            transition: all 100ms ease-out;
            &:hover,
            &:focus {
                transform: translateY(-3px);
                cursor: pointer;
            }
            &-confirm {
                border: 1px solid #2962ff;
                background: #2962ff;
                color: #fff;
            }
        }
    }

`

const DistanceUpdatePage = () => {
    const history = useHistory();
    const { start_location, custommer_name, custommer_area } = useParams();
    const [Distance_List_Data, setDistance_List_Data] = useState({
        csm_distance_lists_custommer: "",
        csm_distance_lists_area: "",
        csm_distance_lists_location: "",
        csm_distance_lists_distance: 0,
        csm_distance_lists_distance_time: 0,
        
    });


    const Handle_Change_Request = async () => {
        try {
            
            const Handle_Change_Request_Axios = await request.post('/CE_Calendar_app_server/Handle_Change_Request', {
                Distance_List_Data,
                start_location, custommer_name, custommer_area 
            })

            if (Handle_Change_Request_Axios.data.dataSuccess) {
                history.goBack();
            }

        } catch (error) {
            console.log(error);
        }
    }


    const Custom_Location_Data = async () => {

        const Custom_Location_Data_Axios = await request.get(`/CE_Calendar_app_server/Custom_Location_Data`, {
            params: {
                start_location,
                custommer_name,
                custommer_area
                }
        })
     
        if (Custom_Location_Data_Axios.data.dataSuccess) {
            console.log(Custom_Location_Data_Axios);
            setDistance_List_Data({
                csm_distance_lists_custommer: Custom_Location_Data_Axios.data.Show_Distance_list_Data_Rows.csm_distance_lists_custommer,
                csm_distance_lists_area:Custom_Location_Data_Axios.data.Show_Distance_list_Data_Rows.csm_distance_lists_area,
                csm_distance_lists_location:Custom_Location_Data_Axios.data.Show_Distance_list_Data_Rows.csm_distance_lists_location,
                csm_distance_lists_distance:Custom_Location_Data_Axios.data.Show_Distance_list_Data_Rows.csm_distance_lists_distance,
                csm_distance_lists_distance_time:Custom_Location_Data_Axios.data.Show_Distance_list_Data_Rows.csm_distance_lists_distance_time,
            })
        }
        
    }


    useEffect(() => {
        Custom_Location_Data();
    },[])

    return (
        <DistanceUpdatePageMainDivBox>
            <Navigation></Navigation>
            <div className="Main_container">
                  <div className="Sub_container">
                    <div>
                        <h3>출발 지역 : </h3>
                    </div>
                    <div className="Content_Input">
                        <input type="text" value={ Distance_List_Data?.csm_distance_lists_location} onChange={(e)=>{setDistance_List_Data({...Distance_List_Data,csm_distance_lists_location:e.target.value})}} ></input>
                    </div>
                    
                </div>
                <div  className="Sub_container">
                    <div>
                        <h3>고객사 명 : </h3>
                    </div>
                    <div className="Content_Input">
                        <input type="text" value={Distance_List_Data?.csm_distance_lists_custommer} onChange={(e)=>{setDistance_List_Data({...Distance_List_Data,csm_distance_lists_custommer:e.target.value})}} ></input>
                    </div>
                </div>
                <div className="Sub_container">
                    <div>
                        <h3>고객사 지역 : </h3>
                    </div>
                    <div className="Content_Input">
                        <input type="text" value={Distance_List_Data?.csm_distance_lists_area} onChange={(e)=>{setDistance_List_Data({...Distance_List_Data,csm_distance_lists_area:e.target.value})}} ></input>
                    </div>
                </div>
                <div className="Sub_container">
                    <div>
                        <h3>이동거리 : </h3>
                    </div>
                    <div className="Content_Input">
                        <input type="number" value={Distance_List_Data?.csm_distance_lists_distance} onChange={(e)=>{setDistance_List_Data({...Distance_List_Data,csm_distance_lists_distance:e.target.value})}}></input>
                    </div>
                </div>
                <div className="Sub_container">
                    <div>
                        <h3>이동시간 : </h3>
                    </div>
                    <div className="Content_Input">
                        <input type="number" value={Distance_List_Data?.csm_distance_lists_distance_time} onChange={(e)=>{setDistance_List_Data({...Distance_List_Data,csm_distance_lists_distance_time:e.target.value})}}></input>
                    </div>
                </div>
               
            </div>

             <div className="btns">
                    <button className="btn btn-cancel" onClick={()=>{  history.goBack()}} >
                        <span style={{ marginRight: '10px' }}>
                            <AiOutlineClose></AiOutlineClose>
                        </span>

                        <span>취소</span>
                    </button>
                    <button className="btn btn-confirm" onClick={()=>{Handle_Change_Request()}} >
                        <span style={{ marginRight: '10px' }}>
                            <AiOutlineCheck></AiOutlineCheck>
                        </span>

                        <span>변경</span>
                    </button>
                </div>
        </DistanceUpdatePageMainDivBox>
    )
}

export default DistanceUpdatePage;