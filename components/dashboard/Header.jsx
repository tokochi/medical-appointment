import SearchInput from "@components/inputs/SearchInput";
import SidebarToggle from "@components/buttons/SidebarToggle";
import HeaderButtons from "@components/buttons/HeaderButtons";

function Header() {
  return (
    <div className=' transition-colors duration-300'>
      <div className='container flex items-center gap-2 justify-between  w-full py-2  px-4'>
        <SidebarToggle />
        <div className='mx-auto'>
          <SearchInput placeholder='إبحث ...' />
        </div>
        <HeaderButtons />
      </div>
    </div>
  );
}

export default Header;
