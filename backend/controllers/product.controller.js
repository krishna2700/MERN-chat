import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, products });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error in Fetching products" });
    console.log("Error in Fetching products", err);
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body; // user will send updated data in request body
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid product ID" });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.status(200).json({ success: true, product: updatedProduct });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error in Update product" });
    console.log("Error in Update product", err);
  }
};

export const createProduct = async (req, res) => {
  const product = req.body; // user will send product data in request body
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .send({ success: false, message: "All fields are required" });
  }
  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res
      .status(201)
      .send({ success: true, message: "Product created", product: newProduct });
  } catch (err) {
    res.status(500).send({ message: err.message });
    console.log("Error in Create product", err);
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid product ID" });
  }
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error in Delete product" });
    console.log("Error in Delete product", err);
  }
};
