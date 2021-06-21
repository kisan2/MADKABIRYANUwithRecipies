import styled from 'styled-components';



export const Dash = styled.div`
display:flex;
height:100%;
flex-direction:column;
width:100%;
margin-top:60px;
h2{
    font-size:34px;
    margin-top:5px;
    margin-left:48px;
    margin-bottom:10px;
}
@media screen and (max-width:1000px){
height:100%;
flex-direction:column;
margin-top:60px;
width:100%;
h2{
    margin-left:38px;
    margin-bottom:10px;
}
}
`;
export const Top = styled.div`
display:flex;
flex:50%;
flex-direction: row;
width:100%;
margin-bottom:10px;
justify-content:left;
`;
export const Bottom = styled.div`
display:flex;
flex-wrap:wrap;
flex-direction: row;

width:100%;


// white-space:nowrap;
height:100%;
padding:0px;
margin:0px auto;
justify-content:left;
// @media(max-with:800px){
//     display:flex;
// flex-wrap:wrap;
// flex-direction: row;
// overflow-x:auto;
// width:750px;
// align-tems:center;
// justify-content:center;

// // white-space:nowrap;
// height:100%;
// padding:0px;
// margin:0px auto;
// justify-content:left;

}
@media screen and (max-width:800px){
display:flex;
flex-wrap:wrap;
flex-direction: row;
overflow-x:auto;
width:100%;

// white-space:nowrap;
height:100%;
padding:0px;
margin:0px auto;
justify-content:center;
     
}
`;


export const Right = styled.div`
display:flex;
flex:40%;
flex-direction:column;
height:550px;

margin:0px auto;
margin-top:0px;
max-height:600px;

@media screen and (max-width:1000px){
    flex:40%;
flex-direction:column;
height:530px;
margin:0px auto;
margin-top:0px;
max-height:600px;
   
}


`;
export const Righ = styled.div`
display:flex;
flex:10%;

flex-direction:column;
margin:0px auto;
margin-top:0px;


@media screen and (max-width:1000px){
    display:none;
}


`;

export const Table = styled.button`
font-size:22px;
width:80px;
height:110px;
padding:0px;
background:#ffeaa7;
border:none;
outline:none;
margin-left:20px;
margin-top:5px;
margin-bottom:10px;
border-radius:100px;
border-bottom-left-radius: 30px;
border-top-right-radius: 30px;
text-align:center;
cursor:pointer;
justify-content:space-evenly;
font-family:Arial;
font-style:bold;
font-weight:600;
div{
    /background:red;
    margin-top:0px;
    margin-left:0px;

margin-bottom:5px;
    text-align:center;

}
:hover{
    background:#2ecc71;
    
}
@media screen and (max-width:1000px){
font-size:22px;
width:80px;
height:100px;
padding:0px;
border:none;
outline:none;
margin-left:14px;
margin-top:5px;
margin-bottom:10px;
border-radius:100px;
border-bottom-left-radius: 30px;
border-top-right-radius: 30px;

cursor:pointer;
// justify-content:space-evenly;

div{
    /background:red;
    margin-top:0px;
    margin-left:0px;

margin-bottom:5px;
    text-align:center;

}

}

`;
export const Btn = styled.button`
font-size:22px;
padding:0px;
width:50px;
border:none;
background:#55efc4;
margin:5px auto;
height:60px;
margin:10px;
margin-left:28px;
margin-top:5px;
padding:10px;
border:none;
outline:none;
border-radius:0px;
border-top-left-radius: 30px;
border-top-right-radius: 30px;
cursor:pointer;

div{
    width:100%;
margin:0px;
color:black;
margin-left:6px;
margin-top:0px;
margin-bottom:14px;
font-family:Roboto;
font-size:20px;
font-style:bold;
font-weight:600;
text-align:right;
justify-content:end;
margin-right:0px;

}

:hover{
    background:#2ecc71;
}
cursor:pointer;

@media screen and (max-width:1000px){
height:60px;
width:50px;
margin:12px ;
border:none;
padding:0px;
outline:none;
border-radius:0px;
border-top-left-radius: 30px;
border-top-right-radius: 30px;
cursor:pointer;
div{
    margin:0px;
    color:black;
    margin-left:0px;
    margin-top:0px;

margin-bottom:19px;
 font-family:Roboto;
font-size:18px;
font-style:bold;
font-weight:600;
text-align:center;
justify-content:center;
margin-left:12px;

}


}

`;

export const Card = styled.div`
width: 95%;
height:660px;
border-radius: 10px;
border: 1px solid rgb(243, 241, 241);
margin-top: 0px;
margin-left: 0px;
box-shadow: 1px 1px 2px grey;
margin:10px;
@media screen and (max-width:1000px){
    width: 95%;
    
height:550px;
border-radius: 10px;
border-top-left-radius: 0px;
border-top-right-radius: 0px;
border: 1px solid rgb(243, 241, 241);
margin-top: 0px;
margin-left: 0px;
box-shadow: 1px 1px 2px grey;
margin:10px;
// border-top:3px solid  #3498db;

}


`;
export const Cards = styled.div`
width: 100%;
height:490px;
// border-radius: 10px;
// border: 1px solid rgb(243, 241, 241);
margin-top: 0px;
margin-left: 0px;
// box-shadow: 1px 1px 2px grey;
margin:0px;
@media screen and (max-width:1000px){
// border-top:3px solid  #3498db;
height:490px;
// border-radius: 10px;
// border: 1px solid rgb(243, 241, 241);
margin-top: 0px;
margin-left: 0px;
// box-shadow: 1px 1px 2px grey;
margin:0px;

}


`;

export const Left = styled.div`
display:flex;
flex-direction:column;
flex:50%;
height:550px;
margin-left:20px;

@media screen and (max-width:1000px){
height:550px;
margin:0px auto;
margin-top:0px;
margin-left:10px;
padding:0px;
border:none;

}

`;
export const ContainerPrim = styled.div`
display:flex;
margin-top:0px;
height:150px;
width:150px;
font-size:18px;
padding:10px;
margin:10px;
cursor:pointer;
align-item:center;
justify-content:center;
text-align:center;
border-radius:10px;
 background:#2ecc71;  
`;
export const ContainerDanger = styled.div`
display:flex;
margin-top:0px;
height:150px;
width:45%;
font-size:18px;
padding:10px;
margin:10px;

align-item:center;
justify-content:center;
text-align:center;
background:#e74c3c;
border-radius:10px;
// cursor:pointer;


  
`;
export const ContainerWarning = styled.div`
display:flex;
margin-top:0px;
height:120px;
width:350px;
font-size:18px;
padding:5px;
margin:10px;
margin-left:10px;
cursor:pointer;
background:#f1c40f;
div{
 
    #circle{  
        flex:19%;                   
        border:none;
        background:white;
        background-repeat:no-repeat;
        background-position:center;
        text-align:center;
        align-items:center;
        justify-content:center;
        color:red;

        border-radius:50px;
        height:60px;
        fontSize:20px;
        margin:0px;
        padding:10px;
        #CategoryIcon {
            color:black;
            margin-top:5px;
            width:40px;
            

        }
    
       
    }
}


@media screen and (max-width:800px){
margin-top:0px;
height:120px;
width:280px;
font-size:18px;
padding:5px;
margin:5px;

margin-left:20px;
cursor:pointer;
background:#f1c40f;
div{
 
    #circle{  
        flex:19%;                   
        border:none;
        background:white;
        background-repeat:no-repeat;
        background-position:center;
        text-align:center;
        justify-content:center;
        border-radius:50px;
        height:50px;
        width:50px;
        fontSize:20px;
        margin:0px;
        padding:5px;
        #CategoryIcon {
            color:black;
            margin-top:5px;
            padding:0px;
            

        }
    
       
    }
}
}
  
`;
export const ContainerBlue = styled.div`
display:flex;
margin-top:0px;
height:150px;
width:45%;
font-size:18px;
cursor:pointer;
padding:30px;
margin:10px;
border:none;
border-radius:10px;
align-item:center;
justify-content:center;
text-align:center;
background:#3498db;

  
`;
export const Head = styled.div`
display:flex;
width:100%;
background:#ecf0f1;
padding:10px;
font-size:22px;
border:none;
argin-left:0px;
border-top-left-radius: 0px;
border-top-right-radius: 0px;
border-top:3px solid  #3498db;
@media screen and (max-width:1000px){
font-size:18px;
height:40px;
margin:0px auto;
border-radius: 0px;
m
align-items:center;
justify-content:left;
text-align:left;
}
`;
export const Homedeliver = styled.div`
display:flex;
width:100%;
height:40px;
margin:0px auto;
margin-left:0px;
padding:10px;
font-size:22px;
font-weight:200;
font-family:roboto;
border:none;
border-top:3px solid  #3498db;
border-radius: 0px;
border-top-left-radius: 0px;
border-top-right-radius: 0px;
align-items:center;
justify-content:left;
text-align:left;
background:#ecf0f1;

@media screen and (max-width:1000px){
width:100%;
height:40px;
margin:0px auto;
margin-left:0px;
padding:10px;
font-size:18px;
font-weight:200;
font-family:roboto;
border:none;
border-top:3px solid  #3498db;
border-radius: 0px;
border-top-left-radius: 0px;
border-top-right-radius: 00px;
align-items:center;
justify-content:left;
text-align:left;
background:#ecf0f1;
}
`;
export const Body = styled.div`
display:flex;
flex-wrap: wrap;
width:100%;
margin-left:0px;
@media screen and (max-width:1000px){
    display:flex;
    flex-wrap:wrap;
    margin-top:0px;
    flex-direction:row;
    height:100%:
    margin-bottom:10px;
    
}
`;
