var gtagTracker = (function () {
'use strict';

var gtagTracker = function (ID) {
    window.dataLayer = window.dataLayer || [];

    window.gtag = function () {
        window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', ID);

    let loadErrorEvents = window.__e && window.__e.q || [];

    let error = event => {
        //console.log(event)
        let error = `${event.message} (${event.filename}:${event.lineno}:${event.colno})`;
        window.gtag('event', 'exception', {
            description: error,
            false: false
        });
    };

    return {
        init: () => {
            // Replay any stored load error events.
            for (let event of loadErrorEvents) {
                error(event);
            }

            // Add a new listener to track event immediately.
            window.addEventListener('error', error);
        },

        error: err => {
            window.gtag('event', 'exception', {
                description: err,
                false: false
            });
        }
    };
};

return gtagTracker;

}());
//# sourceMappingURL=gtag-tracker.js.map
