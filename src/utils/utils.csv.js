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


export const  jsonToCsv = (jsonData)=> {
    
    let csv = '';
    
    const headers = Object.keys(jsonData[0]);
    csv += headers.join(',') + '\n';
    
    jsonData.forEach(obj => {
        const values = headers.map(header => obj[header]);
        csv += values.join(',') + '\n';
    });
    
    return csv;
}
