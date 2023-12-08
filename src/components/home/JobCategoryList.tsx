export default function JobCategoryList() {
  const jobTypeList = [
    {
      jobType: 'Perbaikan Rumah',
      bgColor: 'bg-orange-200',
    },
    {
      jobType: 'Perkebunan',
      bgColor: 'bg-rose-200',
    },
    {
      jobType: 'Kerajinan Tangan',
      bgColor: 'bg-green-200',
    },
    {
      jobType: 'Pembantu Rumah Tangga',
      bgColor: 'bg-sky-200',
    },
    {
      jobType: '...dan masih banyak lagi',
      bgColor: 'bg-violet-200',
    },
  ];

  return (
    <section className="w-full px-3 py-5 pb-16 flex items-center justify-center gap-5">
      <div className="w-full max-w-5xl flex flex-col justify-center gap-5">
        <h2 className="text-2xl">Berbagai Pilihan Jasa</h2>
        <div className="w-full flex items-center justify-center">
          <div className="h-64 w-full max-w-4xl flex flex-wrap flex-col gap-3 overflow-x-auto sm:h-auto sm:flex-row sm:items-start sm:justify-center">
            {jobTypeList.map((job, i) => (
              <div
                key={job.jobType + i}
                className={`relative w-72 h-28 flex flex-col justify-center gap-2 rounded-md p-3 ${job.bgColor}`}
              >
                <span className="text-lg font-medium">{job.jobType}</span>
                <div className="absolute right-0 w-20 h-28 rounded-l-full bg-black opacity-10"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
