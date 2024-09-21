import { useEffect } from 'react';
import useMessage from '../hooks/useError';

type LoadingSuspenseProps = { message: string };

function LoadingSuspense({ message }: LoadingSuspenseProps) {
  const { contextHolder, toast } = useMessage();

  useEffect(() => {
    toast(message, 'loading');
  }, [toast, message]);

  return <>{contextHolder}</>;
}

export default LoadingSuspense;
