import LOGO_IMG from '~/static/images/INTERGALACTIC_LOGO_WHITE.png'

const styles = {
  minHeight: '100vh',
  minWidth: '100vw',
  background: 'black',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 9999
}

const hide = {
  display: 'none'
}


const imgStyle = {
  width: '50%',
  minWidth: 175,
  maxWidth: 350
}

export function SplashScreen ({loading}) {
  return (
    <div style={loading ? hide : styles}>
      <img src={LOGO_IMG} style={imgStyle} />
    </div>
  )
}

export default SplashScreen