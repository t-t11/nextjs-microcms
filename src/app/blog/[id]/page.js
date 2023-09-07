import Link from 'next/link';
import { client } from '../../libs/client';
import parse from 'html-react-parser';

export const dynamicParams = false;
export const revalidate = 60;

export const metadata = {
  title: 'Blog Page',
  description: 'This is a blog page',
};

export async function generateStaticParams() {
  const post = await client.get({
    endpoint: 'blog',
  });
  const { contents } = post;

  return contents.map((content) => ({
    id: content.id,
  }));
}

export default async function Page({ params }) {
  const data = await client.get({ endpoint: 'blog', contentId: params.id });

  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <section className="h-1/2 w-2/3 p-4 bg-slate-400">
        <h1 className="text-xl text-center mb-10">{data.title}</h1>
        <p className="my-6 text-xs">カテゴリー: {data.category.name}</p>
        {parse(data.body)}
        <div className="mt-16">
          <Link href="/" className="border-b hover:bg-blue-400">
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
