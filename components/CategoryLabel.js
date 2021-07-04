import Link from 'next/link';

export default function CategoryLabel({ children }) {
  const colorKey = {
    JavaScript: 'yellow',
    CSS: 'blue',
    Python: 'green',
    PHP: 'purple',
    Ruby: 'red',
  };

  const bgColor = `bg-${colorKey[children]}-600`;

  return (
    <div className={`px-2 py-1 ${bgColor} text-gray-100 font-bold rounded`}>
      <Link href={`/blog/category/${children.toLowerCase()}`}>
        <a>{children}</a>
      </Link>
    </div>
  );
}
