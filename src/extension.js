const fs = require("fs")
const path = require("path")
let files = require("./icons/files/_fileSchema.json")
let folders = require("./icons/folders/_folderSchema.json")
const seti = require("./icons/themes/seti/_setiSchema.json")
const workspace = require("vscode").workspace

function activate(context) {
  context.subscriptions.push(
    workspace.onDidChangeConfiguration(() => generateTheme())
  )

  generateTheme()
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
}

function generateTheme() {
  const configs = workspace.getConfiguration("r-sveltekit-icons")
  let componentNames = configs.get("componentsFileNames")
  let libNames = configs.get("libFileNames")
  let disableArrows = configs.get("disableArrows")

  for (let name of componentNames) {
    folders.folderNames = {
      ...folders.folderNames,
      [name]: "_folder_sub_components",
    }
    folders.folderNamesExpanded = {
      ...folders.folderNamesExpanded,
      [name]: "_folder_sub_components_open",
    }
    folders.light.folderNames = {
      ...folders.light.folderNames,
      [name]: "_folder_sub_components_light",
    }
    folders.light.folderNamesExpanded = {
      ...folders.light.folderNamesExpanded,
      [name]: "_folder_sub_components_open_light",
    }
  }

  for (let name of libNames) {
    folders.folderNames = {
      ...folders.folderNames,
      [name]: "_folder_sub_lib",
    }
    folders.folderNamesExpanded = {
      ...folders.folderNamesExpanded,
      [name]: "_folder_sub_lib_open",
    }
    folders.light.folderNames = {
      ...folders.light.folderNames,
      [name]: "_folder_sub_lib_light",
    }
    folders.light.folderNamesExpanded = {
      ...folders.light.folderNamesExpanded,
      [name]: "_folder_sub_lib_open_light",
    }
  }

  const theme = {
    hidesExplorerArrows: disableArrows,
    // Definitions
    fonts: seti.fonts,
    iconDefinitions: {
      ...seti.iconDefinitions,
      ...files.iconDefinitions,
      ...folders.iconDefinitions,
    },
    // Files
    file: files.file ?? seti.file,
    fileNames: { ...seti.fileNames, ...files.fileNames },
    fileExtensions: { ...seti.fileExtensions, ...files.fileExtensions },
    languageIds: { ...seti.languageIds, ...files.languageIds },
    // Folders
    folder: folders.folder ?? seti.folder,
    folderExpanded: folders.folderExpanded ?? seti.folderExpanded,
    folderNames: { ...seti.folderNames, ...folders.folderNames },
    folderNamesExpanded: {
      ...seti.folderNamesExpanded,
      ...folders.folderNamesExpanded,
    },
    // Light mode
    light: { ...seti.light, ...folders.light, ...files.light },
    // High contrast
    highContrast: {
      ...seti.highContrast,
      ...folders.highContrast,
      ...files.highContrast,
    },
  }

  fs.writeFileSync(
    path.join(__dirname, "./icon-theme.json"),
    JSON.stringify(theme)
  )
}
