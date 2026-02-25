const FoldersSkeleton = () => {
  return (
    <div className="h-1/5-max sk-pulse flex flex-col">
      {/* Header */}
      <div className="flex justify-between pr-4 pb-2">
        <div className="sk-line w-16 px-10" />
        <div className="sk-icon" />
      </div>

      {/* Fake folder rows */}
      <div className="flex flex-col gap-2 max-h-[240px] pr-1">
        <div className="sk-row">
          <div className="sk-icon" />
          <div className="sk-line w-28" />
        </div>
        <div className="sk-row">
          <div className="sk-icon" />
          <div className="sk-line w-20" />
        </div>
        <div className="sk-row">
          <div className="sk-icon" />
          <div className="sk-line w-24" />
        </div>
        <div className="sk-row">
          <div className="sk-icon" />
          <div className="sk-line w-16" />
        </div>
      </div>
    </div>
  );
};

export default FoldersSkeleton;
