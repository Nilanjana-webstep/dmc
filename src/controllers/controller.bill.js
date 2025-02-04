import { statusCode } from "../config/constraint.js";
import Bill from "../models/model.bill.js"
import { endOfMonth, format } from 'date-fns';

export const bill_create = async (req, res, next) => {
  try {
    const currentDate = new Date();
    const bill_month = format(currentDate, 'MMMM yyyy');
    const bill_amount = 30;
    const due_date = format(endOfMonth(currentDate), 'yyyy-MM-dd'); 
    await Bill.create({
      bill_month,
      bill_amount,
      due_date,
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
