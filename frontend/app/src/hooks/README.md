# Custom Hooks

Hooks customizados reutilizáveis da aplicação.

## useNotificationPermission

Hook para gerenciar permissões de notificações push do navegador.

### Funcionalidades

- ✅ Verifica suporte a notificações no navegador
- ✅ Detecta permissão atual do usuário
- ✅ Solicita permissão ao usuário
- ✅ Salva preferências no localStorage
- ✅ Monitora mudanças de permissão em tempo real
- ✅ Envia notificação de teste ao ativar

### Interface

```typescript
interface NotificationPermissionState {
  permission: NotificationPermission // 'granted' | 'denied' | 'default'
  isSupported: boolean // Se o navegador suporta notificações
  hasAskedBefore: boolean // Se já perguntamos antes ao usuário
}
```

### Retorno

```typescript
{
  permission: NotificationPermission
  isSupported: boolean
  hasAskedBefore: boolean
  shouldShowModal: () => boolean
  requestPermission: () => Promise<boolean>
  denyPermission: () => void
}
```

### Métodos

#### `shouldShowModal()`
Retorna `true` se o modal de permissão deve ser exibido.

**Condições:**
- Navegador suporta notificações
- Permissão ainda não foi concedida
- Usuário ainda não foi perguntado antes
- Não existe preferência salva

#### `requestPermission()`
Solicita permissão ao usuário via API do navegador.

**Retorno:**
- `true`: Permissão concedida
- `false`: Permissão negada ou erro

**Efeitos:**
- Marca como perguntado no localStorage
- Salva preferência como 'enabled' se concedida
- Envia notificação de teste se concedida
- Salva preferência como 'disabled' se negada

#### `denyPermission()`
Marca que o usuário recusou as notificações.

**Efeitos:**
- Marca como perguntado no localStorage
- Salva preferência como 'disabled'

### Armazenamento Local

| Key | Valor | Descrição |
|-----|-------|-----------|
| `notification_permission_asked` | `'true'` \| `null` | Se já perguntamos ao usuário |
| `notification_preference` | `'enabled'` \| `'disabled'` \| `null` | Preferência do usuário |

### Exemplo de Uso

```typescript
import { useNotificationPermission } from '@/hooks/useNotificationPermission'

function MyComponent() {
  const [showModal, setShowModal] = useState(false)
  const { 
    permission,
    isSupported, 
    shouldShowModal, 
    requestPermission, 
    denyPermission 
  } = useNotificationPermission()

  useEffect(() => {
    // Verificar se deve mostrar modal na montagem
    if (shouldShowModal()) {
      setTimeout(() => setShowModal(true), 800)
    }
  }, [shouldShowModal])

  const handleAllow = async () => {
    const granted = await requestPermission()
    if (granted) {
      console.log('Notificações ativadas!')
    }
    setShowModal(false)
  }

  const handleDeny = () => {
    denyPermission()
    setShowModal(false)
  }

  if (!isSupported) {
    return <p>Seu navegador não suporta notificações</p>
  }

  return (
    <div>
      {permission === 'granted' && <p>✅ Notificações ativadas</p>}
      {showModal && (
        <NotificationModal onAllow={handleAllow} onDeny={handleDeny} />
      )}
    </div>
  )
}
```

### Compatibilidade

**Suportado:**
- ✅ Chrome/Edge 50+
- ✅ Firefox 44+
- ✅ Safari 7+
- ✅ Opera 37+

**Não suportado:**
- ❌ Internet Explorer
- ❌ Navegadores muito antigos

**Nota:** O hook detecta automaticamente se o navegador não suporta notificações e ajusta o comportamento.

### Monitoramento de Mudanças

O hook utiliza a Permissions API (quando disponível) para monitorar mudanças em tempo real:

```typescript
// O estado é atualizado automaticamente se:
// - Usuário concede/revoga permissão nas configurações do navegador
// - Permissão muda por qualquer outro motivo
```

Se a Permissions API não estiver disponível, o hook ainda funciona mas não monitora mudanças em tempo real.

### Notificação de Teste

Ao conceder permissão, uma notificação de teste é enviada:

```typescript
{
  title: 'Notificações Ativadas! 🔔',
  body: 'Você receberá lembretes sobre seus agendamentos.',
  icon: '/assets/images/logos/logo.png',
  badge: '/assets/images/logos/logo.png',
  tag: 'notification-enabled'
}
```

### Integração com Backend

```typescript
// TODO: Quando o backend estiver pronto, integrar com:

// Ao ativar notificações:
// POST /api/user/notifications/subscribe
// Body: { token: pushNotificationToken, phone: userPhone }

// Ao desativar notificações:
// POST /api/user/notifications/unsubscribe
// Body: { phone: userPhone }
```
