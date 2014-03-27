var beautifier = require("./beautify-js.js");
var beautify = require("zed/lib/beautify");

/**
 * Required inputs: text, preferences
 */
module.exports = function(info) {
    var preferences = info.inputs.preferences;
    return beautify(info.path, enhancedBeautifier);

    function enhancedBeautifier(text) {
        var indentChar = ' ';
        if (!preferences.useSoftTabs) {
            indentChar = '\t';
            preferences.tabSize = 1;
        }
        var options = {
            "indent_size": preferences.tabSize,
            "indent_char": indentChar
        };

        // Some tweaks for generator functions
        var beautified = beautifier(text, options);
        beautified = beautified.replace(/function \* \(/g, "function*(");
        beautified = beautified.replace(/function \* (\w)/g, "function* $1");
        return beautified;
    }
};
