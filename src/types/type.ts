// export type unknown = {
//   folderId: string;
//   title: string;
//   content: string;
//   isFavorite: boolean;
//   isArchived: boolean;
// };

export type MainStruct = {
  id: string;
  folderId: string | null;
  title: string;
  content: string | null;
  name: string;
  isFavorite: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  preview: string;
};

export type FolderStruct = Pick<
  MainStruct,
  "id" | "name" | "createdAt" | "updatedAt" | "deletedAt"
>;

export type Notes = Pick<
  MainStruct,
  | "id"
  | "folderId"
  | "title"
  | "isFavorite"
  | "isArchived"
  | "createdAt"
  | "updatedAt"
  | "deletedAt"
  | "preview"
> & { folder: FolderStruct | null };

export type NoteDetail = Pick<MainStruct, "content"> & Notes;

// ---- API Response Types ----
export type GetNotesType = {
  notes: Notes[];
};

export type GetRecentType = {
  recentNotes: Notes[];
};

export type GetNoteContentType = {
  note: NoteDetail;
};

export type GetFoldersResponseType = {
  folders: FolderStruct[];
};

export type CreateNoteResponse = {
  id: string;
};

export type RenameProps = {
  folder: FolderStruct;
  onDelete: (id: string) => void;
  rename: (id: string, name: string) => void;
};

export type RestoreProps = {
  noteId: string;
  noteTitle: string;
  removeNote: (id: string) => void;
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
  fetchRecent: () => Promise<void>;
  recent: Notes[];
  dropdownRefresh: () => void;
  dropdownFetch: boolean;
};

export type fetchRecentType = {
  fetchRecent: () => void;
};
