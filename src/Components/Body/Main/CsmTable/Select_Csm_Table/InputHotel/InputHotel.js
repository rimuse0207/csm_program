import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';
import {Csm_User_Input_Change_Data} from "../../../../../../Models/ReduxThunk/Csm_User_Input_Reducer/CSmUserInputReducer"
import { toast } from '../../../../ToastMessage/ToastManager';

export const InputHotelMainDivBox = styled.div`

margin-left:20px;
margin-bottom:30px;
.Priority_Container{
    display:flex;
    align-items:center;
    margin-bottom:15px;
        .Number_Container{
        width:30px;
        height:30px;
        line-height:30px;
        border-radius:10px;
        text-align:center;
        font-weight:bolder;
        color:#fff;
        background-color:#368;
        margin-right:20px;
    }
    h4{
            margin-right:50px;
            margin-top:0px;
            margin-bottom:0px;
    }    
}


    .Select_Container{
    
        padding:10px;
        background-color:#fff;
        .Content_Container{
            padding-left:40px;
        }
    }

    .Night_Days_Select_Container{
        display:flex;
        width:300px;
        justify-content:space-around;
        margin-top:20px;
        margin-bottom:5px;
        align-items:center;
        button{
            width:50px;
            height:30px;
            font-size:1.2em;
            :hover{
                cursor: pointer;
            }
        }
    }
`

const InputHotel = () => {
    const dispatch = useDispatch();
    const Csm_User_Input_State = useSelector((state) => state.CsmUserInputReducer.Csm_User_Input_Data);

  const handleOptionChange = (event) => {
        
      dispatch(Csm_User_Input_Change_Data({ ...Csm_User_Input_State,
            lodgment_checked:event.target.value
        }))
    };
    

    const handleMinusDay = (days) => {
        if (days - 1 === 0) {
            toast.show({
                title: '숙박일은 1일 이상입니다.',
                content: '다시 확인 바랍니다.',
                duration: 6000,
                DataSuccess: false,
            });
            return;
        } else {
               
        dispatch(Csm_User_Input_Change_Data({ ...Csm_User_Input_State,
                lodgment_day_count:days-1
            }))
        }
    }

    const handlePlusDay = (days) => {
          dispatch(Csm_User_Input_Change_Data({ ...Csm_User_Input_State,
                lodgment_day_count:days+1
            }))
    }
    
    return (
        <InputHotelMainDivBox>
            <div className="Select_Container">
                <div className='Priority_Container'>
                    <div className="Number_Container">
                        01
                    </div>
                    <h4>숙박 여부.</h4>
                </div>
                <div className="Content_Container">
                    <label style={{marginRight:"20px"}}>
                        <input
                        type="radio"
                        name="options"
                        value="one_day"
                        checked={Csm_User_Input_State.lodgment_checked === "one_day"}
                        onChange={handleOptionChange}
                        />
                        당일
                    </label>
                    <label>
                        <input
                        type="radio"
                        name="options"
                        value="night_days"
                        checked={Csm_User_Input_State.lodgment_checked === "night_days"}
                        onChange={handleOptionChange}
                        />
                        숙박
                    </label>
                </div>
                <div>
                {Csm_User_Input_State.lodgment_checked === 'night_days' ? <div className="Night_Days_Select_Container">
                        <div>
                            <button onClick={()=>handleMinusDay(Csm_User_Input_State.lodgment_day_count)}>-</button>
                        </div>
                        <div>
                            <span>{Csm_User_Input_State.lodgment_day_count}</span>
                            <span>일</span>
                        </div>
                        <div>
                            <button onClick={()=>handlePlusDay(Csm_User_Input_State.lodgment_day_count)}>+</button>
                        </div>
                </div> : <div>

                </div>}
            </div>
                </div>
            
            
        </InputHotelMainDivBox>
    )
}

export default React.memo(InputHotel)