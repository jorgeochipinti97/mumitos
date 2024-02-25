// pages/api/productos/[id].js
import Producto from "@/app/Models/Producto";
import { connectDB } from "@/app/database/db.js";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await connectDB();

  switch (method) {
    case "PUT":
      try {
        const producto = await Producto.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!producto) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: producto });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const deletedProducto = await Producto.deleteOne({ _id: id });
        if (!deletedProducto) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "GET":
      try {
        const producto = await Producto.findById(id);
        if (!producto) {
          return res
            .status(404)
            .json({ success: false, error: "Producto no encontrado" });
        }
        res.status(200).json({ success: true, data: producto });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, error: "Método no permitido" });
      break;
  }
}
