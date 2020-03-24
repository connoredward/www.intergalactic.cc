import  styles from './styles.scss'

import classNames from 'classnames'

export function VideoModal(props) {
  const {
    openModal,
    closeModal
  } = props

  console.log(openModal)

  return (
    <div className={classNames(styles['modal_wrapper'], styles[openModal === true ? 'active' : undefined])}>
      <div className={styles['modal_background']} onClick={closeModal} />
      <div className={styles['modal_content']}> 
        <button onClick={() => closeModal()}>close</button>
        hehe
      </div>
    </div>
  )
}

export default VideoModal