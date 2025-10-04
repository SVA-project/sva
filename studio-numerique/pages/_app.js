// 🔒 PRIVى STATUS: APPLICATION PRINCIPALE SVA STUDIO
// Auteur: Système Vie Augment���Ⅱ 2025
// STATUS: PRIVÉ - NON PUBLIC

import { useEffect, useState } from 'react';
import '../styles/globals.css';
import Head from 'next/head';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// ⚠⚠⚠ KYBER CONTROL INITIALIZATION
const KyberControl = typeof window !== 'undefined' ? require('../scripts/kyber-latency') : null;

// Firebase Config (PRIVÉ)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: "systeme-vie-augmenter-459400",
  storageBucket: "systeme-vie-augmenter-459400.appspot.com",
  messagingSenderId: "519719189323",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

function MyApp({ Component, pageProps }) {
  const [latencyStatus, setLatencyStatus] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // ≡ Vérification admin PRIVى
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL?;
    if (adminEmail) {
      // Logique auth et contrôle admin
      setIsAdmin(true);
    }

    // ◇ Initialisation Kyber
    if (KyberControl && KyberControl.enabled) {
      setInterval(() => {
        const metrics = KyberControl.getMetrics();
        setLatencyStatus(metrics);
      }, 5000);
    }
  }, []);

  return (
    <>
      <Head>
        <title>🔒 SVA Studio Numérique - PRIVى</title>
        <meta name="description" content="STUDIO PRIVÉ - Système Vie Augmentée" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      {/* ♡♡♡ AFFICHAGE PRIVÉ ♡♡♡ */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(45deg, #000, #111)',
        zIndex: -1
      }} />

      {/* ❠❠♠ STATUS BASE PRIVÉ ❠❠♡ */}
      <div style={{
        position: 'fixed',
        top: 10,
        right: 10,
        background: 'rgba(0, 0, 0, 0.8)',
        color: '#00ff41',
        padding: '10px',
        borderRadius: '8px',
        fontSize: '12px',
        fontFamily: 'monospace',
        zIndex: 1000
      }}>
        🔒 STATUS PRIVÉ<br />
        {isAdmin ? 'ADMIN ON' : 'USER'}<br />
        Kyber: {latencyStatus ? `➠⊢❠ ACTIF - ${latencyStatus.averageLatency}ms` : 'OFF'}
      </div>

      <Component {...pageProps} db={db} auth={auth} isAdmin={isAdmin} />
    </>
  );
}

export default MyApp;