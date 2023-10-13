import { useStore } from "@context/serverStore";
import CompanyForm from "@components/forms/settings/admin/CompanyForm";
import StoreInit from "@components/utils/StoreInit";



export default async function Company() {
  const { fetchCompany } = useStore.getState();
  const response = await fetchCompany();
  const data = { companyInfo: JSON.stringify(await fetchCompany()[0]) };
  return (
    <div className='flex flex-col gap-4 md:p-4 w-full'>
      <h1 className='text-xl font-semibold grow '>المؤسســـــة</h1>
      {data && <StoreInit {...data} />}
      <CompanyForm />
    </div>
  );
}
