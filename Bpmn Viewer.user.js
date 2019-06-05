// ==UserScript==
// @name         Bpmn Viewer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Show a source Bpmn as a diagram
// @author       LudoO
// @license      MIT
// @match        https://github.com/*.bpmn
// @require      https://unpkg.com/jquery@3.3.1/dist/jquery.js
// @require      https://unpkg.com/bpmn-js@3.4.1/dist/bpmn-viewer.development.js
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle('.canvas {border: solid 1px black; height:400px; }  ');

    var url = 'https://raw.githubusercontent.com'+$('#raw-url').attr('href');

    $('.repository-content').prepend("<div class='canvas'><div id='js-canvas'></div></div>");

    var viewer = new BpmnJS({
      container: $('#js-canvas'),
      height: 600
    });

    function load(xml){
        viewer.importXML(xml, function(err) {
          if (err) {
            console.error(err);
          } else {
            viewer.get('canvas').zoom('fit-viewport');
          }
        });
    }

    function openFromUrl(url) {
        GM_xmlhttpRequest({
            url: url,
            //anonymous: true,
            headers: {
                'Referer': 'https://www.github.com/',
                'Access-Control-Allow-Origin': '*'
            },
            method: 'GET',
            onload: function(res){
                load(res.responseText);
            }
        });
    }

    $(function() {
        var url = 'https://www.github.com'+$('#raw-url').attr('href');
        console.log('load url : ['+url+' ]')
        openFromUrl(url);
    });

})();
