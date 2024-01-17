'use client'
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const password = "oriana";
  const [state, setState]= useState()
const {push}= useRouter()
  useEffect(()=>{
    state == password && push('/admin/productos')


  },[state])
  return (
    <div className="h-screen bg-black flex items-center justify-center">
      <input type="password" className="bg-white px-2 rounded-full " onChange={(e)=>setState(e.target.value)}/>
    </div>
  );
};

export default Page;
