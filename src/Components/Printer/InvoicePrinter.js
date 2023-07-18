import React, { useState,useEffect } from "react";
import moment from "moment";
import { styled } from "styled-components";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const InvoicePrinterMainDivBox = styled.div`
    line-height:0px !important;
 @page {
  size: A3; // 프린트 사이즈
  margin: 30mm; // 프린트 여백
}


@media print, screen {


  * {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact; // 크롬 배경화면 프린트
      
  }
  
  
    
}
display: block;
page-break-inside: avoid; // 해당 엘리먼트의 내부에서 페이지 넘김을 금지
`


const InvoicePrinter = () => {
    const { Select_Date,Invoice_Number, Travel_Fee_Unit , Hotel_Count , Hotel_Cost , service_time , Total_Cost } = useParams();
    const [PrinterData, setPrinterData] = useState(`
      <html>
      <thead>
      <style>
        *{
            line-height:0px;
            
        }
        td> p{
            
             margin-bottom:10px;   
            }
        tr>td> p> span{
            font-size:1.5em !important;
        }
          
      </style>
      </thead>
      <tbody>
        <div>
            <p style="margin-left:0px;margin-bottom:0px;margin-right:0px;margin-top:0px;"><br/></p>
<table class="cui-pasted-table" style="border-collapse:collapse;width:100%;word-break:break-all;">
    <colgroup><col style="width:74.6663px;"/><col style="width:74.6663px;"/><col style="width:74.6663px;"/><col style="width:74.6663px;"/><col style="width:74.6663px;"/><col style="width:74.6663px;"/><col style="width:74.6663px;"/><col style="width:74.6663px;"/></colgroup>
    <tbody>
        <tr style>
            <td style="height:34.5px;width:597.33px;font-size:20pt;font-family:바탕체, serif;text-align:center;vertical-align:middle;border-bottom:1.33px solid rgb(0, 0, 0);color:rgb(0, 0, 0);white-space:nowrap;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" width="597" height="35" colspan="8">
                <p style="margin-bottom:30px;"><span style="font-size:30pt;font-family:inherit;"><b style="">COMMERCIAL INVOICE</b></span></p>
            </td>
        </tr>
        <tr style>
            <td style="height:20px;font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:3px solid rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" colspan="2" height="21">
                <p><span style="font-size:12pt;font-family:바탕체, serif;">①Shipper/Exporter</span></p>
            </td>
            <td style="font-size:12pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;border-top:3px solid rgb(0, 0, 0);">
                <p><span style="font-size:12pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:12pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1.33px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;border-top:3px solid rgb(0, 0, 0);">
                <p><span style="font-size:12pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;border-top:3px solid rgb(0, 0, 0);" colspan="2">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">⑧No.&amp; Date of
  Invoice&nbsp;</span></p>
            </td>
            <td style="color:rgb(0, 0, 0);font-size:11pt;font-family:돋움, monospace;vertical-align:bottom;border:0px none rgb(0, 0, 0);white-space:nowrap;height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;border-top:3px solid rgb(0, 0, 0);">
                <p><span style="font-size:11pt;font-family:돋움, monospace;"></span><br/></p>
            </td>
            <td style="font-size:12pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;border-top:3px solid rgb(0, 0, 0);">
                <p><span style="font-size:12pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
        </tr>
        <tr style>
            <td style="height:20px;font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" height="21">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:12pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:12pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:12pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:12pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:12pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1.33px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:12pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="border-left:none;font-family:바탕체, serif;text-align:center;vertical-align:middle;border-top:none;border-right:none;border-bottom:1px solid rgb(0, 0, 0);background:yellow;color:rgb(0, 0, 0);font-size:11pt;white-space:nowrap;height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" colspan="2">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">${Invoice_Number}</span></p>
            </td>
            <td style="text-align:center;border-top:none;border-bottom:1px solid rgb(0, 0, 0);border-left:none;background:yellow;color:rgb(0, 0, 0);font-size:11pt;font-family:돋움, monospace;vertical-align:bottom;white-space:nowrap;height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" colspan="2">
                <p><span style="font-size:11pt;font-family:돋움, monospace;">${moment(Select_Date).format("DD")}-${moment(Select_Date).format("MMM")}-${moment(Select_Date).format("YY")}</span></p>
            </td>
        </tr>
        <tr style>
            <td style="height:34px;color:navy;font-size:20pt;font-family:바탕, serif;vertical-align:top;border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 128);border-right:0px none rgb(0, 0, 128);border-bottom:0px none rgb(0, 0, 128);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" colspan="3" height="34">
                <p><span style="font-size:20pt;font-family:바탕, serif;"><b>DHK</b><b><span style="color:navy;font-family:바탕체, serif;"><b> SOLUTION</b></span></b></span></p>
            </td>
            <td style="font-size:12pt;font-family:바탕체, serif;vertical-align:top;border-top:none;border-right:1.33px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:34.4px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:12pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:34.4px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" colspan="2">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">⑨No.&amp; Date of
  L/C&nbsp;</span></p>
            </td>
            <td style="color:rgb(0, 0, 0);font-size:11pt;font-family:돋움, monospace;vertical-align:bottom;border:0px none rgb(0, 0, 0);white-space:nowrap;height:34.4px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:돋움, monospace;"></span><br/></p>
            </td>
            <td style="font-size:12pt;font-family:바탕체, serif;vertical-align:top;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:34.4px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:12pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
        </tr>
        <tr style>
            <td style="height:20px;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);font-size:11pt;border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" colspan="3" height="21">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EXPORTERS &amp; IMPORTERS</span></p>
            </td>
            <td style="font-size:12pt;font-family:바탕체, serif;vertical-align:top;border-top:none;border-right:1.33px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:12pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:none;border-bottom:1px solid rgb(0, 0, 0);border-left:none;color:rgb(0, 0, 0);font-size:11pt;white-space:nowrap;height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:top;border-top:none;border-right:none;border-bottom:1px solid rgb(0, 0, 0);border-left:none;color:rgb(0, 0, 0);font-size:11pt;white-space:nowrap;height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="border-top:none;border-right:none;border-bottom:1px solid rgb(0, 0, 0);border-left:none;color:rgb(0, 0, 0);font-size:11pt;font-family:돋움, monospace;vertical-align:bottom;white-space:nowrap;height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:돋움, monospace;">　</span></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:top;border-top:none;border-bottom:1px solid rgb(0, 0, 0);border-left:none;color:rgb(0, 0, 0);font-size:11pt;white-space:nowrap;height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">　</span></p>
            </td>
        </tr>
        <tr style>
            <td style="height:20px;border-right:1.33px solid black;font-size:10pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-top:none;border-bottom:none;white-space:nowrap;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" colspan="4" height="21">
                <p><span style="font-size:10pt;font-family:바탕체, serif;">8F.,DHK Solution Bldg.,28 Pangyo-ro
  255beon-gil</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;color:rgb(0, 0, 0);vertical-align:bottom;border:0px none rgb(0, 0, 0);white-space:nowrap;height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" colspan="2">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">⑩L/C Issuing Bank</span></p>
            </td>
            <td style="color:rgb(0, 0, 0);font-size:11pt;font-family:돋움, monospace;vertical-align:bottom;border:0px none rgb(0, 0, 0);white-space:nowrap;height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:돋움, monospace;"></span><br/></p>
            </td>
            <td style="color:rgb(0, 0, 0);font-size:11pt;font-family:돋움, monospace;vertical-align:bottom;border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:돋움, monospace;"></span><br/></p>
            </td>
        </tr>
        <tr style>
            <td style="height:20px;border-right:1.33px solid black;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);font-size:11pt;border-top:none;border-bottom:none;white-space:nowrap;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" colspan="4" height="21">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">&nbsp;Bundang-gu, Seongnam-si, Gyeonggi-do,</span></p>
            </td>
            <td style="color:rgb(0, 0, 0);font-size:11pt;font-family:돋움, monospace;vertical-align:bottom;border:0px none rgb(0, 0, 0);white-space:nowrap;height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:돋움, monospace;"></span><br/></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);font-size:11pt;border:0px none rgb(0, 0, 0);white-space:nowrap;height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="color:rgb(0, 0, 0);font-size:11pt;font-family:돋움, monospace;vertical-align:bottom;border:0px none rgb(0, 0, 0);white-space:nowrap;height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:돋움, monospace;"></span><br/></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);font-size:11pt;border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
        </tr>
        <tr style>
            <td style="height:19.5px;border-top:none;border-right:none;border-bottom:1px solid rgb(0, 0, 0);color:rgb(0, 0, 0);font-size:11pt;font-family:돋움, monospace;vertical-align:bottom;white-space:nowrap;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" colspan="2" height="21">
                <p><span style="font-size:11pt;font-family:돋움, monospace;">Korea,
  13486</span></p>
            </td>
            <td style="font-size:12pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:none;border-bottom:1px solid rgb(0, 0, 0);border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:12pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:12pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1.33px solid rgb(0, 0, 0);border-bottom:1px solid rgb(0, 0, 0);border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:12pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);font-size:11pt;border:0px none rgb(0, 0, 0);white-space:nowrap;height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);font-size:11pt;border:0px none rgb(0, 0, 0);white-space:nowrap;height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="color:rgb(0, 0, 0);font-size:11pt;font-family:돋움, monospace;vertical-align:bottom;border:0px none rgb(0, 0, 0);white-space:nowrap;height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:돋움, monospace;"></span><br/></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);font-size:11pt;border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
        </tr>
        <tr style>
            <td style="height:19px;font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" colspan="3" height="19">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">②For
  Account &amp; Risk of Messrs.</span></p>
            </td>
            <td style="border-top:none;border-right:1.33px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);font-size:11pt;font-family:돋움, monospace;vertical-align:bottom;white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:돋움, monospace;">　</span></p>
            </td>
            <td style="border-top:none;border-right:none;border-bottom:1px solid rgb(0, 0, 0);border-left:none;color:rgb(0, 0, 0);font-size:11pt;font-family:돋움, monospace;vertical-align:bottom;white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:돋움, monospace;">　</span></p>
            </td>
            <td style="border-top:none;border-right:none;border-bottom:1px solid rgb(0, 0, 0);border-left:none;color:rgb(0, 0, 0);font-size:11pt;font-family:돋움, monospace;vertical-align:bottom;white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:돋움, monospace;">　</span></p>
            </td>
            <td style="border-top:none;border-right:none;border-bottom:1px solid rgb(0, 0, 0);border-left:none;color:rgb(0, 0, 0);font-size:11pt;font-family:돋움, monospace;vertical-align:bottom;white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:돋움, monospace;">　</span></p>
            </td>
            <td style="border-top:none;border-bottom:1px solid rgb(0, 0, 0);border-left:none;color:rgb(0, 0, 0);font-size:11pt;font-family:돋움, monospace;vertical-align:bottom;white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:돋움, monospace;">　</span></p>
            </td>
        </tr>
        <tr style>
            <td style="height:20px;font-family:바탕체, serif;color:rgb(0, 0, 0);font-size:11pt;vertical-align:bottom;border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" colspan="2" height="21">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">Disco
  Corporation&nbsp;</span></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);font-size:11pt;border:0px none rgb(0, 0, 0);white-space:nowrap;height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1.33px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);font-size:11pt;white-space:nowrap;height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">⑪Remarks:</span></p>
            </td>
            <td style="font-size:12pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:12pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="color:rgb(0, 0, 0);font-size:11pt;font-family:돋움, monospace;vertical-align:bottom;border:0px none rgb(0, 0, 0);white-space:nowrap;height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:돋움, monospace;"></span><br/></p>
            </td>
            <td style="font-size:12pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:12pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
        </tr>
        <tr style>
            <td style="height:19px;border-right:1.33px solid black;font-family:바탕체, serif;color:rgb(0, 0, 0);font-size:11pt;vertical-align:bottom;border-top:none;border-bottom:none;white-space:nowrap;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" colspan="4" height="19">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">13-11 Omori-kita 2-Chome Ota-ku Tokyo&nbsp;</span></p>
            </td>
            <td style="border-bottom:1px solid black;width:218.66px;text-align:center;vertical-align:middle;border-top:none;border-right:none;border-left:1.33px solid #000000;white-space:normal;color:#000000;font-size:11.0pt;font-family:돋움, monospace;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" width="219" rowspan="14" colspan="3">
                <p><span style="font-size:11pt;font-family:돋움, monospace;">T/T REMIRRANCE</span></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);font-size:11pt;border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
        </tr>
        <tr style>
            <td style="height:18.5px;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:none;border-bottom:1px solid rgb(0, 0, 0);color:rgb(0, 0, 0);font-size:11pt;white-space:nowrap;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" colspan="2" height="19">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">143-8580
  , Japan</span></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:none;border-bottom:1px solid rgb(0, 0, 0);border-left:none;color:rgb(0, 0, 0);font-size:11pt;white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1.33px solid rgb(0, 0, 0);border-bottom:1px solid rgb(0, 0, 0);border-left:none;color:rgb(0, 0, 0);font-size:11pt;white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);font-size:11pt;border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
        </tr>
        <tr style>
            <td style="height:19px;font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" colspan="2" height="19">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">③Notify
  Party</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1.33px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);font-size:11pt;border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
        </tr>
        <tr style>
            <td style="height:19px;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);font-size:11pt;border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" height="19">
                <p><span style="font-size:11pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);font-size:11pt;border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);font-size:11pt;border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1.33px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);font-size:11pt;white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);font-size:11pt;border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
        </tr>
        <tr style>
            <td style="height:19px;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);font-size:11pt;border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" colspan="2" height="19">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">ATTN
  : Ms. MOON HYUNJI</span></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);font-size:11pt;border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1.33px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);font-size:11pt;white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);font-size:11pt;border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
        </tr>
        <tr style>
            <td style="height:19px;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);font-size:11pt;border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" colspan="2" height="19">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">FROM
  : KM LEE</span></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);font-size:11pt;border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1.33px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);font-size:11pt;white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);font-size:11pt;border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
        </tr>
        <tr style>
            <td style="height:19px;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);font-size:11pt;border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" height="19">
                <p><span style="font-size:11pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);font-size:11pt;border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);font-size:11pt;border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1.33px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);font-size:11pt;white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);font-size:11pt;border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
        </tr>
        <tr style>
            <td style="height:18.5px;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:none;border-bottom:1px solid rgb(0, 0, 0);color:rgb(0, 0, 0);font-size:11pt;white-space:nowrap;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" height="19">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:none;border-bottom:1px solid rgb(0, 0, 0);border-left:none;color:rgb(0, 0, 0);font-size:11pt;white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:none;border-bottom:1px solid rgb(0, 0, 0);border-left:none;color:rgb(0, 0, 0);font-size:11pt;white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1.33px solid rgb(0, 0, 0);border-bottom:1px solid rgb(0, 0, 0);border-left:none;color:rgb(0, 0, 0);font-size:11pt;white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);font-size:11pt;border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
        </tr>
        <tr style>
            <td style="height:19px;border-right:1px solid black;font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-top:none;border-bottom:none;white-space:nowrap;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" colspan="2" height="19">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">④Port of Loading</span></p>
            </td>
            <td style="border-right:1.33px solid black;font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-top:none;border-left:none;border-bottom:none;white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" colspan="2">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">⑤Final
  Destination</span></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);font-size:11pt;border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
        </tr>
        <tr style>
            <td style="height:19px;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);font-size:11pt;border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" height="19">
                <p><span style="font-size:11pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);font-size:11pt;white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);font-size:11pt;border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1.33px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);font-size:11pt;white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);font-size:11pt;border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
        </tr>
        <tr style>
            <td style="height:18.5px;border-right:1px solid black;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-bottom:1px solid rgb(0, 0, 0);color:rgb(0, 0, 0);font-size:11pt;white-space:nowrap;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" colspan="2" height="19">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">Inchon airport KOREA</span></p>
            </td>
            <td style="border-right:1.33px solid black;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-bottom:1px solid rgb(0, 0, 0);border-left:none;color:rgb(0, 0, 0);font-size:11pt;white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" colspan="2">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">NARITA,
  JAPAN</span></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);font-size:11pt;border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
        </tr>
        <tr style>
            <td style="height:19px;font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" height="19">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">⑥Carrier</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="border-right:1.33px solid black;font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-top:none;border-left:none;border-bottom:none;white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" colspan="2">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">⑦Sailing
  on or about</span></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);font-size:11pt;border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
        </tr>
        <tr style>
            <td style="height:19px;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);font-size:11pt;border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" height="19">
                <p><span style="font-size:11pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);font-size:11pt;white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);font-size:11pt;border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1.33px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);font-size:11pt;white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);font-size:11pt;border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
        </tr>
        <tr style>
            <td style="height:18.5px;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:none;border-bottom:1px solid rgb(0, 0, 0);color:rgb(0, 0, 0);font-size:11pt;white-space:nowrap;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" height="19">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:1px solid rgb(0, 0, 0);border-left:none;color:rgb(0, 0, 0);font-size:11pt;white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:none;border-bottom:1px solid rgb(0, 0, 0);border-left:none;color:rgb(0, 0, 0);font-size:11pt;white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1.33px solid rgb(0, 0, 0);border-bottom:1px solid rgb(0, 0, 0);border-left:none;color:rgb(0, 0, 0);font-size:11pt;white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-family:바탕체, serif;vertical-align:middle;border-top:none;border-bottom:1px solid rgb(0, 0, 0);border-left:none;color:rgb(0, 0, 0);font-size:11pt;white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">　</span></p>
            </td>
        </tr>
        <tr style>
            <td style="height:19px;border-right:1px solid black;font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-top:none;border-bottom:none;white-space:nowrap;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" colspan="2" height="19">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">⑫Marks and Numbers of PKGS&nbsp;</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" colspan="2">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">⑬Description of
  Goods&nbsp;&nbsp;&nbsp;&nbsp;</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">⑭Quantity/Unit&nbsp;</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">⑮Unit-Price&nbsp;</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">*Amount</span></p>
            </td>
        </tr>
        <tr style>
            <td style="height:19px;font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" height="19">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">TRAVEL FEE</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="border-left:none;font-family:바탕체, serif;text-align:center;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;background:yellow;color:rgb(0, 0, 0);font-size:11pt;white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">1</span></p>
            </td>
            <td style="font-size:9pt;font-family:&quot;맑은 고딕&quot;, monospace;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:10px;padding-top:0px;  text-align:end;">
                <p><span style="font-size:9pt;font-family:'맑은 고딕', monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${Travel_Fee_Unit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span></p>
            </td>
            <td style="font-size:9pt;font-family:&quot;맑은 고딕&quot;, monospace;text-align:right;vertical-align:middle;border-top:none;border-bottom:none;border-left:1px solid rgb(0, 0, 0);color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:'맑은 고딕', monospace;">¥${Travel_Fee_Unit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} </span></p>
            </td>
        </tr>
        <tr style>
            <td style="height:21px;font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" height="21">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:21px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="border-right:1px solid black;border-left:none;width:220px;font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-bottom:none;white-space:normal;color:rgb(0, 0, 0);height:21px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" width="218" colspan="3">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">HOTEL FEE</span></p>
            </td>
            <td style="border-left:none;font-family:바탕체, serif;text-align:center;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;background:yellow;color:rgb(0, 0, 0);font-size:11pt;white-space:nowrap;height:21px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">${Hotel_Count}</span></p>
            </td>
            <td style="font-size:9pt;font-family:&quot;맑은 고딕&quot;, monospace;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:21px;padding-left:0px;padding-bottom:0px;padding-right:10px;padding-top:0px;  text-align:end;">
                <p><span style="font-size:9pt;font-family:'맑은 고딕', monospace; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5,000 </span></p>
            </td>
            <td style="font-size:9pt;font-family:&quot;맑은 고딕&quot;, monospace;text-align:right;vertical-align:middle;border-top:none;border-bottom:none;border-left:1px solid rgb(0, 0, 0);color:rgb(0, 0, 0);white-space:nowrap;height:21px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:'맑은 고딕', monospace;">¥${(Hotel_Count*5000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} </span></p>
            </td>
        </tr>
        <tr style>
            <td style="height:19px;font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" height="19">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="border-right:1px solid black;border-left:none;width:220px;font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-bottom:none;white-space:normal;color:rgb(0, 0, 0);height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" width="218" colspan="3">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">SERVICE FEE( 1 Hour)</span></p>
            </td>
            <td style="border-left:none;font-family:바탕체, serif;text-align:center;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;background:yellow;color:rgb(0, 0, 0);font-size:11pt;white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">${service_time}</span></p>
            </td>
            <td style="border:0px none rgb(0, 0, 0);font-size:9pt;font-family:&quot;맑은 고딕&quot;, monospace;text-align:right;vertical-align:middle;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:10px;padding-top:0px; text-align:end;">
                <p><span style="font-size:9pt;font-family:'맑은 고딕', monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;11,000 </span></p>
            </td>
            <td style="font-size:9pt;font-family:&quot;맑은 고딕&quot;, monospace;text-align:right;vertical-align:middle;border-top:none;border-bottom:none;border-left:1px solid rgb(0, 0, 0);color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:'맑은 고딕', monospace;">¥${(service_time*11000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} </span></p>
            </td>
        </tr>
        <tr style>
            <td style="height:19px;font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" height="19">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="border-left:none;font-family:바탕체, serif;text-align:center;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;color:rgb(0, 0, 0);font-size:11pt;white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="border:0px none rgb(0, 0, 0);font-size:9pt;font-family:&quot;맑은 고딕&quot;, monospace;text-align:right;vertical-align:middle;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:'맑은 고딕', monospace;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:&quot;맑은 고딕&quot;, monospace;text-align:right;vertical-align:middle;border-top:none;border-bottom:none;border-left:1px solid rgb(0, 0, 0);color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:'맑은 고딕', monospace;">　</span></p>
            </td>
        </tr>
       
        <tr style>
            <td style="height:19px;font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" height="19">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="border-left:none;font-family:바탕체, serif;text-align:center;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;color:rgb(0, 0, 0);font-size:11pt;white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:&quot;맑은 고딕&quot;, monospace;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:'맑은 고딕', monospace;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:&quot;맑은 고딕&quot;, monospace;text-align:right;vertical-align:middle;border-top:none;border-bottom:none;border-left:1px solid rgb(0, 0, 0);color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:'맑은 고딕', monospace;">　</span></p>
            </td>
        </tr>
        <tr style>
            <td style="height:19px;font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" height="19">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="border-left:none;font-family:바탕체, serif;text-align:center;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;color:rgb(0, 0, 0);font-size:11pt;white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:&quot;맑은 고딕&quot;, monospace;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:'맑은 고딕', monospace;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:&quot;맑은 고딕&quot;, monospace;text-align:right;vertical-align:middle;border-top:none;border-bottom:none;border-left:1px solid rgb(0, 0, 0);color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:'맑은 고딕', monospace;">　</span></p>
            </td>
        </tr>
        <tr style>
            <td style="height:19px;font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" height="19">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="border-left:none;font-family:바탕체, serif;text-align:center;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;color:rgb(0, 0, 0);font-size:11pt;white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:&quot;맑은 고딕&quot;, monospace;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:'맑은 고딕', monospace;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:&quot;맑은 고딕&quot;, monospace;text-align:right;vertical-align:middle;border-top:none;border-bottom:none;border-left:1px solid rgb(0, 0, 0);color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:'맑은 고딕', monospace;">　</span></p>
            </td>
        </tr>
        <tr style>
            <td style="height:19px;font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" height="19">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;text-align:right;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;text-align:right;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;text-align:right;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
        </tr>
         <tr style>
            <td style="height:19px;font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" height="19">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;text-align:right;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;text-align:right;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;text-align:right;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
        </tr>
        <tr style>
            <td style="height:19px;font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" height="19">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;text-align:right;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;text-align:right;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;text-align:right;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
        </tr>
        <tr style>
            <td style="height:19px;font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" height="19">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;text-align:right;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;text-align:right;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;text-align:right;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
        </tr>
        <tr style>
            <td style="height:19px;font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" height="19">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;text-align:right;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;text-align:right;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;text-align:right;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
        </tr>
        <tr style>
            <td style="height:18px;font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:1px solid rgb(0, 0, 0);border-right:none;border-bottom:1px solid rgb(0, 0, 0);color:rgb(0, 0, 0);white-space:nowrap;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" height="19">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:1px solid rgb(0, 0, 0);border-right:1px solid rgb(0, 0, 0);border-bottom:1px solid rgb(0, 0, 0);border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="border-right:1px solid black;font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:1px solid rgb(0, 0, 0);border-bottom:1px solid rgb(0, 0, 0);border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" colspan="3">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TOTAL C&amp;F/CFR Inchon,KOREA</span></p>
            </td>
            <td style="border-left:none;font-family:바탕체, serif;text-align:right;vertical-align:middle;border-top:1px solid rgb(0, 0, 0);border-right:1px solid rgb(0, 0, 0);border-bottom:1px solid rgb(0, 0, 0);color:rgb(0, 0, 0);font-size:11pt;white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;text-align:right;vertical-align:middle;border-top:1px solid rgb(0, 0, 0);border-right:1px solid rgb(0, 0, 0);border-bottom:1px solid rgb(0, 0, 0);border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:&quot;맑은 고딕&quot;, monospace;text-align:right;vertical-align:middle;border-top:1px solid rgb(0, 0, 0);border-bottom:1px solid rgb(0, 0, 0);border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:30px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:'맑은 고딕', monospace;">¥${Total_Cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.00</span></p>
            </td>
        </tr>
        <tr style>
            <td style="height:19px;font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" height="19">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;text-align:right;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;text-align:right;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;text-align:right;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
        </tr>
         <tr style>
            <td style="height:19px;font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" height="19">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;text-align:right;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;text-align:right;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;text-align:right;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
        </tr>
         <tr style>
            <td style="height:19px;font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" height="19">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;text-align:right;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;text-align:right;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;text-align:right;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
        </tr>
        <tr style>
            <td style="height:19px;font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" height="19">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;text-align:right;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;text-align:right;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;text-align:right;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
        </tr>
        <tr style>
            <td style="height:19px;font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" height="19">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;text-align:right;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;text-align:right;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;text-align:right;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
        </tr>
        <tr style>
            <td style="height:19px;font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" height="19">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;text-align:right;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;text-align:right;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;text-align:right;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
        </tr>
        <tr style>
            <td style="height:19px;font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" height="19">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            
            <td style="color:rgb(0, 0, 0);font-size:11pt;font-family:돋움, monospace;vertical-align:bottom;border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px; border-right: 1px solid black;" valign="top" align="left">
                <p><span style="font-size:11pt;font-family:돋움, monospace;"><IMG src="${process.env.REACT_APP_DB_HOST}/mbchoi.png" embedded-id="0" style="position:absolute;margin-top:23px;margin-left:51px;z-index:1;" data-cui-alt-image="true" data-cui-image="true" unselectable="on" title="No Image" height="53" width="176"/>
  </span></p>
               
                <p><span style="font-size:11pt;font-family:돋움, monospace;">
  </span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;text-align:right;vertical-align:middle;border-top:none;border-right:1px solid rgb(0, 0, 0);border-bottom:none;border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;text-align:right;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
        </tr>
        
        <tr style>
            <td style="height:20px;font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" colspan="3" height="21">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">*
  P.O Box&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: C.P.O. BOX 1202</span></p>
            </td>
            <td style="font-size:12pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:12pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:12pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:12pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:12pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:12pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:12pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:12pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:12pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:20.79px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:12pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
        </tr>
        <tr style>
            <td style="height:19px;font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" colspan="3" height="19">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">&nbsp;&nbsp;Cable Address : "KIOUK" SEOUL</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
        </tr>
        <tr style>
            <td style="height:19px;font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" colspan="2" height="19">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">&nbsp;&nbsp;Telex Code&nbsp;&nbsp;&nbsp;&nbsp;: KIOUK K28523</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;text-align:right;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">*Signed by&nbsp;</span></p>
            </td>
            <td style="border-top:none;border-right:none;border-bottom:1px solid rgb(0, 0, 0);border-left:none;color:rgb(0, 0, 0);font-size:11pt;font-family:돋움, monospace;vertical-align:bottom;white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:돋움, monospace;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-right:none;border-bottom:1px solid rgb(0, 0, 0);border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;border-top:none;border-bottom:1px solid rgb(0, 0, 0);border-left:none;color:rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">　</span></p>
            </td>
        </tr>
        <tr style>
            <td style="height:19px;font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" colspan="3" height="19">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">&nbsp;&nbsp;Fax. No.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: (031)639-9035</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="color:rgb(0, 0, 0);font-size:11pt;font-family:돋움, monospace;vertical-align:bottom;border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:11pt;font-family:돋움, monospace;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border:0px none rgb(0, 0, 0);white-space:nowrap;height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-bottom:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
        </tr>
        <tr style>
            <td style="height:19px;font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" colspan="3" height="19">
                <p><span style="font-size:9pt;font-family:바탕체, serif;">&nbsp;&nbsp;Telephone No. : (031)639-9068</span></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-right:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
            <td style="font-size:9pt;font-family:바탕체, serif;vertical-align:middle;color:rgb(0, 0, 0);border-image:initial;white-space:nowrap;border-top:0px none rgb(0, 0, 0);border-left:0px none rgb(0, 0, 0);height:19.2px;padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;">
                <p><span style="font-size:9pt;font-family:바탕체, serif;"></span><br/></p>
            </td>
        </tr>
    </tbody>
</table>


        </div>
      </tbody>
        </html>`)
    
     useEffect(() => {
        
            setTimeout(() => {
                window.print();
            }, 1000);
            window.onafterprint = function () {
                window.close();
            };
        
    }, []);
    
    return (
        <InvoicePrinterMainDivBox dangerouslySetInnerHTML={ {__html: PrinterData} }>
            
      </InvoicePrinterMainDivBox>
    )
}


export default InvoicePrinter