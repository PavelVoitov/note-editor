import {Paper} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import {styled} from "@mui/material/styles";
import {Tag} from "components/Tag/Tag";
import {NoteType} from "../../../redux/noteSlice";
import {useDispatch} from "react-redux";
import {DeleteButton} from "components/DeleteButton/DeleteButton";
import {CustomEditableComponent} from "components/EditableSpan/CustomEditableComponent";
import {deleteNoteFromDB, editNoteInDB} from "../../../redux/thunks";
import {AppDispatch} from "redux/store";

type Props = {
	note: NoteType
}

const Item = styled(Paper)(({theme}) => ({
	...theme.typography.body2,
	textAlign: 'left',
	color: theme.palette.text.secondary,
	lineHeight: '20px',
	padding: '10px 20px',
	position: 'relative',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
}));

export const Note = ({note}: Props) => {
	const dispatch = useDispatch<AppDispatch>()
	const [tags, setTags] = useState<string[]>(note.tags)

	const handleDelete = () => {
		if (note.id)
			dispatch(deleteNoteFromDB(note.id))
	};

	const addTags = (addedTags: string[]) => {
		const uniqArray = Array.from(new Set([...tags, ...addedTags]))
		setTags(uniqArray)
	}

	const changeNote = (modifiedNote: string) => {
		console.log(modifiedNote)
		if (note.id)
		dispatch(editNoteInDB({id: note.id, note: modifiedNote, tags}))
	}

	return (
		<Item elevation={6}>
			<div className={'absolute top-1 right-1'}>
				<DeleteButton onClick={handleDelete}/>
			</div>
			<div className="mx-10 mb-5 mt-2 whitespace-normal break-words">
				<CustomEditableComponent note={note.note} changeNote={changeNote} addTags={addTags}/>
			</div>
			<div className={"flex-1 mx-10 mb-3"}>
				{tags.map((t) => <Tag key={t} tag={t}/>
				)}
			</div>
		</Item>
	)
}