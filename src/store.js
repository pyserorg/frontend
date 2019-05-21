import Auth from 'pages/login/store'
import Blog from 'pages/blog/store'
import CfP from 'pages/cfp/store'
import CfS from 'pages/cfs/store'
import Email from 'pages/mass-email/store'
import Error from 'templates/empty/store'
import Event from 'pages/event/store'
import Gallery from 'pages/gallery/store'
import Landing from 'pages/landing/store'
import Me from 'pages/me/store'
import Talk from 'pages/talk/store'
import Title from 'templates/default/store'
import User from 'pages/user/store'
import Volunteering from 'pages/volunteering/store'


export default {
  auth: new Auth(),
  blog: new Blog(),
  cfp: new CfP(),
  cfs: new CfS(),
  email: new Email(),
  error: new Error(),
  event: new Event(),
  gallery: new Gallery(),
  landing: new Landing(),
  me: new Me(),
  talk: new Talk(),
  title: new Title(),
  user: new User(),
  volunteering: new Volunteering(),
}
