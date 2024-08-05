// 本地存储封装
export const setToken = (Name: string, value: string) => {
  localStorage.setItem(Name, value);
};
export const getToken = (Name: string) => {
  return localStorage.getItem(Name);
};
export const removeToken = (Name: string) => {
  localStorage.removeItem(Name);
};