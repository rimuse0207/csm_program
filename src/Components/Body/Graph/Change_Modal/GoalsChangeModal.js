import React, { useEffect } from "react";
import {request} from "../../../../APIs/index"
import { useState } from "react";
import { styled } from "styled-components";
import { FaMinus, FaPlus } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { GrReturn } from "react-icons/gr";
import { GiSaveArrow } from "react-icons/gi";
import moment from "moment";
import { toast } from "../../ToastMessage/ToastManager";

const GoalsChangeModalMainDivBox = styled.div`
position:relative;
    .Close_Modal{
        position:absolute;
        top:-10px;
        right:0px;
        color:red;
        :hover{
            cursor: pointer;
        }
    }
    .Setting_Container{
        display: inline-grid;
        margin-top:10px;
        margin-bottom:10px;               
        min-height:50px;
        border:1px solid lightgray;
        border-radius:5px;
        padding:10px;
        margin-right:10px;
        padding-top:5px;
    
        .Count_Container{
            input{
                text-align:center;
                height:30px;
                border:1px solid lightgray;
                border-radius:10px;
            }
            button{
                width:50px;
                height:30px;
                margin-right:10px;
                margin-left:10px;
                border:none;
                background:none;

                :hover{
                    cursor: pointer;
                }
            }
        }
    }

      .btns {
        text-align: end;

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

const GoalsChangeModal = ({ Goals_Change_Modal_Close,Select_Teams ,Select_Years,Division_Goals_Graph_Data}) => {
    const [Goals_State, setGoals_State] = useState([]);




    const HandleChange_Goals = (e, data) => {
        setGoals_State(Goals_State.map((list)=>list.month === data.month ? {...list,goals:e.target.value}:list))
    }

    const HandleChange_Add_Goals = (data) => {
        setGoals_State(Goals_State.map((list)=>list.month === data.month ? {...list,goals:list.goals+1}:list))
    }
    const HandleChange_Minus_Goals = (data) => {
        setGoals_State(Goals_State.map((list)=>list.month === data.month ? {...list,goals:list.goals-1}:list))
    }


    const Goals_Submit_Data = async() => {
        const Goals_Submit_Data_Axios = await request.post('/CE_Calendar_app_server/Goals_Submit_Data', {
            Select_Teams,
            Select_Years,
            Goals_State
        })

        if (Goals_Submit_Data_Axios.data.dataSuccess) {
            
            Division_Goals_Graph_Data();
            Goals_Change_Modal_Close();
              toast.show({
                title: `목표 설정 변경`,
                content: `${Select_Teams}팀의 목표를 변경하였습니다.`,
                duration: 6000,
                successCheck: true,
             });
        }
    }


    const get_Goals_For_Graph_Data = async () => {
        try {
            
            const get_Goals_For_Graph_Data_Axios = await request.get(`/CE_Calendar_app_server/get_Goals_For_Graph_Data`, {
                params: {
                    Select_Teams,
                    Select_Years
                }
            })

            if (get_Goals_For_Graph_Data_Axios.data.dataSuccess) {
                setGoals_State(get_Goals_For_Graph_Data_Axios.data.get_Goals_For_Graph_Data_Rows);
                console.log(get_Goals_For_Graph_Data_Axios);
            }

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        get_Goals_For_Graph_Data();
    },[Select_Teams])

    return (
        <GoalsChangeModalMainDivBox>
               <div className="Close_Modal" onClick={()=>Goals_Change_Modal_Close()}>
                <TiDelete></TiDelete>
            </div>
            <h2>{ Select_Years}년도 { Select_Teams} 목표치 설정</h2>
            {Goals_State.map((list) => {
                return <div className="Setting_Container">
                    <h3>
                        { moment(list.month).format("MM")}월 :
                    </h3>
                    <div className="Count_Container">
                        <button onClick={()=>HandleChange_Minus_Goals(list)}><FaMinus></FaMinus></button>
                        <input type="number" value={list.goals} onChange={(e)=>HandleChange_Goals(e,list)}   />
                        <button onClick={()=>HandleChange_Add_Goals(list)}><FaPlus></FaPlus></button>
                    </div>
                </div>
            })}
             <div className="btns">
                    <button className="btn btn-cancel" onClick={()=>Goals_Change_Modal_Close()} >
                        <span style={{ marginRight: '10px' }}>
                            <GrReturn></GrReturn>
                        </span>

                        <span>취소</span>
                    </button>
                    <button className="btn btn-confirm" onClick={()=>Goals_Submit_Data()} >
                        <span style={{ marginRight: '10px' }}>
                            <GiSaveArrow></GiSaveArrow>
                        </span>

                        <span>저장</span>
                    </button>
                </div>
                
        </GoalsChangeModalMainDivBox>
    )
}

export default GoalsChangeModal;