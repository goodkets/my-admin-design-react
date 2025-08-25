import React, { useEffect, useState } from "react";
import { 
  Table, Button, Modal, Form, Input, InputNumber, Select, 
  Avatar, Tag, message, Row, Col, Card, Space, Divider,
  Typography, Dropdown
} from "antd";
import { 
  EditOutlined, DeleteOutlined, DownloadOutlined, 
  UploadOutlined, PlusOutlined, SearchOutlined, 
  ReloadOutlined, MoreOutlined, IdcardOutlined, EnvironmentOutlined
} from "@ant-design/icons";
import WithLoading from "@/components/withLoading";
import avator from "../../../assets/images/avatar.jpeg";

const { Text } = Typography;
const { Option } = Select;

interface DataItem {
  id: string;
  name: string;
  avatar: string;
  age: number;
  translate: string;
  sex: string;
  property: string;
  tel: string;
  render: string;
  status: number;
  motel: string;
  motelName: string;
  time: string;
  region: string; // 新增地区字段
  key: string;
}

// 地区选项数据
const regionOptions = [
  { label: "北京市", value: "北京市" },
  { label: "上海市", value: "上海市" },
  { label: "广州市", value: "广州市" },
  { label: "深圳市", value: "深圳市" },
  { label: "杭州市", value: "杭州市" },
  { label: "南京市", value: "南京市" },
  { label: "成都市", value: "成都市" },
  { label: "武汉市", value: "武汉市" },
];

const TabBasicPage: React.FC = (props) => {
  const [data, setData] = useState<DataItem[]>([]);
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);
  const [columns, setColumns] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<DataItem | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // 模拟数据加载
    setTimeout(() => {
      const list = [
        {
          id: "1",
          name: "张明",
          avatar: avator,
          age: 32,
          translate: '110101199001011234',
          sex: '男',
          property: '北京朝阳养老院',
          tel: '13800138000',
          render: '上门服务人员',
          status: 1,
          motel: '服务人员',
          motelName: '高级护理师',
          time: '2023-10-01 12:00',
          region: '北京市',
        },
        {
          id: "2",
          name: "李思思",
          avatar: avator,
          age: 28,
          translate: '110101199501012345',
          sex: '女',
          property: '上海静安养老中心',
          tel: '13900139000',
          render: '护理人员',
          status: 2,
          motel: '护理主管',
          motelName: '护理总监',
          time: '2023-09-15 10:30',
          region: '上海市',
        },
        {
          id: "3",
          name: "王建国",
          avatar: avator,
          age: 45,
          translate: '110101197801016789',
          sex: '男',
          property: '广州白云康养中心',
          tel: '13700137000',
          render: '管理人员',
          status: 1,
          motel: '经理',
          motelName: '运营经理',
          time: '2023-08-20 09:15',
          region: '广州市',
        },
        {
          id: "4",
          name: "赵晓雯",
          avatar: avator,
          age: 29,
          translate: '110101199301017890',
          sex: '女',
          property: '深圳南山养老社区',
          tel: '13600136000',
          render: '康复师',
          status: 3,
          motel: '康复师',
          motelName: '首席康复师',
          time: '2023-11-05 14:20',
          region: '深圳市',
        }
      ];

      // 添加key属性
      const dataWithKey = list.map(item => ({ ...item, key: item.id }));
      setData(dataWithKey);
      setFilteredData(dataWithKey);
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    // 生成列配置
    const generateColumns = () => {
      const columnsConfig = [
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
          width: 80,
          render: (id: string) => (
            <Text strong>{id}</Text>
          ),
        },
        {
          title: "头像",
          dataIndex: "avatar",
          key: "avatar",
          width: 80,
          render: (avatar: string) => (
            <Avatar 
              src={avatar} 
              size={48} 
              style={{ backgroundColor: '#1890ff' }}
            />
          ),
        },
        {
          title: "姓名",
          dataIndex: "name",
          key: "name",
          width: 100,
          render: (name: string) => (
            <Text strong style={{ color: '#1f2c41' }}>{name}</Text>
          ),
        },
        {
          title: "年龄",
          dataIndex: "age",
          key: "age",
          width: 80,
          render: (age: number) => (
            <Tag color="blue" style={{ borderRadius: '12px', padding: '2px 8px' }}>
              {age} 岁
            </Tag>
          ),
        },
        {
          title: "性别",
          dataIndex: "sex",
          key: "sex",
          width: 80,
          render: (sex: string) => (
            <Tag color={sex === '男' ? 'blue' : 'pink'} style={{ borderRadius: '12px' }}>
              {sex}
            </Tag>
          ),
        },
        {
          title: "身份证号",
          dataIndex: "translate",
          key: "translate",
          width: 180,
          render: (translate: string) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IdcardOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
              <Text code>{translate}</Text>
            </div>
          ),
        },
        {
          title: "联系方式",
          dataIndex: "tel",
          key: "tel",
          width: 120,
          render: (tel: string) => <Text copyable>{tel}</Text>,
        },
        {
          title: "所属机构",
          dataIndex: "property",
          key: "property",
          width: 150,
          render: (property: string) => (
            <Tag color="geekblue" style={{ borderRadius: '6px' }}>
              {property}
            </Tag>
          ),
        },
        {
          title: "职务",
          dataIndex: "motelName",
          key: "motelName",
          width: 120,
          render: (motelName: string) => (
            <Tag color="purple" style={{ borderRadius: '6px' }}>
              {motelName}
            </Tag>
          ),
        },
        {
          title: "地区",
          dataIndex: "region",
          key: "region",
          width: 100,
          render: (region: string) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <EnvironmentOutlined style={{ color: '#fa541c', marginRight: '4px' }} />
              <Text>{region}</Text>
            </div>
          ),
        },
        {
          title: "状态",
          dataIndex: "status",
          key: "status",
          width: 100,
          render: (status: number) => {
            const statusConfig: Record<number, { color: string; text: string }> = {
              1: { color: 'green', text: '服务中' },
              2: { color: 'blue', text: '已完成' },
              3: { color: 'red', text: '已取消' }
            };
            return (
              <Tag 
                color={statusConfig[status]?.color || 'default'} 
                style={{ 
                  borderRadius: '16px', 
                  padding: '4px 12px',
                }}
              >
                {statusConfig[status]?.text || '未知'}
              </Tag>
            );
          },
        },
        {
          title: "入职时间",
          dataIndex: "time",
          key: "time",
          width: 120,
          render: (time: string) => (
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {time}
            </Text>
          ),
        },
        {
          title: "操作",
          key: "action",
          fixed: 'right',
          width: 80,
          render: (_, record: DataItem) => (
            <Dropdown
              menu={{
                items: [
                  {
                    key: '1',
                    label: '编辑信息',
                    icon: <EditOutlined />,
                    onClick: () => handleEdit(record)
                  },
                  {
                    key: '2',
                    label: '查看详情',
                    icon: <EditOutlined />
                  },
                  {
                    type: 'divider',
                  },
                  {
                    key: '3',
                    label: '删除',
                    icon: <DeleteOutlined />,
                    danger: true,
                    onClick: () => handleSingleDelete(record)
                  }
                ]
              }}
              trigger={['click']}
            >
              <Button 
                type="text" 
                icon={<MoreOutlined />} 
                style={{ borderRadius: '6px' }}
              />
            </Dropdown>
          ),
        }
      ];
      
      return columnsConfig;
    };

    const listColumns = generateColumns();
    setColumns(listColumns);
  }, [data]);

  // 处理搜索
  const handleSearch = (values: any) => {
    const filtered = data.filter(item => {
      return (
        (!values.name || item.name.includes(values.name)) &&
        (!values.translate || item.translate.includes(values.translate)) &&
        (!values.sex || item.sex === values.sex) &&
        (!values.region || item.region === values.region) // 添加地区筛选条件
      );
    });
    setFilteredData(filtered);
  };

  // 重置搜索
  const handleReset = () => {
    searchForm.resetFields();
    setFilteredData(data);
  };

  // 处理编辑
  const handleEdit = (record: DataItem) => {
    setEditingRecord(record);
    editForm.setFieldsValue(record);
    setIsModalVisible(true);
  };

  // 取消编辑
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingRecord(null);
    editForm.resetFields();
  };

  // 保存编辑
  const handleOk = async () => {
    try {
      const values = await editForm.validateFields();
      const newData = data.map(item => {
        if (item.id === editingRecord?.id) {
          return { ...item, ...values };
        }
        return item;
      });
      
      setData(newData);
      setFilteredData(newData);
      setIsModalVisible(false);
      setEditingRecord(null);
      message.success('修改成功');
    } catch (error) {
      console.log('验证失败:', error);
    }
  };

  // 处理选择行
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // 处理批量删除
  const handleDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择要删除的项目');
      return;
    }
    
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除选中的 ${selectedRowKeys.length} 条记录吗？`,
      okText: '确认',
      cancelText: '取消',
      okType: 'danger',
      onOk: () => {
        const newData = data.filter(item => !selectedRowKeys.includes(item.key));
        setData(newData);
        setFilteredData(newData);
        setSelectedRowKeys([]);
        message.success('删除成功');
      },
    });
  };

  // 处理单个删除
  const handleSingleDelete = (record: DataItem) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除 ${record.name} 的记录吗？`,
      okText: '确认',
      cancelText: '取消',
      okType: 'danger',
      onOk: () => {
        const newData = data.filter(item => item.id !== record.id);
        setData(newData);
        setFilteredData(newData);
        message.success('删除成功');
      },
    });
  };

  // 处理新增
  const handleAdd = () => {
    setEditingRecord(null);
    editForm.resetFields();
    setIsModalVisible(true);
  };

  // 处理导入
  const handleImport = () => {
    message.info('导入功能待实现');
  };

  // 处理导出
  const handleExport = () => {
    message.info('导出功能待实现');
  };

  // 行选择配置
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div>
      <div >
        <Card 
        >
          {/* 搜索区域 */}
          <div style={{ marginBottom: '16px', fontWeight: 'bold' }}>搜索条件</div>
          <Form
            form={searchForm}
            layout="inline"
            onFinish={handleSearch}
            style={{ marginBottom: '16px' }}
          >
            <Space size="middle" wrap>
              <span style={{ fontWeight: '500' }}>姓名:</span>
              <Form.Item name="name" style={{ marginBottom: 0 }}>
                <Input 
                  placeholder="请输入姓名" 
                  style={{ borderRadius: '6px', width: '150px' }}
                />
              </Form.Item>
              
              <span style={{ fontWeight: '500' }}>身份证号:</span>
              <Form.Item name="translate" style={{ marginBottom: 0 }}>
                <Input 
                  placeholder="请输入身份证号" 
                  style={{ borderRadius: '6px', width: '220px' }}
                />
              </Form.Item>
              
              <span style={{ fontWeight: '500' }}>性别:</span>
              <Form.Item name="sex" style={{ marginBottom: 0 }}>
                <Select 
                  placeholder="请选择性别"
                  style={{ borderRadius: '6px', width: '100px' }}
                >
                  <Option value="男">男</Option>
                  <Option value="女">女</Option>
                </Select>
              </Form.Item>
              
              <span style={{ fontWeight: '500' }}>地区:</span>
              <Form.Item name="region" style={{ marginBottom: 0 }}>
                <Select 
                  placeholder="请选择地区"
                  style={{ borderRadius: '6px', width: '120px' }}
                >
                  {regionOptions.map(option => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              
              <Button 
                type="primary" 
                htmlType="submit" 
                icon={<SearchOutlined />}
                style={{ borderRadius: '6px' }}
              >
                搜索
              </Button>
              <Button 
                onClick={handleReset} 
                icon={<ReloadOutlined />}
                style={{ borderRadius: '6px' }}
              >
                重置
              </Button>
            </Space>
          </Form>

          <Divider style={{ margin: '16px 0' }} />

          {/* 操作按钮区域 */}
          <div style={{ 
            marginBottom: 16, 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <Text strong>
                {selectedRowKeys.length > 0 ? `已选择 ${selectedRowKeys.length} 项` : '人员列表'}
              </Text>
            </div>
            <Space>
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={handleAdd}
                style={{ borderRadius: '6px' }}
              >
                新增人员
              </Button>
              <Button 
                danger 
                icon={<DeleteOutlined />} 
                onClick={handleDelete}
                disabled={selectedRowKeys.length === 0}
                style={{ borderRadius: '6px' }}
              >
                批量删除
              </Button>
              <Button 
                icon={<UploadOutlined />} 
                onClick={handleImport}
                style={{ borderRadius: '6px' }}
              >
                导入
              </Button>
              <Button 
                icon={<DownloadOutlined />} 
                onClick={handleExport}
                style={{ borderRadius: '6px' }}
              >
                导出
              </Button>
            </Space>
          </div>

          {/* 表格 */}
          <Table
            rowSelection={rowSelection}
            bordered={false}
            dataSource={filteredData}
            columns={columns}
            pagination={{ 
              pageSize: 10, 
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
              style: { marginTop: '24px' }
            }}
            loading={loading}
            scroll={{ x: 1600 }}
            style={{ borderRadius: '8px' }}
          />
        </Card>
      </div>
      
      {/* 编辑弹窗 */}
      <Modal
        title={editingRecord ? "编辑人员信息" : "新增人员信息"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="保存"
        cancelText="取消"
        width={600}
        styles={{
          body: { padding: '24px' },
          header: { borderBottom: '1px solid #f0f0f0', marginBottom: '16px' }
        }}
      >
        <Form
          form={editForm}
          layout="vertical"
          name="form_in_modal"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="姓名"
                rules={[{ required: true, message: '请输入姓名!' }]}
              >
                <Input placeholder="请输入姓名" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="age"
                label="年龄"
                rules={[{ required: true, message: '请输入年龄!' }]}
              >
                <InputNumber 
                  min={1} 
                  max={150} 
                  style={{ width: '100%' }} 
                  placeholder="请输入年龄"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="sex"
                label="性别"
                rules={[{ required: true, message: '请选择性别!' }]}
              >
                <Select placeholder="请选择性别">
                  <Option value="男">男</Option>
                  <Option value="女">女</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="tel"
                label="电话"
                rules={[{ required: true, message: '请输入电话!' }]}
              >
                <Input placeholder="请输入电话" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="translate"
            label="身份证号"
            rules={[{ required: true, message: '请输入身份证号!' }]}
          >
            <Input placeholder="请输入身份证号" />
          </Form.Item>

          <Form.Item
            name="property"
            label="所属机构"
            rules={[{ required: true, message: '请输入所属机构!' }]}
          >
            <Input placeholder="请输入所属机构" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="motelName"
                label="职务"
                rules={[{ required: true, message: '请输入职务!' }]}
              >
                <Input placeholder="请输入职务" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="region"
                label="地区"
                rules={[{ required: true, message: '请选择地区!' }]}
              >
                <Select placeholder="请选择地区">
                  {regionOptions.map(option => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态!' }]}
          >
            <Select placeholder="请选择状态">
              <Option value={1}>服务中</Option>
              <Option value={2}>已完成</Option>
              <Option value={3}>已取消</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default WithLoading(TabBasicPage);