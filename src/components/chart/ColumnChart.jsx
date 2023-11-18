function columnChart({ optionList, data, chartName, onOptionChange }) {
  console.log(data);
  const maxCount =
    (Array.isArray(data) &&
      data.toSorted((a, b) => b.count - a.count)[0]?.count) ??
    0;
  const renderedColumn =
    Array.isArray(data) &&
    data.map((col, colIndex) => (
      <div key={colIndex} className="flex flex-col flex-1 min-w-[80px]">
        <div className="h-[2rem] w-full break-all text-center">{col.count}</div>
        {col.color === "warning" ? (
          <div className="w-full flex-1 flex flex0-col">
            <div
              className="bg-yellow-400 w-full self-end"
              style={{ height: `${Math.round((col.count / maxCount) * 100)}%` }}
            ></div>
          </div>
        ) : col.color === "danger" ? (
          <div className="w-full flex-1 flex flex0-col">
            <div
              className="bg-red-700 w-full self-end"
              style={{
                height: `${Math.round((col.count / maxCount) * 100) ?? 0}%`,
              }}
            ></div>
          </div>
        ) : col.color === "normal" ? (
          <div className="w-full flex-1 flex flex0-col">
            <div
              className="bg-green-600 w-full self-end"
              style={{ height: `${Math.round((col.count / maxCount) * 100)}%` }}
            ></div>
          </div>
        ) : (
          <div className="w-full flex-1 flex flex0-col">
            <div
              className="bg-blue-600 w-full self-end"
              style={{ height: `${Math.round((col.count / maxCount) * 100)}%` }}
            ></div>
          </div>
        )}
        <div className="h-[1.6rem] w-full break-words font-medium text-center">
          {col.label}
        </div>
      </div>
    ));

  return (
    <div className="flex flex-col gap-4 ">
      <section className="flex flex-row justify-between w-full">
        <h1 className=" text-xl font-bold truncate">{chartName}</h1>
        <select
          className="border rounded ml-4"
          onChange={(event) => {
            onOptionChange(event.target.value);
          }}
        >
          {optionList.map((option, optionIndex) => (
            <option key={optionIndex} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </section>
      <section className=" w-full min-h-[280px] flex flex-row gap-10 overflow-auto">
        {renderedColumn}
      </section>
    </div>
  );
}

export default columnChart;
