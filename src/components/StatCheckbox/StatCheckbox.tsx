import React from 'react';

import classes from './StatCheckbox.module.css';

interface ICheckboxProps {
  checked: boolean
  onChange: () => void
  label: string
}

export const StatCheckbox: React.FC<ICheckboxProps> = ({ checked, onChange, label }) => {
  return (
    <div className={classes.checkItem}>
      <input
        className={classes.checkbox}
        type="checkbox"
        id={label}
        checked={checked}
        onChange={onChange}
      />
      <label className={classes.label} htmlFor={label}>
        {label}
      </label>
    </div>
  )
}
