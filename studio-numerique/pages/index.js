// 🔒 PRIVÉ STATUS: DASHBOARD STUDIO PRINCIPAL
// SYSTÈME NUMÉRIQUE ADMIN - PRIVÉ
// Auteur: Système Vie Augmentée™

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { collection, query, getDocs, limit } from 'firebase/firestore';

function Dashboard({ db, auth, isAdmin }) {
  const [statistics, setStatistics] = useState({
    sbtCount: 0,
    avatarCount: 0,
    connectedUsers: 0,
    activeFunctions: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    if (!db) return;

    const loadDashboardData = async () => {
      try {
        // Load SBT count
        const sbtCollection = collection(db, 'sva-ledger');
        const sbtSnapshot = await getDocs(sbtCollection);

        // Load Avatars
        const avatarCollection = collection(db, 'avatars');
        const avatarSnapshot = await getDocs(avatarCollection);

        // Load Connected Users
        const usersCollection = collection(db, 'connect_live_users');
        const usersSnapshot = await getDocs(usersCollection);

        setStatistics({
          sbtCount: sbtSnapshot.size,
          avatarCount: avatarSnapshot.size,
          connectedUsers: usersSnapshot.size,
          activeFunctions: 25 // Nombre connu de fonctions
        });

        // Load recent activity
        const recentQuery = query(sbtCollection, limit(5));
        const recentDocs = await getDocs(recentQuery);
        const activities = recentDocs.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }));
        setRecentActivity(activities);

      } catch (error) {
        console.error('Erreur chargement dashboard:', error);
      }
    };

    loadDashboardData();
  }, [db]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0b1d, #1e2139)',
      color: 'white',
      padding: '20px'
    }}>
      <Head>
        <title>🔒 SVA Studio - Dashboard PRIVÉ</title>
      </Head>

      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>🔴 SVA STUDIO NUMÉRIQUE <span style={{ color: '#ff1333' }}>PRIVÉ</span></h1>
        <p style={{ color: '#888' }}>Système de gestion avancé avec Kyber ⚠️⚠️⚠️ CONTRÔLE LATENCE</p>
      </header>

      {/* STATISTIQUES GÉNÉRALES */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div className="stat-card">
          <h3>🏷️SBT Tokens</h3>
          <p>{statistics.sbtCount}</p>
        </div>
        <div className="stat-card">
          <h3>👤Avatars</h3>
          <p>{statistics.avatarCount}</p>
        </div>
        <div className="stat-card">
          <h3>🟢Utilisateurs</h3>
          <p>{statistics.connectedUsers}</p>
        </div>
        <div className="stat-card">
          <h3>⚡Fonctions</h3>
          <p>{statistics.activeFunctions}</p>
        </div>
      </div>

      {/* MENUS PRINCIPAUX */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <Link href="/sbt-manager">
          <div className="menu-card">
            <h3>🏷️SBT Manager</h3>
            <p>Gestion des Tokens Soul Bound 🔐 PRIVÉ</p>
          </div>
        </Link>

        <Link href="/avatar-studio">
          <div className="menu-card">
            <h3>👤Avatars & Présence</h3>
            <p>Gestion des avatars et présence des utilisateurs</p>
          </div>
        </Link>

        <Link href="/globe-view">
          <div className="menu-card">
            <h3>🌍Globe 3D</h3>
            <p>Visualisation des parcelles et terrains</p>
          </div>
        </Link>

        <Link href="/xr-modules">
          <div className="menu-card">
            <h3>👀XR Modules</h3>
            <p>Modules d'expérience et XR interactives</p>
          </div>
        </Link>

        <Link href="/admin">
          <div className="menu-card">
            <h3>⚙️Administration</h3>
            <p>Panneau administration système ⚠️ ADMIN</p>
          </div>
        </Link>

        <Link href="/kyber-dashboard">
          <div className="menu-card">
            <h3>📊Kyber Control</h3>
            <p>Contrôle de latence en temps réel ⚠️⚠️⚠️</p>
          </div>
        </Link>
      </div>

      {/* Activités RÉCENTES */}
      {recentActivity.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h2>Activités récentes (ONLY ADMIN)</h2>
          <div className="activity-list">
            {recentActivity.map((item, index) => (
              <div key={index} className="activity-item">
                <strong>{item.id}</strong>
                <p>Type: {item.data.type || 'Inconnu'}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .stat-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          transition: all 0.3s;
        }
        .stat-card:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-5px);
        }
        .menu-card {
          background: linear-gradient(135deg, #1a1c2e, #24273b);
          border-radius: 12px;
          padding: 25px;
          cursor: pointer;
          transition: all 0.3s;
          border: 1px solid transparent;
        }
        .menu-card:hover {
          border-color: #00ff41;
          transform: translateY(-5px);
        }
        .activity-item {
          background: rgba(255, 255, 255, 0.03);
          padding: 15px;
          margin-bottom: 10px;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}

export default Dashboard;