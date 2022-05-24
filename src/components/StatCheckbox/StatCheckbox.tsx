import React from 'react';

import classes from './StatCheckbox.module.css';

export interface ICheckboxProps {
  checked: boolean
  onChange: () => void
  label: string
}

export const StatCheckbox: React.FC<ICheckboxProps> = ({ checked, onChange, label }) => {
  return (
    <div onClick={onChange} className={classes.checkItem}>
      <input className={classes.checkbox} type="checkbox" checked={checked} onChange={onChange} />
      <label className={classes.label} htmlFor="scales">
        {label}
      </label>
    </div>
  )
}
