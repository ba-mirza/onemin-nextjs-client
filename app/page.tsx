import NewsCard from "@/components/NewsCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { navigations } from "@/constants";
import Image from "next/image";
import { Fragment } from "react";

export default function Home() {
  const news = [
    {
      title: "Big H1 Text",
      description:
        "Мәжіліс депутаты Нартай Аралбайұлы жаңа қызметке тағайындалды",
      date: "27.08.2025",
      views: 5900,
    },
    {
      title: "H2 Text",
      description:
        "Мәжіліс депутаты Нартай Аралбайұлы жаңа қызметке тағайындалды",
      date: "27.08.2025",
      views: 5900,
    },
    {
      title: "H2 Text",
      description:
        "Мәжіліс депутаты Нартай Аралбайұлы жаңа қызметке тағайындалды",
      date: "27.08.2025",
      views: 5900,
    },
    {
      title: "Politics",
      description:
        "Мәжіліс депутаты Нартай Аралбайұлы жаңа қызметке тағайындалды",
      date: "27.08.2025",
      views: 5900,
    },
    {
      title: "World",
      description:
        "Мәжіліс депутаты Нартай Аралбайұлы жаңа қызметке тағайындалды",
      date: "27.08.2025",
      views: 5900,
    },
    {
      title: "Religion",
      description:
        "Мәжіліс депутаты Нартай Аралбайұлы жаңа қызметке тағайындалды",
      date: "27.08.2025",
      views: 5900,
    },
    {
      title: "Interview",
      description:
        "Мәжіліс депутаты Нартай Аралбайұлы жаңа қызметке тағайындалды",
      date: "27.08.2025",
      views: 5900,
    },
    {
      title: "Analytics",
      description:
        "Мәжіліс депутаты Нартай Аралбайұлы жаңа қызметке тағайындалды",
      date: "27.08.2025",
      views: 5900,
    },
  ];

  const tags = Array.from({ length: 10 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`,
  );

  return (
    <>
      <section className="flex justify-between h-[665px] gap-6">
        <div className="flex flex-col gap-4 w-3/5">
          <div className="bg-[#E5E7EB] w-auto h-[350px] border border-gray-500 rounded-lg">
            <h1>text</h1>
          </div>
          <div className="flex items-center justify-between gap-4">
            {news.slice(0, 2).map((item, index) => (
              <div
                className="w-auto h-[300px] bg-[#E5E7EB] border border-gray-500 rounded-lg"
                key={index}
              >
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        <ScrollArea className="h-auto w-[433px] rounded-md border">
          <div className="p-3">
            <h4 className="mb-3 text-lg leading-none font-medium">
              Последние новости
            </h4>
            {tags.map((tag) => (
              <Fragment key={tag}>
                <div className="flex items-center gap-4 text-lg">
                  <Image
                    className="rounded-lg m-2"
                    src="placehd.svg"
                    alt="placehd"
                    width={90}
                    height={90}
                    loading="lazy"
                  />
                  <div>{tag}</div>
                </div>
                <Separator className="my-2" />
              </Fragment>
            ))}
          </div>
        </ScrollArea>
      </section>

      {navigations.map((nav, idx) => (
        <section key={idx} className="mb-10">
          <h2 className="text-2xl font-bold mb-6">{nav.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {news
              .slice(3, 7)
              .map(({ title, description, date, views }, index) => (
                <NewsCard
                  key={`${idx}-${index}`}
                  title={title}
                  description={description}
                  date={date}
                  views={views}
                />
              ))}
          </div>
        </section>
      ))}
    </>
  );
}
