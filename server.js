const express = require('express');

const app = express();
const port = process.env.PORT || 3000; // Use Vercel's port

app.use(express.json());

// ✅ Default Route
app.get('/', (req, res) => {
  res.send('Welcome to the Student API - Deployed on Vercel');
});

// Sample data
let students = [
  {
    "id": "1",
    "name": "John Doe",
    "gender": "male",
    "mobile": "1234567890",
    "email": "john@example.com",
    "batch": "2025",
    "address": {
      "city": "Hyderabad",
      "mandal": "Ameerpet",
      "district": "Ranga Reddy",
      "state": "Telangana",
      "pincode": "500038"
    },
    "education": [
      {
        "qualification": "B.Tech",
        "year": 2024,
        "percentage": 75.5
      }
    ],
    "company": {
      "name": "Google",
      "location": "Bangalore",
      "package": "10 LPA",
      "offerDate": "2025-01-01"
    },
    "sourceType": "Direct",
    "sourceFrom": "Website",
    "referralName": ""
  }
];

// ✅ CRUD Routes
app.get('/students', (req, res) => res.json(students));
app.get('/students/:id', (req, res) => {
  const student = students.find(s => s.id === req.params.id);
  student ? res.json(student) : res.status(404).json({ message: 'Student not found' });
});
app.post('/students', (req, res) => {
  const newStudent = req.body;
  newStudent.id = (students.length + 1).toString();
  students.push(newStudent);
  res.status(201).json(newStudent);
});
app.put('/students/:id', (req, res) => {
  const student = students.find(s => s.id === req.params.id);
  if (student) {
    Object.assign(student, req.body);
    res.json(student);
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});
app.delete('/students/:id', (req, res) => {
  students = students.filter(s => s.id !== req.params.id);
  res.json({ message: 'Student deleted successfully' });
});

// ✅ Export for Vercel
module.exports = app;
