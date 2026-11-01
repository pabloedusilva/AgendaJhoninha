# Componentes de Agendamentos

Esta pasta contém todos os componentes relacionados à funcionalidade de agendamentos do usuário.

## Componentes

### BookingCard
Exibe um card com as informações de um agendamento individual.

**Props:**
- `booking: Booking` - Dados do agendamento
- `onCancel: (id: string) => void` - Callback para cancelar o agendamento

### FilterTabs
Componente de abas para filtrar agendamentos por status (Todos, Agendados, Concluídos, Cancelados).

**Props:**
- `currentFilter: FilterState` - Filtro atual selecionado
- `onFilterChange: (filter: FilterState) => void` - Callback quando o filtro muda

### CancelConfirmModal
Modal de confirmação para cancelamento de agendamento.

**Props:**
- `onConfirm: () => void` - Callback ao confirmar cancelamento
- `onCancel: () => void` - Callback ao cancelar a ação
- `bookingTime: string` - Horário do agendamento
- `bookingDate: string` - Data do agendamento

### NotificationPermissionModal
Modal que solicita permissão do usuário para receber notificações push sobre agendamentos.

**Quando é exibido:**
- Na primeira vez que o usuário acessa "Meus Agendamentos"
- Apenas se as notificações ainda não foram configuradas
- Apenas se o navegador suportar notificações

**Props:**
- `onAllow: () => void` - Callback quando o usuário aceita receber notificações
- `onDeny: () => void` - Callback quando o usuário recusa notificações

**Características:**
- Animação suave de entrada (slide up from bottom)
- Design responsivo e moderno
- Lista visual dos benefícios de ativar notificações
- Botões explicativos e intuitivos
- Nota sobre privacidade

**Armazenamento Local:**
- `notification_permission_asked`: Indica se já perguntamos ao usuário
- `notification_preference`: Preferência do usuário ('enabled' ou 'disabled')

## Hook Relacionado

### useNotificationPermission
Hook customizado para gerenciar permissões de notificação.

**Retorno:**
```typescript
{
  permission: NotificationPermission // 'granted' | 'denied' | 'default'
  isSupported: boolean // Se o navegador suporta notificações
  hasAskedBefore: boolean // Se já perguntamos antes
  shouldShowModal: () => boolean // Se deve mostrar o modal
  requestPermission: () => Promise<boolean> // Solicita permissão
  denyPermission: () => void // Marca como recusado
}
```

**Uso:**
```typescript
import { useNotificationPermission } from '@/hooks/useNotificationPermission'

const { shouldShowModal, requestPermission, denyPermission } = useNotificationPermission()

// Verificar se deve mostrar modal
if (shouldShowModal()) {
  setShowModal(true)
}

// Solicitar permissão
const granted = await requestPermission()

// Recusar permissão
denyPermission()
```

## Fluxo de Notificações

1. Usuário acessa "Meus Agendamentos"
2. Sistema verifica se deve mostrar o modal (`shouldShowModal`)
3. Se sim, exibe o modal após 800ms (delay para melhor UX)
4. Usuário escolhe:
   - **Ativar**: Solicita permissão do navegador e mostra notificação de teste
   - **Agora não**: Marca preferência como recusada
5. Preferência é salva no localStorage
6. Modal não aparece novamente

## Estilos

Todos os componentes seguem o design system do projeto:
- Cards com `rounded-2xl`
- Botões com `rounded-full`
- Animações suaves com `transition-all`
- Cores do tema (gold, surface, border)
- Responsividade mobile-first

## Dependências

- `react-dom/createPortal`: Para renderizar modais
- `lucide-react`: Para ícones (usado em outros componentes)
- `clsx`: Para classes condicionais nos botões
