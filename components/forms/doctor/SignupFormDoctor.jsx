"use client";
import dynamic from "next/dynamic";
import PreviewDoctorCard from "@components/cards/PreviewDoctorCard";
import SignupLayoutForm from "./SignupLayoutForm";
import Stepper from "./Stepper";
const LeafletMap = dynamic(() => import("@components/map/LeafletMap"), {
  ssr: false,
});

function SignupFormDoctor() {
  return (
    <div className='bg-gray-200 dark:bg-slate-800'>
      <div className=''>
        <h1 className='text-center font-bold text-lg py-2'>طلب التسجيل للممارسين الطبيين</h1>
      </div>
      <div className='p-4 flex items-start'>
        <div id='doctor-info' className='grow shrink basis-[64%] min-w-[280px]'>
          <SignupLayoutForm />
        </div>
        <div id='stepper' className='sticky top-0 p-4  grow shrink '>
          <Stepper />
        </div>
        <PreviewDoctorCard />
      </div>
    </div>
  );
}

export default SignupFormDoctor;
