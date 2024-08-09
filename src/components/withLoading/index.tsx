import React from "react";

function WithLoading(WrappedComponent: React.ComponentType<any>) {
  return (props: any) => {
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
      // 模拟异步加载
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1200);

      // 清理定时器
      return () => clearTimeout(timer);
    }, []);

    return <WrappedComponent {...props} isLoading={isLoading} />;
  };
}

export default WithLoading;
