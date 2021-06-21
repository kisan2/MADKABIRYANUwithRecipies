import { Link } from 'react-router-dom';
import styled from 'styled-components';


export const SidebarLink = styled(Link)`
  display: flex;
  color: #bdc3c7;
  padding: 10px;
  list-style: none;
  height: 90px;
  text-decoration: none;
  font-size: 24px;
  &:hover {
    // background: #fff;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
`;

export const SidebarLabel = styled.span`
  margin-left: 16px;
`;

export const DropdownLink = styled(Link)`
  background: #2c3e50;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;

  &:hover {
    background: #fff;
    cursor: pointer;
  }
`;