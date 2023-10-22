"use client"
import ShowSignupConfirmation from '@components/forms/doctor/ShowSignupConfirmation';
import { useStore } from "@context/store";

function ConfirmeDoctorSignup({ data }) {
    const doctor = JSON.parse(data);
  return (
    <button
      onClick={() =>
        useStore.setState({
          modal: {
            isOpen: true,
            title: "تأكيد طلب التسجيل",
            children: <ShowSignupConfirmation doctor={doctor} />,
          },
        })
      }>
      <svg className='h-6 w-6 fill-yellow-400' viewBox='0 0 24 24'>
        <path d='M20,6h-8l-1.414-1.414C10.211,4.211,9.702,4,9.172,4H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8 C22,6.9,21.1,6,20,6z' />
      </svg>
    </button>
  );
}

export default ConfirmeDoctorSignup