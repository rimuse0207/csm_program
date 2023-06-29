import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { FilterSearchMainPageDivBox } from "../Filter/FilterSelect";
import { BsHandIndexThumbFill, BsFillPencilFill } from "react-icons/bs"
import { TiDelete } from "react-icons/ti";
import { RiTimerFill } from "react-icons/ri";
import { GiPathDistance } from "react-icons/gi";
import Select  from "react-select"
import { request } from "../../../../APIs";
import { useDispatch, useSelector } from "react-redux";
import { Csm_Baisc_Data_Reduce_Thunk } from "../../../../Models/ReduxThunk/Csm_Basic_Data_Reducer/CsmBasicDataReducer";
import {toast} from "../../ToastMessage/ToastManager"

const CsmAddModalMainDivBox = styled.div`
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
`

const CsmAddModal = ({ setCsmAddModalISOpen }) => {
    const dispatch = useDispatch();
    const CsmSelectState = useSelector(state => state.CsmSelectReducer.Csm_Select_Data);
    const Csm_Filter_state = useSelector(state => state.CSmFilteringReducer.Csm_Filter_State)
    const [Csm_basic_Data_For_Input, setCsm_basic_Data_For_Input] = useState({
            csm_basic_data_state:'Open',
            csm_basic_data_grade:'CDC',
            csm_basic_data_csm_number:'',
            csm_basic_data_model_number:'',
            csm_basic_data_binds:'',
            csm_basic_data_custom:'',
            csm_basic_data_part_number:'',
            csm_basic_data_etc:'',
            csm_basic_data_division:'',
            csm_basic_data_working_hours:0,
            csm_basic_data_working_count:0,
    })

    const Handle_Click_Csm_Add = async () => {
        
        if (!Csm_basic_Data_For_Input.csm_basic_data_csm_number || !Csm_basic_Data_For_Input.csm_basic_data_model_number || !Csm_basic_Data_For_Input.csm_basic_data_binds || !Csm_basic_Data_For_Input.csm_basic_data_custom || Csm_basic_Data_For_Input.csm_basic_data_working_hours === 0 || Csm_basic_Data_For_Input.csm_basic_data_working_count === 0) {
              toast.show({
                title: `공란을 전부 적어주세요.`,
                content: `공란을 전부 적으신 후 다시 시도 바랍니다.`,
                duration: 6000,
                successCheck: false,
                });
            return;
        }

        try {


            const Handle_Click_Csm_Add_Axios = await request.post(`/CE_Calendar_app_server/Csm_Add_Manual_Registration`, {
                Csm_basic_Data_For_Input
            })

            if (Handle_Click_Csm_Add_Axios.data.dataSuccess) {
                //데이터 추가 성공
                toast.show({
                title: `데이터 추가 성공`,
                content: `CSM 번호 ${Csm_basic_Data_For_Input.csm_basic_data_csm_number}의 CSM 데이터를 추가하였습니다.`,
                duration: 6000,
                successCheck: true,
                });
                
                dispatch(Csm_Baisc_Data_Reduce_Thunk(1, Csm_Filter_state, CsmSelectState));
                
                setCsmAddModalISOpen();
                
            } else if (Handle_Click_Csm_Add_Axios.data.DupleData) {
                toast.show({
                title: '데이터 추가 실패',
                content: `요청하신 데이터는 현재 등록되어 있는 상태입니다. 다시 한번 확인 바랍니다.`,
                duration: 6000,
                successCheck: false,
           });
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <CsmAddModalMainDivBox>
            <div className="Close_Modal" onClick={()=>setCsmAddModalISOpen()}>
                <TiDelete></TiDelete>
            </div>
            <h3>CSM 개별 등록</h3>
            <div>
                <FilterSearchMainPageDivBox>
                    <div className="FilteringContainer">
                        <div className="SearchInputContainer">
                                <div className="SearchInputContainerTitle">
                                    <h4>상태.</h4>
                                </div>
                                <div className="SearchInputContainerSubTitle">
                                    <div className="SearchInputContainerSubTitleFlexDivBox">
                                        <div className="IconsDivBox">
                                            <label>
                                                <BsHandIndexThumbFill></BsHandIndexThumbFill>
                                            </label>
                                        </div>
                                         <div className="InputRadioDivBox" >
                                            <div >
                                                <input type="radio"
                                                    name="Add_State"
                                                    value="Open"
                                                    id="Add_state_Open"
                                                checked={Csm_basic_Data_For_Input.csm_basic_data_state === "Open"}
                                                onChange={(e)=>setCsm_basic_Data_For_Input({...Csm_basic_Data_For_Input,csm_basic_data_state:e.target.value})}
                                                    ></input>
                                                    <label  htmlFor="Add_state_Open">
                                                        Open
                                                    </label>
                                            </div>
                                             <div >
                                                <input type="radio"
                                                    name="Add_State"
                                                    value="Close"
                                                    id="Add_state_Close"
                                                checked={Csm_basic_Data_For_Input.csm_basic_data_state === "Close"}
                                                onChange={(e)=>setCsm_basic_Data_For_Input({...Csm_basic_Data_For_Input,csm_basic_data_state:e.target.value})}
                                                    ></input>
                                                    <label  htmlFor="Add_state_Close">
                                                    Close
                                                    </label>
                                            </div>
                                        </div>
                                       
                                    </div>
                                </div>
                        </div>
                       
                            <div className="SearchInputContainer">
                                <div className="SearchInputContainerTitle">
                                    <h4>등급.</h4>
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
                                                    name="Add_grade"
                                                    value="CDC"
                                                    id="Add_CDC"
                                                checked={Csm_basic_Data_For_Input.csm_basic_data_grade === "CDC"}
                                                onChange={(e)=>setCsm_basic_Data_For_Input({...Csm_basic_Data_For_Input,csm_basic_data_grade:e.target.value})}
                                                    ></input>
                                                    <label  htmlFor="Add_CDC">
                                                        CDC
                                                    </label>
                                            </div>
                                             <div>
                                                <input type="radio"
                                                    name="Add_grade"
                                                    value="MDC"
                                                    id="Add_MDC"
                                                checked={Csm_basic_Data_For_Input.csm_basic_data_grade === "MDC"}
                                                onChange={(e)=>setCsm_basic_Data_For_Input({...Csm_basic_Data_For_Input,csm_basic_data_grade:e.target.value})}
                                                    ></input>
                                                    <label  htmlFor="Add_MDC">
                                                    MDC
                                                    </label>
                                        </div>
                                         <div>
                                                <input type="radio"
                                                    name="Add_grade"
                                                    value="SDC"
                                                id="Add_SDC"
                                                checked={Csm_basic_Data_For_Input.csm_basic_data_grade === "SDC"}
                                                onChange={(e)=>setCsm_basic_Data_For_Input({...Csm_basic_Data_For_Input,csm_basic_data_grade:e.target.value})}
                                                    ></input>
                                                    <label  htmlFor="Add_SDC">
                                                    SDC
                                                    </label>
                                            </div>
                                        </div>
                                          
                                    </div>
                                </div>
                            </div>
                            
                        
                        <div className="SearchInputContainer">
                                <div className="SearchInputContainerTitle">
                                    <h4>CSM 번호. </h4>
                                </div>
                                <div className="SearchInputContainerSubTitle">
                                    <div className="SearchInputContainerSubTitleFlexDivBox">
                                        <div className="IconsDivBox">
                                            <label>
                                                <BsFillPencilFill></BsFillPencilFill>
                                            </label>
                                        </div>
                                         <div className="InputDivBox">
                                        <input type="text" placeholder="CSM 번호 (SDCXXXX)"
                                            value ={Csm_basic_Data_For_Input.csm_basic_data_csm_number}
                                            onChange={(e)=>setCsm_basic_Data_For_Input({...Csm_basic_Data_For_Input,csm_basic_data_csm_number:e.target.value})}
                                           ></input>
                                            
                                        </div>
                                    </div>
                                </div>
                        </div>
                        <div className="SearchInputContainer">
                                <div className="SearchInputContainerTitle">
                                    <h4>장비Model</h4>
                                </div>
                                <div className="SearchInputContainerSubTitle">
                                    <div className="SearchInputContainerSubTitleFlexDivBox">
                                        <div className="IconsDivBox">
                                            <label>
                                                <BsFillPencilFill></BsFillPencilFill>
                                            </label>
                                        </div>
                                        <div className="InputDivBox">
                                        <input type="text" placeholder="장비Model"
                                            value={Csm_basic_Data_For_Input.csm_basic_data_model_number}
                                            onChange={(e)=>setCsm_basic_Data_For_Input({...Csm_basic_Data_For_Input,csm_basic_data_model_number:e.target.value})}></input>
                                            
                                        </div>
                                          
                                    </div>
                                </div>
                        </div>
                        <div className="SearchInputContainer">
                                <div className="SearchInputContainerTitle">
                                    <h4>제번. </h4>
                                </div>
                                <div className="SearchInputContainerSubTitle">
                                    <div className="SearchInputContainerSubTitleFlexDivBox">
                                        <div className="IconsDivBox">
                                            <label>
                                                <BsFillPencilFill></BsFillPencilFill>
                                            </label>
                                        </div>
                                         <div className="InputDivBox">
                                        <input type="text" placeholder="제번"
                                            value={Csm_basic_Data_For_Input.csm_basic_data_binds}
                                            onChange={(e)=>setCsm_basic_Data_For_Input({...Csm_basic_Data_For_Input,csm_basic_data_binds:e.target.value})}
                                           ></input>
                                            
                                        </div>
                                    </div>
                                </div>
                        </div>
                        <div className="SearchInputContainer">
                                <div className="SearchInputContainerTitle">
                                    <h4>최초납품처. </h4>
                                </div>
                                <div className="SearchInputContainerSubTitle">
                                    <div className="SearchInputContainerSubTitleFlexDivBox">
                                        <div className="IconsDivBox">
                                            <label>
                                                <BsFillPencilFill></BsFillPencilFill>
                                            </label>
                                        </div>
                                         <div className="InputDivBox">
                                        <input type="text" placeholder="최초납품처"
                                            value={Csm_basic_Data_For_Input.csm_basic_data_custom}
                                            onChange={(e)=>setCsm_basic_Data_For_Input({...Csm_basic_Data_For_Input,csm_basic_data_custom:e.target.value})}
                                           ></input>
                                            
                                        </div>
                                    </div>
                                </div>
                        </div>
                         <div className="SearchInputContainer">
                                <div className="SearchInputContainerTitle">
                                    <h4>Part 유무</h4>
                                </div>
                                <div className="SearchInputContainerSubTitle">
                                    <div className="SearchInputContainerSubTitleFlexDivBox">
                                        <div className="IconsDivBox">
                                            <label>
                                                <BsFillPencilFill></BsFillPencilFill>
                                            </label>
                                        </div>
                                        <div className="InputDivBox">
                                        <input type="text" placeholder="데이터 입력 시 (유)로 표시됩니다."
                                           value={Csm_basic_Data_For_Input.csm_basic_data_part_number}
                                            onChange={(e)=>setCsm_basic_Data_For_Input({...Csm_basic_Data_For_Input,csm_basic_data_part_number:e.target.value})}></input>
                                            
                                        </div>
                                          
                                    </div>
                                </div>
                        </div>
                         <div className="SearchInputContainer">
                                <div className="SearchInputContainerTitle">
                                    <h4>비고</h4>
                                </div>
                                <div className="SearchInputContainerSubTitle">
                                    <div className="SearchInputContainerSubTitleFlexDivBox">
                                        <div className="IconsDivBox">
                                            <label>
                                                <BsFillPencilFill></BsFillPencilFill>
                                            </label>
                                        </div>
                                        <div className="InputDivBox">
                                        <input type="text" placeholder="비고"
                                            value={Csm_basic_Data_For_Input.csm_basic_data_etc}
                                            onChange={(e)=>setCsm_basic_Data_For_Input({...Csm_basic_Data_For_Input,csm_basic_data_etc:e.target.value})}
                                            
                                        ></input>
                                            
                                        </div>
                                          
                                    </div>
                                </div>
                        </div>
                         <div className="SearchInputContainer">
                                <div className="SearchInputContainerTitle">
                                    <h4>구분</h4>
                                </div>
                                <div className="SearchInputContainerSubTitle">
                                    <div className="SearchInputContainerSubTitleFlexDivBox">
                                        <div className="IconsDivBox">
                                            <label>
                                                <BsFillPencilFill></BsFillPencilFill>
                                            </label>
                                        </div>
                                        <div className="InputDivBox">
                                        <Select
                                            onChange={(e)=>setCsm_basic_Data_For_Input({...Csm_basic_Data_For_Input,csm_basic_data_division:e.value})}
                                            name="custom"
                                            options={[{value:"GRINDER",label:"GRINDER"},{value:"DICER",label:"DICER"},{value:"LASER",label:"LASER"}]}
                                            className="basic-multi-select"
                                            classNamePrefix="select"></Select>
                                            
                                        </div>
                                          
                                    </div>
                                </div>
                        </div>
                        <div className="SearchInputContainer">
                                <div className="SearchInputContainerTitle">
                                    <h4></h4>
                                </div>
                                <div className="SearchInputContainerSubTitle">
                                    <div className="SearchInputContainerSubTitleFlexDivBox">
                                       
                                          
                                    </div>
                                </div>
                        </div>
                         <div className="SearchInputContainer">
                                <div className="SearchInputContainerTitle">
                                    <h4>작업시간</h4>
                                </div>
                                <div className="SearchInputContainerSubTitle">
                                    <div className="SearchInputContainerSubTitleFlexDivBox">
                                        <div className="IconsDivBox">
                                            <label>
                                                <BsFillPencilFill></BsFillPencilFill>
                                            </label>
                                        </div>
                                        <div className="InputDivBox">
                                        <input type="number" placeholder="작업시간"
                                        value={Csm_basic_Data_For_Input.csm_basic_data_working_hours}
                                            onChange={(e)=>setCsm_basic_Data_For_Input({...Csm_basic_Data_For_Input,csm_basic_data_working_hours:e.target.value})}
                                        ></input>
                                            
                                        </div>
                                          
                                    </div>
                                </div>
                        </div>
                        <div className="SearchInputContainer">
                                <div className="SearchInputContainerTitle">
                                    <h4>작업인원</h4>
                                </div>
                                <div className="SearchInputContainerSubTitle">
                                    <div className="SearchInputContainerSubTitleFlexDivBox">
                                        <div className="IconsDivBox">
                                            <label>
                                                <BsFillPencilFill></BsFillPencilFill>
                                            </label>
                                        </div>
                                        <div className="InputDivBox">
                                           <input type="number" placeholder="작원인원"  value={Csm_basic_Data_For_Input.csm_basic_data_working_count}
                                            onChange={(e)=>setCsm_basic_Data_For_Input({...Csm_basic_Data_For_Input,csm_basic_data_working_count:e.target.value})}></input>
                                            
                                        </div>
                                          
                                    </div>
                                </div>
                        </div>
                        
                    </div>
                    <div className="btns">
                  
                    <button className="btn btn-confirm" onClick={()=>{Handle_Click_Csm_Add()}} style={{marginTop:"40px"}} >
                       

                        <span>저장</span>
                    </button>
                </div>
                </FilterSearchMainPageDivBox>
            </div>
        </CsmAddModalMainDivBox>
    )
}

export default CsmAddModal;