import Auth from 'pages/login/store'
import Blog from 'pages/blog/store'
import CfP from 'pages/cfp/store'
import CfS from 'pages/cfs/store'
import Error from 'templates/empty/store'
import Event from 'pages/event/store'
import Gallery from 'pages/gallery/store'
import Me from 'pages/me/store'
import Talk from 'pages/talk/store'
import Title from 'templates/default/store'


export default {
  auth: new Auth(),
  blog: new Blog(),
  cfp: new CfP(),
  cfs: new CfS(),
  error: new Error(),
  event: new Event(),
  gallery: new Gallery(),
  me: new Me(),
  talk: new Talk(),
  title: new Title(),
}
