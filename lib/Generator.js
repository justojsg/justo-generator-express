//import
import path from "path";
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
      appName: {
        title: "Application name",
        default: path.basename(process.cwd())
      },
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
      gitignore: "Generate .gitignore?",
      hbs: {
        title: "Would you like to use Handlebars?",
        type: "boolean",
        default: true
      },
      helmet: {
        title: "Use Helmet middleware?",
        type: "boolean"
      },
      homepage: "Project homepage",
      linter: {
        title: "Code linter",
        choices: ["<none>", "ESLint", "JSHint"],
        default: "ESLint"
      },
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
      notFound: {
        title: "When resource not found",
        choices: ["Send 404", "Send public/index.html"]
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
        choices: ["<none>", "cookie-session", "express-session"],
        default: "express-session"
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
    if (this.input("git")) answers.gitignore = true;
    this.confirm("gitignore");
    this.input({name: "binName", default: answers.appName});
    this.confirm("hbs");
    this.confirm("helmet");
    if (this.confirm("morgan")) this.list("morganFormat");
    if (this.confirm("favicon")) {
      this.input("faviconFile");
      this.input("faviconMaxAge");
    }
    if (this.confirm("serveStatic")) this.input("serveStaticMaxAge");
    if (this.checkbox("bodyParser"));
    if (this.confirm("cookieParser")) this.input({name: "cookieParserSecret", default: Date.now()});
    if (this.list("session") != "<none>") {
      this.input("sessionMaxAge");
      this.input({name: "sessionSecret", default: Date.now()});
      if (answers.session == "express-session") this.confirm("sessionGenid");
    }
    this.confirm("nodemon");
    this.list("linter");
    this.list("notFound");
  }

  /**
   * @override
   */
  generate(answers) {
    //app
    this.mkdir("app/conf");
    this.template("app/conf/development.json", answers);
    this.template("app/conf/production.json", answers);

    this.mkdir("app/lib");

    this.mkdir("app/public");
    this.mkdir("app/public/images");
    if (answers.faviconFile == "/images/favicon.png") this.copy("app/public/images/favicon.png");
    this.mkdir("app/public/scripts");
    this.mkdir("app/public/stylesheets");
    this.copy("app/public/stylesheets/style.css");
    this.copy("app/public/robots.txt");
    if (!answers.hbs || answers.notFound == "Send public/index.html") this.template("app/public/index.html", answers);

    this.mkdir("app/routes");
    this.template("app/routes/index.js", answers);
    this.template("app/routes/map.js", answers);

    if (answers.hbs) {
      this.mkdir("app/views");
      this.mkdir("app/views/partials");
      this.copy("app/views/error.hbs");
      this.copy("app/views/index.hbs");
      this.template("app/views/layout.hbs", answers);
    }

    this.template("app/index.js", answers);
    this.template("app/middleware.js", answers);
    this.template("app/redirect.js", answers);
    if (answers.hbs) this.template("app/tmplEngine.js", answers);
    this.mkdir("app/errors");
    this.template("app/errors/404.html", answers);
    this.template("app/errors/500.html", answers);
    this.template("app/errors/handle.js", answers);

    //bin
    this.mkdir("bin");
    this.copy("bin/www.js");

    //dist
    this.mkdir("dist");

    //root files
    this.copy("_editorconfig", ".editorconfig");
    if (answers.gitignore) this.copy("_gitignore", ".gitignore");
    if (answers.linter == "JSHint") {
      this.copy("_jshintrc", ".jshintrc");
    } else if (answers.linter == "ESLint") {
      this.copy("_eslintrc", ".eslintrc");
      this.copy("_eslintignore", ".eslintignore");
    }
    this.template("_package.json", "package.json", answers);
    this.copy("_travis.yml", ".travis.yml");
    this.template("Justo.js", answers);
    this.template("README.md", answers);
  }
}
