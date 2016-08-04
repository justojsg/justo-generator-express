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
    return "Generate a Handlebars view.";
  }

  /**
   * @override
   */
   get params() {
     return {
       folder: "Add to subfolder",
       view: "View name",
       form: {
         title: "Is a form?",
         type: "boolean"
       }
     };
   }

  /**
   * @override
   */
  prompt(answers) {
    this.list({name: "folder", choices: ["<none>", "<other>"].concat(this.getDirNames("views", {ignore: "partials"}))});
    if (answers.folder == "<other>") {
      answers.folder = undefined;
      this.input("folder");
    }
    if (answers.folder == "<none>") answers.folder = "/";
    this.input("view");
    this.confirm("form");
  }

  /**
   * @override
   */
  generate(answers) {
    if (answers.folder != "/" && !this.exists("views", answers.folder)) this.mkdir("views", answers.folder);
    this.template("views/view.hbs", path.join(answers.folder, answers.view + ".hbs"), answers);
  }
}
