"use client"
import { create } from "zustand";
import { useRouter } from "next/navigation";
import { wilaya, daira, commune, filterDefault, userDefault, bloodTypes, chronicDiseases, doctorDefault, pharmDefault, hospDefault, labDefault, relatedWorks, medicalSpecialties, specialities, titles, labs, pharms, hosp, visitArg, worksPharms, worksLabs, searchTabs, questions, specilatiyHosp, sectionWork } from "@utils/data.js";
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
  completed: false,
  gridRefresh: false,
  showPinCode: false,
  activity: [],
  editedPost: {
    text: "", image: "/images/logo.webp", speciality: {}, title: ""
  },
  dropDowns: {
    notificationIsOpen: false,
    inboxIsOpen: false,
    accountIsOpen: false,
  },
  setDropDowns: (type) => {
    switch (type) {
      case "close":
        set({
          dropDowns: {
            notificationIsOpen: false,
            inboxIsOpen: false,
            accountIsOpen: false,
          }
        })
        break;
      case "notification":
        set({
          dropDowns: {
            notificationIsOpen: true,
            inboxIsOpen: false,
            accountIsOpen: false,
          }
        })
        break;
      case "account":
        set({
          dropDowns: {
            notificationIsOpen: false,
            inboxIsOpen: false,
            accountIsOpen: true,
          }
        })
        break;
      case "inbox":
        set({
          dropDowns: {
            notificationIsOpen: false,
            inboxIsOpen: true,
            accountIsOpen: false,
          }
        })
        break;
    }
  },
  closeModelAnywhere: (e) => {
    const D = get().dropDowns
    const name = e.target.getAttribute("name")
    if (get().modal.isOpen === true && name == "modal") { set(({ modal: get().modalClosed })) }
    if ((D.notificationIsOpen === true && name !== "notification") ||
      (D.inboxIsOpen === true && name !== "inbox") ||
      (D.accountIsOpen === true && name !== "account")) { get().setDropDowns("close") }
  },
  scrollToElement: (id) => {
    if (typeof window !== "undefined") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  },
  scrollToBottom: () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      })
    }
  },
  scrollToTop: () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
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
  //************** Session *************/
  session: null,
  currentUser: null,
  currentDoctor: null,
  currentAdmin: null,
  selectedPost: {},
  selectedDoctor: {},
  selectedQuestion: {},
  questions,
  handleAddError: async (data, router) => {
    set({ isLoading: true })
    const response = await fetch(`/api/errors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
    );
    if (response.ok) {
      get().addActivity("إضــافة", "مشكل", data?.title, "تمت")
    } else {
      get().addActivity("إضــافة", "مشكل", data?.title, "لم تتــم")
    }
    set({ isLoading: false })
    router.push('/')
  },
  //************** Static Data *************/
  medicalSpecialties,
  specialities,
  chronicDiseases,
  bloodTypes,
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
  errorInput: { name: false, date: false, password: false, title: false, text: false, speciality: false, verifyPassword: false, oldPassword: false, pinCode: false, email: false },
  loadingSppiner: {
    avatar: false,
    image: false,
    examinations: false,
    officePics: false,
    proofPics: false,
  },
  uploadDone: {
    avatar: "",
    examinations: "",
    image: "",
    officePics: "",
    proofPics: "",
  },
  filterDefault,
  filterInfo: filterDefault,
  loginType: "user",
  handleFilterInfo: (array) => {
    if (array?.length > 0) {
      const fil = get().filterInfo
      return array
        .filter(item => fil?.gender?.text !== "" ? item.gender?.text === fil?.gender?.text : item)
        .filter(item => fil?.name !== "" ? item?.name === fil?.name : item)
        // .filter(item => fil?.speciality?.text === "" ? item.speciality?.text === fil?.specialty?.text : item)
        .filter(item => fil?.speciality?.text !== "" ? [...item.specialities, item.speciality]?.some(specialty => specialty?.text === fil?.speciality?.text) : item)
        .filter(item => fil?.wilaya?.text !== "" ? item.address?.wilaya?.text === fil?.wilaya.text : item)
        .filter(item => fil?.homeVisits !== false ? item.otherServices?.homeVisits === fil?.homeVisits : item)
        .filter(item => fil?.insurance !== false ? item.otherServices?.insurance === fil?.insurance : item)
        .filter(item => fil?.isFullTimeOpen !== false ? item.otherServices?.isFullTimeOpen === fil?.isFullTimeOpen : item)
    }
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
    set({
      errorInput: { name: false, password: false, title: false, text: false, speciality: false, verifyPassword: false, oldPassword: false, pinCode: false, email: false },
    })
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
    set({ errorInput: { speciality: false } })
    const selectedIndex = event.target?.selectedIndex;
    const selectedText = event.target?.options[selectedIndex]?.text;
    const selectedTag = event.target?.options[selectedIndex]?.tag;
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
      get().addActivity("إضــافة", type, email || name, "تمت", { name: "المشرف" })
      toast.success("تم تسجيل المستخدم بنجاح", { duration: 3000 });
      get().fetchToGrid(url)
    } else {
      get().addActivity("إضــافة", type, email || name, "لم تتــم", { name: "المشرف" })
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
      get().addActivity("حـــذف", type, email || name, "تمت", { name: "المشرف" })
      toast.success("تم حذف المستخدم بنجاح", { duration: 5000 });
      get().fetchToGrid(url)
    } else {
      get().addActivity("حـــذف", type, email || name, "لم تتــم", { name: "المشرف" })
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
      get().addActivity("تعـديل", type, email || name, "تمت", { name: "المشرف" })
      toast.success("تم تعديل المستخدم بنجاح", { duration: 5000 });
      get().fetchToGrid(url)
    } else {
      get().addActivity("تعـديل", type, email || name, "لم تتــم", { name: "المشرف" })
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
  handleSubGrid: async (e, toast, url, keyValue, type, id) => {
    e.preventDefault();
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(get()[keyValue]),
    });
    const email = get()[keyValue]?.email
    const name = get()[keyValue]?.name
    if (response.ok) {
      get().addActivity(type, "إشتراك", email || name, "تمت", { name: "المشرف", id })
      toast.success(`تم ${type} اشتراك المستخدم بنجاح`, { duration: 5000 });
      get().fetchToGrid(url)
    } else {
      get().addActivity(type, "إشتراك", email || name, "لم تتــم", { name: "المشرف", id })
      toast.error("فشلت عملية اشتراك المستخدم", { duration: 5000 });
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
    get().addedAdmins !== "" &&
      useStore.setState((state) => ({
        [keyValue]: {
          ...state[keyValue],
          admins: [...state[keyValue]?.admins, get().addedAdmins],
        },
      }));
    set({ addedAdmins: "" });
  },
  handleMultiselectAddButton: (event, keyValue, field, addField) => {
    event.preventDefault();
    const clickedElement = event.target.getAttribute("name");
    set((state) => ({
      [keyValue]: {
        ...state[keyValue],
        [field]: [
          ...state[keyValue][field],
          { text: clickedElement, value: clickedElement },
        ],
      },
    }));
    set({ [addField]: "", addedsurgery: { text: "", time: new Date(), hosp: "" } });
  },
  handleMultiselectAddOptions: (event, keyValue, field, addField) => {
    event.preventDefault();
    const selectedIndex = event.target.selectedIndex;
    const selectedText = event.target.options[selectedIndex].text;
    set((state) => ({
      [keyValue]: {
        ...state[keyValue],
        [field]: [
          ...state[keyValue][field],
          { text: selectedText, value: event.target.value },
        ],
      },
    }));
    // set({ [addField]: "" });
  },
  removeItemFromArray: (event, keyValue, type) => {
    event.preventDefault();
    const clickedElement = event.target.getAttribute("name");
    const filteredArray = get()[keyValue][type].filter((item) => {
      if (typeof item === "string") {
        return item !== clickedElement;
      } else if (typeof item === "object") {
        return (item.text === clickedElement) ? false : true;
      }
      return true;
    });
    set((state) => ({
      [keyValue]: {
        ...state[keyValue],
        [type]: filteredArray,
      },
    }));
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
  removeSelectSuregeries: (event, keyValue) => {
    event.preventDefault();
    const clickedElement = event.target.getAttribute("name");
    const filtredArray = get()[keyValue].surgeries.filter(
      (surgery) => surgery?.name !== clickedElement
    );
    set((state) => ({
      [keyValue]: {
        ...state[keyValue],
        surgeries: filtredArray,
      },
    }));
  },
  removeSelectAlergies: (event, keyValue, field) => {
    event.preventDefault();
    const clickedElement = event.target.getAttribute("name");
    const filtredArray = get()[keyValue].alergies.filter(
      (alergy) => alergy?.text !== clickedElement
    );
    set((state) => ({
      [keyValue]: {
        ...state[keyValue],
        alergies: filtredArray,
      },
    }));
  },
  removeSelectExam: (event, keyValue) => {
    event.preventDefault();
    const clickedElement = event.target.getAttribute("name");
    const filtredArray = get()[keyValue].examinations.filter((pic) => pic !== clickedElement);
    set((state) => ({
      [keyValue]: {
        ...state[keyValue],
        examinations: filtredArray,
      },
    }));
  },
  handleSelectServices: (event, keyValue) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedText = event.target.options[selectedIndex].text;
    // const selectedValue = event.target.options[selectedIndex].value;
    set((state) => ({
      [keyValue]: {
        ...state[keyValue],
        services: [
          ...state[keyValue].services,
          { text: selectedText, value: event.target.value },
        ],
      },
    }));
  },
  handleSelectChrnoDiseases: (event, disease, keyValue) => {
    const isChecked = event.target.checked;
    // const currentDiseases = get().healthInfo?.chrnoDiseases;
    if (isChecked) {
      set(state => ({ healthInfo: { ...state.healthInfo, chrnoDiseases: [...get().healthInfo?.chrnoDiseases, disease] } }));
    } else {
      set(state => ({ healthInfo: { ...state.healthInfo, chrnoDiseases: get().healthInfo?.chrnoDiseases?.filter(item => item.value !== disease.value) } }));
    }
    set(state => ({
      [keyValue]: {
        ...state[keyValue],
        healthInfo: get().healthInfo
      }
    }));
  },
  removeSelectSpecialities: (event, keyValue) => {
    event.preventDefault();
    const clickedElement = event.target.getAttribute("name");
    const filtredArray = get()[keyValue].specialities?.filter(
      (speciality) => speciality?.text !== clickedElement
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
    const filtredArray = get()[keyValue].services?.filter((service) => service.text !== clickedElement);
    set((state) => ({
      [keyValue]: {
        ...state[keyValue],
        services: filtredArray,
      },
    }));
  },
  addedAdmins: "",
  //************** Inbox *************/
  messageToSend: {
    title: "",
    text: "",
    from: {
      id: get()?.session?._id,
      name: get()?.session?.name,
      email: get()?.session?.email,
      title: get()?.session?.title,
      speciality: get()?.session?.speciality
    }
  },
  handleSubmitMessage: async (e, toast, id, type) => {
    e.preventDefault();
    switch (true) {
      case !get().messageToSend.title:
        set({ isLoading: false, errorInput: { ...get().errorInput, title: true } });
        return;
      case !get().messageToSend.text:
        set({ isLoading: false, errorInput: { ...get().errorInput, text: true } });
        return;
    }
    set({ isLoading: true })
    const response = await fetch(`/api/${type}/inbox-add/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(get().messageToSend),
    });
    if (response.status === 203) {
      toast.error("يرجى الانتظار قبل إرســال رسالة آخر", response);
    } else if (response.ok) {
      get().addActivity("إضــافة", "رسالة", get().messageToSend?.title, "تمت", { id, type });
      toast.success("تم تقديم رسالتك بنجاح");
      set({ modal: get().modalClosed });
    } else {
      get().addActivity("إضــافة", "رسالة", get().messageToSend?.title, "لم تتــم");
      toast.error("حدث خطأ في تقديم رسالتك", response);
    }
    set({ isLoading: false })
  },
  handleUpdateMessage: async (messageId, id, type) => {
    const response = await fetch(`/api/${type}/inbox-update/${id}?inboxId=${messageId}`);
    if (response.ok) {
      get().addActivity("تعديل", "رسالة", get().messageToSend?.title, "تمت", { id, type });
    } else {
      get().addActivity("تعديل", "رسالة", get().messageToSend?.title, "لم تتــم");
    }
  },
  handleDeleteMessage: async (e, toast, id, type, messageId) => {
    e.preventDefault();
    set({ isLoading: true })
    const response = await fetch(`/api/${type}/inbox-delete/${id}?inboxId=${messageId}`);
    if (response.ok) {
      get().addActivity("حذف", "رسالة", get().messageToSend?.title, "تمت", { id, type });
      toast.success("تم حذف رسالتك بنجاح");
      set({ modal: get().modalClosed });
    } else {
      get().addActivity("حذف", "رسالة", get().messageToSend?.title, "لم تتــم");
      toast.error("حدث خطأ في حذف رسالتك", response);
    }
    set({ isLoading: false })
  },
  clearInbox: async (type) => {
    const response = await fetch(`/api/${type}/inbox-clear/${id}`);
    if (response.ok) {
      // console.log("🚀 ~🚀 ~ تم إضــافة التنبيه بنجاح")
    } else {
      // console.log("🚀 ~🚀 ~ فشلت عملية إضــافة التنبيه");
    }
    get().fetchAdmin(get().session._id)
  },
  //************** Notifications *************/ 
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
      get().sendNotificationAdmins(responseData)
      if (action === "إضــافة" && type === "سؤال" && status === "تمت") { get().sendNotificationDoctors({ ...responseData, title: "سؤال طبي في تخصصك", text: "تم طرح سؤال طبي جديد من طرف أحد المستخدمين حول تخصصك الطبي، يمكنك المشاركة و الإجابة و تلقي ردود و تعليقات" }) }
      if (action === "إضــافة" && type === "رسالة" && status === "تمت") { get().sendNotification({ ...responseData, title: "تلقيت رسالة", text: "" }, from?.id, from?.type) }
      if (action === "إضــافة" && type === "موعد" && status === "تمت") { get().sendNotification({ ...responseData, title: "لديك موعد طبي", text: "" }, from?.id, "doctors") }
      if (type === "إشتراك" && status === "تمت") { get().sendNotification({ ...responseData, title: "اشتراك", text: "" }, from?.id, "doctors") }
      // Parse the response body as JSON
      // console.log("🚀 ~🚀 ~ Activity Added:", responseData);
    } else {
      // console.log("🚀 ~🚀 ~ error adding activity:", response)
    }
  },
  sendNotificationAdmins: async (data) => {
    const admins = await get().fetchAdmins()
    admins.map(async admin => {
      await get().sendNotification(data, admin._id, "admins")
    })

  },
  sendNotificationDoctors: async (data) => {
    const doctors = await get().fetchDoctors()
    doctors?.map(async doctor => {
      await get().sendNotification(data, doctor._id, "doctors")
    })
  },
  sendNotificationUsers: async (data) => {
    const users = await get().fetchUsers()
    users.map(async user => {
      await get().sendNotification(data, user._id, "users")
    })
  },
  sendNotification: async (data, id, type) => {
    const response = await fetch(`/api/${type}/notification-add/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      console.log("🚀 ~🚀 ~ تم إضــافة التنبيه بنجاح")
    } else {
      console.log("🚀 ~🚀 ~ فشلت عملية إضــافة التنبيه");
    }
  },
  clearNotifaction: async (id, type) => {
    const response = await fetch(`/api/${type}/notification-clear/${id}`);
    if (response.ok) {
      console.log("🚀 ~🚀 ~ تم إضــافة التنبيه بنجاح")
    } else {
      console.log("🚀 ~🚀 ~ فشلت عملية إضــافة التنبيه");
    }
  },
  clearMessageNotifaction: async (id, type) => {
    const response = await fetch(`/api/${type}/notification-clear/${id}`);
    if (response.ok) {
      console.log("🚀 ~🚀 ~ تم إضــافة التنبيه بنجاح")
    } else {
      console.log("🚀 ~🚀 ~ فشلت عملية إضــافة التنبيه");
    }
  },
  deleteNotifaction: async (id, type, messageId) => {
    const response = await fetch(`/api/${type}/notification-delete/${id}?messageId=${messageId}`);
    if (response.ok) {
      console.log("🚀 ~🚀 ~ تم حذف التنبيه بنجاح")
    } else {
      console.log("🚀 ~🚀 ~ فشلت عملية حذف التنبيه");
    }
  },
  updateNotification: (e, type, keyValue) => {
    const isChecked = e.target.checked;
    const updatedNotifications = new Set(get()[keyValue].notifications);
    if (isChecked) {
      if (!get()[keyValue].notifications?.includes(type)) {
        updatedNotifications.add(type);
      }
    } else {
      // If the toggle is unchecked, remove the type from notifications.
      updatedNotifications.delete(type);
    }
    set((state) => ({
      [keyValue]: { ...state[keyValue], notifications: Array.from(updatedNotifications) },
    }));
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
        ...state.doctorInfo, workTime: state.doctorInfo?.workTime?.map((date) =>
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
  handleSubmitDoctorsSignup: async (e, toast, router, signIn) => {
    e.preventDefault();
    set({ isLoading: true })
    if (!get().isRulesChecked.first && !get().isRulesChecked.seconde) {
      return toast.error("يرجى موافقة على الشروط");
    }
    switch (true) {
      case !get().userInfo?.password:
        set({ isLoading: false, errorInput: { ...get().errorInput, password: true } });
        return;
      case !get().userInfo?.verifyPassword:
        set({ isLoading: false, errorInput: { ...get().errorInput, verifyPassword: true } });
        return;
      case get().userInfo.verifyPassword !== get().userInfo.password:
        set({ isLoading: false, errorInput: { ...get().errorInput, verifyPassword: true } });
        return;
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
    set({ doctorInfo: doctorDefault, isLoading: false, isRulesChecked: { first: false, seconde: false } });
  },
  handleSubmitDoctorUpdate: async (e, toast, id, router, type) => {
    e.preventDefault();
    set({ isLoading: true })
    const response = await fetch(`/api/doctors/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(get().doctorInfo),
    });
    if (response.ok) {
      if (type === "new") {
        get().addActivity("تأكيد التسجيل", "طبيب", get().doctorInfo?.email, "تمت")
        toast.success("تم تأكيد التسجيل المستخدم بنجاح");
        router.push("/login")
      } else {
        get().addActivity("تعـديل", "طبيب", get().doctorInfo?.email, "تمت")
        toast.success("تم تعديل المستخدم بنجاح");
      }

      set({ isLoading: false })
    } else {
      get().addActivity("تعـديل", "طبيب", get().doctorInfo?.email, "لم تتــم")
      toast.error("فشلت عملية تعديل المستخدم");
    }
    set({ isLoading: false })
  },
  handleSubmitDoctorLogin: async (e, toast, router, signIn) => {
    e.preventDefault();
    set({ isLoading: true })
    switch (true) {
      case !get().userInfo?.password:
        set({ isLoading: false, errorInput: { ...get().errorInput, password: true } });
        return;
      case !get().userInfo?.email:
        set({ isLoading: false, errorInput: { ...get().errorInput, email: true } });
        return;
    }
    const response = await signIn("doctor-login", { ...get().userInfo, type: "doctor", redirect: false });
    if (response?.ok && !response?.error) {
      toast.success("تم تسجيل دخول المستخدم بنجاح");
      get().addActivity("دخول", "طبيب", get().userInfo?.email, "تمت")
      set({ doctorInfo: { email: "", password: "" } });
      router.refresh()
      router.push("/doctor");
    } else {
      get().addActivity("دخول", "طبيب", get().userInfo?.email, "لم تتــم")
      toast.error(response?.error);
    }
    set({ isLoading: false })
  },
  handleDoctorConfirmation: async (e, toast, id, email) => {
    e.preventDefault();
    set({ isLoading: true })
    const response = await fetch(`/api/sendToken/subscription?id=${id}&email=${email}`);
    if (response.ok) {
      toast.success("تم  تأكيد التسجيل المستخدم بنجاح");
      console.log("✔ sending email from client Successfully")
    } else {
      console.log("⚠️ Error sending email from client...")
      // get().addActivity("إضــافة", "موعد طبي", get().editedPost?.title, "لم تتــم")
      toast.error("فشلت عملية إضــافة تأكيد التسجيل ");
    }
    set({ isLoading: false })
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
    set({ isLoading: true })
    switch (true) {
      case !get().adminInfo?.email:
        set({ isLoading: false, errorInput: { ...get().errorInput, email: true } });
        return;
      case !get().adminInfo?.password:
        set({ isLoading: false, errorInput: { ...get().errorInput, password: true } });
        return;
    }
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
    set({ isLoading: false })
  },
  handleSubmitAdminSignup: async (e, toast, router, signIn) => {
    e.preventDefault();
    set({ isLoading: true })
    switch (true) {
      case !get().adminInfo?.password:
        set({ isLoading: false, errorInput: { ...get().errorInput, password: true } });
        return;
      case !get().adminInfo?.verifyPassword:
        set({ isLoading: false, errorInput: { ...get().errorInput, verifyPassword: true } });
        return;
      case get().adminInfo.verifyPassword !== get().adminInfo.password:
        set({ isLoading: false, errorInput: { ...get().errorInput, verifyPassword: true } });
        return;
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
      get().addActivity("تسجيل", "مشرف", get().adminInfo?.email, "تمت")
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
    set({ isLoading: false })
  },
  handleSubmitAdminUpdate: async (e, toast, id) => {
    e.preventDefault();
    set({ isLoading: true })
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
      toast.error("فشلت عملية تعديل المستخدم");
    }
    set({ isLoading: false })
  },
  //************** Question Form *************/
  askQuestion: {
    name: "",
    email: "",
    phone: "",
  },
  handleSubmitQuestion: async (e, toast, router) => {
    e.preventDefault();
    set({ isLoading: true })
    switch (true) {
      case !get().askQuestion?.speciality?.value:
        set({ isLoading: false, errorInput: { ...get().errorInput, speciality: true } });
        return;
      case !get().askQuestion?.title:
        set({ isLoading: false, errorInput: { ...get().errorInput, title: true } });
        return;
      case !get().askQuestion?.text:
        set({ isLoading: false, errorInput: { ...get().errorInput, text: true } });
        return;
    }
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
      set({ modal: get().modalClosed });
      router.refresh();
    } else {
      get().addActivity("إضــافة", "سؤال", get().askQuestion?.title, "لم تتــم")
      toast.error("حدث خطأ في تقديم سؤالك", response);
    }
    set({ isLoading: false })
  },
  handleUpdateQuestion: async (e, toast, router, id) => {
    e.preventDefault();
    set({ isLoading: true })
    const response = await fetch(`/api/questions/response-add/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(get().askQuestion),
    });
    if (response.ok) {
      get().addActivity("تعـديل", "سؤال", get().askQuestion?.title, "تمت")
      toast.success("تم تعديل سؤال بنجاح");
      router.refresh()
    } else {
      get().addActivity("تعـديل", "سؤال", get().askQuestion?.title, "لم تتــم")
      toast.error("فشلت عملية سؤال المستخدم");
    }
    set({ isLoading: false, modal: get().modalClosed })
  },
  handleSumbitComment: async (e, toast, router, responseId, id) => {
    e.preventDefault();
    set({ isLoading: true })
    const response = await fetch(`/api/questions/comment-add/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment: { text: get().askQuestion.comment, author: get().session?._id }, responseId }),
    });
    if (response.ok) {
      get().addActivity("تعـديل", "سؤال", get().askQuestion?.title, "تمت")
      toast.success("تم تعديل سؤال بنجاح");
      router.refresh()
    } else {
      get().addActivity("تعـديل", "سؤال", get().askQuestion?.title, "لم تتــم")
      toast.error("فشلت عملية سؤال المستخدم");
    }
    set({ isLoading: false })
  },
  //************** User Form *************/  
  healthInfo: {
    chrnoDiseases: [],
    alergies: [],
    surgeries: [],
    inheritDiseases: [],
    vaccinations: [],
    examinations: [],
    bloodType: {},
    questions: {
      ArticulationIssue: false,
      hairLose: false,
      skinDisease: false,
      smoking: false,
    },
  },
  addedInheritDiseases: "",
  addedAlergy: "",
  addedVaccination: { text: "", time: new Date(), hosp: "" },
  addedsurgery: { text: "", time: new Date(), hosp: "" },
  userInfo: userDefault,
  handleSubmitUserSignup: async (e, toast, router, signIn) => {
    e.preventDefault();
    set({ isLoading: true })
    switch (true) {
      case !get().userInfo?.password:
        set({ isLoading: false, errorInput: { ...get().errorInput, password: true } });
        return;
      case !get().userInfo?.verifyPassword:
        set({ isLoading: false, errorInput: { ...get().errorInput, verifyPassword: true } });
        return;
      case get().userInfo.verifyPassword !== get().userInfo.password:
        set({ isLoading: false, errorInput: { ...get().errorInput, verifyPassword: true } });
        return;
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
        router.push("/login");
        router.refresh()
      } else {
        toast.error(response?.error);
      }
    } else {
      get().addActivity("تسجيل", "مستخدم", get().userInfo?.email, "لم تتــم")
      toast.error("فشلت عملية تسجيل المستخدم");
    }
    set({ isLoading: false })
  },
  handleSubmitUserLogin: async (e, toast, router, signIn) => {
    e.preventDefault();
    set({ isLoading: true })
    switch (true) {
      case !get().userInfo?.email:
        set({ isLoading: false, errorInput: { ...get().errorInput, email: true } });
        return;
      case !get().userInfo?.password:
        set({ isLoading: false, errorInput: { ...get().errorInput, password: true } });
        return;
    }
    const response = await signIn("user-login", { ...get().userInfo, type: "user", redirect: false });
    if (response?.ok && !response?.error) {
      toast.success("تم تسجيل دخول المستخدم بنجاح");
      get().addActivity("دخول", "مستخدم", get().userInfo?.email, "تمت")
      set({ userInfo: { email: "", password: "" } });
      router.push("/login");
      router.refresh()
    } else {
      get().addActivity("دخول", "مستخدم", get().userInfo?.email, "لم تتــم")
      toast.error(response?.error);
    }
    set({ isLoading: false })
  },
  handleSubmitUserUpdate: async (e, toast, id) => {
    e.preventDefault();
    set({ isLoading: true })
    const response = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(get().userInfo),
    });

    if (response.ok) {
      get().addActivity("تعـديل", "مستخدم", get().userInfo?.email, "تمت")
      toast.success("تم تعديل المستخدم بنجاح");
    } else {
      get().addActivity("تعـديل", "مستخدم", get().userInfo?.email, "لم تتــم")
      toast.error("فشلت عملية تسجيل المستخدم");
    }
    set({ isLoading: false })
  },
  submitUserUpdateHealthInfo: async (e, toast, router, id) => {
    e.preventDefault();
    set({ isLoading: true })
    const response = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ healthInfo: get().healthInfo }),
    });
    if (response.ok) {
      get().addActivity("تعـديل", "مستخدم", "الملف الطبي", "تمت")
      toast.success("تم تعديل الملف الطبي بنجاح");
      set({ isLoading: false })
      router.refresh()
    } else {
      get().addActivity("تعـديل", "مستخدم", "الملف الطبي", "لم تتــم")
      toast.error("فشلت عملية تسجيل الملف الطبي");
    }
    set({ isLoading: false })
  },
  //************** Pharm Form *************/
  pharmInfo: pharmDefault,
  //************** Hosp Form *************/
  hospInfo: hospDefault,
  //************** Lab Form *************/
  labInfo: labDefault,
  //************** Posts *************/
  handleAddPost: async (toast) => {
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
          text: "", image: "/images/logo.webp", speciality: {}, title: ""
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
          text: "", image: "/images/logo.webp", speciality: {}, title: ""
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
          text: "", image: "/images/logo.webp", speciality: {}, title: ""
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
  //************** Appointment *************/
  appointInfo: {},
  pinCodeVerification: async (router, toast) => {
    set({ isLoading: true })
    switch (true) {
      case !get().appointInfo?.pinCode:
        set({ isLoading: false, errorInput: { ...get().errorInput, pinCode: true } });
        return;
    }
    const response = await fetch(`/api/verifyToken/pin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(get().appointInfo),
    }
    );
    if (response.ok) {
      const data = await response.json();
      get().addActivity("إضــافة", "موعد", get().appointInfo?.user?.email, "تمت", { id: get().appointInfo?.doctor })
      toast.success("تم إضــافة موعد طبي بنجاح");
      set({
        modal: get().modalClosed,
        showPinCode: false,
      })
      router.push(`/appointments/${data._id}`)
    } else {
      get().addActivity("إضــافة", "موعد طبي", get().appointInfo?.user?.email, "لم تتــم")
      toast.error("فشلت عملية  إضــافة موعد طبي المستخدم");
    }
    set({ isLoading: false })
  },
  sendPinCode: async () => {
    set({ isLoading: true })
    switch (true) {
      case !get().appointInfo?.user?.name:
        set({ isLoading: false, errorInput: { ...get().errorInput, name: true } });
        return;
      case !get().appointInfo?.user?.email:
        set({ isLoading: false, errorInput: { ...get().errorInput, email: true } });
        return;
      // case !get().appointInfo?.pinCode:
      //   set({ isLoading: false, errorInput: { ...get().errorInput, pinCode: true } });
      //   return;
    }
    set({ showPinCode: true })

    const response = await fetch(`/api/sendToken/pin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(get().appointInfo),
    }
    );
    if (response.ok) {
      console.log("✔ sending email from client...")
    } else {
      console.log("⚠️ Error sending email from client...")
      // get().addActivity("إضــافة", "موعد طبي", get().editedPost?.title, "لم تتــم")
      // toast.error("فشلت عملية  إضــافة موعد طبي المستخدم");
    }
    set({ isLoading: false })
    get().scrollToElement("modal-bottom")
  },
  submitMessageSupport: async (e, toast) => {
    e.preventDefault();
    set({ isLoading: true })
    switch (true) {
      case !get().askQuestion?.email:
        set({ isLoading: false, errorInput: { ...get().errorInput, email: true } });
        return;
    }
    const response = await fetch(`/api/support`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(get().askQuestion),
    }
    );
    if (response.ok) {
      toast.success("  تم تقديم رسالتك بنجاح")
      console.log("✔ sending email from client...")
    } else {
      console.log("⚠️ Error sending email from client...")
      // get().addActivity("إضــافة", "موعد طبي", get().editedPost?.title, "لم تتــم")
      // toast.error("فشلت عملية  إضــافة موعد طبي المستخدم");
    }
    set({ isLoading: false })
  },
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
      set({ session: usersData });
      set({ isLoading: false });
    } catch (error) {
      console.error('🚀 ~Error fetching data:', error);
    }
  },
  fetchUser: async (id) => {
    try {
      const usersResponse = await fetch(`/api/users/${id}`);
      const usersData = await usersResponse.json();
      // set({ currentUser: usersData });
      return usersData
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
  fetchAppointment: async (id) => {
    try {
      const usersResponse = await fetch(`/api/appointments/${id}`);
      const usersData = await usersResponse.json();
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
      // Iterate through questions to fetch associated doctors for responses
      const questionsWithDoctors = await Promise.all(
        questionsData.map(async (question) => {
          // Create a copy of the question to avoid modifying the original object
          const questionCopy = { ...question };

          // Fetch doctors for each response
          const responsePromises = questionCopy.responses.map(async (response) => {
            const doctorResponse = await fetch(`/api/doctors/${response.doctorID}`);
            const doctorData = await doctorResponse.json();
            response.doctor = doctorData; // Attach the doctor object to the response
          });

          // Wait for all response doctor fetches to complete
          await Promise.all(responsePromises);

          return questionCopy;
        })
      );

      // Now, questionsWithDoctors contains questions with responses, where each response has the doctor object attached

      set({ questions: questionsWithDoctors });
      return { questions: questionsWithDoctors };
    } catch (error) {
      console.error('🚀 ~ Error fetching data:', error);
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


