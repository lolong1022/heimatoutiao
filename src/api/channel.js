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
