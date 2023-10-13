"use client";
import React from "react";
import { useStore } from "@context/store";
import Image from "next/image";
import SearchDoctor from './SearchDoctorInTab';
import SearchPharm from './SearchPharmInTab';
import SearchHostp from './SearchHostpInTab';
import SearchLab from './SearchLabInTab';
import SearchFaq from './SearchFaqInTab';

function SearchForm() {
  const activeTab = useStore((state) => state.activeTab);
  const currentTab = useStore((state) => state.currentTab);
  function handleActiveTab(e) {
    const clickedId = e.target.getAttribute("id");
    useStore.setState({ currentTab: Number(clickedId) });
    const updatedTab = activeTab.map((tab) =>
      tab.id == clickedId ? { ...tab, active: true } : { ...tab, active: false }
    );
    useStore.setState({ activeTab: updatedTab });
  }
  return (
    <div className='relative'>
      <div id='tab-icons' className='flex  gap-2'>
        {activeTab.map((tab, index) => (
          <button
            key={index}
            onClick={(e) => handleActiveTab(e)}
            id={tab.id}
            className={`p-2 pl-4 text-clamp-sm mb-[-1px] flex gap-2 z-10 justify-center items-center rounded-tl-lg rounded-tr-lg ${
              tab.active &&
              "border-x-[1px] border-t-[1px] border-gray-400 bg-white dark:border-gray-700 dark:bg-inputDark"
            } `}>
            <Image id={tab.id} src={tab.icon} width={20} height={20} alt={tab.name} />
            <p
              id={tab.id}
              className={`${
                !tab.active && "hidden"
              } lg:inline-block font-semibold transition-all duration-150`}>
              {tab.name}
            </p>
          </button>
        ))}
      </div>
      <div
        id='inputs-form'
        className='bg-white border-[1px] relative border-gray-400 dark:border-gray-700 dark:bg-inputDark'>
        {currentTab === 0 && <SearchDoctor />}
        {currentTab === 1 && <SearchPharm />}
        {currentTab === 2 && <SearchLab />}
        {currentTab === 3 && <SearchHostp />}
        {currentTab === 4 && <SearchFaq />}
      </div>
    </div>
  );
};

export default SearchForm;
