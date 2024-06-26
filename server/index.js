const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');

async function main() {
    await mongoose.connect("mongodb+srv://tushargupta2k3:tUshar%40123@twitter.fzbvq5v.mongodb.net/showtime");
}
main().catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.use('/api/user',userRoutes);

app.listen(process.env.PORT,() => {
    console.log("server listening on port " + process.env.PORT);
})