import {
  Archive,
  AlertTriangle,
  CalendarDays,
  Ellipsis,
  Folder,
  Star,
  Trash2,
  History,
} from "lucide-react";
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
  useOutletContext,
} from "react-router-dom";
import { format } from "date-fns";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  changeArchive,
  changeFavorite,
  deleteNote,
  restoreNote,
  updateNote,
} from "../../../services/MoreApi";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import NoteContentSkeleton from "../../SkeletonsLoaders/NoteContentLoader";
import type { NotesContextStruct } from "../../../types/type";

const NoteContent = () => {
  const location = useLocation();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const note = useLoaderData();
  const { removeNote, updateNoteList } = useOutletContext<NotesContextStruct>();
  const newDate = format(new Date(note.createdAt), "dd/MM/yyyy");
  const [more, setMore] = useState(false);
  const [fav, setFav] = useState(note.isFavorite);
  const [archive, setArchive] = useState(note.isArchived);
  const [isDeleted, setIsDeleted] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content ?? "");
  const rollBack = useNavigate();
  const titleFocus = useRef<HTMLInputElement>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const trash = isDeleted || note.deletedAt;
  const readOnly = trash || archive;

  //mount with this default values
  useEffect(() => {
    setTitle(note.title);
    setContent(note.content ?? "");
    setFav(note.isFavorite);
    setArchive(note.isArchived);
    setIsDeleted(false);
  }, [note.id]);

  useEffect(() => {
    if (note.title === "Untitled" && titleFocus.current) {
      titleFocus.current.focus();
    }
  }, [note.id]);

  const debouncedSave = useCallback(
    (data: { title?: string; content?: string }) => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      debounceTimer.current = setTimeout(async () => {
        try {
          await updateNote(note.id, data);
        } catch (err) {
          if (err instanceof AxiosError) {
            toast.error(err.response?.data?.message, {
              icon: <AlertTriangle size={16} />,
            });
          }
        }
      }, 500);
    },
    [note.id],
  );

  useEffect(() => {
    //
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    updateNoteList(note.id, { title: newTitle });
    debouncedSave({ title: newTitle });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    updateNoteList(note.id, { preview: newContent });
    debouncedSave({ content: newContent });
  };

  const handleArchive = async () => {
    try {
      const res = await changeArchive(note.id, note.isArchived);
      toast.success(res.data, { icon: <Archive size={16} /> });
      setArchive(!archive);
      setMore(false);
      removeNote(note.id);
      const checkPath = location.pathname.split("/notes")[0];
      rollBack(checkPath === "" ? "/" : checkPath);
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message, {
          icon: <AlertTriangle size={16} />,
        });
      }
    }
  };

  const handleFavorite = async () => {
    try {
      const res = await changeFavorite(note.id, note.isFavorite);
      toast.success(res.data, { icon: <Star size={16} /> });
      setFav(!fav);
      setMore(false);
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message, {
          icon: <AlertTriangle size={16} />,
        });
      }
    }
  };

  const handleDelete = async () => {
    try {
      const res = await deleteNote(note.id);
      toast.success(res.data, { icon: <Trash2 size={16} /> });
      setMore(false);
      setIsDeleted(true);
      removeNote(note.id);
      const checkPath = location.pathname.split("/notes")[0];
      rollBack(checkPath === "" ? "/" : checkPath);
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message, {
          icon: <AlertTriangle size={16} />,
        });
      }
    }
  };

  const handleRestore = async () => {
    try {
      const res = await restoreNote(note.id);
      toast.success(res.data, { icon: <History size={16} /> });
      setIsDeleted(false);
      setMore(false);
      removeNote(note.id);

      const checkPath = location.pathname.split("/notes")[0];
      rollBack(checkPath);
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message, {
          icon: <AlertTriangle size={16} />,
        });
      }
    }
  };

  if (isLoading) return <NoteContentSkeleton />;

  return (
    <div className="w-full overflow-hidden px-10 py-10 text-white h-screen flex flex-col">
      <div className="flex justify-between items-start mb-8">
        <input
          ref={titleFocus}
          type="text"
          value={title}
          onChange={handleTitleChange}
          readOnly={readOnly}
          className="text-4xl font-bold bg-transparent outline-none border-none w-full mr-4 truncate"
          placeholder="Untitled"
        />

        <div className="relative">
          <button
            onClick={() => setMore((prev) => !prev)}
            className="p-2 rounded-full border border-zinc-600 text-zinc-400 hover:text-white hover:border-zinc-400 transition-all cursor-pointer "
          >
            <Ellipsis size={18} />
          </button>

          {more && (
            <>
              <div //overlay
                className="fixed inset-0 z-10"
                onClick={() => setMore(false)}
              />

              <div className="flex flex-col items-center justify-center  absolute right-0 mt-2 w-52 bg-zinc-800 border border-zinc-700 rounded-xl shadow-xl z-20 overflow-hidden  text-lg">
                {trash ? (
                  <button
                    onClick={() => {
                      handleRestore();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3  text-zinc-200 hover:bg-zinc-700 transition-colors"
                  >
                    <History size={18} className="text-zinc-400" />
                    Restore
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        handleFavorite();
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3  text-zinc-200 hover:bg-zinc-700 transition-colors ${archive ? "none" : "block"}`}
                    >
                      <Star size={18} className="text-zinc-400" />
                      {fav === true ? "Unfav" : "Fav"}
                    </button>

                    <button
                      onClick={() => {
                        handleArchive();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3  text-zinc-200 hover:bg-zinc-700 transition-colors"
                    >
                      <Archive size={18} className="text-zinc-400" />
                      {archive !== true ? "Archive" : "UnArchive"}
                    </button>

                    <button
                      onClick={() => {
                        handleDelete();
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3  text-zinc-200  hover:text-red-400 ${archive ? "none" : "block"}`}
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 mb-8 border-b border-zinc-700 pb-8">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 text-zinc-500 w-28">
            <CalendarDays size={16} />
            <h2 className="text-sm">Date</h2>
          </div>
          <h2 className="text-sm text-zinc-300 underline underline-offset-2">
            {newDate}
          </h2>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 text-zinc-500 w-28">
            <Folder size={16} />
            <h2 className="text-sm">Folder</h2>
          </div>
          <h2 className="text-sm text-zinc-300 underline underline-offset-2">
            {note.folder?.name}
          </h2>
        </div>
      </div>

      <textarea
        value={content}
        onChange={handleContentChange}
        readOnly={readOnly}
        className="text-zinc-200 text-sm leading-7 bg-transparent outline-none border-none resize-none flex-1 w-full"
        placeholder="start from here"
      />
    </div>
  );
};

export default NoteContent;
