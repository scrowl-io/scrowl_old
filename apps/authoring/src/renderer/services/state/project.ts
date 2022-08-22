import React from 'react';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';

import { ProjectData } from '../../../main/models/projects/index';

/*
export const projectsApi = createApi({
  reducerPath: 'projectsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  endpoints: builder => ({
    // getProjects: builder.query<ProjectData | ProjectDataNew, string>('/new'),
    addProject: builder.mutation<void, ProjectData | ProjectDataNew>({
      query: project => ({
        url: 'project/new',
        method: 'invoke',
        body: project,
      }),
    }),
  }),
});

*/

const initialProjectState: ProjectData = {
  name: '',
  description: '',
  theme: '',
  workingFile: '',
  workingDir: '',
  workingImports: [''],
  saveFile: '',
  saveDir: '',
};

export const projectSlice = createSlice({
  name: 'project',
  initialState: initialProjectState,
  reducers: {
    create: (state: any, action: any) => {
      console.log('Hello World', action.payload);
      state = action.payload;
      console.log(state);
      return state;
    },
    // save: (state, action: PayloadAction<number>) => state + action.payload,
    // saveAs: (state, action: PayloadAction<number>) => state + action.payload,
    // importFile: (state, action: PayloadAction<number>) =>
    //   state + action.payload,
  },
});

// now available:
// slice.actions.increment(2);
// also available:
// slice.caseReducers.increment(0, { type: 'increment', payload: 5 });

export const { create } = projectSlice.actions;

export default projectSlice.reducer;

// export const { /*useGetProjectsQuery*/ useAddProjectMutation } = projectsApi;
