import React from 'react';

import axios from 'axios';

import { TableRow } from '../components/TableRow/TableRow';

const API_URL = "http://logiq.statistics.datasport.cz/api/v1/individual"
const COMPETITION_UUID = "2f70259b-5609-47c9-92d4-008f9ef940f1"

const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer 4f92fbc1d3016712034caee5a25e07ec0fbbefb1",
}

type TMetrics = string[]

interface IResponse {
  team: string
  players: Omit<React.ComponentProps<typeof TableRow>, "team">[]
}

type TPlayerStats = React.ComponentProps<typeof TableRow>

export const useTriggerFetch = (metrics: TMetrics) => {
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState<TPlayerStats[]>([])
  const [error, setError] = React.useState<any>(null)

  const triggerFetch = () => {
    setLoading(true)
    setError(null)
    async function fetchData() {
      try {
        const response = await axios.post<IResponse[]>(
          `${API_URL}/${COMPETITION_UUID}`,
          {
            gameState: "5:5",
            timeOnIce: 600,
            metrics,
          },
          {
            headers: headers,
          }
        )
        const playersStats: TPlayerStats[] = []
        for (let i = 0; i < response.data.length; i++) {
          const team = response.data[i].team
          for (let j = 0; j < response.data[i].players.length; j++) {
            const player = response.data[i].players[j].player
            const stats = response.data[i].players[j].stats
            playersStats.push({
              team,
              player,
              stats,
            })
          }
        }
        setData(playersStats)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }

  return { data, loading, error, triggerFetch }
}
