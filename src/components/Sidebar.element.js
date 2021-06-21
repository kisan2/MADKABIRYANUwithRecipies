import styled from 'styled-components';
import { Link } from 'react-router-dom';


export const Nav = styled.nav`
background:#2c3e50;
position:fixed;
top:0;
left:0;
width:100%;
height:60px;
display:flex;


`;
export const Navleft = styled.div`
display:flex;
flex:50%;
justify-content:flex-start;
@media screen and (max-width:1000px){
  flex:20%;




`;
export const NavCenter = styled.div`
display:flex;
flex:50%;
top:0;

justify-content:center;
align-items:center;
color:#ffffff;
font-size:34px;
font-weight: 700;
@media screen and (max-width:1000px){
  flex:30%;
  justify-content:flex-start;
  font-size:28px;
font-weight: 700;
  
}

`;

export const Navright = styled.div`
display:flex;
flex:50%;
justify-content:center;
align-items:center;
margin:0px auto;

@media screen and (max-width:1000px){
  flex:70%;
  margin-right:5px;
  justify-content:flex-end;
  align-items:center;


`;

export const NavBtn = styled.button`
color:black;
font-size:18px;
border:none;

text-align:center;
padding:8px;
border-top-left-radius:10px;
border-bottom-right-radius:10px;
margin-left:20px;
outline:none;
cursor:pointer;

@media screen and (max-width:1000px){
  font-size:16px;
  text-align:none;
  margin-left:10px;
  padding:6px;

}

`;
export const NavSelect = styled.select`
color:black;
font-size:18px;
border:none;

text-align:center;
padding:8px;
border-top-left-radius:10px;
border-bottom-right-radius:10px;
margin-left:20px;
outline:none;
cursor:pointer;

@media screen and (max-width:1000px){
  font-size:16px;
  text-align:none;
  margin-left:10px;
  padding:6px;

}

`;

export const NavIcon = styled(Link)`
  text-decoration:none;
  color:white;
  margin-left: 2rem;
  font-size: 20px;
  height: 60px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
export const SidebarNav = styled.nav`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 60px;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  // z-index: 10;
`;

export const SidebarWrap = styled.div`
background:#d35400;
width: 250px;
`;

