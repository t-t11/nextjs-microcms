import Link from 'next/link';
import { client } from './libs/client';

export const revalidate = 60;

export default async function Home() {
  const data = await client.get({
    endpoint: 'blog',
  });
  const { contents } = data;

  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl mb-4">My Blog</h1>
      <div className="bg-slate-400 h-1/2 w-1/2 p-4 text-center">
        <ul>
          {contents.map((content) => (
            <li key={content.id} className="list-inside list-disc mb-2">
              <Link
                href={`/blog/${content.id}`}
                className="border-b hover:bg-blue-400"
              >
                {content.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-xs">
        Using Next.js, microCMS, & TailwindCSS. Delpoyed by Vercel. © Tai Sou
        2023
      </p>
    </main>
  );
}
