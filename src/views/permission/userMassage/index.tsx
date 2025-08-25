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
  Avatar
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  ReloadOutlined,
  UserOutlined,
  SafetyOutlined,
  TeamOutlined
} from '@ant-design/icons';

const { Option } = Select;

// 用户数据类型定义
interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  avatar?: string;
  department: string;
  projectGroup?: string; // 新增：所属项目组（可选）
  role: 'admin' | 'user' | 'bureau';
  status: 'active' | 'inactive';
  createTime: string;
}

// 表单值类型定义
interface UserFormValues {
  name: string;
  username: string;
  email: string;
  phone: string;
  department: string;
  projectGroup?: string; // 新增：所属项目组（可选）
  role: 'admin' | 'user' | 'bureau';
}

// 权限映射
const roleMap = {
  admin: { text: '管理员', color: 'red' },
  user: { text: '普通用户', color: 'blue' },
  bureau: { text: '某某局', color: 'green' }
};

// 状态映射
const statusMap = {
  active: { text: '激活', color: 'green' },
  inactive: { text: '禁用', color: 'default' }
};

// 项目组选项
const projectGroupOptions = [
  '前端开发组',
  '后端开发组',
  '测试组',
  'UI设计组',
  '产品组',
  '运维组',
  '数据分析组',
  '移动端组'
];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchForm] = Form.useForm();
  const [userForm] = Form.useForm();

  // 模拟数据加载
  useEffect(() => {
    setLoading(true);
    // 模拟API调用
    setTimeout(() => {
      const mockUsers: User[] = [
        {
          id: '1',
          name: '张管理员',
          username: 'admin01',
          email: 'admin01@example.com',
          phone: '13800138001',
          department: '信息技术部',
          projectGroup: '前端开发组',
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
          projectGroup: '产品组',
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
          // 这个用户没有项目组
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
          projectGroup: '测试组',
          role: 'user',
          status: 'inactive',
          createTime: '2023-04-05 16:20:45'
        },
        {
          id: '5',
          name: '钱新用户',
          username: 'newuser',
          email: 'newuser@example.com',
          phone: '13800138005',
          department: '研发部',
          // 新用户，还没有分配项目组
          role: 'user',
          status: 'active',
          createTime: '2023-05-10 09:30:00'
        }
      ];
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setLoading(false);
    }, 800);
  }, []);

  // 处理搜索
  const handleSearch = (values: any) => {
    const { keyword, role, status, projectGroup } = values;
    const filtered = users.filter(user => {
      return (
        (!keyword || 
          user.name.includes(keyword) || 
          user.username.includes(keyword) || 
          user.email.includes(keyword)) &&
        (!role || user.role === role) &&
        (!status || user.status === status) &&
        (!projectGroup || user.projectGroup === projectGroup) // 添加项目组筛选
      );
    });
    setFilteredUsers(filtered);
  };

  // 重置搜索
  const handleReset = () => {
    searchForm.resetFields();
    setFilteredUsers(users);
  };

  // 打开新增用户模态框
  const handleAdd = () => {
    setEditingUser(null);
    userForm.resetFields();
    setModalVisible(true);
  };

  // 打开编辑用户模态框
  const handleEdit = (user: User) => {
    setEditingUser(user);
    userForm.setFieldsValue(user);
    setModalVisible(true);
  };

  // 处理删除用户
  const handleDelete = (userId: string) => {
    const newUsers = users.filter(user => user.id !== userId);
    setUsers(newUsers);
    setFilteredUsers(newUsers);
    message.success('用户删除成功');
  };

  // 处理表单提交（新增/编辑）
  const handleSubmit = async () => {
    try {
      const values = await userForm.validateFields();
      
      if (editingUser) {
        // 编辑现有用户
        const newUsers = users.map(user => 
          user.id === editingUser.id ? { ...user, ...values } : user
        );
        setUsers(newUsers);
        setFilteredUsers(newUsers);
        message.success('用户信息更新成功');
      } else {
        // 新增用户
        const newUser: User = {
          ...values,
          id: Date.now().toString(),
          status: 'active',
          createTime: new Date().toLocaleString()
        };
        const newUsers = [...users, newUser];
        setUsers(newUsers);
        setFilteredUsers(newUsers);
        message.success('用户添加成功');
      }
      
      setModalVisible(false);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  // 处理状态切换
  const handleStatusToggle = (user: User) => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    const newUsers = users.map(u => 
      u.id === user.id ? { ...u, status: newStatus } : u
    );
    setUsers(newUsers);
    setFilteredUsers(newUsers);
    message.success(`用户已${newStatus === 'active' ? '激活' : '禁用'}`);
  };

  // 表格列配置
  const columns = [
    {
      title: '用户ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      align: 'center' as const,
      render: (id: string) => (
        <Tag color="blue">#{id}</Tag>
      )
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 80,
      align: 'center' as const,
      render: (avatar: string | undefined, record: User) => (
        <Avatar 
          src={avatar} 
          icon={<UserOutlined />} 
          size="large"
          style={{ backgroundColor: '#1890ff' }}
        />
      )
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 120,
      render: (name: string) => (
        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{name}</div>
      )
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      width: 120,
      render: (username: string) => (
        <div style={{ color: '#666' }}>@{username}</div>
      )
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 180,
      render: (email: string) => (
        <div>
          <a href={`mailto:${email}`}>{email}</a>
        </div>
      )
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      width: 120,
      render: (phone: string) => (
        <div>{phone}</div>
      )
    },
    // {
    //   title: '部门',
    //   dataIndex: 'department',
    //   key: 'department',
    //   width: 120,
    //   render: (department: string) => (
    //     <Tag color="geekblue">{department}</Tag>
    //   )
    // },
    {
      title: '所属项目组',
      dataIndex: 'projectGroup',
      key: 'projectGroup',
      width: 130,
      render: (projectGroup: string | undefined) => (
        projectGroup ? (
          <Tag icon={<TeamOutlined />} color="purple">
            {projectGroup}
          </Tag>
        ) : (
          <Tag color="default">未分配</Tag>
        )
      )
    },
    {
      title: '权限角色',
      dataIndex: 'role',
      key: 'role',
      width: 100,
      render: (role: 'admin' | 'user' | 'bureau') => (
        <Tag color={roleMap[role].color} icon={<SafetyOutlined />}>
          {roleMap[role].text}
        </Tag>
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
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 150,
      render: (time: string) => (
        <div style={{ color: '#999', fontSize: '12px' }}>{time}</div>
      )
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      fixed: 'right' as const,
      render: (_, record: User) => (
        <Space size="small">
          <Tooltip title="编辑">
            <Button 
              type="primary" 
              size="small" 
              icon={<EditOutlined />} 
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title={record.status === 'active' ? '禁用' : '激活'}>
            <Button 
              size="small"
              danger={record.status === 'active'}
              onClick={() => handleStatusToggle(record)}
            >
              {record.status === 'active' ? '禁用' : '激活'}
            </Button>
          </Tooltip>
          <Popconfirm
            title="确定删除这个用户吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Tooltip title="删除">
              <Button 
                type="primary" 
                danger 
                size="small"
                icon={<DeleteOutlined />} 
              />
            </Tooltip>
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
                  placeholder="搜索姓名、用户名或邮箱" 
                  prefix={<SearchOutlined />}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item name="role" style={{ marginBottom: 0 }}>
                <Select placeholder="选择权限角色">
                  <Option value="admin">管理员</Option>
                  <Option value="user">普通用户</Option>
                  <Option value="bureau">某某局</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item name="status" style={{ marginBottom: 0 }}>
                <Select placeholder="选择状态">
                  <Option value="active">激活</Option>
                  <Option value="inactive">禁用</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item name="projectGroup" style={{ marginBottom: 0 }}>
                <Select placeholder="选择项目组">
                  <Option value="">全部项目组</Option>
                  {projectGroupOptions.map(group => (
                    <Option key={group} value={group}>{group}</Option>
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
            <span>共 {filteredUsers.length} 个用户</span>
          </div>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleAdd}
          >
            新增用户
          </Button>
        </div>

        {/* 用户表格 */}
        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          loading={loading}
          scroll={{ x: 1600 }} // 增加滚动宽度以适应新列
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
          }}
        />
      </Card>

      {/* 新增/编辑用户模态框 */}
      <Modal
        title={editingUser ? '编辑用户' : '新增用户'}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        width={600}
        okText="确认"
        cancelText="取消"
      >
        <Form
          form={userForm}
          layout="vertical"
          name="userForm"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="姓名"
                rules={[{ required: true, message: '请输入姓名' }]}
              >
                <Input placeholder="请输入姓名" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="username"
                label="用户名"
                rules={[{ required: true, message: '请输入用户名' }]}
              >
                <Input placeholder="请输入用户名" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="邮箱"
                rules={[
                  { required: true, message: '请输入邮箱' },
                  { type: 'email', message: '请输入有效的邮箱地址' }
                ]}
              >
                <Input placeholder="请输入邮箱" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="手机号"
                rules={[
                  { required: true, message: '请输入手机号' },
                  { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' }
                ]}
              >
                <Input placeholder="请输入手机号" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="department"
            label="部门"
            rules={[{ required: true, message: '请输入部门' }]}
          >
            <Input placeholder="请输入部门" />
          </Form.Item>

          <Form.Item
            name="projectGroup"
            label="所属项目组"
          >
            <Select 
              placeholder="请选择项目组（可选）"
              allowClear
            >
              {projectGroupOptions.map(group => (
                <Option key={group} value={group}>{group}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="role"
            label="权限角色"
            rules={[{ required: true, message: '请选择权限角色' }]}
          >
            <Select placeholder="请选择权限角色">
              <Option value="admin">管理员</Option>
              <Option value="user">普通用户</Option>
              <Option value="bureau">某某局</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;