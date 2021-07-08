<p align="center"><img src="https://docs.webpagetest.org/img/wpt-navy-logo.png" alt="WebPageTest Logo" /></p>
<p align="center"><a href="https://docs.webpagetest.org/api/integrations/#officially-supported-integrations">Learn about more WebPageTest API Integrations in our docs</a></p>

# Visual Studio Code Extension For WebPageTest
The Visual Studio Code(Vscode) Extension for WebPageTest lets you run tests against WebPageTest from within Vscode. Once the tests are complete, some of the performance metrics, a copy of the waterfall, screenshot, and a link to the full results will be displayed in Vscode, right where you are developing, helping you to easily troubleshoot and diagnose performance issues directly from Vscode and possibly refactor the code if needed.

**Features:**
- Run WebPageTest from within Vscode, and get the results back in Vscode

### Updating Vscode Settings

To update the settings for Vscode, we need to open settings.json file on Vscode. Open your command palette on Vscode(command/ctrl + shift + P) and start typing setting, click on 'Preferences: Open Settings (JSON)' from the command palette. 

![image](https://user-images.githubusercontent.com/31168643/123271784-cd000d80-d51e-11eb-889c-c8be782b60fd.png)

Update the settings.json as shown below - 

![image](https://user-images.githubusercontent.com/31168643/123272785-b4dcbe00-d51f-11eb-958f-653dbdb789d2.png)

  * api_key (required) - WebPageTest API Key. [Get yours here](https://app.webpagetest.org/ui/entry/wpt/signup?enableSub=true&utm_source=docs&utm_medium=github&utm_campaign=slackbot&utm_content=account)

  *  url_to_test (required) - String value, URL to be tested.
  
  *  location (optional) - The location to test from. The location is comprised of the location of the testing agent, the browser to test on, and the connectivity in the following format: <b>location:browser.connectivity</b>
  
      <b>Default:</b> Dulles:Chrome.Cable

### Running The Test

In the new window of Vscode, open the command palette(command/ctrl + shift + P) and start typing WebPageTest, you should see a WebPageTest command in it. Run the command.

![image](https://user-images.githubusercontent.com/31168643/123274196-eefa8f80-d520-11eb-85a4-11fe5479b990.png)

If you had not entered the URL before you get an option to enter it, the test requires an URL to run. Below option is only asked if you had not entered an URL in settings.json

![image](https://user-images.githubusercontent.com/31168643/123274476-2d904a00-d521-11eb-982d-c22749bb5b9b.png)

Once the test is submitted, you get the below response on Vscode.

![image](https://user-images.githubusercontent.com/31168643/123274877-806a0180-d521-11eb-9f14-020e83af7284.png)

And, when the test has successfully run, you get the metrics, waterfall and screenshot from the test.

![image](https://user-images.githubusercontent.com/31168643/123275440-f3737800-d521-11eb-9798-7e9474fe6d0f.png)
