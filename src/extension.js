const fs = require("fs")
const path = require("path")
const { generateTheme } = require("./icons/themes")
const files = require("./icons/files/_fileSchema.json")
const folders = require("./icons/folders/_folderSchema.json")

function activate() {
  const base = generateTheme()

  const finalTheme = {
    hidesExplorerArrows: base.hidesExplorerArrows,

    // Definitions
    fonts: base.fonts,
    iconDefinitions: {
      ...base.iconDefinitions,
      ...files.iconDefinitions,
      ...folders.iconDefinitions,
    },

    // Files
    file: files.file ?? base.file,
    fileNames: { ...base.fileNames, ...files.fileNames },
    fileExtensions: { ...base.fileExtensions, ...files.fileExtensions },
    languageIds: { ...base.languageIds, ...files.languageIds },

    // Folders
    folder: folders.folder ?? base.folder,
    folderExpanded: folders.folderExpanded ?? base.folderExpanded,
    folderNames: { ...base.folderNames, ...folders.folderNames },
    folderNamesExpanded: {
      ...base.folderNamesExpanded,
      ...folders.folderNamesExpanded,
    },

    // Misc
    light: { ...base.light, ...folders.light, ...files.light },
    highContrast: {
      ...base.highContrast,
      ...folders.highContrast,
      ...files.highContrast,
    },
  }

  fs.writeFileSync(
    path.join(__dirname, "./icon-theme.json"),
    JSON.stringify(finalTheme)
  )
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
}
