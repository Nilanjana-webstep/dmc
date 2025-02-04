import csv from 'csv-parser';
import fs from 'fs';

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

        return results;
    } catch (error) {
        
        console.log("error in converting csv to json : ",error);
        return next(error);
    }

    
};

