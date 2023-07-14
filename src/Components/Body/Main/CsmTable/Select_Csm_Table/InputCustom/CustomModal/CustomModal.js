import React, { useState } from "react";
import { styled } from "styled-components";
import { TiDelete } from "react-icons/ti";
import { FilterSearchMainPageDivBox } from "../../../../Filter/FilterSelect";
import { BsHandIndexThumbFill, BsFillPencilFill } from "react-icons/bs";
import { GiPathDistance } from "react-icons/gi";
import { RiTimerFill } from "react-icons/ri";
import { request } from "../../../../../../../APIs";
import { useDispatch, useSelector } from "react-redux";
import { Csm_User_Input_Change_Data } from "../../../../../../../Models/ReduxThunk/Csm_User_Input_Reducer/CSmUserInputReducer";
import { toast } from "../../../../../ToastMessage/ToastManager";
const CustomModalMainDivBox = styled.div`
     position:relative;
    .Close_Modal{
        position:absolute;
        top:0px;
        right:20px;
        color:red;
        :hover{
            cursor: pointer;
        }
    }
    h4{
        font-size:0.9em !important;
    }
`

const CustomModal = ({ setNotCustomModalIsOpen }) => {
    const dispatch = useDispatch();
    const Login_Info = useSelector(state => state.LoginInfoDataReducer.Infomation);
    const Csm_User_Input_Data = useSelector((state)=>state.CsmUserInputReducer.Csm_User_Input_Data)
    const [CustomSelfRegistration, setCustomSelfRegistration] = useState({
        Custom_Start_Place:'판교',
        Custom_Name: "",
        Custom_Location: "",
        Custom_Distance: 0,
        Custom_Time:0,
        
    })

    const HandleSumbitCustom = async () => {
        try {
           
            if (CustomSelfRegistration.Custom_Distance === 0 || CustomSelfRegistration.Custom_Time === 0) {
                 toast.show({
                        title: '고객사 정보 요청 실패',
                        content: `요청 하신 고객사의 이동거리 또는 이동시간이 누락되었습니다. `,
                        duration: 6000,
                        successCheck: false,
                });
                return;

            } else if (!CustomSelfRegistration.Custom_Name || !CustomSelfRegistration.Custom_Location) {
                  toast.show({
                        title: '고객사 정보 요청 실패',
                        content: `요청 하신 고객사의 고객사명 또는 고객사 지역명이 누락되었습니다.`,
                        duration: 6000,
                        successCheck: false,
                });
                return;
            }


            const Registered_Custom_Data_Axios = await request.post(`/CE_Calendar_app_server/Registered_Custom_Data`, {
                CustomSelfRegistration,
                id: Login_Info.Login_id,
                name:Login_Info.Login_name,
                admin_check: Login_Info.Login_Admin_Access,
                
            })
            if (Registered_Custom_Data_Axios.data.dataSuccess) {
                if (Registered_Custom_Data_Axios.data.RequestDBInsertChecking) {
                        toast.show({
                            title: '고객사 등록 요청 발신 완료.',
                            content: `요청 하신 고객사 정보를 담당자에게 요청하였습니다. 담당자가 등록이 완료 후에 다시 등록 바랍니다.`,
                            duration: 6000,
                            successCheck: true,
                    }); 
                } else {
                    dispatch(Csm_User_Input_Change_Data({
                        ...Csm_User_Input_Data,
                        location_checked: CustomSelfRegistration.Custom_Start_Place === '판교' ? "Pangyo":"Asan",
                        custom: {
                            ...Csm_User_Input_Data.custom,
                            custom_checked: {
                                value:`${CustomSelfRegistration.Custom_Name}_${CustomSelfRegistration.Custom_Location}`,
                                label:`${CustomSelfRegistration.Custom_Name} ( ${CustomSelfRegistration.Custom_Location} )`
                            },
                            custom_options: Csm_User_Input_Data.custom.custom_options.concat({
                                 value:`${CustomSelfRegistration.Custom_Name}_${CustomSelfRegistration.Custom_Location}`,
                                label:`${CustomSelfRegistration.Custom_Name} ( ${CustomSelfRegistration.Custom_Location} )`
                            })
                        }
                    }))
                 toast.show({
                title: '고객사 정보 저장성공',
                content: `등록 하신 고객사 정보를 저장 하였습니다. 03번 항목의 고객사를 선택 해 주세요.`,
                duration: 6000,
                successCheck: true,
           }); 
                }
                   
                setNotCustomModalIsOpen();
            } else {
                    toast.show({
                    title: '고객사 정보 요청 실패',
                    content: `IT팀에 문의바랍니다.`,
                    duration: 6000,
                    successCheck: false,
                });
            }

        } catch (error) {
            console.log(error);
        }
        
    }

    return (
        <CustomModalMainDivBox>
           <div className="Close_Modal" onClick={()=>setNotCustomModalIsOpen()}>
                <TiDelete></TiDelete>
            </div>
            <h3>고객사 요청 등록</h3>
            <div>고객사 정보 및 지역 등을 자세하게 작성 바랍니다.</div>
            <div>
                <FilterSearchMainPageDivBox>
                    <div className="FilteringContainer">
                        <div className="SearchInputContainer">
                                <div className="SearchInputContainerTitle">
                                    <h4>출발지역.</h4>
                                </div>
                                <div className="SearchInputContainerSubTitle">
                                    <div className="SearchInputContainerSubTitleFlexDivBox">
                                        <div className="IconsDivBox">
                                            <label>
                                                <BsHandIndexThumbFill></BsHandIndexThumbFill>
                                            </label>
                                        </div>
                                         <div className="InputRadioDivBox">
                                            
                                            <div>
                                                <input type="radio"
                                                    name="state"
                                                    value="판교"
                                                    id="state_Open"
                                                    checked={CustomSelfRegistration.Custom_Start_Place === "판교" ? true : false}
                                                    onChange={(e) => setCustomSelfRegistration({
                                                        ...CustomSelfRegistration,
                                                        Custom_Start_Place:e.target.value
                                                    })}
                                                    ></input>
                                                    <label  htmlFor="state_Open">
                                                        판교
                                                    </label>
                                            </div>
                                             <div>
                                                <input type="radio"
                                                    name="state"
                                                    value="아산"
                                                    id="state_Close"
                                                    checked={CustomSelfRegistration.Custom_Start_Place === "아산" ? true : false}
                                                onChange={(e) => setCustomSelfRegistration({
                                                        ...CustomSelfRegistration,
                                                        Custom_Start_Place:e.target.value
                                                    })}
                                                    ></input>
                                                    <label  htmlFor="state_Close">
                                                    아산
                                                    </label>
                                            </div>
                                        </div>
                                       
                                    </div>
                                </div>
                        </div>
                        <div className="SearchInputContainer">
                                <div className="SearchInputContainerTitle">
                                    <h4></h4>
                                </div>
                                <div className="SearchInputContainerSubTitle">
                                    
                                </div>
                        </div>
                            <div className="SearchInputContainer">
                                <div className="SearchInputContainerTitle">
                                    <h4>고객사 명.</h4>
                                </div>
                                <div className="SearchInputContainerSubTitle">
                                    <div className="SearchInputContainerSubTitleFlexDivBox">
                                        <div className="IconsDivBox">
                                            <label>
                                                <BsFillPencilFill></BsFillPencilFill>
                                            </label>
                                        </div>
                                        <div className="InputDivBox">
                                        <input type="text" placeholder="고객사 명"
                                            value={CustomSelfRegistration.Custom_Name}
                                            onChange={(e) => setCustomSelfRegistration({
                                                        ...CustomSelfRegistration,
                                                        Custom_Name:e.target.value
                                            })}
                                        ></input>
                                        </div>
                                          
                                    </div>
                                </div>
                            </div>
                            
                        
                        <div className="SearchInputContainer">
                                <div className="SearchInputContainerTitle">
                                    <h4>이동거리. </h4>
                                </div>
                                <div className="SearchInputContainerSubTitle">
                                    <div className="SearchInputContainerSubTitleFlexDivBox">
                                        <div className="IconsDivBox">
                                            <label>
                                                <GiPathDistance></GiPathDistance>
                                            </label>
                                        </div>
                                         <div className="InputDivBox">
                                        <input type="number" placeholder="이동거리 (KM 단위 입니다.)"
                                            value={CustomSelfRegistration.Custom_Distance}
                                            onChange={(e) => setCustomSelfRegistration({
                                                        ...CustomSelfRegistration,
                                                        Custom_Distance:e.target.value
                                            })}></input>
                                            
                                    </div>
                                      <div className="InputDivBox">
                                        <h4>KM</h4>
                                     </div>
                                    </div>
                                </div>
                        </div>
                        <div className="SearchInputContainer">
                                <div className="SearchInputContainerTitle">
                                    <h4 style={{lineHeight:"20px"}}>고객사<br/> 지역명.</h4>
                                </div>
                                <div className="SearchInputContainerSubTitle">
                                    <div className="SearchInputContainerSubTitleFlexDivBox">
                                        <div className="IconsDivBox">
                                            <label>
                                                <BsFillPencilFill></BsFillPencilFill>
                                            </label>
                                        </div>
                                        <div className="InputDivBox">
                                           <input type="text" placeholder="고객사 지역명" value={CustomSelfRegistration.Custom_Location} onChange={(e) => setCustomSelfRegistration({
                                                        ...CustomSelfRegistration,
                                                        Custom_Location:e.target.value
                                            })}></input>
                                            
                                        </div>
                                          
                                    </div>
                                </div>
                        </div>
                        <div className="SearchInputContainer">
                                <div className="SearchInputContainerTitle">
                                    <h4>이동시간. </h4>
                                </div>
                                <div className="SearchInputContainerSubTitle">
                                    <div className="SearchInputContainerSubTitleFlexDivBox">
                                        <div className="IconsDivBox">
                                            <label>
                                                <RiTimerFill></RiTimerFill>
                                            </label>
                                        </div>
                                         <div className="InputDivBox">
                                        <input type="number" placeholder="이동시간 (시간 단위 입니다.)"
                                            value={CustomSelfRegistration.Custom_Time}
                                            onChange={(e) => setCustomSelfRegistration({
                                                        ...CustomSelfRegistration,
                                                        Custom_Time:e.target.value
                                            })}></input>
                                        
                                    </div>
                                    <div className="InputDivBox">
                                        <h4>시간</h4>
                                     </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div className="btns">
                  
                    <button className="btn btn-confirm" onClick={()=>{HandleSumbitCustom()}} style={{marginTop:"40px"}} >
                        <span>고객사 등록 요청</span>
                    </button>
                </div>
                </FilterSearchMainPageDivBox>
            </div>
        </CustomModalMainDivBox>
    )
}

export default CustomModal;