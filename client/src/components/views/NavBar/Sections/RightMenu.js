/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu, Avatar, Button, Dropdown, Divider } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import { FormOutlined } from '@ant-design/icons';

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <a href={`/users/${user.userData?._id}`} >Profile</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <a style={{color: 'red'}} onClick={logoutHandler}>Logout</a>
      </Menu.Item>
    </Menu>
  )

  if (user.userData && !user.userData.isAuth) {
    return (
        <div style={{marginTop: '10px'}}>
            <Button type="text">
              <a href="/login">Signin</a>
            </Button>
            
            <Button type="text">
              <a href="/register">Signup</a>
            </Button>
        </div>
    )
  } else {
    return (
        <div style={{marginTop: '7px'}}>
          <a href="/posts/upload">
            <Avatar size='large' style={{backgroundColor: '#ffffff', color: 'black'}} icon={<FormOutlined />} />
          </a>
          <Dropdown overlay={menu} trigger={['click']}>
            <Avatar style={{marginLeft: '8px'}} key="profile" src={`http://192.249.18.120:80/${user.userData?.image}`} />
          </Dropdown>
        </div>
    )
  }
}

export default withRouter(RightMenu);

