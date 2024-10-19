import { useFilesystem } from '#providers/FilesystemProvider';
import { onMount } from 'solid-js';

const FileTest: Component = () => {
  const [state] = useFilesystem();

  onMount(() => {
    console.log('Filesystem state:', state);
  });

  return (
    <div>
      FILE TEST
      <div>FILESYSTEM STATE: {state.ready.toString()}</div>
    </div>
  );
};

export default FileTest;
