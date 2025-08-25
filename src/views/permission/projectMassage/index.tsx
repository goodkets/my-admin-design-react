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
  Badge,
  Descriptions
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
  UserAddOutlined,
  SettingOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { TabPane } = Tabs;

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

// 项目数据类型定义
interface Project {
  id: string;
  name: string;
  description: string;
  creator: User;
  createTime: string;
  updateTime: string;
  status: 'active' | 'completed' | 'pending';
  members: User[]; // 项目成员
  modules: string[]; // 项目模块
}

// 表单值类型定义
interface ProjectFormValues {
  name: string;
  description: string;
}

const ProjectMassage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]); // 所有用户数据
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [memberModalVisible, setMemberModalVisible] = useState<boolean>(false);
  const [moduleModalVisible, setModuleModalVisible] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [searchForm] = Form.useForm();
  const [projectForm] = Form.useForm();
  const [moduleForm] = Form.useForm();

  // 模拟数据加载
  useEffect(() => {
    setLoading(true);
    // 模拟API调用
    setTimeout(() => {
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
        },
        {
          id: '4',
          name: '赵测试',
          username: 'test01',
          email: 'test01@example.com',
          phone: '13800138004',
          department: '测试部',
          role: 'user',
          status: 'active',
          createTime: '2023-04-05 16:20:45'
        },
        {
          id: '5',
          name: '钱开发',
          username: 'dev01',
          email: 'dev01@example.com',
          phone: '13800138005',
          department: '开发部',
          role: 'user',
          status: 'active',
          createTime: '2023-05-10 09:30:00'
        }
      ];

      // 模拟项目数据
      const mockProjects: Project[] = [
        {
          id: '101',
          name: '智慧养老平台',
          description: '为养老院提供智能化管理服务',
          creator: mockUsers[0], // 张管理员
          createTime: '2023-06-01 09:00:00',
          updateTime: '2023-06-15 14:30:00',
          status: 'active',
          members: [mockUsers[0], mockUsers[1], mockUsers[3]],
          modules: ['xxx局', '管理员', '健康监测']
        },
        {
          id: '102',
          name: '社区健康服务系统',
          description: '社区健康服务与管理系统',
          creator: mockUsers[2], // 王局长
          createTime: '2023-05-15 10:20:00',
          updateTime: '2023-06-10 11:45:00',
          status: 'active',
          members: [mockUsers[2], mockUsers[4]],
          modules: ['健康档案', '预约服务', '数据分析']
        },
        {
          id: '103',
          name: '移动护理APP',
          description: '移动端护理人员工作平台',
          creator: mockUsers[0], // 张管理员
          createTime: '2023-07-01 13:15:00',
          updateTime: '2023-07-05 16:20:00',
          status: 'pending',
          members: [mockUsers[0], mockUsers[4]],
          modules: ['任务管理', '工作汇报', '消息通知']
        }
      ];

      setUsers(mockUsers);
      setProjects(mockProjects);
      setFilteredProjects(mockProjects);
      setLoading(false);
    }, 800);
  }, []);

  // 处理搜索
  const handleSearch = (values: any) => {
    const { keyword, status } = values;
    const filtered = projects.filter(project => {
      return (
        (!keyword || 
          project.name.includes(keyword) || 
          project.description.includes(keyword)) &&
        (!status || project.status === status)
      );
    });
    setFilteredProjects(filtered);
  };

  // 重置搜索
  const handleReset = () => {
    searchForm.resetFields();
    setFilteredProjects(projects);
  };

  // 打开新增项目模态框
  const handleAdd = () => {
    setEditingProject(null);
    projectForm.resetFields();
    setModalVisible(true);
  };

  // 打开编辑项目模态框
  const handleEdit = (project: Project) => {
    setEditingProject(project);
    projectForm.setFieldsValue({
      name: project.name,
      description: project.description
    });
    setModalVisible(true);
  };

  // 打开管理成员模态框
  const handleManageMembers = (project: Project) => {
    setActiveProject(project);
    setMemberModalVisible(true);
  };

  // 打开管理模块模态框
  const handleManageModules = (project: Project) => {
    setActiveProject(project);
    moduleForm.resetFields();
    setModuleModalVisible(true);
  };

  // 查看项目详情
  const handleViewDetails = (project: Project) => {
    setActiveProject(project);
  };

  // 处理删除项目
  const handleDelete = (projectId: string) => {
    const newProjects = projects.filter(project => project.id !== projectId);
    setProjects(newProjects);
    setFilteredProjects(newProjects);
    message.success('项目删除成功');
  };

  // 处理表单提交（新增/编辑）
  const handleSubmit = async () => {
    try {
      const values = await projectForm.validateFields();
      
      if (editingProject) {
        // 编辑现有项目
        const newProjects = projects.map(project => 
          project.id === editingProject.id ? 
          { ...project, ...values, updateTime: new Date().toLocaleString() } : project
        );
        setProjects(newProjects);
        setFilteredProjects(newProjects);
        message.success('项目信息更新成功');
      } else {
        // 新增项目
        const newProject: Project = {
          ...values,
          id: Date.now().toString(),
          creator: users[0], // 默认当前用户为创建者
          createTime: new Date().toLocaleString(),
          updateTime: new Date().toLocaleString(),
          status: 'active',
          members: [users[0]], // 默认添加创建者为成员
          modules: []
        };
        const newProjects = [...projects, newProject];
        setProjects(newProjects);
        setFilteredProjects(newProjects);
        message.success('项目添加成功');
      }
      
      setModalVisible(false);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  // 处理添加成员
  const handleAddMember = (userId: string) => {
    if (!activeProject) return;
    
    const userToAdd = users.find(user => user.id === userId);
    if (!userToAdd) return;
    
    // 检查是否已是成员
    if (activeProject.members.some(member => member.id === userId)) {
      message.warning('该用户已是项目成员');
      return;
    }
    
    const newProjects = projects.map(project => 
      project.id === activeProject.id ? 
      { ...project, members: [...project.members, userToAdd], updateTime: new Date().toLocaleString() } : project
    );
    
    setProjects(newProjects);
    setFilteredProjects(newProjects);
    setActiveProject({ ...activeProject, members: [...activeProject.members, userToAdd] });
    message.success('成员添加成功');
  };

  // 处理移除成员
  const handleRemoveMember = (userId: string) => {
    if (!activeProject) return;
    
    // 不能移除创建者
    if (userId === activeProject.creator.id) {
      message.warning('不能移除项目创建者');
      return;
    }
    
    const newProjects = projects.map(project => 
      project.id === activeProject.id ? 
      { ...project, members: project.members.filter(member => member.id !== userId), updateTime: new Date().toLocaleString() } : project
    );
    
    setProjects(newProjects);
    setFilteredProjects(newProjects);
    setActiveProject({ ...activeProject, members: activeProject.members.filter(member => member.id !== userId) });
    message.success('成员移除成功');
  };

  // 处理添加模块
  const handleAddModule = async () => {
    try {
      const values = await moduleForm.validateFields();
      const { moduleName } = values;
      
      if (!activeProject) return;
      
      const newProjects = projects.map(project => 
        project.id === activeProject.id ? 
        { ...project, modules: [...project.modules, moduleName], updateTime: new Date().toLocaleString() } : project
      );
      
      setProjects(newProjects);
      setFilteredProjects(newProjects);
      setActiveProject({ ...activeProject, modules: [...activeProject.modules, moduleName] });
      moduleForm.resetFields();
      message.success('模块添加成功');
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  // 处理移除模块
  const handleRemoveModule = (moduleName: string) => {
    if (!activeProject) return;
    
    const newProjects = projects.map(project => 
      project.id === activeProject.id ? 
      { ...project, modules: project.modules.filter(module => module !== moduleName), updateTime: new Date().toLocaleString() } : project
    );
    
    setProjects(newProjects);
    setFilteredProjects(newProjects);
    setActiveProject({ ...activeProject, modules: activeProject.modules.filter(module => module !== moduleName) });
    message.success('模块移除成功');
  };

  // 状态映射
  const statusMap = {
    active: { text: '进行中', color: 'green' },
    completed: { text: '已完成', color: 'blue' },
    pending: { text: '未开始', color: 'orange' }
  };

  // 表格列配置
  const columns = [
    {
      title: '项目名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (name: string, record: Project) => (
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{name}</div>
          <div style={{ color: '#666', fontSize: '12px' }}>{record.description}</div>
        </div>
      )
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
      width: 150,
      render: (creator: User) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            src={creator.avatar} 
            icon={<UserOutlined />} 
            size="small"
            style={{ marginRight: 8 }}
          />
          <div>
            <div>{creator.name}</div>
            <div style={{ color: '#999', fontSize: '12px' }}>{creator.department}</div>
          </div>
        </div>
      )
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 120,
      render: (time: string) => (
        <div style={{ color: '#666', fontSize: '12px' }}>{time.split(' ')[0]}</div>
      )
    },
    {
      title: '项目成员',
      dataIndex: 'members',
      key: 'members',
      width: 100,
      render: (members: User[]) => (
        <Tooltip title={members.map(m => m.name).join(', ')}>
          <Tag icon={<TeamOutlined />}>{members.length}人</Tag>
        </Tooltip>
      )
    },
    // {
    //   title: '项目模块',
    //   dataIndex: 'modules',
    //   key: 'modules',
    //   width: 100,
    //   render: (modules: string[]) => (
    //     <Tooltip title={modules.join(', ')}>
    //       <Tag icon={<ProjectOutlined />}>{modules.length}个</Tag>
    //     </Tooltip>
    //   )
    // },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (status: 'active' | 'completed' | 'pending') => (
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
      render: (_, record: Project) => (
        <Space size="small">
          <Button 
            type="link" 
            size="small"
            onClick={() => handleViewDetails(record)}
          >
            详情
          </Button>
          <Button 
            type="link" 
            size="small" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button 
            type="link" 
            size="small"
            icon={<UserAddOutlined />}
            onClick={() => handleManageMembers(record)}
          >
            成员
          </Button>
          {/* <Button 
            type="link" 
            size="small"
            icon={<SettingOutlined />}
            onClick={() => handleManageModules(record)}
          >
            模块
          </Button> */}
          <Popconfirm
            title="确定删除这个项目吗？"
            onConfirm={() => handleDelete(record.id)}
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
                  placeholder="搜索项目名称或描述" 
                  prefix={<SearchOutlined />}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item name="status" style={{ marginBottom: 0 }}>
                <Select placeholder="选择状态">
                  <Option value="active">进行中</Option>
                  <Option value="completed">已完成</Option>
                  <Option value="pending">未开始</Option>
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
            <span>共 {filteredProjects.length} 个项目</span>
          </div>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleAdd}
          >
            新建项目
          </Button>
        </div>

        {/* 项目表格 */}
        <Table
          columns={columns}
          dataSource={filteredProjects}
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
        />
      </Card>

      {/* 项目详情模态框 */}
      <Modal
        title="项目详情"
        open={!!activeProject}
        onCancel={() => setActiveProject(null)}
        width={700}
        footer={[
          <Button key="close" onClick={() => setActiveProject(null)}>
            关闭
          </Button>
        ]}
      >
        {activeProject && (
          <div>
            <Descriptions title={activeProject.name} bordered column={1}>
              <Descriptions.Item label="项目描述">{activeProject.description}</Descriptions.Item>
              <Descriptions.Item label="创建人">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar 
                    src={activeProject.creator.avatar} 
                    icon={<UserOutlined />} 
                    style={{ marginRight: 8 }}
                  />
                  <div>
                    <div>{activeProject.creator.name}</div>
                    <div style={{ color: '#999' }}>{activeProject.creator.department}</div>
                  </div>
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="创建时间">{activeProject.createTime}</Descriptions.Item>
              <Descriptions.Item label="更新时间">{activeProject.updateTime}</Descriptions.Item>
              <Descriptions.Item label="状态">
                <Tag color={statusMap[activeProject.status].color}>
                  {statusMap[activeProject.status].text}
                </Tag>
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Tabs defaultActiveKey="members">
              <TabPane tab={`成员 (${activeProject.members.length})`} key="members">
                <List
                  dataSource={activeProject.members}
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
              {/* <TabPane tab={`模块 (${activeProject.modules.length})`} key="modules">
                <List
                  dataSource={activeProject.modules}
                  renderItem={module => (
                    <List.Item
                      actions={[
                        <Button 
                          type="link" 
                          danger 
                          size="small"
                          onClick={() => handleRemoveModule(module)}
                        >
                          移除
                        </Button>
                      ]}
                    >
                      <List.Item.Meta
                        title={module}
                      />
                    </List.Item>
                  )}
                />
              </TabPane> */}
            </Tabs>
          </div>
        )}
      </Modal>

      {/* 新增/编辑项目模态框 */}
      <Modal
        title={editingProject ? '编辑项目' : '新建项目'}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
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

      {/* 管理成员模态框 */}
      <Modal
        title={`管理成员 - ${activeProject?.name}`}
        open={memberModalVisible}
        onCancel={() => setMemberModalVisible(false)}
        width={600}
        footer={null}
      >
        {activeProject && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <Select
                placeholder="选择要添加的成员"
                style={{ width: '100%' }}
                onChange={handleAddMember}
              >
                {users
                  .filter(user => !activeProject.members.some(member => member.id === user.id))
                  .map(user => (
                    <Option key={user.id} value={user.id}>
                      {user.name} - {user.department}
                    </Option>
                  ))
                }
              </Select>
            </div>

            <List
              dataSource={activeProject.members}
              renderItem={member => (
                <List.Item
                  actions={[
                    member.id !== activeProject.creator.id && (
                      <Button 
                        type="link" 
                        danger 
                        size="small"
                        onClick={() => handleRemoveMember(member.id)}
                      >
                        移除
                      </Button>
                    )
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={member.avatar} icon={<UserOutlined />} />}
                    title={
                      <div>
                        {member.name}
                        {member.id === activeProject.creator.id && (
                          <Tag color="blue" style={{ marginLeft: 8 }}>创建者</Tag>
                        )}
                      </div>
                    }
                    description={`${member.department} · ${member.email}`}
                  />
                </List.Item>
              )}
            />
          </div>
        )}
      </Modal>

      {/* 管理模块模态框 */}
      <Modal
        title={`管理模块 - ${activeProject?.name}`}
        open={moduleModalVisible}
        onCancel={() => setModuleModalVisible(false)}
        width={600}
        footer={null}
      >
        {activeProject && (
          <div>
            <Form
              form={moduleForm}
              layout="inline"
              onFinish={handleAddModule}
              style={{ marginBottom: 16 }}
            >
              <Form.Item
                name="moduleName"
                rules={[{ required: true, message: '请输入模块名称' }]}
                style={{ flex: 1, marginRight: 8 }}
              >
                <Input placeholder="输入新模块名称" />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                添加模块
              </Button>
            </Form>

            <List
              dataSource={activeProject.modules}
              renderItem={module => (
                <List.Item
                  actions={[
                    <Button 
                      type="link" 
                      danger 
                      size="small"
                      onClick={() => handleRemoveModule(module)}
                    >
                      移除
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    title={module}
                  />
                </List.Item>
              )}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProjectMassage;