import React,{useEffect, useRef, useState} from "react";
import styled from 'styled-components';
import PageNation from "../PageNation/PageNation"
import axios from 'axios';
import Publish from "./Publish/Publish";
import Apply from "./Apply/Apply";
import Entering from "./Entering/Entering";
import Ce from "./CE/Ce";
import Custom from "./Custom/Custom";
import Pay from "./Pay/Pay";
import Finall from "./Finall/Finall";
import { useDispatch, useSelector } from "react-redux";
import { Loader_Check_For_True,Loader_Check_For_False } from "../../../../Models/LoaderCheckReducer/LoaderCheckReducer";
import { request } from "../../../../APIs";
import { Csm_Select_Add_Data } from "../../../../Models/Csm_Select_Reducer/CsmSelectReducer";
import { Csm_Select_Delete_Data } from "../../../../Models/Csm_Select_Reducer/CsmSelectReducer";
import { Csm_Baisc_Data_Reduce_Thunk, Csm_Basic_Data_Change_Checked } from "../../../../Models/ReduxThunk/Csm_Basic_Data_Reducer/CsmBasicDataReducer";
import { toast } from "../../ToastMessage/ToastManager";
import Modal from "react-modal";
import CsmUpdateModal from "../MainModal/CsmUpdateModal";
import TextWithHover from "../../TextHover/TextWithHover";


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '85%',
        height: '85%',
        zIndex: 100,
    },
};
Modal.setAppElement('#FilterSearchModal');


export const TableContainer = styled.div`
  /* max-height: 80vh; */
  overflow-y: auto;
  max-height: 90vh;
  .Hidden_Checking{
    opacity:0.5;
  }
`;

export const Table = styled.table`
  /* max-width: 100%; */
  border-collapse: collapse;
    /* border-collapse: separate; */

 
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
        }
        :hover{
            cursor: pointer;
            background-color:#efefef;
          }
      }
  }

`;

export const TableHeader = styled.th`
  position: sticky;
  top: 0;
  background-color: #f1f1f1;
  padding: 10px;
  font-weight: bold;
  text-align: left;
  height: 40px;
  color: black;
  font-size:1.2em;
  text-align:center;
  z-index: 1;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
      border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  }
    &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
      border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  }
  

`;

export const TableData = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  color: black;
  font-size:1.3em;
  text-align:center;
  
`;

export const TableRow = styled.tr`
  .Not_Selected{
    opacity:0.5;
  }
  .FirstRow{
    background-color:#fff;
  }
  .SecondRow{
    /* background-color:lightgray; */
    background-color:#fff;
  }


  &:nth-child(even) {
    /* background-color: #f9f9f9; */
    background-color:#fff;
  }



`;

const CsmTable = () => {
  const handleTableRef = useRef();
  const ScrollUp = useRef();
  const dispatch = useDispatch()
  const CsmSelectState = useSelector(state => state.CsmSelectReducer.Csm_Select_Data);
  const Csm_Filter_state = useSelector(state => state.CSmFilteringReducer.Csm_Filter_State)
  const Csm_Data = useSelector(state => state.CsmBasicDataReducer.Csm_Basic_Data_State.Csm_Data);
  const totalPages = useSelector(state => state.CsmBasicDataReducer.Csm_Basic_Data_State.All_Count);
  const Csm_Data_LoadingCheck = useSelector(state => state.CsmBasicDataReducer.Csm_Basic_Data_State.loading);
  const Login_Info = useSelector(state => state.LoginInfoDataReducer.Infomation);
  const [PageNumbers, setPageNumbers] = useState(1);
  const [RightMenuIsOpen, setRightMenuIsOpen] = useState(false);
  const [RightMenuPosition, setRightMenuPosition] = useState({
    x: 0,
    y:0
  })
  const [RightMenuClickKeys, setRightMenuClickKeys] = useState(null);
  const [UpdateModalIsOpen, setUpdateModalIsOpen] = useState(false);



  //Calendar 데이터 숨김 처리 
  const Csm_Data_Hidden_Checking = async () => {
    try {
      
      const Csm_Data_Hidden_Checking_Axios = await request.post('/CE_Calendar_app_server/Csm_Data_Hidden_Checking', {
        RightMenuClickKeys
      })
      if (Csm_Data_Hidden_Checking_Axios.data.dataSuccess) {
        if (RightMenuClickKeys.csm_basic_data_view_hidde_check === 0) {
          //숨김처리

          const Change_Csm_Basic_Data = Csm_Data.map((list) => list.csm_basic_data_csm_key === RightMenuClickKeys.csm_basic_data_csm_key ? {...list,csm_basic_data_view_hidde_check:1} : list);


          dispatch(Csm_Basic_Data_Change_Checked(Change_Csm_Basic_Data));

          toast.show({
          title: '숨김처리',
          content: `CSM 번호 : ${RightMenuClickKeys.csm_basic_data_csm_number}를 숨김 처리 하였습니다.`,
          duration: 6000,
          successCheck: true,
        })

        } else {
          //숨김처리 취소

          const Change_Csm_Basic_Data = Csm_Data.map((list) => list.csm_basic_data_csm_key === RightMenuClickKeys.csm_basic_data_csm_key ? {...list,csm_basic_data_view_hidde_check:0} : list);

          dispatch(Csm_Basic_Data_Change_Checked(Change_Csm_Basic_Data));
             toast.show({
          title: '숨김처리 취소',
          content: `CSM 번호 : ${RightMenuClickKeys.csm_basic_data_csm_number}를 숨김 처리 하였습니다.`,
          duration: 6000,
          successCheck: true,
        })
        }
      }

      Csm_Basic_Data_Update_Modal_Close();
    } catch (error) {
      console.log(error);
       toast.show({
          title: '에러 발생',
          content: `IT팀에 문의 바랍니다.`,
          duration: 6000,
          successCheck: true,
        })
    }
  }


  //Calendar 데이터 삭제

  const HandleDeleteCsmCalendar = async(Select_Menu,Select_Korean_Menu) => {
    try {
      
      const Handle_Delete_Csm_Calendar_Axios = await request.post('/CE_Calendar_app_server/Handle_Delete_Csm_Calendar', {
        RightMenuClickKeys,
        Select_Menu
      })

      if (Handle_Delete_Csm_Calendar_Axios.data.dataSuccess) {
        toast.show({
          title: '삭제 성공',
          content: `${Select_Korean_Menu} 하였습니다.`,
          duration: 6000,
          successCheck: true,
        })
        await Table_Axios();
        Csm_Basic_Data_Update_Modal_Close();
           document.body.style.overflow = 'auto';
      } else {
         toast.show({
          title: '삭제 실패',
          content: `${Select_Korean_Menu} 실패 하였습니다.`,
          duration: 6000,
          successCheck: false,
         })
        Csm_Basic_Data_Update_Modal_Close();
         document.body.style.overflow = 'auto';
      }

    } catch (error) {
      console.log(error);
      }
  }



//데이터 수정
  const Csm_Basic_Data_Update_Modal_Close = () => {
    setRightMenuClickKeys(null);
    setRightMenuIsOpen(false);
    setUpdateModalIsOpen(false);
    document.body.style.overflow = 'auto';
  }


//데이터 삭제
  const handleDeleteData = async () => {
    const checking = window.confirm(`CSM 번호 : ${RightMenuClickKeys?.csm_basic_data_csm_number} \n제번 : ${RightMenuClickKeys?.csm_basic_data_binds}의\n데이터를 정말 삭제 하시겠습니까?`);
    if (checking) {
      
      if (RightMenuClickKeys.csm_user_input_data_writer_id) {
        toast.show({
          title: '삭제 실패',
          content: `현재 데이터는 사용자 등록이 완료되어 삭제처리가 불가합니다.`,
          duration: 6000,
          successCheck: false,
        })
          setRightMenuClickKeys(null);
          setRightMenuIsOpen(false);
        return;
      } else {

        const Csm_Basic_Data_Delete_AXios = await request.post('/CE_Calendar_app_server/Csm_Basic_Data_Delete', {
          RightMenuClickKeys
        })

        if (Csm_Basic_Data_Delete_AXios.data.dataSuccess) {
          await Table_Axios();
        toast.show({
          title: '삭제성공',
          content: `요청하신 CSM 번호 : ${RightMenuClickKeys?.csm_basic_data_csm_number} 제번 : ${RightMenuClickKeys?.csm_basic_data_binds}의 데이터를 삭제 처리 하였습니다.`,
          duration: 6000,
          successCheck: true,
        })  
        } else {
              toast.show({
            title: '삭제실패',
            content: `서버와의 연결이 끊어졌습니다. 다시 시도 후 IT팀에 문의바랍니다.`,
            duration: 6000,
            successCheck: false,
          })
        }

        

        setRightMenuClickKeys(null);
        setRightMenuIsOpen(false);
          document.body.style.overflow = 'auto';
      }

    } else {
      setRightMenuClickKeys(null);
      setRightMenuIsOpen(false);
        document.body.style.overflow = 'auto';
      return;
    }
  }


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
  const HandleCheckData = (e, data) => {

    if (e.target.checked) {
      /// 체크되어 있지 않을때 , 데이터 추가

      //redux_CsmSelect에 추가
      dispatch(Csm_Select_Add_Data(CsmSelectState.concat(data)));

     //redux_Thunk_Csm_Basic_Data 기존 데이터 체크추가
      
      dispatch(Csm_Basic_Data_Change_Checked(Csm_Data.map((list)=>list.csm_basic_data_csm_key === data.csm_basic_data_csm_key ? {...list,checked:true}:list)))
    } else {
      /// 체크되어 있을때 , 데이터 제거

      //redux에 제거
      dispatch(Csm_Select_Delete_Data(CsmSelectState.filter(list => list.csm_basic_data_csm_key !== data.csm_basic_data_csm_key ? list:"")));

      //기존 데이터 체크추가
      
      dispatch(Csm_Basic_Data_Change_Checked(Csm_Data.map((list) => list.csm_basic_data_csm_key === data.csm_basic_data_csm_key ? { ...list, checked: false } : list)))
      
    }
    
  }

    
  
  const Table_Axios = async () => {
    try {
      dispatch(Csm_Baisc_Data_Reduce_Thunk(PageNumbers, Csm_Filter_state,CsmSelectState))
    } catch (error) {
      console.log(error);
     
    }
  }

  const Loading_Change = () => {
    if (Csm_Data_LoadingCheck) {
         dispatch(Loader_Check_For_True());
    } else {
      dispatch(Loader_Check_For_False());
    }
     

  }
  
  useEffect(() => {
    /// 페이지 변경 시 마다
    Table_Axios();
  }, [PageNumbers])
  
  useEffect(() => {
    /// Loading 환경 확인
    Loading_Change();
  },[Csm_Data_LoadingCheck])



    return (
        <div ref={ScrollUp}>
        <TableContainer ref={handleTableRef}>
      <Table style={Login_Info.Login_Admin_Access?{maxWidth:"150%",width:"150%"}:{maxWidth:"100%",width:"100%"}} >
        <thead>
          <TableRow>
                        <TableHeader >
                            <div>선택</div>
                  <div>( { CsmSelectState.length} ) </div>
                        </TableHeader>
                        {/* <TableHeader >NO.</TableHeader> */}
                        <TableHeader>상태</TableHeader>
                        <TableHeader>등급</TableHeader>
                        <TableHeader>CSM</TableHeader>
                        <TableHeader>MODEL</TableHeader>
                        <TableHeader>제번</TableHeader>
                        <TableHeader>최초 납품처</TableHeader>
                        {/* <TableHeader>Part<br/> 유무</TableHeader> */}
                        
                
                {Login_Info.Login_Admin_Access ? <>
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
                        <TableHeader>Part<br/> 발주요청</TableHeader>
                        <TableHeader>Part<br/> 입고</TableHeader>
                        <TableHeader>Part<br/> 수령</TableHeader>
                <TableHeader >작업완료</TableHeader>
                <TableHeader style={{ borderRight: "2px solid gray" }}>Invoice<br/>발행</TableHeader>
                {Login_Info.Login_Admin_Access ? <>
                        
                <TableHeader>완료</TableHeader>
                </> : <></>}
                
                          <TableHeader>작업시간</TableHeader>
                        <TableHeader>작업인원</TableHeader>
                
                <TableHeader>비고</TableHeader>

          </TableRow>
        </thead>
        <tbody>
                    {Csm_Data.map((list,j) => {
                        return <TableRow key={list.csm_basic_data_csm_key} onContextMenu={(e)=>handleContextMenu(e,list)} onClick={handleMenuClose} style={RightMenuClickKeys?.csm_basic_data_csm_key === list.csm_basic_data_csm_key ? {}:RightMenuIsOpen?{opacity:"0.4"}:{}} className={`${list.csm_basic_data_view_hidde_check === 1?"Hidden_Checking":""}`} >
                          <TableData ><input type="checkbox" onClick={(e) => HandleCheckData(e, list)} checked={list.checked === "TRUE" || list.checked === true ? true : false}
                            disabled={(list.csm_publish_id && list.csm_apply_id && list.csm_entering_id && list.csm_ce_id) && !list.csm_user_input_data_writer_id ? false : true}
                            style={(list.csm_publish_id && list.csm_apply_id && list.csm_entering_id && list.csm_ce_id) && !list.csm_user_input_data_writer_id ?{}:{opacity:0.2}}
                            readOnly></input></TableData>
                            {/* <TableData  >{ j+1}</TableData> */}
                            <TableData>{list.csm_basic_data_state}</TableData>
                            <TableData>{ list.csm_basic_data_grade}</TableData>
                          <TableData>{ list.csm_basic_data_csm_number}</TableData>
                          <TableData>{ list.csm_basic_data_model_number}</TableData>
                          <TableData>{ list.csm_basic_data_binds}</TableData>
                          <TableData style={{position:"relative"}}>
                            <TextWithHover text={list.csm_basic_data_custom} maxVisibleLength={8}></TextWithHover>
                            
                            {/* {list.csm_basic_data_custom.split("").length >= 15 ? `${list.csm_basic_data_custom.slice(0, 15)}...` : list.csm_basic_data_custom} */}
                          </TableData>
                          {/* <TableData>{ list.csm_basic_data_part_number?"O":"X"}</TableData> */}
                  
                          
                          {Login_Info.Login_Admin_Access ? <>
                            <TableData>{ list.name}</TableData>
                            <TableData>{ list.csm_user_input_data_travel_range}</TableData>
                          <TableData>{ list.csm_user_input_data_travel_time}</TableData>
                          <TableData>{list.csm_user_input_data_stay_days}</TableData>
                            <TableData>{list.csm_user_input_data_travel_range_cost?.toString()
                                                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</TableData>
                          <TableData>{ list.csm_user_input_data_travel_time_cost?.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</TableData>
                          <TableData>{ list.csm_user_input_data_stay_days_cost?.toString()
                                                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</TableData>
                          <TableData>{ list.csm_user_input_data_operation_cost?.toString()
                                                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</TableData>
                          <TableData>{  list.csm_user_input_data_total_cost?.toString()
                                                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</TableData>
                          </>:<></>}
                          <TableData style={{borderLeft:"2px solid gray"}}>
                            {/* 발행 */}
                            <Publish data={list} ></Publish>
                          </TableData>
                          <TableData>
                            {/* 신청 */}
                             <Apply data={list}></Apply>
                          </TableData>
                          <TableData>
                            {/* 입고 */}
                            <Entering data={list} ></Entering>
                          </TableData>
                          <TableData>
                            {/* CE */}
                            <Ce data={list} ></Ce>
                            
                          </TableData>
                          <TableData>
                            {/* 고객 */}
                            <Custom data={list}></Custom>
                          </TableData>
                            <TableData  style={{borderRight:"2px solid gray"}}>
                            {/* PAY */}
                            <Pay data={list}></Pay>
                          </TableData>

                            {Login_Info.Login_Admin_Access ? <>
                          
                          <TableData>
                            {/* 완료 */}
                            <Finall data={list} ></Finall>
                          </TableData>
                        </> : <></>}
                          
                          <TableData>{ list.csm_basic_data_working_hours} 시간</TableData>
                          <TableData>{ list.csm_basic_data_working_count} 명</TableData>
                          <TableData style={{ position: "relative" }}>
                            { list.csm_basic_data_etc?<TextWithHover text={list.csm_basic_data_etc} maxVisibleLength={8}></TextWithHover>:""}
                             
                            {/* {list.csm_basic_data_etc.split("").length >= 15 ? `${list.csm_basic_data_etc.slice(0, 15)}...` : list.csm_basic_data_etc} */}
                            </TableData>
                        </TableRow>
                    })}
                        {RightMenuIsOpen ? <div className="Right_Menu_Container" style={{top:`${RightMenuPosition.y}px`,left:`${RightMenuPosition.x}px`}} >
                <ul>
                  {RightMenuClickKeys?.csm_publish_id ? <li onClick={()=>HandleDeleteCsmCalendar("csm_publish",'발행 삭제')} >발행 삭제</li> : <li style={{ opacity: "0.5" }}>발행 삭제</li>}
                  { RightMenuClickKeys?.csm_apply_id && RightMenuClickKeys?.csm_apply_id !== "-"?<li onClick={()=>HandleDeleteCsmCalendar("csm_apply",'Part 발주 요청 삭제')}>Part 발주 요청 삭제</li>:<li style={{opacity:"0.5"}}>Part 발주 요청 삭제</li>}
                  {RightMenuClickKeys?.csm_entering_id && RightMenuClickKeys?.csm_entering_id !== "-" ? <li onClick={()=>HandleDeleteCsmCalendar("csm_entering",'Part 입고 삭제')}>Part 입고 삭제</li> : <li style={{ opacity: "0.5" }}>Part 입고 삭제</li>}
                  { RightMenuClickKeys?.csm_ce_id && RightMenuClickKeys?.csm_ce_id !== "-" ?<li onClick={()=>HandleDeleteCsmCalendar("csm_ce",'Part 수령 삭제')}>Part 수령 삭제</li>:<li style={{opacity:"0.5"}}>Part 수령 삭제</li>}
                  
                  
                  <li onClick={() => Csm_Data_Hidden_Checking()}>{RightMenuClickKeys?.csm_basic_data_view_hidde_check === 0?"숨김처리":"숨김처리 취소" }</li>
                              <li onClick={()=>setUpdateModalIsOpen(true)}>데이터 수정하기</li>
                              <li onClick={()=>handleDeleteData()}>데이터 삭제하기</li>
                            </ul>
                          </div>:<div></div>}
        </tbody>
      </Table>
            </TableContainer>
        <PageNation totalPagesss={totalPages} setCurrentPage={(data) => setPageNumbers(data)} currentPage={PageNumbers}></PageNation>
         <Modal isOpen={UpdateModalIsOpen} style={customStyles} onRequestClose={()=>Csm_Basic_Data_Update_Modal_Close()} >
                  <CsmUpdateModal RightMenuClickKeys={RightMenuClickKeys} Csm_Basic_Data_Update_Modal_Close={()=>Csm_Basic_Data_Update_Modal_Close()}></CsmUpdateModal>
            </Modal>
            </div>
    )
}

export default CsmTable