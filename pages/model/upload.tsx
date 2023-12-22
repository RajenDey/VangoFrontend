import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { isLoggedIn } from '@/api/auth';
import ModelUpload from '@/components/model/ModelUpload';

const Upload = () => {
  const router = useRouter();

  useEffect(() => {
    isLoggedIn().then((loggedIn) => {
      if (!loggedIn) {
          router.push(`/login?from=${encodeURIComponent(router.asPath)}`);
      }
    });
  }, []);

  return (
    <div>
      <ModelUpload />
    </div>
  );
};

export default Upload;
