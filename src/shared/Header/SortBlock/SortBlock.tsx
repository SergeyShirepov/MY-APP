import React, { useState } from 'react';
import * as styles from './sortblock.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSortBy } from '../../../store/features/sort';

type Props = {
  defaultValue: string;
  options: { value: string; name: string; }[];
}

export function SortBlock({ defaultValue, options }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectorSort, setSelectorSort] = useState('');
  const searchParams = new URLSearchParams(location.search);
  const newSortBy = searchParams.get('sortBy');

  const onChange = (newSortBy: string) => {
    navigate(`/posts?sortBy=${newSortBy}`);
    setSelectorSort(newSortBy);
    dispatch(setSortBy(newSortBy));
  }

  return (
    <>
      <div className={styles.sortblock}>
        <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 16L10.6225 14.76C11.235 13.536 11.6725 12.272 11.9437 10.984L14 16ZM3.3775 14.76L0 16L2.05625 10.984C2.3275 12.272 2.765 13.536 3.3775 14.76ZM7 0C7 0 11.375 1.6 11.375 8C11.375 10.48 10.7188 12.6 9.91375 14.264C9.625 14.84 9.00375 15.2 8.3125 15.2H5.6875C4.99625 15.2 4.375 14.84 4.08625 14.264C3.29 12.6 2.625 10.48 2.625 8C2.625 1.6 7 0 7 0ZM7 8C7.9625 8 8.75 7.28 8.75 6.4C8.75 5.52 7.9625 4.8 7 4.8C6.0375 4.8 5.25 5.52 5.25 6.4C5.25 7.28 6.0375 8 7 8Z" fill="#CC6633" />
        </svg>
        <select
          value={selectorSort}
          onChange={(e) => onChange(e.target.value)} >
          <option disabled value=''>{defaultValue}</option>
          {options.map(option =>
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          )}
        </select>
      </div></>
  );
}
