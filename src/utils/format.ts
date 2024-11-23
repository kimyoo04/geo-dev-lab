import { default as dayjs } from 'dayjs'

export const formatDate = (date: number, format: string = 'MMMM D, YYYY h:mm A') => {
  return dayjs(date).format(format)
}
