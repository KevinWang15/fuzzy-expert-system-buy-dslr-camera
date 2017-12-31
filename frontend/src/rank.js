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
  console.log(data);
}