import { pool } from "../config/db.js";

// Obtener usuario
const getUsers = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM users");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getUser = async (req, res) => {
    try {
        const id = req.user.id;

        if (isNaN(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const userId = parseInt(id, 10);

        const [rows] = await pool.query("SELECT id, username, email, lastname, firstname FROM users WHERE id = ?", [userId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
};

export { getUsers, getUser };