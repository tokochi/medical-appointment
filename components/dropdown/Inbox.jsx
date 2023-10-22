"use client";
import moment from "moment";
import { useStore } from "@context/store";
import "moment/locale/ar-dz";
moment().locale("ar-dz");
import { useRouter } from "next/navigation";
function Inbox() {
  const { dropDowns, session,setDropDowns, clearMessageNotifaction, deleteNotifaction } = useStore();
const router = useRouter();
  return (
    <div
      name='inbox'
      id='dropdown'
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={`absolute left-0 top-[35px] cursor-default z-[500] max-h-[300px] w-[230px] overflow-y-auto  ${
        !dropDowns?.inboxIsOpen && "hidden"
      } rounded-lg shadow  bg-cyan-900`}>
      <ul name='inbox' className=' text-sm text-gray-700 z-[500] dark:text-gray-200'>
        {session?.notificationsList?.filter((not) => not.type === "رسالة").length === 0 && (
          <li
            className={`card flex flex-col  gap-2 justify-center items-center rounded-lg  shadow p-1 mx-1 m-1  `}>
            لا يوجد رسائل
          </li>
        )}
        {session?.notificationsList
          ?.filter((not) => not.type === "رسالة")
          .map((message, index) => (
            <li
              key={index}
              onClick={() => {
                if (session.isDoctor) {
                  router.push("/doctor/inbox");
                }
                if (session.isUser) {
                  router.push("/user/inbox");
                }
                if (session.isAdmin) {
                  router.push("/admin/inbox");
                }
              }}
              className={`card cursor-pointer flex flex-col gap-2 justify-center items-center rounded-lg  shadow p-1 mx-1 m-1`}>
              <h2 className={`font-semibold text-right`}>
                <div
                  onClick={() => {
                    if (session.isDoctor) {
                      useStore.setState((state) => ({
                        session: {
                          ...state.session,
                          notificationsList: state.session.notificationsList.filter(
                            (item) => item._id != message._id
                          ),
                        },
                      }));
                      deleteNotifaction(session._id, "doctors", message._id);
                    }
                    if (session.isUser) {
                      useStore.setState((state) => ({
                        session: {
                          ...state.session,
                          notificationsList: state.session.notificationsList.filter(
                            (item) => item._id != message._id
                          ),
                        },
                      }));
                      deleteNotifaction(session._id, "users", message._id);
                    }
                    if (session.isAdmin) {
                      useStore.setState((state) => ({
                        session: {
                          ...state.session,
                          notificationsList: state.session.notificationsList.filter(
                            (item) => item._id != message._id
                          ),
                        },
                      }));
                      deleteNotifaction(session._id, "admins", message._id);
                    }
                  }}>
                  <svg
                    className='absolute cursor-pointer top-[-5px] right-[-6px] z-50 h-5 w-5'
                    viewBox='0 0 48 48'>
                    <path
                      d='M24,4C12.954,4,4,12.954,4,24c0,11.046,8.954,20,20,20c11.046,0,20-8.954,20-20C44,12.954,35.046,4,24,4z M31.561,29.439c0.586,0.586,0.586,1.535,0,2.121C31.268,31.854,30.884,32,30.5,32s-0.768-0.146-1.061-0.439L24,26.121l-5.439,5.439C18.268,31.854,17.884,32,17.5,32s-0.768-0.146-1.061-0.439c-0.586-0.586-0.586-1.535,0-2.121L21.879,24l-5.439-5.439c-0.586-0.586-0.586-1.535,0-2.121s1.535-0.586,2.121,0L24,21.879l5.439-5.439c0.586-0.586,1.535-0.586,2.121,0s0.586,1.535,0,2.121L26.121,24L31.561,29.439z'
                      fill='#7D7D7D'
                    />
                  </svg>
                </div>
                {message?.title}
              </h2>
              <div className='text-right'>
                <span className='text-green-600'>{message?.source}</span>
              </div>
              <span className={`block text-xs font-medium `}>
                {moment(message?.date).format("LLLL")}
              </span>
            </li>
          ))}
      </ul>
      {session?.notificationsList?.filter((not) => not.type === "رسالة").length > 0 && (
        <div className='p-1 sticky bottom-0 text-xs z-[100] bg-cyan-900'>
          <p
            onClick={() => {
              e.preventDefault();
              if (session.isDoctor) {
                useStore.setState((state) => ({
                  session: {
                    ...state.session,
                    inbox: [],
                  },
                }));
                clearMessageNotifaction(session._id, "doctors");
              }
              if (session.isUser) {
                useStore.setState((state) => ({
                  session: {
                    ...state.session,
                    inbox: [],
                  },
                }));
                clearMessageNotifaction(session._id, "users");
              }
              if (session.isAdmin) {
                useStore.setState((state) => ({
                  session: {
                    ...state.session,
                    inbox: [],
                  },
                }));
                clearMessageNotifaction(session._id, "admins");
              }
            }}
            className='rounded-lg p-1 w-1/2 mx-auto cursor-pointer btn'>
            مسح الكُّل
          </p>
        </div>
      )}
    </div>
  );
}

export default Inbox;
