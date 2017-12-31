let questions = [
  {
    text: "您将如何使用本相机（多选）", multiple: true,
    options: [
      { text: '记录旅行', value: 'travel' },
      { text: '拍摄学校或公司活动', value: 'event' },
      { text: '拍摄体育比赛', value: 'sports' },
      { text: '拍摄自然风景', value: 'scenery' },
      { text: '拍摄人像', value: 'portrait' },
      { text: '拍摄天文', value: 'astronomy' }],
  },
  {
    text: "您看中哪些额外功能吗（多选）", multiple: true,
    options: [
      { text: '内置闪光灯', value: "flash" },
      { text: '可录制视频', value: "video" },
      { text: '可蓝牙传输照片', value: "bluetooth" },
      { text: '可触屏', value: "touchScreen" },
      { text: '内置GPS', value: "gps" },
      { text: '防水', value: "waterproof" }],
  },
  {
    text: "您是否愿意承受单反的重量",
    options: [
      { text: '没问题，3公斤的机器都扛得住', value: "!lightBuild" },
      { text: '在能避免负重的情况下尽可能避免负重' },
      { text: '不愿意接受重的单反，必须较为轻便', value: "lightBuild" },
    ],
  },
  {
    text: "您愿意在单反上投入的经济",
    options: [
      { text: '很多，一步到位买高端设备', value: "!lowPrice" },
      { text: '普通，好用实用的设备' },
      { text: '经济，请推荐入门基本款', value: "lowPrice" },
    ],
  },
  {
    text: "您有什么别的要求吗（多选）", multiple: true,
    options: [
      { text: '尽量购买新的型号', value: "newModel" },
      { text: '机身材质要好', value: "durableBuild" },
    ],
  },
];

export default questions;