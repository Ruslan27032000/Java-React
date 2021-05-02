export const convertDate = (date) => {
	const period = new Date(date)
	period.setDate(period.getDate() + 1);
	const day = period.getDate().toString().length === 1 ? `0${period.getDate()}` : period.getDate()
	const month = (period.getMonth() + 1).toString().length === 1 ? `0${period.getMonth() + 1}` : period.getMonth() + 1
	const year = period.getFullYear().toString()
	const hours = new Date(period).getHours().toString().length === 1 ? `0${new Date(period).getHours()}` : new Date(period).getHours()
	const minutes = new Date(period).getMinutes().toString().length === 1 ? `0${new Date(period).getMinutes()}` : new Date(period).getMinutes()
	return `${day}-${month}-${year} ${hours}:${minutes}`
}
