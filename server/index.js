const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const theatreRoutes = require('./routes/theatreRoutes');
const showRoutes = require('./routes/showRoutes');
const movieRoutes = require('./routes/movieRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const db = process.env.mongodb_url;

async function main() {
    await mongoose.connect(db);
}
main().catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.get('/',(req,res) => {
    res.send('Api working!')
})

app.use('/api/user',userRoutes);
app.use('/api/theatre',theatreRoutes);
app.use('/api/show',showRoutes);
app.use('/api/movie',movieRoutes);
app.use('/api/bookings',bookingRoutes);

app.listen(process.env.PORT,() => {
    console.log("server listening on port " + process.env.PORT);
})