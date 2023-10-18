import { useStore } from "@context/serverStore";
async function Hospitals() {
  const { fetchHosps } = useStore.getState();
  const hosps = await fetchHosps();
  return (
    <div className='grow md:max-w-[200px]'>
      <div className='card  rounded-xl shadow-md p-1.5 md:p-4 flex justify-around items-start gap-4'>
        <div className='p-1.5 md:p-4 bg-red-200 rounded-xl'>
          <svg
            className='h-4 w-4 md:h-6 md:w-6 fill-red-500'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 48 48'>
            <path d='M39.142,15.52L24.929,4.321c-0.545-0.428-1.313-0.428-1.857,0L8.859,15.52C7.042,16.951,6,19.099,6,21.411V37.5c0,3.032,2.468,5.5,5.5,5.5h25c3.032,0,5.5-2.468,5.5-5.5V21.411C42,19.099,40.958,16.951,39.142,15.52z M18,28c-0.828,0-1.5-0.672-1.5-1.5S17.172,25,18,25h4.5v-4.5c0-0.828,0.672-1.5,1.5-1.5s1.5,0.672,1.5,1.5V25H30c0.828,0,1.5,0.672,1.5,1.5S30.828,28,30,28h-4.5v4.5c0,0.828-0.672,1.5-1.5,1.5s-1.5-0.672-1.5-1.5V28H18z' />
          </svg>
        </div>

        <div className='md:text-xl'>
          <h1>المستشفيات</h1>
          <h1 className='font-bold text-center'>{hosps.length}</h1>
        </div>
      </div>
    </div>
  );
}

export default Hospitals;
