import SectionSearch from "@components/SectionSearch";
import SectionSpecialties from "@components/SectionSpecialties";
import SectionWhyUs from "@components/SectionWhyUs";
import SectionWorks from "@components/SectionWorks";
import SectionBlog from "@components/SectionBlog";


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
