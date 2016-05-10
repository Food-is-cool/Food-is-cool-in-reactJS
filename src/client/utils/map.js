const mapStyles = [
    {
        featureType: "all",
        stylers: [
            {
                saturation: -80
            }
        ]
    }, {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
            {
                hue: "#0D202A"
            },
            {
                saturation: 30
            },
            {
                lightness: -30
            }
        ]
    }, {
        featureType: "poi.business",
        elementType: "labels",
        stylers: [
            {
                visibility: "on"
            }
        ]
    }
];

function createMap(options) {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: options.position.coords.latitude,
            lng: options.position.coords.longitude
        },
        zoom: 15
    });

    map.setOptions({
        styles: mapStyles
    });

    if (options.currentPosition) {
        new google.maps.Marker({
            position: {
                lat: options.currentPosition.coords.latitude,
                lng: options.currentPosition.coords.longitude
            },
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: "#0080FF",
                fillOpacity: 1.0,
                strokeColor: "white",
                strokeWeight: 2,
                scale: 8
            },
            draggable: false,
            map: map
        });
    }

    if (options.markers) {
        options.markers.forEach(function(marker) {
            new google.maps.Marker({
                position: {
                    lat: marker.latitude,
                    lng: marker.longitude
                },
                map: map,
                title: marker.title
            });
        });
    }

    return map;
}
export default {
    createMap
}
