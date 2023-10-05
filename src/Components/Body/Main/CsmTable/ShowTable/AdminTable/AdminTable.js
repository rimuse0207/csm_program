import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';
import {
    Csm_Baisc_Data_Reduce_Thunk,
    Csm_Basic_Data_Change_Checked,
} from '../../../../../../Models/ReduxThunk/Csm_Basic_Data_Reducer/CsmBasicDataReducer';
import Publish from '../../Publish/Publish';
import Apply from '../../Apply/Apply';
import Entering from '../../Entering/Entering';
import Ce from '../../CE/Ce';
import Custom from '../../Custom/Custom';
import Pay from '../../Pay/Pay';
import { Csm_Select_Add_Data, Csm_Select_Delete_Data } from '../../../../../../Models/Csm_Select_Reducer/CsmSelectReducer';
import { Loader_Check_For_False, Loader_Check_For_True } from '../../../../../../Models/LoaderCheckReducer/LoaderCheckReducer';
import PageNation from '../../../PageNation/PageNation';
import Finall from '../../Finall/Finall';
import { toast } from '../../../../ToastMessage/ToastManager';
import { request } from '../../../../../../APIs';
import Modal from 'react-modal';
import CsmUpdateModal from '../../../MainModal/CsmUpdateModal';

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

const TestMainPage = styled.div`
    background-color: #efefef;
    width: 100%;
    overflow-x: auto;
    .Table_Header_Container {
        position: sticky;
        top: 0px;
        background: #efefef;
    }

    .Table_Header {
        position: sticky;
        display: flex;
        flex-direction: row;
        width: 120%;
        justify-content: flex-start;
        padding: 0px;
        border-top: 1px solid gray;
        border-bottom: 1px solid gray;
        margin: 0px;
        align-items: center;
        box-shadow: 1px 1px 1px 1px lightgray;
        .Main_Body_Fixed_Container {
            position: sticky;
            left: 2px;
            display: flex;
            width: 30%;
            align-items: center;
            height: 50px;
            overflow: hidden;
            text-overflow: ellipsis;
            li {
                background-color: lightgray;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 30%;
                height: 50px;
                line-height: 50px;
                text-align: center;
                font-weight: bolder;
            }
        }
        .Sub_Body_Fixed_Container {
            width: 70%;
            display: flex;
            align-items: center;
            height: 50px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            li {
                height: 50px;
                line-height: 50px;
                width: 6%;
                background-color: lightgray;
                overflow: hidden;
                text-overflow: ellipsis;
                text-align: center;
                font-weight: bolder;
            }
        }
    }

    .Table_Body {
        display: flex;
        flex-direction: row;
        width: 120%;
        justify-content: flex-start;
        padding: 0px;
        border: 1px solid lightgray;
        box-shadow: 1px 1px 1px 1px lightgray;
        margin: 0px;
        margin-top: 5px;
        background-color: #fff;

        .Main_Body_Fixed_Container {
            position: sticky;
            left: 2px;
            display: flex;
            width: 30%;
            align-items: center;
            height: 50px;
            overflow: hidden;
            text-overflow: ellipsis;
            li {
                background-color: #fff;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 30%;
                height: 50px;
                line-height: 50px;
                text-align: center;
                white-space: nowrap;
            }
        }
        .Sub_Body_Fixed_Container {
            width: 70%;
            display: flex;
            align-items: center;
            height: 50px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            li {
                height: 50px;
                line-height: 50px;
                width: 6%;
                background-color: #fff;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                text-align: center;
                padding-top: 3px;
                padding-left: 3px;
            }
        }
    }

    .Checking_Background {
        li {
            background-color: #f3f4fb !important;
        }
    }

    .Right_Menu_Container {
        width: 150px;
        background-color: #fff;
        position: fixed;
        box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
        z-index: 100;
        ul {
            margin: 0px;
            padding: 0px;
            li {
                border: 1px solid black;
                padding: 8px;
                font-weight: bolder;
            }
            :hover {
                cursor: pointer;
                background-color: #efefef;
            }
        }
    }
`;

const AdminTable = () => {
    const dispatch = useDispatch();
    const Csm_Data = useSelector(state => state.CsmBasicDataReducer.Csm_Basic_Data_State.Csm_Data);
    const Csm_Filter_state = useSelector(state => state.CSmFilteringReducer.Csm_Filter_State);
    const CsmSelectState = useSelector(state => state.CsmSelectReducer.Csm_Select_Data);
    const Csm_Data_LoadingCheck = useSelector(state => state.CsmBasicDataReducer.Csm_Basic_Data_State.loading);
    const totalPages = useSelector(state => state.CsmBasicDataReducer.Csm_Basic_Data_State.All_Count);
    const PageNumbers = useSelector(state => state.Csm_PageNation_Reducer.PageNumbers);

    const [RightMenuIsOpen, setRightMenuIsOpen] = useState(false);
    const [RightMenuPosition, setRightMenuPosition] = useState({
        x: 0,
        y: 0,
    });
    const [RightMenuClickKeys, setRightMenuClickKeys] = useState(null);
    const [UpdateModalIsOpen, setUpdateModalIsOpen] = useState(false);

    //Calendar 데이터 삭제

    const HandleDeleteCsmCalendar = async (Select_Menu, Select_Korean_Menu) => {
        try {
            const Handle_Delete_Csm_Calendar_Axios = await request.post('/CE_Calendar_app_server/Handle_Delete_Csm_Calendar', {
                RightMenuClickKeys,
                Select_Menu,
            });

            if (Handle_Delete_Csm_Calendar_Axios.data.dataSuccess) {
                toast.show({
                    title: '삭제 성공',
                    content: `${Select_Korean_Menu} 하였습니다.`,
                    duration: 6000,
                    successCheck: true,
                });
                await Table_Axios();
                Csm_Basic_Data_Update_Modal_Close();
                document.body.style.overflow = 'auto';
            } else {
                toast.show({
                    title: '삭제 실패',
                    content: `${Select_Korean_Menu} 실패 하였습니다.`,
                    duration: 6000,
                    successCheck: false,
                });
                Csm_Basic_Data_Update_Modal_Close();
                document.body.style.overflow = 'auto';
            }
        } catch (error) {
            console.log(error);
        }
    };

    //데이터 수정
    const Csm_Basic_Data_Update_Modal_Close = () => {
        setRightMenuClickKeys(null);
        setRightMenuIsOpen(false);
        setUpdateModalIsOpen(false);
        document.body.style.overflow = 'auto';
    };

    //데이터 삭제
    const handleDeleteData = async () => {
        const checking = window.confirm(
            `CSM 번호 : ${RightMenuClickKeys?.csm_basic_data_csm_number} \n제번 : ${RightMenuClickKeys?.csm_basic_data_binds}의\n데이터를 정말 삭제 하시겠습니까?`
        );
        if (checking) {
            if (RightMenuClickKeys.csm_user_input_data_writer_id) {
                toast.show({
                    title: '삭제 실패',
                    content: `현재 데이터는 사용자 등록이 완료되어 삭제처리가 불가합니다.`,
                    duration: 6000,
                    successCheck: false,
                });
                setRightMenuClickKeys(null);
                setRightMenuIsOpen(false);
                document.body.style.overflow = 'auto';
                return;
            } else {
                const Csm_Basic_Data_Delete_AXios = await request.post('/CE_Calendar_app_server/Csm_Basic_Data_Delete', {
                    RightMenuClickKeys,
                });

                if (Csm_Basic_Data_Delete_AXios.data.dataSuccess) {
                    await Table_Axios();
                    toast.show({
                        title: '삭제성공',
                        content: `요청하신 CSM 번호 : ${RightMenuClickKeys?.csm_basic_data_csm_number} 제번 : ${RightMenuClickKeys?.csm_basic_data_binds}의 데이터를 삭제 처리 하였습니다.`,
                        duration: 6000,
                        successCheck: true,
                    });
                } else {
                    toast.show({
                        title: '삭제실패',
                        content: `서버와의 연결이 끊어졌습니다. 다시 시도 후 IT팀에 문의바랍니다.`,
                        duration: 6000,
                        successCheck: false,
                    });
                }

                setRightMenuClickKeys(null);
                setRightMenuIsOpen(false);
                document.body.style.overflow = 'auto';
            }
        } else {
            setRightMenuClickKeys(null);
            setRightMenuIsOpen(false);
            document.body.style.overflow = 'auto';
            return;
        }
    };

    const handleContextMenu = (e, data) => {
        e.preventDefault(); // 기본 동작 방지 (예: 컨텍스트 메뉴 표시)

        document.body.style.overflow = 'hidden';
        setRightMenuClickKeys(data);

        setRightMenuPosition({
            x: e.clientX,
            y: e.clientY,
        });
        setRightMenuIsOpen(true);
    };

    const handleMenuClose = () => {
        setRightMenuIsOpen(false);
        document.body.style.overflow = 'auto';
    };
    const handleOutsideClick = event => {
        // 메뉴 영역 바깥의 클릭 이벤트를 처리하여 메뉴를 닫습니다.
        const isOutsideMenu = event.target.closest('.Right_Menu_Container') === null;
        if (isOutsideMenu) {
            handleMenuClose();
            setRightMenuClickKeys(null);
        }
    };
    useEffect(() => {
        if (RightMenuIsOpen) {
            document.addEventListener('click', handleOutsideClick);
        } else {
            document.removeEventListener('click', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [RightMenuIsOpen]);

    const Border_Color_Checking = data => {
        if (data.csm_publish_id) {
            if (data.csm_apply_id) {
                if (data.csm_entering_id) {
                    if (data.csm_ce_id) {
                        if (data.csm_custom_id) {
                            if (data.csm_pay_id) {
                                if (data.csm_finall_id) {
                                    //완료
                                    return 'white';
                                } else {
                                    //미완료
                                    return 'purple';
                                }
                            } else {
                                //Invoice발행
                                return 'indigo';
                            }
                        } else {
                            //작업완료
                            return 'blue';
                        }
                    } else {
                        //Part 수령
                        return 'green';
                    }
                } else {
                    //Part 입고
                    return 'yellow';
                }
            } else {
                //Part 발주요청
                return 'orange';
            }
        } else {
            // 발행 없음
            return 'red';
        }
    };

    const HandleCheckData = (e, data) => {
        if (e.target.checked) {
            /// 체크되어 있지 않을때 , 데이터 추가

            //redux_CsmSelect에 추가
            dispatch(Csm_Select_Add_Data(CsmSelectState.concat(data)));

            //redux_Thunk_Csm_Basic_Data 기존 데이터 체크추가

            dispatch(
                Csm_Basic_Data_Change_Checked(
                    Csm_Data.map(list => (list.csm_basic_data_csm_key === data.csm_basic_data_csm_key ? { ...list, checked: true } : list))
                )
            );
        } else {
            /// 체크되어 있을때 , 데이터 제거

            //redux에 제거
            dispatch(
                Csm_Select_Delete_Data(
                    CsmSelectState.filter(list => (list.csm_basic_data_csm_key !== data.csm_basic_data_csm_key ? list : ''))
                )
            );

            //기존 데이터 체크추가

            dispatch(
                Csm_Basic_Data_Change_Checked(
                    Csm_Data.map(list => (list.csm_basic_data_csm_key === data.csm_basic_data_csm_key ? { ...list, checked: false } : list))
                )
            );
        }
    };

    const Table_Axios = async () => {
        try {
            dispatch(Csm_Baisc_Data_Reduce_Thunk(PageNumbers, Csm_Filter_state, CsmSelectState));
        } catch (error) {
            console.log(error);
        }
    };

    const Loading_Change = () => {
        if (Csm_Data_LoadingCheck) {
            dispatch(Loader_Check_For_True());
        } else {
            dispatch(Loader_Check_For_False());
        }
    };

    useEffect(() => {
        /// 페이지 변경 시 마다
        Table_Axios();
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [PageNumbers]);

    useEffect(() => {
        /// Loading 환경 확인
        Loading_Change();
    }, [Csm_Data_LoadingCheck]);

    return (
        <TestMainPage>
            <div className="Table_Header_Container">
                <ul className="Table_Header">
                    <div className="Main_Body_Fixed_Container">
                        <li style={{ width: '50px' }}>NO.</li>
                        <li style={{ width: '80px' }}>선택</li>
                        <li style={{ width: '80px' }}>상태</li>
                        <li style={{ width: '80px' }}>등급</li>
                        <li>CSM</li>
                        <li>MODEL</li>
                        <li>제번</li>
                        <li>최초 납품처</li>
                        <li>작업자 이름</li>
                    </div>
                    <div className="Sub_Body_Fixed_Container">
                        <li style={{ borderLeft: '1px solid gray' }}>이동거리</li>
                        <li>이동시간</li>
                        <li>숙박일수</li>
                        <li style={{ lineHeight: '25px' }}>
                            이동거리 <br />
                            비용
                        </li>
                        <li>
                            이동시간 <br />
                            비용
                        </li>
                        <li>숙박비용</li>
                        <li>작업비용</li>
                        <li>총비용</li>

                        <li style={{ borderLeft: '1px solid gray' }}>
                            발행
                            <br />
                        </li>
                        <li style={{ lineHeight: '25px' }}>
                            Part <br />
                            발주요청
                        </li>
                        <li style={{ lineHeight: '25px' }}>
                            Part <br />
                            입고
                        </li>
                        <li style={{ lineHeight: '25px' }}>
                            Part
                            <br /> 수령
                        </li>
                        <li>작업완료</li>
                        <li>
                            Invoice
                            <br /> 발행
                        </li>
                        <li style={{ borderRight: '1px solid gray' }}>완료</li>
                        <li>작업시간</li>
                        <li>작업인원</li>
                        <li>비고</li>
                    </div>
                </ul>
            </div>
            <div>
                {Csm_Data?.map((list, j) => {
                    return (
                        <ul
                            className={`Table_Body ${list.checked === 'false' || list.checked === false ? '' : 'Checking_Background'}`}
                            key={list.csm_basic_data_csm_key}
                            style={
                                list.checked === 'false' || list.checked === false
                                    ? RightMenuClickKeys?.csm_basic_data_csm_key
                                        ? RightMenuClickKeys?.csm_basic_data_csm_key === list.csm_basic_data_csm_key
                                            ? {}
                                            : { opacity: '0.2' }
                                        : {}
                                    : { border: '1px solid #368' }
                            }
                            onContextMenu={e => handleContextMenu(e, list)}
                        >
                            <div className="Main_Body_Fixed_Container">
                                <li style={{ width: '50px' }}>{j + 1}.</li>
                                <li style={{ display: 'flex', alignItems: 'center', width: '100px' }}>
                                    <div
                                        style={{
                                            background: `${Border_Color_Checking(list)}`,
                                            width: '5px',
                                            height: '40px',
                                            marginRight: '10px',
                                            borderRadius: '10px',
                                        }}
                                    ></div>
                                    <input
                                        type="checkbox"
                                        onClick={e => HandleCheckData(e, list)}
                                        disabled={Border_Color_Checking(list) === 'blue' ? false : true}
                                        style={Border_Color_Checking(list) === 'blue' ? {} : { opacity: 0.1 }}
                                        checked={list.checked === 'false' || list.checked === false ? false : true}
                                    ></input>
                                </li>
                                <li style={{ width: '80px' }}>{list.csm_basic_data_state}</li>
                                <li style={{ width: '80px' }}>{list.csm_basic_data_grade}</li>
                                <li>{list.csm_basic_data_csm_number}</li>
                                <li>{list.csm_basic_data_model_number}</li>
                                <li>{list.csm_basic_data_binds}</li>
                                <li>{list.csm_basic_data_custom}</li>
                                <li>{list?.name}</li>
                            </div>
                            <div className="Sub_Body_Fixed_Container">
                                <li style={{ borderLeft: '1px solid lightgray' }}>
                                    {list?.csm_user_input_data_travel_range ? list?.csm_user_input_data_travel_range + 'KM' : ''}
                                </li>
                                <li>{list?.csm_user_input_data_travel_time ? list?.csm_user_input_data_travel_time + '시간' : ''}</li>
                                <li>{list?.csm_user_input_data_stay_days ? list?.csm_user_input_data_stay_days + '일' : ''}</li>
                                <li>
                                    {list?.csm_user_input_data_travel_range_cost
                                        ? '￥' +
                                          list?.csm_user_input_data_travel_range_cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                        : ''}
                                </li>
                                <li>
                                    {list?.csm_user_input_data_travel_time_cost
                                        ? '￥' + list?.csm_user_input_data_travel_time_cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                        : ''}
                                </li>
                                <li>
                                    {list?.csm_user_input_data_stay_days_cost
                                        ? '￥' + list?.csm_user_input_data_stay_days_cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                        : ''}
                                </li>
                                <li>
                                    {list?.csm_user_input_data_operation_cost
                                        ? '￥' + list?.csm_user_input_data_operation_cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                        : ''}
                                </li>
                                <li>
                                    {list?.csm_user_input_data_total_cost
                                        ? '￥' + list?.csm_user_input_data_total_cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                        : ''}
                                </li>
                                <li style={{ borderLeft: '1px solid lightgray' }}>
                                    {/* 발행 */}
                                    <Publish data={list}></Publish>
                                </li>
                                <li>
                                    {/* 신청 */}
                                    <Apply data={list}></Apply>
                                </li>
                                <li>
                                    {/* 입고 */}
                                    <Entering data={list}></Entering>
                                </li>
                                <li>
                                    {/* CE */}
                                    <Ce data={list}></Ce>
                                </li>
                                <li>
                                    {/* 고객 */}
                                    <Custom data={list}></Custom>
                                </li>
                                <li>
                                    {/* PAY */}
                                    <Pay data={list}></Pay>
                                </li>
                                <li style={{ borderRight: '1px solid lightgray' }}>
                                    {/* PAY */}
                                    <Finall data={list}></Finall>
                                </li>
                                <li>{list.csm_basic_data_working_hours} 시간</li>
                                <li>{list.csm_basic_data_working_count} 명</li>
                                <li>{list.csm_basic_data_etc}</li>
                            </div>
                        </ul>
                    );
                })}
                {RightMenuIsOpen ? (
                    <div className="Right_Menu_Container" style={{ top: `${RightMenuPosition.y}px`, left: `${RightMenuPosition.x}px` }}>
                        <ul>
                            {RightMenuClickKeys?.csm_publish_id ? (
                                <li onClick={() => HandleDeleteCsmCalendar('csm_publish', '발행 삭제')}>발행 삭제</li>
                            ) : (
                                <li style={{ opacity: '0.5' }}>발행 삭제</li>
                            )}
                            {RightMenuClickKeys?.csm_apply_id && RightMenuClickKeys?.csm_apply_id !== '-' ? (
                                <li onClick={() => HandleDeleteCsmCalendar('csm_apply', 'Part 발주 요청 삭제')}>Part 발주 요청 삭제</li>
                            ) : (
                                <li style={{ opacity: '0.5' }}>Part 발주 요청 삭제</li>
                            )}
                            {RightMenuClickKeys?.csm_entering_id && RightMenuClickKeys?.csm_entering_id !== '-' ? (
                                <li onClick={() => HandleDeleteCsmCalendar('csm_entering', 'Part 입고 삭제')}>Part 입고 삭제</li>
                            ) : (
                                <li style={{ opacity: '0.5' }}>Part 입고 삭제</li>
                            )}
                            {RightMenuClickKeys?.csm_ce_id && RightMenuClickKeys?.csm_ce_id !== '-' ? (
                                <li onClick={() => HandleDeleteCsmCalendar('csm_ce', 'Part 수령 삭제')}>Part 수령 삭제</li>
                            ) : (
                                <li style={{ opacity: '0.5' }}>Part 수령 삭제</li>
                            )}

                            {/* <li onClick={() => Csm_Data_Hidden_Checking()}>{RightMenuClickKeys?.csm_basic_data_view_hidde_check === 0?"숨김처리":"숨김처리 취소" }</li> */}
                            <li onClick={() => setUpdateModalIsOpen(true)}>데이터 수정하기</li>
                            <li onClick={() => handleDeleteData()}>데이터 삭제하기</li>
                        </ul>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
            <div style={{ marginTop: '50px' }}></div>
            <PageNation totalPagesss={totalPages} currentPage={PageNumbers}></PageNation>
            <Modal isOpen={UpdateModalIsOpen} style={customStyles} onRequestClose={() => Csm_Basic_Data_Update_Modal_Close()}>
                <CsmUpdateModal
                    RightMenuClickKeys={RightMenuClickKeys}
                    Csm_Basic_Data_Update_Modal_Close={() => Csm_Basic_Data_Update_Modal_Close()}
                ></CsmUpdateModal>
            </Modal>
        </TestMainPage>
    );
};

export default AdminTable;
