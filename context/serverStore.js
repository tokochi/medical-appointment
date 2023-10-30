import { create } from "zustand";
import { wilaya, daira, commune, relatedWorks, sectionDoctors, medicalSpecialties, specialities, titles, labs, pharms, hosp, visitArg, worksPharms, worksLabs, searchTabs, questions, specilatiyHosp, sectionWork } from "@utils/data.js";
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
  sectionDoctors,
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
  randomizer: (array, number) => {
    const copyArray = array.slice();
    if (number >= copyArray.length) {
      return copyArray;
    }
    for (let i = copyArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copyArray[i], copyArray[j]] = [copyArray[j], copyArray[i]];
    }
    return copyArray.slice(0, number);
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

        if (question) {
          const responsePromises = question.responses.map(async (response) => {
            if (response.doctor != null) { return response }
            const responseDoctorData = await Doctor.findOne({ _id: response.doctorID });
            return { ...response._doc, doctor: responseDoctorData };
          });

          const responsesWithDoctors = await Promise.all(responsePromises);

          const doctorData = await Doctor.findOne({ _id: question.doctorID });
          const questionWithDoctors = { ...question._doc, responses: responsesWithDoctors, doctor: doctorData };

          set({ selectedQuestion: questionWithDoctors });
          return questionWithDoctors;
        }
      }
    } catch (error) {
      console.error('🚀 ~ Error fetching data:', error);
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

      // Define a helper function to fetch a doctor by ID
      const fetchDoctorById = async (doctorID) => {
        return await Doctor.findOne({ _id: doctorID });
      };

      // Map questions and fetch doctor objects for each question and its responses concurrently
      const doctorPromises = response.map(async (question) => {
        // Map responses and fetch doctor objects for each response concurrently
        const responsePromises = question.responses.map(async (response) => {
          if (response.doctor) { return response }
          const responseDoctorData = await fetchDoctorById(response.doctorID);
          return { ...response._doc, doctor: responseDoctorData };
        });

        // Wait for all response doctor fetches to complete
        const responsesWithDoctors = await Promise.all(responsePromises);

        return { ...question._doc, responses: responsesWithDoctors };
      });

      // Wait for all doctor fetches to complete
      const questionsWithDoctors = await Promise.all(doctorPromises);

      set({ questions: questionsWithDoctors });
      return questionsWithDoctors;
    } catch (error) {
      console.error('🚀 ~ Error fetching data:', error);
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


