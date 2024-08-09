/**
 * 检测当前页面是否处于全屏状态
 * @returns {boolean} 是否处于全屏状态
 */
function isFullScreen(): boolean {
  return Boolean(
    document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement,
  );
}
export default isFullScreen;
