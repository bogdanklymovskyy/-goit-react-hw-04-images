import axios from 'axios';

const instance = axios.create({
  baseURL: `https://pixabay.com/api`,
  params: {
    q: '',
    page: 1,
    key: '31850600-8bc33184832b82bc138f7cdcb',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

export const getImages = async (q, page = 1) => {
  const { data } = await instance.get('/', { params: { q, page } });
  return data;
};
