import React from 'react';
import "./index.less";
import rank from "./rank";
import translateTag from "./translateTag";
import { Layout, Menu, Breadcrumb, Button, Checkbox, Divider } from 'antd';
const { Header, Content, Footer } = Layout;
import questions from "./questions";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selection: [[1, 0, 0, 1, 0, 0], [0, 1, 0, 0, 1], 1, 2, [0, 1]],
      recommendations: [],
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
        {!this.state.recommendations.length &&
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
            this.setState({ recommendations: rank(this.state.selection) })
          }}>获得推荐</Button>
        </div>}

        {!!this.state.recommendations.length &&
        <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
          {this.state.recommendations.map((recommendation, index) =>
            <div key={index} className="recommendation-item">
              <span className={"place place-" + index}>#{index + 1}</span>
              <div className="camera">
                <div className="image">
                  <div>
                    <img src={recommendation.image} alt=""/>
                  </div>
                  <div className="name">
                    {recommendation.name}
                  </div>
                  <div className="score">
                    推荐指数：{recommendation.score.toFixed(2)}
                  </div>
                </div>

                <table>
                  <tr>
                    <td>
                      价格: ${recommendation.price}
                    </td>
                    <td>
                      重量: {recommendation.weight}g
                    </td>
                    <td>
                      自动对焦: {recommendation.autoFocus}点
                    </td>
                  </tr>
                  <tr>
                    <td>
                      fps: {recommendation.frameRate}
                    </td>
                    <td>
                      分辨率: {recommendation.resolution[0]} * {recommendation.resolution[1]} px
                    </td>
                    <td>
                      ISO: {recommendation.ISO[0]} ~ {recommendation.ISO[1]}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      色彩位数: {recommendation.pixelDepth} px
                    </td>
                    <td>
                      出厂日期: {new Date(recommendation.launchDate).toLocaleDateString()}
                    </td>
                    <td>
                      其他功能: {recommendation.bluetooth ? "蓝牙" : ""} {recommendation.gps ? "GPS" : ""} {recommendation.touchScreen ? "触屏" : ""} {recommendation.video ? "录像" : ""} {recommendation.flash ? "闪光灯" : ""} {recommendation.waterproof ? "防水" : ""}
                    </td>
                  </tr>
                </table>

                <div className="pros-cons">

                  <div className="pros">
                    Pros
                    <div className="list">
                      {recommendation.pros.map(_ =>
                        <div>+ {translateTag(_[1])}</div>,
                      )}
                    </div>
                  </div>

                  <div className="cons">
                    Cons
                    <div className="list">
                      {recommendation.cons.map(_ =>
                        <div>- {translateTag(_[1], true)}</div>,
                      )}
                    </div>
                  </div>
                </div>

              </div>
              <Divider/>
            </div>,
          )}
        </div>}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        人工智能Project by 王轲(14307130048)
      </Footer>
    </Layout>;
  }
}