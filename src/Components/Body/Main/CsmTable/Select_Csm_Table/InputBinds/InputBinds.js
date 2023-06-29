import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Csm_User_Input_Change_Bind_Data, Csm_User_Input_Change_Bind_Data_Redux_Thunk, Csm_User_Input_Change_Data } from "../../../../../../Models/ReduxThunk/Csm_User_Input_Reducer/CSmUserInputReducer";
import { styled } from "styled-components";
import { Csm_Select_Add_Data, Csm_Select_Delete_Data } from "../../../../../../Models/Csm_Select_Reducer/CsmSelectReducer";

const InputBindsMainDivBox = styled.div`
        .Binds_Container {
                border: 1px dashed black;
                padding: 10px;
                height: 600px;
                overflow-y: auto;
                border-radius: 5px;
                position: relative;
                .InputBox_Flex {
                    display: flex;
                }
                h3 {
                    position: sticky;
                    background-color: #fff;
                    top: -11px;
                    left: 10px;
                    z-index: 1;
                }
                ul {
                    display: flex;
                    flex-wrap: wrap;
                    li {
                        width: 100px;
                        margin: 10px;
                        :hover {
                            cursor: pointer;
                            color: blue;
                        }
                        label {
                            :hover {
                                cursor: pointer;
                                color: blue;
                            }
                        }
                    }
                }
            }
`

const InputBinds = () => {
     const dispatch = useDispatch();
    const Csm_User_Input_Data = useSelector((state) => state.CsmUserInputReducer.Csm_User_Input_Data);
    const Csm_Select_Data = useSelector((state) => state.CsmSelectReducer.Csm_Select_Data);
    



    const handleClicksBinds = (Select) => {
        if (!Select.select) {
            ///체크 없음
            // 데이터 추가

               //Select_Csm_Reduce_State 추가
                dispatch(Csm_Select_Add_Data(Csm_Select_Data.concat(Select.csm_Binds_Lists_Data)))            
            
                //Select_Csm_Bind_Data True 처리
                const Checked_Out_Csm_User_input_Data = Csm_User_Input_Data.bind.bind_options.map(list => list.csm_Binds_Lists_Data.csm_basic_data_csm_key === Select.csm_Binds_Lists_Data.csm_basic_data_csm_key ? { ...list, select: true } : list)
                dispatch(Csm_User_Input_Change_Bind_Data(Checked_Out_Csm_User_input_Data));



        } else {
            ///체크 있음
            // 데이터 삭제            
            
                //Select_Csm_Reduce_State 삭제
                const Delete_Csm_Select_Data = Csm_Select_Data.filter((list) => list.csm_basic_data_csm_key === Select.csm_Binds_Lists_Data.csm_basic_data_csm_key ? "" : list);
                dispatch(Csm_Select_Delete_Data(Delete_Csm_Select_Data))

                //Select_Csm_Bind_Data false 처리
                const Checked_Out_Csm_User_input_Data = Csm_User_Input_Data.bind.bind_options.map(list => list.csm_Binds_Lists_Data.csm_basic_data_csm_key === Select.csm_Binds_Lists_Data.csm_basic_data_csm_key ? { ...list, select: false } : list)
                dispatch(Csm_User_Input_Change_Bind_Data(Checked_Out_Csm_User_input_Data));


            
        }
    }



   useEffect(() => {
       if (Csm_User_Input_Data.model_number.model_number_checked.value) {
           dispatch(Csm_User_Input_Change_Bind_Data_Redux_Thunk(
               Csm_User_Input_Data.csm_number.csm_number_checked.value,
               Csm_User_Input_Data.model_number.model_number_checked.value,
               Csm_Select_Data
            ))    
        }
        
    }, [ Csm_User_Input_Data.model_number.model_number_checked.value]);

    return (
        <InputBindsMainDivBox>
        <div className="Binds_Container">
            <ul>
                            {Csm_User_Input_Data.bind.bind_options.map(list => {
                                return list.nowSelected ? (
                                    <li
                                        key={list.csm_Binds_Lists_Data.csm_basic_data_indexs}
                                        style={{ textDecorationLine: 'line-through', opacity: '0.5' }}
                                    >
                                        <div className="InputBox_Flex">
                                            <div>
                                                <input
                                                    id={`${list.csm_Binds_Lists_Data.csm_basic_data_indexs}`}
                                                    type="checkbox"
                                                    checked={false}
                                                    readOnly
                                                ></input>
                                            </div>
                                            <div>
                                                <label htmlFor={`${list.csm_Binds_Lists_Data.csm_basic_data_indexs}`}>
                                                    {list.csm_Binds_Lists_Data.csm_basic_data_binds}
                                                </label>
                                            </div>
                                        </div>
                                    </li>
                                ) : (
                                    <li
                                        onChange={() => handleClicksBinds(list)}
                                        key={list.csm_Binds_Lists_Data.csm_basic_data_indexs}
                                    >
                                        <div className="InputBox_Flex">
                                            <div>
                                                <input
                                                    id={`${list.csm_Binds_Lists_Data.csm_basic_data_indexs}`}
                                                    type="checkbox"
                                                    checked={list.select}
                                                    readOnly
                                                ></input>
                                            </div>
                                            <div>
                                                <label htmlFor={`${list.csm_Binds_Lists_Data.csm_basic_data_indexs}`}>
                                                    {list.csm_Binds_Lists_Data.csm_basic_data_binds}
                                                </label>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
            </div>
            </InputBindsMainDivBox>
    )
}

export default InputBinds;