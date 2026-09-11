const Jewelry = require('../models/Jewelry');
const cloudinary = require('../config/cloudinary');

// CREATE
exports.createJewelry = async (req, res) => {
  try {
    const { name, description, category, price, material, specifications, tags } = req.body;
    
    const images = req.files?.map((file, idx) => ({
      angle: req.body[`angle_${idx}`] || 'front',
      url: file.path,
      publicId: file.filename
    })) || [];

    let parsedSpecs = {};
    if (typeof specifications === 'string') {
      try {
        parsedSpecs = JSON.parse(specifications);
      } catch (e) {
        parsedSpecs = {};
      }
    } else if (typeof specifications === 'object' && specifications !== null) {
      parsedSpecs = specifications;
    }

    let parsedTags = [];
    if (typeof tags === 'string') {
      parsedTags = tags.split(',').map(t => t.trim()).filter(Boolean);
    } else if (Array.isArray(tags)) {
      parsedTags = tags;
    }

    const jewelry = await Jewelry.create({
      name,
      description,
      category,
      price: Number(price),
      material,
      images,
      specifications: parsedSpecs,
      tags: parsedTags
    });

    res.status(201).json({ success: true, data: jewelry });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// READ ALL
exports.getAllJewelry = async (req, res) => {
  try {
    const { category, material, minPrice, maxPrice, search, page = 1, limit = 12 } = req.query;
    
    let filter = {};
    if (category) filter.category = category;
    if (material) filter.material = material;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (search) filter.$text = { $search: search };

    const skip = (Number(page) - 1) * Number(limit);
    const jewelry = await Jewelry.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Jewelry.countDocuments(filter);

    res.json({
      success: true,
      data: jewelry,
      pagination: { total, page: Number(page), pages: Math.ceil(total / Number(limit)) }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// READ ONE
exports.getJewelryById = async (req, res) => {
  try {
    const jewelry = await Jewelry.findById(req.params.id);
    if (!jewelry) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: jewelry });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// UPDATE
exports.updateJewelry = async (req, res) => {
  try {
    const jewelry = await Jewelry.findById(req.params.id);
    if (!jewelry) return res.status(404).json({ success: false, error: 'Jewelry item not found' });
    
    if (req.files?.length > 0) {
      for (let img of jewelry.images) {
        if (img.publicId) {
          try {
            await cloudinary.uploader.destroy(img.publicId);
          } catch (err) {
            console.error('Cloudinary destroy error:', err.message);
          }
        }
      }
      req.body.images = req.files.map((file, idx) => ({
        angle: req.body[`angle_${idx}`] || 'front',
        url: file.path,
        publicId: file.filename
      }));
    }

    if (typeof req.body.specifications === 'string') {
      try {
        req.body.specifications = JSON.parse(req.body.specifications);
      } catch (e) {}
    }

    if (typeof req.body.tags === 'string') {
      req.body.tags = req.body.tags.split(',').map(t => t.trim()).filter(Boolean);
    }

    req.body.updatedAt = new Date();
    const updated = await Jewelry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// DELETE
exports.deleteJewelry = async (req, res) => {
  try {
    const jewelry = await Jewelry.findById(req.params.id);
    if (!jewelry) return res.status(404).json({ success: false, error: 'Jewelry item not found' });

    for (let img of jewelry.images) {
      if (img.publicId) {
        try {
          await cloudinary.uploader.destroy(img.publicId);
        } catch (err) {
          console.error('Cloudinary destroy error:', err.message);
        }
      }
    }
    await Jewelry.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
