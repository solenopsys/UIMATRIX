const fs = require('fs')
const path = require('path');
const WebpackShellPluginNext = require("webpack-shell-plugin-next");

function extractFromFile(fp, mySet) {
  const data = fs.readFileSync(fp, "utf8")
  let values = data.match(/\/assets\/icons\/.*?\.svg/g);
  if (values) {
    values.forEach(value => {
      if (!value.includes('"'))
        mySet.add(value)
    })
  }
}

function extract_icons(dir) {
  const mySet = new Set();
  console.log("DIR"+dir);
  const files = fs.readdirSync(dir)
  for (const file of files) {
    let fp = dir + "/" + file;
    if (fs.lstatSync(fp).isFile()) {
      extractFromFile(fp, mySet);
    }
  }
  return Array.from(mySet.values());
}

function extract_icons_from_file(file) {
  const mySet = new Set();
  extractFromFile(file, mySet);
  return Array.from(mySet.values());
}

function copy_icons(srcDir, dstDir, list) {
  list.forEach(file => {
    const dir = path.dirname(file)

    console.log(dstDir + dir);
    fs.mkdirSync(dstDir + dir, {recursive: true})
    fs.copyFileSync(srcDir + file, dstDir + file)
  })

}


const copyIconsIfNeeded = (srcDir, distDir) => {
  let iconsList = extract_icons(distDir);
  copy_icons(srcDir, distDir, iconsList);
}

const copyIconsByJson = (srcDir, distDir, json) => {
  let iconsList = extract_icons_from_file(json);
  copy_icons(srcDir, distDir, iconsList);
}


module.exports = {
  iconPlug: (srcDir, distDir, jsonFile) => {
    return new WebpackShellPluginNext({
      onBuildEnd: {
        scripts: [() => {
          copyIconsIfNeeded(srcDir, distDir)
          if (jsonFile) {
            copyIconsByJson(srcDir, distDir, jsonFile)
          }
        },],
        blocking: true,
        parallel: false
      }
    })
  }
}

