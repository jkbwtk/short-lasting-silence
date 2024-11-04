import FileSizeWithUnit from '#components/FileSizeWithUnit';
import { useFilesystem } from '#providers/FilesystemProvider';
import style from '#styles/FreeSpaceGauge.module.scss';

const FreeSpaceGauge: Component = () => {
  const [state] = useFilesystem();

  return (
    <div class={style.container}>
      <div>
        <span>Used space: </span>
        <FileSizeWithUnit size={state.usedSpace} />

        <span> / </span>

        <FileSizeWithUnit size={state.totalSpace} />
      </div>
    </div>
  );
};

export default FreeSpaceGauge;
