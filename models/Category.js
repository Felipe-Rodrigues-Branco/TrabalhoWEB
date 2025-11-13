const pool = require('./db');

class Category {
  static async create({ userId, name, color }) {
    const result = await pool.query(
      'INSERT INTO categories (user_id, name, color) VALUES ($1, $2, $3) RETURNING *',
      [userId, name, color || '#3498db']
    );
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async findByUserId(userId) {
    const result = await pool.query(
      'SELECT * FROM categories WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return result.rows;
  }

  static async update(id, { name, color }) {
    const result = await pool.query(
      'UPDATE categories SET name = $1, color = $2 WHERE id = $3 RETURNING *',
      [name, color, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    await pool.query('DELETE FROM categories WHERE id = $1', [id]);
  }
}

module.exports = Category;
