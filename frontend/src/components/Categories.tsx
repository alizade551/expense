import { Button, Popconfirm, Skeleton, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, getCategories } from '../store/actions/categoryActions';
import { Category, CategoryDispatch } from '../types/category';
import { AppState } from '../store';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import LoadingSuspense from './Loading';
import { Mode } from '../types/general';

const CategoryForm = lazy(() => import('./CategoryForm'));

function Categories() {
  const [mode, setMode] = useState<Mode>('new');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [categoryFormFetched, setCategoryFormFetched] = useState(false);
  const dispatch = useDispatch<CategoryDispatch>();
  const { data, loading } = useSelector((state: AppState) => state.categories);

  const columns: TableProps<Category>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },

    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (_, record) => {
        return <Tag color={record.color}>{record.type.toUpperCase()}</Tag>;
      },
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record: Category) => (
        <Space size='middle'>
          <a onClick={() => onUpdate(record)}>
            <EditOutlined style={{ fontSize: '17px' }} />
          </a>

          <Popconfirm
            title='Delete the task'
            description='Are you sure to delete this task?'
            okText='Yes'
            cancelText='No'
            onConfirm={() => onDelete(record.id)}
          >
            <Button type='link'>
              <DeleteOutlined style={{ fontSize: '17px', color: 'red' }} />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onDelete = async (id: number) => {
    await dispatch(deleteCategory(id));
  };

  const onCreate = () => {
    setIsModalVisible(true);
    setSelectedCategory(null);
    setCategoryFormFetched(true);
    setMode('new');
  };

  const onUpdate = (data: Category) => {
    setIsModalVisible(true);
    setSelectedCategory(data);
    setCategoryFormFetched(true);
    setMode('edit');
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <>
      <div>
        <Button type='primary' onClick={onCreate} style={{ marginBottom: '20px' }}>
          New Category
        </Button>
        {categoryFormFetched ? (
          <Suspense fallback={<LoadingSuspense message='Loading category form' />}>
            <CategoryForm
              open={isModalVisible}
              onCancel={handleCancel}
              onOk={handleOk}
              data={selectedCategory}
              mode={mode}
            />
          </Suspense>
        ) : null}
      </div>
      {loading ? <Skeleton paragraph={{ rows: 12 }} /> : <Table columns={columns} dataSource={data} rowKey='id' />}
    </>
  );
}

export default Categories;
