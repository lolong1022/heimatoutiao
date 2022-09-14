import request from '@/utils/request'
/**
 * 接口频道
 * @returns params
 */
export const getChannelslApi = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
/**
 * 获取所有频道
 * @returns params
 */
export const getAllChannels = () => {
  return request({
    url: '/v1_0/channels'
  })
}
/**
 *删除频道
 * @param {id删除的id } id
 * @returns  params
 */
export const delChannelAPI = (id) => {
  return request({
    url: `/v1_0/user/channels/${id}`,
    method: 'DELETE'
  })
}
export const addChannelAPI = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}
