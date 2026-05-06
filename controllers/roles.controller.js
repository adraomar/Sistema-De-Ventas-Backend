import { pool } from "../config/db.js";

// Obtener roles
const getRoles = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM roles");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error("Error al obtener roles: ", error);
    }
}

export { getRoles };
