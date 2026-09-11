const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');
const controller = require('../controllers/jewelryController');

// Public routes (Visitors can view without login)
router.get('/', controller.getAllJewelry);
router.get('/:id', controller.getJewelryById);

// Admin-protected routes (Requires valid JWT token)
router.post('/', auth, upload.array('files', 5), controller.createJewelry);
router.put('/:id', auth, upload.array('files', 5), controller.updateJewelry);
router.delete('/:id', auth, controller.deleteJewelry);

module.exports = router;
