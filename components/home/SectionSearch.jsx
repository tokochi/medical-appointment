"use client";
import { useStore } from "@context/store";
import Link from "next/link";
import Image from "next/image";
import SearchForm from "../forms/searchs/SearchForm";

function SectionSearch() {
  const activeTab = useStore((state) => state.activeTab);
  return (
    <div className='w-full p-2  flex flex-wrap justify-center '>
      <div className='basis2 w-full '>
        {activeTab.map((tab) => (
          <div key={tab.id} className={`${tab.active ? "pl-2" : "hidden"}  `}>
            <div id='head' className='h-32 mb-2 px-2 w-full'>
              <div id='headText' className=''>
                <h1 className='font-bold text-clamp-2xl mx-2 '> {tab.title} </h1>
                <h2 className=' text-clamp-xl leading-normal m-2'>{tab.desc}</h2>
              </div>
            </div>
            <div id='form' className='m-2'>
              <SearchForm />
            </div>
          </div>
        ))}
      </div>

      <div id='hero-img' className='basis2'>
        <Image className='mx-auto' src='/images/hero-3.webp' width={350} height={350} alt='hero' />
      </div>
    </div>
  );
};

export default SectionSearch;
