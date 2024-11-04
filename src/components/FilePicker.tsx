import { type Setter, mergeProps } from 'solid-js';
import type { RequiredDefaults } from '#lib/utils';
import style from '#styles/FilePicker.module.scss';

import Divider from '#components/Divider';
import MaterialSymbol from '#components/MaterialSymbol';
import Widget from '#components/Widget';

export type FilePickerProps = {
  accept?: string;
  setFile: Setter<File | undefined>;
  class?: string;
};

const defaultProps: RequiredDefaults<FilePickerProps> = {
  accept: '*/*',
  class: '',
};

const FilePicker: Component<FilePickerProps> = (unmergedProps) => {
  const props = mergeProps(defaultProps, unmergedProps);

  function handleFileChange(event: Event) {
    if (event.target instanceof HTMLInputElement && event.target.files) {
      props.setFile(event.target.files[0]);
    }
  }

  function handleFileDrop(event: DragEvent) {
    console.log(event);
    event.preventDefault();

    props.setFile(event.dataTransfer?.files[0]);
  }

  return (
    <Widget
      title="File Picker"
      component="label"
      onDrop={handleFileDrop}
      classList={{
        [style.container]: true,
        [props.class]: true,
      }}
    >
      <input
        class={style.input}
        onChange={handleFileChange}
        type="file"
        accept={props.accept}
      />

      <div class={style.label}>
        <span>Drop file here or click </span>
        <MaterialSymbol symbol="cloud_upload" size="medium" />

        <Divider />
      </div>
    </Widget>
  );
};

export default FilePicker;
