import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import Finall from "../../../CsmTable/Finall/Finall";
import Pay from "../../../CsmTable/Pay/Pay";
import Custom from "../../../CsmTable/Custom/Custom";
import Ce from "../../../CsmTable/CE/Ce";
import Entering from "../../../CsmTable/Entering/Entering";
import Apply from "../../../CsmTable/Apply/Apply";
import Publish from "../../../CsmTable/Publish/Publish";
import { Csm_Register_Data_Change_Checked, Csm_Register_Data_Reduce_Thunk } from "../../../../../../Models/ReduxThunk/Csm_Regi_Data_Reducer/CsmRegiDataReducer";
import { Csm_Invoice_Select_Add_Data, Csm_Invoice_Select_Delete_Data } from "../../../../../../Models/Csm_Select_Reducer/CsmInvoiceSelectReducer";
import { Csm_Select_Add_Data } from "../../../../../../Models/Csm_Select_Reducer/CsmSelectReducer";
import { useHistory } from 'react-router-dom';
import { toast } from "../../../../ToastMessage/ToastManager";
import { request } from "../../../../../../APIs";
import { confirmAlert } from "react-confirm-alert";


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
                text-align:center;
                li{
                    width:13%;
                    font-weight:bolder;
                    padding-top: 10px;
                    padding-bottom: 10px;
                }
            }
            .Sub_Header_Table_Container{
                display:flex;
                width:100%;
                align-items:center;
                border-left:1px solid gray;
                margin-left: 2px;
                li{
                    width: 10%;
                    font-weight:bolder;
                    text-align:center;
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
                position: sticky;
                left: 2px;
                background: #fff;
                text-align:center;
                .Sub_Data_Container{
                    width:50%;
                    display:flex;
                    flex-flow: column;
                    .Sub_Data_List{
                        display:flex;
                        justify-content: space-evenly;
                        height: 50px;
                        align-items: center;
                        li{
                            text-align:center;
                        }
                    }
                }
            }
            .Sub_Body_Table_Container{
                width:100%;
                display:flex;
                border-left:1px solid lightgray;
                margin-left: 1px;
                .Sub_Data_Container{
                    display:flex;
                    flex-flow:column;
                    width:100%;
                    .Sub_Data_List{
                        display: flex;
                        /* justify-content: space-between; */
                        height: 50px;
                        align-items: center;
                            text-align: center;
                        li{
                            width:10%;
                        }
                    }
                }
            }
           
             
          
        }

.Right_Menu_Container{
        width:150px;
        background-color:#fff;
        position:fixed;
        box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);      
        z-index:100;
        ul{
            margin:0px;
            padding:0px;
            li{
            border:1px solid black;
            padding:8px;
            font-weight:bolder;
            }
            :hover{
                cursor: pointer;
                background-color:#efefef;
            }
        }
  }
`

const AdminRegisterTable = () => {
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
                        <li style={{lineHeight:"20px"}}>이동거리 <br />비용</li>
                        <li style={{lineHeight:"20px"}}>이동시간 <br />비용</li>
                        <li>숙박 비용</li>
                        <li>작업 비용</li>
                        <li>발행</li>
                        <li style={{lineHeight:"20px"}}>Part <br/>발주요청</li>
                        <li style={{lineHeight:"20px"}}>Part <br/>입고</li>
                        <li style={{lineHeight:"20px"}}>Part<br/> 수령</li>
                        <li >작업완료</li>
                        <li >Invoice<br /> 발행</li>
                        <li style={{borderRight:"1px solid gray"}}>완료</li>
                        
                        <li>비고</li>
                    </div>
                    
                </ul>    
            </div>
            <div>
                {Csm_Register_State?.Regi_Csm_Data?.map((list) => {
                    return <ul className="Table_Body" onContextMenu={(e) => handleContextMenu(e, list)}
                     style={RightMenuIsOpen? RightMenuClickKeys?.Main_Data.csm_user_input_list_registration_key === list.Main_Data.csm_user_input_list_registration_key ?
                                    {} :{opacity:"0.5"}:{}
                                    }
                    >
                        <div className="Main_Body_Table_Container">
                            <li style={{width:"100px"}}>
                                <input type="checkbox" disabled={list.Main_Data.csm_invoice_list_registration_key ? true : false}
                                checked={list.Main_Data.checked === "false" || !list.Main_Data.checked ? false : true} onChange={() => handle_Add_Invoice_Redux(list)} 
                                             style={list.Main_Data.csm_pay_id ? {opacity:0.2}:{}}></input>
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
                                    </div>
                                })}
                            </li>
                            <li style={{ width: "100px" }}>
                                <div>{list.Main_Data.name}</div>
                            </li>
                              <li style={{width:"100px"}}> 
                                    <div>￥{ list.Main_Data.csm_user_input_data_total_cost.toString()
                                                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                            </li>
                        </div>
                        <div className="Sub_Body_Table_Container">
                            <li className="Sub_Data_Container">
                                {list.Sub_Data.map((item) => {
                                    return <div className="Sub_Data_List">
                                        <li>{ item.csm_basic_data_working_hours} 시간</li>
                                            <li>{ item.csm_basic_data_working_count} 명</li>
                                        <li>{item.csm_user_input_data_travel_range} KM</li>
                                        <li>{item.csm_user_input_data_travel_time} 시간</li>
                                        <li>{item.csm_user_input_data_stay_days ===0?"":item.csm_user_input_data_stay_days+"일"} </li>
                                        <li>{item.csm_user_input_data_travel_range_cost !==0 ?'￥'+item.csm_user_input_data_travel_range_cost.toString()
                                                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ','):""}</li>
                                        <li>{item.csm_user_input_data_travel_time_cost !==0? "￥"+item.csm_user_input_data_travel_time_cost.toString()
                                                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ','):""}</li>
                                        <li>{item.csm_user_input_data_stay_days_cost !==0 ? "￥"+item.csm_user_input_data_stay_days_cost.toString()
                                                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ','):""}</li>
                                        <li>{item.csm_user_input_data_operation_cost !==0 ?"￥"+item.csm_user_input_data_operation_cost.toString()
                                                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ','):""}</li>
                                        
                                        <li><Publish data={item}></Publish></li>
                                        <li><Apply data={item}></Apply></li>
                                        <li><Entering data={item}></Entering></li>
                                        <li><Ce data={item}></Ce></li>
                                        <li>
                                            <Custom data={list.Main_Data}></Custom> 
                                        </li>
                                         <li>
                                            <Pay data={list.Main_Data}></Pay>
                                        </li>
                                        <li style={{borderRight:"1px solid lightgray"}}>
                                            <Finall data={list.Main_Data}></Finall>
                                        </li>
                                        <li>
                                            { item.csm_basic_data_etc}
                                        </li>
                                    </div>
                                })}
                            </li>
                                 
                               
                             
                        </div>
                    </ul>
                })}
                  {RightMenuIsOpen ? <div className="Right_Menu_Container" style={{position:"fixed",top:`${RightMenuPosition.y}px`,left:`${RightMenuPosition.x}px`}} >
                <ul>               
                            {RightMenuClickKeys.Main_Data.csm_pay_id  ? <li style={{opacity:"0.5"}}>사용자 등록 취소</li>:<li onClick={()=>handle_Delete_Complete_Data_Confirm_Checking()}>사용자 등록 취소</li>} 
                           
                            </ul>
                          </div>:<div></div>}
            </div>

        </NewRegisterTableMainDivBox>
    )
}

export default AdminRegisterTable;