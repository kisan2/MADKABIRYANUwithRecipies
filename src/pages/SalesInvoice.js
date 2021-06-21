import { Table, TableCell, TableContainer, TableHead, TableRow, TableBody } from '@material-ui/core';
import { Person, ShoppingCart } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import {
    PosWrapper,
    PosCalculation,
    PosItemFilter,
    PosItemContent,
    Paymentrec,
    PaymentBtn,
    Select,
    Filterdata, Filteritemval, Form,
    FormInputs, FormInput, FormEntery, FormInputsBtn,
    Posrec
} from './support/Sales.element'
export class SalesInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            discount: '',
            type: 'none',
            totalquantity: 0,
            totalprice: 0,
            totaldisc: 100,
            grandTotal: 0,
            paymenttype: '',
            partialamount: '',
            name: '',
            address: '',
            phone: '',
            filteroption: 'all',
            customer_name: 'all', customeraddress: '', customercontact: '',
            customer_id: null,
            data: [],
            apiurl: process.env.REACT_APP_SERVER_URL
        };

        this.getdetail = this.getdetail.bind(this);
        this.discountchanger = this.discountchanger.bind(this);
        this.GrandTotal = this.GrandTotal.bind(this);
        this.paysubmit = this.paysubmit.bind(this);


    }
    componentDidMount() {
        this.getdetail();

    }
    componentWillUnmount() {

        this.GrandTotal();
        this.getdetail();
    }
    componentDidUpdateMount() {

        this.getdetail();
    }
    getdetail = () => {
        if (this.props.location.state.order !== '') {
            this.setState({ data: [this.props.location.state.order] });
        } else {
            alert('empty value');
        }
    }


    GrandTotal = (total) => {
        const type = this.state.type;
        let val = 0;
        let grand = 0;
        const discont = Number(this.state.discount);
        const totalprice = total;

        if (type === 'fix') {
            //    this.setState({grandTotal:totalprice-discont});
            grand = totalprice - discont;
            return grand;
        }
        if (type === 'per') {
            val = (discont / 100);
            grand = totalprice - totalprice * val;
            grand = grand.toFixed();
            return grand;
        }
        if (type < -1) {
            return totalprice;
        }
    }

    handelCustomer = e => {
        const value = e.target.value;
        this.setState({
            ...this.state,
            [e.target.name]: value,
        }, () => {
        });
    }

    handelOnchange = e => {
        const value = e.target.value;
        this.setState({
            ...this.state,
            [e.target.name]: value,
        });
    }
    discountchanger = e => {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({
            ...this.state,
            [name]: value,
        }, () => {
            this.GrandTotal();
        });
    }

    paysubmit = async (name, id, total, item) => {
        let value = JSON.parse(localStorage.getItem('login'));
        this.setState({ token: value.store });
        let token = value.store;
        let Grand = 0;
        if (this.state.grandTotal === 0) {
            Grand = Number(this.totalamount());
        } else {
            Grand = this.state.grandTotal;
        }

        const partial = this.state.paymenttype;
        const apiUrl = `${this.state.apiurl}/pos`;
        const cusname = this.state.customername.filter(customername => customername._id === this.state.customer_name).map((item) => {
            return item.name;
        });
        if (partial === 'partial') {
            const response = await fetch(apiUrl, {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({
                    "paymentType": this.state.paymenttype,

                    "customer": {
                        "name": name,
                        "id": this.state.customer_name
                    },
                    "paymentNote": "note",
                    "amount": Grand,

                    "items": item,
                    "discount": {
                        "type": this.state.type,
                        "value": this.state.discount
                    },
                    "inputPartialAmount": this.state.partialamount,
                })
            });
            const data = await response.json();
            if (response.status !== 200) {
                alert(data.message);
            }
            alert(data.message);
        }
        if (partial !== 'partial') {
            const response = await fetch(apiUrl, {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({
                    "paymentType": this.state.paymenttype,

                    "customer": {
                        "name": cusname[0],
                        "id": this.state.customer_name
                    },
                    "paymentNote": "note",
                    "amount": Grand,

                    "items": this.state.customerorder,
                    "discount": {
                        "type": this.state.type,
                        "value": this.state.discount
                    },
                })
            });
            const data = await response.json();
            if (response.status !== 200) {
                alert(data.message);
            }
        }
        this.props.history.push({
            pathname: '/bill',
            state: {
                order: [this.state.customerorder],
                customername: this.state.customer_name,
                grand: this.state.grandTotal,
            }
        });
    }

    render() {
        return (
            <> <div className='pos' >
                <PosWrapper>
                    <PosCalculation>
                        <p id='title'  > <ShoppingCart id='titl' /> Sales Invoice</p>
                        {this.state.data.map((item) => {
                            return (
                                <>
                                    <PosItemFilter>
                                        <Filterdata>
                                            <Person style={{
                                                border: '1px solid black',
                                                background: 'white',
                                                justifyContent: 'center', height: 40, margin: 0
                                            }} />
                                            <Form onSubmit={this.handelCustomerSubmit}>
                                                <Select style={{ fontSize: 16 }} type='text' placeholder="customername"
                                                    name='customer_name'
                                                    id='customer_name'
                                                    value={item.customer.name}>
                                                    <option value={item.customer.name}>{item.customer.name}</option>
                                                </Select>
                                                <Filteritemval style={{ fontSize: 16 }}
                                                    onChange={this.handelCustomer}
                                                    name='customeraddress'

                                                    type='text' value={item.customer.address} />
                                                <Filteritemval style={{ fontSize: 16 }} name="customercontact" onChange={this.handelCustomer} type='text' value={item.customer.phoneNo} />

                                            </Form>
                                        </Filterdata>
                                    </PosItemFilter>
                                    {/* items for table */}

                                    <PosItemContent>
                                        <TableContainer height="400px">
                                            <Table border='1px solid white' style={{ border: '2px solid white' }}
                                            >
                                                <TableHead style={{ background: '#3498db', height: 10, border: '2px solid white' }}>
                                                    <TableRow style={{ height: 4 }}>
                                                        <TableCell style={{ color: 'white', fontSize: 16 }} align='center'>Item Name</TableCell>

                                                        <TableCell style={{ color: 'white', fontSize: 16 }} align='center'>Quantity</TableCell>
                                                        <TableCell style={{ color: 'white', fontSize: 16 }} align='center'>Price inc.Tax</TableCell>
                                                        <TableCell style={{ color: 'white', fontSize: 16 }} align='center'>Total</TableCell>

                                                    </TableRow>
                                                </TableHead>
                                                <TableBody >
                                                    {
                                                        item.item.map((data, index) => {
                                                            return (
                                                                <TableRow >
                                                                    <TableCell style={{ fontSize: 18 }} align='center'>{data.itemname}</TableCell>
                                                                    <TableCell style={{ fontSize: 18 }} align='center' >{data.quantity}</TableCell>
                                                                    <TableCell style={{ fontSize: 18 }} align='center'>{data.price}</TableCell>
                                                                    <TableCell style={{ fontSize: 18 }} align='center'>{data.total}</TableCell>
                                                                </TableRow>
                                                            );
                                                        })
                                                    }

                                                </TableBody></Table></TableContainer>
                                    </PosItemContent>
                                    <Paymentrec>
                                        <form className='form' onSubmit={this.paysubmit(item.customer.name, item.customer.id, item.totalAmount, item.item)}><Posrec>
                                            <FormInputs> <div>Items<div style={{ marginTop: 10 }}>
                                                {item.totalQuantity}</div></div> </FormInputs>
                                            <FormInputs><div> Gross Amount  <div style={{ marginTop: 10 }} >
                                                Rs{item.totalAmount}</div></div></FormInputs>
                                            <FormInputs>
                                                <div>
                                                    <label htmlFor="type" > Discount type
                    </label>
                                                    <FormInput id="type" name='type'
                                                        value={this.state.type}

                                                        onChange={this.discountchanger}>
                                                        <option value="none" >--select type--</option>
                                                        <option value="fix">Fixed  Amount</option>
                                                        <option value="per">Percentage</option>
                                                    </FormInput>
                                                </div>

                                            </FormInputs>
                                            <FormInputs>
                                                <div>
                                                    <label htmlFor="discount"> Discount Value
                    </label>
                                                    <FormEntery type="text"

                                                        id='discount'
                                                        name="discount"
                                                        placeholder="discount....."
                                                        className="form-input"
                                                        value={this.state.discount}
                                                        onChange={this.discountchanger}
                                                    />

                                                </div>

                                            </FormInputs>

                                            <FormInputs>
                                                <div>
                                                    <label htmlFor="paymenttype" > Payment type
                    </label>
                                                    <FormInput id="paymenttype" name="paymenttype"
                                                        onChange={this.handelOnchange}
                                                    >
                                                        <option value="null">--payment type---</option>
                                                        <option value="credit">Credit</option>
                                                        <option value="cash">Cash</option>
                                                        <option value="partial">Partial</option>
                                                        <option value="esewa">Esewa</option>
                                                    </FormInput>

                                                </div>

                                            </FormInputs>

                                            {this.state.paymenttype === 'partial' ? (
                                                <FormInputs>
                                                    <div>
                                                        <label htmlFor="partialamount"> Partial Amount
                    </label>
                                                        <FormEntery type="text"

                                                            id='partialamount'
                                                            name="partialamount"
                                                            placeholder="partialamount....."
                                                            className="form-input"
                                                            value={this.state.partialamount}
                                                            onChange={this.handelOnchange} /></div></FormInputs>
                                            ) : ""}
                                            <FormInputs><div> Grand Total  <div style={{ marginTop: 10 }}>
                                                Rs{this.state.type !== 'none' ? this.GrandTotal(item.totalAmount) : item.totalAmount}
                                            </div>    </div></FormInputs>
                                        </Posrec>
                                            <FormInputsBtn><Link to='/'><PaymentBtn >DashBoard</PaymentBtn></Link>

                                                <PaymentBtn>Update Order</PaymentBtn>
                                                <PaymentBtn style={{ background: 'green' }} type="submit"> Pay Now</PaymentBtn>

                                            </FormInputsBtn>
                                        </form>   </Paymentrec>
                                </>

                            );

                        })}                    </PosCalculation>
                </PosWrapper>
            </div>

                <div></div>
            </>
        );
    }
}
export default SalesInvoice;