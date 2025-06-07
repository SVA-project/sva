/**
 * Moteur Intelligent du Système de Vie Augmentée (SVA)
 * Fonction: initiateSvaProject
 * Auteur: Zelia/Kyra pour Daniel Cyr
 * Version: 1.1 (Genesis Corrigé)
 */

const {onRequest} = require("firebase-functions/v2/https");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");
const {VertexAI} = require('@google-cloud/vertexai');

initializeApp();
const firestore = getFirestore();

const vertex_ai = new VertexAI({project: process.env.GCLOUD_PROJECT, location: 'us-central1'});
const generativeModel = vertex_ai.getGenerativeModel({
  model: 'gemini-1.5-flash-001',
});

exports.initiateSvaProject = onRequest(async (req, res) => {
  console.log("Requête reçue pour initiateSvaProject.");

  res.set('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
    return;
  }
  
  const prompt = req.body.prompt;
  if (!prompt) {
    console.error("Erreur: Aucun prompt n'a été fourni.");
    res.status(400).send({error: "Le 'prompt' est manquant."});
    return;
  }

  console.log(`Prompt reçu: "${prompt}"`);

  try {
    console.log("Génération du plan d'action avec Gemini...");
    const geminiPrompt = `Analyse la demande créative suivante et génère un plan d'action de base en 5 étapes clés. Formate ta réponse exclusivement en JSON avec une clé "plan" contenant un tableau de chaînes de caractères. Demande: "${prompt}"`;
    
    const resp = await generativeModel.generateContent(geminiPrompt);
    const content = resp.response.candidates[0].content.parts[0].text;
    
    const cleanedJsonString = content.replace(/```json/g, '').replace(/```/g, '').trim();
    const planObject = JSON.parse(cleanedJsonString);
    const planAction = planObject.plan;

    console.log("Plan d'action généré:", planAction);

    const projetRef = await firestore.collection('projects').add({
      nom: prompt,
      planAction: planAction,
      dateCreation: new Date().toISOString(),
      statut: "Initialisé"
    });

    console.log(`Projet sauvegardé avec l'ID: ${projetRef.id}`);

    res.status(200).send({
      success: true,
      projectId: projetRef.id,
      message: "Projet SVA initialisé avec succès.",
      plan: planAction
    });

  } catch (error) {
    console.error("Erreur critique durant le traitement du projet SVA:", error);
    res.status(500).send({error: "Une erreur interne est survenue."});
  }
});
