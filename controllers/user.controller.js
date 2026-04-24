import { pool } from "../config/db.js";
import bcrypt from "bcryptjs";

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

const createUser = async(req, res) => {
    try {
        const { username, password, email, lastname, firstname } = req.body;

        if (!username || !password || !email || !lastname || !firstname) {
            return res.status(400).json({
                error: "Todos los campos son obligatorios"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            `INSERT INTO users 
            (username, password, email, lastname, firstname) 
            VALUES (?, ?, ?, ?, ?)`,
            [username, hashedPassword, email, lastname, firstname]
        );

        res.status(201).json({ 
            message: "Usuario creado correctamente",
            id: result.insertId
        });

    } catch(error) {
        res.status(500).json({ error: error.message });
    }
}

// Editar usuario
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password, email, lastname, firstname } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        let query = `
            UPDATE users 
            SET username = ?, email = ?, lastname = ?, firstname = ?
        `;

        let values = [username, email, lastname, firstname];

        // Si envían nueva contraseña, actualizarla
        if (password && password.trim() !== "") {
            const hashedPassword = await bcrypt.hash(password, 10);
            query += `, password = ?`;
            values.push(hashedPassword);
        }

        query += ` WHERE id = ?`;
        values.push(id);

        await pool.query(query, values);

        res.json({
            message: "Usuario actualizado correctamente"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar usuario
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        await pool.query(
            "DELETE FROM users WHERE id = ?",
            [id]
        );

        res.json({
            message: "Usuario eliminado correctamente"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export { getUsers, getUser, createUser, updateUser, deleteUser };