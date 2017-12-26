let fs = require("fs");
let path = require("path");

function parseNumberFunctionFactory(keyMatcher, valueMatcher = /(\d+\.?\d*)/im,
                                    returnValueDecider = match => +match[1]) {
    return (data) => {
        let key = Object.keys(data).filter(_ => keyMatcher.test(_.trim()))[0];
        if (!key) return null;
        let match = data[key].toString().match(valueMatcher);
        if (match)
            return returnValueDecider(match);
        else
            return null;
    };
}

let parseResolution = parseNumberFunctionFactory(/^resolution$/im, /(\d+)\s*x\s*(\d+)/im, match => [+match[1], +match[2]]);
let parseFrameRate = parseNumberFunctionFactory(/frame rate/im);
let parseWeight = parseNumberFunctionFactory(/weight/im);
let parseAutoFocus = parseNumberFunctionFactory(/number of autofocus points/im);
let parseISO = parseNumberFunctionFactory(/ISO latitude/im, /(\d+)\s*-\s*(\d+)/im, match => [+match[1], +match[2]]);
let parseLaunchDate = parseNumberFunctionFactory(/launchDateGraph/im, /(\d+)-(\d+)-(\d+)/im, match => new Date(match[1], match[2] - 1, match[3]));
let parseTouchScreen = parseNumberFunctionFactory(/Touch screen/im, /yes/im, match => !!match);
let parseVideo = parseNumberFunctionFactory(/^Video$/m, /yes/im, match => !!match);
let parseFlash = parseNumberFunctionFactory(/^flash$/im, /yes/im, match => !!match);
let parseWaterproof = parseNumberFunctionFactory(/^waterproof$/im, /yes/im, match => !!match);
let parseBluetooth = parseNumberFunctionFactory(/^Bluetooth$/im, /yes/im, match => !!match);
let parseGps = parseNumberFunctionFactory(/^GPS$/im, /yes/im, match => !!match);
let parseIsMetal = parseNumberFunctionFactory(/^camera material$/im, /metal/im, match => !!match);

let files = fs.readdirSync("./scraped");
files.forEach(file => {
    let data = JSON.parse(fs.readFileSync(path.join('./scraped', file), { encoding: "utf8" }));
    let resolution = parseResolution(data);
    //机身材质质量
    let frameRate = parseFrameRate(data);
    let weight = parseWeight(data);
    let autoFocus = parseAutoFocus(data);
    let iso = parseISO(data);
    let launchDate = parseLaunchDate(data);
    let touchScreen = parseTouchScreen(data);
    let video = parseVideo(data);
    let flash = parseFlash(data);
    let waterproof = parseWaterproof(data);
    let bluetooth = parseBluetooth(data);
    let gps = parseGps(data);
    let isMetal = parseIsMetal(data);
    let cleanedData = {
        name: data.name,
        image: data.image,
        brand: data.brand,
        price: data.price,
        pixelDepth: data.pixelDepth,
        pixels: resolution ? (resolution[0] * resolution[1]) : 0,
        ISO: iso,
        maxISO: iso ? iso[1] : 0,
        launchDate: +launchDate,
        touchScreen,
        video,
        flash,
        waterproof,
        bluetooth,
        gps,
        isMetal,
        frameRate,
        resolution,
        weight,
        autoFocus,
    };
    fs.writeFileSync(path.join('./cleaned', file), JSON.stringify(cleanedData, null, 4), { encoding: "utf8" });
});
