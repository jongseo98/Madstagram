import React, { useState } from 'react';
import RightMenu from './Sections/RightMenu';
import { Drawer } from 'antd';
import Icon from '@ant-design/icons';
import './Sections/Navbar.css';
import Button from '@material-ui/core/Button';

function NavBar() {
  const [visible, setVisible] = useState(false)

  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 10, width: '100%', height: '54px', paddingLeft: '270px', paddingRight: '270px' }}>
      <div className="menu__logo">
        <a href="/">Madstagram</a>
      </div>
      <div align="right">
          <RightMenu />
      </div>
    </nav>
  )
}

export default NavBar