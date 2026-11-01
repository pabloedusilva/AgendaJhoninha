/**
 * Utilidades PWA simplificadas
 * Mantém apenas funcionalidades essenciais para o funcionamento do app
 */

/**
 * Detecta se o app está rodando em modo standalone (instalado como PWA)
 */
export const isStandalone = (): boolean => {
  // iOS
  if ('standalone' in window.navigator) {
    return (window.navigator as any).standalone === true
  }
  
  // Android e outros
  return window.matchMedia('(display-mode: standalone)').matches ||
         window.matchMedia('(display-mode: fullscreen)').matches
}

/**
 * Verifica se está no iOS
 */
export const isIOS = (): boolean => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
}

/**
 * Verifica se está no Android
 */
export const isAndroid = (): boolean => {
  return /Android/.test(navigator.userAgent)
}

/**
 * Previne comportamentos indesejados do navegador mobile
 */
export const preventMobileBehaviors = () => {
  // iOS: previne pinch-zoom em modo standalone para experiência app-like
  if (isIOS() && isStandalone()) {
    const prevent = (e: Event) => e.preventDefault()
    document.addEventListener('gesturestart', prevent, { passive: false })
    document.addEventListener('gesturechange', prevent, { passive: false })
    document.addEventListener('gestureend', prevent, { passive: false })
  }
}

/**
 * Configurações de viewport dinâmico para dispositivos móveis
 */
export const setupDynamicViewport = () => {
  const setVH = () => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  setVH()
  window.addEventListener('resize', setVH)
  window.addEventListener('orientationchange', setVH)
  
  // Reajusta quando o teclado virtual aparece/desaparece
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', setVH)
  }
}

/**
 * Adiciona classe ao HTML baseado no dispositivo e modo PWA
 */
export const setupDeviceClasses = () => {
  const root = document.documentElement
  
  if (isStandalone()) {
    root.classList.add('pwa-standalone')
  }
  
  if (isIOS()) {
    root.classList.add('ios')
    if (isStandalone()) {
      root.classList.add('ios-standalone')
    }
  }
  
  if (isAndroid()) {
    root.classList.add('android')
    if (isStandalone()) {
      root.classList.add('android-standalone')
    }
  }
}

/**
 * Inicializa todas as configurações PWA essenciais
 */
export const initPWA = () => {
  setupDeviceClasses()
  setupDynamicViewport()
  preventMobileBehaviors()
  
  // Log para debug em desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    console.log('[PWA] Standalone:', isStandalone())
    console.log('[PWA] iOS:', isIOS())
    console.log('[PWA] Android:', isAndroid())
  }
}
