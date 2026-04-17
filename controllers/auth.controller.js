import { pool } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER
const register = async (req, res) => {
    try {
        const { username, password, email, lastname, firstname } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        console.log(req.body);

        const [result] = await pool.query(
            "INSERT INTO users (username, password, email, lastname, firstname) VALUES (?, ?, ?, ?, ?)", [username, hashedPassword, email, lastname, firstname]
        );

        res.json({ message: "Usuario creado correctamente " });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const [rows] = await pool.query(
            "SELECT * FROM users WHERE username = ?", [username]
        );

        const user = rows[0];

        if (!user) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });

    } catch (error) {
        console.error(error.response?.data);
        console.log(error.response?.data?.message || "Error en login");
        res.status(500).json({ error: error.message });
    }
};

export { register, login };