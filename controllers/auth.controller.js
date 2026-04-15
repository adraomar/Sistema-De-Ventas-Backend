import { pool } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            "INSERT INTO usuarios (name, email, password) VALUES (?, ?, ?)", [name, email, password]
        );

        res.json({ message: "Usuario creado correctamente "});
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [rows] = await pool.query(
            "SELECT * FROM usuarios WHERE email = ?", [email]
        );

        if(rows.lenght === 0) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        const user = rows[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export { register, login };