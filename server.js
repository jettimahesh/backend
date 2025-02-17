const express = require('express');

const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON

// ✅ Default Route (Fixes Cannot GET /)
app.get('/', (req, res) => {
    res.send('Hello, Express API is Running!');
});

// Sample Students Data (Temporary Storage)
let students = [];

// ✅ Get All Students
app.get('/students', (req, res) => {
    res.json(students);
});

// ✅ Get Student by ID
app.get('/students/:id', (req, res) => {
    const student = students.find(s => s.id === req.params.id);
    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
});

// ✅ Add New Student
app.post('/students', (req, res) => {
    const newStudent = req.body;
    students.push(newStudent);
    res.status(201).json(newStudent);
});

// ✅ Update Student by ID
app.put('/students/:id', (req, res) => {
    const index = students.findIndex(s => s.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ message: 'Student not found' });
    }
    students[index] = { ...students[index], ...req.body };
    res.json(students[index]);
});

// ✅ Delete Student by ID
app.delete('/students/:id', (req, res) => {
    students = students.filter(s => s.id !== req.params.id);
    res.json({ message: 'Student deleted successfully' });
});

// ✅ Start Server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
