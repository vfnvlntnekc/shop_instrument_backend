import mongoose from "mongoose";

const ManagerSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
        unique: true,
    },
    passwordHash:{
        type: String,
        required:true,
    },
},{
    timestamps: true,
},
);

export default mongoose.model('Manager', ManagerSchema);