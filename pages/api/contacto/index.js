// pages/api/contacto.js

import Contacto from "@/app/Models/Connect";
import { connectDB } from "@/app/database/db";

export default async function handler(req, res) {
  const { method } = req;

  await connectDB();

  switch (method) {
    case 'GET':
      try {
        // Aquí obtienes todos los contactos, o puedes modificar para buscar según criterios
        const contactos = await Contacto.find({}).sort({ createdAt: -1 });;
        res.status(200).json({ success: true, data: contactos });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      try {
        // Aquí creas un nuevo contacto con los datos del cuerpo de la solicitud
        const contacto = new Contacto(req.body);
        await contacto.save();
        res.status(201).json({ success: true, data: contacto });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, error: 'Método no permitido' });
      break;
  }
}
