import React from "react";
import { styled } from "styled-components";
import Navigation from "../../Nav/Navigation";
import TableMainPage from "./Table/TableMainPage";

const InvoiceTableMainPageMainDivBox = styled.div`
    font-size:0.8em;
`

const InvoiceTableMainPage = () => {
    return (
        <InvoiceTableMainPageMainDivBox>
            <Navigation></Navigation>
            <TableMainPage></TableMainPage>
        </InvoiceTableMainPageMainDivBox>
    )
}

export default InvoiceTableMainPage;