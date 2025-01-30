import Customer from '../models/model.customer.js';
import Property from '../models/model.property.js';
import Ward from '../models/model.ward.js';
import PropertyType from '../models/model.propertyType.js';
import PropertySubType from '../models/model.propertySubType.js';
import CustomError from "../utils/util.customError.js";
import { updateDatabaseObject } from "../utils/util.database.js";
import sequelize from '../config/db.js';
import { convertCsvToObject } from '../utils/utils.csv.js';
import { CustomerPropertyCombinModel } from '../validations/validation.customerWithProperty.js';
import { CustomerCreationValidationModel } from '../validations/validation.customerModel.js';
import { PropertyCreationValidationModel } from '../validations/validation.propertyModel.js';
import ExcelJS from 'exceljs';
import Varification from '../models/model.varification.js';
import { generateFourDigitOTP, varifyOtp } from '../utils/utils.otp.js';
import { generateToken } from '../utils/utis.jwt.js';


export const createCustomerWithProperty = async (req, res, next) => {

    const {   property ,customer } = req.body;
    const { ward_no , property_type, property_sub_type} = property;

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
                customerData.customer_id = (customer_id+100000).toString();
                customer_id = customerData.dataValues.id;
                await customerData.save({ transaction: t });
            }

            const wardData = await Ward.findOne({where:{ward_no}},{ transaction: t });
            const ward_id = wardData.dataValues.id;

            const propertyTypeData = await PropertyType.findOne({where:{property_type}},{ transaction: t });
            const property_type_id = propertyTypeData.dataValues.id;

            let property_sub_type_id = null;

            if ( property_sub_type ){

                const propertySubTypeData = await PropertySubType.findOne({where:{property_sub_type}},{ transaction: t });
                property_sub_type_id = propertySubTypeData.dataValues.id;
            }

            const propertyData = await Property.create({...property,customerId:customer_id,wardId:ward_id,propertyTypeId:property_type_id,propertySubTypeId:property_sub_type_id},{ transaction: t });
            const property_id = propertyData.dataValues.id;
            propertyData.consumer_id = (property_id+100000).toString();
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

       if ( allCustomers.length < 1 ){
            return res.status(200).json({
                success : true,
                message : "No customer found!"
            })
       }
        
        
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

    try {
        const customer = await Customer.findOne({
            where: { mobile_number },
        });

        if (!customer) {
            return res.status(200).json({
                success: true,
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

    const { id } = req.params;

    try {

        const customer = await Customer.findByPk(id);

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
        address,
        sex,
        property_no, 
        street_1, 
        street_2, 
        property_type, 
        property_sub_type, 
        ward_no, 
        pincode 
    } = data;

    const customer = { full_name, mobile_number, email, date_of_birth,address,sex };
    const property = { property_no, street_1, street_2, property_type, property_sub_type, ward_no, pincode };

    console.log("customer is : ",customer);
    
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
        address,
        sex,
        property_no, 
        street_1, 
        street_2, 
        property_type, 
        property_sub_type, 
        ward_no, 
        pincode 
    } = data;

    const customer = { full_name, mobile_number, email, date_of_birth,address,sex };
    const property = { property_no, street_1, street_2, property_type, property_sub_type, ward_no, pincode };

    let customer_id = null;

    const existCustomer = await Customer.findOne({ where: { mobile_number } }, { transaction: t });

    if (existCustomer) {
        customer_id = existCustomer.dataValues.id;
    } else {
        const customerData = await Customer.create(customer, { transaction: t });
        customerData.customer_id = (customer_id + Date.now()).toString();
        customer_id = customerData.dataValues.id;
        await customerData.save({ transaction: t });
    }

    const wardData = await Ward.findOne({ where: { ward_no } }, { transaction: t });
    const ward_id = wardData.dataValues.id;

    const propertyTypeData = await PropertyType.findOne({ where: { property_type } }, { transaction: t });
    const property_type_id = propertyTypeData.dataValues.id;

    let property_sub_type_id = null;

    if ( property_sub_type ){

        const propertySubTypeData = await PropertySubType.findOne({where:{property_sub_type}},{ transaction: t });
        property_sub_type_id = propertySubTypeData.dataValues.id;
    }
    const propertyData = await Property.create({
        property_no, street_1, street_2, property_type, property_sub_type, ward_no, pincode,
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

        // console.log('The result is:', results);

        const errorData = [];

        for (const data of results) {
            // console.log("the data is : ",data);
            
            const error = validateData(data);
            if (error) {
                console.log("the error is : ",error);
                
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
            unuploadedData_length : errorData.length,
            unuploadData : errorData
            
        });

    } catch (error) {
        console.log("the error : ",error);
        return next( new CustomError(error.message,401));
    }
};


export const exportCustomerIntoExcel = async (req, res, next) => {
  
    try {

    const data = await Customer.findAll({
          attributes: ['id', 'customer_id', 'full_name', 'mobile_number', 'email', 'date_of_birth', 'sex', 'address', 'is_active', 'createdAt', 'updatedAt']
    });

    const plainData = data.map(customer => customer.get({ plain: true }));

    
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Customers');

    
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Customer ID', key: 'customer_id', width: 20 },
      { header: 'Full Name', key: 'full_name', width: 30 },
      { header: 'Mobile Number', key: 'mobile_number', width: 15 },
      { header: 'Email', key: 'email', width: 25 },
      { header: 'Date of Birth', key: 'date_of_birth', width: 15 },
      { header: 'Sex', key: 'sex', width: 10 },
      { header: 'Address', key: 'address', width: 30 },
      { header: 'Is Active', key: 'is_active', width: 10 },
      { header: 'Created At', key: 'createdAt', width: 20 },
      { header: 'Updated At', key: 'updatedAt', width: 20 }
    ];

    
    plainData.forEach(data => { worksheet.addRow(data); });
    
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="exported_data.xlsx"');
    
    await workbook.xlsx.write(res);
   
    res.end();

  } catch (error) {
    console.error('Error exporting data:', error);
    res.status(500).send('Error exporting data');
  }
};


export const customerLogin = async ( req,res,next )=>{

    const { mobile_number } = req.body;
    
    try {
        
        const customer = await Customer.findOne({where : { mobile_number}});

        if ( !customer ) {
            return res.status(401).json({
                success : true,
                message : "No customer is found for this number."
            })
        }

        const otp = generateFourDigitOTP();

        const varificationData = await Varification.create({mobile_number,otp});

        //should sent otp to the mobile number

        return res.status(200).json({
            success : true,
            message : "successfully sent otp."
        })

    } catch (error) {
        
        console.log("the error occur to send otp to login. : ",error);
        
    }
};

export const otpVarification = async ( req,res,next)=>{

    console.log("got hit ");
    
    const { mobile_number , otp } = req.body;

    try {
        
        const varificationData = await Varification.findByPk(mobile_number);

        console.log("the expire in : ",varificationData.expire_in);

        if( Date.now() > varificationData.expire_in ){

            return res.status(401).json({
                success : true,
                message : "otp time out."
            })
            
        }        

        const varify = varifyOtp(varificationData.otp,otp);

        if ( varify ){
            await Varification.destroy({where : {mobile_number}});
            const customerData = await Customer.findOne({where:{mobile_number}});
            const token = generateToken(customerData.dataValues);
            return res.status(200).json({
                success : true,
                message : 'successfully login.',
                token : token
            })
        }else {
            return res.status(400).json({
                success : true,
                message : 'wrong otp'
            })
        }


    } catch (error) {
        console.log("error during otp varification : ",error);
        
    }
};


export const otpResend = async ( req,res,next)=>{
  
    const { mobile_number  } = req.body;

    try {
        
        const customer = await Customer.findOne({where : { mobile_number}});

        if ( !customer ) {
            return res.status(401).json({
                success : true,
                message : "No customer is found for this number."
            })
        }

        const otp = generateFourDigitOTP();

        const varificationData = await Varification.findByPk(mobile_number);

        varificationData.otp = otp;

        varificationData.expire_in = new Date(Date.now() + 5 * 60 * 1000);

        //should sent otp to the mobile number

        return res.status(200).json({
            success : true,
            message : "successfully sent otp."
        })


    } catch (error) {
        console.log("error during otp varification : ",error);
        
    }
};






















  






