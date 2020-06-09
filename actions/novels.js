/* eslint-disable import/prefer-default-export */
import axios from 'axios'

export const fetchNovels = async () => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/novels`) // eslint-disable-line no-undef

    return data
  } catch (error) {
    return []
  }
}
