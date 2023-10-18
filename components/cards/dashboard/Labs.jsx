import { useStore } from "@context/serverStore";
async function Labs() {
  const { fetchLabs } = useStore.getState();
  const labs = await fetchLabs();
  return (
    <div className='grow md:max-w-[200px]'>
      <div className='card  rounded-xl shadow-md p-1.5 md:p-4 flex justify-around items-start gap-4'>
        <div className='p-1.5 md:p-4 bg-purple-200 rounded-xl'>
          <svg
            className='h-4 w-4 md:h-6 md:w-6 fill-purple-500'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 48 48'>
            <path d='M29.482422 4.984375 A 1.50015 1.50015 0 0 0 28.439453 7.5605469L28.878906 8L5.9394531 30.939453C3.4332321 33.445674 3.4332321 37.554326 5.9394531 40.060547C8.4456742 42.566768 12.554326 42.566768 15.060547 40.060547L38 17.121094L38.439453 17.560547 A 1.50015 1.50015 0 1 0 40.560547 15.439453L35.792969 10.664062L30.560547 5.4394531 A 1.50015 1.50015 0 0 0 29.482422 4.984375 z M 31.001953 10.119141L33.671875 12.785156L35.880859 14.998047L29.878906 21L20.121094 21L31.001953 10.119141 z M 37 29.023438C36.58475 29.023438 36.170719 29.180094 35.886719 29.496094C35.243719 30.210094 32.039063 33.920672 32.039062 36.888672C32.039062 39.706672 34.264 42 37 42C39.736 42 41.960938 39.706672 41.960938 36.888672C41.960938 33.920672 38.757234 30.209094 38.115234 29.496094C37.831234 29.180094 37.41525 29.023438 37 29.023438 z' />
          </svg>
        </div>

        <div className='md:text-xl'>
          <h1>المختبرات</h1>
          <h1 className='font-bold text-center'>{labs.length}</h1>
        </div>
      </div>
    </div>
  );
}

export default Labs;
