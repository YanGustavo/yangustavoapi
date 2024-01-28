const express = require('express');
const Contact = require('../../../models/app_models/portifolio/Contact');
const router = express.Router();

// Post Method
router.post('/add', async (req, res) => {
    try {
        const extractData = req.body;

        const saveData = await Contact.create(extractData);
        if (saveData) {
            res.status(200).json("Data saved successfully");
        } else {
            res.status  (400).json("Something goes wrong! Please try again");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all Method
router.get('/getAll', async (req, res) => {
    try {
        const data = await Contact.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get by ID Method
router.get('/:id', async (req, res) => {
    try {
        const data = await Contact.findById(req.params.id);
        if (data) {
            res.json(data);
        } else {
            res.status(404).json("Data not found");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Contact.findByIdAndUpdate(id, updatedData, options);

        if (result) {
            res.json(result);
        } else {
            res.status(404).json("Data not found");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Contact.findByIdAndDelete(id);

        if (data) {
            res.json(`Document with ID ${id} has been deleted.`);
        } else {
            res.status(404).json("Data not found");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
