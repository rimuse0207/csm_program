import React from "react";
import { styled } from "styled-components";
import { InputHotelMainDivBox } from "../InputHotel/InputHotel";
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from "react-redux";
import { Csm_User_Input_Change_Data } from "../../../../../../Models/ReduxThunk/Csm_User_Input_Reducer/CSmUserInputReducer";


const InputDateMainDivBox = styled.div`
    .Content_Container{
        display:flex;
        justify-content:start;
        align-items:center;
        
        .react-datepicker-wrapper{
            border: 1px solid lightgray;
            height: 30px;
            .react-datepicker__input-container {
                width:100%;
                height:100%;
                
                input{
                    border:none;
                    height:100%;
                    padding:10px;
                }
            }
        }
            

    }
`

const InputDate = () => {
     const dispatch = useDispatch();
    const Csm_User_Input_State = useSelector((state) => state.CsmUserInputReducer.Csm_User_Input_Data);

    const handleChange = (event, Select) => {
        console.log(event);
      if (Select === 'start_Date') {
        dispatch(Csm_User_Input_Change_Data({ ...Csm_User_Input_State,
            start_Date:event
        }))      
      } else {
          dispatch(Csm_User_Input_Change_Data({ ...Csm_User_Input_State,
            end_Date:event
        }))      
        }
      
    };
    return (
        <InputDateMainDivBox>
            <InputHotelMainDivBox>
            <div className="Select_Container">
                <div className='Priority_Container'>
                    <div className="Number_Container">
                        01
                    </div>
                    <h4>작업 일자.</h4>
                </div>
                <div className="Content_Container">
                        <div>
                            <div style={{marginBottom:"5px"}}>시작일자</div>
                            <div>
                                <DatePicker
                                                    locale={ko}
                                                    dateFormat={"yyyy-MM-dd"}
                                                    selected={Csm_User_Input_State.start_Date}
                                                    maxDate={new Date()}
                                                    onChange={(e)=>handleChange(e,"start_Date")}
                                                ></DatePicker>
                            </div>
                        </div>
                        <div style={{ marginLeft: "20px",marginRight:"20px",fontSize:"2em"}}>
                            ~
                        </div>
                        <div>
                            <div style={{marginBottom:"5px"}}>종료일자</div>
                            <div>
                                <DatePicker
                                                    locale={ko}
                                                    dateFormat={"yyyy-MM-dd"}
                                    selected={Csm_User_Input_State.end_Date}
                                    maxDate={new Date()}
                                                    minDate={Csm_User_Input_State.start_Date}
                                                    onChange={(e)=>handleChange(e,"end_Date")}
                                                ></DatePicker>
                            </div>
                        </div>
                </div>
           
            </div>
            
            
        </InputHotelMainDivBox>
        </InputDateMainDivBox>
    )
}

export default InputDate;