import Hosp from "@components/cards/Hosp";
import Provinces from "@components/cards/Provinces";
import SearchHospInPage from "@components/forms/searchs/SearchHospInPage";
import SearchFaqInPage from "@components/forms/searchs/SearchFaqInPage";
import { useStore } from "@context/serverStore";
async function page() {
        const { fetchHosps } = useStore.getState();
  const hosps = await fetchHosps();
  return (
    <div className='bg-sky-100 dark:bg-primary'>
      <h1 id='title' className='font-bold text-clamp-2xl mx-2 p-2'>
        إبحث عن العيادات الصحية في ولايتك
      </h1>

      <div className='flex flex-wrap gap-2 p-2'>
        <div className='grow shrink basis-[20%] min-w-[280px] p-2'>
          <SearchHospInPage />
        </div>
        <div className='grow shrink basis-[50%] min-w-[280px]'>
          <div id='region' className='p-2 my-2'>
            <Provinces />
          </div>
          <div id='doct-cards' className='p-2 my-2'>
            <Hosp data={JSON.stringify(hosps)} />
          </div>
        </div>
        <div className='grow shrink basis-[20%] min-w-[280px] p-2'>
          <div>
            <h1 id='title' className='font-bold text-clamp-2xl mx-2 p-2'>
              أسئلة طبية
            </h1>
            <SearchFaqInPage />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
