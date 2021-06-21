import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
} from "@material-ui/core";
import {
  ArrowDropDownSharp,
  ArrowDropUpSharp,
  Delete,
  Person,
  ShoppingCart,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import React, { Component } from "react";
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import TimePicker from 'react-time-picker';

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
  Addcustomer,
  Filterdata,
  Filteritemval,
  Form,
  Modal,
  ModalHeader,
  Modalclose,
  Modaltitle,
  Modalcontent,
  ModalBody,
  Modalfooter,
  Customer,
  FormInputsBtns,
  Card,
  Button,
  FormInputs,
  FormInput,
  FormLabel,
  FormEntery,
  FormInputsBtn,
  ModuleCont,
  Btn,
  Print,
  Posrec,
  Links,
  Cards,
} from "./support/Pos.element";
import Search from "./Searches";
import "../App.css";
import EditIcon from "@material-ui/icons/Edit";
import ReactToPrint from "react-to-print";
import OrderRecipt from "./OrderRecipt";
import { Dropdown } from "react-bootstrap";

import Model from './Modal/Modal';

export class Pos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      customer: [],
      customerorder: [],
      oders: {
        id: "",
        name: "",
        stock: "",
        quantity: 1,
        total: "",
        price: "",
        profitMargin: "",
        category: "",
      },
      discount: "",
      type: "",
      totalquantity: 0,
      totalprice: 0,
      totaldisc: 100,
      grandTotal: 0,
      up: false,
      pay: false,
      dis: false,
      disabled: false,
      drop: false,
      upid: "",
      itemcl: 0,
      customername: [],
      sliceS: 0,
      cusid: "",
      sliceE: 9,

      tableOnData: [],
      paymenttype: "",
      partialamount: "",
      name: "",
      address: "",
      phone: "",
      dataid: "",
      filteroption: "all",
      customer_name: "",
      ordereddata: "",
      print: false,
      Value: null,
      show: false,
      time: "00:00",
      customeraddress: "",
      customercontact: "",
      itemfiltered: "",
      apiurl: process.env.REACT_APP_SERVER_URL,
    };
    this.newUser = this.newUser.bind(this);
    this.updateParent = this.updateParent.bind(this);
    this.getcategory = this.getcategory.bind(this);
    this.getData = this.getData.bind(this);
    this.getcustomer = this.getcustomer.bind(this);
    this.OnCustomeritem = this.OnCustomeritem.bind(this);
    this.discountchanger = this.discountchanger.bind(this);
    this.handelSubmit = this.handelSubmit.bind(this);
    this.GrandTotal = this.GrandTotal.bind(this);
    this.paysubmit = this.paysubmit.bind(this);
    this.handeluser = this.handeluser.bind(this);
    this.deleteItem = this.deleteItem.bind(this);

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
    let value = JSON.parse(localStorage.getItem("login"));
    this.setState({ token: value.store });
    let token = value.store;
    const apiUrl = `${this.state.apiurl}/recepies?device=1`;
    const { data } = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    }).then(values => values.json());
    this.setState({ items: [...this.state.items, ...data] });
  };

  getcategory = async () => {
    let value = JSON.parse(localStorage.getItem("login"));
    this.setState({ token: value.store });
    let token = value.store;
    const apiUrl = `${this.state.apiurl}/item/categories?device=1`;
    const { data } = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    }).then(items => items.json());
    this.setState({ customer: [...this.state.customer, ...data] });
  };
  getcustomer = async customer => {
    this.setState({
      customer_name: customer,
      up: false,
    });
    let value = JSON.parse(localStorage.getItem("login"));
    this.setState({ token: value.store });
    let token = value.store;
    const apiUrl = `${this.state.apiurl}/customers?device=1`;
    const { data } = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    }).then(items => items.json());
    this.setState({ customername: [...this.state.customername, ...data] });
  };

  GrandTotal = () => {
    const type = this.state.type;
    let val = 0;
    let grand = 0;
    const discont = Number(this.state.discount);
    const totalprice = this.totalamount();
    if (type === "fix") {
      this.setState({ grandTotal: totalprice - discont });
    }
    if (type === "per") {
      val = discont / 100;
      grand = totalprice - totalprice * val;
      grand = grand.toFixed();
      this.setState({ grandTotal: grand });
    }
    if (type < -1) {
      this.setState({ grandTotal: totalprice });
    }
  };

  handeluser = async () => {
    let value = JSON.parse(localStorage.getItem("login"));
    this.setState({ token: value.store });
    let token = value.store;
    const apiUrl = `${this.state.apiurl}/customers/add-customer`;
    const response = await fetch(apiUrl, {
      method: "post",
      headers: {
        "content-type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        customer_name: this.state.customer_name,
        address: this.state.customeraddress,
        mobile_number: this.state.customercontact,

        device: 1,
      }),
    });

    const data = await response.json();
    if (response.status !== 200) {
      alert(data.message);
      throw new Error(
        "Invalid Request !! Please reload the page and retry again."
      );
    }

    this.setState({ cusid: data.data._id });
    this.getcustomer(this.state.customer_name);
    alert(data.message);
  };

  handelCustomer = e => {
    const value = e.target.value;

    this.setState({
      ...this.state,
      [e.target.name]: value,
    });
  };
  handelCustomerSubmit = e => {
    e.preventDefault();
  };

  // filter code
  filter = options => {
    return options.filter(
      option =>
        option["name"]
          .toLowerCase()
          .indexOf(this.state.itemfiltered.toLowerCase()) > -1
    );
  };
  handelIncreament = id => {
    const elementsIndex = this.state.customerorder.findIndex(
      customerorder => customerorder.id === id
    );
    let newArray = [...this.state.customerorder];

    newArray[elementsIndex] = {
      ...newArray[elementsIndex],
      quantity: newArray[elementsIndex].quantity + 1,
    };
    newArray[elementsIndex] = {
      ...newArray[elementsIndex],
      total: newArray[elementsIndex].quantity * newArray[elementsIndex].price,
    };
    this.setState({ customerorder: newArray });




  };
  handelDecreament = id => {
    const elementsIndex = this.state.customerorder.findIndex(
      customerorder => customerorder.id === id
    );
    let newArray = [...this.state.customerorder];

    newArray[elementsIndex] = {
      ...newArray[elementsIndex],
      quantity:
        newArray[elementsIndex].quantity > 1
          ? newArray[elementsIndex].quantity - 1
          : 1,
    };
    newArray[elementsIndex] = {
      ...newArray[elementsIndex],
      total: newArray[elementsIndex].quantity * newArray[elementsIndex].price,
    };
    this.setState({ customerorder: newArray });
  };
  handelOnchange = e => {
    const value = e.target.value;
    this.setState({
      ...this.state,
      [e.target.name]: value,
    });
  };
  discountchanger = e => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState(
      {
        ...this.state,
        [name]: value,
      },
      () => {
        this.GrandTotal();
      }
    );
  };
  discon = () => {
    this.setState({ dis: true });
  };
  newUser = () => {
    this.setState({ up: true });
  };
  upda = () => {
    this.setState({ pay: true });
  };
  random = () => {
    let r = Math.random().toString(36).substring(2);
    return r;
  };
  handleBookMark = async e => {
    // e.preventDefault();
    this.setState({ ...this.state, show: false })
    // this.handelModal();
    let value = JSON.parse(localStorage.getItem("login"));
    this.setState({ disabled: true });
    this.setState({ token: value.store });
    let token = value.store;
    let Grand = 0;
    Grand = Number(this.totalamount());
    let quantity = 0;
    quantity = Number(this.totalquantity());
    const apiUrl = `${this.state.apiurl}/booking`;
    const cusname = this.state.customername.find(
      customername => customername.mobile === this.state.customercontact
    );
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        customer: {
          name: this.state.customer_name,
          address: this.state.customeraddress,
          phoneNo: this.state.customercontact,
          id: this.state.cusid === "" ? cusname._id : this.state.cusid,
        },

        amount: Grand,
        quantity: quantity,
        items: this.state.customerorder,

        time: this.state.time

      }),
    });
    const { data, message } = await response.json();
    if (response.status === 200) {
      this.props.history.push('/');
    }
  }

  paysubmit = async e => {
    // e.preventDefault();
    let value = JSON.parse(localStorage.getItem("login"));
    this.setState({ disabled: true });
    this.setState({ token: value.store });
    let token = value.store;
    let Grand = 0;
    Grand = Number(this.totalamount());
    let quantity = 0;
    quantity = Number(this.totalquantity());
    const apiUrl = `${this.state.apiurl}/kot`;
    const cusname = this.state.customername.find(
      customername => customername.mobile === this.state.customercontact
    );

    const response = await fetch(apiUrl, {
      method: "post",
      headers: {
        "content-type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        customer: {
          name: this.state.customer_name,
          address: this.state.customeraddress,
          phoneNo: this.state.customercontact,
          id: this.state.cusid === "" ? cusname._id : this.state.cusid,
        },

        amount: Grand,
        quantity: quantity,
        items: this.state.customerorder,

      }),
    });
    const { data, message } = await response.json();
    console.log(data);
    this.setState({ dataid: data._id });

    if (response.status !== 200) {
      alert(message);
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: false });
      this.setState({ print: true });
      this.setState({ dataid: data._id });
      this.print();
    }
  };

  print = data => {
    let html;
    this.state.print
      ? (html = (
        <Print>
          <ModalBody
            style={{
              display: "flex",
              marginTop: 400,
              flexDirection: "column",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <div>OT has been added.</div>
            <div>
              <ReactToPrint
                trigger={() => (
                  <Links
                    to={{
                      pathname: "/sales",
                      state: {
                        data: this.state.dataid,
                        isPaid: false,
                      },
                    }}
                    style={{ textDecoration: "none" }}>
                    <ArrowForwardIcon /> Print OT And Go To Sales
                  </Links>
                )}
                content={() => this.componentRef}
              />
            </div>
            <div style={{ display: "none", border: "1px solid black" }}>
              <OrderRecipt
                data={this.state.dataid}
                ref={el => (this.componentRef = el)}
              />
            </div>
          </ModalBody>
        </Print>
      ))
      : (html = "");

    return html;
  };

  updateParent = value => {
    if (parseInt(value)) {
      this.setState({ Value: value, customercontact: value });
    } else {
      this.setState({
        Value: value,
        customercontact: value.mobile,
        customer_name: value.name,
        customeraddress: value.address,
      });
    }
  };

  handelParent = e => {
    e.preventDefault();
  };

  funUpdate = () => {
    return (
      <>
        {this.state.up ? (
          <div style={{ alignItems: "center", justifyContent: "center" }}>
            <Modal>
              <ModalHeader>
                <Modaltitle>Add New customers</Modaltitle>
                <Modalclose
                  onClick={() => {
                    this.setState({ up: false });
                  }}>
                  X
                </Modalclose>
              </ModalHeader>
              <Modalcontent>
                <ModalBody>
                  <form className='form' onSubmit={this.handeluser}>
                    <div className='form-inputs'>
                      <label htmlFor='name' className='form-label'>
                        {" "}
                        Name:
                      </label>
                      <input
                        type='text'
                        style={{ marginLeft: 34 }}
                        id='name'
                        name='name'
                        placeholder='Customer name......'
                        className='form-input'
                        value={this.state.name}
                        onChange={this.handelOnchange}
                      />
                    </div>
                    <div className='form-inputs'>
                      <label htmlFor='address' className='form-label'>
                        {" "}
                        Address:
                      </label>
                      <input
                        type='text'
                        style={{ marginLeft: 15 }}
                        id='address'
                        name='address'
                        placeholder='address.....'
                        className='form-input'
                        value={this.state.address}
                        onChange={this.handelOnchange}
                      />
                    </div>
                    <div className='form-inputs'>
                      <label htmlFor='phoneno' className='form-label'>
                        Phone no:
                      </label>
                      <input
                        type='text'
                        style={{ marginLeft: 10 }}
                        id='phone'
                        name='phone'
                        placeholder='phone no......'
                        className='form-input'
                        value={this.state.phone}
                        onChange={this.handelOnchange}
                      />
                    </div>
                    <Modalfooter type='submit'>Sign up</Modalfooter>
                  </form>
                </ModalBody>
              </Modalcontent>
            </Modal>
          </div>
        ) : (
          ""
        )}
      </>
    );
  };
  handelSubmit = e => {
    this.GrandTotal();
    this.setState({ dis: false });
  };

  items = () => {
    return (
      <>
        {this.state.filteroption === "all"
          ? this.filter(this.state.items).map((item, index) => {
            return (
              <Card key={index} onClick={() => this.OnCustomeritem(item._id)}>
                <p
                  className='names'
                  style={{
                    overflowWrap: "word-break",
                  }}>
                  {item.name}
                </p>
              </Card>
            );
          })
          : this.filter(this.state.items)
            .filter(items => items.category === this.state.filteroption)
            .slice(this.state.sliceS, this.state.sliceE)
            .map((item, index) => {
              return (
                <Card
                  key={index}
                  onClick={() => this.OnCustomeritem(item._id)}>
                  <p className='names'> {item.name}</p>
                </Card>
              );
            })}
      </>
    );
  };
  OnCustomeritem = id => {
    if (this.state.tableOnData.indexOf(id) === -1) {
      this.state.items
        .filter(items => items._id === id)
        .map((item, index) => {

          this.setState(
            {
              oders: {
                id: item._id,
                name: item.name,
                cost: item.cost,
                ingredients: item.ingredients,
                ingredientAmount: item.ingredientAmount,
                stock: item.category === 'beverage and drink' ? item.openingStock : item.quantity,
                price: item.category === 'beverage and drink' ? item.salesPrice : item.cost,
                quantity: 1,
                profitMargin: item.profitMargin,
                total: item.category === 'beverage and drink' ? item.salesPrice : item.cost,
                category: item.category,
              },
            },
            () => {
              this.setState({
                customerorder: [...this.state.customerorder, this.state.oders],
              });
            }
          );
        });
      // this.state.tableOnData.push(id);
      this.setState({ tableOnData: [...this.state.tableOnData, id] });
    } else {
      const elementsIndex = this.state.customerorder.findIndex(
        customerorder => customerorder.id === id
      );
      let newArray = [...this.state.customerorder];
      console.log(newArray[elementsIndex].stock)

      newArray[elementsIndex] = {
        ...newArray[elementsIndex],
        quantity: newArray[elementsIndex].quantity + 1,
      };
      newArray[elementsIndex] = {
        ...newArray[elementsIndex],
        total: newArray[elementsIndex].quantity * newArray[elementsIndex].price,
      };
      this.setState({ customerorder: newArray });

    }
  };
  totalamount = () => {
    let total = this.state.totalprice;
    this.state.customerorder.map((item, index) => {
      total = total + item.total;
    });
    return total;
  };
  totalquantity = () => {
    let total = this.state.totalquantity;
    this.state.customerorder.map((item, index) => {
      total = total + item.quantity;
    });
    return total;
  };
  // DELETING CODE
  deleteItem = (id) => {
    const item = this.state.customerorder;

    const elementsIndex = this.state.customerorder.findIndex(
      customerorder => customerorder.id === id
    );
    let newArray = [...this.state.customerorder];
    let newTableOnData = [...this.state.tableOnData];
    newTableOnData.splice(elementsIndex, 1)

    newArray.splice(elementsIndex, 1);
    this.setState({ customerorder: newArray });

    this.setState({ tableOnData: newTableOnData });
    // console.log(newArray)



  }

  tablebody = () => {
    return (
      <>
        {this.state.customerorder.map((item, index) => {
          return (
            <TableRow>
              <TableCell width='20%' style={{ fontSize: 18 }} align='center'>
                {item.name}
              </TableCell>
              <TableCell width='5%'
                style={{ fontSize: 18 }} align='center'>
                {item.stock}
              </TableCell>
              <TableCell width='57%'
                style={{ fontSize: 18 }} align='center'>
                <button
                  id='stock'
                  onClick={() => this.handelDecreament(item.id)}>
                  -
                </button>
                <input
                  id='stoc'
                  type='text'
                  value={item.quantity}
                  onchange={() => this.handelDecreament(item.id)}
                />
                <button
                  id='stock'
                  onClick={() => this.handelIncreament(item.id)}>
                  +
                </button>
              </TableCell>
              <TableCell width='8%'
                style={{ fontSize: 18 }} align='center'>
                {item.price}
              </TableCell>
              <TableCell width='10%' style={{ fontSize: 18 }}
                align='center'>
                {item.total}
              </TableCell>
              <TableCell  >
                <div style={{
                  cursor: 'pointer',
                  backgroundColor: 'red',
                  textAlign: 'center',
                  padding: '4px',
                  color: 'white',
                  borderRadius: '10px',
                  fontSize: '15px'
                }} onClick={() => this.deleteItem(item.id)}>Delete</div>

              </TableCell>
            </TableRow>
          );
        })}
      </>
    );
  };
  timeChange = time => {
    // console.log(new Date().toTimeString().split(" ")[0])
    this.setState({
      ...this.state,
      time: time
    }, () => console.log(this.state.time))
  }

  closeModelHandeler = () => {
    this.setState({
      ...this.state,
      show: false
    })
  }
  render() {

    let modal;
    if (this.state.show) {
      modal = <Model show={this.state.show}>
        <div style={{
          display: 'flex', flexDirection: 'row'
        }}> <p style={{ fontWeight: '500', fontSize: '18px', paddingRight: '10px' }}>Booked For :</p>
          <TimePicker
            style={{ outline: 'none' }}
            disableClock={true}
            name='time' value={this.state.time} onChange={this.timeChange} /></div>
        <div style={{
          display: 'flex',
          width: "100%",
          flexDirection: 'row', margin: '10px 20px', fontSize: "20px"
        }}>
          <PaymentBtn onClick={() => this.closeModelHandeler()} style={{
            background: 'red', width: '40%', height: '35px', fontSize: '16px',
            padding: '10px 0px'
          }}>close</PaymentBtn>
          <PaymentBtn style={{
            background: 'green', padding: '10px 0px', width: '40%', height: '35px', fontSize: '16px'
          }}
            onClick={() => this.handleBookMark()}

          >Book Now</PaymentBtn>

        </div>


      </Model >
    }

    return (
      <>
        {" "}
        <div className='pos'>
          <PosWrapper>
            <PosCalculation>
              <p id='title'>
                {" "}
                <ShoppingCart id='titl' /> Order Invoice
              </p>
              <PosItemFilter>
                <Filterdata>
                  <Form onSubmit={this.handelCustomerSubmit}>
                    <FormInputs>
                      <FormEntery
                        type='text'
                        name='customer_name'
                        id='customer_name'
                        placeholder='Customer name.......'
                        value={this.state.customer_name}
                        onChange={this.handelCustomer}
                      />
                    </FormInputs>
                    <FormInputs>
                      <FormEntery
                        value={this.state.customeraddress}
                        onChange={this.handelCustomer}
                        type='text'
                        placeholder='Address'
                        name='customeraddress'
                      />
                    </FormInputs>
                  </Form>
                  <form
                    style={{
                      marginTop: 0,
                      margin: 0,
                      marginBottom: 10,

                      width: "50%",
                    }}
                    onSubmit={this.updateParent}>
                    <FormInputs styel={{ background: "green" }}>
                      <Search
                        prompt='selected number....'
                        options={this.state.customername}
                        value={this.state.Value}
                        id='_id'
                        label='mobile'
                        onChange={this.updateParent}
                      />
                    </FormInputs>
                  </form>

                  <FormInputsBtn>
                    <button
                      onClick={() => {
                        this.handeluser();
                      }}>
                      Add Customer
                    </button>
                  </FormInputsBtn>
                </Filterdata>
              </PosItemFilter>

              <PosItemContent>

                <TableContainer >
                  <Table
                    border='1px solid white'
                    style={{ border: "2px solid white" }}>
                    <TableHead
                      style={{
                        background: "#3498db",
                        height: 10,
                        border: "2px solid white",
                      }}>
                      <TableRow style={{ height: 4 }}>
                        <TableCell width='30%'
                          style={{ color: "white", fontSize: 16 }}
                          align='center'>
                          Item Name
                        </TableCell>
                        <TableCell width='5%'
                          style={{ color: "white", fontSize: 16 }}
                          align='center'>
                          Stock
                        </TableCell>
                        <TableCell width='40%'
                          style={{ color: "white", fontSize: 16 }}
                          align='center'>
                          Quantity
                        </TableCell>
                        <TableCell width='8%'
                          style={{ color: "white", fontSize: 16 }}
                          align='center'>
                          Price inc.Tax
                        </TableCell>
                        <TableCell width='10%'
                          style={{ color: "white", fontSize: 16 }}
                          align='center'>
                          Total
                        </TableCell>
                        <TableCell width='10%'
                          style={{ color: "white", fontSize: 16 }}
                          align='center'>
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>{this.tablebody()}</TableBody>
                  </Table>
                </TableContainer>
              </PosItemContent>

              <Paymentdetail>
                <Paymentrec>
                  <form className='form'
                  // onSubmit={this.paysubmit}
                  >
                    <Posrec>
                      <FormInputs
                        style={{
                          fontWeight: 600,
                          fontStyle: "bold",
                          fontFamily: "Arial",
                        }}>
                        {" "}
                        Items:{" "}
                        <label style={{ marginLeft: 10 }}>
                          {this.totalquantity()}
                        </label>
                      </FormInputs>
                      <FormInputs
                        style={{
                          fontWeight: 600,
                          fontStyle: "bold",
                          fontFamily: "Arial",
                        }}>
                        {" "}
                        Total Amount:{" "}
                        <label style={{ marginLeft: 10 }}>
                          Rs{this.totalamount()}
                        </label>
                      </FormInputs>
                    </Posrec>
                  </form>
                  <FormInputsBtns>
                    <Link to='/'>
                      <PaymentBtn style={{ width: '200px' }}>DashBoard</PaymentBtn>
                    </Link>
                    <PaymentBtn style={{
                      background: "orange", width: '200px'
                    }}
                      onClick={() => this.setState({
                        ...this.state,
                        show: true
                      })}
                    ><AccessAlarmIcon /> Book Order</PaymentBtn>
                    <PaymentBtn
                      style={{ background: "green", width: '200px' }}
                      type='submit'
                      onClick={() => this.paysubmit()}
                      disabled={this.state.disabled}>
                      <ShoppingCart /> Order Now
                    </PaymentBtn>
                  </FormInputsBtns>

                </Paymentrec>
              </Paymentdetail>
            </PosCalculation>

            <PosItemcontainer>
              <PosItemFilter style={{ borderTop: "none" }}>
                <Filterdata>
                  <Person
                    style={{
                      borderTop: "1px solid black",
                      borderBottom: "1px solid black",
                      alignItems: "center",
                      borderLeft: "1px solid black",
                      background: "white",
                      justifyContent: "center",
                      height: 40,
                      margin: 0,
                    }}
                  />

                  <Select
                    onChange={this.handelOnchange}
                    style={{ fontSize: 18 }}
                    name='filteroption'>
                    <optgroup style={{ fontSize: 18 }} label='ALL Category'>
                      <option style={{ fontSize: 18 }} value='all'>
                        All category
                      </option>
                      {this.state.customer.map(item => {
                        return (
                          <option
                            style={{ fontSize: 18 }}
                            key={item._id}
                            value={item.category}>
                            {item.category}
                          </option>
                        );
                      })}
                    </optgroup>
                  </Select>
                </Filterdata>
                <Filterdata>
                  <Filteritemval
                    style={{ fontSize: 18 }}
                    type='text'
                    name='itemfiltered'
                    placeholder='All items'
                    onChange={this.handelCustomer}
                  />
                  <Button>All</Button>
                </Filterdata>
              </PosItemFilter>
              <ModuleCont className='scrollbar'>{this.items()}</ModuleCont>
            </PosItemcontainer>
          </PosWrapper>
        </div>
        <div>
          {this.funUpdate()}
          {this.print()}
          {modal}
        </div>
        <div></div>
      </>
    );
  }
}
export default Pos;
