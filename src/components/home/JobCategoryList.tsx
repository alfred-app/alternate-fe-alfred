export default function JobCategoryList() {
  return (
    <section className="w-full px-3 py-5 flex items-center justify-center gap-5">
      <div className="w-full max-w-5xl flex flex-col justify-center gap-5">
        <h2 className="text-2xl">Berbagai Pilihan Jasa</h2>
        <div className="w-full flex items-center justify-center">
          <div className="h-64 w-full max-w-2xl flex flex-wrap flex-col gap-3 overflow-x-auto sm:h-auto sm:flex-row sm:items-start sm:justify-center">
            <div className="w-52 h-28 rounded-md bg-slate-600"></div>
            <div className="w-52 h-28 rounded-md bg-slate-600"></div>
            <div className="w-52 h-28 rounded-md bg-slate-600"></div>
            <div className="w-52 h-28 rounded-md bg-slate-600"></div>
            <div className="w-52 h-28 rounded-md bg-slate-600"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
