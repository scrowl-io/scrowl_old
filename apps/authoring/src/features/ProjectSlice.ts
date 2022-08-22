import React from 'react';
import { createSlice, current, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import {
  ProjectData,
  ProjectDataNew,
} from '../main/models/project/model-project.types';
import { EVENTS } from '../main/models/project/model-project';

// export const getProject = createAsyncThunk(
//action type string
// 'project/newProject',
// callback function,
// async (testo: ProjectData | ProjectDataNew, thunkAPI) => {
//   window.electronAPI.ipcRenderer.invoke('project/new', testo).then(msg => {
// console.log(`packaged ${msg}`);
// console.log(msg.data.project);
// current({...state, msg.data.project});
//       console.log('Cheeze', msg);
//       console.log('Crackers', thunkAPI);

//       return msg;
//     });
//   }
// );

// console.log('getProject', getProject);

const initialProjectState: ProjectDataNew | ProjectData = {
  name: '',
  description: '',
  theme: '',
  workingFile: '',
  workingDir: '',
  workingImports: [''],
  saveFile: '',
  saveDir: '',
};

// export const newProject = createApi({
//   reducerPath: 'project/new',
//   baseQuery: fetchBaseQuery({ baseUrl: 'project/new' }),
//   endpoints: builder => ({
//     createProject: builder.query<number, string>({
//       query: (arg) => window.electronAPI.ipcRenderer.invoke('project/new', arg).then(msg => {console.log(msg)},
//     }),
//   }),
// });

// export const projectSlice = createSlice({
//   name: 'project',
//   initialState: initialProjectState,
//   reducers: {
//     create: (state, action) => {
//       console.log('Hello World', action.payload);

// window.electronAPI.ipcRenderer
//   .invoke('project/new', action.payload)
//   .then(msg => {
// console.log(`packaged ${msg}`);
// console.log(msg.data.project);
// current({...state, msg.data.project});
// console.log({ ...current(state), name: 'Val' });
// });
//},
// save: (state, action: PayloadAction<number>) => state + action.payload,
// saveAs: (state, action: PayloadAction<number>) => state + action.payload,
// importFile: (state, action: PayloadAction<number>) =>
//   state + action.payload,
// },
// extraReducers: builder => {
//   builder
//     .addCase(getProject.pending, (state, action) => {
//       console.log('pending');
//       console.log(action);
//       })
//       .addCase(getProject.fulfilled, (state, action) => {
//         console.log('fulfilled', action);
//       })
//       .addCase(getProject.rejected, (state, action) => {
//         console.log('error');
//       });
//   },
// });

// now available:
// slice.actions.increment(2);
// also available:
// slice.caseReducers.increment(0, { type: 'increment', payload: 5 });
// export const { create } = projectSlice.actions;

// export default projectSlice.reducer;

// export const { useCreateProjectQuery } = newProject;
