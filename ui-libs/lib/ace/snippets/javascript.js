define("ace/snippets/javascript",["require","exports","module"],function(e,t,n){"use strict";t.snippetText='# Prototype\nsnippet _action\n	actions.${1:name} = ${1:name};\n	function ${1:name}(theParams, theTarget){\n		var tmpParams = ThisApp.getActionParams(theParams, theTarget, [$0]);\n	}\n	\n# tertiary conditional\nsnippet _thendo\n	.then(function($0theReply){\n	    \n		})\n	\n	\n# tertiary conditional\nsnippet _options\n	var tmpOptions = theOptions || {};\n	\n# tertiary conditional\nsnippet _conclip\n	console.log( \'$CLIPBOARD\'$1, $CLIPBOARD);\n	\n# tertiary conditional\n',t.scope="javascript"});                (function() {
                    window.require(["ace/snippets/javascript"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            