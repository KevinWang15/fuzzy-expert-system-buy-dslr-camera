import React from 'react';
import "./index.css";
import rank from "./rank";
import { Layout, Menu, Breadcrumb, Button, Checkbox, Divider } from 'antd';
const { Header, Content, Footer } = Layout;
import questions from "./questions";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selection: [[1, 0, 0, 1, 0, 0], [0, 1, 0, 0, 1], 1, 0, [0, 1]],
      recommendations:[]
    };
  }

  render() {
    return <Layout>
      <Header style={{ position: 'fixed', width: '100%' }}>
        <div className="logo"/>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">相机推荐专家系统</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item> 相机推荐专家系统
          </Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
          {questions.map((question, questionIndex) =>
            <div key={questionIndex}>
              <h4>{question.text}</h4>
              {
                question.options.map((option, optionIndex) =>
                  <div key={optionIndex}><Checkbox
                    checked={(question.multiple && this.state.selection[questionIndex][optionIndex]) || (!question.multiple && this.state.selection[questionIndex] === optionIndex)}
                    onChange={_ => {
                      let newSelection = [...this.state.selection];
                      if (question.multiple) {
                        newSelection[questionIndex] = [...newSelection[questionIndex]];
                        newSelection[questionIndex][optionIndex] = _.target.checked;
                      } else {
                        if (!_.target.checked) return;
                        newSelection[questionIndex] = optionIndex;
                      }
                      this.setState({ selection: newSelection });
                    }}>{option.text}</Checkbox></div>,
                )
              }
              <Divider/>
            </div>,
          )}
          <Button type="primary" onClick={() => {
            this.setState({recommendations:rank(this.state.selection)})
          }}>获得推荐</Button>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        人工智能Project by 王轲(14307130048)
      </Footer>
    </Layout>;
  }
}