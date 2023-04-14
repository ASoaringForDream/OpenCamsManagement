import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from "dva/router"
export const MENU = [
  {
    key: 'user_manager',
    icon: React.createElement(LaptopOutlined),
    label: `用户管理`,
    children: [
      {
        key: 'manager',
        label: <Link to="/manager">管理员</Link>,
        // icon: React.cloneElement(NotificationOutlined)
      },
      {
        key: 'user',
        label: <Link to="/user">用户</Link>,
        // icon: React.cloneElement(UserOutlined)
      }
    ]
  }
]