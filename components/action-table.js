import Action from "./action";

export default function ActionTable({
  actions,
  category = "restaurants-and-bars",
}) {
  return (
    <div className="overflow-x-auto">
      <table className="table-fixed max-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {category === "movies" ||
              (category === "books" && (
                <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Year
                </th>
              ))}
            <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Categories
            </th>
            <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date Planned / Completed
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {actions &&
            actions.map((action) => (
              <Action action={action} category={category} />
            ))}
        </tbody>
      </table>
    </div>
  );
}
