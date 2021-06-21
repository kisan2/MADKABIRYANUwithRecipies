import React from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import HomeIcon from '@material-ui/icons/Home';
import CategoryIcon from '@material-ui/icons/Category';
import PeopleIcon from '@material-ui/icons/People';
import TocIcon from '@material-ui/icons/Toc';
import StorefrontIcon from '@material-ui/icons/Storefront';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';




export const SidebarData = [
    {
        title: 'Dashboard',
        path: '/',
        icon: <HomeIcon />,
        iconClosed: <ArrowDropDownIcon style={{ color: 'whitesmoke' }} />,
        iconOpened: <ArrowDropDownIcon style={{ color: 'whitesmoke' }} />,


    },
    {
        title: 'Brand',
        path: '/brand',
        icon: '',
    },
    {
        title: 'Category',
        path: '/Category',
        icon: <CategoryIcon />,
    }
    , {
        title: 'Products',
        path: '/Products',

        icon: <StorefrontIcon />,
    },
    {
        title: 'Tables',
        path: '/table',
        icon: <TocIcon />,
    },
    {
        title: 'Booked Order',
        path: '/booked',
        icon: <AccessAlarmIcon />,
    }
    // {
    //     title:'Order',
    //     path: '/Order',
    //     icon: <ShoppingCartIcon />,
    // }
];