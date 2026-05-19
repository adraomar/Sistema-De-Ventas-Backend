import { pool } from "../config/db.js";

// Obtener productos
const getProducts = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM products");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error("Error al obtener productos: ", error);
    }
}

const getProduct = async (req, res) => {
    try {
        const id = req.user.id;

        if (isNaN(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const prodId = parseInt(id, 10);

        const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [prodId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
};

const createProduct = async (req, res) => {
    try {
        const { name, price, stock } = req.body;

        if (!name || price === undefined || stock === undefined) {
            return res.status(400).json({
                error: "Todos los campos son obligatorios"
            });
        }

        const [result] = await pool.query(
            `INSERT INTO products
            (name, price, stock) 
            VALUES (?, ?, ?)`,
            [name, price, stock]
        );

        res.status(201).json({
            message: "Producto creado correctamente",
            id: result.insertId
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Editar producto
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, stock } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        let query = `
            UPDATE products
            SET name = ?, price = ?, stock = ?
        `;

        let values = [name, price, stock];

        query += ` WHERE id = ?`;
        values.push(id);

        await pool.query(query, values);

        res.json({
            message: "Producto actualizado correctamente"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar producto
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        await pool.query(
            "DELETE FROM products WHERE id = ?",
            [id]
        );

        res.json({
            message: "Producto eliminado correctamente"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export { getProducts, getProduct, createProduct, updateProduct, deleteProduct };