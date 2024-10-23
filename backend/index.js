import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import authRoute from './Routes/auth.js';
import userRoute from "./Routes/user.js";
import doctorRoute from "./Routes/doctor.js";
import reviewRoute from "./Routes/review.js";
import bookingRoute from "./Routes/booking.js";
dotenv.config();

const app=express();
const port=process.env.PORT || 8000;   //Defining port

const corsOptions={
    origin:"https://doctor-appointment-three-tau.vercel.app/",
}
app.get('/',(req,res)=>{                   //router test api
    res.send("API IS WORKING");
});

// database connection
mongoose.set('strictQuery',true);
const connectDB=async()=>{                 //database connection functions
    try{
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            
        })
        console.log('MongoDB data is connected');
    }
    catch (err){
    console.log("mongodb connection failed");
    }
}

// middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use('/api/v1/auth',authRoute); //domain/api/v1/auth/register
app.use('/api/v1/users',userRoute);
app.use('/api/v1/doctors',doctorRoute);
app.use('/api/v1/reviews',reviewRoute);
app.use('/api/v1/bookings',bookingRoute);

app.listen(port,()=>{
    connectDB();
    console.log('server is running on port'+port);

});
