import Customer from '../models/model.customer.js';
import Property from '../models/model.property.js';
import Ward from '../models/model.ward.js';
import PropertyType from '../models/model.propertyType.js';
import PropertySubType from '../models/model.propertySubType.js';
import Varification from "../models/model.varification.js";
import CustomError from "../utils/util.customError.js";
import { updateDatabaseObject } from "../utils/util.database.js";
import { generateToken } from "../utils/utis.jwt.js";
import csv  from 'csv-parser';
import fs from 'fs';
import { customerCreationValidation } from '../middlewares/validationMiddleware/validationMiddleware.customer.js';
import { propertyCreationValidation } from '../middlewares/validationMiddleware/validationMiddleware.property.js';


export const createCustomerWithProperty = async (req, res, next) => {

    const {   property ,customer } = req.body;

    const { ward_no , property_type, property_sub_type} = property;

    try {

        const { mobile_number } = customer;

        if ( mobile_number.toString().length != 10 ){
            return next(new CustomError("phone number should be 10 digit.",400));
        }

        const existCustomer = await Customer.findOne({where:{mobile_number:mobile_number}})

        if( existCustomer){
            return next(new CustomError("User already exist with this phone number.",400));
        }

        const customerData = await Customer.create(customer);

        customerData.consumer_id = customerData.id+Date.now().toString();

        await customerData.save();

        const wardData = await Ward.findOne({where:{ward_no}});

        const propertyTypeData = await PropertyType.findOne({where:{property_type_name}});

        const propertySubTypeData = await PropertySubType.findOne({where:{property_sub_type_name}});


        const propertyData = await Property.create({...req.body,wardId:wardData.id,propertyId:propertyTypeData.id,propertySubTypeId:propertySubTypeData.id});
        
        

        return res.status(201).json({
            success: true,
            message: "Customer created successfully with property.",
            // data: customerData
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






export const getParticularCustomerByConsumer_id = async (req, res, next) => {
    const { consumer_id } = req.params;

    console.log("The consumer ID is:", consumer_id);

    try {
        const customer = await Customer.findOne({
            where: { consumer_id },
            include: [
                {
                    model: Property,
                    include: [
                        {
                            model: Ward,
                            attributes: ['ward_no'] 
                        },
                        {
                            model: PropertyType,
                            attributes: ['type_name'] 
                        },
                        {
                            model: PropertySubType,
                            attributes: ['sub_type_name'] 
                        }
                    ]
                }
            ]
        });

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
        console.log("Error:", error);
        return next(new CustomError("Cannot fetch customer.", 500));
    }
};

export const getParticularCustomerByMobileNumber = async (req, res, next) => {
    const { mobile_number} = req.params;

    console.log("The consumer ID is:", mobile_number);

    try {
        const customer = await Customer.findOne({
            where: { mobile_number }
        });

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
        console.log("Error:", error);
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


export const customerLogin = async(req,res,next)=>{

    const { mobile_number } = req.body;


    try {
        
        if ( !mobile_number ){

            return next( new CustomError("mobile number is required.",401));
            
        }

        if ( mobile_number.toString().length != 10 ){

            return next( new CustomError("please provide a valid number.",401)); 
        }

        const existCustomer = await Customer.findOne({where : {mobile_number}})


        if ( !existCustomer ){
            return res.json({
                success : false,
                message : "No user exist with this mobile number."
            })
        }

        //send otp to this number

        return res.json({
            success : true,
            message : "successfully logged in."
        })

    } catch (error) {

        console.log("error is : ",error);
        
    }
}

export const varification = async ( req,res,next)=>{

    try {
        
        const { mobile_number , otp } = req.body;

        const customer = await Customer.findOne({where : {mobile_number}})


        if ( !customer ){
            return res.json({
                success : false,
                message : "No user exist with this mobile number."
            })
        }

        console.log("the customer is : ",customer.dataValues);
        

        // if ( otp !== customer.otp ){
            
        //     return res.json({
        //         success : false,
        //         message : "Incorrect otp"
        //     })
        // }


        const token = await generateToken(customer.dataValues); // token should be generate
        
        return res.json({
            success : true,
            message : "successfully varified customer",
            data : customer,
            token : token
        })


    } catch (error) {

        console.log("error is : ",error);
        
        
    }
}

export const getMyProfile = async(req,res,next)=>{
    try {
        return res.json({
            success : true,
            message : "successfully fetched data",
            data : req.user
        })
    } catch (error) {
        
    }
}


export const uploadCsv = async ( req,res,next)=>{
    try {

        if (!req.file) {
            return res.status(400).send('No file selected!');
        }

        console.log('the file is here : ',req.file);
        

        const results = [];
        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                console.log("the result value is : ",typeof results);
                
                // Insert data into database
                // results.forEach(row => {
                //     const query = 'INSERT INTO your_table SET ?';
                //     db.query(query, row, (err, result) => {
                //         if (err) throw err;
                //     });
                // });
                // res.send('File uploaded and data inserted into database');
            });


        return res.json({
            success : true,
            message : "upload csv successfully"
        })

    } catch (error) {
        
    }
}
