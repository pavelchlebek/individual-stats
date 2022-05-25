import React from 'react';

import classes from './Spinner.module.css';

export const Spinner: React.FC = () => {
  return <div className={classes.loader}>Loading...</div>
}
