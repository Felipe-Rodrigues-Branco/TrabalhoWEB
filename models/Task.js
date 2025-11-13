const pool = require('./db');

class Task {
  static async create({ userId, categoryId, title, description, status, priority, dueDate }) {
    const result = await pool.query(
      'INSERT INTO tasks (user_id, category_id, title, description, status, priority, due_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [userId, categoryId, title, description, status || 'pending', priority || 'medium', dueDate]
    );
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async findByUserId(userId) {
    const result = await pool.query(
      'SELECT t.*, c.name as category_name, c.color as category_color FROM tasks t LEFT JOIN categories c ON t.category_id = c.id WHERE t.user_id = $1 ORDER BY t.created_at DESC',
      [userId]
    );
    return result.rows;
  }

  static async update(id, { categoryId, title, description, status, priority, dueDate }) {
    const result = await pool.query(
      'UPDATE tasks SET category_id = $1, title = $2, description = $3, status = $4, priority = $5, due_date = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *',
      [categoryId, title, description, status, priority, dueDate, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
  }
}

module.exports = Task;
