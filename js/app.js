/*
 * app.js
 */

(function (app) {
    app.main = function () {
        try {
            app.rods = [];
            app.container = $("main-container");

            on("touchstart", document, prevent, false);
            on("touchmove", document, prevent, false);
            on("touchend", document, prevent, false);

            for (var i=0; i< 14; i++) {
                app.rods.push(new window.Rod({
                    id:"small"+i+"-",
                    nbr:1,
                    pos:{ row:i, line:1 },
                    container:app.container
                }));
                app.rods.push(new window.Rod({
                    id:"big"+i+"-",
                    nbr:4,
                    pos:{ row:i, line:0 },
                    container:app.container
                }));
            }
            if (DEBUG) {
                Loops.monitor({
                    container:'main-container',
                    x:'945px',
                    y:'0px'
                });
            }
        }
        catch(err) {
            console.log('Error: line '
                + err.line
                + " in "
                + err.sourceURL
                + ' : '
                + err.message
            );
        }
    };
}(window.App = window.App || {}));
