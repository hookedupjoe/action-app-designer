define("ace/snippets/javascript",["require","exports","module"],function(e,t,n){"use strict";t.snippetText='# Prototype\nsnippet _action\n	actions.${1:name} = ${1:name};\n	function ${1:name}(theParams, theTarget){\n		var tmpParams = ThisApp.getActionParams(theParams, theTarget, [$0]);\n	}\n	\n# tertiary conditional\nsnippet ter\n	${1:/* condition */} ? ${2:a} : ${3:b}\n# switch\nsnippet requ\nguard ^\\s*\n	var ${1/.*\\/(.)/\\u$1/} = require("${1}").${1/.*\\/(.)/\\u$1/};\n	$0\n',t.scope="javascript"});                (function() {
                    window.require(["ace/snippets/javascript"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            