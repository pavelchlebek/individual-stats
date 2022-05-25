import React from 'react';

import { TStatValue } from '../../App';

interface IProps {
  label: TStatValue
  handleSort: (by: TStatValue) => void
  className?: string
}

export const TableHeading: React.FC<IProps> = ({ label, className, handleSort }) => {
  return (
    <th className={className} onClick={() => handleSort(label)}>
      {label}
    </th>
  )
}
