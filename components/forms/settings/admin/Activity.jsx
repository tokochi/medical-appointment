"use client";
import { useStore } from "@context/store";
import moment from "moment";
import "moment/locale/ar-dz";
moment().locale("ar-dz");
function Activity() {
  const { activity } = useStore();
  return (
    <div>
      <div id='personal-info' className='card rounded-md overflow-x-auto overflow-y-hidden p-2'>
        <table className='table-auto text-sm w-full divide-slate-200 '>
          <thead
            className={` sticky top-0  uppercase  text-center dark:text-slate-100 text-slate-800 `}>
            <tr>
              <th className='p-1 '>
                <div className='font-semibold text-center'>الرمز</div>
              </th>
              <th className='p-1 '>
                <div className='font-semibold text-center'>الوقت</div>
              </th>
              <th className='p-1  '>
                <div className='font-semibold text-center'>النوع</div>
              </th>
              <th className='p-1 '>
                <div className='font-semibold text-center'>النشاط</div>
              </th>
              <th className='p-1 '>
                <div className='font-semibold text-center'>المستخدم</div>
              </th>
              <th className='p-1 '>
                <div className='font-semibold text-center'>من طرف</div>
              </th>
              <th className='p-1 '>
                <div className='font-semibold text-center'>العملية</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {activity?.reverse()?.map((db, index) => (
              <tr
                key={index}
                className={`${index & (1 === 1) && "bg-[#cbd5e1] dark:bg-slate-700"} `}>
                <td className='text-center p-2 truncate'>#{index + 1}</td>
                <td className='text-right p-2 max-w-[80px] truncate '>
                  📆 {moment(db?.date).format("LLL")}
                </td>
                <td className='text-center p-2 max-w-[120px] truncate'>{db?.type}</td>
                <td className='text-center p-2  truncate'>
                  {db?.action === "حـــذف" && (
                    <p className='capitalize text-center rounded-3xl px-1 bg-rose-100 text-rose-500'>
                      {db?.action}
                    </p>
                  )}
                  {db?.action === ("إضــافة" || "تسجيل") && (
                    <p className='capitalize text-center rounded-3xl px-1 bg-emerald-100 text-emerald-600'>
                      {db?.action}
                    </p>
                  )}
                  {db?.action === "تعـديل" && (
                    <p className='capitalize text-center rounded-3xl px-1 bg-amber-100 text-sky-600'>
                      {db?.action}
                    </p>
                  )}
                </td>
                <td className='text-center p-2 max-w-[120px] truncate capitalize'>{db?.source}</td>
                <td className='text-center p-2 w-1/8 truncate capitalize'>
                  {db?.from?.name || "المستخدم"}
                </td>
                <td className='text-center p-2  truncate'>
                  {db?.status === "لم تتــم" && (
                    <p className='capitalize text-center rounded-3xl px-1 bg-rose-100 text-rose-500'>
                      {db?.status}
                    </p>
                  )}
                  {db?.status === "تمت" && (
                    <p className='capitalize text-center rounded-3xl px-1 bg-emerald-100 text-emerald-600'>
                      {db?.status}
                    </p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Activity;
