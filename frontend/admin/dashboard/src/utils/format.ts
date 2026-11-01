// Format utilities

/**
 * Generate a booking ID in the format agd_YYYYMMDD_XXX
 * Where XXX is the count of bookings for that date (001, 002, etc.)
 * TODO: This will be replaced by backend logic in the future
 */
export function generateBookingId(date: string): string {
	// Format date as YYYYMMDD
	const dateObj = new Date(date)
	const year = dateObj.getFullYear()
	const month = String(dateObj.getMonth() + 1).padStart(2, '0')
	const day = String(dateObj.getDate()).padStart(2, '0')
	const dateStr = `${year}${month}${day}`
	
	// Get existing bookings for this date
	const existingBookings = JSON.parse(localStorage.getItem('userBookings') || '[]')
	const bookingsForDate = existingBookings.filter((b: any) => {
		const bookingDate = new Date(b.date)
		const bookingDateStr = `${bookingDate.getFullYear()}${String(bookingDate.getMonth() + 1).padStart(2, '0')}${String(bookingDate.getDate()).padStart(2, '0')}`
		return bookingDateStr === dateStr
	})
	
	// Generate sequence number
	const sequence = String(bookingsForDate.length + 1).padStart(3, '0')
	
	return `agd_${dateStr}_${sequence}`
}

/**
 * Format a Brazilian phone number to (DDD) 00000-0000
 * Accepts inputs with or without non-digit chars and 10 or 11 digits.
 * - 11 digits: (xx) xxxxx-xxxx
 * - 10 digits: (xx) xxxx-xxxx
 * Fallback: returns the original input if cannot format.
 */
export function formatPhone(input: string): string {
	if (!input) return ''
	const digits = input.replace(/\D/g, '')
	if (digits.length < 10) return input

	const ddd = digits.slice(0, 2)
	if (digits.length >= 11) {
		const part1 = digits.slice(2, 7)
		const part2 = digits.slice(7, 11)
		return `(${ddd}) ${part1}-${part2}`
	} else {
		const part1 = digits.slice(2, 6)
		const part2 = digits.slice(6, 10)
		return `(${ddd}) ${part1}-${part2}`
	}
}

/**
 * Format a number as Brazilian currency (R$ 0,00)
 */
export function formatCurrency(value: number): string {
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL'
	}).format(value)
}

/**
 * Format a date string to Brazilian format (DD/MM/YYYY)
 */
export function formatDate(dateString: string): string {
	const date = new Date(dateString)
	return new Intl.DateTimeFormat('pt-BR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	}).format(date)
}

/**
 * Format a date and time to Brazilian format (DD/MM/YYYY às HH:mm)
 */
export function formatDateTime(dateString: string): string {
	const date = new Date(dateString)
	return new Intl.DateTimeFormat('pt-BR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	}).format(date)
}
