import request from '@/utils/http.js'

/*
params: {
	orderState:0, tab状态
  page:1,  页数
  pageSize:2  每页条数
}
*/

export const getUserOrder = (params) => {
  return request({
    url:'/member/order',
    method:'GET',
    params
  })
}