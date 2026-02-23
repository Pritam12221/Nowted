import { NavLink, useLoaderData } from "react-router-dom";

const NoteList = () => {
  return (
    <div className="w-100 h-screen bg-zinc-800 flex flex-col gap-3 pt-12 px-6 text-white ">
      <h2 className="text-white text-lg pb-10 font-bold">Folder Name</h2>
      <NavLink
        to=""
        className=" w-fixed px-3 py-3 bg-primary-button flex flex-col gap-2"
      >
        <h6>dummy</h6>
        <p className="truncate text-primary">
          date Lorem ipsum dolor sit, amet consectetur adipisicing
          elitaafafafafaf aaaaaaaaaaaaaaaaaa
        </p>
      </NavLink>
    </div>
  );
};

export default NoteList;
