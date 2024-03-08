import * as fs from "fs";
import * as path from "path";

function importAllModulesFromDirectory(dir: string): any[] {
  const files = fs.readdirSync(dir);
  const modules = files.map((file) => require(path.resolve(dir, file)));
  return modules;
}

export { importAllModulesFromDirectory };
