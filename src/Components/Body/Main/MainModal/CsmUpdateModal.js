import React, { useState } from "react";
import { styled } from "styled-components";
import { TiDelete } from "react-icons/ti";
import { BsHandIndexThumbFill,BsFillPencilFill } from "react-icons/bs";
import { FilterSearchMainPageDivBox } from "../Filter/FilterSelect";
import Select from "react-select";
import { request } from "../../../../APIs";
import { useDispatch, useSelector } from "react-redux";
import { Csm_Baisc_Data_Reduce_Thunk } from "../../../../Models/ReduxThunk/Csm_Basic_Data_Reducer/CsmBasicDataReducer";
import { toast } from "../../ToastMessage/ToastManager";

const CsmUpdateModalMainDivBox = styled.div`
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

const CsmUpdateModal = ({ Csm_Basic_Data_Update_Modal_Close, RightMenuClickKeys}) => {
    const dispatch = useDispatch();
    const CsmSelectState = useSelector(state => state.CsmSelectReducer.Csm_Select_Data);
    const Csm_Filter_state = useSelector(state => state.CSmFilteringReducer.Csm_Filter_State)
    const [Pre_Csm_Data, setPre_Csm_Data] = useState(RightMenuClickKeys);
    const [Next_Csm_Data, setNext_Csm_Data] = useState({
        
csm_basic_data_csm_key:RightMenuClickKeys?.csm_apply_csm_key,
csm_basic_data_state:RightMenuClickKeys?.csm_basic_data_state,
csm_basic_data_grade:RightMenuClickKeys?.csm_basic_data_grade,
csm_basic_data_csm_number:RightMenuClickKeys?.csm_basic_data_csm_number,
csm_basic_data_model_number:RightMenuClickKeys?.csm_basic_data_model_number,
csm_basic_data_binds:RightMenuClickKeys?.csm_basic_data_binds,
csm_basic_data_custom:RightMenuClickKeys?.csm_basic_data_custom,
csm_basic_data_part_number:RightMenuClickKeys?.csm_basic_data_part_number,
csm_basic_data_titles:RightMenuClickKeys?.csm_basic_data_titles,
csm_basic_data_etc:RightMenuClickKeys?.csm_basic_data_etc,
csm_basic_data_division:RightMenuClickKeys?.csm_basic_data_division,
csm_basic_data_working_hours:RightMenuClickKeys?.csm_basic_data_working_hours,
csm_basic_data_working_count:RightMenuClickKeys?.csm_basic_data_working_count,

    })


    const handle_Csm_Data_Update_Submit = async () => {
        
        const handle_Csm_Data_Update_Submit_Axios = await request.post('/CE_Calendar_app_server/handle_Csm_Data_Update_Submit', {
            Next_Csm_Data
        })

        if (handle_Csm_Data_Update_Submit_Axios.data.dataSuccess) {
             toast.show({
                title: `데이터 변경 성공`,
                content: `CSM 번호 ${Next_Csm_Data.csm_basic_data_csm_number}의 CSM 데이터를 변경처리하였습니다.`,
                duration: 6000,
                successCheck: true,
             });
            Csm_Basic_Data_Update_Modal_Close();
            dispatch(Csm_Baisc_Data_Reduce_Thunk(1, Csm_Filter_state,CsmSelectState))
        } else {
                toast.show({
                title: `데이터 변경 실패`,
                content: `다시 시도후 IT팀에 문의바랍니다.`,
                duration: 6000,
                successCheck: false,
             });
        }

    }


    return (
        <CsmUpdateModalMainDivBox>
            <div className="Close_Modal" onClick={()=>Csm_Basic_Data_Update_Modal_Close()}>
                <TiDelete></TiDelete>
            </div>

            <h3>CSM 개별 수정</h3>
            <div>
                * CSM 번호 , 제번은 수정이 불가합니다. (key값이 정해져서), 해당 부분을 수정 하고 싶으시면, 삭제 처리 바랍니다.
            </div>
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
                                                checked={Next_Csm_Data.csm_basic_data_state === "Open" ? true : false}
                                                onClick={(e)=>setNext_Csm_Data({...Next_Csm_Data,csm_basic_data_state:e.target.value})}
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
                                                checked={Next_Csm_Data.csm_basic_data_state === "Close" ? true : false}
                                                onClick={(e)=>setNext_Csm_Data({...Next_Csm_Data,csm_basic_data_state:e.target.value})}
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
                                                checked={Next_Csm_Data.csm_basic_data_grade === "CDC" ? true : false}
                                                onClick={(e)=>setNext_Csm_Data({...Next_Csm_Data,csm_basic_data_grade:e.target.value})}
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
                                              checked={Next_Csm_Data.csm_basic_data_grade === "MDC" ? true : false}
                                                onClick={(e)=>setNext_Csm_Data({...Next_Csm_Data,csm_basic_data_grade:e.target.value})}
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
                                               checked={Next_Csm_Data.csm_basic_data_grade === "SDC" ? true : false}
                                                onClick={(e)=>setNext_Csm_Data({...Next_Csm_Data,csm_basic_data_grade:e.target.value})}
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
                                            value={Next_Csm_Data.csm_basic_data_csm_number}
                                            // onChange={(e)=>setNext_Csm_Data({...Next_Csm_Data,csm_basic_data_csm_number:e.target.value})}
                                            readOnly
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
                                            value={Next_Csm_Data.csm_basic_data_model_number}
                                            onChange={(e)=>setNext_Csm_Data({...Next_Csm_Data,csm_basic_data_model_number:e.target.value})}
                                          ></input>
                                            
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
                                          value={Next_Csm_Data.csm_basic_data_binds}
                                            // onChange={(e)=>setNext_Csm_Data({...Next_Csm_Data,csm_basic_data_binds:e.target.value})}'
                                            readOnly
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
                                            value={Next_Csm_Data.csm_basic_data_part_number}
                                            onChange={(e)=>setNext_Csm_Data({...Next_Csm_Data,csm_basic_data_part_number:e.target.value})}
                                         ></input>
                                            
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
                                         value={Next_Csm_Data.csm_basic_data_etc}
                                            onChange={(e)=>setNext_Csm_Data({...Next_Csm_Data,csm_basic_data_etc:e.target.value})}
                                            
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
                                            value={{value:Next_Csm_Data.csm_basic_data_division,label:Next_Csm_Data.csm_basic_data_division}}
                                            onChange={(e)=>setNext_Csm_Data({...Next_Csm_Data,csm_basic_data_division:e.value})}
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
                                value={Next_Csm_Data.csm_basic_data_working_hours}
                                            onChange={(e)=>setNext_Csm_Data({...Next_Csm_Data,csm_basic_data_working_hours:e.target.value})}
                                            
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
                                        <input type="number" placeholder="작원인원"  
                                            value={Next_Csm_Data.csm_basic_data_working_count}
                                            onChange={(e)=>setNext_Csm_Data({...Next_Csm_Data,csm_basic_data_working_count:e.target.value})}
                                            ></input>
                                            
                                        </div>
                                          
                                    </div>
                                </div>
                        </div>
                        
                    </div>
                    <div className="btns">
                  
                    <button className="btn btn-confirm"  style={{marginTop:"40px"}} onClick={()=>handle_Csm_Data_Update_Submit()} >
                        <span>저장</span>
                    </button>
                </div>
                </FilterSearchMainPageDivBox>
            </div>
        </CsmUpdateModalMainDivBox>
    )
}

export default CsmUpdateModal;