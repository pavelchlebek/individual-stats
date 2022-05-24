import React from 'react';

import axios from 'axios';

const API_URL = "http://logiq.statistics.datasport.cz/api/v1/individual"
const COMPETETION_UUID = "2f70259b-5609-47c9-92d4-008f9ef940f1"

const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer 57856d7580b3beb6a0c5d768d405449992f4bc37",
}

const query = {
  gameState: "5:5",
  timeOnIce: 600,
  metrics: ["xg60", "c60", "sogc_pct"],
}

export const useTriggerFetch = () => {
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState<any>(null)
  const [error, setError] = React.useState<any>(null)

  const triggerFetch = () => {
    setLoading(true)
    async function fetchData() {
      try {
        const response = await axios.post(`${API_URL}/${COMPETETION_UUID}`, query, {
          headers: headers,
        })
        setData(response.data)
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
