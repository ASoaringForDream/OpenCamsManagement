import React from 'react';
import { Router, Route } from 'dva/router';
import { Breadcrumb, Layout, Menu } from 'antd';
import { MENU } from 'constants/index'
import IndexPage from 'pages/index';
import Manager from 'pages/user_manager/manager';
import User from 'pages/user_manager/user';
import logo from '../assets/img/logo.png'
import './index.less'

const { Header, Content, Sider } = Layout;
console.log(MENU);

const RouterConfig = ({ history }) => {
  
  return (
    <Router history={history}>
      <Layout>
        <Header className="header">
          <div className="logo">
            <img src={logo} alt="" />
            <span>全球在线开放摄像头管理系统</span>
          </div>
        </Header>
        <Layout>
          <Sider
            width={200}
            style={{
              height: 'calc(100vh - 64px)'
            }}
          >
            <Menu
              mode="inline"
              style={{
                height: '100%',
                borderRight: 0,
              }}
              items={MENU}
            />
          </Sider>
          <Layout
            style={{
              display: "flex",
              width: "100%",
              minHeight: "100%"
            }}
          >
            <Breadcrumb
              style={{
                margin: '16px 0',
              }}
            >
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
            >
              <Route path="/" exact component={IndexPage} />
              <Route path="/manager" exact component={Manager} />
              <Route path="/user" exact component={User} />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>

  );
}

export default RouterConfig;
