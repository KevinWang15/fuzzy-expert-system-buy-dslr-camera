import React from 'react';
import "./index.css";
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

let questions = [
  { text: "您将如何使用本相机（多选）", multiple: true, options: ['记录旅行'] },
];

export default class App extends React.Component {
  render() {
    return <Layout>
      <Header style={{ position: 'fixed', width: '100%' }}>
        <div className="logo"/>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item> 相机推荐专家系统
          </Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>获得推荐</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        人工智能Project by 王轲(14307130048)

      </Footer>
    </Layout>;
  }
}