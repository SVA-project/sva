const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
exports.createAgent = functions.region("northamerica-northeast1").https.onCall(async (data, context) => { return { success: true, message: "Ordre de création d'agent reçu." }; });
exports.createPack = functions.region("northamerica-northeast1").https.onCall(async (data, context) => { return { success: true, message: "Ordre de création de pack reçu." }; });
exports.createAd = functions.region("northamerica-northeast1").https.onCall(async (data, context) => { return { success: true, message: "Ordre de création de publicité reçu." }; });
