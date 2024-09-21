import { Button, Form, FormProps, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store';
import { Category } from '../types/category';
import { Record, RecordDispatch, recordForm } from '../types/record';
import { useEffect } from 'react';
import { updateRecord } from '../store/actions/recordActions';

type UpdateRecordProps = {
  value: Record | undefined;
  handleCancel: () => void;
  handleOk: () => void;
};

function UpdateRecord({ value: recordValue, handleCancel, handleOk }: UpdateRecordProps) {
  const [form] = Form.useForm<recordForm>();
  const { loading } = useSelector((state: AppState) => state.records);
  const dispatch = useDispatch<RecordDispatch>();

  const { loading: categoryLoading, data: categories } = useSelector((state: AppState) => state.categories);

  const onFinish: FormProps<recordForm>['onFinish'] = async (values: recordForm) => {
    const formData: recordForm = {
      ...values,
      amount: Number(values.amount),
    };

    if (recordValue?.id) {
      await dispatch(updateRecord(recordValue?.id, formData));
      handleOk();
      form.resetFields();
    }
  };

  useEffect(() => {
    if (recordValue) {
      form.setFieldsValue({
        title: recordValue.title,
        amount: recordValue.amount,
        category_id: recordValue.category.id,
      });
    }
  }, [recordValue, form]);

  return (
    <Form form={form} labelCol={{ span: 4 }} layout='horizontal' style={{ maxWidth: 600 }} onFinish={onFinish}>
      <Form.Item label='Title' name='title' rules={[{ required: true, message: 'Please input title!' }]} hasFeedback>
        <Input value={recordValue?.title} />
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
        <Input value={recordValue?.amount} />
      </Form.Item>

      <Form.Item
        name='category_id'
        label='Category'
        hasFeedback
        rules={[{ required: true, message: 'Please select a category!' }]}
      >
        <Select placeholder='Select a category' loading={categoryLoading} value={recordValue?.category.id}>
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

export default UpdateRecord;
