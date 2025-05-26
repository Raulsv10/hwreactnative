// src/sessions/sessionDB.js
import * as SQLite from "expo-sqlite";

let db;

/**
 * Inicializa la base de datos y crea la tabla de sesión si no existe.
 */
export const initSessionDB = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync("session.db");
  }
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS session (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uid TEXT NOT NULL,
      email TEXT NOT NULL
    );
  `);
};

/**
 * Guarda la sesión del usuario en la base de datos.
 * @param {string} uid - ID del usuario.
 * @param {string} email - Correo electrónico del usuario.
 */
export const saveSession = async (uid, email) => {
  if (!db) {
    db = await SQLite.openDatabaseAsync("session.db");
  }
  await db.execAsync("DELETE FROM session;");
  await db.runAsync(
    "INSERT INTO session (uid, email) VALUES (?, ?);",
    uid,
    email
  );
};

/**
 * Obtiene la sesión almacenada en la base de datos.
 * @returns {Promise<{uid: string, email: string} | null>} - Objeto con los datos de la sesión o null si no existe.
 */
export const getSession = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync("session.db");
  }
  const row = await db.getFirstAsync("SELECT uid, email FROM session LIMIT 1;");
  return row || null;
};

/**
 * Elimina la sesión almacenada en la base de datos.
 */
export const clearSession = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync("session.db");
  }
  await db.execAsync("DELETE FROM session;");
};
