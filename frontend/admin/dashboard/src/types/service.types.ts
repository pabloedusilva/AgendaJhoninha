export interface Service {
  id: string
  name: string
  price: number
  duration: number
  image: string
}

export interface ServiceFormData {
  name: string
  price: string
  duration: string
  image: string
}
