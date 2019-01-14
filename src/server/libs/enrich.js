const { post, getAppToken, stringify, featureSetToGeoJSON } = require("../libs/utils");


let online_url = "https://geoenrich.arcgis.com/arcgis/rest/services/World/geoenrichmentserver/GeoEnrichment/enrich";
let portal_url = "https://doubledouble.eastus.cloudapp.azure.com/portal/sharing/servers/09570257519241ee83c7c147e51db607/rest/services/World/GeoenrichmentServer/Geoenrichment/enrich";


async function _enrich(zips, datacollections, clientId, clientSecret) {
    let sa = [{ "sourceCountry": "US", "layer": "US.ZIP5", "ids": zips }];
    let token = await getAppToken(clientId, clientSecret);
    let params = {
        f: "json",
        studyAreas: stringify(sa),
        analysisVariables: stringify(datacollections),
        suppressNullValues: false,
        useData: stringify({"sourceCountry": "US"}),
        returnGeometry: true,
        token: token
    };
    let result = await post(online_url, params);
    return featureSetToGeoJSON(result.results[0].value.FeatureSet[0]);
}


module.exports = {

    enrich: function enrich(studyareas, datacollections, clientId, clientSecret) {
        return _enrich(studyareas, datacollections, clientId, clientSecret);
    }
}