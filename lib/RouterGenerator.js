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
    return "Add a router file.";
  }

  /**
   * @override
   */
  get params() {
    return {
      folder: "Add to subfolder",
      indexView: "View to render when root (/) requested",
      name: "Router name"
    };
  }

  /**
   * @override
   */
  prompt(answers) {
    this.list({name: "folder", choices: ["<none>", "<other>"].concat(this.getDirNames("routes"))});
    if (answers.folder == "<other>") {
      answers.folder = undefined;
      this.input("folder");
    }
    if (answers.folder == "<none>") answers.folder = "/";
    this.input("name");
    this.input("indexView");
  }

  /**
   * @override
   */
  generate(answers) {
    if (answers.folder != "/" && !this.exists("routes", answers.folder)) this.mkdir("routes", answers.folder);
    this.template("routes/router.js", path.join(answers.folder, answers.name + ".js"), answers);

    if (answers.folder == "/") {
      this.append("routes/map.js", `  app.use("/${answers.name}", require("./${answers.name}").router);\n`, {line: -2});
    } else {
      this.append("routes/map.js", `  app.use("/${answers.folder}/${answers.name}", require("./${answers.folder}/${answers.name}").router);\n`, {line: -2});
    }
  }
}
