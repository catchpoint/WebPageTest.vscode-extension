<p align="center"><img src="https://docs.webpagetest.org/img/wpt-navy-logo.png" alt="WebPageTest Logo" /></p>
<p align="center"><a href="https://docs.webpagetest.org/api/integrations/#officially-supported-integrations">Learn about more WebPageTest API Integrations in our docs</a></p>

# Visual Studio Code Extension For WebPageTest
The Visual Studio Code(Vscode) Extension for WebPageTest lets you run tests against WebPageTest from within Vscode. Once the tests are complete, some of the performance metrics, a copy of the waterfall, screenshot, and a link to the full results will be displayed in Vscode, right where you are developing, helping you to easily troubleshoot and diagnose performance issues directly from Vscode and possibly refactor the code if needed.

**Features:**
- Run WebPageTest from within Vscode, and get the results back in Vscode

### Updating Vscode Settings

To update the settings for Vscode, we need to open settings.json file on Vscode. Open your command palette on Vscode (command/ctrl + shift + P) and start typing "Settings", click on 'Preferences: Open Settings (JSON)' from the command palette. 

![image](https://user-images.githubusercontent.com/31168643/123271784-cd000d80-d51e-11eb-889c-c8be782b60fd.png)

You'll need an API key to run the extension. [Get yours here](https://app.webpagetest.org/ui/entry/wpt/signup?enableSub=true&utm_source=docs&utm_medium=github&utm_campaign=vscode&utm_content=account)

The following properties are configurable in your settings.json file:

```json
// Your WebPageTest API key. REQUIRED
"wpt_extension.apiKey": "YOUR_API_KEY",

// The URL to test. If left out of settings.json, the extension will prompt you for a URL when run.
"wpt_extension.urlToTest": null,

// The location to test from. The location is comprised of the location of the testing agent, the browser to test on, and the connectivity in the following format: location:browser.connectivity.
"wpt_extension.location": "Dulles:Chrome.Cable",

// The number of tests to run
"wpt_extension.runs": 1,

// The interval (in seconds) to poll the API for test results
"wpt_extension.pollResults": 5,

// The maximum time (in seconds) to wait for test results
"wpt_extension.timeout": 240,
```
[Find all the supported locations here.](https://webpagetest.org/getLocations.php?k=API_KEY&f=html)
### Running The Test

In the new window of Vscode, open the command palette(command/ctrl + shift + P) and start typing WebPageTest, you should see a WebPageTest command in it. Run the command.

![image](https://user-images.githubusercontent.com/31168643/123274196-eefa8f80-d520-11eb-85a4-11fe5479b990.png)

If you had not entered the URL before you get an option to enter it, the test requires an URL to run. Below option is only asked if you had not entered an URL in settings.json

![image](https://user-images.githubusercontent.com/31168643/123274476-2d904a00-d521-11eb-982d-c22749bb5b9b.png)

Once the test is submitted, you get the below response on Vscode.

![image](https://user-images.githubusercontent.com/31168643/123274877-806a0180-d521-11eb-9f14-020e83af7284.png)

And, when the test has successfully run, you get the metrics, waterfall and screenshot from the test.

![image](https://user-images.githubusercontent.com/31168643/123275440-f3737800-d521-11eb-9798-7e9474fe6d0f.png)
