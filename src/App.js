import $ from 'jquery';
import Stapes from 'stapes';
import ApiService from './ApiService.js';

import POMSPlayerControllerFactory from 'vpro-mediaplayer/js/impl/PlayerControllerFactory.js';
import YoutubePlayer from './YoutubePlayer.js';

var App = Stapes.subclass({

    constructor: function ( config ) {

        this.apiService = new ApiService();
        this.$rootNode = $( config.rootNode );
        this.$playerNode = $( config.playerNode );
        this.$buttonStartNode = $( config.buttonStartNode );
        this.$buttonNextNode = $( config.buttonNextNode );
        this.$buttonRejectNode = $( config.buttonRejectNode );
        this.$infoNode = $( config.infoNode );

        this.apiURL = config.apiURL;
        this.currentPlayer = undefined;
        this.player = undefined;

        this.shaking = false;

        var fileName = gup( 'data' );

        this.createIntroPlayer();
        this.bindHandlers();
        
        this.apiService.init( fileName ).then( function () {
            
            this.$rootNode.removeClass( 'loading' );
            
        }.bind( this ) );

    },

    createIntroPlayer: function () {
        this.introPlayer = document.createElement( 'audio' );
    },

    bindHandlers: function () {
        
        this.$buttonStartNode.on( 'click', function () {
        
            this.getNext();
            // this.rejectCurrent();

        }.bind( this ) );
        
        
        this.$buttonNextNode.on( 'click', function () {

            this.getNext();

        }.bind( this ) );

        
        this.$buttonRejectNode.on( 'click', function () {

            this.getNext();
            // this.rejectCurrent();

        }.bind( this ) );

        $( window ).keypress( function ( e ) {
            if ( e.which === 13 ) {
                this.getNext();
            }
        }.bind( this ) );

        $( window ).keypress( function ( e ) {
            if ( e.which === 32 ) {
                this.getNext();
            }
        }.bind( this ) );
        
        // this.shakeEvent = new Shake ( {
        //     threshold: 15, // optional shake strength threshold
        //     timeout: 1000 // optional, determines the frequency of event generation
        // });
        //
        // this.shakeEvent.start();
        //
        // window.addEventListener( 'shake', this.detectShake.bind( this ), false);

    },

    // detectShake: function () {
    //
    //     if ( this.shaking !== true ) {
    //
    //         this.shaking = true;
    //
    //         this.getNext();
    //
    //         setTimeout( function () {
    //
    //             this.shaking = false;
    //
    //         }.bind( this ), 2000 );
    //
    //     }
    //
    // },

    getNext: function () {

        this.apiService.getNext()
            
            .then( function ( nextItem ) {
            
                this.playItem( nextItem );
            
            }.bind( this ) )
        
            .catch( function ( reason ) {
                throw new Error( reason );
            });
        
    },

    rejectCurrent: function () {

        this.apiService.reject()
            
            .then( function ( nextItem ) {
            
                this.playItem( nextItem );

            }.bind( this ) )
        
            .catch( function ( reason ) {
                throw new Error( reason );
            }
        );
        
    },

    setInfo: function ( item ) {

        this.$infoNode.html( item.title );

    },

    playItem: function ( item ) {

        this.destroyCurrentPlayer();

        this.setInfo( item );

        this.introPlayer.setAttribute( 'src', '/test/impl/data/' + item.intro );

        this.introPlayer.play();

        setTimeout( function () {

            this.playMid( item.url );

        }.bind( this ), 2000 );


        // switch ( item.type.toLowerCase() ) {
        //
        //     case 'youtube' :
        //         this.playYouTube( item.url );
        //         break;
        //
        //     case 'poms' :
        //         this.playMid( item.url );
        //         break;
        //
        // }

    },

    playMid: function ( mid ) {

        // if( this.currentPlayer !== 'poms' ) {

            this.createPOMSPlayer( mid );
        // } else {
            // console.log( 'this.player: ', this.player );
            // this.player.setId( mid );
        // }

    },

    playYouTube: function ( url ) {

        if( this.currentPlayer !== 'youtube' ) {
            this.destroyCurrentPlayer();
            this.createYoutubePlayer( url );
        } else {
            this.player.play( url );
        }

    },

    destroyCurrentPlayer () {
        if( this.currentPlayer ) {
            this.player.destroy();
            this.$playerNode.empty();
        }
    },

    createYoutubePlayer: function ( url ) {

        this.currentPlayer = 'youtube';

        var youtubePlayer = new YoutubePlayer();

    },

    createPOMSPlayer: function ( mid ) {

        this.currentPlayer = 'poms';

        var playerFactory = new POMSPlayerControllerFactory( {
            profile: 'vpro',
            playerConfig: {
                autoplay: true,
                controls: false
            }
        });

        this.player = playerFactory.createPlayerController( this.$playerNode );

        this.player.getPlayer().addEventListener( 'play', function () {
            // console.log( 'plee' );
        });

        this.player.getPlayer().addEventListener( 'pause', function () {
            // console.log( 'paus' );
        });

        this.player.getPlayer().addEventListener( 'ended', function () {

            this.getNext();

        }.bind( this ) );

        this.player.setId( mid );

    }

});

function gup ( name, url ) {
    if ( ! url ) url = location.href;
    name = name.replace( /[\[]/, "\\\[" ).replace( /[\]]/, "\\\]" );
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[ 1 ];
}


export default App;