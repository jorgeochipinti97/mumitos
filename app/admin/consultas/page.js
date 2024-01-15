"use client";
import Sidebar from "@/app/components/Sidebar";
import useConsulta from "@/app/hook/useConsultas";
import React, { useEffect } from "react";

const TablaConsultas = ({ consultas }) => {
  return (
    <table className=" divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Nombre
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Celular
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Email
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
Fecha
          </th>
        </tr>
      </thead>
      <tbody>
        {consultas.map((consulta, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap">{consulta.nombre}</td>
            <td className="px-6 py-4 whitespace-nowrap">{consulta.celular}</td>
            <td className="px-6 py-4 whitespace-nowrap">{consulta.email}</td>
            <td>{new Date(consulta.createdAt).toLocaleDateString()}</td>

          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Page = () => {
  const consultas = useConsulta();

  useEffect(() => {
    console.log(consultas);
  }, [consultas]);
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1  flex justify-center mt-10">
        {consultas && <TablaConsultas consultas={consultas} />}
      </div>
    </div>
  );
};

export default Page;
