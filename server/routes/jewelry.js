const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const controller = require('../controllers/jewelryController');

router.post('/', upload.array('files', 5), controller.createJewelry);
router.get('/', controller.getAllJewelry);
router.get('/:id', controller.getJewelryById);
router.put('/:id', upload.array('files', 5), controller.updateJewelry);
router.delete('/:id', controller.deleteJewelry);

module.exports = router;
