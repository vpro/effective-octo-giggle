import Stapes from 'stapes';

var ApiService = Stapes.subclass({

    constructor: function () {

    },

    getNext: function () {

        return new Promise( function ( resolve, reject ) {

            setTimeout( function () {

                resolve( 'dingen zijn klaar' );

            }, 1500 );

        });

    }

});

export default ApiService;