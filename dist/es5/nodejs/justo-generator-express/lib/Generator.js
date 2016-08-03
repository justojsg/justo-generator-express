"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _get = function get(object, property, receiver) {if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {var parent = Object.getPrototypeOf(object);if (parent === null) {return undefined;} else {return get(parent, property, receiver);}} else if ("value" in desc) {return desc.value;} else {var getter = desc.get;if (getter === undefined) {return undefined;}return getter.call(receiver);}};
var _path = require("path");var _path2 = _interopRequireDefault(_path);
var _justoFs = require("justo-fs");var fs = _interopRequireWildcard(_justoFs);
var _justoGenerator = require("justo-generator");function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var _class = function (_HandlebarsGenerator) {_inherits(_class, _HandlebarsGenerator);function _class() {_classCallCheck(this, _class);return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));}_createClass(_class, [{ key: "init", value: function init() 


































































































    {
      _get(Object.getPrototypeOf(_class.prototype), "init", this).call(this);} }, { key: "fin", value: function fin() 





    {
      _get(Object.getPrototypeOf(_class.prototype), "fin", this).call(this);} }, { key: "preprompt", value: function preprompt() 





    {
      var entries = this.getEntryNames(".").sort();

      if (!(entries.length === 0 || 
      entries.length == 1 && entries[0] == ".git" || 
      entries.length == 2 && entries[0] == ".git" && entries[1] == "README.md")) 
      {
        return "Destination dir is not empty.";}} }, { key: "prompt", value: function prompt(






    answers) {
      this.input("appName");
      this.input("desc");
      this.input("homepage");
      if (this.input("author")) {
        this.input("authorEmail");
        this.input("authorHomepage");}

      if (this.input("contributor")) {
        this.input("contributorEmail");
        this.input("contributorHomepage");}

      this.input("git");
      this.input({ name: "binName", default: answers.appName });
      this.confirm("helmet");
      if (this.confirm("morgan")) this.list("morganFormat");
      if (this.confirm("favicon")) {
        this.input("faviconFile");
        this.input("faviconMaxAge");}

      if (this.confirm("serveStatic")) this.input("serveStaticMaxAge");
      if (this.checkbox("bodyParser")) ;
      if (this.confirm("cookieParser")) this.input({ name: "cookieParserSecret", default: Date.now() });
      if (this.list("session")) {
        this.input("sessionMaxAge");
        this.input({ name: "sessionSecret", default: Date.now() });
        if (answers.session == "express-session") this.confirm("sessionGenid");}

      this.confirm("nodemon");} }, { key: "pregenerate", value: function pregenerate(





    answers) {} }, { key: "generate", value: function generate(






    answers) {
      this.mkdir("bin");
      this.copy("bin/www.js");
      this.mkdir("config");
      this.template("config/development.json", answers);
      this.template("config/production.json", answers);
      this.mkdir("lib");
      this.mkdir("public");
      this.mkdir("public/images");
      if (answers.faviconFile == "/images/favicon.png") this.copy("public/images/favicon.png");
      this.mkdir("public/scripts");
      this.mkdir("public/stylesheets");
      this.copy("public/stylesheets/style.css");
      this.mkdir("routes");
      this.copy("routes/index.js");
      this.copy("routes/map.js");
      this.mkdir("views");
      this.mkdir("views/partials");
      this.copy("views/error.hbs");
      this.copy("views/index.hbs");
      this.template("views/layout.hbs", answers);
      this.copy("_editorconfig", ".editorconfig");
      this.copy("_gitignore", ".gitignore");
      this.copy("_jshintrc", ".jshintrc");
      this.template("_package.json", "package.json", answers);
      this.copy("_travis.yml", ".travis.yml");
      this.template("app.js", answers);
      this.template("Justo.js", answers);
      this.template("README.md", answers);} }, { key: "desc", get: function get() {return "Generate an Express application.";} }, { key: "params", get: function get() {return { appName: { title: "Application name", default: _path2.default.basename(process.cwd()) }, author: "Author name", authorEmail: "Author email", authorHomepage: "Author homepage", binName: "Bin script name", bodyParser: { title: "Use body-parser middleware?", choices: ["json", "text", "raw", "urlencoded"] }, contributor: "Contributor name", contributorEmail: "Contributor email", contributorHomepage: "Contributor homepage", cookieParser: { title: "Use cookie-parser middleware?", type: "Boolean" }, cookieParserSecret: "Cookie parser secret/sign-key", desc: "Project description", favicon: { title: "Use serve-favicon middleware?", type: "Boolean" }, faviconFile: { title: "Favicon file", default: "/images/favicon.png" }, faviconMaxAge: { title: "Favicon max-age, in milliseconds", type: "number", default: 60000 }, git: "Git", helmet: { title: "Use Helmet middleware?", type: "boolean" }, homepage: "Project homepage", morgan: { title: "Use Morgan middleware?", type: "Boolean" }, morganFormat: { title: "Log format?", choices: ["combined", "common", "dev", "short", "tiny"], default: "combined" }, nodemon: { title: "Use nodemon?", type: "boolean" }, serveStatic: { title: "Use serve-static middleware?", type: "Boolean" }, serveStaticMaxAge: { title: "Static content max-age (cache), in milliseconds", default: 60000 }, session: { title: "Session state?", choices: ["cookie-session", "express-session"] }, sessionMaxAge: { title: "Session max-age, in milliseconds", type: "number", default: 60000 }, sessionSecret: "Session secret/sign-key", sessionGenid: { title: "Custom id generator for session?", type: "Boolean" } };} }]);return _class;}(_justoGenerator.HandlebarsGenerator);exports.default = _class;