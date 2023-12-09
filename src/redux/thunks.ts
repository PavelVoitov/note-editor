import {createAsyncThunk} from "@reduxjs/toolkit";
import {addTableEntry, dbPromise, deleteEntryTable, editTableEntry} from "indexedDb/indexedDb";
import {NoteType} from "./noteSlice";
import {toast} from "react-toastify";

const executeDBOperation = async (operation: (store: IDBObjectStore | any, params: any) => Promise<void>, params: any) => {
	try {
		const db = await dbPromise;
		const tx = db.transaction('notes', 'readwrite')
		const store = tx.objectStore('notes');
		await operation(store, params)
		return await store.getAll()
	} catch (error) {
		toast.error(`Error: ${error}`)
		throw error;
	}
}

export const loadNotesFromDB = createAsyncThunk('notes/loadNotes', async () => {
	return executeDBOperation(async () => {}, {})
})

export const addNoteToDB = createAsyncThunk('notes/addNoteToDB', async (note: Omit<NoteType, 'id'>) => {
	return executeDBOperation(async (store) => {
		await addTableEntry({ objectStore: store, entry: note })
	}, {})
})

export const deleteNoteFromDB = createAsyncThunk('notes/deleteNoteFromDB', async (noteId: string) => {
	return executeDBOperation(async (store) => {
		await deleteEntryTable({ objectStore: store, entry: noteId });
	}, {})
})

export const editNoteInDB = createAsyncThunk('notes/editNoteInDB', async (editedNote: NoteType) => {
	return executeDBOperation(async (store) => {
		await editTableEntry({ objectStore: store, entry: editedNote })
	}, {})
})
