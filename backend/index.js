const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const path = require('path');
const config = require('./config');
const MongoDB_URL =config.MongoDB_URL
const app = express();


const userRouter  = require("./routes/user_route");
const ownerRouter =require("./routes/owner_route")
const adminRouter =require("./routes/admin_route");
const movieRouter= require("./routes/movie_route")
const bookingRouter =require("./routes/booking_route")
const router =require("./routes/stripe")
app.use(express.json());
// Enable CORS
app.use(
  cors({
    origin: ['https://musical-marigold-8bed5a.netlify.app', 'http://localhost:3000'],
    credentials: true,
  })
);
app.use('/public/images',express.static('public/images'))
/*middlewares*/
app.use("/user", userRouter);
app.use("/owner", ownerRouter);
app.use("/admin",adminRouter);
app.use("/movie",movieRouter);
app.use("/booking",bookingRouter);
app.use('/payment',router);
// server connection
app.listen(5000, () => {
  console.log(`Connected to localhost port ${5000}`);
});

/** mongodb connect */
mongoose
  .connect(`${MongoDB_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log(error.message);
  });
