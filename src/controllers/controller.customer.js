import Customer from "../models/model.customer.js";
import CustomError from "../utils/util.customError.js";
import { updateDatabaseObject } from "../utils/util.database.js";

export const createCustomer = async (req, res, next) => {

    const { mobile_number  } = req.body;

    try {

        const existCustomer = await Customer.findOne({where:{mobile_number:mobile_number}})

        if( existCustomer){
            return next(new CustomError("User already exist with this phone number.",400));
        }

        const customer = await Customer.create(req.body);
        customer.customer_id = customer.id+Date.now().toString();
        await customer.save();
        
        return res.status(201).json({
            success: true,
            message: "Customer created successfully.",
            data: customer
        });

    } catch (error) {

        console.log("Error: ", error);
        return next(new CustomError("Customer is not created. Please try again.", 500));
        
    }
};

export const getAllCustomer = async (req, res, next) => {
    try {
        const allCustomers = await Customer.findAll();
        return res.status(200).json({
            success: true,
            message: "Fetched all customers successfully.",
            data: allCustomers
        });
    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Cannot fetch all customers.", 500));
    }
};

export const getParticularCustomerByCustomerId = async (req, res, next) => {

    const { customer_id } = req.params;
    try {
        const customer = await Customer.findOne({where:{customer_id}});
        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "No customer found."
            });
        }
        return res.status(200).json({
            success: true,
            message: "Fetched customer successfully.",
            data: customer
        });
    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Cannot fetch customer.", 500));
    }
};


export const updateCustomerById = async (req, res, next) => {

    const { customer_id } = req.params;

    try {
        const customer = await Customer.findByPk(customer_id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "No customer found for this ID."
            });
        }

        const updatedCustomer = updateDatabaseObject(req.body, customer);
        await updatedCustomer.save();

        return res.status(200).json({
            success: true,
            message: "Customer updated successfully.",
            data: updatedCustomer
        });
    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Cannot update customer.", 500));
    }
};


export const deleteCustomerById = async (req, res, next) => {
    const { customer_id } = req.params;
    try {
        const customer = await Customer.findByPk(customer_id);
        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "No customer found for this ID."
            });
        }
        await customer.destroy();
        return res.status(200).json({
            success: true,
            message: "Customer deleted successfully."
        });
    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Cannot delete customer.", 500));
    }
};
