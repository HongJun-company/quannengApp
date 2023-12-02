import lxyRequest from '..'

export function accountLogin(account: any) {
  return lxyRequest.post({
    url: '/user/login',
    params: account
  })
}
