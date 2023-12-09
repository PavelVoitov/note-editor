import {openDB, DBSchema, IDBPObjectStore} from 'idb';
import {NoteType} from "redux/noteSlice";
import {toast} from "react-toastify";

interface NoteDBSchema extends DBSchema {
	'notes': {
		key: string;
		value: {
			id?: string;
			note: string;
			tags: string[];
		};
		indexes: { 'tags': string[] };
	};
}

const dbName = 'noteDB';
const storeName = 'notes';

export const dbPromise = openDB<NoteDBSchema>(dbName, 1, {
	upgrade(db) {
		const notesStore = db.createObjectStore(storeName, { autoIncrement: true });
		notesStore.createIndex('tags', 'tags', { multiEntry: true });
	},
})

export const addTableEntry = async ({ objectStore, entry}: { objectStore:  IDBPObjectStore<NoteDBSchema, ["notes"], "notes", "readwrite">, entry: Omit<NoteType, 'id'>})  => {
	await objectStore.add(entry);
}

export const deleteEntryTable = async ({objectStore, entry}: { objectStore: IDBPObjectStore<NoteDBSchema, ["notes"], "notes", "readwrite">, entry: string }) => {
	await objectStore.delete(entry)
}

export const getAllTableEntries = async <T>(objectStore: any) => {
	return objectStore.getAll()
}

export const editTableEntry = async ({ objectStore, entry }: { objectStore: IDBPObjectStore<NoteDBSchema, ["notes"], "notes", "readwrite">, entry: NoteType }) => {
	try {
		const hasInlineKey = 'id' in entry;
		if (hasInlineKey) {
			await objectStore.put(entry);
		} else {
			await objectStore.put(entry, entry.id);
		}
		return getAllTableEntries(objectStore);
	} catch (error) {
		toast.error(`Error editing table entry: ${error}`);
		throw error;
	}
};