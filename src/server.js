import app from './app.js';
import sequelize from './config/db.js';
import { ENV_VARIALBE } from './config/.envConfig.js';

const PORT = ENV_VARIALBE.SERVER_PORT || 5000


sequelize.sync().then(()=>{
    console.log("database is connected successfully...");
    app.listen(PORT,()=>{
        console.log(`server is running at ${PORT} 🚀 `);
    })
    
}).catch((err)=>{
    console.log("the database error is : ",err);
    
    console.log("database connection failed...❌");
    
})
