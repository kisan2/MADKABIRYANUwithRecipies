import { Table, TableCell, TableContainer, TableHead, TableRow, TableBody } from '@material-ui/core';
import { Person, ShoppingCart } from '@material-ui/icons';
import React, { Component } from 'react';
import {
    PosWrapper,
    PosItemcontainer,
    PosCalculation,
    PosItemFilter,
    PosItemContent,
    Paymentdetail,
    Paymentrec,
    PaymentBtn,
    Select,
    Filterdata, Filteritemval, Form,
    Modal,
    ModalHeader,
    Modalclose,
    Modaltitle,
    Modalcontent,
    ModalBody,
    Modalfooter,
    Card, Posrec,
    FormInputs, FormInputsBtn,
    ModuleCont
} from './Pos.element'
export class PosTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            customer: [],
            customerorder: [],
            oders: {
                id: '',
                itemname: '',
                stock: '',
                quantity: 1,
                total: '',
                price: '',
                category: ''
            },
            discount: '',
            type: '',
            totalquantity: 0,
            totalprice: 0,
            totaldisc: 100,
            grandTotal: 0,
            up: false,
            pay: false,
            dis: false,
            upid: '',
            itemcl: 0,
            customername: [],
            sliceS: 0,
            sliceE: 9,
            tableOnData: [],
            paymenttype: '',
            partialamount: '',
            name: '',
            address: '',
            phone: '',
            filteroption: 'all',
            customer_name: 'all',
            apiurl: process.env.REACT_APP_SERVER_URL
        };
        this.newUser = this.newUser.bind(this);
        this.getcategory = this.getcategory.bind(this);
        this.getData = this.getData.bind(this);
        this.getcustomer = this.getcustomer.bind(this);
        this.OnCustomeritem = this.OnCustomeritem.bind(this);
        this.discountchanger = this.discountchanger.bind(this);
        this.handelSubmit = this.handelSubmit.bind(this);
        this.GrandTotal = this.GrandTotal.bind(this);
        this.paysubmit = this.paysubmit.bind(this);
        this.handeluser = this.handeluser.bind(this);
        this.handelOnchange = this.handelOnchange.bind(this);
        this.handelCustomer = this.handelCustomer.bind(this);
        this.handelCustomerSubmit = this.handelCustomerSubmit.bind(this);
    }
    componentDidMount() {
        this.getData();
        this.getcategory();
        this.getcustomer();
    }
    componentWillUnmount() {
        this.getData();
        this.getcategory();
        this.getcustomer();
        this.GrandTotal();
    }
    componentDidUpdateMount() {
        this.getData();
        this.getcategory();
        this.getcustomer();
    }
    getData = async () => {
        let value = JSON.parse(localStorage.getItem('login'));
        this.setState({ token: value.store });
        let token = value.store;
        const apiUrl = `${this.state.apiurl}/item/items?device=1`;
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
    getcategory = async () => {
        let value = JSON.parse(localStorage.getItem('login'));
        this.setState({ token: value.store });
        let token = value.store;
        const apiUrl = `${this.state.apiurl}/item/categories?device=1`;
        const { data } = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`
            }
        }).then(items => items.json());
        this.setState({ customer: [...this.state.customer, ...data] });
    }
    getcustomer = async () => {
        this.setState({ customer_name: this.state.name });
        this.setState({
            up: false
        });
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
            customername: [...this.state.customername, ...data]
        });
    }
    GrandTotal = () => {
        const type = this.state.type;
        let val = 0;
        let grand = 0;
        const discont = Number(this.state.discount);
        const totalprice = this.totalamount();
        if (type === 'fix') {
            this.setState({ grandTotal: totalprice - discont });
        }
        if (type === 'per') {
            val = (discont / 100);
            grand = totalprice - totalprice * val;
            grand = grand.toFixed();
            this.setState({ grandTotal: grand });
        }
        if (type < -1) {
            this.setState({ grandTotal: totalprice });
        }
    }
    handelDelete = (item) => {
    };
    handeluser = async (e) => {
        e.preventDefault();
        let value = JSON.parse(localStorage.getItem('login'));
        this.setState({ token: value.store });
        let token = value.store;
        const apiUrl = `${this.state.apiurl}/customers/add-customer`;
        const response = await fetch(apiUrl, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({
                "customer_name": this.state.name,
                "address": this.state.address,
                "phone_number": this.state.phone,
                "mobile_number": this.state.phone,
                "store": "Ktm Branch",
                "state": "kathmandu"
            })
        })



        const data = await response.json();
        if (response.status !== 200) {
            alert(data.message);
        }

        alert(data.message);

        this.getcustomer();
    }
    handelCustomer = e => {
        const value = e.target.value;
        this.setState({
            ...this.state,
            [e.target.name]: value,
        });
    }
    handelCustomerSubmit = e => {
        e.preventDefault();
    }
    handelIncreament = (id) => {
        const elementsIndex = this.state.customerorder.findIndex(customerorder => customerorder.id === id);
        let newArray = [...this.state.customerorder];
        newArray[elementsIndex] = { ...newArray[elementsIndex], quantity: newArray[elementsIndex].quantity + 1 };
        newArray[elementsIndex] = { ...newArray[elementsIndex], total: newArray[elementsIndex].quantity * newArray[elementsIndex].price };
        this.setState({ customerorder: newArray, });
    }
    handelDecreament = (id) => {
        const elementsIndex = this.state.customerorder.findIndex(customerorder => customerorder.id === id);
        let newArray = [...this.state.customerorder];
        newArray[elementsIndex] = { ...newArray[elementsIndex], quantity: newArray[elementsIndex].quantity > 1 ? newArray[elementsIndex].quantity - 1 : 1 };
        newArray[elementsIndex] = { ...newArray[elementsIndex], total: newArray[elementsIndex].quantity * newArray[elementsIndex].price };
        this.setState({ customerorder: newArray, });
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
    discon = () => {
        this.setState({ dis: true });
    }
    newUser = () => {
        this.setState({ up: true });
    }
    upda = () => {
        this.setState({ pay: true });
    }
    paysubmit = async (e) => {
        e.preventDefault();
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
                    "inputPartialAmount": this.state.partialamount,
                })
            });
            const data = await response.json();
            if (response.status !== 200) {
                alert(data.message);
            }
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

    funUpdate = () => {
        return (
            <>
                {this.state.up ? (
                    <div style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Modal>
                            <ModalHeader>

                                <Modaltitle>Add New customers</Modaltitle>
                                <Modalclose onClick={() => { this.setState({ up: false }) }}>X</Modalclose>
                            </ModalHeader>
                            <Modalcontent>
                                <ModalBody>
                                    <form className='form' onSubmit={this.handeluser}>
                                        <div className="form-inputs">
                                            <label htmlFor="name" className="form-label"> Name:
                    </label>
                                            <input type="text"
                                                style={{ marginLeft: 34 }}
                                                id='name'
                                                name="name"
                                                placeholder="Customer name......"
                                                className="form-input"
                                                value={this.state.name}
                                                onChange={this.handelOnchange}
                                            /></div>
                                        <div className="form-inputs">
                                            <label htmlFor="address" className="form-label"> Address:
                             </label>
                                            <input type="text"
                                                style={{ marginLeft: 15 }}
                                                id='address'
                                                name="address"
                                                placeholder="address....."
                                                className="form-input"
                                                value={this.state.address}
                                                onChange={this.handelOnchange}
                                            /></div>
                                        <div className="form-inputs">
                                            <label htmlFor="phoneno" className="form-label">Phone no:
                            </label>
                                            <input type="text"
                                                style={{ marginLeft: 10 }}
                                                id='phone'
                                                name="phone"
                                                placeholder="phone no......"
                                                className="form-input"
                                                value={this.state.phone}
                                                onChange={this.handelOnchange} /></div>
                                        <Modalfooter type='submit' >Sign up</Modalfooter>
                                    </form></ModalBody></Modalcontent>
                        </Modal></div>) : ''}</>);
    }
    handelSubmit = e => {

        this.GrandTotal();
        this.setState({ dis: false });
    }

    items = () => {
        return (
            <>
                {this.state.filteroption === 'all' ? (this.state.items.slice(this.state.sliceS, this.state.sliceE).map((item, index) => {
                    return (<Card key={index} onClick={() => this.OnCustomeritem(item._id)} > {item.name}</Card>
                    );

                })) : (this.state.items.filter(items => items.category === this.state.filteroption).slice(this.state.sliceS, this.state.sliceE).map((item, index) => {
                    return (<Card key={index} onClick={() => this.OnCustomeritem(item._id)} > {item.name}</Card>
                    );

                }))
                }
            </>
        );
    }
    OnCustomeritem = (id) => {
        if (this.state.tableOnData.indexOf(id) === -1) {
            this.state.items.filter(items => items._id === id).map((item, index) => {
                this.setState({
                    oders: {
                        id: item._id,
                        itemname: item.name,
                        stock: item.openingStock,
                        price: item.salesPrice,
                        quantity: 1,
                        total: item.salesPrice,
                        category: item.category
                    }
                }, () => {
                    this.setState({ customerorder: [...this.state.customerorder, this.state.oders] });
                })
            });
            this.state.tableOnData.push(id)
            this.setState({ tableOnData: [...this.state.tableOnData, id] });
        } else {
            const elementsIndex = this.state.customerorder.findIndex(customerorder => customerorder.id === id);
            let newArray = [...this.state.customerorder];
            newArray[elementsIndex] = { ...newArray[elementsIndex], quantity: newArray[elementsIndex].quantity + 1 };
            newArray[elementsIndex] = { ...newArray[elementsIndex], total: newArray[elementsIndex].quantity * newArray[elementsIndex].price };
            this.setState({ customerorder: newArray, });
        }
    }
    totalamount = () => {
        let total = this.state.totalprice;
        this.state.customerorder.map((item, index) => {
            total = total + item.total;
        });
        return total;
    }
    totalquantity = () => {
        let total = this.state.totalquantity;
        this.state.customerorder.map((item, index) => {
            total = total + item.quantity;
        });
        return <>{total}</>;
    }
    tablebody = () => {
        return (
            <>
                {this.state.customerorder.map((item, index) => {
                    return (<TableRow >
                        <TableCell style={{ fontSize: 18 }} align='center'>{item.itemname}</TableCell>

                        <TableCell style={{ fontSize: 18 }} align='center' >
                            <button id='stock' onClick={() => this.handelDecreament(item.id)}>-</button>
                            <input id='stoc' type='text'
                                value={item.quantity}
                                onchange={() => this.handelDecreament(item.id)} />
                            <button id='stock' onClick={() => this.handelIncreament(item.id)}>+</button>
                        </TableCell>
                        <TableCell style={{ fontSize: 18 }} align='center'>{item.price}</TableCell>
                        <TableCell style={{ fontSize: 18 }} align='center'>{item.total}</TableCell>

                    </TableRow>
                    );
                })}
            </>
        );
    };
    render() {
        return (
            <> <div className='pos' >
                <PosWrapper>
                    <PosCalculation>
                        <p id='title'  > <ShoppingCart id='titl' /> Order Invoice</p>
                        <PosItemFilter>
                            <Filterdata>
                                <Person style={{
                                    borderTop: '1px solid black', borderBottom: '1px solid black', alignItems: 'center',
                                    borderLeft: '1px solid black',
                                    background: 'white',
                                    justifyContent: 'center', height: 40, margin: 0
                                }} />
                                <Form onSubmit={this.handelCustomerSubmit}>
                                    <Select style={{ fontSize: 18 }}
                                        name='customer_name'
                                        id='customer_name'
                                        defaultValue={this.state.customer_name}
                                        value={this.state.customer_name}
                                        onChange={this.handelCustomer} >
                                        <optgroup label="Added Tables">
                                            <option value={"table" + this.props.location.state.tableno} style={{ fontSize: 18 }}>Table No{this.props.location.state.tableno}</option>
                                        </optgroup>
                                    </Select></Form>

                            </Filterdata>
                            <Filteritemval style={{ fontSize: 18 }} type='text' placeholder='All items' />
                        </PosItemFilter>
                        <PosItemContent>
                            <TableContainer height="400px">
                                <Table border='1px solid white' style={{ border: '2px solid white' }}
                                >
                                    <TableHead style={{ background: '#3498db', border: '2px solid white' }}>
                                        <TableRow >
                                            <TableCell style={{ color: 'white', fontSize: 18 }} align='center'>Item Name</TableCell>
                                            <TableCell style={{ color: 'white', fontSize: 18 }} align='center'>Quantity</TableCell>
                                            <TableCell style={{ color: 'white', fontSize: 18 }} align='center'>Price inc.Tax</TableCell>
                                            <TableCell style={{ color: 'white', fontSize: 18 }} align='center'>Total</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody >
                                        {this.tablebody()}
                                    </TableBody></Table></TableContainer>
                        </PosItemContent>
                        <Paymentdetail >
                            <Paymentrec>
                                <form className='form' onSubmit={this.paysubmit}>
                                    <Posrec>


                                        <FormInputs
                                            style={{ fontWeight: 600, fontStyle: 'bold', fontFamily: 'Arial' }}

                                        > Items: <label style={{ marginLeft: 10 }}>
                                                {this.totalquantity()}</label></FormInputs>
                                        <FormInputs style={{ fontWeight: 600, fontStyle: 'bold', fontFamily: 'Arial' }} > Total Amount:  <label style={{ marginLeft: 10 }}>
                                            Rs{this.totalamount()}</label></FormInputs></Posrec>
                                    <FormInputsBtn><PaymentBtn>Update</PaymentBtn>
                                        <PaymentBtn type="submit">Order Now</PaymentBtn>
                                    </FormInputsBtn>
                                </form>   </Paymentrec>


                        </Paymentdetail>
                    </PosCalculation>
                    <PosItemcontainer>
                        <PosItemFilter style={{ borderTop: 'none' }}>
                            <Filterdata>
                                <Person style={{
                                    borderTop: '1px solid black', borderBottom: '1px solid black', alignItems: 'center',
                                    borderLeft: '1px solid black',
                                    background: 'white',
                                    justifyContent: 'center', height: 40, margin: 0
                                }} />
                                <Select onChange={this.handelOnchange} style={{ fontSize: 18 }} name="filteroption"
                                >
                                    <optgroup style={{ fontSize: 18 }} label="ALL Category">
                                        <option style={{ fontSize: 18 }} value="all">All category</option>
                                        {this.state.customer.map((item) => {
                                            return (
                                                <option style={{ fontSize: 18 }} key={item._id} value={item.category} >
                                                    {item.category}</option>
                                            );
                                        })}</optgroup></Select>
                            </Filterdata>
                            <Filteritemval style={{ fontSize: 18 }} type='text' placeholder='All items' />
                        </PosItemFilter>
                        <ModuleCont>{this.items()}</ModuleCont>
                    </PosItemcontainer>
                </PosWrapper>
            </div>
                <div>
                    {this.funUpdate()}

                </div>
                <div></div>
            </>
        );
    }
}
export default PosTable;