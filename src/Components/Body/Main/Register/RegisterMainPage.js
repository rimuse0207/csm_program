import React, { useState } from "react";
import { styled } from "styled-components";
import Navigation from "../../Nav/Navigation";
import RegisterTable from "./RegisterTable/RegisterTable";
import FilterSelect from "../Filter/FilterSelect";
import { FloatingMenu, MainButton, ChildButton } from 'react-floating-button-menu';
import { ImCancelCircle } from "react-icons/im";
import { AiOutlineMenu } from "react-icons/ai"
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import BasicRegisterTable from "./RegisterTable/BasicRegisterTable/BasicRegisterTable";
import AdminRegisterTable from "./RegisterTable/AdminRegisterTable/AdminRegisterTable";


const RegisterMainPageMainDivBox = styled.div`
    font-size:0.8em;
     .FloatingMenu_Container {
        position: fixed;
        bottom: 50px;
        right: 100px;
        z-index: 99;
        cursor: pointer;
    }

    .Floating1 {
        
        .distance {
            display: none;
        }
        position: relative;
        :hover {
            .distance {
                width: 200px;
                height: 40px;
                line-height: 35px;
                display: block;
                position: absolute;
                top: -20px;
                left: -200px;
                background-color: #fff;
                border: 1px solid gray;
                border-radius: 10px;
                font-size: 1.5em;
                text-align: center;
                z-index: 999;
            }
        }

        .Select_Count_Container{
            font-size:0.7em;
            width:20px;
            height:20px;
            line-height:20px;
            border-radius:50%;
            text-align:center;
            position:absolute;
            top:-18px;
            right:-18px;
            background-color:red;
            color:#fff;
            
        }
    }
`

const RegisterMainPage = () => {
    const Csm_Invoice_Select_State = useSelector((state) => state.CsmInvoiceSelectReducer.Csm_Invoice_Select_Data);
    const [UseRegisterSearch, setUseRegisterSearch] = useState(true);
    const [FloatingMenuChecking, setFloatingMenuChecking] = useState(true);
    const Login_Info = useSelector(state => state.LoginInfoDataReducer.Infomation);
    return (
        <RegisterMainPageMainDivBox>
            <Navigation></Navigation>
            <FilterSelect UseRegisterSearch={UseRegisterSearch}></FilterSelect>
            {Login_Info.Login_Admin_Access ? <AdminRegisterTable></AdminRegisterTable>:<BasicRegisterTable></BasicRegisterTable>}
            
        {Login_Info.Login_Admin_Access ?<div className="FloatingMenu_Container" >
                        <FloatingMenu slideSpeed={500} direction="up" spacing={8} isOpen={FloatingMenuChecking}>
                            <MainButton
                                iconActive={<ImCancelCircle style={{ fontSize: 20, backgroundColor: 'white', color: 'black' }} />}
                                iconResting={<AiOutlineMenu style={{ fontSize: 20, backgroundColor: 'white', color: 'black' }} />}
                                size={56}
                                isOpen={true}
                                background={'white'}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setFloatingMenuChecking(!FloatingMenuChecking);
                                }}
                            ></MainButton>

                    
                            <ChildButton
                                 icon={
                                        <Link to="/Register_Csm/Invoice_Input_Data">
                                                <div className="Floating1">
                                                    <div className="distance">인보이스 처리</div>
                                                    <FaFileInvoiceDollar style={{ fontSize: 20, backgroundColor: 'white', color: '#375b31' }} />
                                                    <div className="Select_Count_Container">
                                                        {Csm_Invoice_Select_State.length}
                                                    </div>
                                            </div>
                                            </Link>
                                    }
                                    background={'white'}
                                    size={40}
                                    
                    />
                          
                        </FloatingMenu>
                    </div>:<></> }
            

            <div style={{marginTop:"50px",marginBottom:"50px"}}>

            </div>
        </RegisterMainPageMainDivBox>
    )
}

export default RegisterMainPage;