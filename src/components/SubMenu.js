import React ,{useState}from 'react';
import { DropdownLink, SidebarLabel, SidebarLink } from './SubMenu.elements';

const SubMenu=({ item,val, data,sidebar ,setSidebar})=>{
    const [subnav, setSubnav] = useState(false);
    const showSubnav = () => setSubnav(!subnav);
    return(
        <>
        <SidebarLink  to={item.path} onClick={()=>{item.subnav && showSubnav();data(false);setSidebar(false);}}>
            <div >
                {item.icon}
                <SidebarLabel>{item.title}</SidebarLabel>

            </div>
            <div style={{background:'red'}}>

                {item.subnav && subnav
                ?item.iconOpened
                :item.subnav
                ?item.iconClosed
                :null
                }
            </div>

        </SidebarLink>
        {subnav && 
        item.subnav.map((item,index)=>{
            return(
                <DropdownLink to={item.path} kay={{index}}>
                    {item.icon}
                    <SidebarLabel>{item.title}</SidebarLabel>

                </DropdownLink>

            );


        })}
        </>
    );


}
export default SubMenu;