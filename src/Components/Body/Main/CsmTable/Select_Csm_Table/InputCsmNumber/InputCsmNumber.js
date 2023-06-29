import React, { useEffect } from "react";
import { InputHotelMainDivBox } from "../InputHotel/InputHotel";
import { useDispatch, useSelector } from "react-redux";
import { Csm_User_Input_Change_Csm_Number_Data_Redux_Thunk, Csm_User_Input_Change_Data } from "../../../../../../Models/ReduxThunk/Csm_User_Input_Reducer/CSmUserInputReducer";
import Select from "react-select"

const InputCsmNumber = () => {
    const dispatch = useDispatch();
    const Csm_User_Input_Data = useSelector((state)=>state.CsmUserInputReducer.Csm_User_Input_Data)
    
    
    
     const handleChangeData = (e) => {
      
         
         dispatch(Csm_User_Input_Change_Data({
          ...Csm_User_Input_Data,
          csm_number: {
              ...Csm_User_Input_Data.csm_number,
              csm_number_checked: {
                  value: e.value,
                  label:e.label
              }
      }}))
    };
    

     //초기 렌더링 (  CSM번호 불러오기 )
    useEffect(() => {
        dispatch(Csm_User_Input_Change_Csm_Number_Data_Redux_Thunk())
    }, []);

    return (
        <InputHotelMainDivBox>
             <div className="Select_Container">
                <div className='Priority_Container'>
                    <div className="Number_Container">
                        추가
                    </div>
                    <h4>CSM번호 선택.</h4>
                </div>
                <div className="Content_Container">
                      <Select
                            // value={SurvayState.FoodSelect}
                            onChange={e => handleChangeData(e)}
                            name="csm_number"
                            options={Csm_User_Input_Data.csm_number.csm_number_options}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                </div>
            </div>
        </InputHotelMainDivBox>   
    )
}

export default React.memo(InputCsmNumber);