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

export { getUsers };