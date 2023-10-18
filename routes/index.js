const express = require('express');
const authController = require('../controller/authController');
const employeeController = require('../controller/employeeController');
const dropdownController = require('../controller/dropdownController');
const auth = require('../middlewares/auth');
const templateController = require('../controller/templateController');


const router = express.Router();

// user

// register
router.post('/register', authController.register);
router.get('/', (req, res)=>{
    console.log('hello')
    res.status(200).json({message  : "Hello Backend :)"})
});

// login
router.post('/login', authController.login);

//delete user
router.delete('/delete/:id/:userId', authController.deleteUser);

// update user
router.put('/update/:id/:userId', authController.updateUser);

// see users
router.get('/users',auth,  authController.getUsers);
// Get User by ID
router.get('/user/:id', authController.getUser);

// logout
router.post('/logout', auth, authController.logout)
// Upload Images
router.post('/upload', auth, authController.uploadImage);
// Delete Images
router.delete('/delete-avatar', auth, authController.deleteImage);

router.get('/get-avatar/:id', authController.sendAvatar);

// refresh
router.get('/refresh', authController.refresh);


// employees Data Entry Routes
// Create employees' entry
router.post('/create-entry', auth, employeeController.createEntry)
// delete:id
router.delete('/delete-entry/:id', auth, employeeController.deleteEntry)
// delete-all:id
router.delete('/delete-all', auth, employeeController.deleteManyEntry)
// update:id
router.put('/update-entry/:id', auth, employeeController.updateEntry)
// read
router.get('/entries', auth, employeeController.getEntries)
// read:id
router.get('/employee/:id', auth, employeeController.getEmployee) 

/////////////////////// templete ////////////////////
router.get('/templates', auth, templateController.getTemplate)

router.post('/create-template', auth, templateController.addTemplate)

router.delete('/delete-template/:id', auth, templateController.deleteTemplate)

router.put('/template/:id', auth, templateController.updateTemplate)

////////////////// Drop down Endpoints ////////////////
// Add dropdown (Applies for) element
router.post('/add-applied-for', auth, dropdownController.addAppliedFor)
// Add dropdown (Employee Types) element
router.post('/add-employee-type', auth, dropdownController.addEmplyeeType)
// get all dropdown element
router.get('/applied-for', auth, dropdownController.getAppliedFor)
router.get('/employee-type', auth, dropdownController.getEmplyeeType)
// Delete Dropdown element by ID
router.delete('/delete-employee-type/:id', auth, dropdownController.deleteEmployeeType)
router.delete('/delete-applied-for/:id', auth, dropdownController.deleteAppliedFor)

module.exports = router;