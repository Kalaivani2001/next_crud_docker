import mongoose, { Schema } from "mongoose";

const productsSchema = new Schema(
  {
    productName:String!,
    color:String!,
    category:String!,
    price:String!
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.models.Products || mongoose.model("Products", productsSchema);

export default Products;