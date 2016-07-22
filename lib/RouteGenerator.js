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
       component: "Component name",
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
  }

  /**
   * @override
   */
  prompt(answers) {
    this.input("component");
    this.input("path");
    if (this.list("method") == "get") this.input("view");
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
    this.append(
      `routes/${answers.component}.js`,
      "\n" + this.templateAsString("routes/route.hbs", answers),
      {type: "end"}
    );
  }
}
