export default {
  fetch: async (albumName, year = null, page = 0) => {
    const suffix = year ? `${albumName}/${year}` : albumName
    const response = await window.rest.get(
      `/gallery/album/${suffix}`,
      { headers: { 'Page': page } },
    )
    return response.data
  },
}
