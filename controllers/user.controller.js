import { pool } from "../config/db.js";

// Obtener usuario
const getUsers = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM usuarios");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const [result] = await pool.query("INSERT INTO usuarios (nombre, email) VALUES (?, ?)", [name, email]);

        res.json({
            id: result.insertId,
            name,
            email
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export { getUsers, createUser };