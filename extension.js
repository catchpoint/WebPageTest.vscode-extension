const vscode = require("vscode");
const WebPageTest = require("webpagetest");
const wptHelpers = require("./wpt-helpers");
const webViews = require("./utils/web-views");

let options = {
  firstViewOnly: true,
  runs: 1,
  pollResults: 5,
  // timeout: 240,
};

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
  let disposable = vscode.commands.registerCommand("webpagetest.wpt", async function () {
    try {
      const wpt_extension_config = JSON.parse(JSON.stringify(vscode.workspace.getConfiguration("WebPageTest")));
      const WPT_API_KEY = wpt_extension_config["apiKey"];
      const wpt = new WebPageTest("https://www.webpagetest.org", WPT_API_KEY);
      let url = wpt_extension_config["urlToTest"];
      let location = wpt_extension_config["location"];
      let emulateMobile = wpt_extension_config["emulateMobile"];
      let device = wpt_extension_config["device"];

      if (!url) url = await vscode.window.showInputBox({ prompt: "Enter the URL you want to test." });

      ////////// Getting Locations Logic Starts //////////

      const arrayLocT = [];
      const arrayLocV = [];

      if (!location) {
        await vscode.window.withProgress(
          {
            location: vscode.ProgressLocation.Notification,
            cancellable: false,
            title: "Fetching Locations...",
          },
          async () => {
            const locationsResult = await wptHelpers.getLocations(wpt, { allLocations: false });
            const allLocations = locationsResult.result.response.data.location;

            allLocations.forEach((loc) => {
              const titals = loc.Browsers.split(",").map((item) => "Location: " + loc.Label + ", Browser: " + item);
              const values = loc.Browsers.split(",").map((item) => loc.location + ":" + item);

              for (let i = 0; i < titals.length; i++) {
                let tit = titals[i];
                let val = values[i];

                arrayLocT.push(tit);
                arrayLocV.push(val);
              }
            });
          }
        );

        location = await vscode.window.showQuickPick(arrayLocT, { title: "Select Location & Browser" }).then((selection) => {
          const index = arrayLocT.indexOf(selection);
          return arrayLocV[index];
        });
      }

      ////////////// Getting Locations Logic Ends //////////////////

      if (!emulateMobile)
        emulateMobile = await vscode.window.showQuickPick(["Yes", "No"], { title: "Emulate Mobile?" }).then((selection) => {
          if (selection === "Yes") {
            return true;
          } else {
            return false;
          }
        });

      if (emulateMobile == true && !device) {
        device = await vscode.window.showQuickPick(
          ["MotoG4", "Nexus5", "Nexus5X", "Pixel", "PixelXL", "Pixel2", "Pixel2XL", "MotoG", "GalaxyS5", "GalaxyS7", "GalaxyS8", "MotoE", "AndroidOne", "Nexus7", "Nexus7L", "iPhone5c", "iPhone6", "iPhone6plus", "iPhoneX", "iPad", "iPadMini2"],
          { title: "Select Device" }
        );
      }

      wpt_extension_config["firstViewOnly"] = wpt_extension_config["firstViewOnly"] === false ? false : options["firstViewOnly"];
      wpt_extension_config["location"] = wpt_extension_config["location"] || location.toString();
      wpt_extension_config["pollResults"] = wpt_extension_config["pollResults"] || options["pollResults"];
      //wpt_extension_config["timeout"] = wpt_extension_config["timeout"] || options["timeout"];
      wpt_extension_config["runs"] = wpt_extension_config["runs"] || options["runs"];
      wpt_extension_config["emulateMobile"] = wpt_extension_config["emulateMobile"] || emulateMobile;
      wpt_extension_config["device"] = wpt_extension_config["device"] || device.toString();

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
          if (chromeUserTiming[i].name == "firstContentfulPaint") wptResponse.result.data.median.firstView.firstContentfulPaint = chromeUserTiming[i].time;
          if (chromeUserTiming[i].name == "LargestContentfulPaint") wptResponse.result.data.median.firstView.chromeUserTiming.LargestContentfulPaint = chromeUserTiming[i].time;
          if (chromeUserTiming[i].name == "CumulativeLayoutShift") wptResponse.result.data.median.firstView.chromeUserTiming.CumulativeLayoutShift = chromeUserTiming[i].value.toFixed(3);
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
