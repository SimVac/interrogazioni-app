const db = require('./db');
const helper = require('./helper');

async function getMaterie(){
  const rows = await db.query(
    "SELECT * FROM materia"
  );
  const data = helper.emptyOrRows(rows);

  return data
}

async function getMateria(endpoint){
  const rows = await db.query(
    "SELECT * FROM materia WHERE endpoint=?",
    [endpoint]
  );
  const data = helper.emptyOrRows(rows);

  return data
}

async function getElencoMateria(endpoint){
  const rows = await db.query(
    "SELECT s.id, s.nome, s.cognome, i.interrogato, i.offerto " + 
    "FROM e_interrogato i " +
    "INNER JOIN studente s ON i.id_studente = s.id " +
    "INNER JOIN materia m ON m.endpoint = ? " +
    "WHERE i.id_materia = m.id " +
    "ORDER BY i.posizione;",
    [endpoint]
  );
  const data = helper.emptyOrRows(rows);

  return data
}

async function updateOrdine(studente, materia){
  if (!studente || !materia) return;
  await db.query(
    "UPDATE e_interrogato " +
    "SET posizione=?, interrogato=?, offerto=? " +
    "WHERE id_studente=? AND id_materia=?",
    [studente.posizione, studente.interrogato, studente.offerto, studente.id, materia.id]
  )
}

async function updateMateria(materia){
  if (!materia) return;
  await db.query(
    "UPDATE materia SET attivo=? WHERE id=?",
    [materia.attivo, materia.id]
  )
}

module.exports = {
  getMaterie,
  getElencoMateria,
  getMateria,
  updateOrdine,
  updateMateria
}