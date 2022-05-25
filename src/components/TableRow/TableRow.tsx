import React from 'react';

import classes from './TableRow.module.css';

interface IPlayerStats {
  xg60?: number
  c60?: number
  sogc_pct?: number
  toi: number
  gp: number
}

interface IProps {
  team: string
  player: string
  stats: IPlayerStats
}

const SECONDS_IN_MINUTE = 60

export const TableRow: React.FC<IProps> = ({ team, player, stats }) => {
  const formatToi = (toi: number) => {
    const minutes = Math.floor(toi / SECONDS_IN_MINUTE)
    const seconds = toi % SECONDS_IN_MINUTE
    let secondsString
    if (seconds < 10) {
      secondsString = `0${seconds}`
    } else {
      secondsString = seconds.toString()
    }
    return `${minutes}:${secondsString}`
  }

  return (
    <tr className={classes.tableRow}>
      <td>{team}</td>
      <td>{player}</td>
      <td>{formatToi(stats.toi)}</td>
      <td>{stats.gp}</td>
      {stats.xg60 && <td>{stats.xg60}</td>}
      {stats.c60 && <td>{stats.c60}</td>}
      {stats.sogc_pct && <td>{stats.sogc_pct}</td>}
    </tr>
  )
}
