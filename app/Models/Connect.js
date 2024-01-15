import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true, // Elimina espacios al principio y al final
  },
  celular: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true, // Convierte el email a minúsculas
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Una validación básica de email
      },
      message: props => `${props.value} no es un email válido!`
    },

  }
},{ timestamps: true });

const Contacto =mongoose.models.Contacto ||  mongoose.model('Contacto', contactSchema);


export default Contacto;
