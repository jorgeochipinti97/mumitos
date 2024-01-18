import mongoose from "mongoose";


const productoSchema = new mongoose.Schema({
  nombreproducto: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  genero: {
    type: String,
    required: true,
    enum: ['niño', 'niña', 'bebé', 'accesorio',"no estacional"]
  },
  slug: {
    type: String,
  },

  categoria: {
    type: String,
    required: true,
    enum: [
      'bodies y enteritos', 'buzos y sweaters', 'calzado', 'camperas',
      'camperas y chalecos', 'pantalones', 'pantalones y enteritos',
      'pantalones y leggins', 'pijamas', 'remeras blusas y bodies',
      'remeras y blusas', 'remeras y bodies', 'ropa interior', 'trajes de baño',
      'vestidos y polleras'
    ]
  },
  precio: {
    type: Number,
    required: true
  },
  selectedsizes: {
    type: [String],
    required: true
  },
  imagesarray: [String] // Array de URLs de imágenes
},{ timestamps: true });

const Producto = mongoose.models.Producto || mongoose.model('Producto', productoSchema);

module.exports = Producto;
