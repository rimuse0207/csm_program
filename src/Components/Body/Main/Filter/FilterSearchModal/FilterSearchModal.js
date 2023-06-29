import React from "react";
import { styled } from "styled-components";
import Modal from "react-modal";
import FilterState from "./Filter_State/FilterState";
import FilterGrade from "./Filter_Grade/FilterGrade"
import FilterCsmNumber from "./Filter_Csm_Number/FilterCsmNumber";
import FilterModelNumber from "./Filter_Model_Number/FilterModelNumber";
import FilterBinds from "./Filter_binds/FilterBinds";
import FilterCustom from "./Filter_Custom/FilterCustom";
import FilterPartNumber from "./Filter_Part_Number/FilterPartNumber";
import { TiDelete } from 'react-icons/ti';



const FilterSearchModalMainDivBox = styled.div`
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

const FilterSearchModal = ({SelectMenuTitle,Close_Filter_Modal}) => {
    return (
        <FilterSearchModalMainDivBox>
            {SelectMenuTitle === "csm_basic_data_state" ? <FilterState SelectMenuTitle={SelectMenuTitle} Close_Filter_Modal={() => Close_Filter_Modal()}></FilterState> : <div></div>}
            {SelectMenuTitle === "csm_basic_data_grade" ? <FilterGrade SelectMenuTitle={SelectMenuTitle} Close_Filter_Modal={() => Close_Filter_Modal()}></FilterGrade> : <div></div>}
            {SelectMenuTitle === "csm_basic_data_csm_number" ? <FilterCsmNumber SelectMenuTitle={SelectMenuTitle} Close_Filter_Modal={() => Close_Filter_Modal()}></FilterCsmNumber> : <div></div>}
            {SelectMenuTitle === "csm_basic_data_model_number" ? <FilterModelNumber SelectMenuTitle={SelectMenuTitle} Close_Filter_Modal={() => Close_Filter_Modal()}></FilterModelNumber> : <div></div>}
            {SelectMenuTitle === "csm_basic_data_binds" ? <FilterBinds SelectMenuTitle={SelectMenuTitle} Close_Filter_Modal={() => Close_Filter_Modal()}></FilterBinds> : <div></div>}
            {SelectMenuTitle === "csm_basic_data_custom" ? <FilterCustom SelectMenuTitle={SelectMenuTitle} Close_Filter_Modal={() => Close_Filter_Modal()}></FilterCustom> : <div></div>}
            {/* {SelectMenuTitle === "csm_basic_data_part_number" ? <FilterPartNumber SelectMenuTitle={SelectMenuTitle} Close_Filter_Modal={() => Close_Filter_Modal()}></FilterPartNumber> : <div></div>} */}
            
            <div className="Close_Modal" onClick={()=>Close_Filter_Modal()}>
                <TiDelete></TiDelete>
            </div>
        </FilterSearchModalMainDivBox>
    )
}

export default FilterSearchModal;