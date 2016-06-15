// Tiny library

//---------------------------------
// http://checkman.io/blog/creating-a-javascript-library/
// http://code.tutsplus.com/tutorials/build-your-first-javascript-library--net-26796


(function( window ){

    'use strict';

    function define_library () {

        var Library = {};
        var doc = document;
        var ns = 'http://www.w3.org/2000/svg';

        function ElemSet( elemsList ) {
            this.elemsList = elemsList;
        }

        //---------------------------------

        Library.get = function( selector ) {
            var nodeList = doc.querySelectorAll( selector );
            var elemsList = Array.prototype.slice.call( nodeList );

            return new ElemSet( elemsList );
        };

        //---------------------------------

        Library.create = function ( tagName ) {
            var elemList = [ doc.createElement( tagName ) ];
            return new ElemSet( elemList );
        };

        //---------------------------------

        Library.createNS = function( elemName ) {
            var elemList = [ doc.createElementNS( ns, tagName ) ];
            return new ElemSet( elemList );
        };

        //------------------------------

        ElemSet.prototype.addClass = function ( classNames ) {
            this.elemsList.forEach( function ( item ){
                if ( typeof classNames === 'string') {
                    classNames = [classNames];
                }

                classNames.forEach( function ( className ){
                    item.classList.add( className );
                });
            });

            return this;
        };

        //---------------------------------

        ElemSet.prototype.append = function( elem ) {

            this.elemsList.forEach( function ( item ) {
                var elemToAdd = elem;

                if ( typeof elem === 'object' ) {
                    elemToAdd =  elem.elemsList[0];
                }
                else if ( typeof elem === 'string' ) {
                    elemToAdd = Library.create( elem ).elemsList[0];
                }

                item.appendChild ( elemToAdd );
            });

            return this;
        };

        //---------------------------------

        ElemSet.prototype.attr = function( attrName, attrVal ) {

            var elem = this.elemsList[0];

            if ( attrVal ) {
                elem.setAttribute.apply( elem, arguments );
                return this;
            }

            var out = elem.getAttribute( attrName );
            return out;

        };

        //---------------------------------
        // Colored console output

        var consoleStyles = {
            'h1': 'font: 2.5em/1 Arial; color: crimson;',
            'h2': 'font: 2em/1 Arial; color: orangered;',
            'h3': 'font: 1.6em/1 Arial; color: olivedrab;',
            'val': 'font: bold 1.3em/1 Arial; color: midnightblue',
            'warn': 'padding: 0 .3rem; background: crimson; font: 2em/1 Arial; color: white'
        };

        Library.out = function( msg, style ) {
            if ( !style || !consoleStyles[ style ] ) {
                style = 'val';
            }
            console.log( '%c' + msg, consoleStyles[ style ] );
        };

        return Library;
    }

    if ( typeof Library === 'undefined' ) {
        window.Library = define_library();
    }

})(window);
