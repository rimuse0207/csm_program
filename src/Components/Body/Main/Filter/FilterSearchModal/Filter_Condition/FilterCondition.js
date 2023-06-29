import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { Csm_Filtering_Change_Data } from "../../../../../../Models/Csm_Filtering_Reducer/CSmFilteringReducer";

const FilterConditionMainDivBox = styled.div`
.All_Filter_Container{
    display:flex;
    flex-flow:wrap;
    .isOn{

    }
    .isOff{
        opacity:0.3;
    }
     .Filter_Search_Main_Container{
        border:1px dashed lightgray;
        padding:10px;
        min-width:200px;
        margin-top:10px;
        margin-bottom:10px;
        margin-right:10px;
        
         .Filter_And_Filter_Container{
            display:flex;
            align-items:center;
            
            .Explain_Text{
                
            }
        }
          .Input_Data_Container{
                
            }
    }
}
.Button_Container{
    text-align:end;
    margin-bottom:20px;
    button{
        height:50px;
        border:none;
        background-color:#368;
        color:white;
        font-weight:bolder;
        width:250px;
        border-radius:5px;
        :hover{
            cursor: pointer;
            background-color:#efefef;
            color:#368;
        }
    }
}

`

const FilterCondition = ({Handle_ReSearch_Submit}) => {
    const dispatch = useDispatch();
    const Csm_Filter_States = useSelector(state => state.CSmFilteringReducer.Csm_Filter_State);
    
    const HandleClickSearchChecked = (Select) => {

        if (Select === "csm_baisc_data_state") {
            dispatch(Csm_Filtering_Change_Data({...Csm_Filter_States, 
            csm_basic_data_state_search_checked:!Csm_Filter_States.csm_basic_data_state_search_checked
            }))                
        } else if (Select === "csm_basic_data_grade") {
            dispatch(Csm_Filtering_Change_Data({...Csm_Filter_States, 
            csm_basic_data_grade_search_checked:!Csm_Filter_States.csm_basic_data_grade_search_checked
            }))    
        }else if (Select === "csm_basic_data_csm_number") {
            dispatch(Csm_Filtering_Change_Data({...Csm_Filter_States, 
            csm_basic_data_csm_number_search_checked:!Csm_Filter_States.csm_basic_data_csm_number_search_checked
            }))    
        }else if (Select === "csm_basic_data_model_number") {
            dispatch(Csm_Filtering_Change_Data({...Csm_Filter_States, 
            csm_basic_data_model_number_search_checked:!Csm_Filter_States.csm_basic_data_model_number_search_checked
            }))    
        }else if (Select === "csm_basic_data_binds") {
            dispatch(Csm_Filtering_Change_Data({...Csm_Filter_States, 
            csm_basic_data_binds_search_checked:!Csm_Filter_States.csm_basic_data_binds_search_checked
            }))    
        }else if (Select === "csm_basic_data_custom") {
            dispatch(Csm_Filtering_Change_Data({...Csm_Filter_States, 
            csm_basic_data_custom_search_checked:!Csm_Filter_States.csm_basic_data_custom_search_checked
            }))    
        }else if (Select === "csm_basic_data_part_number") {
            dispatch(Csm_Filtering_Change_Data({...Csm_Filter_States, 
            csm_basic_data_part_number_search_checked:!Csm_Filter_States.csm_basic_data_part_number_search_checked
            }))    
        }

        
    }
    
    return (
        <FilterConditionMainDivBox>
                <div>
                <div>하기의 조건 추가하여 검색</div>
                <div className="All_Filter_Container">
                    <div className={`Filter_Search_Main_Container ${Csm_Filter_States.csm_basic_data_state !=="All" ? "isOn":"isOff"}`}>
                        <div className="Filter_And_Filter_Container">
                            <div>
                                <input type="checkbox" id="csm_baisc_data_state" value={Csm_Filter_States.csm_basic_data_state_search_checked}  disabled={Csm_Filter_States.csm_basic_data_state !=="All" ? false:true} onChange={()=>HandleClickSearchChecked("csm_baisc_data_state")} checked={Csm_Filter_States.csm_basic_data_state_search_checked} readOnly></input>
                                
                            </div>
                            <div className="Explain_Text">
                                <label htmlFor="csm_baisc_data_state">상태.</label></div>
                        </div>
                        <div className="Input_Data_Container"><div style={{paddingLeft:'10px'}}>{Csm_Filter_States.csm_basic_data_state ? Csm_Filter_States.csm_basic_data_state : ""}
                        </div>
                            <div style={{border:"1px solid lightgray",marginTop:"2px"}}>

                            </div>
                        </div>
                    </div>
                     <div className={`Filter_Search_Main_Container ${Csm_Filter_States.csm_basic_data_grade !=="All" ? "isOn":"isOff"}`}>
                        <div className="Filter_And_Filter_Container">
                            <div>
                                <input type="checkbox" id="csm_basic_data_grade" value={Csm_Filter_States.csm_basic_data_grade_search_checked} disabled={Csm_Filter_States.csm_basic_data_grade !=="All" ? false:true}  onChange={()=>HandleClickSearchChecked("csm_basic_data_grade")} checked={Csm_Filter_States.csm_basic_data_grade_search_checked} readOnly></input>
                                
                            </div>
                            <div className="Explain_Text">
                                <label htmlFor="csm_basic_data_grade">등급.</label></div>
                        </div>
                        <div className="Input_Data_Container"><div style={{paddingLeft:'10px'}}>{Csm_Filter_States.csm_basic_data_grade ? Csm_Filter_States.csm_basic_data_grade : ""}
                        </div>
                            <div style={{border:"1px solid lightgray",marginTop:"2px"}}>

                            </div>
                        </div>
                    </div>
                     <div className={`Filter_Search_Main_Container ${Csm_Filter_States.csm_basic_data_csm_number ? "isOn":"isOff"}`}>
                        <div className="Filter_And_Filter_Container">
                            <div>
                                <input type="checkbox" id="csm_basic_data_csm_number" value={Csm_Filter_States.csm_basic_data_csm_number_search_checked} disabled={!Csm_Filter_States.csm_basic_data_csm_number}  onChange={()=>HandleClickSearchChecked("csm_basic_data_csm_number")} checked={Csm_Filter_States.csm_basic_data_csm_number_search_checked}  readOnly></input>
                                
                            </div>
                            <div className="Explain_Text">
                                <label htmlFor="csm_basic_data_csm_number">CSM번호.</label></div>
                        </div>
                        <div className="Input_Data_Container"><div style={{paddingLeft:'10px'}}>{Csm_Filter_States.csm_basic_data_csm_number ? Csm_Filter_States.csm_basic_data_csm_number : ""}
                        </div>
                            <div style={{border:"1px solid lightgray",marginTop:"2px"}}>

                            </div>
                        </div>
                    </div>
                     <div className={`Filter_Search_Main_Container ${Csm_Filter_States.csm_basic_data_model_number ? "isOn":"isOff"}`}>
                        <div className="Filter_And_Filter_Container">
                            <div>
                                <input type="checkbox" id="csm_basic_data_model_number" value={Csm_Filter_States.csm_basic_data_model_number_search_checked} disabled={!Csm_Filter_States.csm_basic_data_model_number} onChange={()=>HandleClickSearchChecked("csm_basic_data_model_number")} checked={Csm_Filter_States.csm_basic_data_model_number_search_checked} readOnly></input>
                                
                            </div>
                            <div className="Explain_Text">
                                <label htmlFor="csm_basic_data_model_number">장비Model.</label></div>
                        </div>
                        <div className="Input_Data_Container"><div style={{paddingLeft:'10px'}}>{Csm_Filter_States.csm_basic_data_model_number ? Csm_Filter_States.csm_basic_data_model_number : ""}
                        </div>
                            <div style={{border:"1px solid lightgray",marginTop:"2px"}}>

                            </div>
                        </div>
                    </div>
                     <div className={`Filter_Search_Main_Container ${Csm_Filter_States.csm_basic_data_binds ? "isOn":"isOff"}`}>
                        <div className="Filter_And_Filter_Container">
                            <div>
                                <input type="checkbox" id="csm_basic_data_binds" value={Csm_Filter_States.csm_basic_data_binds_search_checked} disabled={!Csm_Filter_States.csm_basic_data_binds} onChange={()=>HandleClickSearchChecked("csm_basic_data_binds")} checked={Csm_Filter_States.csm_basic_data_binds_search_checked} readOnly></input>
                                
                            </div>
                            <div className="Explain_Text">
                                <label htmlFor="csm_basic_data_binds">제번.</label></div>
                        </div>
                        <div className="Input_Data_Container"><div style={{paddingLeft:'10px'}}>{Csm_Filter_States.csm_basic_data_binds ? Csm_Filter_States.csm_basic_data_binds : ""}
                        </div>
                            <div style={{border:"1px solid lightgray",marginTop:"2px"}}>

                            </div>
                        </div>
                    </div>
                     <div className={`Filter_Search_Main_Container ${Csm_Filter_States.csm_basic_data_custom ? "isOn":"isOff"}`}>
                        <div className="Filter_And_Filter_Container">
                            <div>
                                <input type="checkbox" id="csm_basic_data_custom" value={Csm_Filter_States.csm_basic_data_custom_search_checked} disabled={!Csm_Filter_States.csm_basic_data_custom}  onChange={()=>HandleClickSearchChecked("csm_basic_data_custom")} checked={Csm_Filter_States.csm_basic_data_custom_search_checked} readOnly></input>
                                
                            </div>
                            <div className="Explain_Text">
                                <label htmlFor="csm_basic_data_custom">최초 납품처.</label></div>
                        </div>
                        <div className="Input_Data_Container"><div style={{paddingLeft:'10px'}}>{Csm_Filter_States.csm_basic_data_custom ? Csm_Filter_States.csm_basic_data_custom : ""}
                        </div>
                            <div style={{border:"1px solid lightgray",marginTop:"2px"}}>

                            </div>
                        </div>
                    </div>
                     {/* <div className={`Filter_Search_Main_Container ${Csm_Filter_States.csm_basic_data_part_number ? "isOn":"isOff"}`}>
                        <div className="Filter_And_Filter_Container">
                            <div>
                                <input type="checkbox" id="csm_basic_data_part_number" value={Csm_Filter_States.csm_basic_data_part_number_search_checked} disabled={!Csm_Filter_States.csm_basic_data_part_number} onChange={()=>HandleClickSearchChecked("csm_basic_data_part_number")} checked={Csm_Filter_States.csm_basic_data_part_number_search_checked} readOnly></input>
                                
                            </div>
                            <div className="Explain_Text">
                                <label htmlFor="csm_basic_data_part_number">Part NO.</label></div>
                        </div>
                        <div className="Input_Data_Container"><div style={{paddingLeft:'10px'}}>{Csm_Filter_States.csm_basic_data_part_number ? Csm_Filter_States.csm_basic_data_part_number : ""}
                        </div>
                            <div style={{border:"1px solid lightgray",marginTop:"2px"}}>

                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
            <div className="Button_Container">
                <button onClick={()=>Handle_ReSearch_Submit()}>해당 조건으로 다시 검색</button>
            </div>
        </FilterConditionMainDivBox>
    )
}

export default FilterCondition;