import { useStore } from "@context/serverStore";
import CompanyForm from "@components/forms/settings/admin/CompanyForm";
import StoreInit from "@components/utils/StoreInit";

export default async function Company() {
  const { fetchCompany } = useStore.getState();
  const response = await fetchCompany();
  let data = null;
  if(response){ data = { companyInfo: JSON.stringify(response[0]) };}
  return (
    <div className='flex flex-col gap-4 md:p-4 w-full'>
      <h1 className='text-xl font-semibold grow '>المؤسســـــة</h1>
      {data?.companyInfo && <StoreInit {...data} />}
      <CompanyForm />
    </div>
  );
}
