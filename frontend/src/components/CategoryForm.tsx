import { Modal } from 'antd';
import { Button, ColorPicker, Form, FormProps, Input, Select } from 'antd';
import { Category, CategoryDispatch, categoryForm, categoryType } from '../types/category';
import { Color } from 'antd/es/color-picker';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store';
import { addCategory, updateCategory } from '../store/actions/categoryActions';
import { useEffect } from 'react';
import { Mode } from '../types/general';

type FieldType = {
  name: string;
  type: categoryType;
  color: Color | string;
};

type CategoryForm = {
  mode: Mode;
  data: Category | null;
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
};

function CategoryForm({ mode, data, open, onCancel, onOk }: CategoryForm) {
  const [form] = Form.useForm<FieldType>();

  const dispatch = useDispatch<CategoryDispatch>();
  const { loading } = useSelector((state: AppState) => state.categories);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values: FieldType) => {
    const formData: categoryForm = {
      ...values,
      color: typeof values.color === 'string' ? values.color : values.color.toHexString(),
    };
    if (mode === 'new') {
      await dispatch(addCategory(formData));
    }

    if (mode === 'edit' && data?.id) {
      await dispatch(updateCategory(data?.id, formData));
    }

    onOk();
    form.resetFields();
  };

  useEffect(() => {
    if (data && mode === 'edit') {
      form.setFieldsValue({
        name: data.name,
        type: data.type,
        color: data.color,
      });
    }
    if (mode === 'new') {
      form.resetFields();
    }
  }, [data, form, mode]);

  return (
    <Modal
      footer={null}
      title={mode === 'new' ? 'New category' : `Update category ${data?.name}`}
      open={open}
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form labelCol={{ span: 4 }} layout='horizontal' style={{ maxWidth: 600 }} onFinish={onFinish} form={form}>
        <Form.Item<FieldType> label='Name' name='name' rules={[{ required: true, message: 'Please input  name!' }]}>
          <Input />
        </Form.Item>
        <Form.Item<FieldType> name='type' label='Select' rules={[{ required: true, message: 'Please input type!' }]}>
          <Select>
            <Select.Option value='income'>Income</Select.Option>
            <Select.Option value='expense'>Expense</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label='Color' name='color' rules={[{ required: true, message: 'Please input  color!' }]}>
          <ColorPicker />
        </Form.Item>

        <Form.Item style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <Button type='default' htmlType='button' style={{ marginRight: '10px' }} onClick={onCancel}>
            Close
          </Button>
          <Button type='primary' htmlType='submit' loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CategoryForm;
