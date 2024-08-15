// 封装一个异步定时方法
export const asyncFunc = (fn: () => void, time: number) => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        fn();
        resolve(true);
      }, time);
    } catch (error) {
      reject(error);
    }
  });
};


