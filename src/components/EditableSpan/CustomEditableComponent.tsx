import React, {useState} from "react";
import ReactContentEditable from "react-contenteditable";
import {useRefCallback} from "utils/wrappedContentEditable";
import {highlighted, tagRegex} from "utils/highlighted";


type EditableSpanPropsType = {
	note: string
	changeNote: (title: string) => void
	addTags: (tags: string[]) => void
}

export const CustomEditableComponent = React.memo(({note, changeNote, addTags}: EditableSpanPropsType) => {
	const [editMode, setEditMode] = useState<boolean>(true)
	const [title, setTitle] = useState<string>(note)

	const onEditMode = () => {
		setEditMode(false)
	}

	const offEditMode = useRefCallback(() => {
		setEditMode(true)
		changeNote(title)
	}, [title])

	const EnterChangeTitle = useRefCallback((e) => {
		console.log(title)
		if (e.key === 'Enter') {
			offEditMode()
		}
	}, [title])

	const handleChange = useRefCallback((e) => {
		const textWithoutTags = e.target.value.replace(/<[^>]+>/g, '')
		setTitle(textWithoutTags)

		const extractedTags = Array.from(textWithoutTags.matchAll(tagRegex), (match: string) => match[0]);
		const uniqueTags = Array.from(new Set(extractedTags));

		addTags(uniqueTags)
	}, []);


	return (
				<ReactContentEditable
					html={highlighted(title)}
					onChange={handleChange}
					disabled={editMode}
					onClick={onEditMode}
					onBlur={offEditMode}
					onKeyDown={EnterChangeTitle}
					inputMode={'text'}
					className="cursor-pointer break-words"
				 />
	)
})