const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample data (Initially a single student entry)
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

// CREATE: Add a new student
app.post('/students', (req, res) => {
  const newStudent = req.body;
  newStudent.id = (students.length + 1).toString(); // Assign a new ID
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// READ: Get all students
app.get('/students', (req, res) => {
  res.status(200).json(students);
});

// READ: Get a single student by ID
app.get('/students/:id', (req, res) => {
  const student = students.find(s => s.id === req.params.id);
  if (student) {
    res.status(200).json(student);
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

// UPDATE: Update a student's details by ID
app.put('/students/:id', (req, res) => {
  const student = students.find(s => s.id === req.params.id);
  if (student) {
    Object.assign(student, req.body); // Update the student with new data
    res.status(200).json(student);
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

// DELETE: Delete a student by ID
app.delete('/students/:id', (req, res) => {
  const studentIndex = students.findIndex(s => s.id === req.params.id);
  if (studentIndex !== -1) {
    students.splice(studentIndex, 1); // Remove the student from the array
    res.status(200).json({ message: 'Student deleted successfully' });
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
