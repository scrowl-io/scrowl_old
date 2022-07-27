import fs from "../utils/file-system.js"

const fileMap = {
  "apps/authoring/release/build/Scrowl-1.0.0.dmg": {
    dest: "apps/web/dist/scrowl.dmg",
  },
}

const copy = () => {
  let contents, dest

  for (let file in fileMap) {
    contents = fs.getFile(file)

    if (contents) {
      dest = fileMap[file].dest
      fs.copyFile(file, dest)
    }
  }
}

copy()
