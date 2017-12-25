let request = require('request').defaults({ 'proxy': "http://127.0.0.1:1080" });
let Queue = require('promise-queue');
let fs = require('fs');
let path = require('path');
let queue = new Queue(10); //最多同时10线程采集

request('https://www.dxomark.com/daksensor/ajax/jsontested', //获得相机列表
  (error, response, body) => {
    let cameraList = JSON.parse(body).data;
    let finishedCount = 0;
    cameraList.forEach(cameraMeta => {
      let camera = Object.assign({}, cameraMeta);
      let link = `https://www.dxomark.com${camera.link}---Specifications`; //拼合对应的规格网址
      queue.add(() => new Promise(res => { //把request放入队列，以保证同时http请求不超过10个
        let doRequest = () => {
          request(link, (error, response, body) => {
            if (error) { //如果失败则重试
              console.log("retrying.." + camera.name);
              doRequest();
              return;
            }
            let specMatcherRegexp = /descriptifgauche.+?>([\s\S]+?)<\/td>[\s\S]+?descriptif_data.+?>([\s\S]+?)<\/td>/img;
            let match = specMatcherRegexp.exec(body);
            while (match) {  //用正则表达式匹配table里的每一个项目，并添加至采集结果中
              camera[match[1]] = match[2];
              match = specMatcherRegexp.exec(body);
            }
            fs.writeFileSync(path.join('./scraped', camera.name + '.txt'), JSON.stringify(camera, null, 4), { encoding: "UTF8" });
            finishedCount++;
            console.log(`Finished ${finishedCount}/${cameraList.length}: ${camera.name}`);
            res();
          })
        };
        doRequest();
      }));
    });
  });