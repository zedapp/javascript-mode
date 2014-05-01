var symbol = require("zed/symbol");

var FN_REGEX = /function\s*\*?\s+([a-zA-Z0-9_\-\$]+)\s*\(([^\)]*)\)/mg;
var PROP_FN_REGEX = /([a-zA-Z0-9_\-\$]+)\s*[:=]\s*function\s*\*?\s*\(([^\)]*)\)/mg;
var indexToLine = require("zed/util").indexToLine;

/**
 * Required inputs: text
 */
module.exports = function(info) {
    var path = info.path;
    var text = info.inputs.text;
    var match;
    var tags = [];
    // Regular old functions
    while (match = FN_REGEX.exec(text)) {
        tags.push({
            symbol: match[1] + "(" + match[2] + ")",
            locator: indexToLine(text, match.index),
            path: path,
            type: isConstructor(match[1]) ? "type" : "function"
        });
    }
    // Property functions
    while (match = PROP_FN_REGEX.exec(text)) {
        tags.push({
            symbol: match[1] + "(" + match[2] + ")",
            locator: indexToLine(text, match.index),
            path: path,
            type: isConstructor(match[1]) ? "type" : "function"
        });
    }
    return symbol.updateSymbols(path, tags);

    function isConstructor(s) {
        return (/\w/).exec(s[0]) && s[0].toUpperCase() === s[0];
    }
};
