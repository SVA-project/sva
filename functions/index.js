/**
 * Moteur Intelligent SVA
 * Fonction: initiateSvaProject
 * Version: 2.0 (Unifiée)
 * Région: northamerica-northeast1
 */

const {onRequest} = require("firebase-functions/v2/https");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");
const {VertexAI} = require('@google-cloud/vertexai');

initializeApp();
const db = getFirestore();

const SVA_REGION = 'northamerica-northeast1';

const vertex_ai = new VertexAI({project: process.env.GCLOUD_PROJECT, location: SVA_REGION});
const generativeModel = vertex_ai.getGenerativeModel({ model: 'gemini-1.5-flash-001' });

exports.initiateSvaProject = onRequest({cors: true, region: SVA_REGION}, async (req, res) => {
    console.log(`Requête reçue pour initiateSvaProject dans la région: ${SVA_REGION}`);
    const prompt = req.body.prompt;
    if (!prompt) {
        return res.status(400).send({error: "Le 'prompt' est manquant."});
    }
    try {
        const geminiPrompt = `Analyse la demande créative suivante et génère un plan d'action de base en 5 étapes clés. Formate ta réponse exclusivement en JSON avec une clé "plan" contenant un tableau de chaînes de caractères. Demande: "${prompt}"`;
        const resp = await generativeModel.generateContent(geminiPrompt);
        const content = resp.response.candidates[0].content.parts[0].text;
        const cleanedJsonString = content.replace(/```json/g, '').replace(/```/g, '').trim();
        const planObject = JSON.parse(cleanedJsonString);
        const projetRef = await db.collection('bibliotheque-sva-finales').add({
            nom: prompt,
            planAction: planObject.plan,
            dateCreation: new Date().toISOString(),
            statut: "Initialisé"
        });
        res.status(200).send({ success: true, projectId: projetRef.id, plan: planObject.plan });
    } catch (error) {
        console.error("Erreur critique:", error);
        res.status(500).send({error: "Une erreur interne est survenue."});
    }
});
