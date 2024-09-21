import { message } from 'antd';

type toastType = 'success' | 'error' | 'loading';

function useMessage() {
  const [messageApi, contextHolder] = message.useMessage();

  const toast = (message: string, type: toastType) => {
    messageApi.open({
      type: type,
      content: message,
    });
  };

  return {
    contextHolder,
    toast,
  };
}

export default useMessage;
