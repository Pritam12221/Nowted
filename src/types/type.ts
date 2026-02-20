export type Struct = {
  folderId: string;
  title: string;
  content: string;
  isFavorite: boolean;
  isArchived: boolean;
};

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
