import React, { useRef, useState } from "react";
import { styled } from "styled-components";
import { TiDelete } from "react-icons/ti";
import { Loader_Check_For_False, Loader_Check_For_True } from "../../../../../Models/LoaderCheckReducer/LoaderCheckReducer";
import { useDispatch } from "react-redux";
import { toast } from "../../../ToastMessage/ToastManager"
import { request } from "../../../../../APIs/index"
import moment from "moment";
import { FileDrop } from 'react-file-drop';
import CSMFileUploadListMainPage from "./CsmFileUploadList/CsmFileUploadListMainPage";
import Navigation from "../../../Nav/Navigation";

const CsmBasicExcelUploadMainDivBox = styled.div`
    
    font-size:0.8em;
    
    .InserData_Main_Container {
        display: flex;
    }
`
const UploadedFileDataUlBox = styled.ul`
    border: 1px solid black;
    li {
        padding: 10px;
        border: 1px dashed gray;
        display: inline-block;
        .UploadedContainerDiv {
            display: flex;
            justify-content: center;
            div {
                margin-left: 10px;
                margin-right: 10px;
                svg {
                    font-size: 1.2em;
                    :hover {
                        cursor: pointer;
                        color: red;
                    }
                }
            }
        }
    }
`;
const CsmBasicExcelUpload = () => {
    const fileUploadDelete = useRef(null);
    const dispatch = useDispatch();
    const [file, setFile] = useState([]);
    const handle = (files) => {
        let arr = Object.values(files);
        const dd = file.concat(arr);
        setFile(dd);
    };
        const [FileUploadSuccess, setFileUploadSuccess] = useState(null);


    
    const handleDeleteFromFiles = (xData) => {
        const deleteFileData = file.filter((item) => {
            return item.name === xData.name ? '' : item;
        });
        setFile(deleteFileData);
    };

    const SaveDataFromFile = async () => {
        try {
            if (file.length === 0) {
                alert('등록 된 파일이 없습니다.');
                return;
            }
            dispatch(Loader_Check_For_True());
            const formData = new FormData();

            file.map((list) => {
                formData.append(`file`, list);
            });

            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            };
            const SendFileDataFromServer = await request.post(
                `${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/CSM_Uploader_File`,
                formData,
                config
            );

            if (SendFileDataFromServer.data.dataSuccess) {
                setFile([]);
                toast.show({
                    title: '업로드 완료.',
                    content: 'CSM 파일 데이터 DB에 저장 완료.',
                    duration: 6000,
                    DataSuccess: true,
                });
                dispatch(Loader_Check_For_False());
                if (fileUploadDelete.current) {
                    fileUploadDelete.current.value = null;
                    setFileUploadSuccess({
                        csm_excel_file_upload_indexs: Math.random() * 10,
                        csm_excel_file_upload_id: 'kmlee@dhk.co.kr',
                        csm_excel_file_upload_original_filename: SendFileDataFromServer.data.UploadedFileName,
                        csm_excel_file_upload_change_filename: SendFileDataFromServer.data.UploadedFileName,
                        csm_excel_file_upload_path: SendFileDataFromServer.data.UploadedFileResult,
                        csm_excel_file_upload_date: moment().format('YYYY-MM-DD HH:mm'),
                    });
                    dispatch(Loader_Check_For_False());
                }
                if (SendFileDataFromServer.data.ExcelDataDownloadUrl) {
                    window.open(
                        `${process.env.REACT_APP_DB_HOST}/public/CSM/${SendFileDataFromServer.data.ExcelDataDownloadUrl}_result.xlsx`
                    );
                    dispatch(Loader_Check_For_False());
                }
            } else {
                toast.show({
                    title: '업로드 실패.',
                    content: 'IT팀에 문의 바랍니다.',
                    duration: 6000,
                    DataSuccess: false,
                });
                dispatch(Loader_Check_For_False());
            }
            dispatch(Loader_Check_For_False());
        } catch (error) {
            console.log(error);
            toast.show({
                title: '업로드 실패.',
                content: 'IT팀에 문의 바랍니다.',
                duration: 6000,
                DataSuccess: false,
            });
            dispatch(Loader_Check_For_False());
        }
    };

    return (
        <CsmBasicExcelUploadMainDivBox>
            <Navigation></Navigation>
            <div style={{paddingLeft:"40px"}}>
            <h3>CSM 정보 업로드</h3>
            <div className="upload-file-wrapper">
                <FileDrop onDrop={files => handle(files)}>
                    <p>업로드 하실 파일을 드래그 또는 클릭 하여 추가 </p>
                    <label htmlFor="same" className="browse-btn">
                        클릭
                        <input ref={fileUploadDelete} id="same" type="file" multiple onChange={e => handle(e.target.files)}></input>
                    </label>
                </FileDrop>
            </div>
            <div style={{ marginTop: '20px',width:"70%" }}>
                <h4>등록된 파일</h4>
                <UploadedFileDataUlBox>
                    {file.map((x) => {
                        return (
                            <li key={x.name}>
                                <div className="UploadedContainerDiv">
                                    <div>{x.name}</div>
                                    <div onClick={() => handleDeleteFromFiles(x)}>
                                        <TiDelete></TiDelete>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </UploadedFileDataUlBox>
            </div>
            <div>
                <div>{file.length > 0 ? <button onClick={() => SaveDataFromFile()}>저장</button> : <></>}</div>
            </div>


              <div style={{width:"70%"}}>
                <h3>파일 업로드 이력</h3>
                <CSMFileUploadListMainPage
                    setFileUploadSuccess={data => setFileUploadSuccess(data)}
                    FileUploadSuccess={FileUploadSuccess}
                ></CSMFileUploadListMainPage>
            </div>
        </div>
        </CsmBasicExcelUploadMainDivBox>
    )
}
export default CsmBasicExcelUpload;