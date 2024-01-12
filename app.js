const express = require('express');
const app = express();
app.use(express.json());

// POST endpoint to calculate age from a given birthday in DD-MM-YYYY format
app.post('/birthday', (req, res) => {
    const { name, date } = req.body;

    // Validate the input data: both name and date are required
    if (!name || !date) {
        return res.status(400).send({ error: "Name and date are required." });
    }

    // Ensure the date is in DD-MM-YYYY format
    const regex = /^\d{2}-\d{2}-\d{4}$/;
    if (!regex.test(date)) {
        return res.status(400).send({ error: "Invalid date format. Use DD-MM-YYYY." });
    }

    // Convert the date string to a Date object
    const [day, month, year] = date.split('-').map(part => parseInt(part, 10));
    const birthDate = new Date(year, month - 1, day); // Month in JavaScript Date object is 0-indexed

    // Check if the birth date is valid and not in the future
    const currentDate = new Date();
    if (isNaN(birthDate.getTime()) || birthDate > currentDate) {
        return res.status(400).send({ error: "Invalid date. Date must not be in the future." });
    }

    // Calculate age
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
        age--;
    }

    // Send response with the calculated age
    res.send({ data: `${name} is ${age} years old` });
});

// Start the server on the specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
