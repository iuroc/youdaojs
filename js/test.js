const YoudaoJS = require("./main").default
const fanyi = new YoudaoJS()
fanyi.getResult('Hello World').then(function (data) {
    console.log(data)
})