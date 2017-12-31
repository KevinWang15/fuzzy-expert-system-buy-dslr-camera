let fs = require("fs");
let path = require("path");


let files = fs.readdirSync("./result");
let merged=[];
files.forEach(file => {
    let data = JSON.parse(fs.readFileSync(path.join('./result', file), { encoding: "utf8" }));
    merged.push(data);
});

fs.writeFileSync("merged.json", JSON.stringify(merged, null, 4), { encoding: "utf8" });
