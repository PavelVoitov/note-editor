export const tagRegex = /\B#\w+/gi

export const highlighted = (str: string) => {
	return str.replace(tagRegex, function (match) {
		return `<mark class="tag-highlight text-white px-1">${match}</mark>`
	})
}