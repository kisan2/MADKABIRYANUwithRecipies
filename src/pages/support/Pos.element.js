import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PosWrapper = styled.div`
display:flex;
width:100%;
height:${window.innerHeight};
flex-direction:row;
margin-top:20px;
margin:10px;
border:none;
border-radius:5px;
//box-shadow:1px 0px 5px black;
justify-content:space-between;
@media screen and (max-width:1000px){
    display:flex;
    width:100%;
    height:100%;
    flex-direction:column;
}

`;
export const PosItemcontainer = styled.div`
display:flex;
flex:50%;
width:100%;
margin:5px;
height:85vh;
flex-direction:column;
border:2px solid blue;
//border-left:none;
border-radius:10px;
align-items:center;
@media screen and (max-width:1000px){
    display:flex;
 
}



`;
export const PosCalculation = styled.div`
display:flex;
flex:50%;
flex-direction:column;
border:2px solid blue;
border-radius:10px;
width:100%;
margin:5px;

height:800px;
max-height:85vh;
#title{
    font-size:20px;
    color:#3498db;
    font-family:Arial;
    font-style:bold;
    font-weight:450;
  
}
@media screen and (max-width:1000px){
    display:flex;
       
}

`;
export const PosItemFilter = styled.div`
display:flex;
flex-direction:row;
margin:5px;
width:100%;
justify-content:space-evenly;
padding:10px;
border-top:1px solid lightgrey;
margin-top:0px;




`;

export const PosItemContent = styled.div`
display:flex;
height:100%;
width:100%;
padding:0px;
overflow:auto;
margin:0px;
border:3px solid white;
#stock{
    height:30px;
    width:30px;
    margin:2px auto;
    font-size:19px;
    align-items:center;
    justify-content:center;
    text-align:center;
}
#stoc{
    height:31px;
    width:50px;
    margin-top:0px;
    font-size:16px;
    align-items:center;
    justify-content:center;
    text-align:center;
}


`;

export const Paymentdetail = styled.div`
 width:100%;
 display:flex;
 flex-direction:column;
 margin:0px auto;
 padding:0px;

`;
export const Paymentrec = styled.div`
width:100%;
 height:100%;
 border-top:1px solid black;
 display:flex;
 flex-direction:column;
 font-size:20px;
 margin:0px auto;
 padding:0px;

`;
export const Posrec = styled.div`
 display:flex;
 flex-direction:row;
 font-size:20px;
 justify-content:space-evenly;
 margin:0px auto;
 padding:0px;

`;


export const PaymentBtn = styled.button`
 width:300px;
// width:100%;
 height:50px;
 font-size:22px;
 color:white;
 background:#2980b9;
 padding:10px;
 margin:10px;
 outline:none;
 cursor:pointer;
 border:none;
 border-radius:10px;
`;

export const Select = styled.select`
 display:flex;
 width:90%;
 flex:90%;
 outline:none;
 height:40px;

`;
export const Form = styled.form`
 display:flex;
 width:90%;
 flex:90%;
 outline:none;
 height:40px;
 @media screen and (max-width:1000px){
  height:30px;

 }


`;
export const Filterdata = styled.div`
display:flex;
flex-direction:row;
width:90%;
justify-content:space-evenly;



`;
export const Addcustomer = styled.button`
height:40px;
cursor:pointer;
background:white;
outline:none;
border:none;
border-right:1px solid black;
border-top:1px solid black;
border-bottom:1px solid black;
`;

export const Filteritemval = styled.input`
display:flex;
width:90%;
outline:none;
height:40px;
margin-left:10px;

`;

export const Modal = styled.div`
background:white;
width:90%;
align-items:center;
justify-content:center;
position:absolute;
top:100px;
left:400px;
max-width:800px;
margin:10px auto;
transition:all 1.3s ease;
`;

export const Print = styled.div`
background:#596275;
width:${window.innerWidth}px;
height:${window.innerHeight * 2}px;
font-size:32px;
font-style:bold;
font-famlly:arial;
font-weight:600;
align-items:center;
justify-content:center;
text-align:center;
border:none;
border-radius:10px;
position:absolute;
top:0px;
left:0px;
margin:0px auto;
transition:all 1.3s ease;
`;
export const ModalHeader = styled.div`
display:flex;
flex-direction:row;
background:#2c2c2c;
color:white;
padding:10px;
top:100px;

`;
export const Modalclose = styled.span`
display:flex;
flex:5%;
justify-content:center;
align-items:center;
font-size:22px;
cursor:pointer;

`;
export const Modaltitle = styled.div`
display:flex;
flex:95%;
font-size:22px;
justify-content:center;

`;
export const Modalcontent = styled.div`
display:flex;
align-items:center;
flex-direction:column;
justify-content:center;
padding:10px;
background:white;

`;
export const ModalBody = styled.div`
margin-bottom:10px;
`;
export const Modalfooter = styled.button`
width:100%;
height:45px;
font-size:18px;
align-item:center;
justify-content:center;
outline:none;
padding:0px;
background:green;
color:#fff;
border:none;
border-radius:10px;
margin:10px auto;
:hover{
    background:blue;
}
`;

export const ModuleCont = styled.div`
display: flex;
  width: 100%;
  height:720px;
  margin: 5px 0;
  border:10px;
  white-space:nowrap;
  padding: 10px;
  justify-content: left;
  box-sizing: border-box;
  flex-wrap: wrap;
  background:white;
  margin-bottom:0px;
 
`;

export const Card = styled.button`
width: 130px;
height:200px;
paddding:0px;
margin-left:15px;
border:none;
border-radius: 0px;
border-top-left-radius:50px;
border-top-right-radius:50px;
box-shadow:1px 1px 4px black;
// background-color: #3498db;
background-image: linear-gradient(to bottom, #00F260 , #0575E6);
margin-top: 10px;
font-size:16px;
font-family:'Arial';
font-style:bold;
text-transform: capitalize;
outline:none;
cursor:pointer;
margin-bottom:0px;



`;

export const Btn = styled.button`
align-items:center;
justify-content:center;
padding:0px;
width:7%;
height:40px;
margin:5px;
font-size:18px;
outline:none;
cursor:pointer;
border:none;

border-radius:10px;

`;
export const Links = styled(Link)`
align-items:center;
justify-content:center;
padding:0px;
width:80px;
height:40px;
color:white;
margin:5px;
font-size:18px;
outline:none;
cursor:pointer;
border:none;

border-radius:10px;

`;
export const Span = styled.span`
text-align: center;
display: block;
text-transform: capitalize;
color: #c0392b;
font-weight: 600;
border: 2px solid #c0392b;
padding: 10px 0;
background: rgb(255,176,176);
width: 30%;
margin: 20px auto;
}
`;
export const FormInputs = styled.div`
margin-top: 10px;
display: flex;
margin:5px;
margin-bottom:0px;
flex-direction:row;
@media screen and (max-width:1000px){
  margin-top: 0px;
  align-items:left;
   }
 `;
export const FormInputsBtn = styled.div`
 margin-top: 0px;
 display: flex;
 margin:5px;

 margin-bottom:0px;
 flex-direction:row;
   
   button{
      margin-top: 10px;
      font-size:12px;
      height:30px;
      width:85px;
      border:none;
      border-radius:5px;
      padding:4px;
      color:white;
      background:#00a8ff;
   }
  
   
   @media screen and (max-width:1000px){
    margin-top: 0px;
    margin:5px;
    button{
      margin-top: 0px;
      font-size:12px;
      height:30px;
      width:85px;
        border:none;
        border-radius:5px;
        padding:4px;
        color:white;
        background:#00a8ff;
     }
    

   }

   
  `;
export const FormInputsBtns = styled.div`
  margin-top: 10px;
 display: flex;
 margin-bottom:0px;
 flex-direction:row;
   align-items:center;
   justify-content:center
   
  `;
export const FormLabel = styled.label`
    width:100%;
    font-size: 18px;
    margin-bottom: 6px;
    color: rgb(3, 3, 3);
    @media screen and (max-width:1000px){
      font-size: 16px;
      
      }
 `;
export const FormInput = styled.select`
    display: block;
    font-size: 14px;
    border-radius: px;
    height: 30px;
    outline:none;
    margin-top:5px;
    width: 150px;
    ::placeholder{
      color: #95a5a6;
      font-size: 18px;
    }
    @media screen and (max-width:1000px){
      width:120px;
      height:30px;
      font-size: 16px;
      ::placeholder{
         color: #95a5a6;
         font-size: 14px;
       }
      
      }
 `;
export const FilterSelect = styled.select`
    display: block;
    font-size: 14px;
    border-radius: px;
    height: 40px;
    margin-left:10px;
    
    outline:none;
    width: 150px;
    ::placeholder{
      color: #95a5a6;
      font-size: 18px;
    }
    @media screen and (max-width:1000px){
      width:150px;
      height:40px;
      font-size: 16px;
      ::placeholder{
         color: #95a5a6;
         font-size: 14px;
       }
      
      }
 `;
export const FormEntery = styled.input`
 display: block;
 font-size: 14px;
 border-radius: px;
 height: 30px;
 outline:none;
 margin:5px;
 width: 100%;
 ::placeholder{
   color: #95a5a6;
   font-size: 14px;
 }
 @media screen and (max-width:1000px){
   font-size: 12px;
   height: 30px;
   width: 100%;
   margin:5px;
   ::placeholder{
      color: #95a5a6;
      font-size: 12px;
    }
   
   }
`;
export const Button = styled.button`
padding:0px;
width:7%;
height:40px;
color:white;
background:#3498db;
margin:0px;
font-size:16px;
outline:none;
cursor:pointer;
border:none;
border-radius:0px;
border-top-right-radius:10px;
border-bottom-right-radius:10px;


`;
export const Cards = styled.div`
width: 100%;
height:620px;
// border-radius: 10px;
// border: 1px solid rgb(243, 241, 241);
margin-top: 0px;
margin-left: 0px;
// box-shadow: 1px 1px 2px grey;
margin:0px;
@media screen and (max-width:1000px){
// border-top:3px solid  #3498db;
height:495px;
// border-radius: 10px;
// border: 1px solid rgb(243, 241, 241);
margin-top: 0px;
margin-left: 0px;
// box-shadow: 1px 1px 2px grey;
margin:0px;

}


`;
export const Customer = styled.div`
width: 100%;
height:50px;
// border-radius: 10px;
// border: 1px solid rgb(243, 241, 241);
margin-top: 0px;
margin-left: 0px;
// box-shadow: 1px 1px 2px grey;
margin:0px;
@media screen and (max-width:1000px){
// border-top:3px solid  #3498db;
width: 100%;
height:200px;
// border-radius: 10px;
border: 1px solid black;
margin-top: 0px;
margin-left: 0px;
// box-shadow: 1px 1px 2px grey;
margin:0px;

}


`;