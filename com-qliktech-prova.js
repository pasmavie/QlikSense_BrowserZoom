define( ['jquery', 'text!./prova.css'],
    function ( $, cssContent ) {
        'use strict';
		$( "<style>" ).html(cssContent).appendTo( "head" );
        return {
			initialProperties: {
				qListObjectDef: {
					qShowAlternatives: true,
					qFrequencyMode: "V",
					qSortCriterias: {
						qSortByState: 1
					},
					qInitialDataFetch: [{
						qWidth: 2,
						qHeight: 50
					}]
				},
				fixed: true,
				width: 25,
				percent: true,
				selectionMode: "CONFIRM"
			},
			
			
            //Paint resp.Rendering logic
            paint: function ( $element, layout ) {
				console.log("Layout ID:"+layout.qInfo.qId)
            	
				var id = layout.qInfo.qId + '_ZoomIn';
				var $zoomIN = $( '#' + id);
				
				if ( !$zoomIN.length ) {
				    //console.log( 'No element found with the given Id, so create the element' );
				    $zoomIN = $( document.createElement( 'button' ) );
				    $zoomIN.attr( 'id', id );
				    $zoomIN.html( '+' );
					$zoomIN.attr("class", "zoombutton");
				    $element.append( $zoomIN );
					
					var $zoomLabel = $( document.createElement('h1') )
					$zoomLabel.html('ZOOM')
					$zoomLabel.attr("class", "zoomlabel")
					$element.append($zoomLabel);
				} else {
				    //DO NOTHING $button.html( 'You just resized it' );
				}
				
				var id = layout.qInfo.qId + '_ZoomOut';
				var $zoomOUT = $( '#' + id );
				if ( !$zoomOUT.length ) {
				    //console.log( 'No element found with the given Id, so create the element' );
				    $zoomOUT = $( document.createElement( 'button' ) );
				    $zoomOUT.attr( 'id', id );
				    $zoomOUT.html( '-' );
					$zoomOUT.addClass("zoombutton");
				    $element.append( $zoomOUT );
				} else {
				    //DO NOTHING
				}
				
				$zoomIN.click(function(){zoomPage(10)});
				$zoomOUT.click(function(){zoomPage(-10)});
				
				var zoomLevel = 100;
				
				function zoomPage(step){
					zoomLevel = zoomLevel + step;
					document.body.style.zoom = zoomLevel.toString() + "%"					
				};
				
				
				var windowWidth = $(window).width();
				var windowHeight = $(window).height();
				
				$(window).resize(function(){
					var newWidth = $(window).width();
					var newHeight = $(window).height();
					// windowWidth & windowHeight are automatically updated when the browser size is modified
					var widthDiff = newWidth - windowWidth;
					var heightDiff = newHeight - windowHeight;
								
					if(widthDiff > 100 || heightDiff > 100){zoomLevel = zoomLevel + 10;}
					else if(widthDiff < 100 || heightDiff < 100){zoomLevel = zoomLevel - 10};
					document.body.style.zoom = zoomLevel.toString() + "%"
										
					windowWidth = $(window).width();
					windowHeight = $(window).height()
				});
				
				console.log(windowWidth, windowHeight)
					
			}
	    };
    } );
