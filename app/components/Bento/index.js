"use client";
import { cn } from "@/utils/cn";


 
import { BentoGrid, BentoGridItem } from "../ui/Bento-grid";

export function BentoGridThirdDemo() {
  return (
    <BentoGrid className="max-w-4xl mx-auto ">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          href={item.href}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn("[&>p:text-lg]", item.className)}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}

const SkeletonFour = () => {

  return (
<>
<div className='w-full flex justify-center h-full '>
<img src='/accesorios.jpeg' className='w-auto' alt=''/>
</div>
</>
  );
};

const items = [
  {
    title: "Bebes",
    description: (
      <span className="text-sm">
        Experience the power of AI in generating unique content.
      </span>
    ),
    header: <img src='/bebe.jpeg' alt=''/>,
    className: "md:col-span-1",
    icon:<></>,
    href:'/bebes'
  },
  {
    title: "Niños",
    description: (
      <span className="text-sm">
        Let AI handle the proofreading of your documents.
      </span>
    ),
    header: <img src='/nene.jpg' alt=''/>,
    className: "md:col-span-1",
    icon:<></>,
    href:'/nino'
  },
  {
    title: "Niñas",
    description: (
      <span className="text-sm">
        Get AI-powered suggestions based on your writing context.
      </span>
    ),
    header: <img src='/nena.jpeg' alt=''/>,
    className: "md:col-span-1",
    icon:<></>,
    href:'/nina'
  },
  {
    title: "Accesorios",
    description: (
      <span className="text-sm">
        Understand the sentiment of your text with AI analysis.
      </span>
    ),
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon:<></>,
    href:'/accesorios'
  },


  {
    title: "Fuera de temporada",
    description: (
      <span className="text-sm">
        Summarize your lengthy documents with AI technology.
      </span>
    ),
    header: <img src='/fuera.jpeg' className='h-full' alt=''/>,
    className: "md:col-span-1",
    icon:<></>,
    href:'/noestacional'
  },
];
