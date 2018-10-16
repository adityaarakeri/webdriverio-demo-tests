/* global browser */
const ip = require('ip');
const commandsHelper = require('./src/commands');
const args = require('./src/chrome.args.js');

const staticServerPort = 4242;

exports.config = {
    specs: ['src/specs/basic/**/*.js', 'src/specs/a11y/**/*.js'],
    capabilities: [
        {
            maxInstances: 1,
            browserName: 'chrome',
            chromeOptions: { args },
        },
        {
            maxInstances: 1,
            browserName: 'chrome',
            chromeOptions: {
                args,
                mobileEmulation: {
                    deviceName: 'Nexus 5',
                },
            },
        },
        {
            maxInstances: 1,
            browserName: 'firefox',
            exclude: ['src/specs/a11y/**/*.js'],
        },
    ],
    reporters: ['spec'],
    services: ['static-server'],
    staticServerFolders: [{ mount: '/', path: './website' }],
    staticServerLogs: true,
    staticServerPort,
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    before() {
        commandsHelper(browser);
    },
    // Set a base URL in order to shorten url command calls.
    // If your `url` parameter starts with `/`, the base url gets prepended,
    // not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/`
    // (like `some/path`), the base url gets prepended directly.
    baseUrl: `http://${ip.address()}:${staticServerPort}/`,
    // Saves a screenshot to a given path if a command fails.
    screenshotPath: './errorShots/',
    // Make sure you have the wdio adapter package for the specific
    // framework installed before running any tests.
    framework: 'mocha',
    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    mochaOpts: {
        ui: 'bdd',
    },
};
