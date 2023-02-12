import { HeadComponent } from "@/components/HeadComponent";
import { getPostsData } from "@/../lib/notion.js";

// SSG の場合
export async function getStaticProps() {
  const allPostsData = await getPostsData();

  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <>
      <HeadComponent>Create Next App</HeadComponent>
      {allPostsData.notionData.map(
        ({ id, created_time, date, title, content }) => (
          <div key={id}>
            <p>{id}</p>
            <p>{created_time}</p>
            <p>{date}</p>
            <p>{title}</p>
            <p>{content}</p>
          </div>
        )
      )}
    </>
  );
}
