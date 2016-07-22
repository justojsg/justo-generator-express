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
    return "Generate a Handlebars partial.";
  }

  /**
   * @override
   */
   get params() {
     return {
       name: "Partial name"
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
    this.copy("views/partials/partial.hbs", answers.name + ".hbs");
  }
}
