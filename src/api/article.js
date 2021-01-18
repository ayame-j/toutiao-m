import request from '@/utils/axios';

export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/v1_1/articles',
    params,
  });
};
