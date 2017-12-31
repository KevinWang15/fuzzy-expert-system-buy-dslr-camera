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
  return sortedData.slice(0, 5);
}

function evaluate(item, tags) {
  let score = 0, changes = [];
  tags.forEach(tag => {
    let reverse = false;
    if (tag.startsWith("!")) {
      //允许使用!开头，表示相反。如：!lowPrice时，lowPrice原本加分现在变成减分
      reverse = true;
      tag = tag.substr(1);
    }
    let scoreChange = 0;
    if (item.assessment[tag]) { // 如果是专家系统assess出来的结果，一个占20分
      scoreChange = (reverse ? -1 : 1) * item.assessment[tag] * 20;
    } else if (item[tag]) { // 如果不是，那么是“防水”等基本要求，一个占5分
      scoreChange = (reverse ? -1 : 1) * 5;
    }
    if (scoreChange) {
      score += scoreChange;
      changes.push([scoreChange, tag]); // 记录评分变化，之后好出pros & cons
    }
  });
  return { score, changes };
}