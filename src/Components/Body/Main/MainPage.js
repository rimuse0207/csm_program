import React, { useState, useEffect, useRef } from 'react';
import Navigation from '../Nav/Navigation';
import CsmTable from './CsmTable/CsmTable';
import FilterSelect from './Filter/FilterSelect';
import { FloatingMenu, MainButton, ChildButton } from 'react-floating-button-menu';
import { ImCancelCircle } from 'react-icons/im';
import { AiOutlineMenu, AiFillDatabase } from 'react-icons/ai';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlinePlaylistAdd } from 'react-icons/md';
import CsmAddModal from './MainModal/CsmAddModal';
import Modal from 'react-modal';
import { RiFileExcel2Fill } from 'react-icons/ri';
import { request } from '../../../APIs';
import GraphMainPage from '../Graph/GraphMainPage';
import moment from 'moment';
import { ImArrowUp } from 'react-icons/im';
import { confirmAlert } from 'react-confirm-alert';
import Test from './CsmTable/ShowTable/BasicTable/Test';
import FloatingTest from './CsmTable/ShowTable/BasicTable/FloatingTest';
import BasicTable from './CsmTable/ShowTable/BasicTable/BaiscTable';
import AdminTable from './CsmTable/ShowTable/AdminTable/AdminTable';
import AdminFloating from './CsmTable/ShowTable/AdminTable/AdminFloating';
import BasicFloating from './CsmTable/ShowTable/BasicTable/BasicFloating';
import { Csm_Grade_Data_Reduce_Thunk } from '../../../Models/ReduxThunk/Csm_Grade_Data_Reducer/Csn_Grade_Data_Reducer';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

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
    font-size: 0.8em;
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
            .distance,
            .ExcelDownload {
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

        .Select_Count_Container {
            font-size: 0.7em;
            width: 20px;
            height: 20px;
            line-height: 20px;
            border-radius: 50%;
            text-align: center;
            position: absolute;
            top: -18px;
            right: -18px;
            background-color: red;
            color: #fff;
        }
    }

    .Select_Years_Container {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.2em;
        .Select_Years_Icons {
            font-size: 1.5em;
            :hover {
                cursor: pointer;
            }
        }
    }
`;

const MainPage = () => {
    const dispatch = useDispatch();
    const HandleScrollUp = useRef(null);
    const Login_Info = useSelector(state => state.LoginInfoDataReducer.Infomation);
    const Csm_Select_Data = useSelector(state => state.CsmSelectReducer.Csm_Select_Data);
    const Csm_Filter_state = useSelector(state => state.CSmFilteringReducer.Csm_Filter_State);

    const [Select_Years, setSelect_Years] = useState(moment());

    const [FloatingMenuChecking, setFloatingMenuChecking] = useState(true);
    const [CsmAddModalISOpen, setCsmAddModalISOpen] = useState(false);
    const [Grinder_Data, setGrinder_Data] = useState([]);
    const [Grinder_Goals_Data, setGrinder_Goals_Data] = useState([]);
    const [Laser_Data, setLaser_Data] = useState([]);
    const [Laser_Goals_Data, setLaser_Goals_Data] = useState([]);
    const [Dicer_Data, setDicer_Data] = useState([]);
    const [Dicer_Goals_Data, setDicer_Goals_Data] = useState([]);

    const ScrollUp = () => {
        if (HandleScrollUp.current) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    };

    const HandleExcelDownload = async () => {
        confirmAlert({
            title: `CSM Excel 다운로드`,
            message: `CSM의 모든 데이터를 다운받으시겠습니까?`,
            buttons: [
                {
                    label: '예',
                    onClick: async () => {
                        await Handle_Download_Data();
                    },
                },
                {
                    label: '아니오',
                    onClick: () => {},
                },
            ],
        });
    };

    const Handle_Download_Data = async () => {
        try {
            const HandleExcelDownload_Axios = await request.get(`/CE_Calendar_app_server/CSM_Excel_Download`);

            if (HandleExcelDownload_Axios.data.dataSuccess) {
                window.open(`${process.env.REACT_APP_DB_HOST}/${HandleExcelDownload_Axios.data.URL}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const Division_Goals_Graph_Data = async () => {
        try {
            const Division_Goals_Graph_Data_Axios = await request.get(`/CE_Calendar_app_server/Division_Goals_Graph_Data`, {
                params: {
                    Select_Date: moment(Select_Years).format('YYYY'),
                },
            });

            if (Division_Goals_Graph_Data_Axios.data.dataSuccess) {
                const Grinder_Datas = Division_Goals_Graph_Data_Axios.data.Grinder.map(list => {
                    return list.total_orders;
                });
                const Laser_Datas = Division_Goals_Graph_Data_Axios.data.Laser.map(list => {
                    return list.total_orders;
                });
                const Dicer_Datas = Division_Goals_Graph_Data_Axios.data.Dicer.map(list => {
                    return list.total_orders;
                });
                const Grinder_Goals_Datas = Division_Goals_Graph_Data_Axios.data.Grinder_Goals.map(list => {
                    return list.goals;
                });
                const Dicer_Goals_Datas = Division_Goals_Graph_Data_Axios.data.Dicer_Goals.map(list => {
                    return list.goals;
                });
                const Laser_Goals_Datas = Division_Goals_Graph_Data_Axios.data.Laser_Goals.map(list => {
                    return list.goals;
                });
                setGrinder_Data(Grinder_Datas);
                setGrinder_Goals_Data(Grinder_Goals_Datas);
                setLaser_Data(Laser_Datas);
                setLaser_Goals_Data(Laser_Goals_Datas);
                setDicer_Data(Dicer_Datas);
                setDicer_Goals_Data(Dicer_Goals_Datas);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        Division_Goals_Graph_Data();
        dispatch(Csm_Grade_Data_Reduce_Thunk(Csm_Filter_state));
        document.body.style.overflow = 'auto';
    }, [Select_Years]);

    return (
        <MainPageMainDivBox ref={HandleScrollUp}>
            <Navigation></Navigation>
            <div className="Select_Years_Container">
                <div
                    onClick={() => setSelect_Years(moment(Select_Years).subtract(1, 'year'))}
                    style={{ marginRight: '50px' }}
                    className="Select_Years_Icons"
                >
                    <MdArrowBackIos></MdArrowBackIos>
                </div>
                <div>
                    <h2>{moment(Select_Years).format('YYYY')}</h2>
                </div>
                <div
                    onClick={() => setSelect_Years(moment(Select_Years).add(1, 'year'))}
                    style={{ marginLeft: '50px' }}
                    className="Select_Years_Icons"
                >
                    <MdArrowForwardIos></MdArrowForwardIos>
                </div>
            </div>
            <GraphMainPage
                Grinder_Datas={Grinder_Data}
                Laser_Datas={Laser_Data}
                Dicer_Datas={Dicer_Data}
                Grinder_Goals_Data={Grinder_Goals_Data}
                Laser_Goals_Data={Laser_Goals_Data}
                Dicer_Goals_Data={Dicer_Goals_Data}
                Division_Goals_Graph_Data={() => Division_Goals_Graph_Data()}
                Select_Years={Select_Years}
            ></GraphMainPage>
            <FilterSelect></FilterSelect>
            {Login_Info.Login_Admin_Access ? <AdminTable></AdminTable> : <BasicTable></BasicTable>}
            {Login_Info.Login_Admin_Access ? <AdminFloating></AdminFloating> : <BasicFloating></BasicFloating>}

            <Modal isOpen={CsmAddModalISOpen} style={customStyles} onRequestClose={() => setCsmAddModalISOpen(false)}>
                <CsmAddModal setCsmAddModalISOpen={() => setCsmAddModalISOpen(false)}></CsmAddModal>
            </Modal>
            <div style={{ paddingBottom: '50px', paddingTop: '50px', background: '#efefef' }}></div>
        </MainPageMainDivBox>
    );
};

export default MainPage;
