export const statusFilters = [
  { name: 'all', color: '', status: 1, text: 'Todos' },
  { name: 'pendient', color: '#FFF508', status: 2, text: 'Pendientes' },
  { name: 'finished', color: '#00BB07', status: 3, text: 'Finalizados' },
  { name: 'urgently', color: '#FF0707', status: 4, text: 'Urgente' }
  // { name: "nonStatus", color: "#9B9B9B", status: 5, text: "Sin Estatus" },
]

export const esStatus = (status) => {
  let esText = ''
  if (status === 'pendient') esText = 'Pendiente'
  if (status === 'finished') esText = 'Finalizado'
  if (status === 'urgently') esText = 'Urgente'
  return esText
}
