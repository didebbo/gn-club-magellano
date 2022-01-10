locations = [
    { 'id': 1000, 'zip_code': '37069', 'lat': 45.35, 'lng': 10.84 },
    { 'id': 1001, 'zip_code': '37121', 'lat': 45.44, 'lng': 10.99 },
    { 'id': 1001, 'zip_code': '37129', 'lat': 45.44, 'lng': 11.00 },
    { 'id': 1001, 'zip_code': '37133', 'lat': 45.43, 'lng': 11.02 },
];

shoppers = [
    { 'id': 'S1', 'lat': 45.46, 'lng': 11.03, 'enabled': true },
    { 'id': 'S2', 'lat': 45.46, 'lng': 10.12, 'enabled': true },
    { 'id': 'S3', 'lat': 45.34, 'lng': 10.81, 'enabled': true },
    { 'id': 'S4', 'lat': 45.76, 'lng': 10.57, 'enabled': true },
    { 'id': 'S5', 'lat': 45.34, 'lng': 10.63, 'enabled': true },
    { 'id': 'S6', 'lat': 45.42, 'lng': 10.81, 'enabled': true },
    { 'id': 'S7', 'lat': 45.34, 'lng': 10.94, 'enabled': true },
];

function haversine(lat1, lon1, lat2, lon2) {
    Number.prototype.toRad = function () {
        return this * Math.PI / 180;
    }
    const R = 6371; // km
    var x1 = lat2 - lat1;
    var dLat = x1.toRad();
    var x2 = lon2 - lon1;
    var dLon = x2.toRad();

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d.toFixed(3);
}

function setCoverages(shoppers, locations, maxDistance) {
    shoppers.forEach(shopper => {
        let areasCoveraged = 0;
        locations.forEach(location => {
            const dist = haversine(shopper.lat, shopper.lng, location.lat, location.lng);
            if (dist < maxDistance) areasCoveraged++;
            // console.log('Shopper id: ' + shopper.id + " Location id: " + location.id + " distance: " + dist + "km covered: " + (dist < maxDistance));
        });
        shopper.areasCoveraged = areasCoveraged;
        shopper.coveragesPercentage = setCoveragesPercentage(shopper.areasCoveraged, locations.length);
        // console.log(shopper);
    });
}

function setCoveragesPercentage(areasCoveraged, totalAreas) {
    return (100 * areasCoveraged) / totalAreas;
}

function getSortedShoppersCoverages(shoppers) {
    let sortedShoppers = shoppers.sort((a, b) => {
        return b.coveragesPercentage - a.coveragesPercentage;
    });
    return sortedShoppers;
}

setCoverages(shoppers, locations, 10);
console.log(getSortedShoppersCoverages(shoppers));
