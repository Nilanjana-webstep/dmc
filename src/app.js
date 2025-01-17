import express from 'express'
import morgan from 'morgan';
import consumerRoute from './routes/route.customer.js';
import errorMiddleware from './middlewares/ErrorHandler.js';
import propertyRoute from './routes/route.property.js';
import propertyTypeRoute from './routes/route.propertyType.js';
import wardRoute from './routes/route.ward.js';
import propertySubTypeRoute from './routes/route.propertySubType.js';

const app = express();

app.use(express.json());
app.use(morgan('dev'));


app.use('/api/customer',consumerRoute);
app.use('/api/property',propertyRoute);
app.use('/api/property-type',propertyTypeRoute);
app.use('/api/property-sub-type',propertySubTypeRoute);
app.use('/api/ward',wardRoute);



app.use(errorMiddleware);


export default app;