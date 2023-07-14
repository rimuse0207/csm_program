import React from 'react';
import LoginPage from './Components/Body/Login/LoginPage';
import App from './App';
import { BrowserRouter as Router, Route, Switch,Redirect  } from 'react-router-dom';
import { useSelector } from "react-redux";
import LoaderMainPage from "./Components/Loader/LoaderMainPage"
import CsmBasicExcelUpload from './Components/Body/Main/ExcelUpload/CsmBasicExcelUpload/CsmBasicExcelUpload';
import RegisterMainPage from './Components/Body/Main/Register/RegisterMainPage';
import SelectCsmTable from './Components/Body/Main/CsmTable/Select_Csm_Table/SelectCsmTable';
import DistanceMainPage from './Components/Body/Main/Distance/DistanceMainPage';
import InoviceInputMainPage from './Components/Body/Main/InvoiceInput/InoviceInputMainPage';
import InvoiceTableMainPage from './Components/Body/Main/InvoiceTable/InvoiceTableMainPage';
import RequestDistance from './Components/Body/Main/Distance/RequestDistance/RequestDistance';
import DistanceUpdatePage from './Components/Body/Main/Distance/DistanceTable/DistanceUpdatePage';
import ExcelUpload from './Components/Body/Main/ExcelUpload/ExcelUpload';
import InvoicePrinter from './Components/Printer/InvoicePrinter';
const Routerpage = () => {
  const loading = useSelector(state => state.LoaderCheckingRedux.loading);
   const Login_Info = useSelector((state) => state.LoginInfoDataReducer.Infomation);
 
    return (
    <Router>
        <Switch>
          <Route exact path="/Login" component={LoginPage} />
          <Route path="/Login/:Token_Id" component={LoginPage} />
          <Route path="/Invoice_Printer" component={InvoicePrinter}></Route>
          { Login_Info.Login_token ?<> <Route exact path="/" component={App} />

          <Route path="/Csm_User_Input_Data" component={SelectCsmTable}></Route>

          <Route exact path="/Register_Csm" component={RegisterMainPage} ></Route>
          <Route path="/Register_Csm/Invoice_Input_Data" component={InoviceInputMainPage} ></Route>

          <Route exact path='/Csm_Invoice_Pay_Finished' component={InvoiceTableMainPage}></Route>


          <Route path="/Csm_Basic_Excel_Upload" component={ExcelUpload}></Route>
            <Route exact path="/Distacne_Data" component={DistanceMainPage}></Route>
            <Route path="/Distacne_Data/:start_location/:custommer_name/:custommer_area" component={DistanceUpdatePage}></Route>
            <Route path="/Distacne/request" component={RequestDistance}></Route>
            <Route path="/Invoice_Printer" component={InvoicePrinter}></Route>
          <Redirect to="/" />
          </>:<><Redirect to="/Login" /></>}
         
          
        </Switch>
        <LoaderMainPage loading={loading}></LoaderMainPage>
    </Router>
    )
}

export default Routerpage;