const path = require("path");
const seleniumServer = require("selenium-server");
const chromedriver = require("chromedriver");
const SCREENSHOT_PATH = path.join(__dirname, "screenshot");

const config = { // we use a nightwatch.conf.js file so we can include comments and helper functions
  "src_folders": [
    "test/e2e"     // we use '/test' as the name of our test directory by default. So 'test/e2e' for 'e2e'.
  ],
  "output_folder": "./node_modules/nightwatch/reports", // reports (test outcome) output by Nightwatch
  "selenium": {
    "start_process": true,
    "server_path": seleniumServer.path,
    "log_path": "",
    "host": "127.0.0.1",
    "port": 4444,
    "cli_args": {
      "webdriver.chrome.driver" : chromedriver.path
    }
  },
  "test_workers" : {"enabled" : true, "workers" : "auto"}, // perform tests in parallel where possible
  "test_settings": {
    "default": {
      "launch_url": "http://localhost", // we're testing a Public or "staging" site on Saucelabs
      "selenium_port": 80,
      "selenium_host": "ondemand.saucelabs.com",
      "silent": true,
      "screenshots": {
        "enabled": true, // save screenshots to this directory (excluded by .gitignore)
        "path": SCREENSHOT_PATH
      },
      "username" : "${SAUCE_USERNAME}",     // if you want to use Saucelabs remember to
      "access_key" : "${SAUCE_ACCESS_KEY}", // export your environment variables (see readme)
      "globals": {
        "waitForConditionTimeout": 10000    // wait for content on the page before continuing
      }
    },
    "local": {
      "launch_url": "http://localhost",
      "selenium_port": 4444,
      "selenium_host": "127.0.0.1",
      "silent": true,
      "screenshots": {
        "enabled": true, // save screenshots taken here
        "path": SCREENSHOT_PATH
      }, // this allows us to control the
      "globals": {
        "waitForConditionTimeout": 15000 // on localhost sometimes internet is slow so wait...
      },
      "desiredCapabilities": {
        "browserName": "chrome",
        "chromeOptions": {
          "args": [
            `Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46
            (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3`,
            "--window-size=640,1136" // iphone 5
          ]
        },
        "javascriptEnabled": true,
        "acceptSslCerts": true
      }
    },
    "chrome": { // your local Chrome browser (chromedriver)
      "desiredCapabilities": {
        "browserName": "chrome",
        "javascriptEnabled": true,
        "acceptSslCerts": true
      }
    },
    "chromemac": { // browsers used on saucelabs:
      "desiredCapabilities": {
        "browserName": "chrome",
        "platform": "OS X 10.11",
        "version": "47"
      }
    },
    "ie11": {
      "desiredCapabilities": {
        "browserName": "internet explorer",
        "platform": "Windows 10",
        "version": "11.0"
      }
    },
    "firefox" : {
      "desiredCapabilities": {
        "platform": "XP",
        "browserName": "firefox",
        "version": "33"
      }
    },
    "internet_explorer_10" : {
      "desiredCapabilities": {
        "platform": "Windows 7",
        "browserName": "internet explorer",
        "version": "10"
      }
    },
    "android_s4_emulator": {
      "desiredCapabilities": {
        "browserName": "android",
        "deviceOrientation": "portrait",
        "deviceName": "Samsung Galaxy S4 Emulator",
        "version": "4.4"
      }
    },
    "iphone_6_simulator": {
      "desiredCapabilities": {
        "browserName": "iPhone",
        "deviceOrientation": "portrait",
        "deviceName": "iPhone 6",
        "platform": "OSX 10.10",
        "version": "8.4"
      }
    }
  }
};
module.exports = config;


/**
 * The default is to save screenshots to the root of your project even though
 * there is a screenshots path in the config object above! ... so we need a
 * function that returns the correct path for storing our screenshots.
 * While we're at it, we are adding some meta-data to the filename, specifically
 * the Platform/Browser where the test was run and the test (file) name.
 */
function imgpath (filename) {
  return path.join(SCREENSHOT_PATH, `${+new Date()}-${filename}`);
}

module.exports.imgpath = imgpath;
module.exports.SCREENSHOT_PATH = SCREENSHOT_PATH;
