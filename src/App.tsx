import React from 'react';

import classes from './App.module.css';
import { Modal } from './components/Modal/Modal';
import { Spinner } from './components/Spinner/Spinner';
import { StatCheckbox } from './components/StatCheckbox/StatCheckbox';
import { TableHeading } from './components/TableHeading/TableHeading';
import { TableRow } from './components/TableRow/TableRow';
import { useTriggerFetch } from './hooks/useTriggerFetch';

export type TStatValue = "toi" | "gp" | "xg60" | "c60" | "sogc_pct" | "player" | "team"

const tableHeadings: Omit<React.ComponentProps<typeof TableHeading>, "handleSort">[] = [
  {
    className: classes.team,
    label: "team",
  },
  {
    className: classes.player,
    label: "player",
  },
  {
    label: "toi",
  },
  {
    label: "gp",
  },
]

function App() {
  const [xg60, setXg60] = React.useState(true)
  const [c60, setC60] = React.useState(false)
  const [sogcPct, setSogcPct] = React.useState(false)

  const [showXg60, setShowXg60] = React.useState(true)
  const [showC60, setShowC60] = React.useState(false)
  const [showSogcPct, setShowSogcPct] = React.useState(false)

  const [showModal, setShowModal] = React.useState(false)

  const [metrics, setMetrics] = React.useState<TStatValue[]>([])

  const [sortOrderASC, setSortOrderASC] = React.useState(true)

  React.useEffect(() => {
    const usedMetrics: TStatValue[] = []
    if (xg60) usedMetrics.push("xg60")
    if (c60) usedMetrics.push("c60")
    if (sogcPct) usedMetrics.push("sogc_pct")
    setMetrics(usedMetrics)
  }, [xg60, c60, sogcPct])

  const checkboxes: React.ComponentProps<typeof StatCheckbox>[] = [
    {
      checked: xg60,
      onChange: () => setXg60((prev) => !prev),
      label: "xg60",
    },
    {
      checked: c60,
      onChange: () => setC60((prev) => !prev),
      label: "c60",
    },
    {
      checked: sogcPct,
      onChange: () => setSogcPct((prev) => !prev),
      label: "sogc_pct",
    },
  ]

  const { data, error, loading, triggerFetch } = useTriggerFetch(metrics)

  const loadData = () => {
    if (metrics.length < 1) {
      setShowModal(true)
      return
    }
    setShowXg60(xg60)
    setShowC60(c60)
    setShowSogcPct(sogcPct)
    triggerFetch()
  }

  const handleSort = (by: TStatValue) => {
    if (sortOrderASC) {
      data.sort((a, b) => {
        if (by === "sogc_pct") return a.stats.sogc_pct! - b.stats.sogc_pct!
        if (by === "c60") return a.stats.c60! - b.stats.c60!
        if (by === "xg60") return a.stats.xg60! - b.stats.xg60!
        if (by === "toi") return a.stats.toi! - b.stats.toi!
        if (by === "gp") return a.stats.gp! - b.stats.gp!
        if (by === "player") {
          if (a.player > b.player) return 1
          return -1
        }
        if (by === "team") {
          if (a.team > b.team) return 1
          return -1
        }
        return -1
      })
      setSortOrderASC(false)
    }
    if (!sortOrderASC) {
      data.sort((a, b) => {
        if (by === "sogc_pct") return b.stats.sogc_pct! - a.stats.sogc_pct!
        if (by === "c60") return b.stats.c60! - a.stats.c60!
        if (by === "xg60") return b.stats.xg60! - a.stats.xg60!
        if (by === "toi") return b.stats.toi! - a.stats.toi!
        if (by === "gp") return b.stats.gp! - a.stats.gp!
        if (by === "player") {
          if (a.player < b.player) return 1
          return -1
        }
        if (by === "team") {
          if (a.team < b.team) return 1
          return -1
        }
        return -1
      })
      setSortOrderASC(true)
    }
  }

  return (
    <main>
      <Modal show={showModal} onModalClose={() => setShowModal(false)}>
        <div className={classes.modalContent}>
          <div className={classes.alert}>Please choose at least one metric!</div>
          <button className={classes.modalButton} onClick={() => setShowModal(false)}>
            OK
          </button>
        </div>
      </Modal>
      <section className={classes.controls}>
        <button onClick={loadData}>Load Data</button>
        <div className={classes.statsOptions}>
          {checkboxes.map((checkbox, index) => {
            return (
              <StatCheckbox
                key={index}
                checked={checkbox.checked}
                onChange={checkbox.onChange}
                label={checkbox.label}
              />
            )
          })}
        </div>
      </section>
      <table>
        <thead>
          <tr>
            {tableHeadings.map((heading) => {
              return (
                <TableHeading
                  key={heading.label}
                  handleSort={handleSort}
                  className={heading.className}
                  label={heading.label}
                />
              )
            })}
            {showXg60 && data && <TableHeading handleSort={handleSort} label="xg60" />}
            {showC60 && data && <TableHeading handleSort={handleSort} label="c60" />}
            {showSogcPct && data && <TableHeading handleSort={handleSort} label="sogc_pct" />}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((player) => {
              return (
                <TableRow
                  key={player.player}
                  player={player.player}
                  team={player.team}
                  stats={player.stats}
                />
              )
            })}
        </tbody>
      </table>
      {loading && <Spinner />}
      {error && (
        <div style={{ display: "flex", justifyContent: "center" }} className={classes.alert}>
          {`Request error: ${error.message} ${error.code}`}
        </div>
      )}
    </main>
  )
}

export default App
