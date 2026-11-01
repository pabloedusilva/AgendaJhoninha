import { useState, useEffect } from 'react'
import { Eye, EyeOff, Lock, User, Edit3, Save } from 'lucide-react'
import { useNotification } from '../../contexts/NotificationContext'

// TODO: Backend Integration
// GET /api/user/account - Get user account data
// PUT /api/user/account/username - Update username
// PUT /api/user/account/password - Update password

interface AccountData {
  username: string
  password: string
}

export default function Account() {
  const { showSuccess, showError } = useNotification()
  const [accountData, setAccountData] = useState<AccountData>({
    username: 'jhoninha_admin',
    password: 'senhaSegura123'
  })

  const [isEditingUsername, setIsEditingUsername] = useState(false)
  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [tempUsername, setTempUsername] = useState(accountData.username)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    document.title = 'Agenda Jhoninha | Minha Conta'
    loadAccountData()
  }, [])

  const loadAccountData = () => {
    // TODO: Fetch from backend
    // GET /api/user/account
    try {
      const savedData = localStorage.getItem('user_account')
      if (savedData) {
        const data = JSON.parse(savedData)
        setAccountData(data)
        setTempUsername(data.username)
      }
    } catch (error) {
      console.error('Error loading account data:', error)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleUsernameEdit = () => {
    setTempUsername(accountData.username)
    setIsEditingUsername(true)
    setMessage(null)
  }

  const handleUsernameSave = async () => {
    if (!tempUsername.trim()) {
      showError('Campo vazio', 'Nome de usuário não pode estar vazio')
      return
    }

    if (tempUsername === accountData.username) {
      setIsEditingUsername(false)
      return
    }

    setIsSaving(true)

    try {
      // TODO: Backend Integration
      // PUT /api/user/account/username
      // Body: { username: tempUsername, currentPassword }
      await new Promise(resolve => setTimeout(resolve, 800))

      const updatedData = { ...accountData, username: tempUsername }
      setAccountData(updatedData)
      localStorage.setItem('user_account', JSON.stringify(updatedData))
      localStorage.setItem('barber_username', tempUsername)

      showSuccess('Usuário atualizado!', 'Nome de usuário alterado com sucesso.')
      setIsEditingUsername(false)
    } catch (error) {
      console.error('Error updating username:', error)
      showError('Erro ao atualizar', 'Não foi possível atualizar o nome de usuário.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleUsernameCancel = () => {
    setTempUsername(accountData.username)
    setIsEditingUsername(false)
    setMessage(null)
  }

  const handlePasswordEdit = () => {
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setIsEditingPassword(true)
    setMessage(null)
  }

  const handlePasswordSave = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      showError('Campos incompletos', 'Preencha todos os campos de senha')
      return
    }

    if (newPassword !== confirmPassword) {
      showError('Senhas diferentes', 'As senhas não coincidem')
      return
    }

    if (newPassword.length < 6) {
      showError('Senha muito curta', 'A nova senha deve ter no mínimo 6 caracteres')
      return
    }

    setIsSaving(true)

    try {
      // TODO: Backend Integration
      // PUT /api/user/account/password
      // Body: { currentPassword, newPassword }
      // Backend deve validar currentPassword antes de atualizar
      await new Promise(resolve => setTimeout(resolve, 800))

      const updatedData = { ...accountData, password: newPassword }
      setAccountData(updatedData)
      localStorage.setItem('user_account', JSON.stringify(updatedData))

      showSuccess('Senha atualizada!', 'Sua senha foi alterada com sucesso.')
      setIsEditingPassword(false)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error) {
      console.error('Error updating password:', error)
      showError('Senha incorreta', 'A senha atual está incorreta')
    } finally {
      setIsSaving(false)
    }
  }

  const handlePasswordCancel = () => {
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setIsEditingPassword(false)
    setShowNewPassword(false)
    setShowConfirmPassword(false)
    setMessage(null)
  }

  const maskValue = (value: string) => '•'.repeat(value.length)

  return (
    <div className="grid gap-8">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="font-display text-4xl md:text-5xl text-gold mb-2">Minha Conta</h1>
          <p className="text-text-dim">Gerencie suas credenciais de acesso</p>
        </div>
      </div>

      {/* Message Alert */}
      {message && (
        <div 
          className={`animate-fade-in p-4 rounded-2xl border ${
            message.type === 'success' 
              ? 'bg-green-500/10 border-green-500/30 text-green-400' 
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}
        >
          <p className="text-sm font-medium">{message.text}</p>
        </div>
      )}

      <div className="grid gap-6 animate-fade-in-delayed">
        {/* Nome de Usuário */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text">Nome de Usuário</h3>
                <p className="text-xs text-text-dim">Usado para fazer login</p>
              </div>
            </div>

            {!isEditingUsername && (
              <button
                onClick={handleUsernameEdit}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-gold hover:bg-gold/10 transition-all hover:-translate-y-px"
              >
                <Edit3 className="w-4 h-4" />
                <span className="text-sm font-medium">Editar</span>
              </button>
            )}
          </div>

          {isEditingUsername ? (
            <div className="grid gap-3">
              <input
                type="text"
                value={tempUsername}
                onChange={(e) => setTempUsername(e.target.value)}
                placeholder="Digite o novo nome de usuário"
                className="w-full px-4 py-3 bg-surface border border-border rounded-2xl text-text placeholder:text-muted focus:outline-none focus:border-gold transition-colors"
                autoFocus
              />

              <div className="flex gap-3">
                <button
                  onClick={handleUsernameSave}
                  disabled={isSaving}
                  className="btn btn-primary flex-1"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#1b1408] border-t-transparent rounded-full animate-spin" />
                      <span>Salvando...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Salvar</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleUsernameCancel}
                  disabled={isSaving}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-red-500/30 text-red-400 font-semibold hover:border-red-500/50 hover:bg-red-500/5 transition-all hover:-translate-y-px disabled:opacity-50"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className="relative">
              <input
                type="text"
                value={accountData.username}
                readOnly
                className="w-full px-4 py-3 bg-surface border border-border rounded-2xl text-text focus:outline-none cursor-default"
              />
            </div>
          )}
        </div>

        {/* Senha */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text">Senha</h3>
                <p className="text-xs text-text-dim">Mantenha sua conta segura</p>
              </div>
            </div>

            {!isEditingPassword && (
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePasswordVisibility}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-text-dim hover:bg-surface hover:text-text transition-all hover:-translate-y-px"
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>

                <button
                  onClick={handlePasswordEdit}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-gold hover:bg-gold/10 transition-all hover:-translate-y-px"
                >
                  <Edit3 className="w-4 h-4" />
                  <span className="text-sm font-medium">Editar</span>
                </button>
              </div>
            )}
          </div>

          {isEditingPassword ? (
            <div className="grid gap-4">
              {/* Senha Atual */}
              <div className="relative">
                <label className="block text-sm font-medium text-text mb-2">Senha Atual</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Digite sua senha atual"
                  className="w-full px-4 py-3 bg-surface border border-border rounded-2xl text-text placeholder:text-muted focus:outline-none focus:border-gold transition-colors"
                  autoFocus
                />
              </div>

              {/* Nova Senha */}
              <div className="relative">
                <label className="block text-sm font-medium text-text mb-2">Nova Senha</label>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Digite a nova senha"
                  className="w-full px-4 py-3 pr-12 bg-surface border border-border rounded-2xl text-text placeholder:text-muted focus:outline-none focus:border-gold transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-[42px] text-text-dim hover:text-text transition-colors"
                >
                  {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Confirmar Nova Senha */}
              <div className="relative">
                <label className="block text-sm font-medium text-text mb-2">Confirmar Nova Senha</label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirme a nova senha"
                  className="w-full px-4 py-3 pr-12 bg-surface border border-border rounded-2xl text-text placeholder:text-muted focus:outline-none focus:border-gold transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-[42px] text-text-dim hover:text-text transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handlePasswordSave}
                  disabled={isSaving}
                  className="btn btn-primary flex-1"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#1b1408] border-t-transparent rounded-full animate-spin" />
                      <span>Salvando...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Salvar</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handlePasswordCancel}
                  disabled={isSaving}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-red-500/30 text-red-400 font-semibold hover:border-red-500/50 hover:bg-red-500/5 transition-all hover:-translate-y-px disabled:opacity-50"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className="relative">
              <input
                type="text"
                value={showPassword ? accountData.password : maskValue(accountData.password)}
                readOnly
                className="w-full px-4 py-3 bg-surface border border-border rounded-2xl text-text focus:outline-none cursor-default font-mono"
              />
            </div>
          )}
        </div>

        {/* Informação de Segurança */}
        <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/20">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-5 h-5 text-blue-400">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-sm text-blue-400">
              <p className="font-medium mb-1">Dicas de Segurança</p>
              <ul className="space-y-1 text-blue-400/80">
                <li>• Use uma senha forte com letras, números e símbolos</li>
                <li>• Nunca compartilhe suas credenciais com terceiros</li>
                <li>• Altere sua senha regularmente</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
