import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { request } from "../../../../../APIs";
import moment from "moment";
import { AiOutlineCheck,AiOutlineClose } from "react-icons/ai";
import { toast } from "../../../ToastMessage/ToastManager";


const RequestInfoMainDivBox = styled.div`
    padding:30px;
    display:-webkit-box;
    overflow:auto;
    .Request_Main_Container{
        border:1px solid gray;
        width:600px;
        border-radius:10px;
        margin-right:30px;
        position:relative;
        .Request_Sub_Container{
            font-size:1.1em;
            display:flex;
            align-items:center;
            border-bottom:1px solid lightgray;
            padding:10px;
            flex-flow:wrap;
            .Request_Text{
                
                margin-left:10px;
                padding:10px;
            }
             .Update_Mode_Container{
                margin-left:10px;
                input{
                      height: 30px;
                    border: 1px solid darkgray;
                    padding-left: 10px;
                    border-radius: 5px;
                }
             }
        }
       

    
        .Numbering{
            position:absolute;
            top:-20px;
            left:0px;
            font-size:1.1em;
            font-weight:bolder;
        }
    }


      .btns {
        margin-top:20px;
        margin-bottom:20px;
        text-align: end;
        margin-right:30px;
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

const RequestInfo = () => {
    const [Request_State, setRequest_State] = useState([]);
    const [Select_Update_Data, setSelect_Update_Data] = useState(null);




    const Handle_Update_Mode_Open = (data) => {
        setSelect_Update_Data(data);
        setRequest_State(Request_State.map((list)=>list.csm_distance_request_lists_indexs === data.csm_distance_request_lists_indexs ? {...list,Update_Mode:true}:list))
    }

    const Handle_Cancle_Update_Mode_Close = (data) => {
         setSelect_Update_Data(null);
        setRequest_State(Request_State.map((list)=>list.csm_distance_request_lists_indexs === data.csm_distance_request_lists_indexs ? {...list,Update_Mode:false}:list))
    }


    const Handle_Submit_Request = async (data) => {
        if (!window.confirm("고객사 등록 처리 하시겠습니까?")) {
            return;
        }
        try {
            
            const Handle_Submit_Request_Axios = await request.post(`/CE_Calendar_app_server/Handle_Submit_Request`, {
                Request_State:data
            })

            if (Handle_Submit_Request_Axios.data.dataSuccess) {
                setRequest_State(Request_State.filter((list) => list.csm_distance_request_lists_indexs === data.csm_distance_request_lists_indexs ? "" : list));
                  toast.show({
                    title: '이동거리별 시간 등록 및 메일 발송 완료',
                    content: `${data.name}님이 요청 하신 이동거리별 시간을 등록 및 메일 전송 하였습니다.`,
                    duration: 6000,
                    successCheck: true,
            });
                }

        } catch (error) {
            console.log(error);
        }
    }


    const Handle_Change_Data_Submit_Request = async (data) => {
          if (!window.confirm("수정 후 등록 하시겠습니까?")) {
            return;
        }
        try {
            const Handle_Submit_Request_Axios = await request.post(`/CE_Calendar_app_server/Handle_Submit_Request`, {
                Request_State:Select_Update_Data
            })

            if (Handle_Submit_Request_Axios.data.dataSuccess) {
                setRequest_State(Request_State.filter((list) => list.csm_distance_request_lists_indexs === data.csm_distance_request_lists_indexs ? "" : list));
                  toast.show({
                    title: '이동거리별 시간 등록 및 메일 발송 완료',
                    content: `${data.name}님이 요청 하신 이동거리별 시간을 수정 후 등록 및 메일 전송 하였습니다.`,
                    duration: 6000,
                    successCheck: true,
            });
                }

        } catch (error) {
            console.log(error);
        }
    }


    const Request_Info_Data = async () => {

      

        try {
            
            const Request_Info_Data_Axios = await request.get(`/CE_Calendar_app_server/Request_Distance_Data_Getting`);
            if (Request_Info_Data_Axios.data.dataSuccess) {
                setRequest_State(Request_Info_Data_Axios.data.Request_Distance_Select_Rows)
            }

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        Request_Info_Data(); 
    },[])


    return (
        <RequestInfoMainDivBox>
            {Request_State.map((list,j) => {
                    return <div className="Request_Main_Container">
                        <div className="Numbering">{ j+1}.</div>
                <div className="Request_Sub_Container">
                    <div>
                        <h4>요청자 : </h4>
                            </div>
                            <div className="Request_Text">
                                 {list.name}
                            </div> 
                    
                </div>
                <div className="Request_Sub_Container">
                    <div>
                        <h4>요청일자 : </h4>
                    </div>
                            <div className="Request_Text">
                        {moment(list.csm_distance_request_lists_write_date).format("YYYY-MM-DD HH:mm")}
                    </div>
                </div>
                <div className="Request_Sub_Container">
                    <div>
                        <h4>출발 지역 : </h4>
                            </div>
                           <div className="Request_Text">
                        { list.csm_distance_request_lists_location}
                    </div>
                    
                </div>
                <div className="Request_Sub_Container">
                    <div>
                        <h4> 고객사 명 : </h4>
                            </div>
                            { list.Update_Mode ==='false' || !list.Update_Mode  ?<div className="Request_Text">
                        { list.csm_distance_request_lists_custommer}
                    </div>:<div className="Update_Mode_Container">
                            <input value={Select_Update_Data?.csm_distance_request_lists_custommer} onChange={(e)=>setSelect_Update_Data({...Select_Update_Data,csm_distance_request_lists_custommer : e.target.value})} ></input>
                            </div>}
                    
                </div>
                 <div className="Request_Sub_Container">
                    <div>
                        <h4> 고객사 지역명 : </h4>
                            </div>
                            { list.Update_Mode ==='false' || !list.Update_Mode  ?<div className="Request_Text">
                        { list.csm_distance_request_lists_area}
                    </div>:<div className="Update_Mode_Container">
                            <input value={Select_Update_Data?.csm_distance_request_lists_area} onChange={(e)=>setSelect_Update_Data({...Select_Update_Data,csm_distance_request_lists_area : e.target.value})} ></input>
                            </div>}
                    
                </div>
                 <div className="Request_Sub_Container">
                    <div>
                        <h4> 이동거리 : </h4>
                            </div>
                            {  list.Update_Mode ==='false' || !list.Update_Mode  ?<div className="Request_Text">
                        { list.csm_distance_request_lists_distance} KM
                    </div>:<div className="Update_Mode_Container">
                            <input type="number" value={Select_Update_Data?.csm_distance_request_lists_distance} onChange={(e)=>setSelect_Update_Data({...Select_Update_Data,csm_distance_request_lists_distance : e.target.value})} ></input><span>KM</span>
                            </div>}
                    
                </div>
                 <div className="Request_Sub_Container">
                    <div>
                        <h4> 이동시간 : </h4>
                            </div>
                            { list.Update_Mode ==='false' || !list.Update_Mode  ?<div className="Request_Text">
                        { list.csm_distance_request_lists_distance_time} 시간
                    </div>:<div className="Update_Mode_Container">
                            <input  type="number" value={Select_Update_Data.csm_distance_request_lists_distance_time}  onChange={(e)=>setSelect_Update_Data({...Select_Update_Data,csm_distance_request_lists_distance_time : e.target.value})}></input><span>시간</span>
                            </div>}
                    
                        </div>
                        
                        {  list.Update_Mode ==='false' || !list.Update_Mode  ?<div className="btns">
                            
                    <button className="btn btn-cancel" onClick={()=>{Handle_Update_Mode_Open(list)}} >
                        <span style={{ marginRight: '10px' }}>
                            <AiOutlineClose></AiOutlineClose>
                        </span>

                        <span>수정 후 등록</span>
                    </button>
                    <button className="btn btn-confirm" onClick={()=>{Handle_Submit_Request(list)}} >
                        <span style={{ marginRight: '10px' }}>
                            <AiOutlineCheck></AiOutlineCheck>
                        </span>

                        <span>등록</span>
                    </button>
                </div>:<div className="btns">
                            
                    <button className="btn btn-cancel" onClick={()=>{Handle_Cancle_Update_Mode_Close(list)}} >
                        <span style={{ marginRight: '10px' }}>
                            <AiOutlineClose></AiOutlineClose>
                        </span>
                        <span>취소</span>
                    </button>
                    <button className="btn btn-confirm" onClick={()=>{Handle_Change_Data_Submit_Request(list)}} >
                        <span style={{ marginRight: '10px' }}>
                            <AiOutlineCheck></AiOutlineCheck>
                        </span>

                        <span>수정 후 등록</span>
                    </button>
                </div>}
                        
            </div>
                })}
            <div></div>
        </RequestInfoMainDivBox>
    )
}

export default RequestInfo;