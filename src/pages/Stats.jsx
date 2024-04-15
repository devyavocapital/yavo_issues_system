import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import useToken from '../../hooks/useToken'
import useUser from '../../hooks/useUser'
import { fnGetStats } from '../utils/getFunctions'
import { graphColors, statusColor } from '../utils/graphColors'

ChartJS.register(ArcElement, Tooltip, Legend)

const Stats = () => {
  const { token } = useToken()
  const { user } = useUser()
  const { category } = user

  const [loading, setLoading] = useState(true)

  const [tickets, setTickets] = useState({})
  const [ticketsByUser, setTicketsByUser] = useState({})
  const [ticketsCreated, setTicketsCreated] = useState({})
  const [ticketsAssignated, setTicketsAssignated] = useState({})

  useEffect(() => {
    const getData = async () => {
      const response = await fnGetStats(token)

      if (category === 1) {
        const labelArray = response.stats.map((t) =>
          t.USER_ASSIGNATED === null ? 'Sin Asignar' : t.USER_ASSIGNATED
        )
        const labelArrayByUsers = response.statsByUser.map((t) =>
          t.USER_ASSIGNATED === null ? 'Sin Asignar' : t.USER_ASSIGNATED
        )
        const colorsStatus = response.stats.map((t) =>
          statusColor.filter((sc) => sc.name === t.STATUS_ISSUE && sc.color)
        )

        setTickets({
          labels: labelArray,
          datasets: [
            {
              label: '# de Tickets asignados',
              data: response.stats.map((t) => t.NUMBER_TICKETS),
              backgroundColor: colorsStatus.map((color) => color[0].color),
              borderColor: colorsStatus.map((color) => color[0].border),
              borderWidth: 1
            }
          ]
        })

        const backgroundColors = response.statsByUser.map((t, index) =>
          graphColors.filter(
            (color) => color.id === index && color.backgroundColor
          )
        )

        setTicketsByUser({
          labels: labelArrayByUsers,
          datasets: [
            {
              label: '# de Tickets',
              data: response.statsByUser.map((t) => t.NUMBER_TICKETS),
              backgroundColor: backgroundColors.map(
                (color) => color[0].backgroundColor
              ),
              borderColor: backgroundColors.map(
                (color) => color[0].borderColor
              ),
              borderWidth: 2
            }
          ]
        })
      }

      const labelUserCreated = response.statsCreated.map((t) =>
        t.USER_ASSIGNATED === null
          ? 'Sin Asignar'
          : `Tickets asignados a: ${t.USER_ASSIGNATED}`
      )

      const colorsStatusCreated = response.statsCreated.map((t) =>
        statusColor.filter((sc) => sc.name === t.STATUS_ISSUE && sc.color)
      )

      setTicketsCreated({
        labels: labelUserCreated,
        datasets: [
          {
            label: '# de Tickets creados por mi',
            data: response.statsCreated.map((t) => t.NUMBER_TICKETS),
            backgroundColor: colorsStatusCreated.map((color) => color[0].color),
            borderColor: colorsStatusCreated.map((color) => color[0].border),
            borderWidth: 2
          }
        ]
      })

      const colorsStatusAssignated = response.statsAssignated.map((t) =>
        statusColor.filter((sc) => sc.name === t.STATUS_ISSUE && sc.color)
      )

      setTicketsAssignated({
        labels: response.statsAssignated.map((t) => t.STATUS_ISSUE),
        datasets: [
          {
            label: ['Tickets que me asignaron'],
            data: response.statsAssignated.map((t) => t.NUMBER_TICKETS),
            backgroundColor: colorsStatusAssignated.map(
              (color) => color[0].color
            ),
            borderColor: colorsStatusAssignated.map((color) => color[0].border),
            borderWidth: 2
          }
        ]
      })
    }
    getData()

    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <div className='w-full mt-10 grid'>
      {category === 1 && (
        <>
          <h1 className='text-5xl font-bold uppercase text-center my-5'>
            Estadisticas Generales
          </h1>
          <div className='w-5/12 px-10 ml-10 '>
            {!loading && (
              <div className='flex'>
                <Doughnut data={tickets} />
                <Doughnut data={ticketsByUser} />
              </div>
            )}
          </div>
        </>
      )}
      <h1 className='text-5xl font-bold uppercase text-center my-5'>
        Mis Estadisticas
      </h1>
      <div className='w-5/12 px-10 ml-10 flex mb-5'>
        {!loading && (
          <>
            <Doughnut data={ticketsCreated} />
            <Doughnut data={ticketsAssignated} />
          </>
        )}
      </div>
    </div>
  )
}

export default Stats
