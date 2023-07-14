import React from "react";
import { styled } from "styled-components";
import { InputHotelMainDivBox } from "../InputHotel/InputHotel";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Csm_User_Input_Change_Data } from "../../../../../../Models/ReduxThunk/Csm_User_Input_Reducer/CSmUserInputReducer";
const RoundTripMainDivBox = styled.div`
.Count_Container{
            span{
                text-align:center;
                height:30px;
                border:1px solid lightgray;
                border-radius:10px;
                width:100px;
                display:inline-block;
                font-size:1.2em;
                font-weight:bolder;
                line-height:25px;
            }
            button{
                width:50px;
                height:30px;
                margin-right:10px;
                margin-left:10px;
                border:none;
                background:none;

                :hover{
                    cursor: pointer;
                }
            }
        }
`

const RoundTrip = () => {
    const dispatch = useDispatch();
    const Csm_User_Input_State = useSelector((state) => state.CsmUserInputReducer.Csm_User_Input_Data);
    

    const Handle_Change_Minus_Trip_Count = () => {
        if (Csm_User_Input_State.Round_Trip_Count - 1 === 0) {
            return;
        } else {
             dispatch(Csm_User_Input_Change_Data({ ...Csm_User_Input_State,
            Round_Trip_Count:Csm_User_Input_State.Round_Trip_Count -1
        }))    
        }
        
    }
    const Handle_Change_Plus_Trip_Count = () => {
         dispatch(Csm_User_Input_Change_Data({ ...Csm_User_Input_State,
            Round_Trip_Count:Csm_User_Input_State.Round_Trip_Count +1
        }))
    }

    return (
        <RoundTripMainDivBox>
            <InputHotelMainDivBox>
                <div className="Select_Container">
                <div className='Priority_Container'>
                    <div className="Number_Container">
                        04
                    </div>
                    <h4>고객사까지 왕복 이동 횟수</h4>
                </div>
                <div className="Content_Container">
                    <div className="Setting_Container">
                        <div className="Count_Container">
                            <button onClick={()=>{Handle_Change_Minus_Trip_Count()}}><FaMinus></FaMinus></button>
                                <span className="Round_Container">{Csm_User_Input_State.Round_Trip_Count} 회</span>
                            <button onClick={()=>{Handle_Change_Plus_Trip_Count()}}><FaPlus></FaPlus></button>
                        </div>
                    </div>
                </div>
            </div>
            </InputHotelMainDivBox>
        </RoundTripMainDivBox>
    )
}
export default RoundTrip;