/*
 * loops.monitor.js
 * 
 * Copyright (c) 2010 Paul Panserrieu (http://42loops.com)
 */

/**
 *
 * embedding the stats.js
 *
 * example:
 *  start the monitoring at the given coordinates
 *  Loops.monitor({container:'id-elt',x:'50px',y:'50px'});
 *
 *  start the monitoring at the default coordinates
 *  Loops.monitor({container:'anId'});
 *
 */

(function(L){
    L.monitor = function(config){
        try {
            var opt = config || {}, stats = new Stats();
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.left =  opt.x || '50px';
            stats.domElement.style.top =   opt.y || '50px';

            document.getElementById(config.container).appendChild(stats.domElement);

            setInterval( function () {
                    stats.update();
            }, 1000 / 60 );
        }
        catch (error) {
            console.log("Stats.js is not available: " + error);
        }
    };
})(Loops={});
