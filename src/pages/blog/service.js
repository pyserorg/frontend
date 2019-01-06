import axios from 'axios'
import moment from 'moment'
import { API_ROOT, getCookie } from 'utils'


async function create(title) {
  const csrf = getCookie('csrf_access_token')
  const response = await axios.post(
    `${API_ROOT}/blog`,
    {
      title,
      content: title,
      published: false,
    },
    {
      headers: { 'X-CSRF-TOKEN': csrf },
    },
  )
  return response.data
}


async function edit(post, data) {
  const csrf = getCookie('csrf_access_token')
  const date = moment(post.date)
  const response = await axios.patch(
    `${API_ROOT}/blog/${date.format('YYYY/MM/DD')}/${post.slug}`,
    data,
    {
      headers: { 'X-CSRF-TOKEN': csrf },
    },
  )
  return response.data
}


async function fetch(year, month, day, slug) {
  const response = await axios.get(
    `${API_ROOT}/blog/${year}/${month}/${day}/${slug}`,
  )
  return response.data
}


async function fetchAll(page) {
  const csrf = getCookie('csrf_access_token')
  const response = await axios.get(
    `${API_ROOT}/blog`,
    {
      headers: {
        'X-CSRF-TOKEN': csrf,
        'X-Page': page,
      },
    },
  )
  return response.data
}


async function remove(post) {
  const csrf = getCookie('csrf_access_token')
  const date = moment(post.date)
  const response = await axios.delete(
    `${API_ROOT}/blog/${date.format('YYYY/MM/DD')}/${post.slug}`,
    {
      headers: {
        'X-CSRF-TOKEN': csrf,
      },
    },
  )
  return response.data
}


export default {
  create,
  edit,
  fetch,
  fetchAll,
  remove,
}
