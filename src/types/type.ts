// export type unknown = {
//   folderId: string;
//   title: string;
//   content: string;
//   isFavorite: boolean;
//   isArchived: boolean;
// };

export type Notes = {
  id: string;
  folderId: string;
  title: string;
  isFavorite: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  preview: string;
  folder: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
  };
};

export type FolderStruct = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type RenameProps = {
  folder: FolderStruct;
  onDelete: (id: string) => void;
  rename: (id: string, name: string) => void;
};

export type RestoreProps = {
  noteId: string;
  noteTitle: string;
};

export type NoteListProps = {
  notes: Notes[];
};
export type NotesContextStruct = {
  notes: Notes[];
  removeNote: (id: string) => void;
  updateNoteList: (id: string, updates: Partial<Notes>) => void;
};

export type GlobalContextType = {
  noteList: Notes | null;
  setNoteList: (note: Notes | null) => void;
};

export type toggleThemeType = {
  dark: boolean;
  toggleTheme: () => void;
};
