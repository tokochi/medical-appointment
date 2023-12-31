import Pharms from "@components/cards/Pharms";
import Provinces from "@components/cards/Provinces";
import SearchPharmInPage from "@components/forms/searchs/SearchPharmInPage";
import SearchFaqInPage from "@components/forms/searchs/SearchFaqInPage";
import { useStore } from "@context/serverStore";

export const Metadata = {
  title: "قائمة الصيديلات",
  description: "صحتي تاجي",
};

async function page() {
    const { fetchPharms } = useStore.getState();
  const pharms = await fetchPharms();
  return (
    <div className='bg-sky-100 dark:bg-primary'>
      <h1 id='title' className='font-bold text-clamp-2xl mx-2 p-2'>
        إبحث عن الصيدلية الأقرب إليك
      </h1>

      <div className='flex flex-wrap gap-2 p-2'>
        <div className='grow shrink basis-[20%] min-w-[280px] p-2'>
          <SearchPharmInPage />
        </div>
        <div className='grow shrink basis-[50%] min-w-[280px]'>
          <div id='region' className='p-2 my-2'>
            <Provinces />
          </div>
          <div id='doct-cards' className='p-2 my-2'>
            <Pharms data={JSON.stringify(pharms)} />
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
