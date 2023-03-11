const vscode = require('vscode')

function activate(context) {
  console.log('Congratulations, your extension "r-icons" is now active!')

  let disposable = vscode.commands.registerCommand(
    'r-icons.helloWorld',
    function () {
      vscode.window.showInformationMessage('Hello World from r-icons!')
    }
  )

  context.subscriptions.push(disposable)
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
}
