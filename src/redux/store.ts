import { configureStore} from '@reduxjs/toolkit';
import { noteSlice } from "./noteSlice";
import {thunk} from "redux-thunk";

const store = configureStore({
	reducer: {
		notes: noteSlice.reducer
	},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(thunk)

});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
