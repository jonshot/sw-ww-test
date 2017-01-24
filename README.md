# sw-ww-test

Run the example locally using the 'http-server' node module or similar.

Use the 'Application' tab of Chrome dev tools to view cached files and test service worker (set to offline etc).

To debug web workers, go to 'chrome://inspect/#workers' and click 'inspect'

To bypass normal app loading and to get a json response, add a query param to the url (anything will do).

Check 'offline' in dev tools network tab or application tab to test file caching.

Open '/page2.html' and enter a message in the textarea on the index page to test message passing.
