import RelatedWoks from "@components/cards/RelatedWoks";
import FindYourAnswer from "@components/cards/FindYourAnswer";
import { useStore } from "@context/serverStore";
import ShowAppoint from "@components/cards/ShowAppoint";
import RelatedSections from "@components/cards/RelatedSections";
import RelatedPosts from "@components/cards/RelatedPosts";

async function page({ params }) {
  const { fetchAppointment, fetchDoctor } = useStore.getState();
  const appointment = await fetchAppointment(params?.id);
  const doctor = await fetchDoctor(appointment?.doctor);
  return (
    <div className='bg-sky-50 dark:bg-primary'>
      <h1 id='title' className='font-bold text-clamp-2xl mx-2 p-2'>
        موعدك الطبي
      </h1>
      <div className='flex flex-wrap gap-2 p-2'>
        <div className='grow shrink basis-[20%] min-w-[280px] p-2'>
          <FindYourAnswer />
          <RelatedWoks />
        </div>
        <div className='grow shrink basis-[50%] min-w-[280px]'>
          <ShowAppoint appointment={appointment} doctor={doctor} />
        </div>
        <div className='grow shrink basis-[20%] min-w-[280px] p-2'>
          <div>
            <RelatedSections />
            <RelatedPosts />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
