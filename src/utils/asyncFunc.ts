// 封装一个异步定时方法
export const asyncFunc = (fn: () => void, time: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fn();
      resolve(true);
    }, time);
  });
};
