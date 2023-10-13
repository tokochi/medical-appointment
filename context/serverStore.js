import { create } from "zustand";
import { wilaya, daira, commune, relatedWorks, medicalSpecialties, specialities, titles, labs, pharms, hosp, visitArg, worksPharms, worksLabs, searchTabs, questions, specilatiyHosp, sectionWork } from "@utils/data.js";
import { connectToDB } from '@utils/database';
import Admin from '@models/admin';
import Post from '@models/post';
import Doctor from '@models/doctor';
import Hosp from '@models/hosp';
import Lab from '@models/lab';
import Pharm from '@models/pharm';
import Question from '@models/question';
import User from '@models/user';
import Company from "@models/company";
import Activity from "@models/activity";
import Appointment from "@models/appointment";

export const useStore = create((set, get) => ({
  //************** General *************/
  darkTheme: true,
  dir: "rtl",
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
  session: null,
  //************** Fetch *************/
  users: [],
  doctors: [],
  admins: [],
  labs: [],
  pharms: [],
  hospitals: [],
  posts: [],
  question: [],
  Appointments: [],
  activities: [],
  fetchData: async (url, keyValue) => {
    try {
      if (url) {
        set({ isLoading: true });
        const usersResponse = await fetch(url);
        const usersData = await usersResponse.json();
        set({ [keyValue]: usersData });
        set({ isLoading: false });
        return usersData
      } else {
        console.error('🚀 ~URL empty:', error);
      }
    } catch (error) {
      console.error('🚀 ~Error fetching data:', error);
    }
  },
  fetchActivity: async () => {
    await connectToDB();
    try {
      const response = await Activity.find();
      set({ activities: response });
      return response
    } catch (error) {
      console.error('🚀 ~Error fetching data:', error);
    }
  },
  fetchAdmins: async () => {
    await connectToDB();
    try {
      const response = await Admin.find();
      set({ admins: response });
      return response
    } catch (error) {
      console.error('🚀 ~Error fetching data:', error);
    }
  },
  fetchCompany: async () => {
    await connectToDB();
    try {
      const response = await Company.find();
      return response
    } catch (error) {
      console.error('🚀 ~Error fetching data:', error);
    }
  },
  fetchAdmin: async (id) => {

    await connectToDB();
    try {
      if (id) {
        const response = await Admin.findOne({ _id: id });
        set({ selectedAdmin: response });
        return response
      }
    } catch (error) {
      console.error('🚀 ~Error fetching data:', error);
    }
  },
  fetchUser: async (id) => {

    await connectToDB();
    try {
      if (id) {
        const response = await User.findOne({ _id: id });
        set({ selectedUser: response });
        return response
      }
    } catch (error) {
      console.error('🚀 ~Error fetching data:', error);
    }
  },
  fetchDoctor: async (id) => {
    await connectToDB();
    try {
      if (id) {
        const response = await Doctor.findOne({ _id: id });
        set({ selectedDoctor: response });
        return response
      }
    } catch (error) {
      console.error('🚀 ~Error fetching data:', error);
    }
  },
  fetchAppointment: async (id) => {
    await connectToDB();
    try {
      if (id) {
        const response = await Appointment.findOne({ _id: id });
        return response
      }
    } catch (error) {
      console.error('🚀 ~Error fetching data:');
    }
  },
  fetchPost: async (id) => {
    await connectToDB();
    try {
      if (id) {
        const response = await Post.findOne({ _id: id });
        set({ selectedPost: response });
        return response
      }
    } catch (error) {
      console.error('🚀 ~Error fetching data:');
    }
  },
  fetchAppointment: async (id) => {
    await connectToDB();
    try {
      if (id) {
        const response = await Appointment.findOne({ _id: id });
        return response
      }
    } catch (error) {
      console.error('🚀 ~Error fetching data:');
    }
  },
  fetchQuestion: async (id) => {
    await connectToDB();
    try {
      if (id) {
        const question = await Question.findOne({ _id: id });
        const doctorData = await Doctor.findOne({ _id: question.doctorID });
        set({ selectedQuestion: { ...question, doctor: doctorData } });
        return { ...question._doc, doctor: doctorData }
      }
    } catch (error) {
      console.error('🚀 ~Error fetching data:', error);
    }
  },
  fetchUsers: async () => {
    await connectToDB();
    try {
      const response = await User.find();
      set({ users: response });
      return response
    } catch (error) {
      console.error('🚀 ~Error fetching data:', error);
    }
  },
  fetchDoctors: async () => {
  
    await connectToDB();
    try {
      const response = await Doctor.find();
       set({ doctors: response });
      return response
    } catch (error) {
      console.error('🚀 ~Error fetching data:', error);
    }
  },
  fetchQuestions: async () => {
    await connectToDB();
    try {
      const response = await Question.find();
      // Fetch doctors for each question concurrently using Promise.all
      const doctorPromises = response.map(async (question) => {
        const doctorData = await Doctor.findOne({ _id: question?.doctorID });
        return { ...question._doc, doctor: doctorData }
      });
      // Wait for all doctor fetches to complete
      const questionsWithDoctors = await Promise.all(doctorPromises);
      set({ questions: questionsWithDoctors });
      return questionsWithDoctors
    } catch (error) {
      console.error('🚀 ~Error fetching data:', error);
    }
  },
  fetchPosts: async () => {
    await connectToDB();
    try {
      const response = await Post.find();
      set({ doctors: response });
      return response
    } catch (error) {
      console.error('🚀 ~Error fetching data:', error);
    }
  },
  fetchAppointments: async () => {
    await connectToDB();
    try {
      const response = await Appointment.find();
      const appointmentPromises = response.map(async (appoint) => {
        const doctor = await get().fetchDoctor(appoint?.doctor);
        return { ...appoint, doctor: { ...doctor } };
      });
      const appointments = await Promise.all(appointmentPromises);
      set({ appointments });
      return appointments;
    } catch (error) {
      console.error('🚀 ~Error fetching data:', error);
    }
  },
  fetchPharms: async () => {
    await connectToDB();
    try {
      const response = await Pharm.find();
      set({ pharms: response });
      return response
    } catch (error) {
      console.error('🚀 ~Error fetching data:', error);
    }
  },
  fetchLabs: async () => {
    await connectToDB();
    try {
      const response = await Lab.find();
      set({ labs: response });
      return response
    } catch (error) {
      console.error('🚀 ~Error fetching data:', error);
    }
  },
  fetchHosps: async () => {
    await connectToDB();
    try {
      const response = await Hosp.find();
      set({ hosps: response });
      return response
    } catch (error) {
      console.error('🚀 ~Error fetching data:', error);
    }
  },
}));


