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
    return "Generate a Handlebars partial.";
  }

  /**
   * @override
   */
  get params() {
    return {
      folder: "Add to subfolder",
      name: "Partial name"
    };
  }

  /**
   * @override
   */
  prompt(answers) {
    this.list({name: "folder", choices: ["<none>", "<other>"].concat(this.getDirNames("views/partials"))});
    if (answers.folder == "<other>") {
      answers.folder = undefined;
      this.input("folder");
    }
    if (answers.folder == "<none>") answers.folder = "/";
    this.input("name");
  }

  /**
   * @override
   */
  generate(answers) {
    if (answers.folder != "/" && !this.exists("views/partials", answers.folder)) this.mkdir("views/partials", answers.folder);
    this.copy("views/partials/partial.hbs", path.join(answers.folder, answers.name + ".hbs"));
  }
}
