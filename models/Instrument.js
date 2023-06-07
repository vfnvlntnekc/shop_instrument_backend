import mongoose from "mongoose";

const InstrumentSchema = new mongoose.Schema(
  {
  fullName:{
    type: String,
    required: true,
  },
  category:{
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
  },
  price:{
    type: Number,
    required: true,
  },
  quantity:{
    type: Number,
    required: true,
  },
  /* manager:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manager',
    required: true,
  }, */
  image_instrument: String, 
},{
  timestamps: true,
},
);

export default mongoose.model('Instrument', InstrumentSchema);