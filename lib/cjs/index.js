"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyComponent = void 0;
var MyComponent_1 = __importDefault(require("./MyComponent"));
exports.default = {
    MyComponent: MyComponent_1.default,
};
var MyComponent_2 = require("./MyComponent");
Object.defineProperty(exports, "MyComponent", { enumerable: true, get: function () { return __importDefault(MyComponent_2).default; } });
