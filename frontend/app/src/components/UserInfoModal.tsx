import { useState } from 'react'
import { createPortal } from 'react-dom'
import Button from '@components/ui/Button'
import Input from '@components/ui/Input'

interface UserInfoModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (name: string, phone: string) => void
}

export default function UserInfoModal({ isOpen, onClose, onSubmit }: UserInfoModalProps) {
  const [nameInput, setNameInput] = useState('')
  const [phoneInput, setPhoneInput] = useState('')
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({})

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim()
    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value.trim()
    
    const newErrors: { name?: string; phone?: string } = {}
    
    if (!/^[A-Za-zÀ-ÿ]+\s+[A-Za-zÀ-ÿ].+/.test(name)) {
      newErrors.name = 'Informe nome e sobrenome.'
    }
    
    const digits = phone.replace(/\D/g, '')
    if (!(digits.length === 10 || digits.length === 11)) {
      newErrors.phone = 'Formato inválido'
    }
    
    if (Object.keys(newErrors).length) {
      setErrors(newErrors)
      return
    }
    
    localStorage.setItem('clientName', name)
    localStorage.setItem('clientPhone', phone)
    onSubmit(name, phone)
  }

  return createPortal(
    <div className="fixed inset-0 z-[2147483647] grid place-items-center backdrop-blur-sm bg-bg/80 p-4">
      <div className="card w-full max-w-md">
        <div className="grid gap-5">
          <div className="text-center">
            <div className="mx-auto w-14 h-14 rounded-full bg-gold/15 border border-gold/30 grid place-items-center mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gold">
                <path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="font-display text-gold text-2xl md:text-3xl mb-2">Antes de começar</h3>
            <p className="text-text/70 text-sm">Informe seus dados para personalizar sua experiência</p>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmit}>
          <Input
            label="Nome completo"
            name="name"
            type="text"
            autoComplete="name"
            autoFocus
            required
            placeholder="Ex: João Silva"
            value={nameInput}
            onChange={(e) => {
              setNameInput(e.target.value)
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }))
            }}
            error={errors.name}
          />
          <Input
            label="Telefone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            required
            placeholder="Ex: (31) 99999-9999"
            value={phoneInput}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, '').slice(0, 11)
              const dd = digits.slice(0, 2)
              const rest = digits.slice(2)
              let left = ''
              let right = ''
              if (rest.length >= 9) {
                left = rest.slice(0, 5)
                right = rest.slice(5, 9)
              } else {
                left = rest.slice(0, 4)
                right = rest.slice(4, 8)
              }
              const formatted = dd ? `(${dd}) ${left}${right ? '-' + right : ''}` : ''
              setPhoneInput(formatted)
              if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }))
            }}
            error={errors.phone}
          />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="w-full">Cancelar</Button>
            <Button type="submit" variant="primary" className="w-full">Continuar</Button>
          </div>
        </form>
        </div>
      </div>
    </div>,
    document.body
  )
}
