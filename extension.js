// @ts-nocheck
const vscode = require('vscode');
const WebPageTest = require("webpagetest");
const wptHelpers = require('./wpt-helpers');
let options = {
	"firstViewOnly": true,
	"runs": 1,
	"location": 'ec2-us-east-1:Chrome',
	"connectivity": '4G',
	"pollResults": 5,
	"timeout": 240
  }

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {

	let disposable = vscode.commands.registerCommand('webpagetest.wpt', async function () {

		const wpt_extension_config = vscode.workspace.getConfiguration('wpt_extension')
		const WPT_API_KEY = wpt_extension_config.api_key;
		const wpt = new WebPageTest('www.webpagetest.org',WPT_API_KEY);
		const url = wpt_extension_config['url_to_test']
		options['connectivity'] = wpt_extension_config['connectivity'];
		options['firstViewOnly'] = wpt_extension_config['firstViewOnly'];
		options['connectivity'] = wpt_extension_config['connectivity'];
		options['location'] = wpt_extension_config['location'];

		const wptResponse = await wptHelpers.runTest(wpt,url.toString(),options);
		console.log(wptResponse.result.data.summary)
		const panel = vscode.window.createWebviewPanel(
			'webpagetest',
			'WebPageTest',
			vscode.ViewColumn.One
		  );
		  
		  panel.webview.html = getWebviewContent(wptResponse.result.data.summary,wptResponse.result.data.median.firstView.images.waterfall);
	});

	context.subscriptions.push(disposable);
}

function getWebviewContent(resultsLink,waterfallLink) {
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Cat Coding</title>
  </head>
  <body>
		<a href="${resultsLink}">Click to view full detailed results</a>
	  <img src="${waterfallLink}"/>
  </body>
  </html>`;
  }
// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
