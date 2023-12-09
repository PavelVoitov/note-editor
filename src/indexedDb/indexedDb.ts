import {DBSchema, IDBPObjectStore, openDB} from 'idb';
import {NoteType} from "redux/noteSlice";

interface NoteDBSchema extends DBSchema {
	'notes': {
		key: string;
		value: {
			id: string;
			note: string;
			tags: string[];
		}
	}
}

const dbName = 'noteDB';
const storeName = 'notes';

export const dbPromise = openDB<NoteDBSchema>(dbName, 1, {
	upgrade(db) {
		db.createObjectStore(storeName, { autoIncrement: true });
	},
})

export const addTableEntry = async ({ objectStore, entry}: { objectStore:  IDBPObjectStore<NoteDBSchema, ["notes"], "notes", "readwrite">, entry: NoteType})  => {
	await objectStore.add(entry, entry.id);
}

export const deleteEntryTable = async ({objectStore, entry}: { objectStore: IDBPObjectStore<NoteDBSchema, ["notes"], "notes", "readwrite">, entry: string }) => {
	await objectStore.delete(entry)
}

export const getAllTableEntries = async <T>(objectStore: any) => {
	return objectStore.getAll()
}

export const editTableEntry = async ({ objectStore, entry }: { objectStore: IDBPObjectStore<NoteDBSchema, ["notes"], "notes", "readwrite">, entry: NoteType }) => {
	await objectStore.put(entry, entry.id)
}