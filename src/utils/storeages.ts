// 本地存储封装
export const setItem = (Name: string, value: string) => {
  localStorage.setItem(Name, value);
};
export const getItem = (Name: string) => {
  return localStorage.getItem(Name);
};
export const removeItem = (Name: string) => {
  localStorage.removeItem(Name);
};
