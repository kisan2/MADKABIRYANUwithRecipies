import React, { useState, useHistory } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { IconContext } from "react-icons/lib";
import { Submenu } from ".";
import {
  Nav,
  NavIcon,
  Navright,
  SidebarNav,
  SidebarWrap,
  Navleft,
  NavCenter, NavSelect,
  NavBtn,
} from "./Sidebar.element";
import { Logo } from "../AdditionalDate/Data";

import { SidebarData } from "./SidebarData";
import { useEffect } from "react";

const Sidebar = ({ login, setpos }) => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const [Pos, setPos] = useState(false);
  const [Open, setOpen] = useState(false);
  const [cashier, setChasier] = useState('');

  const [Indicator, setIndicator] = useState(false);
  const showIndic = () => setIndicator(!Indicator);

  useEffect(() => {
    getIsDayOpen();
    if (localStorage.getItem('open') !== undefined && localStorage.getItem('open') !== null) {
      const IsDayOpen = JSON.parse(localStorage.getItem('open'));
      if (IsDayOpen.value) {
        setOpen(true);
        setpos(true);
      } else {
        localStorage.removeItem('open');
      }
    }
  }, [])

  const getIsDayOpen = async () => {
    let value = JSON.parse(localStorage.getItem("login"));
    let token = value.store;
    console.log(token);
    const apiUrl = `${process.env.REACT_APP_SERVER_URL}/day/status?isDayOpen=1`;
    const { success, data, message } = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    }).then(values => values.json());

    if (success) {
      setOpen(data);
      setpos(data);
      localStorage.setItem(
        "open",
        JSON.stringify({
          value: data,
        })
      );
    }
  };

  const getData = async () => {
    let value = JSON.parse(localStorage.getItem("login"));
    let token = value.store;
    const apiUrl = `${process.env.REACT_APP_SERVER_URL}/day/status?device=1`;
    const { success, isDayOpen, message } = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    }).then(values => values.json());
    if (success) {
      setOpen(isDayOpen);
      setpos(true);

      localStorage.setItem(
        "open",
        JSON.stringify({
          value: isDayOpen,
        })
      );
      getIsDayOpen();
    } else {
      alert(message);
    }
  };
  const handelClicked = () => {
    if (cashier === "001") {
      return login();
    }

  }
  const handelChange = (e) => {
    setChasier(e.target.value);
    if (e.target.value === '001') {
      return login();
    }
  }
  return (
    <>
      <div>
        <IconContext.Provider style={{ background: "#e67e22" }}>
          <Nav>
            <Navleft>
              <NavIcon to='#'>
                <MenuIcon
                  style={{ color: "white" }}
                  onClick={() => {
                    showSidebar();
                  }}
                />
              </NavIcon>
            </Navleft>
            <NavCenter
              onClick={() => {
                setSidebar(false);
              }}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                {Logo.logoleft}<p style={{ color: "#e74c3c" }}>
                  {Logo.logoRight}
                </p>
              </div>
            </NavCenter>

            <Navright
              onClick={() => {
                setSidebar(false);
              }}>
              <div onClick={() => setPos(true)}>
                <NavIcon to='/' style={{ margin: 0 }}>
                  <NavBtn > DashBoard </NavBtn>
                </NavIcon>
              </div>
              <div onClick={() => setPos(true)}>
                <NavIcon to='/Pos' style={{ margin: 0 }}>
                  <NavBtn disabled={!Open ? true : false}> POS </NavBtn>
                </NavIcon>
              </div>
              {Open ? (
                <NavBtn
                  onClick={() => {
                    showIndic();
                    getData();
                  }}>
                  Day open
                </NavBtn>
              ) : (
                <NavBtn
                  onClick={() => {
                    showIndic();
                    getData();
                  }}>
                  Day close
                </NavBtn>
              )}

              {/* select option for shift change goes here */}
              {/* <NavSelect name="cashier" onChange={() => handelChange()} onClick={() => handelClicked()}>
                <option value="00712209">Bijya</option>
                <option value="001"><buttton>shift change</buttton></option>

              </NavSelect> */}

              <NavBtn onClick={() => login()}>Logout</NavBtn>
            </Navright>
          </Nav>
          <div>
            <SidebarNav sidebar={sidebar}>
              <SidebarWrap>
                {SidebarData.map((item, index) => {
                  return (
                    <Submenu
                      sidebar={sidebar}
                      setSidebar={setSidebar}
                      item={item}
                      key={index}
                      val={Pos}
                      data={setPos}
                    />
                  );
                })}
              </SidebarWrap>
              <div
                onClick={showSidebar}
                style={{
                  background: "transparent",
                  margin: 10,
                  height: "100%",
                  width: "90%",
                }}></div>
            </SidebarNav>
          </div>
        </IconContext.Provider>
      </div>
    </>
  );
};

export default Sidebar;
