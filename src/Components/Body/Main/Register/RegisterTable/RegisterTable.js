import React, { useEffect, useRef, useState } from "react";
import { Table, TableContainer, TableData, TableHeader, TableRow } from "../../CsmTable/CsmTable";
import Publish from "../../CsmTable/Publish/Publish";
import Apply from "../../CsmTable/Apply/Apply";
import Entering from "../../CsmTable/Entering/Entering";
import Custom from "../../CsmTable/Custom/Custom";
import Pay from "../../CsmTable/Pay/Pay";
import Finall from "../../CsmTable/Finall/Finall";
import { useDispatch, useSelector } from "react-redux";
import Ce from "../../CsmTable/CE/Ce";
import moment from "moment";
import { Csm_Register_Data_Reduce_Thunk } from "../../../../../Models/ReduxThunk/Csm_Regi_Data_Reducer/CsmRegiDataReducer";
import {Csm_Invoice_Select_Add_Data, Csm_Invoice_Select_Delete_Data} from "../../../../../Models/Csm_Select_Reducer/CsmInvoiceSelectReducer"
import { Csm_Register_Data_Change_Checked } from "../../../../../Models/ReduxThunk/Csm_Regi_Data_Reducer/CsmRegiDataReducer";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { request } from "../../../../../APIs";
import { toast } from "../../../ToastMessage/ToastManager";
import TextWithHover from "../../../TextHover/TextWithHover";
import { Csm_Select_Add_Data } from "../../../../../Models/Csm_Select_Reducer/CsmSelectReducer";
import {useHistory} from 'react-router-dom'
import { Csm_Filtering_Reset_Data, initState } from "../../../../../Models/Csm_Filtering_Reducer/CSmFilteringReducer";

const RegisterTable = () => {
    const history = useHistory();
     const handleTableRef = useRef();
    const dispatch = useDispatch();
    const Login_Info = useSelector(state => state.LoginInfoDataReducer.Infomation);
    const Csm_Filter_State = useSelector(state => state.CSmFilteringReducer.Csm_Filter_State);
    const Csm_Register_State = useSelector((state) => state.CsmRegiDataReducer.Csm_Register_Data_State);
    const Csm_Invoice_Select_State = useSelector((state) => state.CsmInvoiceSelectReducer.Csm_Invoice_Select_Data);
   
  const [RightMenuIsOpen, setRightMenuIsOpen] = useState(false);
  const [RightMenuPosition, setRightMenuPosition] = useState({
    x: 0,
    y:0
  })
  const [RightMenuClickKeys, setRightMenuClickKeys] = useState(null);
  const [UpdateModalIsOpen, setUpdateModalIsOpen] = useState(false);

    
    
    const handle_Delete_Complete_Data_Confirm_Checking = async() => {
         confirmAlert({
            title: `${RightMenuClickKeys.Main_Data.name}님이 등록한 CSM ${RightMenuClickKeys.Sub_Data.length}건을 `,
            message: ` 사용자 등록 삭제 처리 하시겠습니까?`,
            buttons: [
                {
                label: '삭제',
                    onClick: async() => {
                    await handle_Delete_Complete_Data()
                 }
                },
                {
                label: '취소',
                onClick: () => {}
                }
            ]
            });
    }
    
    
    const handle_Delete_Complete_Data = async () => {
        try {
          
             const Change_Data = RightMenuClickKeys.Sub_Data.map((list) => {
                return {
                    ...list,
                    csm_custom_csm_key: null,
                    csm_custom_id: null,
                    csm_custom_name: null,
                    csm_custom_write_date: null,
                    csm_user_input_data_apply_code: null,
                    csm_user_input_data_csm_key: null,
                    csm_user_input_data_indexs: null,
                    csm_user_input_data_operation_cost: null,
                    csm_user_input_data_stay_days: null,
                    csm_user_input_data_stay_days_cost: null,
                    csm_user_input_data_total_cost: null,
                    csm_user_input_data_travel_range: null,
                    csm_user_input_data_travel_range_cost: null,
                    csm_user_input_data_travel_time: null,
                    csm_user_input_data_travel_time_cost: null,
                    csm_user_input_data_working_count: null,
                    csm_user_input_data_working_hours: null,
                    csm_user_input_data_write_date: null,
                    csm_user_input_data_writer_id: null,
                    csm_user_input_list_accept_check: null,
                    csm_user_input_list_csm_key: null,
                    csm_user_input_list_custom_name: null,
                    csm_user_input_list_first_show: null,
                    csm_user_input_list_indexs: null,
                    csm_user_input_list_registration_date: null,
                    csm_user_input_list_registration_key: null,
                    name: null,
                    team: null,
                    checked:true
                }
            })

            const handle_Delete_Complete_Data_Axios = await request.post('/CE_Calendar_app_server/handle_Delete_Complete_Data', {
                RightMenuClickKeys
            })

            if (handle_Delete_Complete_Data_Axios.data.dataSuccess) {
                        toast.show({
                        title: '등록 삭제 처리 완료',
                        content: `${RightMenuClickKeys.Main_Data.name}님이 등록한 CSM ${RightMenuClickKeys.Sub_Data.length}건을 사용자 등록 삭제 처리하였습니다.`,
                        duration: 6000,
                        successCheck: true,
                        });
                dispatch(Csm_Register_Data_Reduce_Thunk(1,Csm_Filter_State,Csm_Invoice_Select_State))
                dispatch(Csm_Select_Add_Data(Change_Data))
                handleMenuClose();
                history.push('/Csm_User_Input_Data')
            }

         
        } catch (error) {
            console.log(error);
        }
    }
    
    
      const handleMenuClose = () => {
          setRightMenuIsOpen(false);
           document.body.style.overflow = 'auto';
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


    const handle_Add_Invoice_Redux = (data) => {
        if (data.Main_Data.checked === "false" || !data.Main_Data.checked) {
            //데이터 추가

             const Change_Checked_True = Csm_Register_State?.Regi_Csm_Data.map((list) => list.Main_Data.csm_basic_data_csm_key === data.Main_Data.csm_basic_data_csm_key ? {
            ...list,
            Main_Data:{
                ...list.Main_Data,
                checked:true
            }
        } : list)
        dispatch(Csm_Invoice_Select_Add_Data(Csm_Invoice_Select_State.concat(data)));
        dispatch(Csm_Register_Data_Change_Checked(Change_Checked_True));


        } else {
        //데이터 삭제
            
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

       
    }

    useEffect(() => {
        // dispatch(Csm_Filtering_Reset_Data());
        dispatch(Csm_Register_Data_Reduce_Thunk(1, Csm_Filter_State, Csm_Invoice_Select_State))
    },[])

    return (
         <TableContainer ref={handleTableRef}>
                <Table style={Login_Info.Login_Admin_Access?{width:"200%",maxWidth:"200%"}:{width:"100%",maxWidth:"100%"}}>
                    <thead>
                    <TableRow>
                        {Login_Info.Login_Admin_Access ? <TableHeader >
                            <div>선택</div>
                            <div>( { Csm_Invoice_Select_State.length} )</div>
                        </TableHeader> : <></>}
                                    {/* <TableHeader >NO.</TableHeader> */}
                                    <TableHeader >작업일자</TableHeader>
                                    <TableHeader >CSM 장소</TableHeader>
                                    <TableHeader>등급</TableHeader>
                                    <TableHeader>CSM</TableHeader>
                                    <TableHeader>MODEL</TableHeader>
                                    <TableHeader>제번</TableHeader>
                                    
                                    
                        {Login_Info.Login_Admin_Access ? <>
                                    <TableHeader>작업시간</TableHeader>
                            <TableHeader>작업인원</TableHeader>
                            <TableHeader >총 합계</TableHeader>
                                    <TableHeader>작업자 이름</TableHeader>
                                    <TableHeader>이동거리</TableHeader>
                                    <TableHeader>이동시간</TableHeader>
                                    <TableHeader>숙박일수</TableHeader>
                                    <TableHeader>이동거리 비용</TableHeader>
                                    <TableHeader>이동시간 비용</TableHeader>
                                    <TableHeader>숙박비용</TableHeader>
                                    <TableHeader>작업비용</TableHeader>
                                    <TableHeader>총 비용</TableHeader></>:<></>}
                                    <TableHeader style={{borderLeft:"2px solid gray"}}>발행</TableHeader>
                                    <TableHeader>Part 발주 요청</TableHeader>
                                    <TableHeader>Part 입고</TableHeader>
                                    <TableHeader>Part 수령</TableHeader>
                                    <TableHeader>작업완료</TableHeader>
                                    <TableHeader>인보이스발행</TableHeader>
                                      <TableHeader style={{borderRight:"2px solid gray"}}>완료</TableHeader>
                        <TableHeader>비고</TableHeader>
                    </TableRow>
                    </thead>
                <tbody>
                    
                    {Csm_Register_State?.Regi_Csm_Data.map((list, i) => {
                        const Length_Checking = list.Sub_Data.length;
                        return <>
                            {list.Sub_Data.map((item, j) => {
                                return <TableRow key={item.csm_basic_data_csm_key}
                                    style={RightMenuIsOpen? RightMenuClickKeys?.Main_Data.csm_user_input_list_registration_key === list.Main_Data.csm_user_input_list_registration_key ?
                                    {} :{opacity:"0.5"}:{}
                                    }
                                    className={
                                         i % 2 === 0 ? "FirstRow" : "SecondRow" 
                                    }
                                    onContextMenu={(e) => handleContextMenu(e, list)}  >
                                {j === 0 ? <>
                                    {Login_Info.Login_Admin_Access?<TableData rowSpan={Length_Checking  }>
                                            <input type="checkbox" checked={list.Main_Data.checked === "false" || !list.Main_Data.checked ? false : true} onChange={() => handle_Add_Invoice_Redux(list)} disabled={list.Main_Data.csm_pay_id ? true : false}
                                             style={list.Main_Data.csm_pay_id ? {opacity:0.2}:{}}></input>
                                    </TableData>:<></>}
                                    
                                    {/* <TableData rowSpan={list.Sub_Data.length }>{i + 1}</TableData> */}
                                    <TableData rowSpan={Length_Checking }>{moment(list.Main_Data.csm_user_input_data_start_working_date).format("YYYY-MM-DD")} <br/>~<br/> {moment(list.Main_Data.csm_user_input_data_end_working_date).format("YYYY-MM-DD")}</TableData>
                                    <TableData rowSpan={Length_Checking}>{list.Main_Data.csm_user_input_list_custom_name}</TableData>
                                  
                                        
                                </> : <></>}
                                
                                <TableData>{ item.csm_basic_data_grade}</TableData>
                                <TableData>{ item.csm_basic_data_csm_number}</TableData>
                                <TableData>{item.csm_basic_data_model_number}</TableData>
                                <TableData>{ item.csm_basic_data_binds}</TableData>
                                
                                

                                {Login_Info.Login_Admin_Access ? <><TableData>{ item.csm_basic_data_working_hours} 시간</TableData>
                                <TableData>{item.csm_basic_data_working_count} 명</TableData>
                                
                                
                                        {j === 0 ? <>
                                              <TableData rowSpan={Length_Checking } >￥{ list.Sub_Data.reduce((accumulator, currentValue) => {
                                        return accumulator + currentValue.csm_user_input_data_total_cost;
                                    }, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</TableData>
                                    <TableData rowSpan={Length_Checking} style={{textAlign:"center"}}>
                                        <div>{item.team}</div>
                                    <div  style={{marginTop:"5px"}}>{item.name}</div></TableData>
                                     <TableData  rowSpan={Length_Checking  }>{ item.csm_user_input_data_travel_range}</TableData>
                                    <TableData  rowSpan={Length_Checking}>{ item.csm_user_input_data_travel_time}</TableData>
                                    <TableData  rowSpan={Length_Checking  }>{item.csm_user_input_data_stay_days}</TableData>
                                        <TableData  rowSpan={Length_Checking}>￥{item.csm_user_input_data_travel_range_cost?.toString()
                                                                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</TableData>
                                    <TableData  rowSpan={Length_Checking}>￥{ item.csm_user_input_data_travel_time_cost?.toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</TableData>
                                    <TableData  rowSpan={Length_Checking}>￥{ item.csm_user_input_data_stay_days_cost?.toString()
                                                                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</TableData>

                                </> : <></>}

                                    <TableData>{ item.csm_user_input_data_operation_cost?.toString()
                                                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</TableData>
                                    <TableData >￥{  (item.csm_user_input_data_total_cost-item.csm_user_input_data_travel_range_cost -item.csm_user_input_data_travel_time_cost -item.csm_user_input_data_stay_days_cost).toString()
                                                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</TableData>
                                    </>:<></>}
                                
                                <TableData style={{borderLeft:"2px solid gray"}}>
                                    <Publish data={item}></Publish>
                                </TableData>
                                <TableData>
                                    <Apply data={item}></Apply>
                                </TableData>
                                <TableData>
                                    <Entering data={item}></Entering>
                                </TableData>
                                <TableData>
                                    <Ce data={item}></Ce>
                                </TableData>

                                 {j === 0 ? <>
                                    <TableData  rowSpan={list.Sub_Data.length   }>
                                        <Custom data={list.Main_Data}></Custom>
                                    </TableData>
                                    <TableData  rowSpan={list.Sub_Data.length  }>
                                        <Pay data={list.Main_Data}></Pay>
                                    </TableData>
                                    <TableData  rowSpan={list.Sub_Data.length   } style={{borderRight:"2px solid gray"}}>
                                        <Finall data={list.Main_Data}></Finall>
                                    </TableData>

                                </> : <></>}
                                
                                        
                                    <TableData>
                                        {list.csm_basic_data_etc ? <TextWithHover text={list.csm_basic_data_etc} maxVisibleLength={8}></TextWithHover> : ""}
                                        </TableData>
                                </TableRow>
                              
                            
                            })}
                            {/* { Login_Info.Login_Admin_Access?<tr className={i % 2 === 0 ? "FirstRow" : "SecondRow" } >
                                <TableData colSpan={16}></TableData>
                                    <TableData colSpan={1} style={{backgroundColor:"yellow",textAlign:"center"}}>총 합계</TableData>
                                    <TableData >￥{ list.Sub_Data.reduce((accumulator, currentValue) => {
                                        return accumulator + currentValue.csm_user_input_data_total_cost;
                                    }, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</TableData>
                                <TableData colSpan={8}></TableData>
                            </tr>:<></>} */}
                            
                        </>
                    })}

                     {RightMenuIsOpen ? <div className="Right_Menu_Container" style={{position:"fixed",top:`${RightMenuPosition.y}px`,left:`${RightMenuPosition.x}px`}} >
                <ul>               
                            {RightMenuClickKeys.Main_Data.csm_pay_id  ? <li style={{opacity:"0.5"}}>사용자 등록 취소</li>:<li onClick={()=>handle_Delete_Complete_Data_Confirm_Checking()}>사용자 등록 취소</li>} 
                           
                            </ul>
                          </div>:<div></div>}


                             
                    </tbody>
                </Table>
                        </TableContainer>
    )
}

export default RegisterTable;