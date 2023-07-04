import React, { useState ,useEffect} from "react";
import Navigation from "../Nav/Navigation"
import CsmTable from "./CsmTable/CsmTable";
import FilterSelect from "./Filter/FilterSelect";
import { FloatingMenu, MainButton, ChildButton } from 'react-floating-button-menu';
import { ImCancelCircle } from "react-icons/im";
import { AiOutlineMenu,AiFillDatabase } from "react-icons/ai";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import CsmAddModal from "./MainModal/CsmAddModal";
import Modal from "react-modal";
import { RiFileExcel2Fill } from "react-icons/ri";
import { request } from "../../../APIs";
import GraphMainPage from "../Graph/GraphMainPage"
import moment from "moment";

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


const MainPageMainDivBox = styled.div`
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
            .distance,.ExcelDownload {
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

const MainPage = () => {
    const Login_Info = useSelector((state) => state.LoginInfoDataReducer.Infomation);
    const Csm_Select_Data = useSelector((state) => state.CsmSelectReducer.Csm_Select_Data);
    const [FloatingMenuChecking, setFloatingMenuChecking] = useState(true);
    const [CsmAddModalISOpen, setCsmAddModalISOpen] = useState(false);
    const [Grinder_Data, setGrinder_Data] = useState([]);
    const [Laser_Data, setLaser_Data] = useState([]);
    const [Dicer_Data, setDicer_Data] = useState([]);

    const HandleExcelDownload = async() => {
        try {
            
            const HandleExcelDownload_Axios = await request.get(`/CE_Calendar_app_server/CSM_Excel_Download`)

            if (HandleExcelDownload_Axios.data.dataSuccess) {
                window.open(`${process.env.REACT_APP_DB_HOST}/${HandleExcelDownload_Axios.data.URL}`)
            }

        } catch (error) {
            console.log(error);
        }
    }

    const Division_Goals_Graph_Data = async () => { 
        try {
            
            const Division_Goals_Graph_Data_Axios = await request.get(`/CE_Calendar_app_server/Division_Goals_Graph_Data`, {
                params: {
                    Select_Date:moment().format("YYYY")
                }
            })

            if (Division_Goals_Graph_Data_Axios.data.dataSuccess) {
                const Grinder_Datas = Division_Goals_Graph_Data_Axios.data.Grinder.map((list) => {
                    return list.total_orders
                })
                const Laser_Datas = Division_Goals_Graph_Data_Axios.data.Laser.map((list) => {
                    return list.total_orders
                })
                const Dicer_Datas = Division_Goals_Graph_Data_Axios.data.Dicer.map((list) => {
                    return list.total_orders
                })
                setGrinder_Data(Grinder_Datas)
                setLaser_Data(Laser_Datas)
                setDicer_Data(Dicer_Datas)
            }

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        Division_Goals_Graph_Data(); 
    },[])


    return (
        <MainPageMainDivBox>
            <Navigation></Navigation>
            <GraphMainPage Grinder_Datas={Grinder_Data} Laser_Datas={Laser_Data} Dicer_Datas={Dicer_Data}></GraphMainPage>
            <FilterSelect></FilterSelect>
            <CsmTable></CsmTable>
             <div className="FloatingMenu_Container" >
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
                                        <Link to="/Csm_User_Input_Data">
                                                <div className="Floating1">
                                                    <div className="distance">이동거리 및 시간 입력</div>
                                                    <AiFillDatabase style={{ fontSize: 20, backgroundColor: 'white', color: '#375b31' }} />
                                                    <div className="Select_Count_Container">
                                                        { Csm_Select_Data.length}
                                                    </div>
                                            </div>
                                            </Link>
                                    }
                                    background={'white'}
                                    size={40}
                                    
                    />
                            { Login_Info.Login_Admin_Access? 
                                <ChildButton
                                        icon={
                                                    <div className="Floating1" onClick={()=>setCsmAddModalISOpen(true)}>
                                                        <div className="distance">CSM 데이터 추가</div>
                                                            <MdOutlinePlaylistAdd style={{ fontSize: 20, backgroundColor: 'white', color: 'blue' }} />
                                                    </div>
                                            }
                                            background={'white'}
                                            size={40}
                                            
                        /> : <></>}
                        { Login_Info.Login_Admin_Access? <ChildButton
                                            icon={
                                                        <div className="Floating1" onClick={()=>{HandleExcelDownload()}}>
                                                            <div className="distance">Excel 다운로드</div>
                                                                <RiFileExcel2Fill style={{ fontSize: 20, backgroundColor: 'white', color: 'green' }} />
                                                        </div>
                                                }
                                                background={'white'}
                                                size={40}
                                                            
                                    />
                                : <></>}
                        
                        </FloatingMenu>
                    </div>

          <Modal isOpen={CsmAddModalISOpen} style={customStyles} onRequestClose={()=>setCsmAddModalISOpen(false)} >
                <CsmAddModal setCsmAddModalISOpen={()=>setCsmAddModalISOpen(false)}></CsmAddModal>
            </Modal>
         
        </MainPageMainDivBox>
    )
}

export default MainPage;