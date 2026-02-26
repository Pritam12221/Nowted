export const RecentLoader = () => {
  return (
    <div className="h-1/5 w-full pt-5 sk-pulse">
      {/* Header */}
      <div className="sk-line w-16 mb-3 mx-10" />

      {/* Fake recent note rows */}
      <div className="flex flex-col gap-2">
        <div className="sk-row">
          <div className="sk-icon" />
          <div className="sk-line w-32" />
        </div>
        <div className="sk-row">
          <div className="sk-icon" />
          <div className="sk-line w-24" />
        </div>
        <div className="sk-row">
          <div className="sk-icon" />
          <div className="sk-line w-28" />
        </div>
      </div>
    </div>
  );
};

export default RecentLoader;
