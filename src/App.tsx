import React from 'react';

import classes from './App.module.css';
import {
  ICheckboxProps,
  StatCheckbox,
} from './components/StatCheckbox/StatCheckbox';
import { useTriggerFetch } from './utils/UseTriggerFetch';

function App() {
  const [xg60, setXg60] = React.useState(false)
  const [c60, setC60] = React.useState(false)
  const [sogcPct, setSogcPct] = React.useState(false)

  const checkboxes: ICheckboxProps[] = [
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

  // console.log("xg60: ", xg60)

  const handleFetch = () => {
    console.log("Fetching data from API")
  }

  const { data, error, loading, triggerFetch } = useTriggerFetch()

  const loadData = () => {
    triggerFetch()
  }

  console.log("data: ", data)

  return (
    <main>
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
            <th className={classes.team}>Team</th>
            <th>Player</th>
            <th>toi</th>
            <th>gp</th>
            <th>xg60</th>
            <th>c60</th>
            <th>sogc_pct</th>
          </tr>
        </thead>
      </table>
    </main>
  )
}

export default App
