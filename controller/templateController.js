const { response } = require("express")

const Template = require("../models/template")
const Joi = require("joi")


const templateController = {
    async addTemplate(req, res, next) {
        // data validation

        const newData = Joi.object({
            value: Joi.string().required(),
            description: Joi.string().required(),

        })

        const { error } = newData.validate(req.body);
        if (error) {
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
        try {
            const template = new Template({
                value: req.body.value,
                description: req.body.description
            })
            response = await template.save()
            console.log(template)
            console.log(response)
        }
        catch (error) {
            return next(error);
        }

        // sending response
        res.status(200).json({ result: response })
    },
    async getTemplate(req, res, next) {
        let response;
        try {
            response = await Template.find({})
        }
        catch (error) {
            return next(error)
        }
        res.status(200).json({ result: response })
    },

    async deleteTemplate(req, res, next) {
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
        try {
            response = await Template.deleteOne({ _id: req.params.id })
        }
        catch (error) {
            return next(error)
        }
        res.status(200).json({ deletedCount: response.deletedCount })
    },
    async updateTemplate(req, res, next) {
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
        try {


            response = await Template.updateOne(
                { _id: req.params.id}
                ,
                req.body
            )
            console.log(response)
        }
        catch (error) {

            return next(error)
        }
        res.status(200).json({ result: response })

    }


}

module.exports = templateController