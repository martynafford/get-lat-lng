// Copyright (c) 2018 Martyn Afford
// Licensed under the MIT licence
(function(window, document) {
    'use strict';

    let map;
    let geojson = '';
    let wikitext = '';

    function get(id) {
        return document.getElementById(id);
    }

    function updateInfo() {
        const centre = map.getCenter();
        const lat = centre.lat.toFixed(5);
        const lng = centre.lng.toFixed(5);

        get('lat').innerHTML = lat;
        get('lng').innerHTML = lng;
        get('zoom').innerHTML = map.getZoom();
        geojson = '{"type": "Point", "coordinates": [' + lng + ',' + lat + ']}';
        wikitext = '{{Coord|' + lat + '|' + lng + '|display=title}}';
    }

    function centreCrosshair() {
        const mapElement = get('map');
        const crosshair = get('crosshair');
        const width = mapElement.clientWidth;
        const height = mapElement.clientHeight;
        const iconSize = 19;

        crosshair.style.top = (height - iconSize) / 2 + 'px';
        crosshair.style.left = (width - iconSize) / 2 + 'px';
    }

    function resize() {
        centreCrosshair();
        updateInfo();
    }

    function init() {
        map = L.map('map').setView([50, 16], 4);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
            maxZoom: 18,
            subdomains: 'abc'
        }).addTo(map);

        map.on('move', updateInfo).on('zoom', updateInfo);

        get('geojson').addEventListener('click', function() {
            alert(geojson);
        });

        get('wiki').addEventListener('click', function() {
            alert(wikitext);
        });

        resize();
    }

    window.addEventListener('load', init);
    window.addEventListener('resize', resize);
}(window, document));
