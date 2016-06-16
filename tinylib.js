// Tiny library

//---------------------------------
// http://checkman.io/blog/creating-a-javascript-library/
// http://code.tutsplus.com/tutorials/build-your-first-javascript-library--net-26796
//http://lea.verou.me/2015/04/idea-extending-native-dom-prototypes-without-collisions/

(function( window ){

    'use strict';

    function define_library () {

        var tinyLib = {};
        var doc = document;
        var ns = 'http://www.w3.org/2000/svg';

        function ElemSet( elemsList ) {
            this.elemsList = elemsList;

            if ( elemsList.length === 1 ){
              this.elem = elemsList[0];
            }
        }

        //---------------------------------

        tinyLib.get = function( selector ) {
            var nodeList = doc.querySelectorAll( selector );
            var elemsList = Array.prototype.slice.call( nodeList );

            return new ElemSet( elemsList );
        };

        //---------------------------------

        tinyLib.create = function ( tagName ) {
            var elemList = [ doc.createElement( tagName ) ];
            return new ElemSet( elemList );
        };

        //---------------------------------

        tinyLib.createNS = function( elemName ) {
            var elemList = [ doc.createElementNS( ns, tagName ) ];
            return new ElemSet( elemList );
        };

        //------------------------------
        // ElemSet Methods

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
                    elemToAdd = tinyLib.create( elem ).elemsList[0];
                }

                item.appendChild ( elemToAdd );
            });

            return this;
        };

        //---------------------------------

        ElemSet.prototype.attr = function( attrName, attrVal ) {

            var elem = this.elemsList[0];
            var attrSet = {};

            if ( attrVal ) {
              attrSet[ attrName ] = attrVal;
            }
            else if ( typeof attrName === 'object' ) {
              attrSet = attrName;
            }

            if ( Object.keys(attrSet).length > 0 ) {
              for ( var key in attrSet ) {
                elem.setAttribute( key, attrSet[ key ]);
              }
              return this;
            }

            var out = elem.getAttribute( attrName );
            return out;

        };

        //---------------------------------

        ElemSet.prototype.html = function ( content ) {
          var elem = this.elemsList[0];

          if( content ) {
            elem.innerHTML = content;
            return this;
          }

          return elem.innerHTML;
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

        tinyLib.out = function( msg, style ) {
            if ( !style || !consoleStyles[ style ] ) {
                style = 'val';
            }
            console.log( '%c' + msg, consoleStyles[ style ] );
        };

        //---------------------------------

        return tinyLib;
    }

    //---------------------------------

    if ( typeof tinyLib === 'undefined' ) {
        window.tinyLib = define_library();
    }

})(window);
