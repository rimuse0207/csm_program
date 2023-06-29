import React from "react";
import { styled } from "styled-components";
import Navigation from "../../Nav/Navigation";
import InvoiceSelectTable from "./InvoiceSelectTable/InvoiceSelectTable";
import InvoiceTextInput from "./InoviceTextInput/InvoiceTextInput";

const InoviceInputMainPageMainDivBox = styled.div`
    background-color:#efefef;
    font-size:0.8em;
    min-height:100vh;
`

const InoviceInputMainPage = () => {
    return (
        <InoviceInputMainPageMainDivBox>
            <Navigation></Navigation>
            <InvoiceSelectTable></InvoiceSelectTable>
            <InvoiceTextInput></InvoiceTextInput>
        </InoviceInputMainPageMainDivBox>
    )
}

export default InoviceInputMainPage