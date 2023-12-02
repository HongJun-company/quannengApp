import lxyRequest from '..'
export function getUserInfo(userId: number) {
  return lxyRequest.get({
    url: '/userInfo/getUserInfo',
    params: { userId }
  })
}

export function getUserStatus(userId: number) {
  return lxyRequest.post({
    url: '/user/judgeUserType',
    params: { userId }
  })
}

export function getImg(key: string) {
  return lxyRequest.get({
    url: '/minio/getImg',
    params: { key }
  })
}
