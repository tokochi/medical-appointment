import { useStore } from "@context/serverStore";

function Provinces() {
  const { wilaya } = useStore.getState();
  return (
    <div className='flex flex-wrap gap-2'>
      {wilaya.slice(0, 10).map((region, index) => (
        <button
          key={index}
          className='p-1 px-2  bg-slate-200 text-sm rounded-[163px] text-gray-900 dark:text-gray-300 dark:bg-inputDark hover:bg-slate-400 font-medium'>
          <p>{region.text}</p>
        </button>
      ))}
      <button className='hover:text-sky-500 text-sm'>عرض المزيد ...</button>
    </div>
  );
}

export default Provinces;
