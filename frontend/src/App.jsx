import React from 'react';
import "./bulmaswatch.min.css";
import "./index.css";
import { Button, Hero, Container, Title, SubTitle, Checkbox } from 'reactbulma';

let questions = [
  {text:"您将如何使用本相机（多选）",multiple:true,options:['记录旅行']}
];

export default class App extends React.Component {
  render() {
    return <Hero medium dark bold fullheight>
      <Hero.Body>
        <Container>
          <Title>
            相机推荐专家系统
          </Title>
          <SubTitle style={{ opacity: 0.5 }}>
            人工智能Project by 王轲(14307130048)
          </SubTitle>

          <div>
            <Checkbox>aaa</Checkbox>
          </div>

          <Button primary>获得推荐</Button>

        </Container>
      </Hero.Body>
    </Hero>;
  }
}