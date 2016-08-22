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
    return "Add a route.";
  }

  /**
   * @override
   */
  get params() {
    return {
      folder: "Router folder",
      router: "Router name",
      path: "Route path",
      method: {
        title: "Method",
        choices: ["all", "delete", "get", "head", "options", "patch", "post", "put"],
        default: "get"
      },
      view: "View to render when path requested"
    };
  }

  /**
   * @override
   */
  prompt(answers) {
    this.list({name: "folder", choices: ["/"].concat(this.getDirNames("routes"))});
    this.list({name: "router", choices: this.getFileNames(path.join("routes", answers.folder), {ext: false, ignore: "map.js"})});
    this.input("path");
    this.input("view");
    this.list("method");
  }

  /**
   * @override
   */
  generate(answers) {
    this.append(
      path.join("routes", answers.folder, answers.router + ".js"),
      this.templateAsString("routes/route.hbs", answers),
      {type: "end"}
    );
  }
}
