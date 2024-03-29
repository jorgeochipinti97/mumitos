"use client";
import { SliderFlip } from "@/app/components/SliderFlip";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { formatPriceToUSD } from "@/utils/format";
import Marquee from "react-fast-marquee";
import useProductos from "@/app/hook/UseProducts";
import { CartContext } from "@/context/cart/CartContext";
import { useRouter } from "next/navigation";

const Page = ({ params }) => {
  const products_ = useProductos();
  const [producto, setProducto] = useState();
  const [products, setProducts] = useState();
  const [quantity_, setQuantity_] = useState(1);
  const [precioConDescuento, setPrecioConDescuento] = useState(1);
  const { addProductToCart } = useContext(CartContext);
  const { push } = useRouter();
  const [size, setSize] = useState("");
  const [tempCartProduct, setTempCartProduct] = useState({
    quantity: 0,
    talle: size,
  });

  useEffect(() => {
    producto &&
      setTempCartProduct({
        _id: producto._id,
        image: producto.imagesarray[0],
        precio: producto.descuento
          ? producto.precio - (producto.precio * producto.descuento) / 100
          : producto.precio,
        slug: producto.slug,
        titulo: producto.nombreproducto,
        quantity: 1,
        size: size,
        descuento: producto.descuento,
      });

    producto &&
      setPrecioConDescuento(
        producto.descuento
          ? producto.precio - (producto.precio * producto.descuento) / 100
          : producto.precio
      );
  }, [producto]);

  const addOrRemove = (value) => {
    if (value === -1) {
      if (tempCartProduct.quantity === 1) return;

      return onUpdateQuantity(tempCartProduct.quantity - 1);
    }

    if (tempCartProduct.quantity >= 10) return;

    onUpdateQuantity(tempCartProduct.quantity + 1);
  };

  const onUpdateQuantity = (quantity) => {
    setQuantity_(quantity);
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      quantity,
    }));
  };

  const getProduct = async () => {
    const data = await axios.get(`/api/productos/${params.id}`);
    setProducto(data.data.data);

    setProducts(
      products_.filter(
        (e) => e.categoria.toLowerCase() == data.data.data.categoria
      )
    );
  };

  const onHandleClickAddToCart = () => {
    if (!size) {
      alert("Seleccione un tamaño, por favor.");
      return;
    }
    addProductToCart({
      _id: producto._id,
      image: producto.imagesarray[0],
      precio: producto.descuento
      ? producto.precio - (producto.precio * producto.descuento) / 100
      : producto.precio,
      slug: producto.slug,
      titulo: producto.nombreproducto,
      quantity: quantity_,
      size: size,
      descuento: producto.descuento,
    });
    push("/cart");
  };

  const createWhatsAppLink = (name, price) => {
    const message = `Hola, estoy interesado en comprar el producto: ${name} a ${formatPriceToUSD(
      price
    )}`;
    // Asegúrate de reemplazar [tu_numero] con tu número de teléfono real
    const whatsappUrl = `https://wa.me/541142841212?text=${encodeURIComponent(
      message
    )}`;
    return whatsappUrl;
  };

  useEffect(() => {
    params && getProduct();
  }, [params]);

  return (
    <div className="min-h-screen w-screen  py-20">
      {producto && (
        <>
          <div className="w-screen grid grid-cols-1 md:grid-cols-2  h-fit">
            <div className=" max-w-6/12 ">
              <SliderFlip images={producto.imagesarray} />
            </div>
            <div className=" ">
              <p className="text-center text-2xl md:text-5xl font-bold capitalize mx-2 mt-10 md:mt-5">
                {producto.nombreproducto}
              </p>
              {producto.descuento ? (
                <div className="flex items-center justify-center w-full mt-5 flex-col ">
                  <div className="flex items-center">
                    <p className="line-through opacity-50 mr-5 ">
                      {formatPriceToUSD(producto.precio)}
                    </p>
                    <p className=" text-center text-xl  ">
                      {formatPriceToUSD(precioConDescuento)}
                    </p>
                  </div>
                  <div className="w-full flex justify-center">
                    <span className="ml-2 font-bold mt-5  mx-5 text-md text-green-600 border-2 border-green-600 rounded-full px-1 py-1 ">
                      {producto.descuento}% OFF
                    </span>
                  </div>
                </div>
              ) : (
                <p className="mt-10 text-center text-4xl font-light">
                  {formatPriceToUSD(producto.precio)}
                </p>
              )}

              <div className="w-full flex justify-center">
                <p className="mt-10 text-justify   capitalize w-9/12 text-xs  font-light">
                  {producto.descripcion}
                </p>
              </div>
              <div>
                {producto.selectedsizes.map((e) => (
                  <button
                    key={e}
                    className={`${
                      e == size
                        ? "bg-gray-200 text-black border-2 border-black"
                        : "bg-black text-slate-200"
                    } px-2 mx-2 uppercase transition-all duration-200 rounded-xl mt-5`}
                    onClick={() => setSize(e)}
                  >
                    {e}
                  </button>
                ))}
              </div>
              <div className="flex items-center mx-2 space-x-2 mt-10">
                <button
                  size="icon"
                  variant="outline"
                  onClick={() => addOrRemove(-1)}
                >
                  <svg
                    className=" w-6 h-6 border-2 rounded-full "
                    fill="black"
                    height="24"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 12h14" />
                  </svg>
                  <span className="sr-only">Decrease quantity</span>
                </button>
                <div className="border-zinc-800 px-3 py-1 rounded-md text-center text-black">
                  {tempCartProduct.quantity}
                </div>
                <button
                  size="icon"
                  variant="outline"
                  onClick={() => addOrRemove(1)}
                >
                  <svg
                    className=" w-6 h-6 border-2 rounded-full "
                    fill="none"
                    height="24"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                  <span className="sr-only">Increase quantity</span>
                </button>
              </div>
              <div className="w-full flex justify-around w-12/12  mt-5 md:mt-20">
                <button
                  className="button2 font-semibold mt-2 font-geist tex-xs md:text-2xl px-1 py-2"
                  onClick={onHandleClickAddToCart}
                >
                  Agregar al carrito
                </button>
                <a
                  href={createWhatsAppLink(
                    producto.nombreproducto,
                    precioConDescuento
                  )}
                  target="_blank"
                >
                  <button className="button2 font-semibold mt-2 font-geist tex-xs md:text-2xl px-1 py-2">
                    Comprar ya
                  </button>
                </a>
              </div>
            </div>
          </div>

          <div className="my-20">
            <Marquee>
              {products.map((e) => (
                <div
                  key={e.nombreproducto}
                  className="flex flex-col items-center justify-center "
                >
                  <a href={e.slug}>
                    <div className="w-6/12 mx-5 ">
                      <img
                        src={e.imagesarray[0]}
                        alt=""
                        className="max-w-[200px]"
                      />
                    </div>
                    <div className="flex w-full justify-center  mt-5">
                      <p className="text-center uppercase  w-[200px]">
                        {e.nombreproducto}
                      </p>
                    </div>
                  </a>
                </div>
              ))}
            </Marquee>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
