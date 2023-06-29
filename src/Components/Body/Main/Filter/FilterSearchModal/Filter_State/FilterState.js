import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { request } from "../../../../../../APIs";
import { useDispatch, useSelector } from "react-redux";
import { Csm_Filtering_Change_Data } from "../../../../../../Models/Csm_Filtering_Reducer/CSmFilteringReducer";
import { Loader_Check_For_False, Loader_Check_For_True } from "../../../../../../Models/LoaderCheckReducer/LoaderCheckReducer";
import FilterCondition from "../Filter_Condition/FilterCondition";

export const FilterStateMainDivBox = styled.div`
    
    .List_Data_Container{
        min-height:50vh;
        border:1px dashed gray;
        padding:10px;

        ul{
            display:flex;
                flex-flow: wrap;

            li{
               
                border:1px dashed lightgray;
                padding:10px;
                margin-right:10px;
                margin-bottom:10px;
                font-size:0.7em;
                font-weight:bolder;
                :hover{
                    cursor: pointer;
                    color:red;
                    
                }
                
                
            }
        }
    }
   
   
`

const FilterState = ({Close_Filter_Modal,SelectMenuTitle}) => {
    const dispatch = useDispatch();
    const Csm_Filter_States = useSelector(state => state.CSmFilteringReducer.Csm_Filter_State);
    const [List_Csm_State_Data, setList_Csm_State_Data] = useState([]);


    const handleClick_Filter_State = (Select) => {
        dispatch(Csm_Filtering_Change_Data({ ...Csm_Filter_States, csm_basic_data_state: Select }))
        Close_Filter_Modal();
    }

    
    const Get_List_Csm_State_Data = async () => {
        dispatch(Loader_Check_For_True());

        try {
            const Get_List_Csm_State_Data_Axios = await request.get('/CE_Calendar_app_server/Get_List_Csm_State_Data', {
                params: {
                    select:SelectMenuTitle
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
                <h3>CSM 상태 검색.</h3>
            </div>
            
            <div>
                <h4>현재 DB에 저장되어 있는 리스트들</h4>
                <FilterCondition Handle_ReSearch_Submit={()=>Handle_ReSearch_Submit()}></FilterCondition>
                <div className="List_Data_Container">
                    <h4>상태 List</h4>
                    <ul>
                        {List_Csm_State_Data.map((list) => {
                            return <li>
                                <div onClick={()=>handleClick_Filter_State(list.csm_basic_data_state)}>
                                    {list.csm_basic_data_state}
                                </div>
                            </li>
                        })}
                    </ul>
                </div>
            </div>

        </FilterStateMainDivBox>
    )
}

export default FilterState;