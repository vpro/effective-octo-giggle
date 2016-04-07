import $ from 'jquery';
import Stapes from 'stapes';
import ApiService from './ApiService.js';

import PlayerControllerFactory from 'vpro-mediaplayer/js/impl/PlayerControllerFactory.js';

var App = Stapes.subclass({

    constructor: function ( config ) {

        this.apiService = new ApiService();

        this.$rootNode = $( config.rootNode );
        this.$playerNode = $( config.playerNode );
        this.$buttonNextNode = $( config.buttonNextNode );
        this.$buttonRejectNode = $( config.buttonRejectNode );

        this.bindHandlers();
        
        this.apiURL = config.apiURL;

        this.currentPlayer = undefined;

    },

    bindHandlers: function () {
        
        this.$buttonNextNode.on( 'click', function () {
            this.getNext();
        }.bind( this ));

        this.$buttonRejectNode.on( 'click', function () {
            this.rejectCurrent();
        }.bind( this ));

    },

    getNext: function () {

        this.apiService.getNext()
            
            .then( function ( nextItem ) {
            
                this.playItem( nextItem );
            
            }.bind( this ))
        
            .catch( function ( reason ) {
                throw new Error( reason );
            });
        
    },

    rejectCurrent: function () {
        
        this.apiService.getNext()
            
            .then( function ( nextItem ) {
            
                this.playItem( nextItem );

            }.bind( this ))
        
            .catch( function ( reason ) {
                throw new Error( reason );
            }
        );
        
    },

    playItem: function ( item ) {

        switch ( item ) {
            
            case item.type.toLowerCase() === 'youtube' :
                this.playYouTube();
                break;

            case item.type.toLowerCase() === 'poms' :
                this.playMid();
                break;
            
        }

    },

    playMid: function () {

    },

    playYouTube: function () {
        
    },

    createOmroepPlayer: function () {

        var factory = new PlayerControllerFactory();

        console.log( 'factory: ', factory );

//         System.import( '../../node_modules/vpro-mediaplayer/src/js/impl/PlayerControllerFactory.js' ).then( function ( PlayerControllerFactory ) {
//
//             var factory = PlayerControllerFactory.default;
//             var plr = new factory({
//                 profile: 'vpro',
//                 playerConfig: {
//                        autoplay: true
//                 }
//             });
//
//             var plrElement = document.getElementById( 'videoPlayer' );
//             plrElement.style[ 'padding-bottom' ] = '56.25%'; /* truckje om de grootte correct te krijgen */
//
//             var playerController = plr.createPlayerController( plrElement );
//             playerController.setId( 'VPWON_1246102' );  /* Tegenlicht voorbeeld, kan verlopen zijn */
//
//         });

    }

});

export default App;