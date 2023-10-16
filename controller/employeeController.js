const Joi = require("joi");
const employeeDTO = require('../dto/employee')
const employee = require("../models/employee");
const User = require("../models/user");
const UserDTO = require("../dto/user");

const employeeController = {
    async createEntry(req, res, next) {
        // Checking for Admin || HR
        if (!(req.user.role != 'admin' || req.user.role != 'HR')) {
            const error = {
                status: 403,
                message: "Unauthorize to create any employee's data!",
            }
            return next(error);
        }
        
        const { applied_for, name, email, phone_no, cnic, type, gender, status, remarks, city, applied_date } = req.body;
        if(remarks.split([' ']) < 0){
            console.log(remarks)
        }
        
        // Validating the req data using Joi
        const employeeData = Joi.object({
            applied_for: Joi.string().required(),
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            gender: Joi.string().required(),
            phone_no: Joi.number().min(11).required(),
            cnic: Joi.number().min(14).required(),
            type: Joi.string().required(),
            status: Joi.string().required(),
            remarks: Joi.string(),
            city: Joi.string().required(),
            applied_date: Joi.date().required(),
        })
        
        const { error } = employeeData.validate(req.body);
        if (error) {
            return next(error);
        }

        // Stroing data in DB
        try {

            const employeeModel = new employee({
                applied_for,
                name,
                email,
                phone: phone_no,
                cnic,
                type,
                gender,
                status,
                applied_date,
                city,
                remarks,
                created_by: req.user._id
            });
            const employeeRes = await employeeModel.save();

            return res.status(200).json({ employee: employeeRes });
        }
        catch (erro) {
            return next(error)
        }

    },
    async deleteEntry(req, res, next){
        // Checking for Admin 
        if (req.user.role != 'admin') {
            const error = {
                status: 403,
                message: "Unauthorize to delete any employee's data!",
            }
            return next(error);
        }
        
        const entryId = req.params.id;
        let response;
        try{
            response = await employee.deleteOne({_id: entryId});
        }
        catch(error){
            return next(error);
        }
        return res.status(200).json({deleteCount: response.deletedCount});
    },
    async deleteManyEntry(req, res, next){
        // Checking for Admin 
        if (req.user.role != 'admin') {
            const error = {
                status: 403,
                message: "Unauthorize to delete any employee's data!",
            }
            return next(error);
        }
        
        const entryIds = req.body;
        console.log(req.body)
        let response;
        try{
            // Ensure entryIds is an array
            if (!Array.isArray(entryIds)) {
                const error = {
                    status: 400,
                    message: 'Invalid input: IDs should be provided as an array.',
                };
                return next(error);
            }
            response = await employee.deleteMany({ _id: { $in: entryIds } });

        }
        catch(error){
            return next(error);
        }
        return res.status(200).json({ result: response });
    },
    async updateEntry(req, res, next) {
        // Validating the req data using Joi
        const employeeData = Joi.object({
            applied_for: Joi.string(),
            name: Joi.string(),
            email: Joi.string().email(),
            phone_no: Joi.number().min(11),
            cnic: Joi.number().min(14),
            gender: Joi.string(),
            type: Joi.string(),
            status: Joi.string(),
            remarks: Joi.string(),
            city: Joi.string(),
            applied_date: Joi.date(),
        })
        const { error } = employeeData.validate(req.body)

        if (error) {
            return next(error);
        }

        // 1. update user
        const id = req.params.id;

        const { applied_for, name, email, phone_no, cnic, gender, type, status, remarks, city, applied_date } = req.body;

        // Checing for Admin to update it
        const userInfo = await User.findOne({ _id: req.user._id })

        
        if (userInfo.role !== 'admin') {
            const error = {
                status: 403,
                message: "Contact Administrator to Edit this user!",
            }
            return next(error);
        }

        let response;

        try {
            response = await employee.updateOne(
                {
                    _id: id
                },
                {
                    applied_for,
                    name,
                    email,
                    phone: phone_no,
                    cnic,
                    gender,
                    type,
                    status,
                    remarks,
                    city,
                    applied_date
                });
        }
        catch (error) {
            return next(error);
        }
        // 2. response
        res.status(200).json({ modifiedCount: response.modifiedCount })

    },
    async getEntries(req, res, next){
        
        
        let response;
        try{
            response = await employee.find({});
        }
        catch(error){
            return next(error)
        }
        
            
        res.status(200).json({ result: response })    
    },
    async getEmployee(req, res, next){
        if (req.user.role === 'employee') {
            const error = {
                status: 403,
                message: "Unauthorized! Please contact Administrator",
            }
            return next(error)
        }
        
        let response;
        try{
            response = await employee.findOne({_id: req.params.id});
        }
        catch(error){
            return next(error)
        }
        response = employeeDTO(response);
        res.status(200).json({result: response})
    }

}
module.exports = employeeController