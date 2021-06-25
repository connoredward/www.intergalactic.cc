import classNames from 'classnames';

import HorizontalScroll from 'react-scroll-horizontal';

import styles from './styles.module.scss';

export function HoriScroll({ children, className }) {
  return (
    <div className={classNames(styles.main, className)}>
      <HorizontalScroll reverseScroll={true} config={{ damping: 20 }}>
        {children}
      </HorizontalScroll>
    </div>
  );
}

export default HoriScroll;
