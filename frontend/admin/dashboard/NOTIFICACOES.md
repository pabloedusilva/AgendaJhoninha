# 🔔 Sistema de Notificações - Agenda Jhoninha

Sistema completo de notificações toast para o dashboard admin da Agenda Jhoninha.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Componentes](#componentes)
- [Como Usar](#como-usar)
- [Tipos de Notificações](#tipos-de-notificações)
- [Customização](#customização)
- [Páginas Implementadas](#páginas-implementadas)

## 🎯 Visão Geral

O sistema de notificações foi implementado para fornecer feedback visual consistente para todas as ações do usuário no dashboard. As notificações aparecem no canto superior direito da tela (ou topo em mobile) e desaparecem automaticamente após alguns segundos.

### Características:

✅ **Design moderno** - Segue o design system do app com cores douradas e escuras  
✅ **Animações suaves** - Slide in/out com transições fluidas  
✅ **Responsivo** - Adapta-se perfeitamente a mobile e desktop  
✅ **Acessível** - Suporta leitores de tela e navegação por teclado  
✅ **Auto-dismiss** - Fecha automaticamente após 4 segundos (customizável)  
✅ **Empilhável** - Múltiplas notificações aparecem em stack  
✅ **PWA Ready** - Funciona perfeitamente em modo standalone  

## 🧩 Componentes

### 1. `Toast.tsx`
Componente individual de notificação com ícone, título, mensagem e botão de fechar.

### 2. `ToastContainer.tsx`
Container que renderiza todas as notificações ativas usando React Portal.

### 3. `NotificationContext.tsx`
Context Provider que gerencia o estado global das notificações.

## 🚀 Como Usar

### Configuração Inicial

O `NotificationProvider` já está configurado no `src/app/index.tsx`:

```tsx
import { NotificationProvider } from '@barber/contexts/NotificationContext'

<NotificationProvider>
  <App />
</NotificationProvider>
```

### Usando em Componentes

```tsx
import { useNotification } from '../../contexts/NotificationContext'

function MeuComponente() {
  const { showSuccess, showError, showWarning, showInfo } = useNotification()

  const handleSave = async () => {
    try {
      // ... lógica de salvamento
      showSuccess('Salvo com sucesso!', 'Os dados foram salvos.')
    } catch (error) {
      showError('Erro ao salvar', 'Não foi possível salvar os dados.')
    }
  }

  return <button onClick={handleSave}>Salvar</button>
}
```

## 🎨 Tipos de Notificações

### Success (Verde)
```tsx
showSuccess('Título', 'Mensagem opcional')
```
**Uso:** Confirmar ações bem-sucedidas (salvar, adicionar, atualizar, excluir)

### Error (Vermelho)
```tsx
showError('Título', 'Mensagem opcional')
```
**Uso:** Indicar erros ou falhas nas operações

### Warning (Amarelo)
```tsx
showWarning('Título', 'Mensagem opcional')
```
**Uso:** Alertas e avisos importantes

### Info (Azul)
```tsx
showInfo('Título', 'Mensagem opcional')
```
**Uso:** Informações gerais e dicas

### Notificação Customizada
```tsx
showNotification({
  type: 'success',
  title: 'Título',
  message: 'Mensagem',
  duration: 6000 // 6 segundos
})
```

## 📱 Páginas Implementadas

### ✅ Serviços (`ListServices.tsx`)
- ✓ Adicionar serviço
- ✓ Editar serviço
- ✓ Excluir serviço

### ✅ Profissionais (`Staff.tsx`)
- ✓ Adicionar profissional
- ✓ Editar profissional
- ✓ Excluir profissional
- ✓ Erro ao processar imagem

### ✅ Horários de Funcionamento (`WorkingHours.tsx`)
- ✓ Salvar horários

### ✅ Perfil da Barbearia (`Profile.tsx`)
- ✓ Atualizar perfil
- ✓ Limpar cache

### ✅ Minha Conta (`Account.tsx`)
- ✓ Atualizar nome de usuário
- ✓ Atualizar senha
- ✓ Validações de formulário

## 🎨 Customização

### Alterar Duração Padrão

Edite `src/contexts/NotificationContext.tsx`:

```tsx
const showNotification = useCallback((notification: Omit<Toast, 'id'>) => {
  const newToast: Toast = {
    id,
    ...notification,
    duration: notification.duration ?? 4000, // Altere aqui
  };
  // ...
}, []);
```

### Alterar Cores

As cores seguem o design system em `src/styles/index.css`:

```css
.toast-success { color: #10b981; } /* Verde */
.toast-error { color: #ef4444; }   /* Vermelho */
.toast-warning { color: #f59e0b; } /* Amarelo */
.toast-info { color: #3b82f6; }    /* Azul */
```

### Alterar Posição

Edite `src/components/Notification/Toast.css`:

```css
.toast-container {
  position: fixed;
  top: 0;
  right: 0; /* Altere para left: 0 para esquerda */
  /* ... */
}
```

## 📝 Exemplos Práticos

### Exemplo 1: Criar Item com Validação

```tsx
const handleCreate = async (data: FormData) => {
  // Validação
  if (!data.name) {
    showWarning('Campo obrigatório', 'Por favor, preencha o nome.')
    return
  }

  try {
    await createItem(data)
    showSuccess('Item criado!', 'O novo item foi adicionado com sucesso.')
  } catch (error) {
    showError('Erro ao criar', 'Não foi possível criar o item. Tente novamente.')
  }
}
```

### Exemplo 2: Excluir com Confirmação

```tsx
const handleDelete = async (id: string) => {
  try {
    await deleteItem(id)
    showSuccess('Item excluído!', 'O item foi removido permanentemente.')
  } catch (error) {
    showError('Erro ao excluir', 'Não foi possível excluir o item.')
  }
}
```

### Exemplo 3: Múltiplas Notificações

```tsx
const handleBatchUpdate = async (items: Item[]) => {
  let successCount = 0
  let errorCount = 0

  for (const item of items) {
    try {
      await updateItem(item)
      successCount++
    } catch {
      errorCount++
    }
  }

  if (successCount > 0) {
    showSuccess(
      'Atualização concluída', 
      `${successCount} item(ns) atualizado(s) com sucesso.`
    )
  }

  if (errorCount > 0) {
    showError(
      'Alguns erros ocorreram', 
      `${errorCount} item(ns) não puderam ser atualizados.`
    )
  }
}
```

## 🔧 Boas Práticas

1. **Seja específico nos títulos** - "Serviço adicionado" é melhor que "Sucesso"
2. **Use mensagens descritivas** - Explique o que aconteceu
3. **Não abuse das notificações** - Use apenas para ações importantes
4. **Combine com estados de loading** - Mostre loading durante a operação
5. **Trate todos os erros** - Sempre forneça feedback, mesmo em caso de erro

## 🐛 Troubleshooting

### Notificações não aparecem
- ✓ Verifique se `NotificationProvider` está no `index.tsx`
- ✓ Certifique-se de importar o hook corretamente
- ✓ Verifique o console para erros

### Notificações não somem
- ✓ Verifique se há erros de JavaScript no console
- ✓ Teste com `duration` maior para debug

### Estilo quebrado
- ✓ Certifique-se de que `Toast.css` está importado
- ✓ Verifique se as classes CSS estão corretas

## 📦 Arquivos do Sistema

```
src/
├── components/
│   └── Notification/
│       ├── Toast.tsx              # Componente de notificação
│       ├── Toast.css              # Estilos das notificações
│       ├── ToastContainer.tsx     # Container de notificações
│       └── index.ts               # Exports
└── contexts/
    └── NotificationContext.tsx    # Provider e hook
```

## 🎯 Próximos Passos

Futuras melhorias sugeridas:

- [ ] Notificações com ações (botões de ação)
- [ ] Notificações persistentes (não fecham automaticamente)
- [ ] Sons de notificação (opcional)
- [ ] Histórico de notificações
- [ ] Integração com notificações push do navegador

---

**Desenvolvido para Agenda Jhoninha** 💈✨
