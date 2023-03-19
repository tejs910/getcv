import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  occupation: "",
  img: null,
  country: "",
  city: "",
  address: "",
  postalCode: "",
  dateOfBirth: "",
  DrivingLicence: "",
  nationality: "",
  professionalSummary: "",
  empHistory: [],
  education: [],
  language: [],
  skills: [],
  totalPages: 1,
  profileCompleteness: 0,
  dateFormat: 1,
  dateseparator: 1,
};
const formStore = createSlice({
  name: "FormFields",
  initialState,
  reducers: {
    setPage(state, action) {
      state.totalPages = action.payload.pages;
    },
    // total 5 reducers
    // to update 13 static field directly through state.key
    staticFieldUpdate(state, action) {
      state[action.payload.key] = action.payload.value;
    },
    // to update employement history, 5 fields, it's array of objects
    empHistoryUpdate(state, action) {
      state.empHistory.push({
        id: new Date().toISOString(),
        notNull: false,
        jobTitle: action.payload.jobTitle,
        employer: action.payload.employer,
        begin: action.payload.begin,
        end: action.payload.end,
        description: action.payload.description,
      });
    },
    // its for : once we have id we can pass the things there.
    empUpdate(state, action) {
      const index = state.empHistory.findIndex(
        (ele) => ele.id === action.payload.fieldId
      );
      state.empHistory[index][action.payload.key] = action.payload.value;
      state.empHistory[index].notNull = true;
    },
    eduUpdate(state, action) {
      const index = state.education.findIndex(
        (ele) => ele.id === action.payload.fieldId
      );
      state.education[index][action.payload.key] = action.payload.value;
      state.education[index].notNull = true;
    },
    lanUpdate(state, action) {
      const index = state.language.findIndex(
        (ele) => ele.id === action.payload.fieldId
      );
      state.language[index][action.payload.key] = action.payload.value;
      state.language[index].notNull = true;
    },
    skUpdate(state, action) {
      const index = state.skills.findIndex(
        (ele) => ele.id === action.payload.fieldId
      );
      state.skills[index][action.payload.key] = action.payload.value;
      state.skills[index].notNull = true;
    },
    // to update education history, 5 fields, it's array of objects
    educationUpdate(state, action) {
      state.education.push({
        notNull: false,
        id: new Date().toISOString(),
        school: action.payload.school,
        degree: action.payload.degree,
        started: action.payload.started,
        finished: action.payload.finished,
        courseDescription: action.payload.courseDescription,
      });
    },
    // to update languages - 2 field
    languageUpdate(state, action) {
      state.language.push({
        notNull: false,
        id: new Date().toISOString(),
        language: action.payload.language,
        level: action.payload.level,
      });
    },
    // to update skills - 2 field
    skillUpdate(state, action) {
      state.skills.push({
        id: new Date().toISOString(),
        skill: action.payload.skill,
        rating: action.payload.rating,
      });
    },
    // img upload -- will be done later
    imgUpdate(state, action) {
      state.img = action.payload.img;
    },
    profileCompleteStatus(state) {
      state.profileCompleteness = 0;
      if (state.firstName.length) {
        state.profileCompleteness += 2;
      }
      if (state.lastName.length) {
        state.profileCompleteness += 2;
      }
      if (state.email.length) {
        state.profileCompleteness += 2;
      }
      if (state.phone.length) {
        state.profileCompleteness += 2;
      }
      if (state.occupation.length) {
        state.profileCompleteness += 2;
      }
      if (state.img) {
        state.profileCompleteness += 2;
      }
      if (state.country.length) {
        state.profileCompleteness += 2;
      }
      if (state.city.length) {
        state.profileCompleteness += 2;
      }
      if (state.address.length) {
        state.profileCompleteness += 2;
      }
      if (state.postalCode.length) {
        state.profileCompleteness += 2;
      }
      if (state.dateOfBirth.length) {
        state.profileCompleteness += 2;
      }
      if (state.DrivingLicence.length) {
        state.profileCompleteness += 1;
      }
      if (state.nationality.length) {
        state.profileCompleteness += 2;
      }
      if (state.professionalSummary.length) {
        state.profileCompleteness += 15;
      }
      if (state.empHistory.length) {
        state.profileCompleteness += 20;
      }
      if (state.education.length) {
        state.profileCompleteness += 20;
      }
      if (state.language.length) {
        state.profileCompleteness += 10;
      }
      if (state.skills.length) {
        state.profileCompleteness += 10;
      }
    },
  },
});

export const formAction = formStore.actions;

export default formStore.reducer;
