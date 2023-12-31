import React, {useState} from "react";
import {AddBox} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {useDispatch} from "react-redux";
import {addNoteToDB} from "../../redux/thunks";
import {AppDispatch} from "redux/store";
import ReactContentEditable from "react-contenteditable";
import {highlighted, tagRegex} from "utils/highlighted";
import {useRefCallback} from "utils/wrappedContentEditable";
import {toast} from "react-toastify";
import {formatDate} from "utils/formatDate";


type AddItemFormPropsType = {
	disabled?: boolean
}

export const AddNoteForm = React.memo(({disabled = false}: AddItemFormPropsType) => {
	const dispatch = useDispatch<AppDispatch>()

	const [title, setTitle] = useState<string>('');
	const [tags, setTags] = useState<string[] | []>([])

	const changeNoteTitle = useRefCallback((e) => {
		const textWithoutHtmlTags = e.target.value.replace(/<[^>]+>/g, '')
		setTitle(textWithoutHtmlTags)
		const extractedTags = Array.from(textWithoutHtmlTags.matchAll(tagRegex), (match: string) => match[0])
		const uniqueTags = Array.from(new Set(extractedTags))
		setTags(uniqueTags)
	}, [])

	const addTaskHandler = async () => {
		if (title.trim() !== '') {
			try {
				const dateAsId = formatDate(new Date)
				await dispatch(addNoteToDB({id: dateAsId, note: title.trim(), tags}))
				setTitle('')
			} catch (e) {
				toast.error(`Error: ${e}`)
			}
		} else {
			toast.error('Can\'t add empty note!')
		}
	}

	const EnterAddTitle = useRefCallback(async (e) => {
		if (e.key === "Enter") {
			await addTaskHandler()
		}
	}, [title])

	return (
		<div className={"flex my-5 mx-10"}>
			<div className={"bg-amber-50 rounded-lg w-1/2"}>
				<ReactContentEditable
					html={highlighted(title)}
					onChange={changeNoteTitle}
					disabled={false}
					inputMode={'text'}
					onKeyDown={EnterAddTitle}
					className="cursor-pointer border-b-custom min-h-full"
				/>
			</div>
			<IconButton
				disabled={disabled}
				onClick={addTaskHandler}
				style={{marginLeft: 11}}
			>
				<AddBox style={{color: '#d87706'}}/>
			</IconButton>
		</div>
	)
})