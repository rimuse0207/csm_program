import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { Table, TableData, TableHeader, TableRow } from "../../CsmTable/CsmTable";
import moment from "moment";
import Finall from "../../CsmTable/Finall/Finall";
import { request } from "../../../../../APIs";
import { toast } from "../../../ToastMessage/ToastManager";
import { Csm_Register_Data_Change_Checked } from "../../../../../Models/ReduxThunk/Csm_Regi_Data_Reducer/CsmRegiDataReducer";
import { Csm_Invoice_Select_Add_Data } from "../../../../../Models/Csm_Select_Reducer/CsmInvoiceSelectReducer";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ImPrinter } from "react-icons/im";

const TableMainPageMainDivBox = styled.div`
    max-width:100%;
    overflow:auto;
    font-size:0.8em;

    

`

const TableMainPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const Login_Info = useSelector(state => state.LoginInfoDataReducer.Infomation);
    const Csm_Invoice_Select_State = useSelector((state) => state.CsmInvoiceSelectReducer.Csm_Invoice_Select_Data);
     const Csm_Register_State = useSelector((state) => state.CsmRegiDataReducer.Csm_Register_Data_State);
    const [Invoice_State, setInvoice_State] = useState([]);
    const [RightMenuIsOpen, setRightMenuIsOpen] = useState(false);
    const [RightMenuPosition, setRightMenuPosition] = useState({
        x: 0,
        y:0
    })
    const [RightMenuClickKeys, setRightMenuClickKeys] = useState(null);




    const Handle_Invoice_Print = async () => {
        try {
            const Handle_Invoice_Print_Axios = await request.post(`/CE_Calendar_app_server/Handle_Invoice_Print`, {
                RightMenuClickKeys
            })
            if (Handle_Invoice_Print_Axios.data.dataSuccess) {
                  const width = 800; // 새 창의 너비
                    const height = 600; // 새 창의 높이

                    const left = (window.innerWidth - width) / 2; // 화면 중앙으로 위치 조정
                    const top = (window.innerHeight - height) / 2; // 화면 중앙으로 위치 조정
                 const options = `width=${width},height=${height},left=${left},top=${top}`;

                const {csm_invoice_print_select_date,csm_invoice_print_key,csm_invoice_print_travel_fee_unit,csm_invoice_print_hotel_fee_unit,csm_invoice_print_hotel_fee_price,csm_invoice_print_service_fee_unit,csm_invoice_print_service_fee_sum_price}=Handle_Invoice_Print_Axios.data.Handle_Invoice_Print_Getting_Rows[0]
                
                window.open(`/Invoice_Printer/${moment(csm_invoice_print_select_date).format("YYYY-MM-DD")}/${csm_invoice_print_key}/${csm_invoice_print_travel_fee_unit}/${csm_invoice_print_hotel_fee_unit}/${csm_invoice_print_hotel_fee_price}/${csm_invoice_print_service_fee_unit}/${csm_invoice_print_service_fee_sum_price}`,'_blank',options);
            } else {
                  toast.show({
                                title: 'Invoice 출력 ERROR',
                                content: `다시 시도 후 IT 팀에 문의 바랍니다.`,
                                duration: 6000,
                                successCheck: false,
                        });
            }


        } catch (error) {
            console.log(error);
            

        }
    }



  const handleOutsideClick = (event) => {
  // 메뉴 영역 바깥의 클릭 이벤트를 처리하여 메뉴를 닫습니다.
  const isOutsideMenu = event.target.closest('.Right_Menu_Container') === null;
  if (isOutsideMenu) {
    handleMenuClose();
    setRightMenuClickKeys(null);
  }
};
useEffect(() => {
  if (RightMenuIsOpen) {
    document.addEventListener('click', handleOutsideClick);
  } else {
    document.removeEventListener('click', handleOutsideClick);
  }

  return () => {
    document.removeEventListener('click', handleOutsideClick);
  };
}, [RightMenuIsOpen]);
    
    
   const handleContextMenu = (e,data) => {
     e.preventDefault(); // 기본 동작 방지 (예: 컨텍스트 메뉴 표시)

     if (!Login_Info.Login_Admin_Access) {
       return;
       } 


    document.body.style.overflow = 'hidden';
    
    setRightMenuClickKeys(data);
    setRightMenuPosition({
       x: e.clientX,
       y:e.clientY,
    })
      setRightMenuIsOpen(true);
    };
    
     const handleMenuClose = () => {
          setRightMenuIsOpen(false);
           document.body.style.overflow = 'auto';
}
    
    const Handle_Delete_Invoice_Number = async () => {

        if (!window.confirm("정말 인보이스 번호를 삭제 하시겠습니까?")) {
            return;
        }

        try {
            const Change_Data = [];
            RightMenuClickKeys.Inovoice_basic_csm_Data.map((list, j) => {
                let Main_Data = null;
                const Sub_Data = [];
                list.map((item, i) => {
                    if (i === 0) {
                        const Main_Data_Delete_Invoice_Data = item;
                        Main_Data_Delete_Invoice_Data.csm_pay_id = null;
                        Main_Data_Delete_Invoice_Data.csm_pay_name = null;                        
                        Main_Data_Delete_Invoice_Data.csm_invoice_list_erp_document_number = null;
                        Main_Data_Delete_Invoice_Data.csm_invoice_list_indexs = null;
                        Main_Data_Delete_Invoice_Data.csm_invoice_list_registration_key = null;
                        Main_Data_Delete_Invoice_Data.csm_invoice_list_write_date = null;
                        Main_Data_Delete_Invoice_Data.csm_invoice_user_list_registration_key = null;
                        
                        Main_Data = Main_Data_Delete_Invoice_Data;

                        const Sub_Data_Delete_Invoice_Data = item;
                          Sub_Data_Delete_Invoice_Data.csm_pay_id = null;
                        Sub_Data_Delete_Invoice_Data.csm_pay_name = null;
                        Sub_Data_Delete_Invoice_Data.csm_invoice_list_erp_document_number = null;
                        Sub_Data_Delete_Invoice_Data.csm_invoice_list_indexs = null;
                        Sub_Data_Delete_Invoice_Data.csm_invoice_list_registration_key = null;
                        Sub_Data_Delete_Invoice_Data.csm_invoice_list_write_date = null;
                        Sub_Data_Delete_Invoice_Data.csm_invoice_user_list_registration_key= null;
                        Sub_Data.push(Sub_Data_Delete_Invoice_Data)
                    } else {
                        const Sub_Data_Delete_Invoice_Data = item;
                          Sub_Data_Delete_Invoice_Data.csm_pay_id = null;
                        Sub_Data_Delete_Invoice_Data.csm_pay_name = null;
                        Sub_Data_Delete_Invoice_Data.csm_invoice_list_erp_document_number = null;
                        Sub_Data_Delete_Invoice_Data.csm_invoice_list_indexs = null;
                        Sub_Data_Delete_Invoice_Data.csm_invoice_list_registration_key = null;
                        Sub_Data_Delete_Invoice_Data.csm_invoice_list_write_date = null;
                        Sub_Data_Delete_Invoice_Data.csm_invoice_user_list_registration_key= null;
                        Sub_Data.push(Sub_Data_Delete_Invoice_Data)
                    }
                })
                Change_Data.push({
                    Main_Data,
                    Sub_Data
                })
            })

            
                try {
                    
                    const Delete_Invoice_Number_Handle_Clicks_Axios = await request.post(`/CE_Calendar_app_server/Delete_Invoice_Number_Handle_Clicks`, {
                         RightMenuClickKeys,
                        id: Login_Info.Login_id,
                        name: Login_Info.Login_name,
                    })


                    if (Delete_Invoice_Number_Handle_Clicks_Axios.data.dataSuccess) {
                        handleMenuClose();
                                toast.show({
                                title: '인보이스 등록 취소',
                                content: `등록하신 인보이스를 삭제 처리하였습니다.`,
                                duration: 6000,
                                successCheck: true,
                        });
                        dispatch(Csm_Invoice_Select_Add_Data(Csm_Invoice_Select_State.concat(Change_Data)));
                        history.push('/Register_Csm/Invoice_Input_Data')
                    }

                } catch (error) {
                    console.log(error);
                }
            


            
        } catch (error) {
            console.log(error);
        }
    }
    
    const Handle_Delete_Document_Number = async () => {
        try {
            
            const Handle_Delete_Document_Number_Axios = await request.post('/CE_Calendar_app_server/Handle_Delete_Document_Number', {
                   RightMenuClickKeys,
            })

            if (Handle_Delete_Document_Number_Axios.data.dataSuccess) {
            Invoice_Table_Data_Getting();
             toast.show({
                        title: '전표번호 등록 취소',
                        content: `등록하신 전표번호를 삭제 처리하였습니다.`,
                        duration: 6000,
                        successCheck: true,
                });
                handleMenuClose();
            } else {
                   toast.show({
                        title: '전표번호 등록 취소 ERROR',
                        content: `IT팀에 문의바랍니다.`,
                        duration: 6000,
                        successCheck: false,
                });
            }
            
        } catch (error) {
            console.log(error);
        }
    }
    
    
    const Handle_Input_Document_Number = async() => {
    
        const Handle_Input_Data = window.prompt("전표번호를 입력 해 주세요.");
        if (Handle_Input_Data) {

            const Sending_Handle_Input_Document_Number_Axios = await request.post('/CE_Calendar_app_server/Handle_Input_Document_Number', {
                RightMenuClickKeys,
                id: Login_Info.Login_id,
                name: Login_Info.Login_name,
                Document_Number:Handle_Input_Data
            });
            if (Sending_Handle_Input_Document_Number_Axios.data.dataSuccess) {
                Invoice_Table_Data_Getting();
                toast.show({
                        title: '전표번호 등록 완료',
                        content: `${Handle_Input_Data}으로 전표번호를 등록 처리하였습니다.`,
                        duration: 6000,
                        successCheck: true,
                });
                handleMenuClose();
            }
            
        } else {
            
        }
    }
    

    const Invoice_Table_Data_Getting = async () => {
        try {
            
            const Invoice_Table_Data_Getting_Axios = await request.get('/CE_Calendar_app_server/Invoice_Table_Data');

            if (Invoice_Table_Data_Getting_Axios.data.dataSuccess) {
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
                    </TableRow>
                    </thead>
                <tbody>
                    
                    {Invoice_State.map((list, j) => {
                        const Sum_Lenght = list.Inovoice_basic_csm_Data.flat().length + 1;
                        return <>
                       <TableRow onContextMenu={(e) => handleContextMenu(e, list)}  style={RightMenuIsOpen? RightMenuClickKeys?.Invoice_Sum_List_Rows.csm_invoice_user_list_registration_key === list.Invoice_Sum_List_Rows.csm_invoice_user_list_registration_key ?
                                    {} :{opacity:"0.5"}:{}
                                    } >
                            <TableData  rowSpan={Sum_Lenght }>{j + 1}</TableData>
                                <TableData rowSpan={Sum_Lenght}>
                                    <div>{list?.Invoice_Sum_List_Rows?.csm_invoice_list_registration_key}</div>
                                   
                                </TableData>
                                <TableData rowSpan={Sum_Lenght}>{ list?.Invoice_Sum_List_Rows?.csm_invoice_list_erp_document_number}</TableData>
                            <TableData  rowSpan={Sum_Lenght}>￥{  list.Inovoice_basic_csm_Data.reduce((acc, innerArray) => {
                                                    return acc + innerArray.reduce((innerAcc, obj) => innerAcc + obj.csm_user_input_data_total_cost, 0);
                                }, 0).toLocaleString()}</TableData>
                            </TableRow>                        
                         
                        {list.Inovoice_basic_csm_Data.map((item,i) => {
                            return item.map((data,k) => {
                                return <TableRow onContextMenu={(e) => handleContextMenu(e, list)} style={RightMenuIsOpen? RightMenuClickKeys?.Invoice_Sum_List_Rows.csm_invoice_user_list_registration_key === list.Invoice_Sum_List_Rows.csm_invoice_user_list_registration_key ?
                                    {} :{opacity:"0.5"}:{}
                                    } >
                                    <TableData >{data.csm_user_input_list_custom_name}</TableData>
                                                    <TableData >{data.csm_basic_data_grade}</TableData>
                                                    <TableData >{data.csm_basic_data_csm_number}</TableData>
                                                    <TableData >{data.csm_basic_data_model_number}</TableData>
                                                    <TableData >{data.csm_basic_data_binds}</TableData>
                                            
                                            </TableRow>
                                   
                            })
                        })}
                            
                        </>
                    })}
                    
                    {RightMenuIsOpen ? <div className="Right_Menu_Container" style={{position:"fixed",top:`${RightMenuPosition.y}px`,left:`${RightMenuPosition.x}px`}} >
                        <ul>               
                          {RightMenuClickKeys?.Invoice_Sum_List_Rows.csm_invoice_user_list_registration_key ?  
                                RightMenuClickKeys?.Invoice_Sum_List_Rows.csm_invoice_list_erp_document_number ? <li onClick={() => Handle_Delete_Document_Number()}>전표번호 삭제</li> :
                                    <>
                                        <li onClick={()=>Handle_Delete_Invoice_Number()}>인보이스 발행 취소</li>
                                        <li onClick={() => Handle_Input_Document_Number()}>전표번호 작성</li>
                                        <li onClick={() => Handle_Invoice_Print()}>Invoice 출력</li>
                                    </> : <></>
                            } 
                             
                           
                            </ul>
                          </div>:<div></div>}

 
                    </tbody>
                </Table>
        </TableMainPageMainDivBox>
    )
}

export default TableMainPage;