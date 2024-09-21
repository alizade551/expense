import { Button, Form, FormProps, Input, Modal, Select } from 'antd';
import { Category } from '../types/category';
import { useDispatch, useSelector } from 'react-redux';
import { Record, RecordDispatch, recordForm } from '../types/record';
import { AppState } from '../store';
import { addRecord, updateRecord } from '../store/actions/recordActions';
import { useEffect } from 'react';
import { Mode } from '../types/general';

type RecordForm = {
  mode: Mode;
  data: Record | null;
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
};

function RecordForm({ mode, data, open, onCancel, onOk }: RecordForm) {
  const [form] = Form.useForm<recordForm>();

  const dispatch = useDispatch<RecordDispatch>();
  const { loading: categoryLoading, data: categories } = useSelector((state: AppState) => state.categories);
  const { loading } = useSelector((state: AppState) => state.records);

  const onFinish: FormProps<recordForm>['onFinish'] = async (values: recordForm) => {
    const formData: recordForm = {
      ...values,
      amount: Number(values.amount),
    };

    try {
      if (mode === 'new') {
        await dispatch(addRecord(formData));
      }

      if (mode === 'new' && data?.id) {
        await dispatch(updateRecord(data?.id, formData));
      }

      onOk();
      form.resetFields();
    } catch (error) {
      console.error('Failed to add record:', error);
    }
  };

  useEffect(() => {
    if (data && mode === 'edit') {
      form.setFieldsValue({
        title: data.title,
        amount: data.amount,
        category_id: data.category.id,
      });
    }

    if (mode == 'new') {
      form.resetFields();
    }
  }, [data, form, mode]);

  return (
    <Modal
      title={mode === 'new' ? `Create a new record` : `Update ${data?.title} record`}
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <Form labelCol={{ span: 4 }} layout='horizontal' style={{ maxWidth: 600 }} onFinish={onFinish} form={form}>
        <Form.Item label='Title' name='title' rules={[{ required: true, message: 'Please input title!' }]} hasFeedback>
          <Input />
        </Form.Item>

        <Form.Item
          label='Amount'
          name='amount'
          rules={[
            {
              required: true,
              message: 'Please input amount!',
              pattern: new RegExp(/^\d+(\.\d{1,2})?$/),
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='category_id'
          label='Category'
          hasFeedback
          rules={[{ required: true, message: 'Please select a category!' }]}
        >
          <Select placeholder='Select a category' loading={categoryLoading}>
            {categories.map((category: Category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type='default' style={{ marginRight: '10px' }} onClick={onCancel}>
            Cancel
          </Button>
          <Button type='primary' htmlType='submit' loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default RecordForm;
