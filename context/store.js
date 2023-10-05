import { create } from "zustand";
import { v4 } from "uuid";
import { wilaya, daira, commune, userDefault, companyDefault, doctorDefault, pharmDefault, hospDefault, labDefault, relatedWorks, medicalSpecialties, specialities, titles, labs, pharms, hosp, visitArg, worksPharms, worksLabs, searchTabs, questions, specilatiyHosp, sectionWork } from "@utils/data.js";

export const useStore = create((set, get) => ({
  //************** General *************/
  darkTheme: true,
  dir: "rtl",
  modal: { isOpen: false, title: "", content: "", children: null, textBtn_1: "", textBtn_2: "", onClickBtn_1: null, onClickBtn_2: null },
  modalClosed: { isOpen: false, title: "", content: "", children: null, onClickBtn_1: null, onClickBtn_2: null },
  notification: { isOpen: false },
  sidebarOpen: false,
  activeTab: searchTabs,
  currentTab: 0,
  isLoading: false,
  completed: false,
  gridRefresh: false,
  activity: [],
  editedPost: {
    text: "", image: "/images/logo.png", speciality:{},title:""
},
  closeModelAnywhere: (e) => {
    if (get().modal.isOpen === true && e.target.getAttribute("name") == "modal") { set(({ modal: get().modalClosed })) }
    if (get().notification.isOpen === true && e.target.getAttribute("name") !== "notification") { set(({ notification: { isOpen: false } })) }
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
    image: false,
    officePics: false,
    proofPics: false,
  },
  uploadDone: {
    avatar: "",
    image: "",
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
      let path = imagePath + image.name;
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
  uploadSingleImage: (e, ref, uploadBytes, getDownloadURL, storage, imagePath, keyValue) => {
    const image = e.target.files[0];
    if (!image) return;
    set((prev) => ({ loadingSppiner: { ...prev, [e.target.getAttribute("name")]: true } }));
      let path = imagePath + image.name;
      const imageRef = ref(storage, path);
      uploadBytes(imageRef, image)
        .then(() => {
          return getDownloadURL(imageRef);
        })
        .then((downloadURL) => {
          set((state) => ({
            [keyValue]: { ...state[keyValue], [e.target.getAttribute("name")]: downloadURL },
          }));
          set((prev) => ({ loadingSppiner: { ...prev, [e.target.getAttribute("name")]: false } }));
          set((prev) => ({ uploadDone: { ...prev, [e.target.getAttribute("name")]: "success" } }));
        })
        .catch((error) => {
          set((prev) => ({ loadingSppiner: { ...prev, [e.target.getAttribute("name")]: false } }));
          set((prev) => ({ uploadDone: { ...prev, [e.target.getAttribute("name")]: "error" } }));
          console.error("Error uploading image:", error);
          return null; // Handle the error as needed
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
  handleAddGrid: async (e, toast, url, keyValue) => {
    e.preventDefault();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(get()[keyValue]),
    });
    let type;
    const email = get()[keyValue]?.email
    const name = get()[keyValue]?.name
    switch (true) {
      case url.includes("doctors"):
        type = "طبيب"
        break;
      case url.includes("users"):
        type = "مستخدم"
        break;
      case url.includes("admins"):
        type = "مشرف"
        break;
      case url.includes("labs"):
        type = "مختبر"
        break;
      case url.includes("pharms"):
        type = "صيديلة"
        break;
      case url.includes("hosps"):
        type = "عيادة"
        break;
    }

    if (response.ok) {
      get().addActivity("إضــافة", type, email || name, "تمت", "المشرف")
      toast.success("تم تسجيل المستخدم بنجاح", { duration: 3000 });
      get().fetchToGrid(url)
    } else {
      get().addActivity("إضــافة", type, email || name, "لم تتــم", "المشرف")
      toast.error("فشلت عملية تسجيل المستخدم", response);
    }
    set({
      modal: get().modalClosed,
      doctorInfo: doctorDefault,
      userInfo: userDefault,
      pharmInfo: pharmDefault,
      labInfo: labDefault,
      hospInfo: hospDefault,
      uploadDone: {
        avatar: "",
        officePics: "",
        proofPics: "",
      },
    });
  },
  handleDeleteGrid: async (e, toast, url, keyValue) => {
    e.preventDefault();
    const response = await fetch(url, {
      method: "DELETE",
    });
    let type;
    const email = get()[keyValue]?.email
    const name = get()[keyValue]?.name
    switch (true) {
      case url.includes("doctors"):
        type = "طبيب"
        break;
      case url.includes("users"):
        type = "مستخدم"
        break;
      case url.includes("admins"):
        type = "مشرف"
        break;
      case url.includes("labs"):
        type = "مختبر"
        break;
      case url.includes("pharms"):
        type = "صيديلة"
        break;
      case url.includes("hosps"):
        type = "عيادة"
        break;
    }
    if (response.ok) {
      get().addActivity("حـــذف", type, email || name, "تمت", "المشرف")
      toast.success("تم حذف المستخدم بنجاح", { duration: 5000 });
      get().fetchToGrid(url)
    } else {
      get().addActivity("حـــذف", type, email || name, "لم تتــم", "المشرف")
      toast.error("فشلت عملية حذف المستخدم", { duration: 5000 });
    }
    set({ modal: get().modalClosed });
  },
  handleEditGrid: async (e, toast, url, keyValue) => {
    e.preventDefault();
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(get()[keyValue]),
    });
    let type;
    const email = get()[keyValue]?.email
    const name = get()[keyValue]?.name
    switch (true) {
      case url.includes("doctors"):
        type = "طبيب"
        break;
      case url.includes("users"):
        type = "مستخدم"
        break;
      case url.includes("admins"):
        type = "مشرف"
        break;
      case url.includes("labs"):
        type = "مختبر"
        break;
      case url.includes("pharms"):
        type = "صيديلة"
        break;
      case url.includes("hosps"):
        type = "عيادة"
        break;
    }
    if (response.ok) {
      get().addActivity("تعـديل", type, email || name, "تمت", "المشرف")
      toast.success("تم تعديل المستخدم بنجاح", { duration: 5000 });
      get().fetchToGrid(url)
    } else {
      get().addActivity("تعـديل", type, email || name, "لم تتــم", "المشرف")
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
  addSelectAdmin: (event, keyValue) => {
    event.preventDefault();
    get().addedAdmins !== "" &&
      useStore.setState((state) => ({
        [keyValue]: {
          ...state[keyValue],
          admins: [...state[keyValue]?.admins, get().addedAdmins],
        },
      }));
    set({ addedAdmins: "" });
  },
  removeSelectAdmin: (event, keyValue) => {
    event.preventDefault();
    const clickedElement = event.target.getAttribute("name");
    const filtredArray = get()[keyValue].admins.filter((admin) => admin !== clickedElement);
    set((state) => ({
      [keyValue]: {
        ...state[keyValue],
        admins: filtredArray,
      },
    }));
  },
  removeSelectAvatar: (event, keyValue) => {
    event.preventDefault();
    const clickedElement = event.target.getAttribute("name");
    const filtredArray = get()[keyValue].avatar.filter((pic) => pic !== clickedElement);
    set((state) => ({
      [keyValue]: {
        ...state[keyValue],
        avatar: filtredArray,
      },
    }));
  },
  
  handleSelectSpecialities: (event, keyValue) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedText = event.target.options[selectedIndex].text;
    // const selectedValue = event.target.options[selectedIndex].value;
    set((state) => ({
      [keyValue]: {
        ...state[keyValue],
        specialities: [
          ...state[keyValue].specialities,
          { text: selectedText, value: event.target.value },
        ],
      },
    }));
  },
  removeSelectSpecialities: (event, keyValue) => {
    event.preventDefault();
    const clickedElement = event.target.getAttribute("name");
    const filtredArray = get()[keyValue].specialities.filter(
      (speciality) => speciality.text !== clickedElement
    );
    set((state) => ({
      [keyValue]: {
        ...state[keyValue],
        specialities: filtredArray,
      },
    }));
  },
  removeSelectService: (event, keyValue) => {
    event.preventDefault();
    const clickedElement = event.target.getAttribute("name");
    const filtredArray = get()[keyValue].services.filter((service) => service.text !== clickedElement);
    set((state) => ({
      [keyValue]: {
        ...state[keyValue],
        services: filtredArray,
      },
    }));
  },
  addActivity: async (action, type, source, status, from) => {
    const response = await fetch("/api/activity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action,
        type,
        source,
        status,
        from,
      }),
    }
    );

    if (response.ok) {
      const responseData = await response.json();
      get().addNotifaction(responseData)
      // Parse the response body as JSON
      // console.log("🚀 ~🚀 ~ Activity Added:", responseData);
    } else {
      // console.log("🚀 ~🚀 ~ error adding activity:", response)
    }
  },
  addedAdmins: "",
  addNotifaction: async (data) => {
    const admins = await get().fetchAdmins()
    admins.forEach(async (admin) => {
      const canAddNotification =
        (data?.type === "مستخدم" && admin?.notifications?.users) ||
        (data?.type === "طبيب" && admin?.notifications?.doctors) ||
        (data?.type === "سؤال" && admin?.notifications?.questions) ||
        (data?.type === "موعد" && admin?.notifications?.appointment) ||
        (data?.type === "مقال" && admin?.notifications?.posts);
      if (canAddNotification) {
        const response = await fetch(`/api/admins/${admin?._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ notificationsList: [...admin?.notificationsList, { ...data }] }),
        });
        if (response.ok) {
          get().fetchAdmin(admin?._id)
          // console.log("🚀 ~🚀 ~ تم إضــافة التنبيه بنجاح")
        } else {
          // console.log("🚀 ~🚀 ~ فشلت عملية إضــافة التنبيه");
        }
      }
    })

  },
  clearNotifaction: async () => {
    const response = await fetch(`/api/admins/${get().currentAdmin._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notificationsList: [] }),
    });
    if (response.ok) {
      // console.log("🚀 ~🚀 ~ تم إضــافة التنبيه بنجاح")
    } else {
      // console.log("🚀 ~🚀 ~ فشلت عملية إضــافة التنبيه");
    }
    get().fetchAdmin(get().currentAdmin._id)
  },
  deleteNotifaction: async (id) => {
    const response = await fetch(`/api/admins/${get().currentAdmin._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notificationsList: get().currentAdmin?.notificationsList.filter(not => not._id !== id) }),
    });
    if (response.ok) {
      // console.log("🚀 ~🚀 ~ تم إضــافة التنبيه بنجاح")
    } else {
      // console.log("🚀 ~🚀 ~ فشلت عملية إضــافة التنبيه");
    }
    get().fetchAdmin(get().currentAdmin._id)
  },
  //************** Company Form *************/
  companyInfo: {},
  handleSubmitCompanyUpdate: async (e, toast, id) => {
    e.preventDefault();
    const response = await fetch(`/api/company/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(get().companyInfo),
    });
    if (response.ok) {
      toast.success("تم تعديل المؤسسة بنجاح");
      set({ isLoading: false })
      if (response?.ok && !response?.error) {
      } else {
        toast.error(response?.error);
      }
    } else {
      toast.error("فشلت عملية تعديل المؤسسة");
    }
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

      get().addActivity("إضــافة", "طبيب", get().doctorInfoget().doctorInfo.email, "تمت")
      const response = await signIn("credentials", { ...get().doctorInfo, type: "doctor", redirect: false });
      if (response?.ok && !response?.error) {
        router.push("/doctors/dashboard");
      } else {
        toast.error("فشلت عملية تسجيل دخول المستخدم", response?.error);
      }
    } else {
      get().addActivity("إضــافة", "طبيب", get().doctorInfo?.email, "لم تتــم")
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
  adminInfo: userDefault,
  pathNameLogin: "login",
  errorPassword: false,
  errorAdminKey: false,
  handleSubmitAdminLogin: async (e, toast, router, signIn) => {
    e.preventDefault();
    const response = await signIn("admin-login", { ...get().adminInfo, type: "admin", redirect: false });
    if (response?.ok && !response?.error) {
      toast.success("تم تسجيل دخول المستخدم بنجاح");
      get().addActivity("دخول", "مشرف", get().adminInfo?.email, "تمت")
      set({ adminInfo: { email: "", password: "" } });
      router.refresh()
      router.push("/admin");
    } else {
      get().addActivity("دخول", "مشرف", get().adminInfo?.email, "لم تتــم")
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
      get().addActivity("تسجيل", "مشرف", get().adminInfo?.email, "تمت",)
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
        get().addActivity("تسجيل", "مشرف", get().adminInfo?.email, "لم تتــم",)
        toast.error(response?.error);
      }
    } else {
      toast.error("فشلت عملية تسجيل المستخدم");
    }
  },
  handleSubmitAdminUpdate: async (e, toast, id) => {
    e.preventDefault();
    const response = await fetch(`/api/admins/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(get().adminInfo),
    });
    if (response.ok) {
      get().addActivity("تعـديل", "مشرف", get().adminInfo?.email, "تمت")
      toast.success("تم تعديل المستخدم بنجاح");
      set({ isLoading: false })
    } else {
      get().addActivity("تعـديل", "مشرف", get().adminInfo?.email, "لم تتــم")
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
      get().addActivity("إضــافة", "سؤال", get().askQuestion?.title, "تمت")
      toast.success("  تم تقديم سؤالك بنجاح");
      set({ modal: modalClosed });
      //   router.push("/questions");
    } else {
      get().addActivity("إضــافة", "سؤال", get().askQuestion?.title, "لم تتــم")
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
      get().addActivity("تسجيل", "مستخدم", get().userInfo?.email, "تمت")
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
      get().addActivity("تسجيل", "مستخدم", get().userInfo?.email, "لم تتــم")
      toast.error("فشلت عملية تسجيل المستخدم");
    }
  },
  //************** Pharm Form *************/
  pharmInfo: pharmDefault,
  //************** Hosp Form *************/
  hospInfo: hospDefault,
  //************** Lab Form *************/
  labInfo: labDefault,
  //************** Posts *************/
  handleAddPost: async ( toast) => {
    const response = await fetch(`/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(get().editedPost),
    }
    );
    if (response.ok) {
      get().addActivity("إضــافة", "مقال", get().editedPost?.title, "تمت")
      toast.success("تم إضــافة مقال بنجاح");
      get().fetchPosts()
      set({
        modal: get().modalClosed, isLoading: false, editedPost: {
          text: "", image: "/images/logo.png", speciality: {}, title: ""
        }, uploadDone: {
          image: "",
          avatar: "",
          officePics: "",
          proofPics: "",
        },
      })
    } else {
      get().addActivity("إضــافة", "مقال", get().editedPost?.title, "لم تتــم")
      toast.error("فشلت عملية  إضــافة مقال المستخدم");
    }
  },
  handlePostUpdate: async (toast, id) => {
    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(get().editedPost),
    });
    if (response.ok) {
      get().addActivity("تعـديل", "مقال", get().editedPost?.title, "تمت")
      toast.success("تم تعديل مقال بنجاح");
      get().fetchPosts()
      set({
        modal: get().modalClosed, isLoading: false, editedPost: {
          text: "", image: "/images/logo.png", speciality: {}, title: ""
        }, uploadDone: {
          image: "",
          avatar: "",
          officePics: "",
          proofPics: "",
        },
      })
    } else {
      get().addActivity("تعـديل", "مقال", get().editedPost?.title, "لم تتــم")
      toast.error("فشلت عملية تعديل مقال المستخدم");
    }
  },

  handlePostDelete: async (toast, id) => {
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      get().addActivity("حذف", "مقال", get().editedPost?.title, "تمت")
      toast.success("تم حذف مقال بنجاح");
      get().fetchPosts()
      set({
        modal: get().modalClosed, isLoading: false, editedPost: {
          text: "", image: "/images/logo.png", speciality: {}, title: ""
        }, uploadDone: {
          image: "",
          avatar: "",
          officePics: "",
          proofPics: "",
        },
      })
    } else {
      get().addActivity("حذف", "مقال", get().editedPost?.title, "لم تتــم")
      toast.error("فشلت عملية حذف مقال المستخدم");
    }
  },
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
  fetchAdmins: async () => {
    try {
      set({ isLoading: true });
      const usersResponse = await fetch('/api/admins');
      const usersData = await usersResponse.json();
      set({ admins: usersData });
      set({ isLoading: false });
      return usersData
    } catch (error) {
      console.error('🚀 ~Error fetching data:', error);
    }
  },
  fetchAdmin: async (id) => {
    try {
      set({ isLoading: true });
      const usersResponse = await fetch(`/api/admins/${id}`);
      const usersData = await usersResponse.json();
      set({ currentAdmin: usersData });
      set({ isLoading: false });
    } catch (error) {
      console.error('🚀 ~Error fetching data:', error);
    }
  },
  fetchDoctor: async (id) => {
    try {
      const usersResponse = await fetch(`/api/doctors/${id}`);
      return await usersResponse.json();
      // set({ currentDoctor: usersData });
    } catch (error) {
      console.error('🚀 ~Error fetching data:', error);
    }
  },
  fetchPost: async (id) => {
    try {
      const usersResponse = await fetch(`/api/posts/${id}`);
      const usersData = await usersResponse.json();
      set({ selectedPost: usersData });
    } catch (error) {
      console.error('🚀 ~Error fetching data:', error);
    }
  },
  fetchQuestion: async (id) => {
    try {
      const questionResponse = await fetch(`/api/questions/${id}`);
      const questionData = await questionResponse.json();
      const doctorResponse = await fetch(`/api/doctors/${questionData.doctorID}`);
      const doctorData = await doctorResponse.json();
      set({ selectedQuestion: { ...questionData, doctor: doctorData } });
      return { ...questionData, doctor: doctorData }
    } catch (error) {
      console.error('🚀 ~Error fetching data:', error);
    }
  },
  fetchUsers: async () => {
    try {
      set({ isLoading: true });
      const usersResponse = await fetch('/api/users');
      const usersData = await usersResponse.json();
      set({ users: usersData });
      set({ isLoading: false });
      return usersData
    } catch (error) {
      console.error('🚀 ~Error fetching data:', error);
    }
  },
  fetchDoctors: async () => {
    try {
      const usersResponse = await fetch('/api/doctors');
      const usersData = await usersResponse.json();
      set({ doctors: usersData });
      return usersData
    } catch (error) {
      console.error('🚀 ~Error fetching data:', error);
    }
  },
  fetchQuestions: async () => {
    try {
      const questionsResponse = await fetch('/api/questions');
      const questionsData = await questionsResponse.json();

      // Fetch doctors for each question concurrently using Promise.all
      const doctorPromises = questionsData.map(async (question) => {
        const doctorResponse = await fetch(`/api/doctors/${question.doctorID}`);
        const doctorData = await doctorResponse.json();
        return { ...question, doctor: doctorData };
      });

      // Wait for all doctor fetches to complete
      const questionsWithDoctors = await Promise.all(doctorPromises);

      set({ questions: questionsWithDoctors });
      return { questions: questionsWithDoctors }
    } catch (error) {
      console.error('🚀 ~Error fetching data:', error);
    }
  },
  fetchPosts: async () => {
    try {
      set({ isLoading: true });
      const usersResponse = await fetch('/api/posts');
      const usersData = await usersResponse.json();
      set({ posts: usersData });
      set({ isLoading: false });
      return usersData
    } catch (error) {
      console.error("🚀 ~ Error fetching data:", error);
    }
  },
  fetchPharms: async () => {
    try {
      set({ isLoading: true });
      const usersResponse = await fetch('/api/pharms');
      const usersData = await usersResponse.json();
      set({ pharms: usersData });
      set({ isLoading: false });
      return usersData
    } catch (error) {
      console.error('🚀 ~Error fetching data:', error);
    }
  },
  fetchLabs: async () => {
    try {
      set({ isLoading: true });
      const usersResponse = await fetch('/api/labs');
      const usersData = await usersResponse.json();
      set({ labs: usersData });
      set({ isLoading: false });
      return usersData
    } catch (error) {
      console.error('🚀 ~Error fetching data:', error);
    }
  },
  fetchHosps: async () => {
    try {
      set({ isLoading: true });
      const usersResponse = await fetch('/api/hosps');
      const usersData = await usersResponse.json();
      set({ hosps: usersData });
      set({ isLoading: false });
      return usersData
    } catch (error) {
      console.error('🚀 ~Error fetching data:', error);
    }
  },
}));


