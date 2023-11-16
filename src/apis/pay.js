import request from '@/utils/http.js'

export const getOrderAPI = (id) => {
  return request({
    url: `/member/order/${id}`
  })
}