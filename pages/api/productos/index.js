// pages/api/productos/index.js
import Producto from '@/app/Models/Producto';
import { connectDB } from '@/app/database/db.js';



export default async function handler(req, res) {
  const { method } = req;

  await connectDB();

  switch (method) {
    case 'GET':
      try {
        const productos = await Producto.find({}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: productos });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      try {
        const producto = new Producto(req.body);
        await producto.save();
        res.status(201).json({ success: true, data: producto });
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(405).json({ success: false, error: 'Método no permitido' });
      break;
  }
}
