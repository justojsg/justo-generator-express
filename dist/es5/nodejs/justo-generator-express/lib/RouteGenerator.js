"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _path = require("path");var _path2 = _interopRequireDefault(_path);
var _justoGenerator = require("justo-generator");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var _class = function (_HandlebarsGenerator) {_inherits(_class, _HandlebarsGenerator);function _class() {_classCallCheck(this, _class);return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));}_createClass(_class, [{ key: "prompt", value: function prompt(
































    answers) {
      this.list({ name: "folder", choices: ["/"].concat(this.getDirNames("routes")) });
      this.list({ name: "router", choices: this.getFileNames(_path2.default.join("routes", answers.folder), { ext: false, ignore: "map.js" }) });
      this.input("path");
      this.input("view");
      this.list("method");} }, { key: "generate", value: function generate(





    answers) {
      this.append(
      _path2.default.join("routes", answers.folder, answers.router + ".js"), 
      this.templateAsString("routes/route.hbs", answers), 
      { type: "end" });} }, { key: "desc", get: function get() {return "Add a route.";} }, { key: "params", get: function get() {return { folder: "Router folder", router: "Router name", path: "Route path", method: { title: "Method", choices: ["all", "delete", "get", "head", "options", "patch", "post", "put"], default: "get" }, view: "View to render when path requested" };} }]);return _class;}(_justoGenerator.HandlebarsGenerator);exports.default = _class;