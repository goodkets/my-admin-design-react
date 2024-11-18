import React, { useEffect, useRef } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';

const MapComponent = () => {
    const mapRef = useRef(null);

    useEffect(() => {

        AMapLoader.load({
            key: "198b5c8a23fe36f2da0df881eba16b38",                     // 申请好的Web端开发者Key，首次调用 load 时必填
            version: "2.0",              // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins: ["AMap.Scale", "ToolBar"],     // 需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
        }).then((AMap) => {
            const mapContainer = document.getElementById('map-container');
            if (mapContainer) {
                mapRef.current = new AMap.Map(mapContainer, { // 设置地图容器id
                    viewMode: "2D",         // 是否为3D地图模式
                    zoom: 10,                // 初始化地图级别
                    center: [116.397428, 39.90923], // 初始化地图中心点位置
                });
            }
        }).catch(e => {
            console.log(e);
        });

        // 清理函数，防止内存泄漏
        return () => {
            if (mapRef.current && typeof mapRef.current.destroy === 'function') {
                mapRef.current.destroy();
            }
        };
    }, []);

    return (
        <div id="map-container" style={{ height: 'calc(100vh - 160px)' }}></div>
    );
};

export default MapComponent;