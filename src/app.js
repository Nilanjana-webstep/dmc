import express from 'express'
import cors from 'cors'
import morgan from 'morgan';
import errorMiddleware from './middlewares/ErrorHandler.js';
import consumerRoute from './routes/route.Consumer.js';
import propertyTypeRoute from './routes/route.propertyType.js';
import wardRoute from './routes/route.ward.js';
import propertySubTypeRoute from './routes/route.propertySubType.js';
import customerRoute from './routes/route.customer.js';
import serviceTypeRoute from './routes/route.serviceType.js';
import nirmalBandhuRoute from './routes/route.nirmalBandhu.js';
import grievanceTypeRoute from './routes/route.grievanceType.js';
import grievanceSubTypeRoute from './routes/route.grievanceSubType.js';
import grievanceRoute from './routes/route.grievance.js';
import bookServiceRoute from './routes/route.bookService.js';
import noticeBoardRoute from './routes/route.noticeBoard.js';
import paymentRoute from './routes/route.payment.js';
import { ENV_VARIALBE } from './config/.envConfig.js';
import boroughRoute from './routes/route.borough.js';
import billingProfileRoute from './routes/route.billingProfile.js';

const app = express();

const corsOptions = {
    origin: ENV_VARIALBE.CLIENT_URL,
};
  
  
app.use(cors(corsOptions));
app.use(cors());
app.use('/public',express.static('public'));
app.use(express.json());
app.use(morgan('dev'));



// ******** master table api's ************
app.use('/api/borough',boroughRoute);
app.use('/api/ward',wardRoute);
app.use('/api/property-type',propertyTypeRoute);
app.use('/api/property-sub-type',propertySubTypeRoute);
app.use('/api/service-type',serviceTypeRoute);
app.use('/api/grievance-type',grievanceTypeRoute);
app.use('/api/grievance-sub-type',grievanceSubTypeRoute);
app.use('/api/billing-profile',billingProfileRoute);

// ************* admin api's **************
app.use('/api/notice-board/',noticeBoardRoute);
app.use('/api/nirmal-bandhu',nirmalBandhuRoute);
app.use('/api/customer',customerRoute);
app.use('/api/consumer',consumerRoute);


// ************* user api's ********************
app.use('/api/book-service',bookServiceRoute);
app.use('/api/grievance/',grievanceRoute);
app.use('/api/payment',paymentRoute);




app.use(errorMiddleware);


export default app;