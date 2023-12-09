export const formatDate = (date: Date) => {
	const options = {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false,
	} as const

	return new Intl.DateTimeFormat('en-US', options).format(date);
};