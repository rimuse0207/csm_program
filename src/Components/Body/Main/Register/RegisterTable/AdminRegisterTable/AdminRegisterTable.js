import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import Finall from "../../../CsmTable/Finall/Finall";
import Pay from "../../../CsmTable/Pay/Pay";
import Custom from "../../../CsmTable/Custom/Custom";
import Ce from "../../../CsmTable/CE/Ce";
import Entering from "../../../CsmTable/Entering/Entering";
import Apply from "../../../CsmTable/Apply/Apply";
import Publish from "../../../CsmTable/Publish/Publish";
import { Csm_Register_Data_Reduce_Thunk } from "../../../../../../Models/ReduxThunk/Csm_Regi_Data_Reducer/CsmRegiDataReducer";

const NewRegisterTableMainDivBox = styled.div`
    border:1px solid black;
    background-color:#efefef;

    overflow:auto;
       .Table_Header_Container{
        position: sticky;
        top: 0px;
        background: #efefef;
        width:150%;
        
        }

        .Table_Header{
        position:sticky;
            display: flex;
            flex-direction: row;
            width: 100%;
            justify-content: flex-start;
            padding: 0px;
            border-top: 1px solid gray;
            border-bottom: 1px solid gray;
            margin:0px;
            align-items: center;
            box-shadow: 1px 1px 1px 1px lightgray;
            font-size:1.1em;
            
            .Main_Header_Table_Container{
                display:flex;
                width:50%;
                align-items:center;
                    position: sticky;
                left: 0px;
                background: #efefef;
                overflow:auto;
                li{
                    width:13%;
                    font-weight:bolder;
                    
                }
            }
            .Sub_Header_Table_Container{
                display:flex;
                width:100%;
                align-items:center;
                
                li{
                    width:13%;
                    font-weight:bolder;
                    
                }
            }

            /* li{
                width:8%;
                font-weight:bolder;
                padding:5px;
                padding-bottom:10px;
                padding-top:10px;
                font-size:1.1em;

            } */
          
        }


        .Table_Body{
            display: flex;
            flex-direction: row;
            width: 150%;
            justify-content: flex-start;
            align-items:center;
            padding: 0px;
            border:1px solid lightgray;
            box-shadow: 1px 1px 1px 1px lightgray;
            margin:0px;
            margin-top:5px;
            background-color:#fff;
             .Main_Body_Table_Container{
                display:flex;
                align-items:center;
                width:50%;
                
                .Sub_Data_Container{
                    width:65%;
                    display:flex;
                    flex-flow: column;
                    .Sub_Data_List{
                        display:flex;
                        justify-content: space-between;
                        height: 50px;
                        align-items: center;
                    }
                }
            }
            .Sub_Body_Table_Container{
                width:100%;
                display:flex;
                .Sub_Data_Container{
                    display:flex;
                    flex-flow:column;
                    width:100%;
                    .Sub_Data_List{
                        display: flex;
                        justify-content: space-between;
                        height: 50px;
                        align-items: center;
                    }
                }
            }
           
             
          
        }


`

const AdminRegisterTable = () => {
    const dispatch = useDispatch();
    const Csm_Filter_State = useSelector(state => state.CSmFilteringReducer.Csm_Filter_State);
    const Csm_Register_State = useSelector((state) => state.CsmRegiDataReducer.Csm_Register_Data_State);
    const Csm_Invoice_Select_State = useSelector((state) => state.CsmInvoiceSelectReducer.Csm_Invoice_Select_Data);

    
    useEffect(() => {
        dispatch(Csm_Register_Data_Reduce_Thunk(1, Csm_Filter_State, Csm_Invoice_Select_State))
    },[])

    return (
        <NewRegisterTableMainDivBox>

            <div className="Table_Header_Container">
                <ul className='Table_Header'>
                    <div className="Main_Header_Table_Container">
                        <li style={{width:"100px"}}>선택<br />({ })</li>
                        <li style={{width:"100px"}}>작업일자</li>
                        <li style={{width:"100px"}} >CSM 장소</li>
                        <li >등급</li>
                        <li>CSM</li>
                        <li>MODEL</li>
                        <li>제번</li>
                        <li>작업자 이름</li>
                        <li style={{width:"100px"}}>총 합계</li>
                    </div>
                    <div className="Sub_Header_Table_Container">
                        <li>작업시간</li>
                        <li>작업인원</li>
                        <li>이동거리</li>
                        <li>이동시간</li>
                        <li>숙박일수</li>
                        <li>이동거리 <br />비용</li>
                        <li>이동시간 <br />비용</li>
                        <li>숙박 비용</li>
                        <li>작업 비용</li>
                        <li>발행</li>
                        <li >Part <br/>발주요청</li>
                        <li >Part <br/>입고</li>
                        <li >Part<br/> 수령</li>
                        <li >작업완료</li>
                        <li >Invoice<br /> 발행</li>
                        <li >완료</li>
                        
                        <li>비고</li>
                    </div>
                    
                </ul>    
            </div>
            <div>
                {Csm_Register_State?.Regi_Csm_Data?.map((list) => {
                    return <ul className="Table_Body">
                        <div className="Main_Body_Table_Container">
                            <li style={{width:"100px"}}>
                                <input type="checkbox"></input>
                            </li>
                            <li style={{width:"100px"}}>
                                <div>{list.Main_Data.csm_user_input_data_start_working_date}</div>
                                <div>~</div>
                                <div>{ list.Main_Data.csm_user_input_data_end_working_date}</div>
                            </li>
                            <li style={{width:"100px"}} >
                                <div>{ list.Main_Data.csm_user_input_list_custom_name}</div>
                            </li >
                             <li className="Sub_Data_Container">
                                {list.Sub_Data.map((item) => {
                                    return <div className="Sub_Data_List">
                                        <li>{ item.csm_basic_data_grade}</li>
                                        <li>{ item.csm_basic_data_csm_number}</li>
                                        <li>{item.csm_basic_data_model_number}</li>
                                        <li>{item.csm_basic_data_binds}</li>
                                        <li>{item.name}</li>
                                    </div>
                                })}
                            </li>
                              <li style={{width:"100px"}}> 
                                    <div>{ list.Main_Data.csm_user_input_data_total_cost}</div>
                            </li>
                        </div>
                        <div className="Sub_Body_Table_Container">
                        <li className="Sub_Data_Container">
                            {list.Sub_Data.map((item) => {
                                return <div className="Sub_Data_List">
                                    <li>{ item.csm_basic_data_working_hours}</li>
                                        <li>{ item.csm_basic_data_working_count}</li>
                                        <li>{item.csm_user_input_data_working_hours}</li>
                                    <li>{item.csm_user_input_data_travel_range}</li>
                                    <li>{item.csm_user_input_data_travel_time}</li>
                                    <li>{item.csm_user_input_data_stay_days}</li>
                                    <li>{item.csm_user_input_data_travel_range_cost}</li>
                                    <li>{item.csm_user_input_data_travel_time_cost}</li>
                                    <li>{item.csm_user_input_data_stay_days_cost}</li>
                                    <li>{item.csm_user_input_data_operation_cost}</li>
                                    
                                    <li><Publish data={item}></Publish></li>
                                    <li><Apply data={item}></Apply></li>
                                    <li><Entering data={item}></Entering></li>
                                    <li><Ce data={item}></Ce></li>
                                </div>
                            })}
                        </li>
                        <li  >
                             <div>
                              <Custom data={list.Main_Data}></Custom>
                             </div>
                        </li>
                        <li  >
                             <div>
                              <Pay data={list.Main_Data}></Pay>
                             </div>
                        </li>
                         <li >
                             <div>
                              <Finall data={list.Main_Data}></Finall>
                             </div>
                        </li>
                          <li>
                            {list.Sub_Data.map((item) => {
                                return <div>
                                    { item.csm_basic_data_etc}
                                </div>
                            })}
                            </li>
                        </div>
                    </ul>
                }) }
            </div>

        </NewRegisterTableMainDivBox>
    )
}

export default AdminRegisterTable;