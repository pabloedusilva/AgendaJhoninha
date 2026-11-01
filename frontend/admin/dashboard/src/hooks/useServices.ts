import { useState, useEffect } from 'react'
import type { Service } from '../types/service.types'

const STORAGE_KEY = 'barbershop_services'

const DEFAULT_SERVICES: Service[] = [
  { id: 'svc_cut', name: 'Corte de cabelo', price: 35.0, duration: 45, image: '/assets/images/services/servico-cabelo-preto.jpg' },
  { id: 'svc_barbe', name: 'Barba/Acabamento', price: 25.0, duration: 30, image: '/assets/images/services/servico-barba-preto.jpg' },
  { id: 'svc_sobr', name: 'Sobrancelha', price: 15.0, duration: 30, image: '/assets/images/services/servico-sobrancelha-preto.jpg' },
  { id: 'svc_pig', name: 'Pigmentação', price: 60.0, duration: 60, image: '/assets/images/services/servico-maquina-preto.jpg' },
  { id: 'svc_degrade', name: 'Degradê', price: 45.0, duration: 45, image: '/assets/images/services/servico-corte2-preto.jpg' },
  { id: 'svc_kids', name: 'Infantil', price: 30.0, duration: 30, image: '/assets/images/services/servico-corte-infantil-preto.jpg' }
]

/**
 * Hook to manage services with localStorage persistence
 * TODO: Replace with API calls when backend is ready
 * - GET /api/services - List all services
 * - POST /api/services - Create new service
 * - PATCH /api/services/:id - Update service
 * - DELETE /api/services/:id - Delete service
 */
export function useServices() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = () => {
    setIsLoading(true)
    try {
      const servicesRaw = localStorage.getItem(STORAGE_KEY)
      const loadedServices: Service[] = servicesRaw ? JSON.parse(servicesRaw) : DEFAULT_SERVICES
      setServices(loadedServices)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(loadedServices))
    } catch (error) {
      console.error('Error loading services:', error)
      setServices(DEFAULT_SERVICES)
    } finally {
      setIsLoading(false)
    }
  }

  const createService = (serviceData: Omit<Service, 'id'>): Service => {
    const newService: Service = {
      ...serviceData,
      id: `svc_${Date.now()}`
    }
    const updated = [...services, newService]
    setServices(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    return newService
  }

  const updateService = (id: string, serviceData: Omit<Service, 'id'>): Service | null => {
    const updated = services.map(s => s.id === id ? { ...serviceData, id } : s)
    const updatedService = updated.find(s => s.id === id)
    if (!updatedService) return null
    
    setServices(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    return updatedService
  }

  const deleteService = (id: string): boolean => {
    const updated = services.filter(s => s.id !== id)
    setServices(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    return true
  }

  const getServiceById = (id: string): Service | undefined => {
    return services.find(s => s.id === id)
  }

  return {
    services,
    isLoading,
    createService,
    updateService,
    deleteService,
    getServiceById,
    refresh: loadServices
  }
}
