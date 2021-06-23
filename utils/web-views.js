exports.getContentForTestSubmission = (url) =>{

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>WebPageTest Results</title>
        <style>
          h1 {text-align: center;}
          h3 {text-align: center;}
        </style>
    </head>
    <body>
          <h1>WebPageTest Results</h1>
          <h3>Test Submitted for <a href="${url}">${url}</a></h3>
          <h3>Please wait until we fetch your results....</h3>
      </body>
    </html>`
}

exports.getContentForNoUrl = ()=>{

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>WebPageTest Results</title>
        <style>
          h1 {text-align: center;}
          h3 {text-align: center;}
          h4 {text-align: center;}
        </style>
    </head>
    <body>
          <h1>WebPageTest Results</h1>
          <h3>Please enter a URL to test</h3>
          <h4>You can add URL in settings.json file for vscode or enter it in the input field</h4>
      </body>
    </html>`
}

exports.getContentForChromeBasedSubmission = (wptResponse) =>{

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>WebPageTest Results</title>
        <style>
          h1 {text-align: center;}
          h2 {text-align: center;}
          .row {
              display: flex;
            }
            
            .column {
              flex: 33.33%;
              padding: 5px;
            }
            table {
              font-family: arial, sans-serif;
              border-collapse: collapse;
              width: 100%;
            }
            td, th {
              border: 1px solid silver;
              padding: 8px;	
              text-align: center;
            }
            .bordernone{
                border: none;
            }	
        </style>
    </head>
    <body>
          <h1>WebPageTest Results</h1>
          <h3>Test result for <a href="${wptResponse.result.data.url}">${wptResponse.result.data.url}</a></h3>
          <h3>Find detailed results at <a href="${wptResponse.result.data.summary}">${wptResponse.result.data.summary}</a></h3>
          <h4><b>From :</b> ${wptResponse.result.data.from} </h4>
          
          <div>
              <table>
                  <tbody>
                      <tr>
                            <th colspan="4" class="bordernone"></th>
                          <th colspan="3">Web Vitals</th>
                          <th colspan="3">Document Complete</th>
                          <th colspan="4">Fully Loaded</th>  
                      </tr>
                      <tr>
                            <th>First Byte</th>
                          <th>Start Render</th>
                          <th>First Contentful Page</th>
                          <th>Speed Index</th>
                          <th>Largest Contentful Paint</th>
                          <th>Cumulative Layout Shift</th>
                          <th>Total Blocking Time</th>
                          <th>Time</th>
                          <th>Requests</th>
                          <th>Bytes In</th>
                          <th>Time</th>
                          <th>Requests</th>
                          <th>Bytes In</th>  
                      </tr>
                      <tr>
                            <td>${wptResponse.result.data.median.firstView.TTFB/1000}s</th>
                          <td>${wptResponse.result.data.median.firstView.render/1000}s</th>
                          <td>${wptResponse.result.data.median.firstView.firstContentfulPaint/1000}s</th>
                          <td>${wptResponse.result.data.median.firstView.SpeedIndex/1000}s</th>
                          <td>${wptResponse.result.data.median.firstView.chromeUserTiming.LargestContentfulPaint/1000}s</td>
                          <td>${wptResponse.result.data.median.firstView.chromeUserTiming.CumulativeLayoutShift}</th>
                          <td>>= ${wptResponse.result.data.median.firstView.TotalBlockingTime/1000}s</th>
                          <td>${wptResponse.result.data.median.firstView.docTime/1000}s</th>
                          <td>${wptResponse.result.data.median.firstView.requestsDoc}</th>
                          <td>${Math.round(wptResponse.result.data.median.firstView.bytesInDoc/1024)}KB</th>
                          <td>${wptResponse.result.data.median.firstView.fullyLoaded/1000}s</th>
                          <td>${wptResponse.result.data.median.firstView.requestsFull}</th>
                          <td>${Math.round(wptResponse.result.data.median.firstView.bytesIn/1024)}KB</th>  
                      </tr>
                  </tbody>
              </table>
          </div>
  
          <div class="row" align="center">
              <div class="column">
                  <h4>Waterfall</h4>
                    <img src="${wptResponse.result.data.median.firstView.images.waterfall}"/>
              </div>
              <div class="column">
                  <h4>Screenshot</h4>
                    <img src="${wptResponse.result.data.median.firstView.images.screenShot}"/>
              </div>
          </div>
      
      </body>
    </html>`;
  
}

exports.getContentForNonChromeBasedSubmission = (wptResponse) =>{

        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>WebPageTest Results</title>
            <style>
              h1 {text-align: center;}
              h2 {text-align: center;}
              .row {
                  display: flex;
                }
                
                .column {
                  flex: 33.33%;
                  padding: 5px;
                }
                table {
                  font-family: arial, sans-serif;
                  border-collapse: collapse;
                  width: 100%;
                }
                td, th {
                  border: 1px solid silver;
                  padding: 8px;	
                  text-align: center;
                }
                .bordernone{
                    border: none;
                }	
            </style>
        </head>
        <body>
              <h1>WebPageTest Results</h1>
              <h3>Test result for <a href="${wptResponse.result.data.url}">${wptResponse.result.data.url}</a></h3>
              <h3>Find detailed results at <a href="${wptResponse.result.data.summary}">${wptResponse.result.data.summary}</a></h3>
              <h4><b>From :</b> ${wptResponse.result.data.from} </h4>
              
              <div>
                  <table>
                      <tbody>
                          <tr>
                                <th colspan="4" class="bordernone"></th>
                              <th colspan="1">Web Vitals</th>
                              <th colspan="3">Document Complete</th>
                              <th colspan="4">Fully Loaded</th>  
                          </tr>
                          <tr>
                                <th>First Byte</th>
                              <th>Start Render</th>
                              <th>First Contentful Page</th>
                              <th>Speed Index</th>
                              <th>Total Blocking Time</th>
                              <th>Time</th>
                              <th>Requests</th>
                              <th>Bytes In</th>
                              <th>Time</th>
                              <th>Requests</th>
                              <th>Bytes In</th>  
                          </tr>
                          <tr>
                                <td>${wptResponse.result.data.median.firstView.TTFB/1000}s</th>
                              <td>${wptResponse.result.data.median.firstView.render/1000}s</th>
                              <td>${wptResponse.result.data.median.firstView.firstContentfulPaint/1000}s</th>
                              <td>${wptResponse.result.data.median.firstView.SpeedIndex/1000}s</th>
                              <td>>= ${wptResponse.result.data.median.firstView.TotalBlockingTime/1000}s</th>
                              <td>${wptResponse.result.data.median.firstView.docTime/1000}s</th>
                              <td>${wptResponse.result.data.median.firstView.requestsDoc}</th>
                              <td>${Math.round(wptResponse.result.data.median.firstView.bytesInDoc/1024)}KB</th>
                              <td>${wptResponse.result.data.median.firstView.fullyLoaded/1000}s</th>
                              <td>${wptResponse.result.data.median.firstView.requestsFull}</th>
                              <td>${Math.round(wptResponse.result.data.median.firstView.bytesIn/1024)}KB</th>  
                          </tr>
                      </tbody>
                  </table>
              </div>
      
              <div class="row" align="center">
                  <div class="column">
                      <h4>Waterfall</h4>
                        <img src="${wptResponse.result.data.median.firstView.images.waterfall}"/>
                  </div>
                  <div class="column">
                      <h4>Screenshot</h4>
                        <img src="${wptResponse.result.data.median.firstView.images.screenShot}"/>
                  </div>
              </div>
          
          </body>
        </html>`;
      
}

exports.getContentForError = (wptResponse)=>{

    console.log(wptResponse)
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>WebPageTest Results</title>
        <style>
          h1 {text-align: center;}
          h3 {text-align: center;}
          h4 {text-align: center;}
        </style>
    </head>
    <body>
          <h1>WebPageTest Results</h1>
          <h3>${wptResponse.statusText}</h3>
      </body>
    </html>`
}