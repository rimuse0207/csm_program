import React from 'react';
import { styled } from 'styled-components';
import { Table, TableContainer, TableData, TableHeader, TableRow } from '../../CsmTable';
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin7Fill } from "react-icons/ri";
import { Csm_Select_Delete_Data, Csm_Select_Reset_Data } from '../../../../../../Models/Csm_Select_Reducer/CsmSelectReducer';
import { Csm_User_Input_Change_Bind_Data, Csm_User_Input_Reset_Data } from '../../../../../../Models/ReduxThunk/Csm_User_Input_Reducer/CSmUserInputReducer';
import { request } from '../../../../../../APIs';
import { useHistory } from 'react-router-dom';
import {toast} from "../../../../ToastMessage/ToastManager"
import { Csm_Baisc_Data_Reduce_Thunk } from '../../../../../../Models/ReduxThunk/Csm_Basic_Data_Reducer/CsmBasicDataReducer';
import { confirmAlert } from 'react-confirm-alert';
import moment from 'moment';

const SelectTableMainDivBox = styled.div`
    padding:10px;
    background-color:#fff;
    margin-bottom:20px;
    padding-bottom:5px;
    
    
     .Sumbit_Cancel_Button_Container{
        margin-top:30px;
        margin-bottom:30px;
        text-align:end;
        button{
            width:200px;
            height:40px;
            margin-right:50px;   
            border:none;
            border-radius:5px;
            color:#fff;
            font-size:1.1em;
          
        }
          :hover{
                cursor:pointer;
            }
    }
    .Select_Delete{
      :hover{
        cursor: pointer;
      }
    }
`
const ConfirmAlertMainDivBox = styled.div`
    background-color:#fff;
    padding:30px;
  .Confirm_Main_Container{
    padding:30px;
    padding-top:0px;
          text-align: left;
          border-radius: 10px;

          .Confirm_Content_Container{
            line-height:50px;
            font-size:1em;
            font-weight:border;
            h4{
              margin-bottom:0px;
            }
            .Content_Padding{
              margin-left:20px;
            }
          }
    
  }
   .btns {
        text-align: end;

        font-size: 1em;
        .btn {
            display: inline-block;
            margin-right: 2px;
            padding: 10px 20px;
            background: none;
            border: 1px solid #c0c0c0;
            border-radius: 2px;
            color: #666;
            font-size: 1em;
            outline: none;
            transition: all 100ms ease-out;
            &:hover,
            &:focus {
                transform: translateY(-3px);
                cursor: pointer;
            }
            &-confirm {
                border: 1px solid #2962ff;
                background: #2962ff;
                color: #fff;
            }
        }
    }

`
const SelectTable = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const Csm_Select_Data = useSelector(state => state.CsmSelectReducer.Csm_Select_Data);
  const Csm_User_input_Data = useSelector((state) => state.CsmUserInputReducer.Csm_User_Input_Data.bind);
  const Csm_User_Select_Data = useSelector((state) => state.CsmUserInputReducer.Csm_User_Input_Data)
  const Loign_Infomation = useSelector((state) => state.LoginInfoDataReducer.Infomation);
  const Csm_Filter_state = useSelector(state => state.CSmFilteringReducer.Csm_Filter_State); 
  //선택 CSM 데이터 삭제
  const handleDeleteData = (Select) => {

    

    //Select_Csm_Reduce_State 삭제
    const Delete_Csm_Select_Data = Csm_Select_Data.filter((list) => list.csm_basic_data_csm_key === Select.csm_basic_data_csm_key ? "" : list);
    dispatch(Csm_Select_Delete_Data(Delete_Csm_Select_Data))

    //Select_Csm_Bind_Data false 처리
    const Checked_Out_Csm_User_input_Data = Csm_User_input_Data.bind_options.map(list => list.csm_Binds_Lists_Data.csm_basic_data_csm_key === Select.csm_basic_data_csm_key ? { ...list, select: false } : list)
    dispatch(Csm_User_Input_Change_Bind_Data(Checked_Out_Csm_User_input_Data));
  }
  

  const User_Input_Data_Sending_Checking_Confirm = () => {
    confirmAlert({
       overlayClassName: "CSM_User_Input_Alert",
      customUI: ({ onClose }) => {
        return <ConfirmAlertMainDivBox>
                    <div className="Confirm_Main_Container">
                        <div>
                          <h2>{Csm_Select_Data.length}건의 CSM에 대해 비용 정산 처리 하시겠습니까?</h2>
                        </div>
                          <div className="Confirm_Content_Container">
              <h4>정산 등록 정보 : </h4>
              <div className="Content_Padding">작업일자 : {moment(Csm_User_Select_Data.start_Date).format("YYYY-MM-DD")} ~ { moment(Csm_User_Select_Data.end_Date).format("YYYY-MM-DD")}</div>
                                <div className="Content_Padding">숙박 :  {Csm_User_Select_Data.lodgment_checked === 'one_day' ? "당일" : `${Csm_User_Select_Data.lodgment_day_count} 일`}</div>
                                <div className="Content_Padding">출발지 : {Csm_User_Select_Data.location_checked === 'Pangyo' ? "판교" : "아산"}</div>
                                <div className="Content_Padding">고객사 : {Csm_User_Select_Data.custom?.custom_checked?.value}</div>
                                <div className="Content_Padding">왕복 이동 횟수 : {Csm_User_Select_Data.Round_Trip_Count} 회</div>
                          </div>
            </div>
            <div className="btns">
                    <button className="btn btn-confirm" onClick={()=> User_Input_Distance_and_Data(()=>onClose())} >
                        

                        <span>처리</span>
                    </button>
                    <button className="btn btn-cancel" onClick={()=>  onClose()} >
                       

                        <span>취소</span>
                    </button>
                </div>
                    
                </ConfirmAlertMainDivBox>
        }
            });
  }



  const User_Input_Distance_and_Data = async (onClose) => {


     if (!Csm_User_Select_Data.custom.custom_checked.value) {
         toast.show({
                title: '고객사 누락',
                content: `고객사의 정보가 누락되었습니다. 03번 항목의 고객사를 선택 해주세요.`,
                duration: 6000,
                successCheck: false,
           });
      return;
    } else if (Csm_Select_Data.length ===0) {
         toast.show({
                title: 'CSM 선택항목 누락',
                content: `CSM 선택의 정보가 누락되었습니다. 등록할 CSM을 선택 해주세요.`,
                duration: 6000,
                successCheck: false,
           });
      return;
    }

    try {
      
      const User_Input_Distance_and_Data_Axios = await request.post(`/CE_Calendar_app_server/User_Input_Distance_and_Data`, {
          Csm_Select_Data,
          Csm_User_Select_Data,
          Loign_Infomation
      })

      if (User_Input_Distance_and_Data_Axios.data.dataSuccess) {
        onClose();
        dispatch(Csm_Select_Reset_Data());
        dispatch(Csm_Baisc_Data_Reduce_Thunk(1, Csm_Filter_state, []));
        dispatch(Csm_User_Input_Reset_Data());
           toast.show({
                title: '데이터 저장성공',
                content: `선택되었던 항목 ${Csm_Select_Data.length}건이 해제처리 되었습니다.`,
                duration: 6000,
                successCheck: true,
           });
        history.push('/Register_Csm');
      } else if (User_Input_Distance_and_Data_Axios.data.NotDataDistance) {
        onClose();
          toast.show({
                title: '고객사 정보 없음',
                content: `선택하신 고객사의 정보가 없습니다. 03번의 선택목록에서 등록 후 다시 시도 바랍니다.`,
                duration: 6000,
                successCheck: false,
           });
      }
        
      

    } catch (error) {
      console.log(error);
      onClose();
    }
  }


  
    return (
        <SelectTableMainDivBox>
            <h4 style={{paddingTop:"30px"}}>선택된 CSM 데이터</h4>
            <TableContainer>
      <Table style={{width:"100%"}}>
        <thead>
          <TableRow>
                        <TableHeader >NO.</TableHeader>
                        <TableHeader>상태</TableHeader>
                        <TableHeader>등급</TableHeader>
                        <TableHeader>CSM</TableHeader>
                        <TableHeader>MODEL</TableHeader>
                        <TableHeader>제번</TableHeader>
                        <TableHeader>최초 납품처</TableHeader>
                <TableHeader>Part 유무</TableHeader>
                <TableHeader>작업시간</TableHeader>
                <TableHeader>작업인원</TableHeader>
                <TableHeader>비고</TableHeader>
                
                        
                
                <TableHeader>제거</TableHeader>
          </TableRow>
        </thead>
        <tbody>
                    {Csm_Select_Data.map((list,j) => {
                        return <TableRow key={list.csm_basic_data_csm_key}>
                          <TableData  >{ j+1}</TableData>
                          <TableData>{list.csm_basic_data_state}</TableData>
                          <TableData>{ list.csm_basic_data_grade}</TableData>
                          <TableData>{ list.csm_basic_data_csm_number}</TableData>
                          <TableData>{ list.csm_basic_data_model_number}</TableData>
                          <TableData>{ list.csm_basic_data_binds}</TableData>
                          <TableData>{ list.csm_basic_data_custom}</TableData>
                          <TableData>{list.csm_basic_data_part_number ? "O" : "X"}</TableData>
                          <TableData>{ list.csm_basic_data_working_hours} 시간</TableData>
                          <TableData>{list.csm_basic_data_working_count} 명</TableData>
                          <TableData>{ list.csm_basic_data_etc}</TableData>
                          <TableData className="Select_Delete" style={{color:"red",fontSize:"0.8em"}} onClick={()=>handleDeleteData(list)}><RiDeleteBin7Fill></RiDeleteBin7Fill></TableData>
                        </TableRow>
                    })}
              <TableRow>
                <TableData colSpan={7}></TableData>
                <TableData >합계 시간</TableData>
                <TableData>{Csm_Select_Data.reduce((pre, next) => { return pre + next.csm_basic_data_working_hours; },0) } 시간</TableData>
                <TableData colSpan={2}></TableData>
              </TableRow>
        </tbody>
      </Table>
        </TableContainer>
        
          <div className="Sumbit_Cancel_Button_Container">  
                <button style={{backgroundColor:"#368"}} onClick={()=>User_Input_Data_Sending_Checking_Confirm()}>등록</button>
            </div>
        </SelectTableMainDivBox>
    )
}

export default SelectTable;