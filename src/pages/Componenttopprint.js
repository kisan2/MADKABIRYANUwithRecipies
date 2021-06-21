import React from 'react';
import {
    Modal,
    ModalHeader,
    Modalcontent,
    ModalBody,
} from './Model.element';
import {
    Table, TableHead, TableRow,
    TableContainer, TableCell, TableBody
} from '@material-ui/core';
import { Logo } from "../AdditionalDate/Data";

export class ComponentToPrint extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            count: this.props.value,
            grand: this.props.grand,
            customername: this.props.customername,
            customerinfo: [],
            apiurl: process.env.REACT_APP_SERVER_URL
        }
        this.getcustomer = this.getcustomer.bind(this);
    };
    componentDidMount() {
        this.getcustomer();
    }
    componentWillUnmount() {
        this.getcustomer();
    }

    getcustomer = async () => {
        let value = JSON.parse(localStorage.getItem('login'));
        this.setState({ token: value.store });
        let token = value.store;
        const apiUrl = `${this.state.apiurl}/customers?device=1`;
        const { data } = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`
            }
        }).then(items => items.json());
        this.setState({
            customerinfo: [...this.state.customerinfo, ...data]
        });
    }
    render() {
        return (
            <div style={{
                fontFamily: "Roboto Condensed", fontSize: "12px", width: "100%", textRendering: "optimizeLegibility",
                fontSmooth: 'antialiased', WebkitFontSmoothing: 'antialiased'
            }}>
                <div style={{
                    textAlign: "center", width: "100%", margin: "0 auto 20px", textRendering: "optimizeLegibility",
                    fontSmooth: 'antialiased', WebkitFontSmoothing: 'antialiased'
                }}>
                    <p style={{ padding: "5px 0" }}>
                        {Logo.printname}</p>
                    <p style={{ padding: "3px 0", fontWeight: 'bold', fontsize: '14px', letterSpacing: '1px' }}>{Logo.name}</p>
                    <p>{Logo.address}</p>
                    <p style={{ padding: "5px 0" }}>PHONE NO. : {Logo.contact}</p>
                    <p>PAN NO. : {Logo.pan}</p>
                </div>
                <div style={{
                    width: "100%",
                    paddingLeft: 20, fontSize: '10px'

                }}>
                    <table style={{
                        width: "100%", fontSize: '12px', textRendering: "optimizeLegibility",
                        fontSmooth: 'antialiased', WebkitFontSmoothing: 'antialiased'
                    }}>
                        <tr>
                            <td style={{ width: "20%", }}>Ref no</td>
                            <td style={{ width: "2%" }}>:</td>
                            <td style={{ fontWeight: "900", width: "70%", fontsize: '28px' }}>
                                {this.props.item.hdNo}</td>
                        </tr>
                        <tr>
                            <td style={{ width: "20%", }}>Kot No</td>
                            <td style={{ width: "2%" }}>:</td>
                            <td style={{ fontWeight: "600", width: "70%" }}>
                                {this.props.item.kotId}</td>
                        </tr>
                        <tr>
                            <td>Bill No.</td>
                            <td>:</td>
                            <td>{this.props.invoiceNo}</td>
                        </tr>
                        <tr>
                            <td style={{ width: "35%" }}>Customer Name</td>
                            <td>:</td>
                            <td style={{ textTransform: 'capitalize' }}>{this.props.item.customer.name}</td>
                        </tr>
                        <tr>
                            <td>Phone No.</td>
                            <td>:</td>
                            <td>{this.props.item.customer.phoneNo}</td>
                        </tr>
                        <tr>
                            <td style={{ verticalAlign: "top" }}>Address</td>
                            <td style={{ verticalAlign: "top" }}>:</td>
                            <td style={{ textTransform: 'capitalize' }}>{this.props.item.customer.address}</td>
                        </tr>
                        <tr>
                            <td>HD By</td>
                            <td>:</td>
                            <td style={{ textTransform: 'capitalize' }}>{this.props.deliveryPerson}</td>
                        </tr>
                        <tr>
                            <td>Total Items</td>
                            <td>:</td>
                            <td>{this.props.item.item.length}</td>
                        </tr>
                        <tr>
                            <td>Total Quantity</td>
                            <td>:</td>
                            <td>{this.props.item.totalQuantity}</td>
                        </tr>
                        <tr>
                            <td style={{ width: "35%", fontSize: 11 }}>Transaction Time</td>
                            <td style={{ width: "2%" }}>:</td>
                            <td style={{
                                fontsize: 11,
                                width: "70%"
                            }}>{new Date().toLocaleString()}</td>
                        </tr>
                    </table>
                    <table style={{
                        width: "90%", fontSize: '12px', textRendering: "optimizeLegibility",
                        fontSmooth: 'antialiased', WebkitFontSmoothing: 'antialiased'
                    }}>
                        <tr style={{ marginBottom: "8px" }}>
                            <td style={{ border: "2px dashed black", borderLeft: 'none', borderRight: 'none', padding: "8px 0" }}>Sn</td>
                            <td style={{ border: "2px dashed black", borderLeft: 'none', borderRight: 'none', padding: "8px 0" }}>Particulars</td>
                            <td style={{ border: "2px dashed black", borderLeft: 'none', borderRight: 'none', padding: "8px 0" }}>Qty</td>
                            <td style={{ border: "2px dashed black", borderLeft: 'none', borderRight: 'none', padding: "8px 0" }}>Rate</td>
                            <td style={{ border: "2px dashed black", borderLeft: 'none', borderRight: 'none', padding: "8px 0" }}>Amount</td>
                        </tr>
                        {this.props.item.item.map((item, index) => {
                            return (
                                <tr style={{ fontSize: "12px" }}>
                                    <td style={{ width: '5%' }} >{index + 1})</td>
                                    <td style={{ width: '70%', textTransform: 'capitalize' }}>{item.name}</td>
                                    <td style={{ width: '5%' }}>{item.quantity}</td>
                                    <td style={{ width: '10%' }}>{parseFloat(item.price).toFixed(2)}</td>
                                    <td style={{ width: '10%' }}>{parseFloat(item.total).toFixed(2)}</td>
                                </tr>


                            );

                        })}

                    </table>

                    <table style={{
                        width: "60%", fontSize: '12px', textRendering: "optimizeLegibility",
                        fontSmooth: 'antialiased', WebkitFontSmoothing: 'antialiased',
                        margin: "12px auto"
                    }}>

                        <tr >
                            <td style={{
                                borderTop: "2px dashed black",

                                borderLeft: 'none',
                                borderRight: 'none',
                                paddingTop: 10

                            }}>Gross Amount</td>
                            <td style={{
                                borderTop: "2px dashed black",
                                borderLeft: 'none', borderRight: 'none',
                                paddingTop: 10
                            }}>:</td>
                            <td style={{
                                borderTop: "2px dashed black",
                                borderLeft: 'none',
                                borderRight: 'none',
                                paddingTop: 10
                            }}>Rs. {parseFloat(this.props.item.totalAmount).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td style={{ paddingBottom: 10 }}>Discount Amount</td>
                            <td style={{ paddingBottom: 10 }}>:</td>
                            <td style={{ paddingBottom: 10 }}>Rs. {parseFloat(this.props.discount).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td style={{ paddingBottom: 10 }}>
                                Service Charge</td>
                            <td style={{ paddingBottom: 10 }}>:</td>
                            <td style={{ paddingBottom: 10 }}>Rs. 25.00</td>
                        </tr>
                        <tr>
                            <td style={{ paddingBottom: 10 }}>
                                Delivery Charge</td>
                            <td style={{ paddingBottom: 10 }}>:</td>
                            <td style={{ paddingBottom: 10 }}>Rs. {parseFloat(this.props.deliveryCharged).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td style={{
                                border: "2px dashed black", borderLeft: 'none', borderRight: 'none',
                                padding: 10, paddingRight: 0, paddingLeft: 0
                            }}>Net Amount</td>
                            <td style={{
                                border: "2px dashed black", borderLeft: 'none', borderRight: 'none',
                                padding: 10, paddingRight: 0, paddingLeft: 0
                            }}>:</td>
                            <td style={{
                                border: "2px dashed black", borderLeft: 'none', borderRight: 'none', padding: 10,
                                paddingRight: 0, paddingLeft: 0
                            }}>Rs. {parseFloat(this.props.netAmount + 25).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: 10, paddingRight: 0, paddingLeft: 0 }}>Paid Status</td>
                            <td style={{ padding: 10, paddingRight: 0, paddingLeft: 0 }} >:</td>
                            <td style={{ padding: 10, paddingRight: 0, paddingLeft: 0, textTransform: 'capitalize' }}>{this.props.paymentStatus}</td>
                        </tr>
                    </table>
                    <table style={{
                        width: "100%", textAlign: "center", fontSize: '12px', textRendering: "optimizeLegibility",
                        fontSmooth: 'antialiased', WebkitFontSmoothing: 'antialiased'
                    }}>
                        <tr>
                            <td style={{ borderTop: "2px dashed black", borderLeft: 'none', borderRight: 'none', paddingTop: 10, }}>Thank You for visit</td>
                        </tr>
                        <tr>
                            <td style={{ borderBottom: "2px dashed black", borderLeft: 'none', borderRight: 'none', paddingBottom: 10 }}>Visit again soon...</td>
                        </tr>
                    </table>
                </div>

            </div>
        );
    }
}
