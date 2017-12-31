import questions from "./questions";
import data from "./data";

export default function rank(selection) {
  let tags = [];
  questions.forEach((question, index) => {
    if (question.multiple) {
      selection[index].forEach((sel, ind) => {
        if (sel) {
          tags.push(question.options[ind].value);
        }
      })
    } else {
      tags.push(question.options[selection[index]].value);
    }
  });
  tags = tags.filter(_ => _);

  let sortedData = [...data];
  sortedData.forEach(item => {
    let { score, changes } = evaluate(item, tags);
    item.score = score;
    item.changes = changes;
  });
  sortedData.sort((a, b) => {
    return b.score - a.score;
  });
  let retData = sortedData.slice(0, 5);
  retData.forEach(item => {
    item.pros = item.changes.filter(_ => _[0] > 0);
    item.cons = item.changes.filter(_ => _[0] < 0);
    item.pros.sort((a, b) => {
      return b[0] - a[0];
    });
    item.cons.sort((a, b) => {
      return Math.abs(b[0]) - Math.abs(a[0]);
    });
  });
  console.log(sortedData);
  return retData;
}

const weight = {
  newModel: 0.5,
  lowPrice: 0.2,
  lightBuild: 0.4,
  travel: 2,
  event: 3,
  sports: 2,
  scenery: 3,
  portrait: 5,
  astronomy: 3,
};

const shift = {
  travel: -1.5,
  event: -1.5,
  sports: -1.5,
  scenery: -1.5,
  portrait: -1.5,
  astronomy: -1.5,
};

function evaluate(item, tags) {
  let score = 0, changes = [];
  tags.forEach(tag => {
    let reverse = false;
    let normalizedTag = tag;
    if (tag.startsWith("!")) {
      //允许使用!开头，表示相反。如：!lowPrice时，lowPrice原本加分现在变成减分
      reverse = true;
      normalizedTag = tag.substr(1);
    }
    let scoreChange = 0;
    if (item.assessment[normalizedTag]) { // 如果是专家系统assess出来的结果，一个占20分
      scoreChange = (reverse ? -1 : 1) * (item.assessment[normalizedTag] * 20 + (shift[normalizedTag] || 0)) * (weight[normalizedTag] || 1);
    } else { // 如果不是，那么是“防水”等基本要求，一个占3分
      scoreChange = (reverse ? -1 : 1) * (item[normalizedTag] ? 1 : -1) * (3 + (shift[normalizedTag] || 0)) * (weight[normalizedTag] || 1);
    }
    if (scoreChange) {
      score += scoreChange;
      changes.push([scoreChange, tag]); // 记录评分变化，之后好出pros & cons
    }
  });
  return { score, changes };
}