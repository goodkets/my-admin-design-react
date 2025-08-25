import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Card,
  Space,
  Tag,
  message,
  Row,
  Col,
  Divider,
  Popconfirm,
  Tooltip,
  Avatar,
  List,
  Tabs,
  Descriptions,
  Tree,
  Collapse
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  ReloadOutlined,
  UserOutlined,
  TeamOutlined,
  ProjectOutlined,
  EnvironmentOutlined,
  FolderOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { TabPane } = Tabs;
const { Panel } = Collapse;

// 区域数据类型定义
interface Region {
  id: string;
  name: string;
  code: string;
  description?: string;
}

// 项目组数据类型定义
interface ProjectGroup {
  id: string;
  name: string;
  description: string;
  regionId: string;
  regionName: string;
  creator: User;
  createTime: string;
  updateTime: string;
  status: 'active' | 'inactive';
  members: User[];
  projects: Project[];
}

// 项目数据类型定义
interface Project {
  id: string;
  name: string;
  description: string;
  groupId: string;
  groupName: string;
  creator: User;
  createTime: string;
  updateTime: string;
  status: 'active' | 'completed' | 'pending';
  members: User[];
  modules: string[];
}

// 用户数据类型定义
interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  avatar?: string;
  department: string;
  role: 'admin' | 'user' | 'bureau';
  status: 'active' | 'inactive';
  createTime: string;
}

const groupMassage: React.FC = () => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [projectGroups, setProjectGroups] = useState<ProjectGroup[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<ProjectGroup[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('groups');
  const [regionModalVisible, setRegionModalVisible] = useState<boolean>(false);
  const [groupModalVisible, setGroupModalVisible] = useState<boolean>(false);
  const [projectModalVisible, setProjectModalVisible] = useState<boolean>(false);
  const [editingRegion, setEditingRegion] = useState<Region | null>(null);
  const [editingGroup, setEditingGroup] = useState<ProjectGroup | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [activeGroup, setActiveGroup] = useState<ProjectGroup | null>(null);
  const [searchForm] = Form.useForm();
  const [regionForm] = Form.useForm();
  const [groupForm] = Form.useForm();
  const [projectForm] = Form.useForm();

  // 模拟数据加载
  useEffect(() => {
    setLoading(true);
    // 模拟API调用
    setTimeout(() => {
      // 模拟区域数据
      const mockRegions: Region[] = [
        {
          id: 'r1',
          name: '沙坪坝区',
          code: 'EAST',
          description: '包含上海、江苏、浙江等地区'
        },
        {
          id: 'r2',
          name: '渝北区',
          code: 'NORTH',
          description: '包含北京、天津、河北等地区'
        },
        {
          id: 'r3',
          name: '两江新区',
          code: 'SOUTH',
          description: '包含广东、福建、广西等地区'
        },
        {
          id: 'r4',
          name: '九龙坡区',
          code: 'WEST',
          description: '包含四川、重庆、陕西等地区'
        }
      ];

      // 模拟用户数据
      const mockUsers: User[] = [
        {
          id: '1',
          name: '张管理员',
          username: 'admin01',
          email: 'admin01@example.com',
          phone: '13800138001',
          department: '信息技术部',
          role: 'admin',
          status: 'active',
          createTime: '2023-01-15 10:30:25'
        },
        {
          id: '2',
          name: '李用户',
          username: 'user01',
          email: 'user01@example.com',
          phone: '13800138002',
          department: '市场部',
          role: 'user',
          status: 'active',
          createTime: '2023-02-20 14:15:30'
        },
        {
          id: '3',
          name: '王局长',
          username: 'bureau01',
          email: 'bureau01@example.com',
          phone: '13800138003',
          department: '某某局',
          role: 'bureau',
          status: 'active',
          createTime: '2023-03-10 09:45:12'
        }
      ];

      // 模拟项目组数据
      const mockProjectGroups: ProjectGroup[] = [
        {
          id: 'g1',
          name: '上海智慧养老项目组',
          description: '负责上海地区的智慧养老项目',
          regionId: 'r1',
          regionName: '沙坪坝区',
          creator: mockUsers[0],
          createTime: '2023-06-01 09:00:00',
          updateTime: '2023-06-15 14:30:00',
          status: 'active',
          members: [mockUsers[0], mockUsers[1]],
          projects: [
            {
              id: 'p1',
              name: '智慧养老平台',
              description: '为养老院提供智能化管理服务',
              groupId: 'g1',
              groupName: '上海智慧养老项目组',
              creator: mockUsers[0],
              createTime: '2023-06-05 10:00:00',
              updateTime: '2023-06-20 15:30:00',
              status: 'active',
              members: [mockUsers[0], mockUsers[1]],
              modules: ['用户管理', '服务管理', '健康监测']
            },
            {
              id: 'p2',
              name: '社区健康服务',
              description: '社区健康服务与管理系统',
              groupId: 'g1',
              groupName: '上海智慧养老项目组',
              creator: mockUsers[1],
              createTime: '2023-06-10 11:00:00',
              updateTime: '2023-06-25 16:30:00',
              status: 'active',
              members: [mockUsers[1]],
              modules: ['健康档案', '预约服务']
            }
          ]
        },
        {
          id: 'g2',
          name: '北京社区服务项目组',
          description: '负责北京地区的社区服务项目',
          regionId: 'r2',
          regionName: '渝北区',
          creator: mockUsers[0],
          createTime: '2023-05-15 10:20:00',
          updateTime: '2023-06-10 11:45:00',
          status: 'active',
          members: [mockUsers[0], mockUsers[2]],
          projects: [
            {
              id: 'p3',
              name: '移动护理APP',
              description: '移动端护理人员工作平台',
              groupId: 'g2',
              groupName: '北京社区服务项目组',
              creator: mockUsers[2],
              createTime: '2023-05-20 13:15:00',
              updateTime: '2023-06-05 16:20:00',
              status: 'pending',
              members: [mockUsers[2]],
              modules: ['任务管理', '工作汇报']
            }
          ]
        },
        {
          id: 'g3',
          name: '广州健康监测项目组',
          description: '负责广州地区的健康监测项目',
          regionId: 'r3',
          regionName: '两江新区',
          creator: mockUsers[0],
          createTime: '2023-07-01 13:15:00',
          updateTime: '2023-07-05 16:20:00',
          status: 'active',
          members: [mockUsers[0]],
          projects: []
        }
      ];

      setRegions(mockRegions);
      setUsers(mockUsers);
      setProjectGroups(mockProjectGroups);
      setFilteredGroups(mockProjectGroups);
      setLoading(false);
    }, 800);
  }, []);

  // 处理搜索
  const handleSearch = (values: any) => {
    const { keyword, region } = values;
    const filtered = projectGroups.filter(group => {
      return (
        (!keyword || 
          group.name.includes(keyword) || 
          group.description.includes(keyword)) &&
        (!region || group.regionId === region)
      );
    });
    setFilteredGroups(filtered);
  };

  // 重置搜索
  const handleReset = () => {
    searchForm.resetFields();
    setFilteredGroups(projectGroups);
  };

  // 打开新增区域模态框
  const handleAddRegion = () => {
    setEditingRegion(null);
    regionForm.resetFields();
    setRegionModalVisible(true);
  };

  // 打开编辑区域模态框
  const handleEditRegion = (region: Region) => {
    setEditingRegion(region);
    regionForm.setFieldsValue(region);
    setRegionModalVisible(true);
  };

  // 打开新增项目组模态框
  const handleAddGroup = () => {
    setEditingGroup(null);
    groupForm.resetFields();
    setGroupModalVisible(true);
  };

  // 打开编辑项目组模态框
  const handleEditGroup = (group: ProjectGroup) => {
    setEditingGroup(group);
    groupForm.setFieldsValue({
      name: group.name,
      description: group.description,
      regionId: group.regionId
    });
    setGroupModalVisible(true);
  };

  // 打开新增项目模态框
  const handleAddProject = (group: ProjectGroup) => {
    setActiveGroup(group);
    setEditingProject(null);
    projectForm.resetFields();
    setProjectModalVisible(true);
  };

  // 打开编辑项目模态框
  const handleEditProject = (project: Project, group: ProjectGroup) => {
    setActiveGroup(group);
    setEditingProject(project);
    projectForm.setFieldsValue({
      name: project.name,
      description: project.description
    });
    setProjectModalVisible(true);
  };

  // 查看项目组详情
  const handleViewGroup = (group: ProjectGroup) => {
    setActiveGroup(group);
  };

  // 处理删除区域
  const handleDeleteRegion = (regionId: string) => {
    // 检查是否有项目组使用该区域
    const groupsUsingRegion = projectGroups.filter(group => group.regionId === regionId);
    if (groupsUsingRegion.length > 0) {
      message.error('该区域下存在项目组，无法删除');
      return;
    }
    
    const newRegions = regions.filter(region => region.id !== regionId);
    setRegions(newRegions);
    message.success('区域删除成功');
  };

  // 处理删除项目组
  const handleDeleteGroup = (groupId: string) => {
    const newGroups = projectGroups.filter(group => group.id !== groupId);
    setProjectGroups(newGroups);
    setFilteredGroups(newGroups);
    message.success('项目组删除成功');
  };

  // 处理删除项目
  const handleDeleteProject = (projectId: string, groupId: string) => {
    const newGroups = projectGroups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          projects: group.projects.filter(project => project.id !== projectId),
          updateTime: new Date().toLocaleString()
        };
      }
      return group;
    });
    
    setProjectGroups(newGroups);
    setFilteredGroups(newGroups);
    
    // 更新当前激活的项目组
    if (activeGroup && activeGroup.id === groupId) {
      setActiveGroup(newGroups.find(g => g.id === groupId) || null);
    }
    
    message.success('项目删除成功');
  };

  // 处理区域表单提交
  const handleRegionSubmit = async () => {
    try {
      const values = await regionForm.validateFields();
      
      if (editingRegion) {
        // 编辑现有区域
        const newRegions = regions.map(region => 
          region.id === editingRegion.id ? { ...region, ...values } : region
        );
        setRegions(newRegions);
        message.success('区域信息更新成功');
      } else {
        // 新增区域
        const newRegion: Region = {
          ...values,
          id: `r${Date.now()}`
        };
        const newRegions = [...regions, newRegion];
        setRegions(newRegions);
        message.success('区域添加成功');
      }
      
      setRegionModalVisible(false);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  // 处理项目组表单提交
  const handleGroupSubmit = async () => {
    try {
      const values = await groupForm.validateFields();
      const region = regions.find(r => r.id === values.regionId);
      
      if (editingGroup) {
        // 编辑现有项目组
        const newGroups = projectGroups.map(group => 
          group.id === editingGroup.id ? 
          { 
            ...group, 
            ...values, 
            regionName: region?.name || '',
            updateTime: new Date().toLocaleString() 
          } : group
        );
        setProjectGroups(newGroups);
        setFilteredGroups(newGroups);
        message.success('项目组信息更新成功');
      } else {
        // 新增项目组
        const newGroup: ProjectGroup = {
          ...values,
          id: `g${Date.now()}`,
          regionName: region?.name || '',
          creator: users[0], // 默认当前用户为创建者
          createTime: new Date().toLocaleString(),
          updateTime: new Date().toLocaleString(),
          status: 'active',
          members: [users[0]], // 默认添加创建者为成员
          projects: []
        };
        const newGroups = [...projectGroups, newGroup];
        setProjectGroups(newGroups);
        setFilteredGroups(newGroups);
        message.success('项目组添加成功');
      }
      
      setGroupModalVisible(false);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  // 处理项目表单提交
  const handleProjectSubmit = async () => {
    try {
      const values = await projectForm.validateFields();
      
      if (!activeGroup) return;
      
      if (editingProject) {
        // 编辑现有项目
        const newGroups = projectGroups.map(group => {
          if (group.id === activeGroup.id) {
            return {
              ...group,
              projects: group.projects.map(project => 
                project.id === editingProject.id ? 
                { 
                  ...project, 
                  ...values, 
                  updateTime: new Date().toLocaleString() 
                } : project
              ),
              updateTime: new Date().toLocaleString()
            };
          }
          return group;
        });
        
        setProjectGroups(newGroups);
        setFilteredGroups(newGroups);
        setActiveGroup(newGroups.find(g => g.id === activeGroup.id) || null);
        message.success('项目信息更新成功');
      } else {
        // 新增项目
        const newProject: Project = {
          ...values,
          id: `p${Date.now()}`,
          groupId: activeGroup.id,
          groupName: activeGroup.name,
          creator: users[0], // 默认当前用户为创建者
          createTime: new Date().toLocaleString(),
          updateTime: new Date().toLocaleString(),
          status: 'active',
          members: [users[0]], // 默认添加创建者为成员
          modules: []
        };
        
        const newGroups = projectGroups.map(group => {
          if (group.id === activeGroup.id) {
            return {
              ...group,
              projects: [...group.projects, newProject],
              updateTime: new Date().toLocaleString()
            };
          }
          return group;
        });
        
        setProjectGroups(newGroups);
        setFilteredGroups(newGroups);
        setActiveGroup(newGroups.find(g => g.id === activeGroup.id) || null);
        message.success('项目添加成功');
      }
      
      setProjectModalVisible(false);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  // 状态映射
  const statusMap = {
    active: { text: '激活', color: 'green' },
    inactive: { text: '停用', color: 'red' },
    completed: { text: '已完成', color: 'blue' },
    pending: { text: '未开始', color: 'orange' }
  };

  // 项目组表格列配置
  const groupColumns = [
    {
      title: '项目组名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (name: string, record: ProjectGroup) => (
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{name}</div>
          <div style={{ color: '#666', fontSize: '12px' }}>{record.description}</div>
        </div>
      )
    },
    {
      title: '所属区域',
      dataIndex: 'regionName',
      key: 'regionName',
      width: 100,
      render: (regionName: string, record: ProjectGroup) => (
        <Tag icon={<EnvironmentOutlined />} color="blue">
          {regionName}
        </Tag>
      )
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
      width: 120,
      render: (creator: User) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            src={creator.avatar} 
            icon={<UserOutlined />} 
            size="small"
            style={{ marginRight: 8 }}
          />
          <div>{creator.name}</div>
        </div>
      )
    },
    {
      title: '项目数量',
      dataIndex: 'projects',
      key: 'projects',
      width: 80,
      render: (projects: Project[]) => (
        <Tag icon={<ProjectOutlined />}>{projects.length}</Tag>
      )
    },
    {
      title: '成员数量',
      dataIndex: 'members',
      key: 'members',
      width: 80,
      render: (members: User[]) => (
        <Tag icon={<TeamOutlined />}>{members.length}</Tag>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (status: 'active' | 'inactive') => (
        <Tag color={statusMap[status].color}>
          {statusMap[status].text}
        </Tag>
      )
    },
    {
      title: '操作',
      key: 'action',
      width: 250,
      fixed: 'right' as const,
      render: (_, record: ProjectGroup) => (
        <Space size="small">
          <Button 
            type="link" 
            size="small"
            onClick={() => handleViewGroup(record)}
          >
            详情
          </Button>
          <Button 
            type="link" 
            size="small" 
            icon={<EditOutlined />}
            onClick={() => handleEditGroup(record)}
          >
            编辑
          </Button>
          <Button 
            type="link" 
            size="small" 
            icon={<PlusOutlined />}
            onClick={() => handleAddProject(record)}
          >
            添加项目
          </Button>
          <Popconfirm
            title="确定删除这个项目组吗？"
            onConfirm={() => handleDeleteGroup(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button 
              type="link" 
              danger 
              size="small"
              icon={<DeleteOutlined />} 
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div>
      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="项目组管理" key="groups">
            {/* 搜索区域 */}
            <Form
              form={searchForm}
              layout="inline"
              onFinish={handleSearch}
            >
              <Row gutter={[16, 16]} style={{ width: '100%' }}>
                <Col xs={24} sm={12} md={8} lg={6}>
                  <Form.Item name="keyword" style={{ marginBottom: 0 }}>
                    <Input 
                      placeholder="搜索项目组名称或描述" 
                      prefix={<SearchOutlined />}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                  <Form.Item name="region" style={{ marginBottom: 0 }}>
                    <Select placeholder="选择区域">
                      <Option value="">全部区域</Option>
                      {regions.map(region => (
                        <Option key={region.id} value={region.id}>
                          {region.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                  <Space>
                    <Button type="primary" htmlType="submit">
                      搜索
                    </Button>
                    <Button onClick={handleReset} icon={<ReloadOutlined />}>
                      重置
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Form>

            <Divider />

            {/* 操作按钮区域 */}
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <span>共 {filteredGroups.length} 个项目组</span>
              </div>
              <Space>
                <Button 
                  icon={<PlusOutlined />} 
                  onClick={handleAddRegion}
                >
                  添加区域
                </Button>
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />} 
                  onClick={handleAddGroup}
                >
                  新建项目组
                </Button>
              </Space>
            </div>

            {/* 项目组表格 */}
            <Table
              columns={groupColumns}
              dataSource={filteredGroups}
              rowKey="id"
              loading={loading}
              scroll={{ x: 1000 }}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => 
                  `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
              }}
              expandable={{
                expandedRowRender: (record: ProjectGroup) => (
                  <div style={{ margin: 0 }}>
                    <h4>项目列表</h4>
                    {record.projects.length > 0 ? (
                      <List
                        dataSource={record.projects}
                        renderItem={project => (
                          <List.Item
                            actions={[
                              <Button 
                                type="link" 
                                size="small" 
                                icon={<EditOutlined />}
                                onClick={() => handleEditProject(project, record)}
                              >
                                编辑
                              </Button>,
                              <Popconfirm
                                title="确定删除这个项目吗？"
                                onConfirm={() => handleDeleteProject(project.id, record.id)}
                                okText="确定"
                                cancelText="取消"
                              >
                                <Button 
                                  type="link" 
                                  danger 
                                  size="small"
                                  icon={<DeleteOutlined />} 
                                >
                                  删除
                                </Button>
                              </Popconfirm>
                            ]}
                          >
                            <List.Item.Meta
                              avatar={<FolderOutlined />}
                              title={project.name}
                              description={project.description}
                            />
                            <div>
                              <Tag color={statusMap[project.status].color}>
                                {statusMap[project.status].text}
                              </Tag>
                            </div>
                          </List.Item>
                        )}
                      />
                    ) : (
                      <div style={{ padding: '16px', textAlign: 'center', color: '#999' }}>
                        暂无项目
                      </div>
                    )}
                  </div>
                ),
                rowExpandable: (record: ProjectGroup) => record.projects.length > 0
              }}
            />
          </TabPane>
          
          <TabPane tab="区域管理" key="regions">
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={handleAddRegion}
              >
                添加区域
              </Button>
            </div>
            
            <Row gutter={[16, 16]}>
              {regions.map(region => (
                <Col xs={24} sm={12} md={8} lg={6} key={region.id}>
                  <Card 
                    title={region.name} 
                    extra={
                      <Space>
                        <Button 
                          type="link" 
                          size="small" 
                          icon={<EditOutlined />}
                          onClick={() => handleEditRegion(region)}
                        />
                        <Popconfirm
                          title="确定删除这个区域吗？"
                          onConfirm={() => handleDeleteRegion(region.id)}
                          okText="确定"
                          cancelText="取消"
                        >
                          <Button 
                            type="link" 
                            danger 
                            size="small"
                            icon={<DeleteOutlined />} 
                          />
                        </Popconfirm>
                      </Space>
                    }
                  >
                    <div>
                      <div><strong>区域代码:</strong> {region.code}</div>
                      {region.description && (
                        <div style={{ marginTop: 8 }}>
                          <strong>描述:</strong> {region.description}
                        </div>
                      )}
                      <div style={{ marginTop: 8 }}>
                        <strong>项目组数量:</strong> {
                          projectGroups.filter(group => group.regionId === region.id).length
                        }
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </TabPane>
        </Tabs>
      </Card>

      {/* 项目组详情模态框 */}
      <Modal
        title={activeGroup?.name || '项目组详情'}
        open={!!activeGroup}
        onCancel={() => setActiveGroup(null)}
        width={700}
        footer={[
          <Button key="close" onClick={() => setActiveGroup(null)}>
            关闭
          </Button>
        ]}
      >
        {activeGroup && (
          <div>
            <Descriptions title="项目组信息" bordered column={1}>
              <Descriptions.Item label="项目组名称">{activeGroup.name}</Descriptions.Item>
              <Descriptions.Item label="项目组描述">{activeGroup.description}</Descriptions.Item>
              <Descriptions.Item label="所属区域">
                <Tag icon={<EnvironmentOutlined />}>{activeGroup.regionName}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="创建人">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar 
                    src={activeGroup.creator.avatar} 
                    icon={<UserOutlined />} 
                    style={{ marginRight: 8 }}
                  />
                  <div>
                    <div>{activeGroup.creator.name}</div>
                    <div style={{ color: '#999' }}>{activeGroup.creator.department}</div>
                  </div>
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="创建时间">{activeGroup.createTime}</Descriptions.Item>
              <Descriptions.Item label="更新时间">{activeGroup.updateTime}</Descriptions.Item>
              <Descriptions.Item label="状态">
                <Tag color={statusMap[activeGroup.status].color}>
                  {statusMap[activeGroup.status].text}
                </Tag>
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Tabs defaultActiveKey="projects">
              <TabPane tab={`项目 (${activeGroup.projects.length})`} key="projects">
                <List
                  dataSource={activeGroup.projects}
                  renderItem={project => (
                    <List.Item
                      actions={[
                        <Button 
                          type="link" 
                          size="small" 
                          icon={<EditOutlined />}
                          onClick={() => handleEditProject(project, activeGroup)}
                        >
                          编辑
                        </Button>,
                        <Popconfirm
                          title="确定删除这个项目吗？"
                          onConfirm={() => handleDeleteProject(project.id, activeGroup.id)}
                          okText="确定"
                          cancelText="取消"
                        >
                          <Button 
                            type="link" 
                            danger 
                            size="small"
                            icon={<DeleteOutlined />} 
                          >
                            删除
                          </Button>
                        </Popconfirm>
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<FolderOutlined />}
                        title={project.name}
                        description={project.description}
                      />
                      <div>
                        <Tag color={statusMap[project.status].color}>
                          {statusMap[project.status].text}
                        </Tag>
                      </div>
                    </List.Item>
                  )}
                />
              </TabPane>
              <TabPane tab={`成员 (${activeGroup.members.length})`} key="members">
                <List
                  dataSource={activeGroup.members}
                  renderItem={member => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={member.avatar} icon={<UserOutlined />} />}
                        title={member.name}
                        description={`${member.department} · ${member.email}`}
                      />
                    </List.Item>
                  )}
                />
              </TabPane>
            </Tabs>
          </div>
        )}
      </Modal>

      {/* 区域表单模态框 */}
      <Modal
        title={editingRegion ? '编辑区域' : '添加区域'}
        open={regionModalVisible}
        onOk={handleRegionSubmit}
        onCancel={() => setRegionModalVisible(false)}
        width={500}
        okText="确认"
        cancelText="取消"
      >
        <Form
          form={regionForm}
          layout="vertical"
          name="regionForm"
        >
          <Form.Item
            name="name"
            label="区域名称"
            rules={[{ required: true, message: '请输入区域名称' }]}
          >
            <Input placeholder="请输入区域名称" />
          </Form.Item>

          <Form.Item
            name="code"
            label="区域代码"
            rules={[{ required: true, message: '请输入区域代码' }]}
          >
            <Input placeholder="请输入区域代码" />
          </Form.Item>

          <Form.Item
            name="description"
            label="区域描述"
          >
            <Input.TextArea 
              placeholder="请输入区域描述" 
              rows={3}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* 项目组表单模态框 */}
      <Modal
        title={editingGroup ? '编辑项目组' : '新建项目组'}
        open={groupModalVisible}
        onOk={handleGroupSubmit}
        onCancel={() => setGroupModalVisible(false)}
        width={600}
        okText="确认"
        cancelText="取消"
      >
        <Form
          form={groupForm}
          layout="vertical"
          name="groupForm"
        >
          <Form.Item
            name="name"
            label="项目组名称"
            rules={[{ required: true, message: '请输入项目组名称' }]}
          >
            <Input placeholder="请输入项目组名称" />
          </Form.Item>

          <Form.Item
            name="description"
            label="项目组描述"
            rules={[{ required: true, message: '请输入项目组描述' }]}
          >
            <Input.TextArea 
              placeholder="请输入项目组描述" 
              rows={3}
            />
          </Form.Item>

          <Form.Item
            name="regionId"
            label="所属区域"
            rules={[{ required: true, message: '请选择所属区域' }]}
          >
            <Select placeholder="请选择所属区域">
              {regions.map(region => (
                <Option key={region.id} value={region.id}>
                  {region.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* 项目表单模态框 */}
      <Modal
        title={editingProject ? '编辑项目' : '新建项目'}
        open={projectModalVisible}
        onOk={handleProjectSubmit}
        onCancel={() => setProjectModalVisible(false)}
        width={600}
        okText="确认"
        cancelText="取消"
      >
        <Form
          form={projectForm}
          layout="vertical"
          name="projectForm"
        >
          <Form.Item
            name="name"
            label="项目名称"
            rules={[{ required: true, message: '请输入项目名称' }]}
          >
            <Input placeholder="请输入项目名称" />
          </Form.Item>

          <Form.Item
            name="description"
            label="项目描述"
            rules={[{ required: true, message: '请输入项目描述' }]}
          >
            <Input.TextArea 
              placeholder="请输入项目描述" 
              rows={4}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default groupMassage;