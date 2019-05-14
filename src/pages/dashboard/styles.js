import twitter from './twitter.png'
import facebook from './facebook.png'


const social = {
  height: 20,
  width: 20,
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 100%',
}


export default {
  root: {
    minHeight: 'calc(100vh - 65px - 40px)',
    padding: 20,
  },

  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 'calc(100vh - 65px - 40px - 40px)',
  },

  talks: {
    marginTop: 20,
    box: {
      marginBottom: 10,
    },
  },

  twitter: {
    ...social,
    backgroundImage: `url("${twitter}")`,
  },

  facebook: {
    ...social,
    backgroundImage: `url("${facebook}")`,
  },

  link: {
    textDecoration: 'none',
  },
}
