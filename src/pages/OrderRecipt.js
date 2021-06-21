import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React, { Component } from 'react';
import { Parag, Para, Tablediv, Header } from './OrderRecipt.element';

export class OrderRecipt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            apiurl: process.env.REACT_APP_SERVER_URL

        }
        this.getData = this.getData.bind(this);
    }
    componentDidMount() {
        this.getData()

    }
    componentWillUnmount() {
        this.getData()

    }

    getData = async () => {
        let value = JSON.parse(localStorage.getItem('login'));
        this.setState({ token: value.store });
        let token = value.store;
        const apiUrl = `${this.state.apiurl}/kot`;
        const { data } = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`
            }
        }).then(values => values.json());
        this.setState({
            items: [...this.state.items, ...data]

        });
    }
    render() {
        const oderData = this.props.data !== undefined ? this.props.data : null;
        let html;
        if (oderData) {
            html = <div >
                <Parag style={{
                    fontFamily: "Roboto Condensed", fontSize: "12px", width: "100%", textRendering: "optimizeLegibility",
                    fontSmooth: 'antialiased', WebkitFontSmoothing: 'antialiased'
                }}>

                    -----------------Order Recipt--------------------
                    {
                        this.state.items.filter(items => items._id === oderData).map((item) => {

                            return (
                                <>

                                    <Header>
                                        <div style={{
                                            fontWeight: '800',
                                            fontSize: '20px',
                                            textTransform: 'uppercase',
                                            margin: '5px', textAlign: 'center', letterSpacing: '2px'
                                        }}> MadkaBiryani</div>

                                        <div  >Order Recipt By:</div>
                                        <div >KOT ID:<span style={{ fontWeight: '900', fontSize: '12px' }}>{item.kotId}</span></div>
                                        <div>Customer Name:{item.customer.name}</div>
                                        <div>Date:{new Date().toLocaleString()}</div>
                                    </Header>

                                    ------------------------------------------------

                                    <Tablediv style={{
                                        fontFamily: "Roboto Condensed", fontSize: "12px", textRendering: "optimizeLegibility",
                                        fontSmooth: 'antialiased', WebkitFontSmoothing: 'antialiased'
                                    }}>
                                        <TableContainer style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                            <Table style={{
                                                width: "100%", fontFamily: "Roboto Condensed", fontSize: "12px", textRendering: "optimizeLegibility",
                                                fontSmooth: 'antialiased', WebkitFontSmoothing: 'antialiased'
                                            }}>
                                                <TableHead>
                                                    <TableRow style={{ fontWeight: 900, fontStyle: 'bold', margin: 0, paddingRight: 0 }}>
                                                        <TableCell style={{
                                                            width: "80%", fontFamily: "Roboto Condensed", fontSize: "12px", fontWeight: 900, color: 'black', fontStyle: 'bold', textRendering: "optimizeLegibility",
                                                            fontSmooth: 'antialiased', WebkitFontSmoothing: 'antialiased', margin: 0, padding: 0, paddingRight: 8
                                                        }}>
                                                            Product Name
                                                        </TableCell>
                                                        <TableCell style={{
                                                            width: "10%", margin: 0, padding: 0, fontFamily: "Roboto Condensed", fontSize: "12px", fontWeight: 900, color: 'black', fontStyle: 'bold', textRendering: "optimizeLegibility",
                                                            fontSmooth: 'antialiased', WebkitFontSmoothing: 'antialiased'
                                                        }}>
                                                            Quantity
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {item.item.map((el) => {
                                                        return (
                                                            <TableRow style={{ height: 4, fontWeight: 900 }}>
                                                                <TableCell style={{
                                                                    margin: 0, padding: 0, paddingRight: 8, fontFamily: "Roboto Condensed", fontWeight: 900, color: 'black', fontStyle: 'bold', fontSize: "12px", textRendering: "optimizeLegibility",
                                                                    fontSmooth: 'antialiased', WebkitFontSmoothing: 'antialiased'
                                                                }} >{el.name}</TableCell>
                                                                <TableCell style={{
                                                                    margin: 0, padding: 0, fontFamily: "Roboto Condensed", fontSize: "12px", fontWeight: 900, color: 'black', fontStyle: 'bold', textRendering: "optimizeLegibility",
                                                                    fontSmooth: 'antialiased', WebkitFontSmoothing: 'antialiased'
                                                                }} >{el.quantity}</TableCell>
                                                            </TableRow>

                                                        );

                                                    })}

                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Tablediv>
                                </>


                            )

                        })
                    }



                    -------------------------------------------------
                    <Para style={{
                        textAlign: 'left', fontFamily: "Roboto Condensed", fontSize: "12px", textRendering: "optimizeLegibility",
                        fontSmooth: 'antialiased', WebkitFontSmoothing: 'antialiased'
                    }}>Remark:</Para>

                    <h5>Order Verified By</h5>
                </Parag>


            </div>

        }
        else {
            html = <>
                sorry failed
                <p>{oderData}</p>
            </>;
        }

        return html;
    }
}

export default OrderRecipt;
