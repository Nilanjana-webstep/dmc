import csv from 'csv-parser';
import fs from 'fs';
import CustomError from './util.customError.js';

export const convertCsvToObject = async (csvFile, next) => {
    const results = [];

    try {
        await new Promise((resolve, reject) => {
            fs.createReadStream(csvFile.path)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', resolve)
                .on('error', (error) => reject);
        });
    } catch (error) {
        return next(error);
    }

    return results;
};
