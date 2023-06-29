import React, { useEffect, useRef } from "react";
import { InputHotelMainDivBox } from "../InputHotel/InputHotel";
import { useDispatch, useSelector } from "react-redux";
import { Csm_User_Input_Change_Data, Csm_User_Input_Change_Model_Number_Data_Redux_Thunk } from "../../../../../../Models/ReduxThunk/Csm_User_Input_Reducer/CSmUserInputReducer";
import Select from "react-select";

const InputModelNumber = () => {
    const Select_Ref_Check = useRef();
      const dispatch = useDispatch();
    const Csm_User_Input_Data = useSelector((state) => state.CsmUserInputReducer.Csm_User_Input_Data)
      const handleChangeData = (e) => {
      
      dispatch(Csm_User_Input_Change_Data({
          ...Csm_User_Input_Data,
          model_number: {
              ...Csm_User_Input_Data.model_number,
              model_number_checked: {
                  value: e.value,
                  label:e.label
              }
      }}))
    };

     useEffect(() => {
         if (Csm_User_Input_Data.csm_number.csm_number_checked?.value) {
             
             if (Select_Ref_Check.current) {
                Select_Ref_Check.current.inputRef.offsetParent.childNodes[0].innerHTML = "";
                Select_Ref_Check.current.inputRef.offsetParent.childNodes[0].innerText = '';
             }
             
             dispatch(Csm_User_Input_Change_Model_Number_Data_Redux_Thunk(
                Csm_User_Input_Data.csm_number.csm_number_checked?.value
            ))    
        }
        
    }, [Csm_User_Input_Data.csm_number.csm_number_checked?.value]);
    return (
          <InputHotelMainDivBox>
             <div className="Select_Container">
                <div className='Priority_Container'>
                    <div className="Number_Container">
                        추가
                    </div>
                    <h4>장비모델 선택.</h4>
                </div>
                <div className="Content_Container">
                    <Select
                        ref={Select_Ref_Check}
                            // value={Csm_User_Input_Data.model_number.model_number_checked}
                            onChange={e => handleChangeData(e)}
                            name="model_number"
                            options={Csm_User_Input_Data.model_number.model_number_options}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                </div>
            </div>
        </InputHotelMainDivBox>   
    )
}

export default InputModelNumber;