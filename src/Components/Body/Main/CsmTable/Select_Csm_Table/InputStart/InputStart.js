import React, { useState } from 'react';
import { InputHotelMainDivBox } from '../InputHotel/InputHotel';
import { useDispatch, useSelector } from 'react-redux';
import { Csm_User_Input_Change_Data } from '../../../../../../Models/ReduxThunk/Csm_User_Input_Reducer/CSmUserInputReducer';


const InputStart = () => {
    const dispatch = useDispatch();
    const Csm_User_Input_State = useSelector((state) => state.CsmUserInputReducer.Csm_User_Input_Data);
    

  const handleOptionChange = (event) => {
         dispatch(Csm_User_Input_Change_Data({ ...Csm_User_Input_State,
            location_checked:event.target.value
        }))
    };
    return (
        <InputHotelMainDivBox>
            <div className="Select_Container">
                <div className='Priority_Container'>
                    <div className="Number_Container">
                        02
                    </div>
                    <h4>출발지 선택.</h4>
                </div>
                <div className="Content_Container">
                    <label style={{marginRight:"20px"}}>
                        <input
                        type="radio"
                        name="location_options"
                        value="Pangyo"
                        checked={Csm_User_Input_State.location_checked === "Pangyo"}
                        onChange={handleOptionChange}
                        />
                        판교
                    </label>
                    <label>
                        <input
                        type="radio"
                        name="location_options"
                        value="Asan"
                        checked={Csm_User_Input_State.location_checked === "Asan"}
                        onChange={handleOptionChange}
                        />
                        아산
                    </label>
                </div>
            </div>
        </InputHotelMainDivBox>
    )
}

export default React.memo(InputStart);