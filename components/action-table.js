import Action from "./action";

export default function ActionTable({ actions }) {
  return (
    <div className="overflow-x-auto">
      <table className="table-fixed max-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              // scope="col""
              className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Year
            </th>
            <th
              // scope="col""
              className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Title
            </th>
            <th
              // scope="col""
              className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Location
            </th>
            <th
              // scope="col""
              className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Categories
            </th>
            <th
              // scope="col""
              className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              // scope="col""
              className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date Planned / Completed
            </th>
            <th // scope="col""
              className="w-1/6 px-6 py-3"
            >
              <span className="sr-only">View</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {actions && actions.map((action) => <Action {...action} />)}
        </tbody>
      </table>
    </div>
  );
}
