import React, { useEffect, useState } from "react";
import { InputHotelMainDivBox } from "../InputHotel/InputHotel";
import Select from "react-select";
import { request } from "../../../../../../APIs";
import { useDispatch, useSelector } from "react-redux";
import { Csm_User_Input_Change_Custom_Data_Redux_Thunk } from "../../../../../../Models/ReduxThunk/Csm_User_Input_Reducer/CSmUserInputReducer";
import { Csm_User_Input_Change_Data } from "../../../../../../Models/ReduxThunk/Csm_User_Input_Reducer/CSmUserInputReducer";
import Modal from "react-modal";
import CustomModal from "./CustomModal/CustomModal";

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
const InputCustom = () => {
    const dispatch = useDispatch();
    const [NotCustomModalIsOpen, setNotCustomModalIsOpen] = useState(false);
    const Csm_User_Input_Data = useSelector((state) => state.CsmUserInputReducer.Csm_User_Input_Data)
    const LoginInfo = useSelector(state=>state.LoginInfoDataReducer.Infomation)
    
    

  const handleChangeData = (e) => {
      
      dispatch(Csm_User_Input_Change_Data({
          ...Csm_User_Input_Data,
          custom: {
              ...Csm_User_Input_Data.custom,
              custom_checked:e
      }}))
    };
    
    //초기 렌더링 ( 고객사명 불러오기 )
    useEffect(() => {
        dispatch(Csm_User_Input_Change_Custom_Data_Redux_Thunk(Csm_User_Input_Data.location_checked === "Pangyo"?"판교":"아산"))
    }, []);


    return (
        <InputHotelMainDivBox>
             <div className="Select_Container">
                <div className='Priority_Container'>
                    <div className="Number_Container">
                        03
                    </div>
                    <h4>고객사 선택.</h4>
                    <div>
                        <label htmlFor="etc">
                        <input type="checkbox" id="etc" checked={NotCustomModalIsOpen} onChange={()=>setNotCustomModalIsOpen(!NotCustomModalIsOpen)}></input>
                        선택 목록에 없을 시 클릭</label>
                    </div>
                    
                </div>
                <div className="Content_Container">
                    <Select
                            
                            onChange={e => handleChangeData(e)}
                            name="custom"
                            options={Csm_User_Input_Data.custom.custom_options}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                </div>
            </div>
              <Modal isOpen={NotCustomModalIsOpen} style={customStyles} onRequestClose={()=>setNotCustomModalIsOpen(false)} >
                <CustomModal setNotCustomModalIsOpen={()=>setNotCustomModalIsOpen(false)}></CustomModal>
            </Modal>
        </InputHotelMainDivBox>   
    )
}
export default InputCustom;