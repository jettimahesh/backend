const app = require("../server"); // Import Express App
const serverless = require("serverless-http");

module.exports = serverless(app);
