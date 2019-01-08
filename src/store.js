import Auth from 'pages/login/store'
import Blog from 'pages/blog/store'
import CfS from 'pages/cfs/store'
import Error from 'templates/empty/store'
import Gallery from 'pages/gallery/store'
import Talk from 'pages/talk/store'
import Title from 'templates/default/store'


export default {
  auth: new Auth(),
  blog: new Blog(),
  cfs: new CfS(),
  error: new Error(),
  gallery: new Gallery(),
  talk: new Talk(),
  title: new Title(),
}
