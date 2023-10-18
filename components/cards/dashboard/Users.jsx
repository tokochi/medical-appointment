import { useStore } from "@context/serverStore";
async function Users() {
  const { fetchUsers } = useStore.getState();
  const users = await fetchUsers();
  return (
    <div className='grow md:max-w-[200px]'>
      <div className='card  rounded-xl shadow-md p-1.5 md:p-4 flex justify-around items-start gap-4'>
        <div className='p-1.5 md:p-4 bg-sky-200 rounded-xl'>
          <svg className='h-4 w-4 md:h-6 md:w-6 fill-sky-500'  viewBox='0 0 24 24'>
            <path
              d='M8 5 A 3 3 0 0 0 5 8 A 3 3 0 0 0 8 11 A 3 3 0 0 0 11 8 A 3 3 0 0 0 8 5 z M 16 5 A 3 3 0 0 0 13 8 A 3 3 0 0 0 16 11 A 3 3 0 0 0 19 8 A 3 3 0 0 0 16 5 z M 8 13C5 13 1 14.464 1 16.5L1 19L15 19L15 16.5C15 14.464 11 13 8 13 z M 16 13C15.683 13 15.353484 13.019781 15.021484 13.050781C16.203484 13.915781 17 15.059 17 16.5L17 19L23 19L23 16.5C23 14.464 19 13 16 13 z'
            />
          </svg>
        </div>

        <div className='md:text-xl'>
          <h1>المستخدميـــن</h1>
          <h1 className='font-bold text-center'>{users.length}</h1>
        </div>
      </div>
    </div>
  );
}

export default Users;
