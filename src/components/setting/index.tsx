import "./index.less";
import React, { useEffect, useRef, useState } from "react";
import FullScreenButton from "@/components/FullScreenButton";
import { Button, Row, Col, TabsProps, Tabs } from "antd";
import {
  RedoOutlined,
  CloseOutlined
} from "@ant-design/icons";
import { setchangeLoadng } from "@/store/setting";
import { useDispatch } from "react-redux";
import getPath from "@/router/utils/getPath";
import { useLocation, useNavigate } from 'react-router-dom';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

interface TabItem {
  key: string;
  label: string;
  path: string;
  closable: boolean;
}

const SettingPage: React.FC = () => {
  const targenRef = useRef(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [size] = useState<'small' | 'middle' | 'large'>('small');
  const [activeKey, setActiveKey] = useState('home');
  const [tabs, setTabs] = useState<TabItem[]>([
    {
      key: 'home',
      label: '首页',
      path: '/',
      closable: false
    }
  ]);

  // 获取当前路由对应的名称
  const getRouteName = (pathname: string): string => {
    const path = getPath;
    const matchedPath = path.find((item: { path: string; name: string }) => {
      if (pathname.includes(item.path)) {
        return item.name;
      }
    });
    return matchedPath?.name || '未知页面';
  };

  // 根据路由更新Tabs
  useEffect(() => {
    const currentPath = location.pathname;
    console.log(currentPath, '当前路由');
    
    // 如果是首页，直接激活首页标签
    if (currentPath === '/' || currentPath === '/home') {
      setActiveKey('home');
      return;
    }

    // 检查当前路由是否已在Tabs中存在
    const existingTab = tabs.find(tab => tab.path === currentPath);
    
    if (existingTab) {
      // 如果存在，激活该标签
      setActiveKey(existingTab.key);
    } else {
      // 如果不存在，创建新标签
      const routeName = getRouteName(currentPath);
      const newKey = `tab-${Date.now()}`;
      
      const newTab: TabItem = {
        key: newKey,
        label: routeName,
        path: currentPath,
        closable: true
      };
      
      setTabs(prev => [...prev, newTab]);
      setActiveKey(newKey);
    }
  }, [location.pathname]);

  // 切换标签
  const handleTabChange = (key: string) => {
    setActiveKey(key);
    const tab = tabs.find(tab => tab.key === key);
    if (tab) {
      navigate(tab.path);
    }
  };

  // 编辑标签（添加/删除）
  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'remove') {
      removeTab(targetKey as string);
    }
  };

  // 移除标签
  const removeTab = (targetKey: string) => {
    // 不能移除首页
    if (targetKey === 'home') return;
    
    // 找到要删除的标签索引
    const targetIndex = tabs.findIndex(tab => tab.key === targetKey);
    const newTabs = tabs.filter(tab => tab.key !== targetKey);
    setTabs(newTabs);
    
    // 如果移除的是当前激活的标签
    if (targetKey === activeKey) {
      // 尝试找到前一个标签
      let newActiveKey = 'home';
      let newPath = '/';
      
      if (newTabs.length > 0) {
        // 优先选择前一个标签
        const prevIndex = Math.max(0, targetIndex - 1);
        newActiveKey = newTabs[prevIndex].key;
        newPath = newTabs[prevIndex].path;
      }
      
      setActiveKey(newActiveKey);
      navigate(newPath);
    }
  };

  // 转换tabs为Tabs组件需要的格式
  const tabItems: TabsProps['items'] = tabs.map(tab => ({
    label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {tab.label}
      </div>
    ),
    key: tab.key,
    closable: tab.closable
  }));

  return (
    <div ref={targenRef}>
      <div className="settings">
        <div className="settings-left">
          <Row gutter={3}>
            <Col flex={1}>
              <Tabs
                type="editable-card"
                size={size}
                activeKey={activeKey}
                onChange={handleTabChange}
                onEdit={onEdit}
                hideAdd
                items={tabItems}
                style={{ margin: 0 }}
              />
            </Col>
          </Row>
        </div>
        <div className="settings-right">
          <Row gutter={3}>
            <Col flex={1} title="全屏展示模块">
              <FullScreenButton targetRef={targenRef} />
            </Col>
            <Col flex={1} title="重新加载">
              <Button
                onClick={() => dispatch(setchangeLoadng(true))}
                icon={<RedoOutlined />}
                size="small"
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;