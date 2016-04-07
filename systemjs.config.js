/**
 * This is the SystemJS config needed for
 * -    the impl test pages.
 */

System.config( {
    baseURL: '/',
    transpiler: 'traceur'
} );

System.config( {
    map: {
        jquery: 'node_modules/jquery/dist/jquery.js',
        stapes: 'node_modules/stapes/stapes.min.js',
        jqueryInview: 'node_modules/jquery-inview/jquery.inview.min.js',
        jqueryViewport: 'node_modules/vpro-jquery-viewport/src/jqueryViewport.js',
        traceur: 'node_modules/traceur/bin/traceur.js',

        fastclick: 'node_modules/fastclick/lib/fastclick.js',
        
        extend: 'node_modules/extend/index.js',
        handlebars: 'node_modules/handlebars/dist/handlebars.min.js',
        'handlebars-runtime': 'node_modules/handlebars/dist/handlebars.runtime.min.js',
        hbs: 'node_modules/plugin-hbs/hbs.js',
        'server-config': 'node_modules/vpro-dev/server-dev.config.js',
        
        'vpro-api': 'node_modules/vpro-api/src',
        'vpro-analytics': 'node_modules/vpro-analytics/src',
        'vpro-media-domain': 'node_modules/vpro-media-domain/src',
        'vpro-mediaplayer': 'node_modules/vpro-mediaplayer/src',
        'vpro-pages-domain': 'node_modules/vpro-pages-domain/src',
        'vpro-player-domain': 'node_modules/vpro-player-domain/src',
        'vpro-player-plus': 'node_modules/vpro-player-plus/src',
        'vpro-shared-domain': 'node_modules/vpro-shared-domain/src',
        'vpro-social': 'node_modules/vpro-social/src',
        'jquery-xdomainrequest': 'node_modules/jQuery-ajaxTransport-XDomainRequest/jquery.xdomainrequest.min.js'
    }
} );