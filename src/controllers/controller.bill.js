import { statusCode } from "../config/constraint.js";
import sequelize from "../config/db.js";
import Bill from "../models/model.bill.js"
import { format } from 'date-fns';

export const bill_create = async (req, res, next) => {
  const { customer_id , consumer_id } = req.body;
  try {
    const currentDate = new Date();
    const bill_month = format(currentDate, 'MMMM yyyy');
   
    await Bill.create({
      customer_id,
      consumer_id,
      bill_month,
    });

    return res.status(statusCode.CREATED).json({
      success: true,
      message : "Bill created successfully."
    });
  } catch (error) {
    console.log("error creating bill : ",error);
    next(error);
  }
};


export const getAllBill = async (req, res, next) => {
 
  try {
    
    const sql = `
          SELECT cu.customer_id, con.consumer_id, cu.full_name,con.billing_address,con.street_1, pt.property_type, pst.property_sub_type,
                b.bill_id, b.bill_month, 
                DATE_FORMAT(CONCAT(YEAR(CURDATE()), '-', MONTH(CURDATE()), '-', bp.billing_due_date), '%Y-%m-%d') AS billing_due_date,
                pst.charge
          FROM bills b 
          JOIN customers cu ON cu.customer_id = b.customer_id 
          JOIN consumers con ON con.consumer_id = b.consumer_id 
          JOIN billing_profiles bp ON con.billingProfileId = bp.id 
          JOIN property_types pt ON pt.id = con.propertyTypeId 
          JOIN property_sub_types pst ON pst.id = con.propertySubTypeId 
          ORDER BY b.createdAt;
        `;


    const [allBills] = await sequelize.query(sql);

    return res.status(statusCode.OK).json({
      success: true,
      message : "Bill fetched successfully.",
      data : allBills
    });
  } catch (error) {
    console.log("error in getting bill : ",error);
    next(error);
  }
};
