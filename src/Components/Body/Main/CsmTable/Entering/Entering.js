import React, { useEffect } from "react";
import { PublishMainDivBox } from "../Publish/Publish";
import { request } from "../../../../../APIs";
import { useDispatch, useSelector } from "react-redux";
import { Csm_Basic_Data_Change_Checked } from "../../../../../Models/ReduxThunk/Csm_Basic_Data_Reducer/CsmBasicDataReducer"
import moment from "moment";
import { toast } from "../../../ToastMessage/ToastManager";
import { BiMailSend } from "react-icons/bi";

const Entering = ({ data }) => {
   const dispatch = useDispatch();
    const Csm_Data = useSelector(state => state.CsmBasicDataReducer.Csm_Basic_Data_State.Csm_Data);
const Login_Info = useSelector(state => state.LoginInfoDataReducer.Infomation);

    const handleClickButton = async() => {
        try {
            const Calendar_Button_Click_Axios =await request.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/Calendar_Button_Click`, {
                data,
                Click_Item: "csm_entering",
                id: Login_Info.Login_id,
                name:Login_Info.Login_name
            })
                        
            if (Calendar_Button_Click_Axios.data.dataSuccess) {
                
                const Update_Data_Key = Csm_Data.map((list) => list.csm_basic_data_csm_key === data.csm_basic_data_csm_key ? { ...list,csm_entering_id:Login_Info.Login_id,csm_entering_name:Login_Info.Login_name,csm_entering_csm_key:data.csm_basic_data_csm_key,csm_entering_write_date:moment().format("YYYY-MM-DD") } : list );
                dispatch(Csm_Basic_Data_Change_Checked(Update_Data_Key))
            }else {
                toast.show({
                    title: 'Part 입고 처리 ERROR',
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
        if (data.csm_entering_id) {
            user_Info_Check()
        }
    },[data])

    return (
        <PublishMainDivBox>
            {data.csm_apply_id && data.csm_publish_id ? <div>{data.csm_entering_id ? <div><div>{data.csm_entering_name}</div>
                { data.csm_entering_name ==='-'?<></>:<div>{moment(data.csm_entering_write_date).format("YY-MM-DD")}</div>}
            </div> : <div>
                {Login_Info.Login_Entering_Access ?
                        <div onClick={() => handleClickButton()} className="Button_Container">
                            <div  style={{fontSize:'1.5em'}}>
                                <BiMailSend></BiMailSend>
                                </div>
                        <div>Part 입고</div>
                    </div> : <></>}</div>}</div> : <div></div>}
            
        </PublishMainDivBox>
    )
}

export default Entering;