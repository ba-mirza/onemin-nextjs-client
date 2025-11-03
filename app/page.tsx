import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getAllArticles } from "@/lib/supabase/actions/article.action";
import Link from "next/link";
import { Fragment } from "react";

export default async function Home() {
  const result = await getAllArticles();

  if (result.status !== "success") {
    return (
      <div>
        Ошибка загрузки статей: <br />
        {JSON.stringify(result)}
      </div>
    );
  }

  const articles = result.data;

  const tags = Array.from({ length: 10 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`,
  );

  return (
    <>
      <section className="flex justify-between h-[665px] gap-6">
        <div className="flex flex-col gap-4 w-3/5">
          <div className="bg-[#E5E7EB] w-auto h-[350px] border border-gray-500 rounded-lg p-4">
            <h1>{articles[0].title}</h1>
          </div>
          <div className="flex items-center justify-between gap-4">
            {articles.slice(1, 3).map((item, index) => (
              <Link
                className="select-none"
                href={`/${item.category.slug}/${item.slug}`}
                key={item.id}
              >
                <div
                  className="flex w-auto h-[300px] border border-gray-500 rounded-lg p-4 hover:border-purple-700"
                  key={index}
                >
                  <h2>{item.title}</h2>
                  <p>{item.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <ScrollArea className="h-auto w-[433px] rounded-md border">
          <div className="p-4">
            <h4 className="mb-4 text-lg leading-none font-medium">
              Последние новости
            </h4>
            {articles.map((article) => (
              <Fragment key={article.id}>
                <div className="flex items-center gap-4 text-lg">
                  <Link
                    className="underline hover:text-purple-700"
                    href={`/${article.category.slug}/${article.slug}`}
                  >
                    {article.title}
                  </Link>
                </div>
                <Separator className="my-2" />
              </Fragment>
            ))}
          </div>
        </ScrollArea>
      </section>
    </>
  );
}
