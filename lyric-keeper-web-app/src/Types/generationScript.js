const fs = require("fs");

fs.readdir("./__types__", (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  const typeFiles = [];

  // Loop over every file in __types__ and add their names to typeFiles
  files.forEach(file => {
    if (file) {
      const fileName = file.split(".ts")[0];
      if (fileName !== "globalTypes" && fileName !== "index") {
        typeFiles.push(fileName);
      }
    }
  });

  // Construct index.ts file with all required exports
  let finalString = "";
  typeFiles.forEach(name => {
    console.log(`Adding type for ${name}`);
    finalString += `export * from './${name}'\n`;
  });
  fs.writeFile("__types__/index.ts", finalString, err => {
    if (err) throw err;
  });

  // Fixes ugly tslint error with Create React App
  fs.appendFile("__types__/globalTypes.ts", "\nexport {}", err => {
    // @TODO: Figure out a better way of handling... preferably not in this file...
    if (err) throw err;
  });

  // Create final index.ts file to export everything from __types__
  fs.writeFile("index.ts", 'export * from "./__types__";', err => {
    if (err) throw err;
  });
});
