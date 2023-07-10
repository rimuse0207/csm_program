import React, { useState } from "react";
import Navigation from "../../Nav/Navigation";
import CsmBasicExcelUpload from "./CsmBasicExcelUpload/CsmBasicExcelUpload";
import { styled } from "styled-components";

const ExcelUploadMainDivBox = styled.div`
    border:1px solid black;
    font-size:0.8em;
     .Distance_Nav_Container{
        ul{
            display:flex;
            .active{
                 .Nav_Border_Container{
                    margin-top:5px;
                    border:1px solid #368;
                  
                }
                  font-weight:bolder;
                    font-size:1.1em;
                opacity:1;
                color:#368;
            }
            li{
                width:300px;
                margin-right:30px;
                text-align:center;
                opacity:0.5;
                :hover{
                    cursor: pointer;
                }
                .Nav_Border_Container{
                    margin-top:5px;
                    border:1px solid black;
                }

            }
        }
    }
`

const ExcelUpload = () => {
      const [Distance_Nav, setDistance_Nav] = useState([
        {
            nav_name: "CSM 파일 업로드",
            nav_check:true
        },
        {
            nav_name: "이동거리 파일 업로드",
            nav_check:false
        },
        
      ])
    
    
    const HandleNavChange = (list) => {
        setDistance_Nav(Distance_Nav.map(item => list.nav_name === item.nav_name ? { ...item, nav_check: true } : { ...item, nav_check: false }));    
    }

    
    
    return (
        <ExcelUploadMainDivBox>
            <Navigation></Navigation>
             <div className="Distance_Nav_Container">
                <ul>
                    {Distance_Nav.map((list) => {
                        return <li className={`${list.nav_check ? "active":""}`} onClick={()=>HandleNavChange(list)}>
                            <div>{list.nav_name}</div>
                            <div className="Nav_Border_Container"></div>
                        </li>
                    })}
                </ul>
            </div>
            {Distance_Nav.map((list)=>list.nav_check && list.nav_name === "CSM 파일 업로드"?<CsmBasicExcelUpload></CsmBasicExcelUpload>:<div></div>)}
            
        </ExcelUploadMainDivBox>
    )
}

export default ExcelUpload;