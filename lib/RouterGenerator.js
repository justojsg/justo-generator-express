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
    return "Add a router file.";
  }

  /**
   * @override
   */
   get params() {
     return {
       name: "Router name",
       view: "Index view name"
     };
   }

  /**
   * @override
   */
  prompt(answers) {
    this.input("name");
    this.input("view");
  }

  /**
   * @override
   */
  generate(answers) {
    this.template("routes/router.js", answers.name + ".js", answers);
    this.append("routes/map.js", `  app.use("/${answers.name}", require("./${answers.name}").router);\n`, {line: -2});
  }
}
