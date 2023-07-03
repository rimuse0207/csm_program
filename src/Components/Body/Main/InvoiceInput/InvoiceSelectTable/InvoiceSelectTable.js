import React from "react";
import { Table, TableData, TableHeader, TableRow } from "../../CsmTable/CsmTable";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { styled } from "styled-components";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Csm_Invoice_Select_Delete_Data } from "../../../../../Models/Csm_Select_Reducer/CsmInvoiceSelectReducer";
import { Csm_Register_Data_Change_Checked } from "../../../../../Models/ReduxThunk/Csm_Regi_Data_Reducer/CsmRegiDataReducer";

const InvoiceSelectTableMainDivBox = styled.div`
    max-width:100%;
    max-height:50vh;
    overflow:auto;
    background-color:#fff;
`

const InvoiceSelectTable = () => {
    const dispatch = useDispatch();
    const Csm_Invoice_Select_State = useSelector((state) => state.CsmInvoiceSelectReducer.Csm_Invoice_Select_Data);
    const Login_Info = useSelector(state => state.LoginInfoDataReducer.Infomation);
    const Csm_Register_State = useSelector((state) => state.CsmRegiDataReducer.Csm_Register_Data_State);
    let LengthCount = Login_Info.Login_Admin_Access ? 1 : 0;


    const HandleSelectDataDelete = (data) => {
        const Delete_Csm_Invoice_Select_State = Csm_Invoice_Select_State.filter((list) => list.Main_Data.csm_basic_data_csm_key === data.Main_Data.csm_basic_data_csm_key ? "" : list);
             const Change_Checked_False = Csm_Register_State?.Regi_Csm_Data.map((list) => list.Main_Data.csm_basic_data_csm_key === data.Main_Data.csm_basic_data_csm_key ? {
            ...list,
            Main_Data:{
                ...list.Main_Data,
                checked:false
            }
        } : list)
        dispatch(Csm_Invoice_Select_Delete_Data(Delete_Csm_Invoice_Select_State));
        dispatch(Csm_Register_Data_Change_Checked(Change_Checked_False));
    }

    return (
        <InvoiceSelectTableMainDivBox>
            <Table style={Login_Info.Login_Admin_Access?{width:"150%",maxWidth:"150%"}:{width:"100%",maxWidth:"100%"}}>
                    <thead>
                    <TableRow>
                                    
                                    <TableHeader >NO.</TableHeader>
                                    <TableHeader >등록 날짜</TableHeader>
                                    <TableHeader >CSM 장소</TableHeader>
                                    
                                    <TableHeader>등급</TableHeader>
                                    <TableHeader>CSM</TableHeader>
                                    <TableHeader>MODEL</TableHeader>
                                    <TableHeader>제번</TableHeader>
                                    
                                    
                        {Login_Info.Login_Admin_Access ? <>
                                    <TableHeader>작업시간</TableHeader>
                                    <TableHeader>작업인원</TableHeader>
                                    <TableHeader>작업자 이름</TableHeader>
                                    <TableHeader>이동거리</TableHeader>
                                    <TableHeader>이동시간</TableHeader>
                                    <TableHeader>숙박일수</TableHeader>
                                    <TableHeader>이동거리 비용</TableHeader>
                                    <TableHeader>이동시간 비용</TableHeader>
                                    <TableHeader>숙박비용</TableHeader>
                                    <TableHeader>작업비용</TableHeader>
                                    <TableHeader>총 비용</TableHeader></>:<></>}
    
                        <TableHeader>비고</TableHeader>
                        <TableHeader>삭제</TableHeader>
                    </TableRow>
                    </thead>
                <tbody>
                    
                    {Csm_Invoice_Select_State.map((list,i) => {
                        return <>
                            {list.Sub_Data.map((item, j) => {
                            return <TableRow key={item.csm_user_input_list_csm_key} style={i%2 === 0 ? {backgroundColor:"lightgray"}:{backgroundColor:"white"}}>
                                {j === 0 ? <>
                                   
                                    <TableData rowSpan={list.Sub_Data.length + LengthCount}>{i + 1}</TableData>
                                    <TableData rowSpan={list.Sub_Data.length + LengthCount}>{moment(list.Main_Data.csm_user_input_list_registration_date).format("YYYY-MM-DD")}</TableData>
                                    <TableData rowSpan={list.Sub_Data.length + LengthCount}>{ list.Main_Data.csm_user_input_list_custom_name}</TableData>
                                </> : <></>}
                                
                                <TableData>{ item.csm_basic_data_grade}</TableData>
                                <TableData>{ item.csm_basic_data_csm_number}</TableData>
                                <TableData>{item.csm_basic_data_model_number}</TableData>
                                <TableData>{ item.csm_basic_data_binds}</TableData>
                                
                                

                                {Login_Info.Login_Admin_Access ? <><TableData>{ item.csm_basic_data_working_hours} 시간</TableData>
                                <TableData>{item.csm_basic_data_working_count} 명</TableData>
                                
                                
                                 {j === 0 ? <>
                                    <TableData rowSpan={list.Sub_Data.length + LengthCount} style={{textAlign:"center"}}>
                                        <div>{item.team}</div>
                                    <div  style={{marginTop:"5px"}}>{item.name}</div></TableData>
                                     <TableData  rowSpan={list.Sub_Data.length + LengthCount  }>{ item.csm_user_input_data_travel_range}</TableData>
                                    <TableData  rowSpan={list.Sub_Data.length + LengthCount}>{ item.csm_user_input_data_travel_time}</TableData>
                                    <TableData  rowSpan={list.Sub_Data.length +LengthCount  }>{item.csm_user_input_data_stay_days}</TableData>
                                        <TableData  rowSpan={list.Sub_Data.length +LengthCount }>￥{item.csm_user_input_data_travel_range_cost?.toString()
                                                                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</TableData>
                                    <TableData  rowSpan={list.Sub_Data.length +LengthCount}>￥{ item.csm_user_input_data_travel_time_cost?.toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</TableData>
                                    <TableData  rowSpan={list.Sub_Data.length +LengthCount}>￥{ item.csm_user_input_data_stay_days_cost?.toString()
                                                                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</TableData>

                                </> : <></>}

                                    <TableData>￥{ item.csm_user_input_data_operation_cost?.toString()
                                                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</TableData>
                                    <TableData >￥{  (item.csm_user_input_data_total_cost -item.csm_user_input_data_travel_range_cost -item.csm_user_input_data_travel_time_cost-item.csm_user_input_data_stay_days_cost)?.toString()
                                                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</TableData>
                                    </>:<></>}
                                
                                
                                <TableData>{item.csm_basic_data_etc}</TableData>
                                 {j === 0 ? <TableData style={{fontSize:"1.1em",color:"red"}} rowSpan={list.Sub_Data.length + LengthCount} onClick={()=>HandleSelectDataDelete(list)}><RiDeleteBin5Fill></RiDeleteBin5Fill></TableData>
                                : <></>}
                                </TableRow>
                              
                            
                            })}
                             
                            { Login_Info.Login_Admin_Access?<tr style={i%2 === 0 ? {backgroundColor:"lightgray"}:{backgroundColor:"white"}}>
                                <TableData colSpan={8}></TableData>
                                    <TableData colSpan={1} style={{backgroundColor:"yellow",textAlign:"center"}}>총 합계</TableData>
                                    <TableData >￥{ list.Sub_Data.reduce((accumulator, currentValue) => {
                                        return accumulator + currentValue.csm_user_input_data_total_cost;
                                    }, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</TableData>
                                <TableData colSpan={6}></TableData>
                            </tr> : <></>}
                            
                            
                            
                        </>
                        
                    })}



                             
                    </tbody>
                </Table>
        </InvoiceSelectTableMainDivBox>
    )
}

export default InvoiceSelectTable;