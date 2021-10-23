import axios from 'axios'

export const req_oEmbed = async (url) => {
  try {
    const res = await axios.get(`https://www.tiktok.com/oembed?url=${url}`);
    const {author_name,title} = res.data
    let data = {author_name,title}
    return data
  } catch (error) {
    console.error(error);
  }
}



