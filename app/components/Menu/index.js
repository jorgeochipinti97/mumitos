"use client";

import Link from "next/link";
import { useState } from "react";
import { MagicTabSelect } from "react-magic-motion";

const underlineTabs = [
  "Inicio",
  "Bebes",
  "Niño",
  "Niña",
  "Accesorios",
  "Liquidación",
];

export const MenuComponent = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const tabsComponents = underlineTabs.map((text, i) => {
    return (
      <button
        type="button"
        key={`tab-${text}`}
        onClick={() => setSelectedIndex(i)}
        className="rounded-xl hover:opacity-[0.8]"
        style={{
          padding: "0.65rem 0.75rem",
          backgroundColor: "rgba(238, 238, 238)",
          border: 0,
          cursor: "pointer",
        }}
      >
        <Link href={text == 'Inicio' && '/' || text =='Bebes' &&  "/bebes" || text == 'Niño' && '/nino' || text == 'Niña' && "/nina" || text == "Accesorios" && "/accesorios" || text == "Liquidación" && "/noestacional"}>
          {text}

          {selectedIndex === i && (
            <div style={{ position: "relative", transform: "translateY(3px)" }}>
              <MagicTabSelect
                id="underline"
                transition={{ type: "spring", bounce: 0.3 }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "0.15rem",
                    backgroundColor: "black",
                    position: "absolute",
                  }}
                />
              </MagicTabSelect>
            </div>
          )}
        </Link>
      </button>
    );
  });

  return (
    <div className="my-2 hidden md:flex" style={{ gap: "0.5rem" }}>
      {tabsComponents}
    </div>
  );
};
