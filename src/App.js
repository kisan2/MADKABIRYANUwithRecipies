import React, { Component } from 'react';
import './App.css';
import { Sidebar } from './components/index';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Brand from './pages/Brand';
import Pos from './pages/Pos';
import Category from './pages/Category';
import Products from './pages/Products';
import Order from './pages/Order';
import HomeDeliver from './pages/HomeDeliver';
// import Footer from './components/Footer';
import SalesInvoice from './pages/SalesInvoice';
import Form from './pages/support/DailyOpening';
import Example from './pages/Example';
import OrderRecipt from './pages/OrderRecipt';
import Sales from './pages/Sales';
import Updatepos from './pages/Updatepos';
import { Logo } from './AdditionalDate/Data'
import {
  Modal,
  Modalcontent,
  Modalfooter,
  ModalBody, Span,
  Card,
  //  Head,
  FormInputs,
  FormLabel,
  // FormSelect,
  FormInput
} from './Model.element';
import PosTable from './pages/support/PosTable';
import { Tables } from './pages/Tables';
import Booked from './pages/Booked';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      Chasier: '000000',
      login: null,
      message: null,
      store: null,
      jwt: null,
      items: [],
      posButton: false,
      customer: [],
      apiurl: process.env.REACT_APP_SERVER_URL
    };
    this.handelchange = this.handelchange.bind(this);
    this.handelSubmit = this.handelSubmit.bind(this);
    this.getData = this.getData.bind(this);
    this.handelClick = this.handelClick.bind(this);
    this.posButton = this.posButton.bind(this);

  }
  componentDidMount() {
    this.getIsDayOpen();
    this.getlocal();
    if (localStorage.getItem('login') !== null) {
      const time = JSON.parse(localStorage.getItem('login'));
      const date = new Date();
      const day = date.getDay();
      if (time.day !== day) {
        localStorage.removeItem('login');
        this.setState({ login: false, store: false })

      }

    }
    if (localStorage.getItem('open') !== undefined && localStorage.getItem('open') !== null) {
      const IsDayOpen = JSON.parse(localStorage.getItem('open'));
      if (!IsDayOpen.value) {
        localStorage.removeItem('open');
      }
    }

  }
  getlocal() {
    let values = JSON.parse(localStorage.getItem('login'));
    if (values && values.login) {
      this.setState({ login: values.login, store: values.store, message: values.message });
    }

  }
  handelClick = () => {
    localStorage.removeItem('login');
    this.setState({ login: false, store: false })
  }
  getIsDayOpen = async () => {
    if (localStorage.getItem('login') !== undefined && localStorage.getItem('login') !== null) {
      let value = JSON.parse(localStorage.getItem("login"));
      let token = value.store;
      console.log(token);
      const apiUrl = `${process.env.REACT_APP_SERVER_URL}/day/status?isDayOpen=1`;
      const { success, data, } = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }).then(values => values.json());

      if (success) {

        this.setState({ posButton: data })
        localStorage.setItem(
          "open",
          JSON.stringify({
            value: data,
          })
        );
      }

    }


  };

  getData = async () => {
    // if (this.state.Chasier === '000000') {
    //   return alert('invalid users');
    // }
    const apiUrl = `${this.state.apiurl}/auth/login`;
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `${this.state.store}`
      },
      body: JSON.stringify({
        email: this.state.username,
        password: this.state.password,
        chasier: this.state.Chasier,
        device: 1
      })
    }).then(values => values.json().then((result) => {
      if (!result.login) {
        this.setState({ message: result.message })
      }
      const date = new Date();
      const time = date.getHours();
      const day = date.getDay();
      localStorage.setItem('login', JSON.stringify({
        login: result.success,
        store: result.token,
        // this needs to be changed here
        chasier: this.state.Chasier,
        time: time,
        day: day
      }))
      this.getlocal();
    }
    ));
  }
  handelchange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  }
  handelSubmit = e => {
    e.preventDefault();
    this.getData();

  }
  posButton = (value) => {
    // console.log(value + 'vale=========================================');
    this.setState({
      posButton: value
    })
  }
  render() {
    if (!this.state.login) {
      return (<>
        <div>
          <Card>
            <Modalcontent>{Logo.logoleft}
              <p style={{ color: '#e74c3c' }}>
                {Logo.logoRight}</p></Modalcontent>
            <Modal>


              <form className="form" onSubmit={this.handelSubmit}>
                <ModalBody>
                  {
                    this.state.message !== null ? <Span>{this.state.message}</Span> : ""
                  }
                  <FormInputs>
                    <FormLabel htmlFor="name" >UserName:</FormLabel>
                    <FormInput name="username"

                      placeholder="username....."
                      value={this.state.username}
                      id="username" type='text' onChange={this.handelchange} />
                  </FormInputs>
                  <FormInputs>
                    <FormLabel htmlFor="password" > Password:</FormLabel>
                    <FormInput name="password" id="password"
                      placeholder="password....."
                      value={this.state.password}
                      type='password'
                      onChange={this.handelchange} /></FormInputs>
                  {/* <FormInputs>
                    <FormLabel>Choose User:</FormLabel>
                    < FormSelect onChange={this.handelchange} name='Chasier'>
                      <option value='000000'>please choose your name while login here</option>
                      <option value='00712209'>Bijaya</option>
                    </ FormSelect>
                  </FormInputs> */}
                  <Modalfooter type="submit">Submit</Modalfooter>
                </ModalBody>
              </form></Modal>
          </Card>

        </div>

      </>
      );
    }
    return (
      <Router>
        <Sidebar
          posButton={this.state.posButton}
          setpos={() => this.posButton(this.state.posButton)}
          login={() => this.handelClick()} />
        <Switch>
          <Route path='/' exact render={(props) => <Dashboard
            state={this.state.posButton}
          />} />
          {console.log(this.state.posButton)}
          <Route path='/pos' exact component={Pos} />
          <Route path='/brand' exact component={Brand} />
          <Route path='/Category' exact component={Category} />
          <Route path='/Products' exact component={Products} />
          <Route path='/Order' exact component={Order} />
          <Route path='/HomeDeliver' exact component={HomeDeliver} />
          <Route path='/Form' exact component={Form} />
          <Route path='/table' exact component={Tables} />
          <Route path='/bill' exact component={Example} />
          <Route path='/postable' exact component={PosTable} />
          <Route path='/salesinvoice' exact component={SalesInvoice} />
          <Route path='/orderrecipt' exact component={OrderRecipt} />
          <Route path='/sales' exact component={Sales} />
          <Route path='/updatepos' exact component={Updatepos} />
          <Route path='/booked' exact component={Booked} />


        </Switch>

      </Router>
    );
  }
}
export default App;
