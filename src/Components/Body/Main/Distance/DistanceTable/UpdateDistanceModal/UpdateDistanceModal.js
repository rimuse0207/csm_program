import React, { useState } from 'react';
import { styled } from 'styled-components';
import { ImArrowRight } from "react-icons/im";
import { AiOutlineClose ,AiOutlineCheck} from "react-icons/ai";
import { request } from '../../../../../../APIs';
import { useSelector } from 'react-redux';
const UpdateDistanceModalMainDivBox = styled.div`

.Modal_Container{
    display:flex;
    align-items:center;
    justify-content:space-around;
}


.Request_Main_Container{
        border:1px solid gray;
        min-width:400px;
        border-radius:10px;
        margin-right:30px;
        position:relative;
        .Request_Sub_Container{
            font-size:1em;
            display:flex;
            align-items:center;
            border-bottom:1px solid lightgray;
            padding:10px;
            flex-flow:wrap;
            .Request_Text{
                
                margin-left:10px;
                padding:10px;
            }
             .Update_Mode_Container{
                margin-left:10px;
                input{
                      height: 30px;
                    border: 1px solid darkgray;
                    padding-left: 10px;
                    border-radius: 5px;
                }
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

const UpdateDistanceModal = ({ Select_Distance_Data, ModalClose_Func,GetDistancData }) => {
    const [Change_Data, setChange_Data] = useState(Select_Distance_Data);
    const Login_Info = useSelector((state) => state.LoginInfoDataReducer.Infomation);

    const Handle_Change_All_Distance_Data = async() => {
        try {
            
            const Handle_Change_All_Distance_Data_Axios = await request.post('/CE_Calendar_app_server/Handle_Change_All_Distance_Data', {
                Change_Data,
                Select_Distance_Data,
                ID:Login_Info.Login_id
            })


            if (Handle_Change_All_Distance_Data_Axios.data.dataSuccess) {
                GetDistancData();
                ModalClose_Func();
            }

        } catch (error) {
            console.log(error);            
        }
    }

    return (
        <UpdateDistanceModalMainDivBox>
            {Select_Distance_Data ? <div className="Modal_Container">
                <div>
                    <h4>변경전</h4>
                <div className="Request_Main_Container">
                <div className="Request_Sub_Container">
                    <div>
                        <h4>Area : </h4>
                            </div>
                           <div className="Request_Text">
                        { Select_Distance_Data.PL_area ? Select_Distance_Data.PL_area: Select_Distance_Data.AL_area }
                    </div>
                </div>
                <div className="Request_Sub_Container">
                    <div>
                        <h4>Custommer : </h4>
                            </div>
                           <div className="Request_Text">
                        { Select_Distance_Data.PL_custommer ? Select_Distance_Data.PL_custommer: Select_Distance_Data.AL_custommer }
                    </div>
                </div>
                  <div className="Request_Sub_Container">
                    <div>
                        <h4>Pangyo : </h4>
                            </div>
                           <div className="Request_Text">
                        { Select_Distance_Data.PL_distance ? Select_Distance_Data.PL_distance: 0 }
                    </div>
                </div>
                  <div className="Request_Sub_Container">
                    <div>
                        <h4>이동Time : </h4>
                            </div>
                           <div className="Request_Text">
                        { Select_Distance_Data.PL_time ? Select_Distance_Data.PL_time: 0 }
                    </div>
                </div>
                  <div className="Request_Sub_Container">
                    <div>
                        <h4>Asan : </h4>
                            </div>
                           <div className="Request_Text">
                        { Select_Distance_Data.AL_distance ? Select_Distance_Data.AL_distance: 0 }
                    </div>
                </div>
                  <div className="Request_Sub_Container">
                    <div>
                        <h4>이동Time : </h4>
                            </div>
                           <div className="Request_Text">
                        { Select_Distance_Data.AL_time ? Select_Distance_Data.AL_time: 0 }
                    </div>
                </div>
                        
                    
                        
                    </div>
                    </div>
                
                <div style={{fontSize:"2.5em"}}><ImArrowRight></ImArrowRight></div>

                <div>
                    <h4>변경 후</h4>
                
                <div className="Request_Main_Container">
                <div className="Request_Sub_Container">
                    <div>
                        <h4>Area : </h4>
                            </div>
                        <div className="Update_Mode_Container">
                                <input value={Change_Data.PL_area ? Change_Data.PL_area : Change_Data.AL_area} onChange={(e) => setChange_Data( {...Change_Data,
                                    PL_area: e.target.value,
                                    AL_area:e.target.value
                            })}>
                            </input>
                        
                    </div>
                </div>
                <div className="Request_Sub_Container">
                    <div>
                        <h4>Custommer : </h4>
                            </div>
                        <div className="Update_Mode_Container">
                              <input value={Change_Data.PL_custommer ? Change_Data.PL_custommer: Change_Data.AL_custommer}  onChange={(e) => setChange_Data( {...Change_Data,
                                    PL_custommer: e.target.value,
                                    AL_custommer:e.target.value
                            })}>
                            </input>
                    </div>
                </div>
                  <div className="Request_Sub_Container">
                    <div>
                        <h4>Pangyo : </h4>
                            </div>
                        <div className="Update_Mode_Container">
                              <input type='number' value={Change_Data.PL_distance ? Change_Data.PL_distance: 0} onChange={(e) => setChange_Data( {...Change_Data,
                                    PL_distance: e.target.value,
                            })}>
                            </input>
                        
                    </div>
                </div>
                  <div className="Request_Sub_Container">
                    <div>
                        <h4>이동Time : </h4>
                            </div>
                        <div className="Update_Mode_Container">
                               <input type='number' value={Change_Data.PL_time ? Change_Data.PL_time: 0} onChange={(e) => setChange_Data( {...Change_Data,
                                    PL_time: e.target.value,
                            })}>
                            </input>
                    </div>
                </div>
                  <div className="Request_Sub_Container">
                    <div>
                        <h4>Asan : </h4>
                            </div>
                        <div className="Update_Mode_Container">
                             <input type='number' value={Change_Data.AL_distance ? Change_Data.AL_distance: 0} onChange={(e) => setChange_Data( {...Change_Data,
                                    AL_distance: e.target.value,
                            })}>
                            </input>
                        
                    </div>
                </div>
                  <div className="Request_Sub_Container">
                    <div>
                        <h4>이동Time : </h4>
                            </div>
                        <div className="Update_Mode_Container">
                               <input type='number' value={Change_Data.AL_time ? Change_Data.AL_time: 0} onChange={(e) => setChange_Data( {...Change_Data,
                                    AL_time: e.target.value,
                            })}>
                            </input>
                        
                    </div>
                </div>
                        
                      
                        
            </div>
                </div>
            </div>:<></>}
             <div className="btns">
                            
                    <button className="btn btn-cancel" onClick={()=>{ModalClose_Func()}} >
                        <span style={{ marginRight: '10px' }}>
                            <AiOutlineClose></AiOutlineClose>
                        </span>

                        <span>취소</span>
                    </button>
                    <button className="btn btn-confirm" onClick={()=>{Handle_Change_All_Distance_Data()}} >
                        <span style={{ marginRight: '10px' }}>
                            <AiOutlineCheck></AiOutlineCheck>
                        </span>

                        <span>변경</span>
                    </button>
                </div>
              
        </UpdateDistanceModalMainDivBox>
    )
}
export default UpdateDistanceModal;