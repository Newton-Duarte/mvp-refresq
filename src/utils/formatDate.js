export function formatDate(date, locales, options = {}) {
  return new Intl.DateTimeFormat(locales, options).format(date);
}

export function formatDateBR(date) {
  return formatDate(date, 'pt-BR')
}

export function formatDateTimeBR(date) {
  return formatDate(date, 'pt-BR', {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric',
    hour12: false
  })
}