const NoteListSkeleton = () => {
  return (
    <div className="w-120 shrink-0 h-screen bg-zinc-800 flex flex-col gap-3 pt-12 px-6 text-white sk-pulse">
      {/* Folder title */}
      <div className="sk-block h-6 w-32 rounded mb-7" />

      <div className="flex flex-col gap-2 px-3 py-3 rounded-lg bg-zinc-700/40">
        <div className="sk-block h-5 w-3/4 rounded" />
        <div className="sk-block h-3 w-24 rounded" />
        <div className="sk-line-full h-3" />
      </div>
    </div>
  );
};

export default NoteListSkeleton;
