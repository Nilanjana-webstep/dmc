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
import sequelize from '../config/db.js';
import { convertCsvToObject } from '../utils/utils.csv.js';
import { CustomerPropertyCombinModel } from '../validations/validation.customerWithProperty.js';
import { CustomerCreationValidationModel } from '../validations/validation.customerModel.js';
import { PropertyCreationValidationModel } from '../validations/validation.propertyModel.js';
import { parse } from 'json2csv';

export const createCustomerWithProperty = async (req, res, next) => {

    const {   property ,customer } = req.body;
    const { ward_no , property_type_name, property_sub_type_name} = property;

    try {
        const result = await sequelize.transaction(async t => {

            let customer_id = null;

            const { mobile_number } = customer;

            if ( mobile_number.toString().length != 10 ){
                return next(new CustomError("phone number should be 10 digit.",400));
            }    

            const existCustomer = await Customer.findOne({where:{mobile_number:mobile_number}})

            if( existCustomer){
                customer_id = existCustomer.dataValues.id;
            }else{
                const customerData = await Customer.create(customer,{ transaction: t });
                customerData.customer_id = (customer_id+Date.now()).toString();
                customer_id = customerData.dataValues.id;
                await customerData.save({ transaction: t });
            }

            const wardData = await Ward.findOne({where:{ward_no}},{ transaction: t });
            const ward_id = wardData.dataValues.id;

            const propertyTypeData = await PropertyType.findOne({where:{property_type_name}},{ transaction: t });
            const property_type_id = propertyTypeData.dataValues.id;

            const propertySubTypeData = await PropertySubType.findOne({where:{property_sub_type_name}},{ transaction: t });
            const property_sub_type_id = propertySubTypeData.dataValues.id;

            const propertyData = await Property.create({...property,customerId:customer_id,wardId:ward_id,propertyTypeId:property_type_id,propertySubTypeId:property_sub_type_id},{ transaction: t });
            const property_id = propertyData.dataValues.id;
            propertyData.consumer_id = (property_id+Date.now()).toString();
            await propertyData.save({ transaction: t });

            return res.status(201).json({
                success: true,
                message: "created successfully.",
            });
           
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
            where: { mobile_number },
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


const validateData = (data) => {
    const { error } = CustomerPropertyCombinModel.validate(data);
    if (error) return error;

    const { 
        full_name, 
        mobile_number, 
        email, 
        date_of_birth, 
        sex,
        property_no, 
        street_1, 
        street_2, 
        property_type_name, 
        property_sub_type_name, 
        ward_no, 
        pincode 
    } = data;

    const customer = { full_name, mobile_number, email, date_of_birth, sex };
    const property = { property_no, street_1, street_2, property_type_name, property_sub_type_name, ward_no, pincode };

    const customerError = CustomerCreationValidationModel.validate(customer).error;
    if (customerError) return customerError;

    const propertyError = PropertyCreationValidationModel.validate(property).error;
    if (propertyError) return propertyError;

    if (mobile_number.toString().length !== 10) {
        return new CustomError("Invalid phone number length", 400);
    }

    return null;
};

const processCustomerAndProperty = async (data, t) => {
    const { 
        full_name, 
        mobile_number, 
        email, 
        date_of_birth, 
        sex,
        property_no, 
        street_1, 
        street_2, 
        property_type_name, 
        property_sub_type_name, 
        ward_no, 
        pincode 
    } = data;

    let customer_id = null;

    const existCustomer = await Customer.findOne({ where: { mobile_number } }, { transaction: t });

    if (existCustomer) {
        customer_id = existCustomer.dataValues.id;
    } else {
        const customerData = await Customer.create({ full_name, mobile_number, email, date_of_birth, sex }, { transaction: t });
        customerData.customer_id = (customer_id + Date.now()).toString();
        customer_id = customerData.dataValues.id;
        await customerData.save({ transaction: t });
    }

    const wardData = await Ward.findOne({ where: { ward_no } }, { transaction: t });
    const ward_id = wardData.dataValues.id;

    const propertyTypeData = await PropertyType.findOne({ where: { property_type_name } }, { transaction: t });
    const property_type_id = propertyTypeData.dataValues.id;

    const propertySubTypeData = await PropertySubType.findOne({ where: { property_sub_type_name } }, { transaction: t });
    const property_sub_type_id = propertySubTypeData.dataValues.id;

    const propertyData = await Property.create({
        property_no, street_1, street_2, property_type_name, property_sub_type_name, ward_no, pincode,
        customerId: customer_id, wardId: ward_id, propertyTypeId: property_type_id, propertySubTypeId: property_sub_type_id
    }, { transaction: t });

    const property_id = propertyData.dataValues.id;
    propertyData.consumer_id = (property_id + Date.now()).toString();
    await propertyData.save({ transaction: t });
};

export const uploadCustomerWithPropertyFromCsv = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file selected!');
        }

        const results = await convertCsvToObject(req.file, next);

        console.log('The result is:', results);

        const errorData = [];

        for (const data of results) {
            const error = validateData(data);
            if (error) {
                errorData.push(data);
                continue;
            }

            await sequelize.transaction(async (t) => {
                await processCustomerAndProperty(data, t);
            });
        }

        return res.json({
            success: true,
            message: "Uploaded CSV successfully",
            unuploadedData: errorData
        });

    } catch (error) {
        console.log("the error : ",error);
        return next( new CustomError(error.message,401));
    }
};


function jsonToCsv(jsonData) {
    
    let csv = '';
    
    const headers = Object.keys(jsonData[0]);
    csv += headers.join(',') + '\n';
    
    jsonData.forEach(obj => {
        const values = headers.map(header => obj[header]);
        csv += values.join(',') + '\n';
    });
    
    return csv;
}


export const exportCustomerWithPropertyIntoCsv = async (req, res, next) => {
    

    try {
        const data = await Customer.findAll({
            attributes: ['id', 'customer_id', 'full_name', 'mobile_number', 'email', 'date_of_birth', 'sex', 'is_active', 'createdAt', 'updatedAt']
        });

        
        const plainData = data.map(customer => customer.get({ plain:true }));
        
        const fields = ['id', 'customer_id', 'full_name', 'mobile_number', 'email', 'date_of_birth', 'sex', 'is_active', 'createdAt', 'updatedAt'];

        
        const csvData = jsonToCsv(plainData);

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="exported_data.csv"');

        res.send(csvData);

    } catch (error) {
        console.error('Error exporting data:', error);
        next( new CustomError("not exporting csv file , something went wrong",500));
    }
};



// frontend function to download csv

// const exportToExcel = () => {
//     console.log("got hit");

//     axios.get('http://localhost:8080/api/customer/export-csv', {
//         responseType: 'blob' 
//     })
//     .then((response) => {
        
//         const blob = new Blob([response.data], { type: 'text/csv' });
//         const link = document.createElement('a');
//         link.href = window.URL.createObjectURL(blob);
//         link.download = 'exported_customer_data.csv';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//         console.log("File downloaded successfully");
//     })
//     .catch((error) => {
//         console.error('Error downloading the CSV file:', error);
//     });
// };











  






