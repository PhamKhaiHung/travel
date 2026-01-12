export function useSnackbar() {
  const show = (message, color = 'success') => {
    window.dispatchEvent(new CustomEvent('show-snackbar', {
      detail: { message, color }
    }))
  }

  return {
    success: (message) => show(message, 'success'),
    error: (message) => show(message, 'error'),
    warning: (message) => show(message, 'warning'),
    info: (message) => show(message, 'info'),
  }
}

