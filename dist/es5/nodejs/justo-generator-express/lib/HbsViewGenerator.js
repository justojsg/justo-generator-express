"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _path = require("path");var _path2 = _interopRequireDefault(_path);
var _justoGenerator = require("justo-generator");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var _class = function (_HandlebarsGenerator) {_inherits(_class, _HandlebarsGenerator);function _class() {_classCallCheck(this, _class);return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));}_createClass(_class, [{ key: "prompt", value: function prompt(





























    answers) {
      this.list({ name: "folder", choices: ["<none>", "<other>"].concat(this.getDirNames("views", { ignore: "partials" })) });
      if (answers.folder == "<other>") {
        answers.folder = undefined;
        this.input("folder");
      }
      if (answers.folder == "<none>") answers.folder = "/";
      this.input("view");
      this.confirm("form");
    } }, { key: "generate", value: function generate(




    answers) {
      if (answers.folder != "/" && !this.exists("views", answers.folder)) this.mkdir("views", answers.folder);
      this.template("views/view.hbs", _path2.default.join(answers.folder, answers.view + ".hbs"), answers);
    } }, { key: "desc", get: function get() {return "Generate a Handlebars view.";} }, { key: "params", get: function get() {return { folder: "Add to subfolder", view: "View name", form: { title: "Is a form?", type: "boolean" } };} }]);return _class;}(_justoGenerator.HandlebarsGenerator);exports.default = _class;