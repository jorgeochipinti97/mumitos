import mongoose from "mongoose";

const productoSchema = new mongoose.Schema(
  {
    nombreproducto: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    genero: {
      type: String,
      required: true,

    },
    slug: {
      type: String,
    },

    categoria: {
      type: String,
      required: true,

    },
    precio: {
      type: Number,
      required: true,
    },
    selectedsizes: {
      type: [String],
      required: true,
    },
    imagesarray: [String], 
    descuento: {

      type: Number,
      required: false, // Este campo no es obligatorio
      min: 0, // Valor mínimo 0%
      max: 100, // Valor máximo 100%
    },
  },
  { timestamps: true }
);

const Producto =
  mongoose.models.Producto || mongoose.model("Producto", productoSchema);

module.exports = Producto;
