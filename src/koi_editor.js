$(document).ready(function(){
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
            $('body').html('<table class="table" id="ke-main-table" width="100%" border="0" height="' + height + '"><tr><td width="20%" id="ke-toolbox-container-td"></td><td style="overflow: scroll;"><div class="container-fluid" id="ke-main-container">' + $('body').html() + '</div></td></tr></table>');

            // Load the toolbox
            $('#ke-toolbox-container-td').load(settings.homeUrl + 'koi_editor/html/toolbox.html');

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
            editableElements.forEach(function (element, index, array) {
                $('#ke-main-container ' + element).each(function(i, obj) {
                    $(this).removeClass('ke-element-p');
                });
            });
        }

        _self._activateEditableElements = function _activateEditableElements(){
            editableElements.forEach(function (elementType, index, array) {
                $('#ke-main-container ' + elementType).each(function(i, obj) {
                    $(this).addClass('ke-element-'+elementType);
                    $(this).click(function() {
                        _self._editElement( elementType, $( this ) );
                    });
                });
            });
        }

        _self._editElement = function _editElement(elementType, object){
            edditingElement = object;
            edditingElementType = elementType;
            console.log(elementType);
            if(elementType == 'p'){
                console.log('init element type');
                edditingElementObject = KoiEditorEditElementP();
            }
        }

        function KoiEditorEditElementP () {
            var _self = {};
            elementProperties[edditingElementType].properties.forEach(function (property, index, array) {
                console.log('In property');
            });

            return _self;
        }

        _self._init();
        return _self;
    }

    if(typeof(window.koiEditor) === 'undefined'){
        window.koiEditor = KoiEditor();
    }

});
