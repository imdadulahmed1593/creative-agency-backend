import mongoose from "mongoose";

const serviceSchema = mongoose.Schema({
  icon: String,
  title: String,
  description: String,
  url: String,
});

const reviewSchema = mongoose.Schema({
  img: String,
  name: String,
  title: String,
  description: String,
});

const orderSchema = mongoose.Schema({
  clientName: String,
  clientEmail: String,
  details: String,
  price: String,
  type: String,
  description: String,
  icon: String,
});

const serviceCollection = mongoose.model("serviceCollection", serviceSchema);

const reviewCollection = mongoose.model("reviewCollection", reviewSchema);

const orderCollection = mongoose.model("orderCollection", orderSchema);

export { serviceCollection, reviewCollection, orderCollection };
