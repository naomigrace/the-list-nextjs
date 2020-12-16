import Link from "next/link";
import { CategoryTag, CompletedTag, PendingTag } from "./tags";

export default function Action(action) {
  return (
    <tr>
      <td />
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{action.title}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{action.location}</div>
        <div className="text-sm text-gray-500">{action.neighborhood.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {action.categories.map((category) => (
          <CategoryTag>{category.title}</CategoryTag>
        ))}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {action.completed ? <CompletedTag /> : <PendingTag />}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {action.date}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Link as={`/actions/${action.slug}`} href="/actions/[slug]">
          <a className="text-indigo-600 hover:text-indigo-900">View</a>
        </Link>
      </td>
    </tr>
  );
}
