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
    return "Add a router.";
  }

  /**
   * @override
   */
   get params() {
     return {
       component: "Component name",
       view: "Index view"
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
    this.input("view");
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
    this.template("routes/router.js", answers.component + ".js", answers);
    this.append("routes/map.js", `  app.use("/${answers.component}", require("./${answers.component}").router);\n`, {line: -2});
  }
}
