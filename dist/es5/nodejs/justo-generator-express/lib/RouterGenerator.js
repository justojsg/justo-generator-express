"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _path = require("path");var _path2 = _interopRequireDefault(_path);
var _justoGenerator = require("justo-generator");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var _class = function (_HandlebarsGenerator) {_inherits(_class, _HandlebarsGenerator);function _class() {_classCallCheck(this, _class);return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));}_createClass(_class, [{ key: "prompt", value: function prompt(


























    answers) {
      this.list({ name: "folder", choices: ["<none>", "<other>"].concat(this.getDirNames("app/routes")) });
      if (answers.folder == "<other>") {
        answers.folder = undefined;
        this.input("folder");
      }
      if (answers.folder == "<none>") answers.folder = "/";
      this.input("name");
      this.input("indexView");
    } }, { key: "generate", value: function generate(




    answers) {
      if (answers.folder != "/" && !this.exists("app/routes", answers.folder)) this.mkdir("app/routes", answers.folder);
      this.template("app/routes/router.js", _path2.default.join(answers.folder, answers.name + ".js"), answers);

      if (answers.folder == "/") {
        this.append("app/routes/map.js", "  app.use(\"/" + answers.name + "\", require(\"./" + answers.name + "\").router);\n", { line: -2 });
      } else {
        this.append("app/routes/map.js", "  app.use(\"/" + answers.folder + "/" + answers.name + "\", require(\"./" + answers.folder + "/" + answers.name + "\").router);\n", { line: -2 });
      }
    } }, { key: "desc", get: function get() {return "Add a router file.";} }, { key: "params", get: function get() {return { folder: "Add to subfolder", indexView: "View to render when root (/) requested", name: "Router name" };} }]);return _class;}(_justoGenerator.HandlebarsGenerator);exports.default = _class;