const seti = require('./seti/_setiSchema.json')

function generateTheme() {
  return {
    hidesExplorerArrows: 'true',

    // Definitions
    fonts: [...seti.fonts],
    iconDefinitions: { ...seti.iconDefinitions },

    // Files
    file: seti.file,
    fileNames: { ...seti.fileNames },
    fileExtensions: { ...seti.fileExtensions },
    languageIds: { ...seti.languageIds },

    // Folders
    folder: null,
    folderExpanded: null,
    folderNames: {},

    // Misc
    light: { ...seti.light },
    highContrast: { ...seti.highContrast },
  }
}

module.exports = {
  generateTheme,
}
