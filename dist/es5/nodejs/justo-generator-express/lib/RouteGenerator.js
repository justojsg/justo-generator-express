"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _justoGenerator = require("justo-generator");function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var _class = function (_HandlebarsGenerator) {_inherits(_class, _HandlebarsGenerator);function _class() {_classCallCheck(this, _class);return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));}_createClass(_class, [{ key: "prompt", value: function prompt(































    answers) {
      this.list({ name: "router", choices: this.getFileNames("routes", { ignore: ["map.js", "react.js"], ext: false }) });
      this.input("path");
      if (this.list("method") == "get") this.input("view");} }, { key: "generate", value: function generate(





    answers) {
      this.append("routes/" + 
      answers.router + ".js", 
      "\n" + this.templateAsString("routes/route.hbs", answers), 
      { type: "end" });} }, { key: "desc", get: function get() {return "Add a route.";} }, { key: "params", get: function get() {return { router: "Router", path: "Path", method: { title: "Method", choices: ["all", "delete", "get", "head", "options", "patch", "post", "put"], default: "get" }, view: "View to render" };} }]);return _class;}(_justoGenerator.HandlebarsGenerator);exports.default = _class;