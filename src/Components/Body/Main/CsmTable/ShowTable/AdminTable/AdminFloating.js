import React, { useState } from "react";
import { styled } from "styled-components";
import { MdOutlineClose } from "react-icons/md";
import { ImArrowUp } from "react-icons/im";
import { BiCalculator } from "react-icons/bi";
import { useSelector } from "react-redux";
import PageNation from "../../../PageNation/PageNation";
import { Link } from "react-router-dom";
import { SiMicrosoftexcel } from "react-icons/si";
import { confirmAlert } from "react-confirm-alert";
import { request } from "../../../../../../APIs";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import CsmAddModal from "../../../MainModal/CsmAddModal";
import Modal from "react-modal";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '85%',
        height: '85%',
        zIndex: 100,
    },
};
Modal.setAppElement('#FilterSearchModal');


const FloatingTestMainDivBox = styled.div`
    width:70%;
    background-color:#211F2B;
    position:fixed;
    bottom:0px;
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
            width:auto;
        }
        
    }
   }
`

const AdminFloating = () => {
    const totalPages = useSelector(state => state.CsmBasicDataReducer.Csm_Basic_Data_State.All_Count);
    const CsmSelectState = useSelector(state => state.CsmSelectReducer.Csm_Select_Data);
    // const [PageNumbers, setPageNumbers] = useState(1);
    const PageNumbers = useSelector((state) => state.Csm_PageNation_Reducer.PageNumbers);
    const [CsmAddModalISOpen, setCsmAddModalISOpen] = useState(false);

    const HandleScrollDown = () => {
        
           window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
                });
    }

    const HandleScrollUp = () => {
        window.scrollTo({
                top: 0,
                behavior: "smooth",
                });
    }

      const HandleExcelDownload = async () => {
        confirmAlert({
            title: `CSM Excel 다운로드`,
            message: `CSM의 모든 데이터를 다운받으시겠습니까?`,
            buttons: [
                {
                label: '예',
                    onClick: async() => {
                    await Handle_Download_Data()
                 }
                },
                {
                label: '아니오',
                onClick: () => {}
                }
            ]
            });
    }

    
    const Handle_Download_Data = async () => {
            try {
            
            const HandleExcelDownload_Axios = await request.get(`/CE_Calendar_app_server/CSM_Excel_Download`)

            if (HandleExcelDownload_Axios.data.dataSuccess) {
                window.open(`${process.env.REACT_APP_DB_HOST}/${HandleExcelDownload_Axios.data.URL}`)
            }

        } catch (error) {
            console.log(error);
        }

    }


    return (
        <FloatingTestMainDivBox>
            <ul>
                <div className="Select_Count_Container">
                    <li className="Close_Icon_Container"><MdOutlineClose></MdOutlineClose></li>
                    <li>{ CsmSelectState.length}</li>
                        <li>items selected</li>
                </div>               
                <div>
                    <PageNation totalPagesss={totalPages}  currentPage={PageNumbers}></PageNation>
                </div>
                <li className="Blew_Container" onClick={()=>HandleScrollDown()}>
                    <div style={{ transform: "rotate(180deg)"}} className="Icon_Container"><ImArrowUp></ImArrowUp></div>
                    <div >DOWN</div>
                </li>
                <li className="Blew_Container" onClick={()=>HandleScrollUp()}>
                    <div className="Icon_Container"><ImArrowUp></ImArrowUp></div>
                    <div>UP</div>
                </li>
                 <Link to="/Csm_User_Input_Data">
                 <li className="Blew_Container" >
                         <div className="Icon_Container"><BiCalculator></BiCalculator></div>
                          <div>비용 정산</div>
                        </li>
                </Link>
                <li className="Blew_Container" onClick={()=>setCsmAddModalISOpen(true)}>
                    <div className="Icon_Container"><MdOutlinePlaylistAdd></MdOutlinePlaylistAdd></div>
                    <div>CSM Add</div>
                </li>
                <li className="Blew_Container" onClick={()=>HandleExcelDownload()}>
                    <div className="Icon_Container"><SiMicrosoftexcel></SiMicrosoftexcel></div>
                    <div>Excel</div>
                </li>
            </ul>
             <Modal isOpen={CsmAddModalISOpen} style={customStyles} onRequestClose={()=>setCsmAddModalISOpen(false)} >
                <CsmAddModal setCsmAddModalISOpen={()=>setCsmAddModalISOpen(false)}></CsmAddModal>
            </Modal>
        </FloatingTestMainDivBox>
    )
}

export default AdminFloating;