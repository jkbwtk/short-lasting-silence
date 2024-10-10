import { createContext, onMount, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';

export interface FilesystemContextState {
  ready: boolean;

  rootHandle?: FileSystemDirectoryHandle;
  totalSpace: number;
  usedSpace: number;
}

export interface FilesystemContextActions {
  listFiles: () => Promise<Map<string, FileSystemHandle>>;
  createFile: (name: string, data: FileSystemWriteChunkType) => Promise<void>;
  readFile: (name: string) => Promise<File>;
  updateFile: (name: string, data: FileSystemWriteChunkType) => Promise<void>;
  deleteFile: (name: string) => Promise<void>;

  getFileHandle: (name: string) => Promise<FileSystemFileHandle>;
}

export type FilesystemContextValue = [
  state: FilesystemContextState,
  actions: FilesystemContextActions,
];

const defaultState: FilesystemContextState = {
  ready: false,

  rootHandle: undefined,
  totalSpace: 0,
  usedSpace: 0,
};

const FilesystemContext = createContext<FilesystemContextValue>([
  structuredClone(defaultState),
  {
    listFiles: () => {
      throw new Error('FilesystemContext: listFiles() called before provider');
    },
    createFile: () => {
      throw new Error('FilesystemContext: addFile() called before provider');
    },
    readFile: () => {
      throw new Error('FilesystemContext: readFile() called before provider');
    },
    updateFile: () => {
      throw new Error('FilesystemContext: updateFile() called before provider');
    },
    deleteFile: () => {
      throw new Error('FilesystemContext: removeFile() called before provider');
    },

    getFileHandle: () => {
      throw new Error(
        'FilesystemContext: getFileHandle() called before provider',
      );
    },
  },
]);

const FilesystemProvider: ParentComponent = (props) => {
  const [state, setState] = createStore<FilesystemContextState>(
    structuredClone(FilesystemContext.defaultValue[0]),
  );

  const updateSpace = async () => {
    const { quota, usage } = await navigator.storage.estimate();

    setState({
      totalSpace: quota,
      usedSpace: usage,
    });
  };

  const getRootHandle = (): FileSystemDirectoryHandle => {
    if (!state.rootHandle) {
      throw new Error('FilesystemProvider: rootHandle not set');
    }

    return state.rootHandle;
  };

  const listFiles = async (): Promise<Map<string, FileSystemHandle>> => {
    const files = new Map<string, FileSystemHandle>();

    const directoryHandle = getRootHandle();

    for await (const [name, test] of directoryHandle) {
      files.set(name, test);
    }

    return files;
  };

  const createFile = async (
    name: string,
    data: FileSystemWriteChunkType,
  ): Promise<void> => {
    const fileHandle = await getRootHandle().getFileHandle(name, {
      create: true,
    });

    const writable = await fileHandle.createWritable();
    await writable.write(data);
    await writable.close();

    await updateSpace();
  };

  const readFile = async (name: string): Promise<File> => {
    const fileHandle = await getRootHandle().getFileHandle(name);

    return await fileHandle.getFile();
  };

  const updateFile = async (
    name: string,
    data: FileSystemWriteChunkType,
  ): Promise<void> => {
    const fileHandle = await getRootHandle().getFileHandle(name, {
      create: false,
    });

    const writable = await fileHandle.createWritable();
    await writable.write(data);
    await writable.close();

    await updateSpace();
  };

  const deleteFile = async (name: string): Promise<void> => {
    await getRootHandle().removeEntry(name);

    await updateSpace();
  };

  const getFileHandle = async (name: string): Promise<FileSystemFileHandle> => {
    return await getRootHandle().getFileHandle(name);
  };

  onMount(async () => {
    const rootHandle = await navigator.storage.getDirectory();
    const { quota, usage } = await navigator.storage.estimate();

    setState({
      ready: true,
      rootHandle,
      totalSpace: quota,
      usedSpace: usage,
    });
  });

  return (
    <FilesystemContext.Provider
      value={[
        state,
        {
          listFiles,
          createFile,
          readFile,
          updateFile,
          deleteFile,
          getFileHandle,
        },
      ]}
    >
      {props.children}
    </FilesystemContext.Provider>
  );
};

export default FilesystemProvider;

export const useFilesystem = () => useContext(FilesystemContext);
