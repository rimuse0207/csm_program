import React, { useEffect } from "react";
import { styled } from "styled-components";
import { request } from "../../../../../APIs";
import { useDispatch, useSelector } from "react-redux";
import { Csm_Basic_Data_Change_Checked } from "../../../../../Models/ReduxThunk/Csm_Basic_Data_Reducer/CsmBasicDataReducer"
import moment from "moment";

export const PublishMainDivBox = styled.div`
    font-size:1em;
    button{
        font-size:0.5em;
    }
`

const Publish = ({ data }) => {
    const dispatch = useDispatch();
    const Csm_Data = useSelector(state => state.CsmBasicDataReducer.Csm_Basic_Data_State.Csm_Data);
    const Login_Info = useSelector(state => state.LoginInfoDataReducer.Infomation);

    const handleClickButton = async() => {
        try {
            const Calendar_Button_Click_Axios =await request.post(`/CE_Calendar_app_server/Calendar_Button_Click`, {
                data,
                Click_Item: "csm_publish",
                id: Login_Info.Login_id,
                name:Login_Info.Login_name,
            })

                        
            if (Calendar_Button_Click_Axios.data.dataSuccess) {
                if (data.csm_basic_data_part_number) {
                        const Update_Data_Key = Csm_Data.map((list) => list.csm_basic_data_csm_key === data.csm_basic_data_csm_key ? { ...list,csm_publish_id: Login_Info.Login_id,csm_publish_name:Login_Info.Login_name } : list );
                dispatch(Csm_Basic_Data_Change_Checked(Update_Data_Key))
                } else {
                        const Update_Data_Key = Csm_Data.map((list) => list.csm_basic_data_csm_key === data.csm_basic_data_csm_key ? { ...list,csm_publish_id: Login_Info.Login_id,csm_publish_name:Login_Info.Login_name,csm_apply_id:Login_Info.Login_id,csm_apply_name:Login_Info.Login_name,csm_entering_id:Login_Info.Login_id,csm_entering_name: Login_Info.Login_name,csm_ce_id:Login_Info.Login_id,csm_ce_name: Login_Info.Login_name} : list );
                        dispatch(Csm_Basic_Data_Change_Checked(Update_Data_Key))        
                }
            
            }

        } catch (error) {
            console.log(error);
        }
    }

    const user_Info_Check = async() => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (data.csm_publish_id) {
            user_Info_Check()
        }
    },[data])

    return (
        <PublishMainDivBox>
            {data.csm_publish_id ? <div>
                <div>{data.csm_publish_name}</div>
                <div>{ moment(data.csm_publish_write_date).format("YY-MM-DD")}</div>
            </div>:<div><button onClick={()=>handleClickButton()}>발행</button></div>}
        </PublishMainDivBox>
    )
}

export default Publish;