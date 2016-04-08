import $ from 'jquery';
import Stapes from 'stapes';

var ApiService = Stapes.subclass({

    constructor: function () {

        this.index = 0;
        this.tracks = [];

        // this.youtubeItem = {
        //     type: 'youTube',
        //     url: 'https://www.youtube.com/watch?v=y9P2V0_p6vE'
        // };
        //
        // this.pomsItem = {
        //     type: 'poms',
        //     url: 'VPWON_1246102'
        // };

    },

    init: function ( fileName ) {

        return new Promise( function ( resolve, reject ) {

            $.getJSON( '../impl/data/' + fileName + '.json', function ( data ) {

                this.tracks = data.tracks;

                resolve();

            }.bind( this ) )
            
            .fail( function () {
                
                reject( 'vout!' );
                
            });

        }.bind( this ) );

    },

    getNext: function () {
        
        return new Promise( function ( resolve, reject ) {

            var nextItem = this.tracks[ this.index ];

            resolve( nextItem );

            this.index++;

        }.bind( this ) );

    },
    
    reject: function () {

        return new Promise( function ( resolve, reject ) {

            resolve( this.pomsItem );

        }.bind( this ) );

    }

});

export default ApiService;