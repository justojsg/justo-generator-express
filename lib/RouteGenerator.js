//import
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
       router: "Router",
       path: "Path",
       method: {
         title: "Method",
         choices: ["all", "delete", "get", "head", "options", "patch", "post", "put"],
         default: "get"
       },
       view: "View to render"
     };
   }

  /**
   * @override
   */
  prompt(answers) {
    this.list({name: "router", choices: this.getFileNames("routes", {ignore: ["map.js", "react.js"], ext: false})});
    this.input("path");
    if (this.list("method") == "get") this.input("view");
  }

  /**
   * @override
   */
  generate(answers) {
    this.append(
      `routes/${answers.router}.js`,
      "\n" + this.templateAsString("routes/route.hbs", answers),
      {type: "end"}
    );
  }
}
