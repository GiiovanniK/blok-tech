require('dotenv').config();
const uri = process.env.ATLAS_URI;

const connectDB = async (mongoose) => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('Connection to DB successful');
    } catch (err) {
        console.log('Connection to DB failed');
    }
};

module.exports = connectDB;