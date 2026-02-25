const NoteContentSkeleton = () => {
  return (
    <div className="w-full min-w-0 overflow-hidden px-10 py-10 text-white h-screen sk-pulse">
      {/* Title + button */}
      <div className="flex justify-between items-start mb-8">
        <div className="sk-block h-10 w-2/3 rounded-lg" />
        <div className="sk-block h-9 w-9 rounded-full" />
      </div>

      {/* Date and folder */}
      <div className="flex flex-col gap-4 mb-8 border-b border-zinc-700 pb-8">
        <div className="flex items-center gap-6">
          <div className="sk-line w-24" />
        </div>
        <div className="flex items-center gap-6">
          <div className="sk-line w-24" />
        </div>
      </div>

      {/* Content lines */}
      <div className="flex flex-col gap-3">
        <div className="sk-line-full" />
        <div className="sk-line-full" />
        <div className="sk-line-full" />
        <div className="sk-line-full" />
      </div>
    </div>
  );
};

export default NoteContentSkeleton;
