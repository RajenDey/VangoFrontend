import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import VangoUIFile from '@/models/VangoUIFile';
import { isLoggedIn } from '@/api/auth';
import { getFile, getFileContent, saveFile } from '@/api/file';
import { getServerUrls } from '@/api/comfy';
import ComfyUIWrapper from '@/components/ComfyUIWrapper';

const File = () => {
  const router = useRouter();
  const { fileId } = router.query;

  const [file, setFile] = useState<VangoUIFile>();
  const [fileContents, setFileContents] = useState("");
  const [api_url, setApiUrl] = useState("");
  const [ws_url, setWsUrl] = useState("");

  useEffect(() => {
    const updateFile = async () => {
      setFile(await getFile(fileId as string));
    }

    const updateFileContent = async () => {
      const contents = await getFileContent(fileId as string)
      setFileContents(contents);
    }

    const updateServerUrls = async () => {
      const { api_url, ws_url } = await getServerUrls();
      setApiUrl(api_url);
      setWsUrl(ws_url);
    }

    if (fileId) {
      isLoggedIn().then((loggedIn) => {
        if (!loggedIn) {
          router.push(`/login?from=${encodeURIComponent(router.asPath)}`);
        } else {
          updateServerUrls();
          updateFile();
          updateFileContent();
        }
      });
    }
  }, [fileId]);

  const save = (workflowString: string) => {
    saveFile(fileId as string, workflowString);
  }

  return fileContents ? (
    <div>
      <ComfyUIWrapper workflow={JSON.parse(fileContents)} api_url={api_url} ws_url={ws_url}/>
    </div>
  ) : null;
};

export default File;
