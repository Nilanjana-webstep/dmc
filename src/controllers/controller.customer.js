import Customer from '../models/model.customer.js';
import Property from '../models/model.property.js';
import Ward from '../models/model.ward.js';
import PropertyType from '../models/model.propertyType.js';
import PropertySubType from '../models/model.propertySubType.js';
import CustomError from "../utils/util.customError.js";
import { updateDatabaseObject } from "../utils/util.database.js";
import sequelize from '../config/db.js';
import { convertCsvToObject, jsonToCsv } from '../utils/utils.csv.js';
import { CustomerPropertyCombinModel } from '../validations/validation.customerWithProperty.js';
import { CustomerCreationValidationModel } from '../validations/validation.customerModel.js';
import { PropertyCreationValidationModel } from '../validations/validation.propertyModel.js';



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

        const allCustomers = await Customer.findAll({
             where : {is_active:true},
        });
        
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
        const customer = await Customer.findOne({
            where: { customer_id },
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

        customer.is_active = false;

        await customer.save();

        return res.status(200).json({
            success: true,
            message: "Customer deleted successfully."
        });
    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Cannot delete customer.", 500));
    }
};

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

export const exportCustomerIntoCsv = async (req, res, next) => {
    console.log('got hit');
    
    try {
        const data = await Customer.findAll({
            attributes: ['id', 'customer_id', 'full_name', 'mobile_number', 'email', 'date_of_birth', 'sex', 'is_active', 'createdAt', 'updatedAt']
        });

        const plainData = data.map(customer => customer.get({ plain:true }));
        
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













  






