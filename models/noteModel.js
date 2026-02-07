const pool = require("../config/db");

const createNote = async (title, content) => {
  const result = await pool.query(
    "INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *",
    [title, content]
  );
  return result.rows[0];
};

const getAllNotes = async () => {
  const result = await pool.query(
    "SELECT * FROM notes ORDER BY id DESC"
  );
  return result.rows;
};

const updateNote = async (id, title, content) => {
  const result = await pool.query(
    "UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *",
    [title, content, id]
  );
  return result.rows[0];
};

const deleteNote = async (id) => {
  await pool.query("DELETE FROM notes WHERE id = $1", [id]);
};

module.exports = {
  createNote,
  getAllNotes,
  updateNote,
  deleteNote,
};
