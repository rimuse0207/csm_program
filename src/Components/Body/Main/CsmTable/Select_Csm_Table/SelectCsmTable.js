import React, { useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import Navigation from '../../../Nav/Navigation';
import InputHotel from './InputHotel/InputHotel';
import InputStart from './InputStart/InputStart';
import InputCustom from './InputCustom/InputCustom';
import InputCsmNumber from './InputCsmNumber/InputCsmNumber';
import InputModelNumber from './InputModelNumber/InputModelNumber';
import SelectTable from './Select_Table/SelectTable';
import InputBinds from './InputBinds/InputBinds';


const SelectCsmTableMainDivBox = styled.div`
    font-size:0.8em;
    background-color:#efefef;
    .Float_Container{
        display:flex;
        justify-content:space-around;
        .Float_Left{
            width:45%;
            font-size:0.9em;
        }
        .Float_Right{
            width:50%;
            border:1px dashed black;
            background-color:#fff;
            padding:10px;
        }
    }
   

`

const SelectCsmTable = () => {
    const ScrollUpRef = useRef();

    useEffect(() => {
        if (ScrollUpRef.current) {
           window.scrollTo({
                top: 0,
                behavior: "smooth" 
            });
       } 
    },[])

    return (
        <SelectCsmTableMainDivBox ref={ScrollUpRef}>
            <Navigation></Navigation>
            <SelectTable></SelectTable>
            <div className="Float_Container">
                <div className="Float_Left">
                    <h4>CSM 조회 및 선택</h4>
                    <div>
                        <InputHotel></InputHotel>
                    </div>
                    <div>
                        <InputStart></InputStart>
                    </div>
                    <div>
                        <InputCustom></InputCustom>
                    </div>
                    <div>
                        <InputCsmNumber></InputCsmNumber>
                    </div>
                    <div><InputModelNumber></InputModelNumber></div>
                </div>
                <div className="Float_Right">
                    <h4>제번 목록</h4>
                    <div style={{ border: "1px dashed lightgray", marginTop: "10px" }}>
                        <InputBinds></InputBinds>
                    </div>
                </div>
            </div>
          
            <div style={{paddingBottom:"150px"}}></div>

        </SelectCsmTableMainDivBox>
    )
}

export default SelectCsmTable;