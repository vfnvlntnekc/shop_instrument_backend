import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
  statusId:{
      type: Boolean,
      required: true,
      default: false,
  },
  clientId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  managerId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manager',
    required: true,
  },
  cost:{
    type: Number,
    required: true,
    default: 0,
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }]
},{
  timestamps: true,
},
); 

export default mongoose.model('Order', OrderSchema);