import SectionSearch from "@components/home/SectionSearch";
import SectionSpecialties from "@components/home/SectionSpecialties";
import SectionWhyUs from "@components/home/SectionWhyUs";
import SectionWorks from "@components/home/SectionWorks";
import SectionBlog from "@components/home/SectionBlog";


export default function Home() {

  return (
    <div className='bg-gradient-to-l from-gray-200 via-cyan-200 to-cyan-600 dark:bg-gradient-to-b dark:from-[#002b3d] dark:to-slate-900'>
      <div className="">
      <SectionSearch />
      <SectionWhyUs />
      <SectionSpecialties />
      <SectionWorks />
        <SectionBlog />
      </div>
    </div>
  );
}
