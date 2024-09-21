import { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store';
import { Button, Popconfirm, Skeleton, Space, Table, TableProps, Tag } from 'antd';
import { Record, RecordDispatch } from '../types/record';
import { deleteRecord, getRecords } from '../store/actions/recordActions';
import { Mode } from '../types/general';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { CategoryDispatch } from '../types/category';
import { getCategories } from '../store/actions/categoryActions';
import LoadingSuspense from './Loading';

// import RecordForm from './RecordForm';

const RecordForm = lazy(() => import('./RecordForm'));

function Records() {
  const { data, loading } = useSelector((state: AppState) => state.records);
  const { loading: categoryLoading, data: categories } = useSelector((state: AppState) => state.categories);
  const dispatch = useDispatch<RecordDispatch>();
  const categoryDispatch = useDispatch<CategoryDispatch>();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [mode, setMode] = useState<Mode>('new');
  const [recordFormFetched, setRecordFormFetched] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);

  useEffect(() => {
    dispatch(getRecords());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length === 0 && !categoryLoading) {
      categoryDispatch(getCategories());
    }
  }, [categories, categoryLoading, categoryDispatch]);

  const columns: TableProps<Record>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: Record['amount']) => {
        return (
          <>
            {Intl.NumberFormat('en-Us', {
              style: 'currency',
              currency: 'USD',
            }).format(amount)}
          </>
        );
      },
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: Record['category']) => {
        if (category && typeof category === 'object') {
          return (
            <Tag color={category.color || 'black'} key={category.id}>
              {category.name || 'Unknown'}
            </Tag>
          );
        } else if (typeof category === 'string') {
          return <Tag key={category}>{category}</Tag>;
        }
        return 'N/A';
      },
    },

    {
      title: 'Updated at',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (updatedAt: Record['updatedAt']) => {
        const updatedAtObject = new Date(updatedAt);
        return (
          <>
            {updatedAtObject.toLocaleDateString('es-CL', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}{' '}
            {updatedAtObject.toLocaleTimeString('az-Az', {
              hour: 'numeric',
              minute: '2-digit',
            })}
          </>
        );
      },
    },

    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: Record['createdAt']) => {
        const createdAtObject = new Date(createdAt);
        return (
          <>
            {createdAtObject.toLocaleDateString('es-CL', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}{' '}
            {createdAtObject.toLocaleTimeString('az-Az', {
              hour: 'numeric',
              minute: '2-digit',
            })}
          </>
        );
      },
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record: Record) => (
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

  const onCreate = () => {
    setIsModalVisible(true);
    setMode('new');
    setSelectedRecord(null);
    setRecordFormFetched(true);
  };

  const onUpdate = (record: Record) => {
    setIsModalVisible(true);
    setMode('edit');
    setSelectedRecord(record);
    setRecordFormFetched(true);
  };

  const onDelete = async (id: number) => {
    // Delete record logic here
    await dispatch(deleteRecord(id));
    setIsModalVisible(false);
    setMode('new');
    dispatch(getRecords());
  };

  return (
    <>
      <div>
        <Button type='primary' onClick={onCreate} style={{ marginBottom: '20px' }}>
          New record
        </Button>
        {recordFormFetched ? (
          <Suspense fallback={<LoadingSuspense message='Loading record form' />}>
            <RecordForm
              mode={mode}
              open={isModalVisible}
              data={selectedRecord}
              onCancel={handleCancel}
              onOk={handleOk}
            />
          </Suspense>
        ) : null}
      </div>
      {loading ? (
        <Skeleton active paragraph={{ rows: 12 }} />
      ) : (
        <Table columns={columns} dataSource={data} rowKey='id' />
      )}
    </>
  );
}

export default Records;
