
    'use strict';

    function KoiEditor(){
        var _self = {};
        var settings = {
            contentId:'koi_editor_content',
            toolboxPosition: 'left',
            homeUrl: '/',

        };
        var editableElements = ["p", "h1", "h2", "h3", "h4", "h5", "h6"];
        var elementProperties = {
                'p' : {
                    'properties': ['text','color','font','background','layout','filters']
                }
        };
        var edditingElement;
        var edditingElementType = 'p';
        var edditingElementObject;

        _self._init = function() {
            settings.homeUrl = _self._getScriptHomeUrl();
            var height = document.body.clientHeight;

            // css
            $('head').append('<link rel="stylesheet" type="text/css" href="' + settings.homeUrl + 'koi_editor/css/koi_editor.css">');

            // Insert the editor div
            $('body').html('<table class="table" id="ke-main-table" width="100%" border="0" height="' + height + '"><tr><td width="20%" id="ke-toolbox-td"></td><td style="overflow: scroll;"><div class="container-fluid" id="ke-main-container">' + $('body').html() + '</div></td></tr></table>');

            // Load the toolbox
            $('#ke-toolbox-td').load(settings.homeUrl + 'koi_editor/html/toolbox.html');

            // Activate the editable elements
            _self._activateEditableElements();
        };

        _self._getScriptHomeUrl = function _getScriptHomeUrl(){
            var script =  document.currentScript || document.querySelector('script[src*="koi_editor.js"]')
            var src = script.src;
            src = src.replace("koi_editor.js","");
            return src;
        }

        _self._deactivateEditableElements = function _deactivateEditableElements(){
            var keEditableContentDiv = 'ke-editable-content';
            if ( $( '#' + keEditableContentDiv ).length <= 0) {
                keEditableContentDiv = 'ke-main-container';
            }
            editableElements.forEach(function (elementType, index, array) {
                $('#' + keEditableContentDiv + ' ' + elementType).each(function(i, obj) {
                    $(this).removeClass('ke-element-'+elementType);
                });
            });
        }

        _self._activateEditableElements = function _activateEditableElements(){
            var keEditableContentDiv = 'ke-editable-content';
            if ( $( '#' + keEditableContentDiv ).length <= 0) {
                keEditableContentDiv = 'ke-main-container';
            }

            editableElements.forEach(function (elementType, index, array) {
                $('#' + keEditableContentDiv + ' ' + elementType).each(function(i, obj) {
                    $(this).addClass('ke-element-'+elementType);
                    $(this).click(function() {
                        _self._editElement( elementType, $( this ) );
                    });
                });
            });
        }

        _self._editElement = function _editElement(elementType, object){
            $('#ke-toolbox-body').html('');
            edditingElement = object;
            edditingElementType = elementType;
            console.log(elementType);
            console.log('init element type');
            elementProperties[edditingElementType].properties.forEach(function (property, index, array) {
                console.log('In property ' + property);
                if(property == 'text'){
                    _self.kePropertyText();
                }
                if(property == 'color'){
                    _self.kePropertyColor();
                }
            });
        }

        _self.kePropertyText = function kePropertyText () {
            $.ajax({ type: "GET",
                url: settings.homeUrl + 'koi_editor/html/property-text.html',
                success : function(propertyHTML)
                {
                    $('#ke-toolbox-body').append(propertyHTML);
                    _self.kePropertyTextEvents();
                }
            });
        }
        _self.kePropertyTextEvents = function kePropertyTextEvents () {
            $('#ke-property-text-text').val( _self.keBrToLineBreaks( edditingElement.html() ) );
            $('#ke-property-text-text').focus();
            $('#ke-property-text-text').prop('selectionEnd', 1100);
            $('#ke-property-text-text').keyup(function() {
                edditingElement.html(_self.keLineBreaksToBr($(this).val()));
            });
        }
        _self.keLineBreaksToBr = function keLineBreaksToBr (text) {
            var re = /\n/gi;
            var html = text.replace(re,"<br>");
            return html;
        }
        _self.keBrToLineBreaks = function keBrToLineBreaks (html) {
            var re = /<br\s*\/*>/gi;
            var text = html.replace(re,"\n");
            return text;
        }
        _self.kePropertyColor = function kePropertyColor () {
            $.ajax({ type: "GET",
                url: settings.homeUrl + 'koi_editor/html/property-color.html',
                success : function(propertyHTML)
                {
                    $('#ke-toolbox-body').append(propertyHTML);
                    //_self.kePropertyTextEvents();
                }
            });
        }
        // _self.kePropertyColorEvents = function kePropertyColorEvents () {
        //     $('#ke-property-text-text').val( _self.keBrToLineBreaks( edditingElement.html() ) );
        //     $('#ke-property-text-text').focus();
        //     $('#ke-property-text-text').prop('selectionEnd', 1100);
        //     $('#ke-property-text-text').keyup(function() {
        //         edditingElement.html(_self.keLineBreaksToBr($(this).val()));
        //     });
        // }

        _self.keSave = function keSave() {
            _self._deactivateEditableElements();
            $.post( "test.php", { name: "John", time: "2pm" } );
            alert("Saved");
        }

        _self._init();
        return _self;
    }
