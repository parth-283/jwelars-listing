const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const expectedUsername = process.env.ADMIN_USERNAME || 'admin';
    const expectedPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (username === expectedUsername && password === expectedPassword) {
      const secret = process.env.JWT_SECRET || 'jwelars_super_secret_jwt_key_2026';
      const token = jwt.sign(
        { username, role: 'admin' },
        secret,
        { expiresIn: '24h' }
      );

      return res.json({
        success: true,
        token,
        user: { username, role: 'admin' }
      });
    } else {
      return res.status(401).json({
        success: false,
        error: 'Invalid admin username or password.'
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
