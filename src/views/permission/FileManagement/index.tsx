import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  Card,
  Tag,
  Space,
  Divider,
  Tooltip,
  Popconfirm
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;

// 模拟初始数据
const initialData = [
  {
    id: 1,
    name: '项目需求文档',
    type: 'project',
    category: '需求文档',
    description: 'XX项目的详细需求说明',
    createTime: '2023-05-10',
    updateTime: '2023-05-15',
    author: '张三',
    status: 'active'
  },
  {
    id: 2,
    name: '设计规范',
    type: 'internal',
    category: '设计文档',
    description: '公司UI设计规范V2.0',
    createTime: '2023-04-20',
    updateTime: '2023-06-01',
    author: '李四',
    status: 'active'
  },
  {
    id: 3,
    name: '项目周报',
    type: 'project',
    category: '报告',
    description: 'XX项目第25周进度报告',
    createTime: '2023-06-20',
    updateTime: '2023-06-20',
    author: '王五',
    status: 'active'
  }
];

const ArchiveManagement = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [form] = Form.useForm();

  // 初始化数据
  useEffect(() => {
    setData(initialData);
    setFilteredData(initialData);
  }, []);

  // 处理搜索和过滤
  useEffect(() => {
    let result = data;
    
    // 按类型过滤
    if (filterType !== 'all') {
      result = result.filter(item => item.type === filterType);
    }
    
    // 按搜索文本过滤
    if (searchText) {
      result = result.filter(item => 
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.description.toLowerCase().includes(searchText.toLowerCase()) ||
        item.category.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    setFilteredData(result);
  }, [searchText, filterType, data]);

  // 显示添加模态框
  const showAddModal = () => {
    setEditingRecord(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  // 显示编辑模态框
  const showEditModal = (record) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  // 处理模态框确认
  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingRecord) {
        // 编辑现有记录
        const updatedData = data.map(item => 
          item.id === editingRecord.id 
            ? { ...values, id: editingRecord.id, updateTime: dayjs().format('YYYY-MM-DD') }
            : item
        );
        setData(updatedData);
        message.success('档案更新成功');
      } else {
        // 添加新记录
        const newRecord = {
          ...values,
          id: Date.now(),
          createTime: dayjs().format('YYYY-MM-DD'),
          updateTime: dayjs().format('YYYY-MM-DD'),
          author: '当前用户', // 实际应用中应从用户系统获取
          status: 'active'
        };
        setData([...data, newRecord]);
        message.success('档案添加成功');
      }
      setIsModalVisible(false);
    });
  };

  // 处理模态框取消
  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  // 删除单个档案
  const handleDelete = (id) => {
    const updatedData = data.filter(item => item.id !== id);
    setData(updatedData);
    message.success('档案删除成功');
  };

  // 批量删除
  const handleBatchDelete = (ids) => {
    const updatedData = data.filter(item => !ids.includes(item.id));
    setData(updatedData);
    message.success(`已删除 ${ids.length} 个档案`);
  };

  // 表格列定义
  const columns = [
    {
      title: '档案名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <FileTextOutlined />
          <span>{text}</span>
          {record.type === 'internal' && <Tag color="blue">内部</Tag>}
        </Space>
      )
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      render: (text) => <Tooltip title={text}>{text}</Tooltip>
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      sorter: (a, b) => dayjs(a.updateTime).unix() - dayjs(b.updateTime).unix(),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="link" 
            icon={<EditOutlined />} 
            onClick={() => showEditModal(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个档案吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="是"
            cancelText="否"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="archive-management">
      <Card title="档案管理">
        {/* 搜索和过滤区域 */}
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
          <Space>
            <Input
              placeholder="搜索档案名称、描述或分类"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300 }}
            />
            <Select 
              value={filterType} 
              onChange={setFilterType}
              style={{ width: 120 }}
            >
              <Option value="all">全部类型</Option>
              <Option value="project">项目资料</Option>
              <Option value="internal">内部资料</Option>
            </Select>
          </Space>
          
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={showAddModal}
          >
            添加档案
          </Button>
        </div>
        
        <Divider />
        
        {/* 档案表格 */}
        <Table 
          columns={columns} 
          dataSource={filteredData} 
          rowKey="id"
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `第 ${range[0]}-${range[1]} 条，共 ${total} 条记录`
          }}
        />
      </Card>
      
      {/* 添加/编辑模态框 */}
      <Modal
        title={editingRecord ? '编辑档案' : '添加档案'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          name="archiveForm"
        >
          <Form.Item
            name="name"
            label="档案名称"
            rules={[{ required: true, message: '请输入档案名称' }]}
          >
            <Input placeholder="请输入档案名称" />
          </Form.Item>
          
          <Form.Item
            name="type"
            label="档案类型"
            rules={[{ required: true, message: '请选择档案类型' }]}
          >
            <Select placeholder="请选择档案类型">
              <Option value="project">项目资料</Option>
              <Option value="internal">内部资料</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="category"
            label="分类"
            rules={[{ required: true, message: '请输入分类' }]}
          >
            <Input placeholder="请输入分类" />
          </Form.Item>
          
          <Form.Item
            name="description"
            label="描述"
            rules={[{ required: true, message: '请输入描述' }]}
          >
            <TextArea rows={4} placeholder="请输入档案描述" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ArchiveManagement;