export function CompletedTag() {
  return (
    <span className="px-2 py-1 inline-flex text-xs leading-tight font-semibold rounded-lg bg-green-100 text-green-800">
      Completed
    </span>
  );
}

export function PendingTag() {
  return (
    <span className="px-2 py-1 inline-flex text-xs leading-tight font-semibold rounded-lg bg-gray-100 text-gray-800">
      To-do
    </span>
  );
}

export function CategoryTag(props) {
  return (
    <span
      className="px-2 py-1 inline-flex text-xs leading-tight font-semibold rounded-lg bg-gray-800 text-white mr-1"
      {...props}
    />
  );
}

export function BlankTagToUtilizeColors(props) {
  return (
    <span
      className="blue-600 green-500 yellow-500 pink-500 red-500"
      {...props}
    />
  );
}
