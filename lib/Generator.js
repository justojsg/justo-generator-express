//import
import * as fs from "justo-fs";
import {HandlebarsGenerator} from "justo-generator";

/**
 * Generator.
 */
export default class extends HandlebarsGenerator {
  /**
   * @override
   */
  get desc() {
    return "Generate an Express application.";
  }

  /**
   * @override
   */
   get params() {
     return {
       appName: "Application name",
       author: "Author name",
       authorEmail: "Author email",
       authorHomepage: "Author homepage",
       binName: "Bin script name",
       bodyParser: {
         title: "Use body-parser middleware?",
         choices: ["json", "text", "raw", "urlencoded"]
       },
       contributor: "Contributor name",
       contributorEmail: "Contributor email",
       contributorHomepage: "Contributor homepage",
       cookieParser: {
         title: "Use cookie-parser middleware?",
         type: "Boolean"
       },
       cookieParserSecret: "Cookie parser secret/sign-key",
       desc: "Project description",
       favicon: {
         title: "Use serve-favicon middleware?",
         type: "Boolean"
       },
       faviconFile: {
         title: "Favicon file",
         default: "/images/favicon.png"
       },
       faviconMaxAge: {
         title: "Favicon max-age, in milliseconds",
         type: "number",
         default: 60000
       },
       git: "Git",
       helmet: {
         title: "Use Helmet middleware?",
         type: "boolean"
       },
       homepage: "Project homepage",
       morgan: {
         title: "Use Morgan middleware?",
         type: "Boolean"
       },
       morganFormat: {
         title: "Log format?",
         choices: ["combined", "common", "dev", "short", "tiny"],
         default: "combined"
       },
       nodemon: {
         title: "Use nodemon?",
         type: "boolean"
       },
       serveStatic: {
         title: "Use serve-static middleware?",
         type: "Boolean"
       },
       serveStaticMaxAge: {
         title: "Static content max-age (cache), in milliseconds",
         default: 60000
       },
       session: {
         title: "Session state?",
         choices: ["cookie-session", "express-session"]
       },
       sessionMaxAge: {
         title: "Session max-age, in milliseconds",
         type: "number",
         default: 60000
       },
       sessionSecret: "Session secret/sign-key",
       sessionGenid: {
         title: "Custom id generator for session?",
         type: "Boolean"
       }
     };
   }

  /**
   * @override
   */
  init() {
    super.init();
  }

  /**
   * @override
   */
  fin() {
    super.fin();
  }

  /**
   * @override
   */
  preprompt() {
    var entries = this.getEntryNames(".").sort();

    if (!(entries.length === 0 ||
          (entries.length == 1 && entries[0] == ".git") ||
          (entries.length == 2 && entries[0] == ".git" && entries[1] == "README.md")
         )) {
      return "Destination dir is not empty.";
    }
  }

  /**
   * @override
   */
  prompt(answers) {
    this.input("appName");
    this.input("desc");
    this.input("homepage");
    if (this.input("author")) {
      this.input("authorEmail");
      this.input("authorHomepage");
    }
    if (this.input("contributor")) {
      this.input("contributorEmail");
      this.input("contributorHomepage");
    }
    this.input("git");
    this.input("binName");
    this.confirm("helmet");
    if (this.confirm("morgan")) this.list("morganFormat");
    if (this.confirm("favicon")) {
      this.input("faviconFile");
      this.input("faviconMaxAge");
    }
    if (this.confirm("serveStatic")) this.input("serveStaticMaxAge");
    if (this.checkbox("bodyParser"));
    if (this.confirm("cookieParser")) this.input({name: "cookieParserSecret", default: Date.now()});
    if (this.list("session")) {
      this.input("sessionMaxAge");
      this.input({name: "sessionSecret", default: Date.now()});
      if (answers.session == "express-session") this.confirm("sessionGenid");
    }
    this.confirm("nodemon");
  }

  /**
   * @override
   */
  pregenerate(answers) {

  }

  /**
   * @override
   */
  generate(answers) {
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
    this.template("README.md", answers);
  }
}
