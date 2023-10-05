"use client";;
import { useStore } from "@context/store";
import RadioInput from "@components/inputs/RadioInput";

function Appearance() {
  const { darkTheme, activites } = useStore();
    function toggleDark() {
      try {
        if (typeof window !== "undefined") {
          const value = JSON.parse(localStorage?.getItem("theme"));
          if (value === null) {
            localStorage?.setItem("theme", JSON.stringify(true));
            useStore.setState({ darkTheme: true });
          }
          localStorage?.setItem("theme", JSON.stringify(!value));
          useStore.setState({ darkTheme: !value });
        }
      } catch (error) {
        console.log("🚀 ~error localStorage");
      }
    }
 return (
   <div>
     <div
       id='personal-info'
       className='card rounded-md '>
       <div className='font-semibold p-2 px-2 border-b-[1px] border-gray-300 dark:border-gray-700'>
         المظهـــــر
       </div>
       <div className='p-2 flex flex-col gap-2 justify-center'>
         <div id='site' className='mt-4 flex gap-2 justify-between items-center grow'>
           <div className=''>
             <h1 className='font-semibold'>تغيير المظهــــر </h1>
             <span className='text-sm'>تغيير المظهــــر الى مظلـــم او منيــــــر</span>
           </div>
           <div className="flex gap-4 flex-wrap">
           <RadioInput
             name='dark'
             checked={darkTheme}
             onChange={(e) => toggleDark()}
             type='text'
             label='مظلـــم'
           />
           <RadioInput
             name='dark'
             checked={!darkTheme}
             onChange={(e) => toggleDark()}
             type='text'
             label='منيــــــر'
           /></div>
         </div>
         {/* <div className='font-semibold px-2 border-b-[1px] border-gray-300 dark:border-gray-700'></div> */}
       </div>
     </div>
   </div>
 );
}

export default Appearance;
