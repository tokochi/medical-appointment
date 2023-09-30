import { create } from "zustand";
import { v4 } from "uuid";
import { wilaya, daira, commune, userDefault, doctorDefault, pharmDefault, hospDefault, labDefault, relatedWorks, medicalSpecialties, specialities, titles, labs, pharms, hosp, visitArg, worksPharms, worksLabs, searchTabs, questions, specilatiyHosp, sectionWork } from "@utils/data.js";

export const useStore = create((set, get) => ({
  //************** General *************/
  darkTheme: true,
  dir: "rtl",
  modal: { isOpen: false, title: "", content: "", children: null, textBtn_1: "", textBtn_2: "", onClickBtn_1: null, onClickBtn_2: null },
  modalClosed: { isOpen: false, title: "", content: "", children: null, onClickBtn_1: null, onClickBtn_2: null },
  sidebarOpen: false,
  activeTab: searchTabs,
  currentTab: 0,
  isLoading: false,
  gridRefresh: false,
  closeModelAnywhere: (e) => {
    if (get().modal.isOpen === true && e.target.getAttribute("name") == "modal") { set(({ modal: get().modalClosed })) }
  },
  setStoreProps: (props) => {
    // Parse JSON strings before setting them in the state
    const parsedProps = {};
    for (const prop in props) {
      if (Object.prototype.hasOwnProperty.call(props, prop)) {
        parsedProps[prop] =
          typeof props[prop] === 'string' ? JSON.parse(props[prop]) : props[prop];
      }
    }

    set((state) => ({
      ...state,
      ...parsedProps,
    }));
  },
  //************** Static Data *************/
  medicalSpecialties,
  specialities,
  relatedWorks,
  specilatiyHosp,
  titles,
  wilaya,
  daira,
  commune,
  sectionWork,
  visitArg,
  specilatiyHosp,
  worksPharms,
  worksLabs,
  //************** Genral Form *************/
  isRulesChecked: { first: false, seconde: false },
  loadingSppiner: {
    avatar: false,
    officePics: false,
    proofPics: false,
  },
  uploadDone: {
    avatar: "",
    officePics: "",
    proofPics: "",
  },
  handleRulesCheckbox: (event) => {
    const nameAttribtue = event.target.getAttribute("name").split(".")

    set((state) => ({
      isRulesChecked: {
        ...state.isRulesChecked,
        [nameAttribtue[1]]: event.target.checked
      },
    }));
  },
  handleCheckbox: (event, keyValue) => {
    const nameAttribtue = event.target.getAttribute("name").split(".");
    nameAttribtue.length > 1
      ? set((state) => ({
        [keyValue]: {
          ...state[keyValue],
          [nameAttribtue[0]]: {
            ...state[keyValue][nameAttribtue[0]],
            [nameAttribtue[1]]: event.target.checked
          },
        },
      }))
      : set((state) => ({
        [keyValue]: {
          ...state[keyValue],
          [nameAttribtue[0]]: event.target.checked
        },
      }));
  },
  uploadImage: (e, ref, uploadBytes, getDownloadURL, storage, imagePath, keyValue) => {
    const images = e.target.files;
    if (!images.length) return;
    set((prev) => ({ loadingSppiner: { ...prev, [e.target.getAttribute("name")]: true } }));
    const uploadPromises = [];
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      let path = imagePath + image.name + v4();
      const imageRef = ref(storage, path);
      const uploadPromise = uploadBytes(imageRef, image)
        .then(() => {
          return getDownloadURL(imageRef);
        })
        .then((downloadURL) => {
          return downloadURL;
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          return null; // Handle the error as needed
        });

      uploadPromises.push(uploadPromise);
    }

    Promise.all(uploadPromises)
      .then((downloadURLs) => {
        set((state) => ({
          [keyValue]: { ...state[keyValue], [e.target.getAttribute("name")]: [...downloadURLs, ...state[keyValue][e.target.getAttribute("name")]] },
        }));
        set((prev) => ({ loadingSppiner: { ...prev, [e.target.getAttribute("name")]: false } }));
        set((prev) => ({ uploadDone: { ...prev, [e.target.getAttribute("name")]: "success" } }));
      })
      .catch((error) => {
        set((prev) => ({ loadingSppiner: { ...prev, [e.target.getAttribute("name")]: false } }));
        set((prev) => ({ uploadDone: { ...prev, [e.target.getAttribute("name")]: "error" } }));
        console.error("Error getting download URLs:", error);
      });
  },
  handleInputChange: (event, keyValue) => {
    const nameAttribtue = event.target.getAttribute("name").split(".");
    nameAttribtue.length > 1
      ? set((state) => ({
        errorPassword: false,
        errorAdminKey: false,
        [keyValue]: {
          ...state[keyValue],
          [nameAttribtue[0]]: {
            ...state[keyValue][nameAttribtue[0]],
            [nameAttribtue[1]]: event.target.value
          },
        },
      }))
      : set((state) => ({
        [keyValue]: {
          ...state[keyValue],
          [nameAttribtue[0]]: event.target.value
        },
      }));
  },
  handleSelectInput: (event, keyValue) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedText = event.target.options[selectedIndex].text;
    const nameAttribtue = event.target.getAttribute("name").split(".");
    nameAttribtue.length > 1
      ? set((state) => ({
        [keyValue]: {
          ...state[keyValue],
          [nameAttribtue[0]]: {
            ...state[keyValue][nameAttribtue[0]],
            [nameAttribtue[1]]: { value: event.target.value, text: selectedText },
          },
        },
      }))
      : set((state) => ({
        [keyValue]: {
          ...state[keyValue],
          [nameAttribtue[0]]: { value: event.target.value, text: selectedText },
        },
      }));
  },
  fetchToGrid: (url) => {
    switch (true) {
      case url.includes("doctors"):
        get().fetchDoctors()
        break;
      case url.includes("users"):
        get().fetchUsers()
        break;
      case url.includes("admins"):
        get().fetchAdmins()
        break;
      case url.includes("labs"):
        get().fetchLabs()
        break;
      case url.includes("pharms"):
        get().fetchPharms()
        break;
      case url.includes("hosps"):
        get().fetchHosps()
        break;
    }
  },
  handleAddGrid: async (e, toast, url) => {
    e.preventDefault();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(get().doctorInfo),
    });
    if (response.ok) {
      toast.success("تم تسجيل المستخدم بنجاح", { duration: 3000 });
      get().fetchToGrid(url)
    } else {
      toast.error("فشلت عملية تسجيل المستخدم", response);
    }
    set({
      modal: get().modalClosed, doctorInfo: doctorDefault, uploadDone: {
        avatar: "",
        officePics: "",
        proofPics: "",
      },
    });
  },
  handleDeleteGrid: async (e, toast, url) => {
    e.preventDefault();
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (response.ok) {
      toast.success("تم حذف المستخدم بنجاح", { duration: 5000 });
      get().fetchToGrid(url)
    } else {
      toast.error("فشلت عملية حذف المستخدم", { duration: 5000 });
    }
    set({ modal: get().modalClosed });
  },
  handleEditGrid: async (e, toast, url) => {
    e.preventDefault();
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(get().doctorInfo),
    });
    if (response.ok) {
      toast.success("تم تعديل المستخدم بنجاح", { duration: 5000 });
      get().fetchToGrid(url)
    } else {
      toast.error("فشلت عملية تسجيل المستخدم", { duration: 5000 });
    }
    set({
      modal: get().modalClosed, doctorInfo: doctorDefault, uploadDone: {
        avatar: "",
        officePics: "",
        proofPics: "",
      },
    });
  },
  //************** Doctor Form *************/
  doctorInfo: doctorDefault,
  setWorkTime: (e) =>
    set((state) => ({
      doctorInfo: {
        ...state.doctorInfo, workTime: state.doctorInfo.workTime.map((date) =>
          date.day === e.target.getAttribute("day")
            ? { ...date, [e.target.getAttribute("name")]: e.target.value }
            : date
        ),
      },
    })),
  setteperBtn: {
    btn_1: true,
    btn_2: false,
    btn_3: false,
    btn_4: false,
    btn_5: false,
  },
  handleStepperButtonClick: (btn) => {
    const updatedButtons = Object.keys(get().setteperBtn).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {});
    updatedButtons[btn] = true;
    set({ setteperBtn: updatedButtons });
  },
  handleSelectSpecialities: (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedText = event.target.options[selectedIndex].text;
    // const selectedValue = event.target.options[selectedIndex].value;
    set((state) => ({
      doctorInfo: {
        ...state.doctorInfo,
        specialities: [
          ...state.doctorInfo.specialities,
          { text: selectedText, value: event.target.value },
        ],
      },
    }));
  },
  removeSelectSpecialities: (event) => {
    event.preventDefault();
    const clickedElement = event.target.getAttribute("name");
    const filtredArray = get().doctorInfo.specialities.filter(
      (speciality) => speciality.text !== clickedElement
    );
    set((state) => ({
      doctorInfo: {
        ...state.doctorInfo,
        specialities: filtredArray,
      },
    }));
  },
  removeSelectService: (event) => {
    event.preventDefault();
    const clickedElement = event.target.getAttribute("name");
    const filtredArray = get().doctorInfo.services.filter((service) => service.text !== clickedElement);
    set((state) => ({
      doctorInfo: {
        ...state.doctorInfo,
        services: filtredArray,
      },
    }));
  },
  handleSubmitDoctors: async (e, toast, router, signIn) => {
    e.preventDefault();
    if (!get().isRulesChecked.first && !get().isRulesChecked.seconde) {
      return toast.error("يرجى موافقة على الشروط");
    }
    const response = await fetch("/api/doctors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(get().doctorInfo),
    });
    if (response.ok) {
      toast.success("تم تسجيل المستخدم بنجاح", { duration: 3000 });
      const response = await signIn("credentials", { ...get().doctorInfo, type: "doctor", redirect: false });
      if (response?.ok && !response?.error) {
        router.push("/doctors/dashboard");
      } else {
        toast.error("فشلت عملية تسجيل دخول المستخدم", response?.error);
      }
    } else {
      toast.error("فشلت عملية تسجيل المستخدم", response);
    }
    set({ doctorInfo: doctorDefault, isRulesChecked: { first: false, seconde: false } });
  },
  addedSpeciality: "",
  addedService: "",
  personalInfo_ref: null,
  workInfo_ref: null,
  geoInfo_ref: null,
  workSchedule_ref: null,
  documentsUpload_ref: null,
  //************** Admin Form *************/
  adminInfo: {
    email: "",
    password: "",
    verifyPassword: "",
    name: "",
    gender: "male",
    phone: "",
    adminKey: "",
  },
  pathNameLogin: "login",
  errorPassword: false,
  errorAdminKey: false,
  handleSubmitAdminLogin: async (e, toast, router, signIn) => {
    e.preventDefault();
    const response = await signIn("admin-login", { ...get().adminInfo, type: "admin", redirect: false });
    if (response?.ok && !response?.error) {
      toast.success("تم تسجيل دخول المستخدم بنجاح");
      set({ adminInfo: { email: "", password: "" } });
      router.push("/admin");
    } else {
      toast.error(response?.error);
    }
  },
  handleSubmitAdminSignup: async (e, toast, router, signIn) => {
    e.preventDefault();
    if (!get().adminInfo.password || get().adminInfo.verifyPassword !== get().adminInfo.password) {
      return set({ errorPassword: true });
    }
    const response = await fetch("/api/admins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(get().adminInfo),
    });
    if (response.ok) {
      toast.success("تم تسجيل المستخدم بنجاح");
      const response = await signIn("admin-login", { ...get().adminInfo, type: "admin", redirect: false });
      if (response?.ok && !response?.error) {
        set({
          adminInfo: {
            email: "",
            password: "",
            verifyPassword: "",
            name: "",
            gender: "male",
            phone: "",
            adminKey: "",
          }
        });
        router.push("/admin");
      } else {
        toast.error(response?.error);
      }
    } else {
      toast.error("فشلت عملية تسجيل المستخدم");
    }
  },

  //************** Question Form *************/
  askQuestion: {
    title: "",
    text: "",
    speciality: {},
    response: "",
    author: "",
    details: { weight: 85, length: 180 },
  },
  handleSubmitQuestion: async (e, toast) => {
    e.preventDefault();
    const response = await fetch("/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(get().askQuestion),
    });
    if (response.ok) {
      toast.success("  تم تقديم سؤالك بنجاح");
      set({ modal: modalClosed });
      //   router.push("/questions");
    } else {
      toast.error("حدث خطأ في تقديم سؤالك", response);
    }
  },
  //************** User Form *************/
  userInfo: userDefault,
  handleSubmitUserSignup: async (e, toast, router, signIn) => {
    e.preventDefault();
    if (!get().userInfo.password || get().userInfo.verifyPassword !== get().userInfo.password) {
      return set({ errorPassword: true });
    }
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(get().userInfo),
    });
    if (response.ok) {
      toast.success("تم تسجيل المستخدم بنجاح");
      const response = await signIn("user-login", { ...get().userInfo, type: "user", redirect: false });
      if (response?.ok && !response?.error) {
        set({
          userInfo: {
            email: "",
            password: "",
            verifyPassword: "",
            name: "",
            gender: "male",
            phone: "",
          }
        });
        router.push("/user/dashboard");
      } else {
        toast.error(response?.error);
      }
    } else {
      toast.error("فشلت عملية تسجيل المستخدم");
    }
  },
  //************** Pharm Form *************/
  pharmInfo: pharmDefault,
  //************** Hosp Form *************/
  hospInfo: hospDefault,
  //************** Lab Form *************/
  LabInfo: labDefault,
  //************** Session *************/
  session: null,
  currentUser: null,
  currentDoctor: null,
  currentAdmin: null,
  selectedPost: {},
  selectedDoctor: {},
  selectedQuestion: {},
  questions,
  //************** Fetch *************/
  users: [],
  doctors: [],
  admins: [],
  labs: [],
  pharms: [],
  hospitals: [],
  posts: [],
  question: [],
}));


