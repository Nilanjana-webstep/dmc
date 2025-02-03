import Customer from "../models/model.customer.js";
import Consumer from "../models/model.consumer.js";
import PropertySubType from "../models/model.propertySubType.js";
import PropertyType from "../models/model.propertyType.js";
import Ward from "../models/model.ward.js";
import CustomError from "../utils/util.customError.js";
import { updateDatabaseObject } from "../utils/util.database.js";
import sequelize from "../config/db.js";


export const getAllConsumer = async (req, res, next) => {
    try {
        const allProperties = await Consumer.findAll({
            include: [
                {
                    model : Customer,
                },
                {
                    model: Ward,
                    attributes: ['ward_no'] 
                },
                {
                    model: PropertyType,
                    attributes: ['Consumer_type'] 
                },
                {
                    model: PropertySubType,
                    attributes: ['Consumer_sub_type'] 
                }
            ]
        });
        return res.status(200).json({
            success: true,
            message: "Fetched all properties successfully.",
            data: allProperties
        });
    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Cannot fetch all properties.", 500));
    }
};


export const getParticularConsumerByConsumerId = async (req, res, next) => {
    const { consumer_id } = req.params;
    try {
        const Consumer = await Consumer.findByPk(consumer_id,
            {
                include: [
                    {
                        model : Customer,
                    },
                    {
                        model: Ward,
                        attributes: ['ward_no'] 
                    },
                    {
                        model: PropertyType,
                        attributes: ['Consumer_type'] 
                    },
                    {
                        model: PropertySubType,
                        attributes: ['Consumer_sub_type'] 
                    }
                ]
            }
        );

        if (!Consumer) {
            return res.status(404).json({
                success: false,
                message: "No Consumer found."
            });
        }
        return res.status(200).json({
            success: true,
            message: "Fetched Consumer successfully.",
            data: Consumer
        });
    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Cannot fetch Consumer.", 500));
    }
};


export const getAllConsumerByPartucularCustomerId = async (req, res, next) => {
    
    
    const { id } = req.params;
    
    
    try {
          
                        const sql = `
                            SELECT 
                                con.consumer_id,
                                con.street_1,
                                con.street_2,
                                con.property_no,
                                con.pincode,
                                con.billing_address,
                                w.ward,
                                pt.property_type,
                                pst.property_sub_type
                            FROM
                                consumers con
                            JOIN
                                property_types pt ON con.propertyTypeId = pt.id
                            JOIN
                                property_sub_types pst ON con.propertySubTypeId = pst.id
                            JOIN
                                wards w ON con.wardId = w.id
                            WHERE
                                con.customer_id = ${id}
                        `;
                  
      
        const [allProperties] = await sequelize.query(sql);

        if (allProperties.length == 0) {
            return res.status(404).json({
                success: false,
                message: "No Consumer found."
            });
        }
        return res.status(200).json({
            success: true,
            message: "Fetched Consumer successfully.",
            data: allProperties
        });
    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Cannot fetch Consumer.", 500));
    }
};


export const updateConsumerById = async (req, res, next) => {
    
    const { id } = req.params;
    
    try {
        const Consumer = await Consumer.findByPk(id);

        if (!Consumer) {
            return res.status(404).json({
                success: false,
                message: "No Consumer found for this ID."
            });
        }

        const updatedConsumer = updateDatabaseObject(req.body, Consumer);
        await updatedConsumer.save();

        return res.status(200).json({
            success: true,
            message: "Consumer updated successfully.",
            data: updatedConsumer
        });

    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Cannot update Consumer.", 500));
    }
};


export const deleteConsumerById = async (req, res, next) => {

    const { id } = req.params;

    try {
        const Consumer = await Consumer.findByPk(id);

        if (!Consumer) {
            return res.status(404).json({
                success: false,
                message: "No Consumer found for this ID."
            });
        }
        
        Consumer.is_active = false;

        await Consumer.save();

        return res.status(200).json({
            success: true,
            message: "Consumer deleted successfully."
        });
    } catch (error) {
        console.log("Error: ", error);
        return next(new CustomError("Cannot delete Consumer.", 500));
    }
};




