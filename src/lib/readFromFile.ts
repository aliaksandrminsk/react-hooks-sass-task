import * as fs from "fs";

export function readFromFile(file: string) {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(file, "utf8", function (err, data) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
