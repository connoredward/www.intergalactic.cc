import { useEffect, useState } from 'react';

import classNames from 'classnames';

import styles from './styles.module.scss';

export function VideoGrid(props) {
  const { children, className } = props;

  return <div className={classNames(styles.main, className)}>{children}</div>;
}

export default VideoGrid;
