import React, { Component } from "react";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
} from "@material-ui/core";
import { Person, ShoppingCart } from "@material-ui/icons";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
// import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { Logo } from '../AdditionalDate/Data';
import PrintAgain from './PrintAgain'
import ReactToPrint from "react-to-print";
import {
  PosWrapper,
  // PosItemcontainer,
  PosCalculation,
  PosItemFilter,
  PosItemContent,
  Paymentdetail,
  Paymentrec,
  PaymentBtn,
  Select,
  // Addcustomer,
  Filterdata,
  Filteritemval,
  Form,
  // Modal,
  // ModalHeader,
  // Modalclose,
  Print,
  Links,
  FormInputsBtns,
  FilterSelect,
  // Modaltitle,
  // Modalcontent,
  ModalBody,
  // Modalfooter,
  // Card,
  // Button,
  FormInputs,
  FormInput,
  FormLabel,
  FormEntery,
  FormInputsBtn,
  // ModuleCont,
  // Btn,
  Posrec,
  // Cards,
} from "./support/Pos.element";
import { ComponentToPrint } from "./Componenttopprint";
// import Printing from "./printingpayed";

export class Sales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      customer: [],
      customerorder: [],
      oders: {
        id: "",
        itemname: "",
        stock: "",
        quantity: 1,
        total: "",
        price: "",
        category: "",
      },
      discount: "",
      invoiceNo: "",
      type: "none",
      totalquantity: 0,
      totalprice: 0,
      totaldisc: 100,
      grandTotal: 0,
      up: false,
      pay: false,
      dis: false,
      disable: false,
      print: false,
      discountValue: 0,
      netAmount: 0,
      deliveryPerson: "none",
      hasBeenPaid: "",
      upid: "",
      itemcl: 0,
      customername: [],
      sliceS: 0,
      sliceE: 9,
      tableOnData: [],
      paymenttype: "",
      partialamount: "",
      name: "",
      address: "",
      dataid: "",
      phone: "",
      filteroption: "all",
      customer_name: "all",
      ordereddata: "",
      posted: [],
      customeraddress: "",
      customercontact: "",
      deliveryCharge: 0,
      apiurl: process.env.REACT_APP_SERVER_URL,
    };
    this.getData = this.getData.bind(this);
    this.discountchanger = this.discountchanger.bind(this);
    this.handelSubmit = this.handelSubmit.bind(this);
    this.getOrder = this.getOrder.bind(this);
  }
  componentDidMount() {
    this.getData();
    this.getOrder();
  }
  handelSubmit = e => {
    e.preventDefault();
  };

  getOrder = async () => {
    let value = JSON.parse(localStorage.getItem("login"));
    this.setState({ token: value.store });
    let token = value.store;
    // this.setState({
    //   posted: [],
    // });

    const invoice =
      this.props.location.state !== undefined
        ? this.props.location.state.data
        : null;


    const apiUrl = `${this.state.apiurl}/order/ledger/${invoice}`;
    const { success, data } = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    }).then(values => values.json());
    if (success) {
      this.setState({ posted: [data] });

      this.setState({ val: false });
    } else {
      this.setState({ posted: [] });

    }
  };
  paysubmit = async () => {
    this.setState({ disable: true });
    let value = JSON.parse(localStorage.getItem("login"));
    this.setState({ token: value.store });
    let token = value.store;
    const item = this.state.items.find(
      items => items._id === this.props.location.state.data
    );

    let Grand = 0;
    if (this.state.type === "none") {
      Grand = item.totalAmount;
    } else {
      Grand = this.grandTotal(item.totalAmount);
    }
    const partial = this.state.paymenttype;
    const apiUrl = `${this.state.apiurl}/pos`;

    if (partial === "partial") {
      const response = await fetch(apiUrl, {
        method: "post",
        headers: {
          "content-type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          customer: {
            name: item.customer.name,
            id: item.customer.id,
          },
          hdNo: item.hdNo,
          invoiceNo: item.invoiceNo,

          paymentType: this.state.paymenttype,
          paymentNote: "note",

          amount: Grand,
          items: item.item,
          discount: {
            type: this.state.type,
            value: this.state.discount,
          },
          inputPartialAmount: this.state.partialamount,
          deliveryPerson: this.state.deliveryPerson,
          deliveryCharge: this.state.deliveryCharge,
          paymentStatus: this.state.hasBeenPaid,
          kotId: this.props.location.state.data,
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        alert(data.message);
        this.setState({ disable: false });
      }
      if (response.status === 200) {
        this.setState({
          disable: false,
          discountValue: data.discount,
          netAmount: data.netAmount,
          deliveryPerson: data.deliveryPerson,
          hasBeenPaid: data.paymentStatus,
          invoiceNo: data.invoiceNo
        });
        this.setState({ print: true });
        this.print(data.discount, data.netAmount);
      }
    }
    if (partial !== "partial") {
      const response = await fetch(apiUrl, {
        method: "post",
        headers: {
          "content-type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          customer: {
            name: item.customer.name,
            id: item.customer.id,
          },
          hdNo: item.hdNo,
          invoiceNo: item.invoiceNo,
          paymentType: this.state.paymenttype,
          paymentNote: "note",

          amount: Grand,
          items: item.item,
          discount: {
            type: this.state.type,
            value: this.state.discount,
          },
          deliveryPerson: this.state.deliveryPerson,
          deliveryCharge: this.state.deliveryCharge,

          paymentStatus: this.state.hasBeenPaid,
          kotId: this.props.location.state.data,
        }),
      });
      const data = await response.json();
      if (response.status !== 200) {
        alert(data.message);
        this.setState({ disable: false });
      }

      if (response.status === 200) {
        this.setState({
          disable: false,
          discountValue: data.discount,
          netAmount: data.netAmount,
          deliveryPerson: data.deliveryPerson,
          deliveryCharge: data.deliveryCharge,
          hasBeenPaid: data.paymentStatus,
          invoiceNo: data.invoiceNo
        });
        this.setState({ print: true });

        this.print(data.discount, data.netAmount);
      }
    }
  };
  print = (discount, netAmount) => {
    let html;
    const itemed = this.state.items.find(
      items => items._id === this.props.location.state.data
    );
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
                      pathname: "/",
                      state: {
                        data: netAmount,
                      },
                    }}
                    style={{ textDecoration: "none" }}>
                    <ArrowForwardIcon /> Print Sales And Dashboard
                  </Links>
                )}
                content={() => this.componentRef}
              />
            </div>
            <div style={{ display: "none", border: "1px solid black" }}>
              <ComponentToPrint
                invoiceNo={this.state.invoiceNo}
                discount={this.state.discountValue}
                netAmount={this.state.netAmount}
                deliveryPerson={this.state.deliveryPerson}
                deliveryCharged={this.state.deliveryCharge}
                paymentStatus={this.state.hasBeenPaid}
                item={itemed}
                ref={el => (this.componentRef = el)}
              />
            </div>
          </ModalBody>
        </Print>
      ))
      : (html = "");

    return html;
  };
  handelCustomer = e => {
    const value = e.target.value;
    if (e.target.name === 'deliveryCharge') {
      if (value !== '') {
        this.setState({
          ...this.state,
          [e.target.name]: value,
        });
      } else {
        this.setState({
          ...this.state,
          [e.target.name]: 0,
        });
      }
    } else {
      this.setState({
        ...this.state,
        [e.target.name]: value,
      });
    }
  };
  getData = async () => {
    let value = JSON.parse(localStorage.getItem("login"));
    this.setState({ token: value.store });
    let token = value.store;
    const apiUrl = `${this.state.apiurl}/kot`;
    const { data } = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    }).then(values => values.json());
    this.setState({ items: [...this.state.items, ...data] });
  };

  discountchanger = e => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  grandTotal = total => {
    const type = this.state.type;
    let val = 0;
    let grand = 0;
    // const item = this.state.items.find(
    //   items => items._id === this.props.location.state.data
    // );
    const discont = Number(this.state.discount);
    const totalprice = total;
    console.log(totalprice);
    if (type === "fix") {
      grand = totalprice - discont;
    }
    if (type === "per") {
      val = discont / 100;
      grand = totalprice - totalprice * val;
    }
    return grand;
  };

  printit = (layer) => {
    var generator = window.open('', 'name', 'left=200,top=50,height=800,width=800,toolbar=0,scrollbars=0,status  =0')
    var layertext = document.getElementById(layer);
    generator.document.write(layertext.innerHTML.replace("Print Me"));
    generator.document.close();
    generator.blur();
    generator.print();
    generator.close();
  }

  render() {
    const orderData =
      this.props.location.state !== undefined
        ? this.props.location.state.data
        : null;
    let html;

    if (orderData) {
      if (this.state.posted.length !== 0) {
        html = (
          <div style={{ marginTop: 80, width: '99%' }}>
            {
              this.state.posted.map((item) => {
                return (
                  <div className='print' id='print' style={{
                    fontFamily: "Roboto Condensed", fontSize: "12px", width: "100%", textRendering: "optimizeLegibility",
                    fontSmooth: 'antialiased', WebkitFontSmoothing: 'antialiased'
                  }}>
                    <div style={{
                      textAlign: "center", width: "100%", margin: "0 auto 20px", textRendering: "optimizeLegibility",
                      fontSmooth: 'antialiased', WebkitFontSmoothing: 'antialiased'
                    }}>
                      <div style={{ padding: "0px 0" }}>{Logo.name}</div>
                      <div>{Logo.address}</div>
                      <div style={{ padding: "5px 0" }}>PHONE NO. : {Logo.contact}</div>
                      <div>PAN NO. :{Logo.pan}</div>
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
                            {item.refNo}</td>
                        </tr>
                        <tr>
                          <td style={{ width: "20%", }}>Kot No</td>
                          <td style={{ width: "2%" }}>:</td>
                          <td style={{ fontWeight: "600", width: "70%" }}>
                            {item.kotId}</td>
                        </tr>
                        <tr>
                          <td>Bill No.</td>
                          <td>:</td>
                          <td>{item.invoiceNo}</td>
                        </tr>
                        <tr>
                          <td style={{ width: "35%" }}>Customer Name</td>
                          <td>:</td>
                          <td style={{ textTransform: 'capitalize' }}>
                            {item.customer.name}</td>
                        </tr>
                        <tr>
                          <td>Phone No.</td>
                          <td>:</td>
                          <td>{item.customer.phoneNo}</td>
                        </tr>
                        <tr>
                          <td style={{ verticalAlign: "top" }}>Address</td>
                          <td style={{ verticalAlign: "top" }}>:</td>
                          <td style={{ textTransform: 'capitalize' }}>
                            {item.customer.address}</td>
                        </tr>
                        <tr>
                          <td>HD By</td>
                          <td>:</td>
                          <td style={{ textTransform: 'capitalize' }}>
                            {item.deliveryPerson}</td>
                        </tr>
                        <tr>
                          <td>Total Items</td>
                          <td>:</td>
                          <td>{item.item.length}</td>
                        </tr>
                        <tr>
                          <td>Total Quantity</td>
                          <td>:</td>
                          <td>{item.totalQuantity}</td>
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
                        {item.item.map((item, index) => {
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
                          }}>Rs. {parseFloat(item.grossAmount).toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td style={{ paddingBottom: 10 }}>Discount Amount</td>
                          <td style={{ paddingBottom: 10 }}>:</td>
                          <td style={{ paddingBottom: 10 }}>Rs.
                            {parseFloat(item.discount.value).toFixed(2)}</td>
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
                          }}>Rs. {parseFloat(item.totalAmount).toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td style={{
                            padding: 10, paddingRight: 0,
                            paddingLeft: 0
                          }}>Paid Status</td>
                          <td style={{ padding: 10, paddingRight: 0, paddingLeft: 0 }} >:</td>
                          <td style={{
                            padding: 10, paddingRight: 0,
                            paddingLeft: 0, textTransform: 'capitalize'
                          }}>{item.paymentStatus}</td>
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
              })
            }
            <PosWrapper>
              {this.state.posted.map(item => {
                console.log('data of kot')
                console.log(this.state.posted)
                return (
                  <PosCalculation>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'row',
                      margin: '10px 0px'
                    }} >
                      <div style={{
                        display: 'flex',
                        flex: "50%"
                      }}>
                        <p id='title'>
                          {" "}
                          <ShoppingCart id='titl' /> Sales Invoice
                        </p>
                      </div>

                      <div style={{
                        display: 'flex',
                        flex: "19%",
                        margin: '5px auto',
                        justifyContent: 'flex-end',
                        flexDirection: 'column',
                        margin: '0px 100px'
                      }}>



                        {this.state.items
                          .filter(items => items._id === orderData)
                          .map(item => {
                            return <p style={{
                              margin: '3px auto',
                              color: 'red',
                              fontWeight: '500'
                            }}>OrderedDate:<span style={{
                              color: 'black',
                              fontWeight: '400'
                            }}> {item.date}</span></p>

                          })}
                        <p
                          style={{
                            margin: '3px auto',
                            color: 'green',
                            fontWeight: '500'
                          }}
                        >  Delivered At:<span style={{
                          color: 'black',
                          fontWeight: '400'
                        }} >  {item.date}</span></p>
                      </div>
                    </div>

                    <PosItemFilter>
                      <Filterdata>
                        <Person
                          style={{
                            border: "1px solid black",
                            background: "white",
                            justifyContent: "center",
                            height: 40,
                            margin: 0,
                          }}
                        />
                        <Form onSubmit={this.handelCustomerSubmit}>
                          <Select
                            style={{ fontSize: 16 }}
                            type='text'
                            placeholder='customername'
                            name='customer_name'
                            id='customer_name'>
                            <option value={item.customer.name}>
                              {item.customer.name}
                            </option>
                          </Select>
                          <Filteritemval
                            style={{ fontSize: 16 }}
                            onChange={this.handelCustomer}
                            name='customeraddress'
                            value={item.customer.address}
                            type='text'
                          />
                          <Filteritemval
                            style={{ fontSize: 16 }}
                            name='customercontact'
                            value={item.customer.phoneNo}
                            onChange={this.handelCustomer}
                            type='text'
                          />
                          <FilterSelect
                            name='deliveryPerson'
                            onChange={this.handelCustomer}>
                            <option value={item.deliveryPerson}>
                              {item.deliveryPerson}
                            </option>


                          </FilterSelect>
                          <Filteritemval
                            style={{ fontSize: 16 }}
                            name='customercontact'
                            value={item.deliveryCharge}
                            onChange={this.handelCustomer}
                            type='text'
                          />
                        </Form>
                      </Filterdata>
                    </PosItemFilter>
                    <PosItemContent>
                      <TableContainer height='400px'>
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
                              <TableCell
                                style={{ color: "white", fontSize: 16 }}
                                align='center'>
                                Item Name
                              </TableCell>
                              <TableCell
                                style={{ color: "white", fontSize: 16 }}
                                align='center'>
                                Stock
                              </TableCell>
                              <TableCell
                                style={{ color: "white", fontSize: 16 }}
                                align='center'>
                                Quantity
                              </TableCell>
                              <TableCell
                                style={{ color: "white", fontSize: 16 }}
                                align='center'>
                                Price inc.Tax
                              </TableCell>
                              <TableCell
                                style={{ color: "white", fontSize: 16 }}
                                align='center'>
                                Total
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {item.item.map(el => {
                              return (
                                <TableRow style={{ height: 4 }}>
                                  <TableCell
                                    style={{ fontSize: 16 }}
                                    align='center'>
                                    {el.name}
                                  </TableCell>
                                  <TableCell
                                    style={{ fontSize: 16 }}
                                    align='center'>
                                    {el.stock}
                                  </TableCell>
                                  <TableCell
                                    style={{ fontSize: 16 }}
                                    align='center'>
                                    {el.quantity}
                                  </TableCell>
                                  <TableCell
                                    style={{ fontSize: 16 }}
                                    align='center'>
                                    {el.price}
                                  </TableCell>
                                  <TableCell
                                    style={{ fontSize: 16 }}
                                    align='center'>
                                    {el.total}
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </PosItemContent>

                    <Paymentdetail>
                      <Paymentrec>
                        <form className='form' onSubmit={this.handelSubmit}>
                          <Posrec>
                            <FormInputs
                              style={{
                                marginRight: 3,
                                marginLeft: 3,
                              }}>
                              <div>
                                <FormLabel>Items</FormLabel>
                                <div style={{ marginTop: 10 }}>
                                  {item.totalQuantity}
                                </div>
                              </div>{" "}
                            </FormInputs>
                            <FormInputs>
                              <div>
                                {" "}
                                <FormLabel>Gross Amount </FormLabel>
                                <div style={{ marginTop: 10 }}>
                                  Rs{item.grossAmount}
                                </div>
                              </div>
                            </FormInputs>
                            <FormInputs>
                              <div>
                                <FormLabel htmlFor='type'>
                                  {" "}
                                  Discount type
                                </FormLabel>
                                <FormInput
                                  id='type'
                                  name='type'
                                  value={this.state.type}
                                  onChange={this.discountchanger}>
                                  <option value={item.discount.type}>
                                    {item.discount.type}
                                  </option>
                                </FormInput>
                              </div>
                            </FormInputs>
                            <FormInputs>
                              <div>
                                <FormLabel htmlFor='discount'>
                                  {" "}
                                  Discount Value
                                </FormLabel>
                                <FormEntery
                                  type='text'
                                  id='discount'
                                  name='discount'
                                  placeholder='discount.....'
                                  className='form-input'
                                  value={item.discount.value}
                                  onChange={this.discountchanger}
                                />
                              </div>
                            </FormInputs>

                            <FormInputs>
                              <div>
                                <FormLabel htmlFor='paymenttype'>
                                  {" "}
                                  Payment type
                                </FormLabel>
                                <FormInput
                                  id='paymenttype'
                                  name='paymenttype'
                                  onChange={this.discountchanger}>
                                  <option value={item.paymentType}>
                                    {item.paymentType}
                                  </option>
                                </FormInput>
                              </div>
                            </FormInputs>

                            {item.paymentType === "partial" ? (
                              <FormInputs>
                                <div>
                                  <FormLabel htmlFor='partialamount'>
                                    {" "}
                                    Partial Amount
                                  </FormLabel>
                                  <FormEntery
                                    type='text'
                                    id='partialamount'
                                    name='partialamount'
                                    placeholder='partialamount.....'
                                    className='form-input'
                                    value={item.paidAmount}
                                    onChange={this.discountchanger}
                                  />
                                </div>
                              </FormInputs>
                            ) : (
                              ""
                            )}
                            <FormInputs>
                              <div>
                                <FormLabel>Status</FormLabel>

                                <FormInput
                                  id='hasBeenPaid'
                                  name='hasBeenPaid'
                                  onChange={this.discountchanger}>
                                  <option value={item.paymentStatus}>
                                    {item.paymentStatus}
                                  </option>
                                </FormInput>
                              </div>
                            </FormInputs>
                            <FormInputs>
                              <div>
                                {" "}
                                <FormLabel>Grand Total</FormLabel>{" "}
                                <div style={{ marginTop: 10 }}>
                                  Rs
                                  {this.state.type === "none"
                                    ? item.totalAmount
                                    : this.grandTotal(item.totalAmount)}
                                </div>{" "}
                              </div>
                            </FormInputs>
                          </Posrec>
                        </form>
                        <FormInputsBtn
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '55px'
                            , fontsize: '23px'
                          }}
                        >
                          <div>
                            <ReactToPrint
                              trigger={() => {
                                return <PaymentBtn
                                  disabled={this.state.disable}

                                  style={{
                                    background: "green",
                                    fontsize: '20px',

                                    height: 45, width: 90
                                  }}
                                >print this out</PaymentBtn>
                              }}
                              content={() => this.componentRef}
                            />
                            <div style={{ display: 'none' }}>
                              <PrintAgain
                                data={this.state.posted}
                                ref={el => (this.componentRef = el)} />
                            </div>


                          </div>

                          {/* <PaymentBtn
                              style={{

                                fontsize: 20,
                                height: 45, width: 90
                              }}
                              onClick={() => this.setState({ updatefroms: true })}
                            >
                              Modify
                            </PaymentBtn> */}
                        </FormInputsBtn>
                        {
                          this.props.location.state.isPaid === false ? (
                            <div>
                              <FormInputsBtns>
                                <Link to='/'>
                                  <PaymentBtn>DashBoard</PaymentBtn>
                                </Link>

                                <Link
                                  to={{
                                    pathname: "/updatepos",
                                    state: {
                                      data: item._id,
                                    },
                                  }}>
                                  <PaymentBtn>Update Order</PaymentBtn>
                                </Link>
                                <PaymentBtn
                                  style={{ background: "green" }}
                                  disabled={this.state.disable}
                                  onClick={() => {
                                    this.paysubmit();
                                  }}>
                                  {" "}
                                  Pay Now
                                </PaymentBtn>
                              </FormInputsBtns>
                            </div>
                          ) : (
                            ""
                          )
                        }
                      </Paymentrec>
                    </Paymentdetail>
                  </PosCalculation>
                );
              })}
            </PosWrapper>
            {this.print()}
          </div>
        );
      } else {
        html = (
          <div style={{ marginTop: 80, width: '99%' }}>
            <PosWrapper>
              {this.state.items
                .filter(items => items._id === orderData)
                .map(item => {
                  console.log('kots are here')
                  return (
                    <PosCalculation>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'row'
                      }}>
                        <p id='title' style={{
                          flex: '50%',
                        }}>
                          {" "}
                          <ShoppingCart id='titl' /> Sales Invoice

                        </p>

                        <div style={{
                          display: 'flex',
                          flex: "15%",
                          margin: '5px auto',
                          justifyContent: 'flex-end',
                          flexDirection: 'column'
                        }}>
                          <p style={{
                            margin: '3px auto',
                            color: 'red',
                            fontWeight: '500'
                          }}>OrderedDate:<span style={{
                            color: 'black',
                            fontWeight: '400'
                          }}> {item.date}</span></p>

                        </div>
                      </div>



                      <PosItemFilter>
                        <Filterdata>
                          <Person
                            style={{
                              border: "1px solid black",
                              background: "white",
                              justifyContent: "center",
                              height: 40,
                              margin: 0,
                            }}
                          />
                          <Form onSubmit={this.handelCustomerSubmit}>
                            <Select
                              style={{ fontSize: 16 }}
                              type='text'
                              placeholder='customername'
                              name='customer_name'
                              id='customer_name'>
                              <option value={item.customer.name}>
                                {item.customer.name}
                              </option>
                            </Select>
                            <Filteritemval
                              style={{ fontSize: 16 }}
                              onChange={this.handelCustomer}
                              name='customeraddress'
                              value={item.customer.address}
                              type='text'
                            />
                            <Filteritemval
                              style={{ fontSize: 16 }}
                              name='customercontact'
                              value={item.customer.phoneNo}
                              onChange={this.handelCustomer}
                              type='text'
                            />
                            <FilterSelect
                              name='deliveryPerson'
                              onChange={this.handelCustomer}>
                              <option value='none'>
                                ---delivery personal---
                              </option>
                              <option value='gopal'>
                                Gopal
                              </option>
                              <option value=' purna chhetri'>
                                Purna Chhetri
                              </option>
                              {/* <option value='kushal shrestha'>
                                Kushal shrestha{" "}
                              </option> */}
                            </FilterSelect>
                            {
                              this.state.deliveryPerson !== 'none' ? <Filteritemval
                                style={{ fontSize: 16 }}
                                name='deliveryCharge'
                                placeholder="delivery charge..."
                                onChange={this.handelCustomer}
                                type='text'
                              /> : ''
                            }


                          </Form>
                        </Filterdata>
                      </PosItemFilter>
                      <PosItemContent>
                        <TableContainer height='400px'>
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
                                <TableCell
                                  style={{ color: "white", fontSize: 16 }}
                                  align='center'>
                                  Item Name
                                </TableCell>
                                <TableCell
                                  style={{ color: "white", fontSize: 16 }}
                                  align='center'>
                                  Stock
                                </TableCell>
                                <TableCell
                                  style={{ color: "white", fontSize: 16 }}
                                  align='center'>
                                  Quantity
                                </TableCell>
                                <TableCell
                                  style={{ color: "white", fontSize: 16 }}
                                  align='center'>
                                  Price inc.Tax
                                </TableCell>
                                <TableCell
                                  style={{ color: "white", fontSize: 16 }}
                                  align='center'>
                                  Total
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {item.item.map(el => {
                                return (
                                  <TableRow style={{ height: 4 }}>
                                    <TableCell
                                      style={{ fontSize: 16 }}
                                      align='center'>
                                      {el.name}
                                    </TableCell>
                                    <TableCell
                                      style={{ fontSize: 16 }}
                                      align='center'>
                                      {el.stock}
                                    </TableCell>
                                    <TableCell
                                      style={{ fontSize: 16 }}
                                      align='center'>
                                      {el.quantity}
                                    </TableCell>
                                    <TableCell
                                      style={{ fontSize: 16 }}
                                      align='center'>
                                      {el.price}
                                    </TableCell>
                                    <TableCell
                                      style={{ fontSize: 16 }}
                                      align='center'>
                                      {el.total}
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </PosItemContent>

                      <Paymentdetail>
                        <Paymentrec>
                          {
                            this.props.location.state.isPaid === false ? (
                              <div>
                                <form
                                  className='form'
                                  onSubmit={this.handelSubmit}>
                                  <Posrec>
                                    <FormInputs
                                      style={{ marginRight: 3, marginLeft: 3 }}>
                                      <div>
                                        <FormLabel>Items</FormLabel>
                                        <div style={{ marginTop: 10 }}>
                                          {item.totalQuantity}
                                        </div>
                                      </div>{" "}
                                    </FormInputs>
                                    <FormInputs>
                                      <div>
                                        {" "}
                                        <FormLabel>Gross Amount </FormLabel>
                                        <div style={{ marginTop: 10 }}>
                                          Rs{item.totalAmount}
                                        </div>
                                      </div>
                                    </FormInputs>
                                    <FormInputs>
                                      <div>
                                        <FormLabel htmlFor='type'>
                                          {" "}
                                          Discount type
                                        </FormLabel>
                                        <FormInput
                                          id='type'
                                          name='type'
                                          value={this.state.type}
                                          onChange={this.discountchanger}>
                                          <option value='none'>
                                            --select type--
                                          </option>
                                          <option value='fix'>
                                            Fixed Amount
                                          </option>
                                          <option value='per'>
                                            Percentage
                                          </option>
                                        </FormInput>
                                      </div>
                                    </FormInputs>
                                    <FormInputs>
                                      <div>
                                        <FormLabel htmlFor='discount'>
                                          {" "}
                                          Discount Value
                                        </FormLabel>
                                        <FormEntery
                                          type='text'
                                          id='discount'
                                          name='discount'
                                          placeholder='discount.....'
                                          className='form-input'
                                          value={this.state.discount}
                                          onChange={this.discountchanger}
                                        />
                                      </div>
                                    </FormInputs>

                                    <FormInputs>
                                      <div>
                                        <FormLabel htmlFor='paymenttype'>
                                          {" "}
                                          Payment type
                                        </FormLabel>
                                        <FormInput
                                          id='paymenttype'
                                          name='paymenttype'
                                          onChange={this.discountchanger}>
                                          <option>--payment type---</option>
                                          <option value='credit'>Credit</option>
                                          <option value='cash'>Cash</option>
                                          <option value='partial'>
                                            Partial
                                          </option>
                                          <option value='esewa'>Esewa</option>
                                        </FormInput>
                                      </div>
                                    </FormInputs>

                                    {this.state.paymenttype === "partial" ? (
                                      <FormInputs>
                                        <div>
                                          <FormLabel htmlFor='partialamount'>
                                            {" "}
                                            Partial Amount
                                          </FormLabel>
                                          <FormEntery
                                            type='text'
                                            id='partialamount'
                                            name='partialamount'
                                            placeholder='partialamount.....'
                                            className='form-input'
                                            value={this.state.partialamount}
                                            onChange={this.discountchanger}
                                          />
                                        </div>
                                      </FormInputs>
                                    ) : (
                                      ""
                                    )}
                                    <FormInputs>
                                      <div>
                                        <FormLabel>Status</FormLabel>

                                        <FormInput
                                          id='hasBeenPaid'
                                          name='hasBeenPaid'
                                          onChange={this.discountchanger}>
                                          <option value=''>
                                            --payment status---
                                          </option>
                                          <option value='paid'>Paid</option>
                                          <option value='unpaid'>Unpaid</option>
                                          <option value='partial'>
                                            Partial
                                          </option>
                                        </FormInput>
                                      </div>
                                    </FormInputs>
                                    <FormInputs>
                                      <div>
                                        {" "}
                                        <FormLabel>Grand Total</FormLabel>{" "}
                                        <div style={{ marginTop: 10 }}>
                                          Rs
                                          {this.state.type === "none"
                                            ? parseFloat(item.totalAmount) + parseFloat(this.state.deliveryCharge)
                                            : this.grandTotal(item.totalAmount + parseFloat(this.state.deliveryCharge))}
                                        </div>{" "}
                                      </div>
                                    </FormInputs>
                                  </Posrec>
                                </form>
                                <FormInputsBtns>
                                  <Link to='/'>
                                    <PaymentBtn>DashBoard</PaymentBtn>
                                  </Link>

                                  <Link
                                    to={{
                                      pathname: "/updatepos",
                                      state: {
                                        data: item._id,
                                      },
                                    }}>
                                    <PaymentBtn>Update Order</PaymentBtn>
                                  </Link>
                                  <PaymentBtn
                                    style={{ background: "green" }}
                                    disabled={this.state.disable}
                                    onClick={() => {
                                      this.paysubmit();
                                    }}>
                                    {" "}
                                    Pay Now
                                  </PaymentBtn>
                                </FormInputsBtns>
                              </div>
                            ) : (
                              ""
                            )
                          }
                        </Paymentrec>
                      </Paymentdetail>
                    </PosCalculation>
                  );
                })}
            </PosWrapper>
            {this.print()}
          </div>
        );
      }
    } else {
      html = <h1>Page not found !!</h1>;
    }
    return html;
  }
}

export default Sales;
