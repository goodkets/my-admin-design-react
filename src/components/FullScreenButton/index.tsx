import React, { useRef, useState, useCallback } from 'react';

const FullScreenButton = ({ targetRef }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = useCallback(() => {
    if (!targetRef.current) return;

    if (isFullScreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
      }
    } else {
      if (targetRef.current.requestFullscreen) {
        targetRef.current.requestFullscreen();
      } else if (targetRef.current.mozRequestFullScreen) { // Firefox
        targetRef.current.mozRequestFullScreen();
      } else if (targetRef.current.webkitRequestFullscreen) { // Chrome, Safari and Opera
        targetRef.current.webkitRequestFullscreen();
      } else if (targetRef.current.msRequestFullscreen) { // IE/Edge
        targetRef.current.msRequestFullscreen();
      }
    }

    setIsFullScreen(!isFullScreen);
  }, [isFullScreen, targetRef]);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(document.fullscreenElement === targetRef.current);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
    document.addEventListener('mozfullscreenchange', handleFullScreenChange);
    document.addEventListener('MSFullscreenChange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullScreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullScreenChange);
    };
  }, [targetRef]);

  return (
    <button onClick={toggleFullScreen}>
      {isFullScreen ? '退出全屏' : '全屏'}
    </button>
  );
};

export default FullScreenButton;