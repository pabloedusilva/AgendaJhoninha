/**
 * EXEMPLOS DE USO DO SISTEMA DE NOTIFICAÇÕES
 * 
 * Este arquivo contém exemplos práticos de como usar o sistema de notificações
 * em diferentes cenários do dashboard.
 */

import { useNotification } from '../contexts/NotificationContext'

// ========================================
// EXEMPLO 1: Página de Agendamentos
// ========================================

export function BookingsExample() {
  const { showSuccess, showError, showInfo, showWarning } = useNotification()

  // Confirmar agendamento
  const handleConfirmBooking = async (bookingId: string) => {
    try {
      // await confirmBooking(bookingId)
      showSuccess('Agendamento confirmado!', 'O cliente foi notificado por WhatsApp.')
    } catch (error) {
      showError('Erro ao confirmar', 'Não foi possível confirmar o agendamento.')
    }
  }

  // Cancelar agendamento
  const handleCancelBooking = async (bookingId: string) => {
    try {
      // await cancelBooking(bookingId)
      showWarning('Agendamento cancelado', 'O horário voltou a ficar disponível.')
    } catch (error) {
      showError('Erro ao cancelar', 'Não foi possível cancelar o agendamento.')
    }
  }

  // Remarcar agendamento
  const handleRescheduleBooking = async (bookingId: string, newDate: Date) => {
    try {
      // await rescheduleBooking(bookingId, newDate)
      showSuccess('Reagendado com sucesso!', 'Novo horário salvo.')
    } catch (error) {
      showError('Erro ao reagendar', 'Não foi possível alterar o horário.')
    }
  }

  // Verificar disponibilidade
  const checkAvailability = async (date: Date) => {
    try {
      // const available = await getAvailability(date)
      const available = true
      
      if (available) {
        showInfo('Horário disponível', 'Este horário está livre para agendamento.')
      } else {
        showWarning('Horário ocupado', 'Este horário já está reservado.')
      }
    } catch (error) {
      showError('Erro ao verificar', 'Não foi possível verificar a disponibilidade.')
    }
  }

  return null // Componente de exemplo
}

// ========================================
// EXEMPLO 2: Página de Serviços
// ========================================

export function ServicesExample() {
  const { showSuccess, showError } = useNotification()

  // Adicionar serviço
  const handleAddService = async (serviceData: any) => {
    try {
      // Validação
      if (!serviceData.name) {
        showError('Campo obrigatório', 'O nome do serviço é obrigatório.')
        return
      }

      if (serviceData.price <= 0) {
        showError('Preço inválido', 'O preço deve ser maior que zero.')
        return
      }

      // await createService(serviceData)
      showSuccess('Serviço adicionado!', 'O novo serviço foi cadastrado com sucesso.')
    } catch (error) {
      showError('Erro ao adicionar', 'Não foi possível adicionar o serviço.')
    }
  }

  // Editar serviço
  const handleEditService = async (serviceId: string, serviceData: any) => {
    try {
      // await updateService(serviceId, serviceData)
      showSuccess('Serviço atualizado!', 'As alterações foram salvas.')
    } catch (error) {
      showError('Erro ao atualizar', 'Não foi possível salvar as alterações.')
    }
  }

  // Excluir serviço
  const handleDeleteService = async (serviceId: string) => {
    try {
      // await deleteService(serviceId)
      showSuccess('Serviço excluído!', 'O serviço foi removido do sistema.')
    } catch (error) {
      showError('Erro ao excluir', 'Não foi possível excluir o serviço.')
    }
  }

  // Duplicar serviço
  const handleDuplicateService = async (serviceId: string) => {
    try {
      // await duplicateService(serviceId)
      showSuccess('Serviço duplicado!', 'Uma cópia do serviço foi criada.')
    } catch (error) {
      showError('Erro ao duplicar', 'Não foi possível duplicar o serviço.')
    }
  }

  return null
}

// ========================================
// EXEMPLO 3: Página de Profissionais
// ========================================

export function StaffExample() {
  const { showSuccess, showError, showInfo } = useNotification()

  // Adicionar profissional
  const handleAddProfessional = async (professionalData: any) => {
    try {
      // Validação de imagem
      if (professionalData.image && professionalData.image.size > 5 * 1024 * 1024) {
        showError('Imagem muito grande', 'A imagem deve ter no máximo 5MB.')
        return
      }

      // await createProfessional(professionalData)
      showSuccess('Profissional adicionado!', 'Novo profissional cadastrado no sistema.')
    } catch (error) {
      showError('Erro ao adicionar', 'Não foi possível adicionar o profissional.')
    }
  }

  // Atualizar foto
  const handleUpdatePhoto = async (professionalId: string, photo: File) => {
    try {
      // await updatePhoto(professionalId, photo)
      showSuccess('Foto atualizada!', 'A nova foto foi salva.')
    } catch (error) {
      showError('Erro ao atualizar foto', 'Não foi possível salvar a imagem.')
    }
  }

  // Ativar/Desativar profissional
  const handleToggleActive = async (professionalId: string, active: boolean) => {
    try {
      // await toggleProfessionalStatus(professionalId, active)
      if (active) {
        showSuccess('Profissional ativado!', 'Agora disponível para agendamentos.')
      } else {
        showInfo('Profissional desativado', 'Não receberá novos agendamentos.')
      }
    } catch (error) {
      showError('Erro ao alterar status', 'Não foi possível alterar o status.')
    }
  }

  return null
}

// ========================================
// EXEMPLO 4: Configurações
// ========================================

export function SettingsExample() {
  const { showSuccess, showError, showInfo } = useNotification()

  // Salvar configurações gerais
  const handleSaveSettings = async (settings: any) => {
    try {
      // await saveSettings(settings)
      showSuccess('Configurações salvas!', 'Todas as alterações foram aplicadas.')
    } catch (error) {
      showError('Erro ao salvar', 'Não foi possível salvar as configurações.')
    }
  }

  // Resetar configurações
  const handleResetSettings = async () => {
    try {
      // await resetSettings()
      showInfo('Configurações resetadas', 'Os valores padrão foram restaurados.')
    } catch (error) {
      showError('Erro ao resetar', 'Não foi possível resetar as configurações.')
    }
  }

  // Exportar dados
  const handleExportData = async () => {
    try {
      // await exportData()
      showSuccess('Dados exportados!', 'O arquivo foi baixado com sucesso.')
    } catch (error) {
      showError('Erro ao exportar', 'Não foi possível exportar os dados.')
    }
  }

  // Importar dados
  const handleImportData = async (file: File) => {
    try {
      // Validação
      if (file.type !== 'application/json') {
        showError('Arquivo inválido', 'Por favor, envie um arquivo JSON.')
        return
      }

      // await importData(file)
      showSuccess('Dados importados!', 'Os dados foram importados com sucesso.')
    } catch (error) {
      showError('Erro ao importar', 'Não foi possível importar os dados.')
    }
  }

  // Limpar cache
  const handleClearCache = async () => {
    try {
      // await clearCache()
      showSuccess('Cache limpo!', 'Todos os dados em cache foram removidos.')
    } catch (error) {
      showError('Erro ao limpar cache', 'Não foi possível limpar o cache.')
    }
  }

  return null
}

// ========================================
// EXEMPLO 5: Upload de Arquivos
// ========================================

export function FileUploadExample() {
  const { showSuccess, showError, showWarning, showInfo } = useNotification()

  const handleFileUpload = async (file: File) => {
    // Validação de tipo
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      showError('Tipo inválido', 'Apenas imagens JPG, PNG ou WEBP são permitidas.')
      return
    }

    // Validação de tamanho
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      showError('Arquivo muito grande', 'A imagem deve ter no máximo 5MB.')
      return
    }

    try {
      showInfo('Enviando...', 'Aguarde enquanto processamos sua imagem.')
      
      // await uploadFile(file)
      
      showSuccess('Upload concluído!', 'Sua imagem foi enviada com sucesso.')
    } catch (error) {
      showError('Erro no upload', 'Não foi possível enviar o arquivo.')
    }
  }

  return null
}

// ========================================
// EXEMPLO 6: Formulários com Validação
// ========================================

export function FormValidationExample() {
  const { showError, showSuccess } = useNotification()

  const validateAndSave = async (formData: any) => {
    // Validações múltiplas
    const errors: string[] = []

    if (!formData.name) errors.push('Nome é obrigatório')
    if (!formData.email) errors.push('Email é obrigatório')
    if (!formData.phone) errors.push('Telefone é obrigatório')

    if (formData.email && !formData.email.includes('@')) {
      errors.push('Email inválido')
    }

    if (formData.phone && formData.phone.length < 10) {
      errors.push('Telefone inválido')
    }

    // Mostra primeiro erro encontrado
    if (errors.length > 0) {
      showError('Campos inválidos', errors[0])
      return
    }

    try {
      // await saveForm(formData)
      showSuccess('Formulário enviado!', 'Seus dados foram salvos com sucesso.')
    } catch (error) {
      showError('Erro ao enviar', 'Não foi possível enviar o formulário.')
    }
  }

  return null
}

// ========================================
// EXEMPLO 7: Operações em Lote
// ========================================

export function BatchOperationsExample() {
  const { showSuccess, showError, showWarning } = useNotification()

  const handleBatchDelete = async (ids: string[]) => {
    if (ids.length === 0) {
      showWarning('Nenhum item selecionado', 'Selecione pelo menos um item para excluir.')
      return
    }

    try {
      // await batchDelete(ids)
      showSuccess(
        `${ids.length} ${ids.length === 1 ? 'item excluído' : 'itens excluídos'}!`,
        'Os itens foram removidos permanentemente.'
      )
    } catch (error) {
      showError('Erro na exclusão', 'Não foi possível excluir alguns itens.')
    }
  }

  const handleBatchUpdate = async (updates: any[]) => {
    let successCount = 0
    let errorCount = 0

    for (const update of updates) {
      try {
        // await updateItem(update)
        successCount++
      } catch {
        errorCount++
      }
    }

    if (errorCount === 0) {
      showSuccess('Tudo atualizado!', `${successCount} itens foram atualizados.`)
    } else if (successCount > 0) {
      showWarning(
        'Atualização parcial',
        `${successCount} atualizados, ${errorCount} com erro.`
      )
    } else {
      showError('Falha na atualização', 'Não foi possível atualizar nenhum item.')
    }
  }

  return null
}

// ========================================
// EXEMPLO 8: Sincronização de Dados
// ========================================

export function SyncExample() {
  const { showSuccess, showError, showInfo } = useNotification()

  const handleSync = async () => {
    try {
      showInfo('Sincronizando...', 'Buscando dados do servidor.')
      
      // await syncData()
      
      showSuccess('Sincronização concluída!', 'Seus dados estão atualizados.')
    } catch (error) {
      showError('Erro na sincronização', 'Não foi possível sincronizar os dados.')
    }
  }

  const handleOfflineMode = () => {
    showWarning(
      'Modo offline',
      'Você está sem conexão. As alterações serão sincronizadas quando voltar online.'
    )
  }

  const handleOnlineMode = () => {
    showInfo('Conexão restaurada', 'Sincronizando alterações pendentes...')
  }

  return null
}

export default {
  BookingsExample,
  ServicesExample,
  StaffExample,
  SettingsExample,
  FileUploadExample,
  FormValidationExample,
  BatchOperationsExample,
  SyncExample,
}
