import { Button, Form, FormProps, Input, Select } from 'antd';
import { Category } from '../types/category';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '../store';
import { RecordDispatch, recordForm } from '../types/record';
import { addRecord } from '../store/actions/recordActions';

type CreateRecordProps = {
  handleCancel: () => void;
  handleOk: () => void;
};

function CreateRecord({ handleCancel, handleOk }: CreateRecordProps) {
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
      await dispatch(addRecord(formData));
      handleOk();
      form.resetFields();
    } catch (error) {
      console.error('Failed to add record:', error);
    }
  };

  return (
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
        <Button type='default' style={{ marginRight: '10px' }} onClick={handleCancel}>
          Cancel
        </Button>
        <Button type='primary' htmlType='submit' loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default CreateRecord;
