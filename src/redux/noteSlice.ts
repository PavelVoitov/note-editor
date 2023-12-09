import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addNoteToDB, deleteNoteFromDB, editNoteInDB, loadNotesFromDB} from "./thunks";

export type NoteType = {
	id?: string
	note: string
	tags: string[]
}

export const noteSlice = createSlice({
	name: 'notes',
	initialState: {
		notes: [] as NoteType[],
		filteredTags: [] as string[],
		status: 'idle',
		error: "" as string | undefined,
	},
	reducers: {
		setFilterTag: (state, action: PayloadAction<{ tag: string }>) => {
			const tagToAdd = action.payload.tag;
			if (!state.filteredTags.includes(tagToAdd)) {
				state.filteredTags.push(tagToAdd);
			}
		},
		deleteFilterTag: (state, action: PayloadAction<{tag: string}>) => {
			state.filteredTags = state.filteredTags.filter(t => t !== action.payload.tag)
		}
	},
	extraReducers:(builder) => {
		builder
			.addCase(loadNotesFromDB.fulfilled, (state, action) => {
				state.notes = action.payload;
			})
			.addCase(editNoteInDB.fulfilled, (state, action) => {
				state.notes = action.payload;
			})
			.addCase(deleteNoteFromDB.fulfilled, (state, action) => {
				state.notes = action.payload;
			})
			.addCase(addNoteToDB.fulfilled, (state, action) => {
				state.notes = action.payload;
			})
	},
})

export const {setFilterTag, deleteFilterTag } = noteSlice.actions;
