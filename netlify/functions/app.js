// netlify/functions/app.js
const express = require('express');
const authController = require('../../controller/authController');
const employeeController = require('../../controller/employeeController');
const dropdownController = require('../../controller/dropdownController');
const auth = require('../../middlewares/auth');
const templateController = require('../../controller/templateController');

const app = express();

// Middleware
app.use(express.json());

// Routes
// user

// register
app.post('/register', authController.register);
app.get('/', (req, res) => {
    res.status(200).json({ message: "Hello Backend :)" })
});

// login
app.post('/login', authController.login);

// ... (add the rest of your routes here)

// employees Data Entry Routes
// Create employees' entry
app.post('/create-entry', auth, employeeController.createEntry);
// delete:id
app.delete('/delete-entry/:id', auth, employeeController.deleteEntry);
// delete-all:id
app.delete('/delete-all', auth, employeeController.deleteManyEntry);
// update:id
app.put('/update-entry/:id', auth, employeeController.updateEntry);
// read
app.get('/entries', auth, employeeController.getEntries);
// read:id
app.get('/employee/:id', auth, employeeController.getEmployee);

/////////////////////// template ////////////////////
app.get('/templates', auth, templateController.getTemplate);
app.post('/create-template', auth, templateController.addTemplate);
app.delete('/delete-template/:id', auth, templateController.deleteTemplate);
app.put('/template/:id', auth, templateController.updateTemplate);

////////////////// Drop down Endpoints ////////////////
// Add dropdown (Applies for) element
app.post('/add-applied-for', auth, dropdownController.addAppliedFor);
// Add dropdown (Employee Types) element
app.post('/add-employee-type', auth, dropdownController.addEmplyeeType);
// get all dropdown element
app.get('/applied-for', auth, dropdownController.getAppliedFor);
app.get('/employee-type', auth, dropdownController.getEmplyeeType);
// Delete Dropdown element by ID
app.delete('/delete-employee-type/:id', auth, dropdownController.deleteEmployeeType);
app.delete('/delete-applied-for/:id', auth, dropdownController.deleteAppliedFor);

// Export the Express app
exports.handler = async (event, context) => {
    return app(event, context);
};
