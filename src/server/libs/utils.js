var request = require("request");
const { arcgisToGeoJSON } = require('@esri/arcgis-to-geojson-utils');

function _getAppToken(clientId, clientSecret) {
    return new Promise((resolve, reject) => {
        var options = {
            method: 'POST',
            url: 'https://www.arcgis.com/sharing/rest/oauth2/token',
            headers:
                { 'content-type': 'application/x-www-form-urlencoded' },
            form:
            {
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'client_credentials'
            }
        };

        request(options, function (error, response, body) {
            if (error) {
                reject()
            }
            resolve(JSON.parse(body).access_token);
        });
    });
}

function _post(url, params) {
    return new Promise((resolve, reject) => {
        request({ url: url, method: 'POST', form: params }, (error, response, body) => {
            if (error) {
                return reject(error);
            } else {
                try {
                    var res = JSON.parse(body);
                    resolve(res);
                }
                catch (err) {
                    var res = {};
                    res.error = "Error parsing response results.";
                    res.message = "Something went wrong (_POST).";
                    reject(res);
                }
            }
        });
    });
}

function _get(url, params) {
    return new Promise((resolve, reject) => {
        request({ url: url, method: 'GET', qs: params }, (error, response, body) => {
            if (error) {
                reject();
            } else {
                resolve(JSON.parse(body));
            }
        });
    });
}

function _stringify(obj) {
    return JSON.stringify(obj);
}

function _featureSetToGeoJSON(featureSet) {
    var featureCollection = {
        "type": "FeatureCollection",
        "features": []
    };
    var collection = [];
    for (i = 0; i < featureSet.features.length; i++) {
        var geoJsonFeature = {};
        var feature = featureSet.features[i];
        geoJsonFeature.type = "Feature";
        geoJsonFeature.properties = feature.attributes;
        geoJsonFeature.geometry = arcgisToGeoJSON(feature.geometry);
        collection.push(geoJsonFeature);
    }
    featureCollection.features = collection;
    return featureCollection;
}


var self = module.exports = {

    featureSetToGeoJSON: function featureSetToGeoJSON(featureSet) {
        return _featureSetToGeoJSON(featureSet);
    },

    stringify: function stringify(obj) {
        return _stringify(obj);
    },
    
    getAppToken: function getAppToken(clientId, clientSecret) {
        return _getAppToken(clientId, clientSecret);
    },

    post: function post(url, params, msg) {
        return _post(url, params, msg, headers = null);
    },

    get: function get(url, params, mark, msg = null) {
        return _get(url, params, msg, headers = null);
    }

};
