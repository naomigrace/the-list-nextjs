import Link from "next/link";
import { CategoryTag, CompletedTag, PendingTag } from "./tags";

export default function Action({ action, category = "restaurants-and-books" }) {
  return (
    <Link as={`/actions/${action.slug}`} href="/actions/[slug]">
      <tr key={action.title} className="cursor-pointer hover:bg-gray-100">
        {category === "movies" ||
          (category === "books" && action.year && (
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{action.year}</div>
            </td>
          ))}
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{action.title}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{action.location}</div>
          <div className="text-sm text-gray-500">
            {action.neighborhood.name}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {action.categories.map((category) => (
            <CategoryTag key={category.title}>{category.title}</CategoryTag>
          ))}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {action.completed ? <CompletedTag /> : <PendingTag />}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {action.date}
        </td>
      </tr>
    </Link>
  );
}
