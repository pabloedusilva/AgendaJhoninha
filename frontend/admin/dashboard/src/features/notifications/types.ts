export type NotificationKind =
	| 'booking_created'
	| 'booking_cancelled'
	| 'booking_completed'
	| 'booking_upcoming'

export interface BookingNotificationData {
	bookingId?: string
	clientName?: string
	serviceName?: string
	date?: string // YYYY-MM-DD
	time?: string // HH:mm
	status?: 'scheduled' | 'completed' | 'cancelled'
}

export interface AppNotification {
	id: string
	kind: NotificationKind
	title: string
	message: string
	createdAt: number
	readAt?: number
	data?: BookingNotificationData
}
