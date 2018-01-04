module.exports = function(ID) {
    window.dataLayer = window.dataLayer || [];

    window.gtag = function() { window.dataLayer.push(arguments); }
    window.gtag('js', new Date());
    window.gtag('config', ID);

    //let loadErrorEvents = window.__e && window.__e.q || [];

    let error = (event) => {
        //console.log(event)
        let error = `${event.message} (${event.filename}:${event.lineno}:${event.colno})`;
        window.gtag('event', 'exception', {
            description: error,
            false: false
        });
    }

    window.addEventListener('error', error);

    return {
        error: (err) => {
            window.gtag('event', 'exception', {
                description: err,
                false: false
            });
        }
    }
}