import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GroupsData, Member, State, StudentsData } from './types';

export const initialState: State = {
  groupsData: undefined,
  studentsData: undefined,
  staff: [],
  selectedOrganisationId: undefined,
  isLoading: false,
  isNextPageLoading: false,
};

export const currentSlice = createSlice({
  name: 'current',
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setIsNextPageLoading(state, action: PayloadAction<boolean>) {
      state.isNextPageLoading = action.payload;
    },
    setSelectedOrganisationId(state, action: PayloadAction<string>) {
      state.selectedOrganisationId = action.payload;
    },
    setStaff(state, action: PayloadAction<Member[]>) {
      state.staff = action.payload;
    },
    setGroups(state, action: PayloadAction<GroupsData>) {
      state.groupsData = action.payload;
    },
    pushGroups(state, action: PayloadAction<GroupsData>) {
      if (!state.groupsData) {
        state.groupsData = action.payload;
        return;
      }

      const prevDocs = state.groupsData.docs;
      state.groupsData = action.payload;
      state.groupsData.docs.unshift(...prevDocs);
    },
    setStudents(state, action: PayloadAction<StudentsData>) {
      state.studentsData = action.payload;
    },
    pushStudents(state, action: PayloadAction<StudentsData>) {
      if (!state.studentsData) {
        state.studentsData = action.payload;
        return;
      }

      const prevDocs = state.studentsData.docs;
      state.studentsData = action.payload;
      state.studentsData.docs.unshift(...prevDocs);
    },
    resetState() {
      return initialState;
    },
  },
});

export const currentActions = currentSlice.actions;
