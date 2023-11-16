import request from '@/utils/http.js'
export const loginAPI = ({account, password}) => {
  return request({
    url: '/login',
    method: 'POST',
    data: {
      account,
      password
    }

  })
}

// 猜你喜欢
export const getLikeListAPI = ({ limit = 4 }) => {
  return request({
    url:'/goods/relevant',
    params: {
      limit 
    }
  })
}