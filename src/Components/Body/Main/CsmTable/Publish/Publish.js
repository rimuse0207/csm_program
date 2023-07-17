import React, { useEffect } from "react";
import { styled } from "styled-components";
import { request } from "../../../../../APIs";
import { useDispatch, useSelector } from "react-redux";
import { Csm_Basic_Data_Change_Checked } from "../../../../../Models/ReduxThunk/Csm_Basic_Data_Reducer/CsmBasicDataReducer"
import moment from "moment";
import { toast } from "../../../ToastMessage/ToastManager";
import { FaHourglassEnd } from "react-icons/fa";

export const PublishMainDivBox = styled.div`
    font-size:1em;
    line-height: 20px;
    button{
        font-size:0.5em;
    }
    .Button_Container{
        border:1px solid lightgray;
        border-radius:10px;
        font-weight:bolder;
        box-shadow:1px 1px 1px 1px lightgray;
        
        :hover{
            cursor: pointer;
            
        }
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
                        const Update_Data_Key = Csm_Data.map((list) => list.csm_basic_data_csm_key === data.csm_basic_data_csm_key ? { ...list,csm_publish_id: Login_Info.Login_id,csm_publish_name:Login_Info.Login_name,csm_publish_csm_key:data.csm_basic_data_csm_key,csm_publish_write_date:moment().format("YYYY-MM-DD") } : list );
                dispatch(Csm_Basic_Data_Change_Checked(Update_Data_Key))
                } else {
                        const Update_Data_Key = Csm_Data.map((list) => list.csm_basic_data_csm_key === data.csm_basic_data_csm_key ? { ...list,csm_publish_id: Login_Info.Login_id,csm_publish_name:Login_Info.Login_name,csm_publish_csm_key:data.csm_basic_data_csm_key,csm_publish_write_date:moment().format("YYYY-MM-DD"),csm_apply_id:"-",csm_apply_name:"-",csm_apply_csm_key:data.csm_basic_data_csm_key,csm_entering_id:"-",csm_entering_name: "-",csm_apply_csm_key:data.csm_basic_data_csm_key,csm_ce_id:"-",csm_ce_name: "-",csm_ce_csm_key:data.csm_basic_data_csm_key} : list );
                        dispatch(Csm_Basic_Data_Change_Checked(Update_Data_Key))        
                }
            
            } else {
                 toast.show({
                    title: '발행처리 ERROR',
                    content: `IT팀에 문의 바랍니다.`,
                    duration: 6000,
                    successCheck: false,
                    })
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
            </div> : <div onClick={() => handleClickButton()} className="Button_Container">
                    <div><FaHourglassEnd></FaHourglassEnd></div>
                <div><div >발행</div></div>
            </div>}
        </PublishMainDivBox>
    )
}

export default Publish;