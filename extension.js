const vscode = require("vscode");
const WebPageTest = require("webpagetest");
const wptHelpers = require("./wpt-helpers");
const webViews = require("./utils/web-views");
let options = {
  firstViewOnly: true,
  runs: 1,
  location: "Dulles:Chrome.Cable",
  pollResults: 5,
  timeout: 240,
  emulateMobile: false,
  device: "MotoG4",
};

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
  let disposable = vscode.commands.registerCommand("webpagetest.wpt", async function () {
    try {
      const wpt_extension_config = JSON.parse(JSON.stringify(vscode.workspace.getConfiguration("WebPageTest")));
      const WPT_API_KEY = wpt_extension_config.apiKey;
      const wpt = new WebPageTest("www.webpagetest.org", WPT_API_KEY);
      let url = wpt_extension_config["urlToTest"];
      if (!url) url = await vscode.window.showInputBox({ prompt: "Enter the URL you want to test." });
      wpt_extension_config["firstViewOnly"] = wpt_extension_config["firstViewOnly"] === false ? false : options["firstViewOnly"];
      wpt_extension_config["location"] = wpt_extension_config["location"] || options["location"];
      wpt_extension_config["pollResults"] = wpt_extension_config["pollResults"] || options["pollResults"];
      wpt_extension_config["timeout"] = wpt_extension_config["timeout"] || options["timeout"];
      wpt_extension_config["runs"] = wpt_extension_config["runs"] || options["runs"];
      wpt_extension_config["emulateMobile"] = wpt_extension_config["emulateMobile"] || options["emulateMobile"];
      wpt_extension_config["device"] = wpt_extension_config["device"] || options["device"];

      var panel = vscode.window.createWebviewPanel("webpagetest", "WebPageTest", vscode.ViewColumn.One);

      if (!url) {
        panel.webview.html = webViews.getContentForNoUrl();
        return;
      }
      panel.webview.html = webViews.getContentForTestSubmission(url);
      const wptResponse = await wptHelpers.runTest(wpt, url.toString(), wpt_extension_config);
      const chromeUserTiming = wptResponse.result.data.median.firstView.chromeUserTiming;
      if (chromeUserTiming) {
        for (let i = 0; i < chromeUserTiming.length; i++) {
          if (chromeUserTiming[i].name == "firstContentfulPaint")
            wptResponse.result.data.median.firstView.firstContentfulPaint = chromeUserTiming[i].time;
          if (chromeUserTiming[i].name == "LargestContentfulPaint")
            wptResponse.result.data.median.firstView.chromeUserTiming.LargestContentfulPaint = chromeUserTiming[i].time;
          if (chromeUserTiming[i].name == "CumulativeLayoutShift")
            wptResponse.result.data.median.firstView.chromeUserTiming.CumulativeLayoutShift = chromeUserTiming[i].value.toFixed(3);
        }

        panel.webview.html = webViews.getContentForChromeBasedSubmission(wptResponse);
      } else {
        panel.webview.html = webViews.getContentForNonChromeBasedSubmission(wptResponse);
      }
    } catch (error) {
      panel.webview.html = webViews.getContentForError(error);
    }
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
