// 封装本地存储数据与读取数据反复噶
export const SET_TOKEN = (name: string, token: string) => {
  localStorage.setItem(name, token)
}

export const GET_TOKEN = (name: string) => {
  return localStorage.getItem(name)
}

export const REMOVE_TOKEN = (name: string) => {
  localStorage.removeItem(name)
}
