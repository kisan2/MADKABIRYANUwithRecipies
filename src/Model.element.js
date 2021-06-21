import styled from 'styled-components';




export const Modal = styled.div`
margin-top:100px;
//width:302.36220472px;
// height:50%;

// height:755.90551181px;
// max-height:7559.0551181px;

@media screen and (max-width:1000px){
   margin-top:100px;

 
 }

`;

export const ModalBody = styled.div`
display:flex;
width:${window.innerWidth};
height:100%;
text-align:left;
margin-left:380px;
flex-direction:column;
@media screen and (max-width:1000px){
   margin-left:180px;
}

`;
export const Modalcontent = styled.div`
display:flex;
position:absolute;
flex-direction:row;
top:0px;
left:10%;
padding:10px;
font-size:44px;
color:black;
font-family:Arial;
font-style:bold;
font-weight:600;
@media screen and (max-width:1000px){
   left:5%;
 
 }


`;
export const Modalfooter = styled.button`
width:120px;
height:45px;
font-size:18px;
outline:none;
padding:0px;
background:#3498db;
color:#fff;
border:none;
cursor:pointer;
border-radius:10px;
@media screen and (max-width:1000px){
   font-size:16px;
 
   }

`;

export const Card = styled.div`
width: 100%;
height:100%;
margin:10px auto;
// box-shadow: 2px 5px rgb(252, 251, 251);
padding:10px;
@media screen and (max-width:1000px){
   margin:0px;
   padding:0px;
   }

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
margin-bottom:10px;
flex-direction:column;
@media screen and (max-width:1000px){
  align-items:left;
   }
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
export const FormInput = styled.input`
    display: block;
    font-size: 16px;
    border-radius: px;
    height:50px;
    outline:none;
    width: 500px;
    ::placeholder{
      color: #95a5a6;
      font-size: 14px;
    }
    @media screen and (max-width:1000px){
      width:500px;
      height:50px;
      font-size: 16px;
      ::placeholder{
         color: #95a5a6;
         font-size: 14px;
       }
       @media screen and (max-width:800px){
         width:400px;
         height:40px;
         font-size: 16px;
         ::placeholder{
            color: #95a5a6;
            font-size: 14px;
          }
      
      }
 `;

export const FormSelect = styled.select`
 display: block;
 font-size: 16px;
 border-radius: px;
 height:50px;
 outline:none;
 width: 500px;
 ::placeholder{
   color: #95a5a6;
   font-size: 14px;
 }
 @media screen and (max-width:1000px){
   width:500px;
   height:50px;
   font-size: 16px;
   ::placeholder{
      color: #95a5a6;
      font-size: 14px;
    }
    @media screen and (max-width:800px){
      width:400px;
      height:40px;
      font-size: 16px;
      ::placeholder{
         color: #95a5a6;
         font-size: 14px;
       }
   
   }
`;

export const Head = styled.div`
display:flex;
position:absolute:
bottom:1px;
width:100%;
flex-direction:row;
height:50px;
`;