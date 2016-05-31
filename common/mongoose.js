/**
 * Created by ruidge on 2016/5/31.
 */
var mongoose = require("mongoose");
var dbUrl = "mongodb://127.0.0.1:27017/ruidge";
mongoose.connect(dbUrl);
module.exports = mongoose;