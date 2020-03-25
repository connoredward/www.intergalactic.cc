import {useEffect, useState} from 'react'

import classNames from 'classnames'

import styles from './styles.scss'

export function VideoGrid(props) {
  const {
    gridType = '',
    children,
    className
  } = props

  return (
    <div className={classNames(styles.main, styles[gridType], className)}>
      {children}
    </div>
  )
}

export default VideoGrid