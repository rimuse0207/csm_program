import React, { useEffect } from "react";
import { PublishMainDivBox } from "../Publish/Publish";
import { request } from "../../../../../APIs";
import { useDispatch, useSelector } from "react-redux";
import { Csm_Basic_Data_Change_Checked } from "../../../../../Models/ReduxThunk/Csm_Basic_Data_Reducer/CsmBasicDataReducer"
import moment from 'moment';

const Finall = ({ data }) => {
    const dispatch = useDispatch();
    const Csm_Data = useSelector(state => state.CsmBasicDataReducer.Csm_Basic_Data_State.Csm_Data);
    const Login_Info = useSelector(state => state.LoginInfoDataReducer.Infomation);
    //  const handleClickButton = async() => {
    //     try {
    //         const Calendar_Button_Click_Axios =await request.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/Calendar_Button_Click`, {
    //             data,
    //             Click_Item: "csm_finall",
    //             id: Login_Info.Login_id,
    //             name:Login_Info.Login_name
    //         })
                        
    //         if (Calendar_Button_Click_Axios.data.dataSuccess) {
                
    //             const Update_Data_Key = Csm_Data.map((list) => list.csm_basic_data_csm_key === data.csm_basic_data_csm_key ? { ...list, csm_finall_id: Login_Info.Login_id, csm_finall_name:Login_Info.Login_name} : list );
    //             dispatch(Csm_Basic_Data_Change_Checked(Update_Data_Key))
    //         }

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // const user_Info_Check = async() => {
    //     try {
            
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     if (data.csm_finall_id) {
    //         user_Info_Check()
    //     }
    // },[data])

    return (
        <PublishMainDivBox>
            {data.csm_publish_id && data.csm_apply_id && data.csm_entering_id && data.csm_ce_id && data.csm_custom_id && data.csm_pay_id ? <div>{data.csm_finall_id ? <div> {data.csm_invoice_list_erp_document_number} </div> : <div></div>}</div>:<div></div> }
            
        </PublishMainDivBox>
    )
}

export default Finall;