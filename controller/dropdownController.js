const { response } = require("express")
const  AppliedFor = require("../models/applied_for")
const EmployeeType = require("../models/employee_type")
const  Joi =  require("joi")


const dropdownController = {
    async addAppliedFor(req, res, next){
        // data validation
        const newData = Joi.object({
            value: Joi.string().required(),
        })

        const {error} = newData.validate(req.body);
        if(error){
            return next(error);
        }
        // Check for the admin
        if(req.user.role != 'admin'){
            const error = {
                status: 403,
                message: "Unauthorized! Please contact Administrator",
            }
            return next(error);
        }
        
        // sending data to DB
        let response;
        try{

            const appliedFor = new AppliedFor({
                value: req.body.value
            })
            response = await appliedFor.save()
        }
        catch(error){
            return next(error);
        }

        // sending response
        res.status(200).json({result: response})
    },
    async addEmplyeeType(req, res, next){
        // data validation
        const newData = Joi.object({
            value: Joi.string().required(),
        })

        const {error} = newData.validate(req.body);
        if(error){
            return next(error);
        }

        // Check for the admin
        if (req.user.role != 'admin') {
            const error = {
                status: 403,
                message: "Unauthorized! Please contact Administrator",
            }
            return next(error);
        }

        // sending data to DB
        let response;
        try{

            const emplyeeType = new EmployeeType({
                value: req.body.value
            })
            response = await emplyeeType.save()
        }
        catch(error){
            return next(error)
        }

        // sending response
        res.status(200).json({result: response})
    },
    async getAppliedFor(req, res, next){
        let response;
        try{
            response = await AppliedFor.find({})
        }
        catch(error){
            return next(error)
        }
        res.status(200).json({result: response})
    },
    async getEmplyeeType(req, res, next){
        let response;
        try{
            response = await EmployeeType.find({})
        }
        catch(error){
            return next(error)
        }
        res.status(200).json({result: response})
    },
    async deleteAppliedFor(req, res, next){
        // Check for the admin
        if (req.user.role != 'admin') {
            const error = {
                status: 403,
                message: "Unauthorized! Please contact Administrator",
            }
            return next(error);
        }
        
        // Deleting applied for
        let response;
        try{
            response = await AppliedFor.deleteOne({_id: req.params.id})
        }
        catch(error){
            return next(error)
        }
        res.status(200).json({ deletedCount: response.deletedCount })
    },
    
    async deleteEmployeeType(req, res, next){
        // Check for the admin
        if (req.user.role != 'admin') {
            const error = {
                status: 403,
                message: "Unauthorized! Please contact Administrator",
            }
            return next(error);
        }
        // Deleting employee type
        let response;
        try{
            response = await EmployeeType.deleteOne({_id: req.params.id})
        }
        catch(error){
            return next(error)
        }
        res.status(200).json({ deletedCount: response.deletedCount })
    }
    
}

module.exports = dropdownController