"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = require("./main");
var fanyi = new main_1.default();
fanyi.getResult('Hello World').then(function (data) {
    console.log(data);
});
