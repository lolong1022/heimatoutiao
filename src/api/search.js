import request from '@/utils/request'
/**
 * 获取建议
 * @param {*} q 建议
 * @returns promas
 */
export const getSuggestionsAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

/**
 * page 页数
 * per_page 数量
 * @param {string} url
 */
export const getSearchResultAPI = (
  page,
  per_page /*  eslint-disable-line  */,
  q
) => {
  return request({
    url: '/v1_0/search',
    params: {
      page,
      per_page,
      q
    }
  })
}
