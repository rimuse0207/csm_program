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


    const Handle_Submit_Request = async (data) => {
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



    const Request_Info_Data = async () => {
        try {
            
            const Request_Info_Data_Axios = await request.get(`/CE_Calendar_app_server/Request_Distance_Data_Getting`);
            
            if (Request_Info_Data_Axios.data.dataSuccess) {
                console.log(Request_Info_Data_Axios);
                setRequest_State(Request_Info_Data_Axios.data.Request_Distance_Select_Rows)
            }

        } catch (error) {
            console.log()
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
                    <div className="Request_Text">
                        { list.csm_distance_request_lists_custommer}
                    </div>
                </div>
                 <div className="Request_Sub_Container">
                    <div>
                        <h4> 고객사 지역명 : </h4>
                    </div>
                    <div className="Request_Text">
                        { list.csm_distance_request_lists_area}
                    </div>
                </div>
                 <div className="Request_Sub_Container">
                    <div>
                        <h4> 이동거리 : </h4>
                    </div>
                    <div className="Request_Text">
                        { list.csm_distance_request_lists_distance} KM
                    </div>
                </div>
                 <div className="Request_Sub_Container">
                    <div>
                        <h4> 이동시간 : </h4>
                    </div>
                    <div className="Request_Text">
                        { list.csm_distance_request_lists_distance_time} 시간
                    </div>
                        </div>
                        
                     <div className="btns">
                    <button className="btn btn-cancel" onClick={()=>{}} >
                        <span style={{ marginRight: '10px' }}>
                            <AiOutlineClose></AiOutlineClose>
                        </span>

                        <span>거절</span>
                    </button>
                    <button className="btn btn-confirm" onClick={()=>{Handle_Submit_Request(list)}} >
                        <span style={{ marginRight: '10px' }}>
                            <AiOutlineCheck></AiOutlineCheck>
                        </span>

                        <span>등록</span>
                    </button>
                </div>
            </div>
                })}
            <div></div>
        </RequestInfoMainDivBox>
    )
}

export default RequestInfo;