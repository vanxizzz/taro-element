function rad(d) {
    return d * Math.PI / 180.0;
}

/**
 * 通过两个坐标，算出两点的距离，单位km
 *
 * @param {*} { lng: X1, lat: Y1 }
 * @param {*} { lng: X2, lat: Y2 }
 * @return {*} 
 */
function getDistance({ lng: lng1, lat: lat1 }, { lng: lng2, lat: lat2 }) {
    lng1 = +lng1;
    lat1 = +lat1;
    lng2 = +lng2;
    lat2 = +lat2;
    var radLat1 = rad(lat1);
    var radLat2 = rad(lat2);
    var a = radLat1 - radLat2;
    var b = rad(lng1) - rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137; // EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000; //输出为公里

    var distance = s;
    var distance_str = "";

    if (parseInt(distance) >= 1) {
        distance_str = distance.toFixed(1) + "km";
    } else {
        distance_str = distance * 1000 + "m";
    }
    return s;
}


export default getDistance