// cloudinaryService.js
const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const cloudinaryConfig = require('../../cloudinaryConfig');

const router = express.Router();

cloudinary.config(cloudinaryConfig);

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('imagem'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.buffer, {
      folder: 'nome-da-empresa', // Substitua pelo slug ou ID da empresa
    });

    res.json({ url: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fazer o upload da imagem' });
  }
});

module.exports = router;
