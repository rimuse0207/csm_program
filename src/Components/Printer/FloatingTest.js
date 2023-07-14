import React, { useState } from "react";
import { styled } from "styled-components";
import { MdOutlineClose } from "react-icons/md";
import { ImArrowUp } from "react-icons/im";
import { BiCalculator } from "react-icons/bi";
import { useSelector } from "react-redux";
import PageNation from "../Body/Main/PageNation/PageNation";

const FloatingTestMainDivBox = styled.div`
    width:70%;
    background-color:#211F2B;
    position:fixed;
    bottom:30px;
    border:1px solid black;
    border-radius:120px;
    margin: 0 auto;
   left: 0;
   right: 0;
   ul{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding: 0;
    padding-left: 30px;
    padding-right: 30px;
    li{
        color:#fff;
        font-size:1.1em;
    }
    .Select_Count_Container{
        display:flex;
        min-width:180px;
        justify-content:space-around;
        align-items:center;
        font-size:1.1em;
        .Close_Icon_Container{
            font-size:1.3em;
            line-height:10px;
            margin-right:10px;
            :hover{
                cursor: pointer;
            }
        }
    }
    .Blew_Container{
        display:flex;
        min-width:100px;
        justify-content:space-around;
        font-size:1.2em;
        font-weight:bolder;
        padding:10px;
        background-color:#3C3C4C;
        border-radius:100px;
        :hover{
            cursor: pointer;
        }
        .Icon_Container{
            margin-right:10px;
        }
    }
   }
`

const FloatingTest = () => {
    const totalPages = useSelector(state => state.CsmBasicDataReducer.Csm_Basic_Data_State.All_Count);
    const CsmSelectState = useSelector(state => state.CsmSelectReducer.Csm_Select_Data);
    const [PageNumbers, setPageNumbers] = useState(1);
    return (
        <FloatingTestMainDivBox>
            <ul>
                <div className="Select_Count_Container">
                    <li className="Close_Icon_Container"><MdOutlineClose></MdOutlineClose></li>
                    <li>{ CsmSelectState.length}</li>
                        <li>items selected</li>
                </div>               
                <div>
                    <PageNation totalPagesss={totalPages} setCurrentPage={(data) => setPageNumbers(data)} currentPage={PageNumbers}></PageNation>
                </div>
                <li className="Blew_Container">
                    <div style={{ transform: "rotate(180deg)"}} className="Icon_Container"><ImArrowUp></ImArrowUp></div>
                    <div>DOWN</div>
                </li>
                <li className="Blew_Container">
                    <div className="Icon_Container"><ImArrowUp></ImArrowUp></div>
                    <div>UP</div>
                </li>
                <li className="Blew_Container">
                    <div className="Icon_Container"><BiCalculator></BiCalculator></div>
                    <div>비용 정산</div>
                </li>
            </ul>
        </FloatingTestMainDivBox>
    )
}

export default FloatingTest;