import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { request } from "../../../../../../APIs";
import { useDispatch, useSelector } from "react-redux";
import { Csm_Filtering_Change_Data } from "../../../../../../Models/Csm_Filtering_Reducer/CSmFilteringReducer";
import { Loader_Check_For_False, Loader_Check_For_True } from "../../../../../../Models/LoaderCheckReducer/LoaderCheckReducer";
import { FilterStateMainDivBox } from "../Filter_State/FilterState";
import FilterCondition from "../Filter_Condition/FilterCondition";




const FilterModelNumber = ({Close_Filter_Modal,SelectMenuTitle}) => {
    const dispatch = useDispatch();
    const Csm_Filter_States = useSelector(state => state.CSmFilteringReducer.Csm_Filter_State);
    const [List_Csm_State_Data, setList_Csm_State_Data] = useState([]);


    const handleClick_Filter_State = (Select) => {
        dispatch(Csm_Filtering_Change_Data({ ...Csm_Filter_States, csm_basic_data_model_number: Select }))
        Close_Filter_Modal();
    }

    
    const Get_List_Csm_State_Data = async () => {
        dispatch(Loader_Check_For_True());

        try {
            const Get_List_Csm_State_Data_Axios = await request.get('/CE_Calendar_app_server/Get_List_Csm_State_Data', {
                params: {
                    select: SelectMenuTitle,
                    csm_basic_data_state:Csm_Filter_States.csm_basic_data_state_search_checked?Csm_Filter_States.csm_basic_data_state:"",
                    csm_basic_data_grade:Csm_Filter_States.csm_basic_data_grade_search_checked?Csm_Filter_States.csm_basic_data_grade:"",
                    csm_basic_data_csm_number:Csm_Filter_States.csm_basic_data_csm_number_search_checked?Csm_Filter_States.csm_basic_data_csm_number:"",
                    csm_basic_data_model_number:Csm_Filter_States.csm_basic_data_model_number_search_checked?Csm_Filter_States.csm_basic_data_model_number:"",
                    csm_basic_data_binds:Csm_Filter_States.csm_basic_data_binds_search_checked?Csm_Filter_States.csm_basic_data_binds:"",
                    csm_basic_data_custom:Csm_Filter_States.csm_basic_data_custom_search_checked?Csm_Filter_States.csm_basic_data_custom:"",
                    csm_basic_data_part_number:Csm_Filter_States.csm_basic_data_part_number_search_checked?Csm_Filter_States.csm_basic_data_part_number:"",
                }
            })

            if (Get_List_Csm_State_Data_Axios.data.dataSuccess) {
                setList_Csm_State_Data(Get_List_Csm_State_Data_Axios.data.List_Data)
                dispatch(Loader_Check_For_False());
            }
            else {
                dispatch(Loader_Check_For_False());
            }
        } catch (error) {
            console.log(error);
            dispatch(Loader_Check_For_False());
        }
    }

    const Handle_ReSearch_Submit = async() => {
        await Get_List_Csm_State_Data();
    }


    useEffect(() => {
        Get_List_Csm_State_Data(); 
    },[])

    return (
        <FilterStateMainDivBox>
            <div>
                <h3>CSM 장비Model 검색.</h3>
            </div>
            <div>
                <h4>현재 DB에 저장되어 있는 리스트들</h4>
                <FilterCondition Handle_ReSearch_Submit={()=>Handle_ReSearch_Submit()}></FilterCondition>
                <div className="List_Data_Container">
                    <h4>장비 Model List</h4>
                    <ul>
                        {List_Csm_State_Data.map((list) => {
                            return <li>
                                <div onClick={()=>handleClick_Filter_State(list.csm_basic_data_model_number)}>
                                    {list.csm_basic_data_model_number}
                                </div>
                            </li>
                        })}
                    </ul>
                    { List_Csm_State_Data.length ===0 ? <div>데이터 없음.</div>:""}
                </div>
            </div>

        </FilterStateMainDivBox>
    )
}

export default FilterModelNumber;