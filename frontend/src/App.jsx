import React from 'react';
import "./index.css";
import { Layout, Menu, Breadcrumb, Button, Checkbox, Divider } from 'antd';
const { Header, Content, Footer } = Layout;

let questions = [
  {
    text: "您将如何使用本相机（多选）", multiple: true,
    options: ['记录旅行', '拍摄学校或公司活动', '拍摄体育比赛', '拍摄自然风景', '拍摄人像', '拍摄天文'],
  },
  {
    text: "您看中哪些额外功能吗（多选）", multiple: true,
    options: ['内置闪光灯', '可录制视频', '可蓝牙传输照片', '可触屏', '内置GPS', '防水'],
  },
  {
    text: "您是否愿意承受单反的重量",
    options: ['没问题，3公斤的机器都扛得住', '在能避免负重的情况下尽可能避免负重', '不愿意接受重的单反，必须较为轻便'],
  },
  {
    text: "您对愿意在单反上投入的经济",
    options: ['很多，一步到位买高端设备', '普通，好用实用的设备', '经济，请推荐入门基本款'],
  },
  {
    text: "您有什么别的要求吗（多选）", multiple: true,
    options: ['尽量购买新的型号', '机身材质要好'],
  },
];

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selection: [[1, 0, 0, 1, 0, 0], [0, 1, 0, 0, 1], 1, 0, [0, 1]],
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
            <div>
              <h4>{question.text}</h4>
              {
                question.options.map((option, optionIndex) =>
                  <div><Checkbox
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
                    }}>{option}</Checkbox></div>,
                )
              }
              <Divider/>
            </div>,
          )}
          <Button type="primary">获得推荐</Button>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        人工智能Project by 王轲(14307130048)

      </Footer>
    </Layout>;
  }
}