import React, { useEffect } from "react";
import { request } from "../../../../../APIs";
import { PublishMainDivBox } from "../Publish/Publish";
import { useDispatch, useSelector } from "react-redux";
import { Csm_Basic_Data_Change_Checked } from "../../../../../Models/ReduxThunk/Csm_Basic_Data_Reducer/CsmBasicDataReducer"
import moment from 'moment';
import { toast } from "../../../ToastMessage/ToastManager";


const Ce = ({ data }) => {
    const dispatch = useDispatch();
    const Csm_Data = useSelector(state => state.CsmBasicDataReducer.Csm_Basic_Data_State.Csm_Data);
    const Login_Info = useSelector(state => state.LoginInfoDataReducer.Infomation);

      const handleClickButton = async() => {
        try {
            const Calendar_Button_Click_Axios =await request.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/Calendar_Button_Click`, {
                data,
                Click_Item: "csm_ce",
                id: Login_Info.Login_id,
                name:Login_Info.Login_name
            })
                        
            if (Calendar_Button_Click_Axios.data.dataSuccess) {
                
                const Update_Data_Key = Csm_Data.map((list) => list.csm_basic_data_csm_key === data.csm_basic_data_csm_key ? { ...list,csm_ce_id: Login_Info.Login_id,csm_ce_name:Login_Info.Login_name,csm_ce_csm_key:data.csm_basic_data_csm_key,csm_ce_write_date:moment().format("YYYY-MM-DD") } : list );
                dispatch(Csm_Basic_Data_Change_Checked(Update_Data_Key))
            }else {
                toast.show({
                    title: 'Part 수령 처리 ERROR',
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
        if (data.csm_ce_id) {
            user_Info_Check()
        }
    },[data])

    return (
        <PublishMainDivBox>
            { data.csm_publish_id && data.csm_apply_id && data.csm_entering_id ?<div>{data.csm_ce_id ? <div><div>{data.csm_ce_name}</div>
                { data.csm_ce_name === "-"?<div></div>:<div>{moment(data.csm_ce_write_date).format("YY-MM-DD")}</div>}
            </div> : <div><button onClick={() => handleClickButton()}>Part 수령</button></div>}</div> : <div></div>}
            
        </PublishMainDivBox>
    )
}

export default Ce;