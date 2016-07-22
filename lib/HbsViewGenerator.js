//import
import path from "path";
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
    return "Generate a Handlebars view.";
  }

  /**
   * @override
   */
   get params() {
     return {
       component: "Component name",
       view: "View name",
       form: {
         title: "Form?",
         type: "boolean"
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
  }

  /**
   * @override
   */
  prompt(answers) {
    this.input("component");
    this.input("view");
    this.confirm("form");
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
    if (answers.component) this.mkdirIf(!fs.exists(this.dst, "views", answers.component), path.join("views", answers.component));
    this.template("views/view.hbs", (answers.component ? answers.component + "/" : "") + answers.view + ".hbs", answers);
  }
}
