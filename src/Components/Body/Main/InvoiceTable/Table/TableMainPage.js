import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { Table, TableData, TableHeader, TableRow } from "../../CsmTable/CsmTable";
import moment from "moment";
import Finall from "../../CsmTable/Finall/Finall";
import { request } from "../../../../../APIs";

const TableMainPageMainDivBox = styled.div`
    max-width:100%;
    overflow:auto;
    font-size:0.8em;
`

const TableMainPage = () => {
    const Login_Info = useSelector(state => state.LoginInfoDataReducer.Infomation);
     const Csm_Register_State = useSelector((state) => state.CsmRegiDataReducer.Csm_Register_Data_State);
    const [Invoice_State, setInvoice_State] = useState([]);

    const Invoice_Table_Data_Getting = async () => {
        try {
            
            const Invoice_Table_Data_Getting_Axios = await request.get('/CE_Calendar_app_server/Invoice_Table_Data');

            if (Invoice_Table_Data_Getting_Axios.data.dataSuccess) {
                console.log(Invoice_Table_Data_Getting_Axios);
                setInvoice_State(Invoice_Table_Data_Getting_Axios.data.getData);
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        Invoice_Table_Data_Getting(); 
    },[])

    return (
        <TableMainPageMainDivBox>
              <Table style={{width:"100%",maxWidth:"100%"}}>
                    <thead>
                    <TableRow>
                        <TableHeader >NO.</TableHeader>
                        <TableHeader>Invoice Number</TableHeader>
                        <TableHeader >전표 번호</TableHeader>
                        <TableHeader>총 비용</TableHeader>
                        <TableHeader>납품처</TableHeader>
                                    <TableHeader>등급</TableHeader>
                                    <TableHeader>CSM</TableHeader>
                                    <TableHeader>MODEL</TableHeader>
                                    <TableHeader>제번</TableHeader>
                                    <TableHeader>완료</TableHeader>
      
                    </TableRow>
                    </thead>
                <tbody>
                    
                    {Invoice_State.map((list, j) => {
                        const Sum_Lenght = list.Inovoice_basic_csm_Data.flat().length + 1;
                        return <>
                       <TableRow>
                            <TableData  rowSpan={Sum_Lenght }>{j + 1}</TableData>
                                <TableData  rowSpan={Sum_Lenght}>{list?.Invoice_Sum_List_Rows?.csm_invoice_list_registration_key}</TableData>
                                <TableData  rowSpan={Sum_Lenght}>전표 번호 XXXXXXXXXXX</TableData>
                            <TableData  rowSpan={Sum_Lenght}>￥{  list.Inovoice_basic_csm_Data.reduce((acc, innerArray) => {
                                                    return acc + innerArray.reduce((innerAcc, obj) => innerAcc + obj.csm_user_input_data_total_cost, 0);
                                }, 0).toLocaleString()}</TableData>
                            </TableRow>                        
                         
                        {list.Inovoice_basic_csm_Data.map((item,i) => {
                            return item.map((data,k) => {
                                return <TableRow>
                                    <TableData >{data.csm_user_input_list_custom_name}</TableData>
                                                    <TableData >{data.csm_basic_data_grade}</TableData>
                                                    <TableData >{data.csm_basic_data_csm_number}</TableData>
                                                    <TableData >{data.csm_basic_data_model_number}</TableData>
                                                    <TableData >{data.csm_basic_data_binds}</TableData>
                                                
                                                    <td>
                                                        
                                                    </td>
                                            
                                            </TableRow>
                                   
                            })
                        })}
                            
                        </>
                    })}
                    



                             
                    </tbody>
                </Table>
        </TableMainPageMainDivBox>
    )
}

export default TableMainPage;