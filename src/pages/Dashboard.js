import React, { Component } from "react";
import AddIcon from "@material-ui/icons/Add";
import "../App.css";
import { Link } from "react-router-dom";
import {
  Dash,
  Top,
  Bottom,
  Left,
  Right,

  Btn,

  ContainerWarning,

  Homedeliver,
  Card,
  Head,
  Body,
  Table,
  Cards,
} from "./support/Dash.element";
import { Logo } from "../AdditionalDate/Data";

import CategoryIcon from "@material-ui/icons/Category";
export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      ordered: [],
      show: false,
      value: [],
      posButtom: false,
      token: this.props.token,
      tableno: "",
      items: [],
      item: [],
      customername: [],
      apiurl: process.env.REACT_APP_SERVER_URL,
    };
    this.getData = this.getData.bind(this);
    this.getItem = this.getItem.bind(this);
    this.getcategory = this.getcategory.bind(this);
    this.getcustomer = this.getcustomer.bind(this);
    this.PosData = this.PosData.bind(this);
  }
  componentWillMount() {
    this.PosData();
  }

  componentDidMount() {
    this.PosData();
    this.getData();
    this.getOrder();
    this.getItem();
    this.getcategory();
    this.getcustomer();
  }

  componentDidCatch() {
    this.PosData();
  }

  componentWillUnmount() {
    this.PosData();
  }
  PosData = () => {
    if (localStorage.getItem("open") !== null && localStorage.getItem("open") !== undefined) {
      const datas = JSON.parse(localStorage.getItem("open"));
      datas.value
        ? this.setState({ posButtom: true })
        : this.setState({ posButtom: false });
    }
  }


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

  getOrder = async () => {
    let value = JSON.parse(localStorage.getItem("login"));
    this.setState({ token: value.store });
    let token = value.store;
    const apiUrl = `${this.state.apiurl}/orders?device=1`;
    const { data } = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    }).then(values => values.json());
    this.setState({ ordered: [...this.state.ordered, ...data] });
    this.setState({ val: false });
  };

  getItem = async () => {
    let value = JSON.parse(localStorage.getItem("login"));
    this.setState({ token: value.store });
    let token = value.store;
    const apiUrl = `${this.state.apiurl}/item/items?device=1`;
    const { data } = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    }).then(values => values.json());

    this.setState({ value: data, up: false });
    this.setState({
      name: "",
      category: "",
      brand: "",
      unit: "",
      price: "",
      alert: "",
      opening: "",
    });
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
    this.setState({ item: data });
  };
  getcustomer = async () => {
    this.setState({ customer_name: this.state.name });
    this.setState({
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

  Table = number => {
    this.props.history.push({
      pathname: "/postable",
      state: {
        tableno: 1,
      },
    });
  };

  HomeDelivery = () => {
    return (
      <>
        <div>
          {this.state.data.map((item, index) => {
            this.state.ordered
              .filter(ordered => ordered._id === item._id)
              .map(items => {
                return (
                  <Btn style={{ marginTop: 20, background: "red" }}>
                    {item.name}
                  </Btn>
                );
              });
          })}
        </div>
      </>
    );
  };
  render() {
    return (
      <div className='Dashboard'>
        <Dash>
          <h2>Welcome To {Logo.name}</h2>
          <Top>
            <Left>
              <Card>
                <Head>Avilable Tables</Head>
                <Body className='scrollbar'>
                  <Table
                    onClick={() => this.Table(1)}
                    style={{
                      border: "none",
                      backgroundImage: 'url("./images/chair.png")',
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "bottom",
                      textAlign: "right",
                    }}>
                    <div>1</div>
                  </Table>

                  <Table
                    style={{
                      border: "none",
                      backgroundImage: 'url("./images/chair.png")',
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "bottom",
                      textAlign: "right",
                    }}>
                    <div>2</div>
                  </Table>
                </Body>
              </Card>
            </Left>
            <Right>
              <Card>
                <Homedeliver>HomeDelivery</Homedeliver>
                <Cards className='scrollbar'>
                  {console.log(this.props.state)}
                  <Link to={this.props.state ? '/Pos' : '/'}
                  >
                    <Btn
                      disabled={this.props.state ? false : true}
                      style={{
                        border: "none",
                        backgroundImage: 'url("./images/delivery32.png")',
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "bottom",
                        textAlign: "right",
                      }}>
                      <div>+</div>
                    </Btn>
                  </Link>
                  {this.state.items.map((items, indexs) => {
                    let style = {
                      border: "none",
                      backgroundImage: 'url("./images/delivery32.png")',
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "bottom",
                    };

                    if (items.isPaid) {
                      style.backgroundColor = "#4cd137";
                    } else {
                      style.backgroundColor = "lightblue";
                    }

                    return (
                      <Link
                        to={{
                          pathname: "/sales",
                          state: {

                            data: items._id,
                            isPaid: items.isPaid,
                            invoiceNo: items.invoiceNo,
                          },
                        }}>
                        <Btn style={style}>
                          <div>{indexs + 1}</div>
                        </Btn>
                      </Link>
                    );
                  })}
                </Cards>
              </Card>
            </Right>
          </Top>
          <Bottom className='scrollbar'>
            <ContainerWarning
              style={{
                display: "flex",
                background: "#4834d4",
                flexDirection: "row",
                justifyContent: "center",
                color: "white",
              }}>
              <div
                style={{
                  display: "flex",
                  flex: "80%",
                  margin: 10,
                  flexDirection: "column",
                  textAlign: "left",
                  justifyContent: "flex-start",
                }}>
                <p style={{ fontSize: 24, fontFamily: "Arial" }}>
                  Total Category
                </p>
                <p
                  style={{
                    fontSize: 24,
                    fontFamily: "Arial",
                    fontWeight: 900,
                    fontStyle: "bold",
                  }}>
                  {this.state.item.length}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flex: "19%",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 10,
                }}>
                <div id='circle'>
                  <CategoryIcon id='CategoryIcon' />
                </div>
              </div>
            </ContainerWarning>

            <ContainerWarning
              style={{
                display: "flex",
                background: "#55efc4",
                flexDirection: "row",
                justifyContent: "center",
                color: "white",
              }}>
              <div
                style={{
                  display: "flex",
                  flex: "80%",
                  margin: 10,
                  flexDirection: "column",
                  textAlign: "left",
                  justifyContent: "flex-start",
                }}>
                <p style={{ fontSize: 24, fontFamily: "Arial" }}>Total Items</p>
                <p
                  style={{
                    fontSize: 24,
                    fontFamily: "Arial",
                    fontWeight: 900,
                    fontStyle: "bold",
                  }}>
                  {this.state.value.length}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flex: "19%",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 10,
                }}>
                <div
                  id='circle'
                  style={{
                    backgroundImage: 'url("./images/cart2.png")',
                  }}></div>
              </div>
            </ContainerWarning>

            <ContainerWarning
              style={{
                display: "flex",
                background: "#e84393",
                flexDirection: "row",
                justifyContent: "center",
                color: "white",
              }}>
              <div
                style={{
                  display: "flex",
                  flex: "80%",
                  margin: 10,
                  flexDirection: "column",
                  textAlign: "left",
                  justifyContent: "flex-start",
                }}>
                <p
                  style={{
                    display: "inline-block",
                    fontSize: 26,
                    fontFamily: "Arial",
                  }}>
                  Total Order
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: 16,
                      fontFamily: "Arial",
                      margin: 1,
                    }}>
                    per day
                  </span>
                </p>
                <p
                  style={{
                    fontSize: 24,
                    fontFamily: "Arial",
                    fontWeight: 900,
                    fontStyle: "bold",
                  }}>
                  {this.state.items.length}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flex: "19%",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 10,
                }}>
                <div
                  id='circle'
                  style={{
                    backgroundImage: 'url("./images/delivery.png")',
                  }}></div>
              </div>
            </ContainerWarning>
            <ContainerWarning
              style={{
                display: "flex",
                background: "#f9ca24",
                flexDirection: "row",
                justifyContent: "center",
                color: "white",
              }}>
              <div
                style={{
                  display: "flex",
                  flex: "80%",
                  margin: 10,
                  flexDirection: "column",
                  textAlign: "left",
                  justifyContent: "flex-start",
                }}>
                <p style={{ fontSize: 24, fontFamily: "Arial" }}>
                  Total Customers
                </p>
                <p
                  style={{
                    fontSize: 24,
                    fontFamily: "Arial",
                    fontWeight: 900,
                    fontStyle: "bold",
                  }}>
                  {this.state.customername.length}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flex: "19%",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 10,
                }}>
                <div
                  id='circle'
                  style={{
                    backgroundImage: 'url("./images/customer.png")',
                  }}></div>
              </div>{" "}
            </ContainerWarning>
          </Bottom>
        </Dash>
      </div >
    );
  }
}
export default Dashboard;
