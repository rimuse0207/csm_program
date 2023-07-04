import React, { useEffect } from "react";
import {request} from "../../../../APIs/index"
import { useState } from "react";
import { styled } from "styled-components";

const GoalsChangeModalMainDivBox = styled.div`
    
    .Setting_Container{
        display:flex;
        margin-top:10px;
        margin-bottom:10px;
        width:300px;
        justify-content:space-around;
    }
`

const GoalsChangeModal = ({ Goals_Change_Modal_Close,Select_Teams ,Select_Years}) => {
    const [Goals_State, setGoals_State] = useState([]);

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
            <h2>{ Select_Years}년도 { Select_Teams} 목표치 설정</h2>
            {Goals_State.map((list) => {
                return <div className="Setting_Container">
                    <div>
                        { list.month}
                    </div>
                    <div>:</div>
                    <div>
                        {list.goals} 개
                    </div>
                </div>
            })}
        </GoalsChangeModalMainDivBox>
    )
}

export default GoalsChangeModal;