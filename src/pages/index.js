import { createClient } from "@sanity/client";

export default function Home({ home, posts }) {
  console.log(home);
  console.log(posts);
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

// sanity로부터 데이터 가져오기
export async function getStaticProps() {
  const client = createClient({
    projectId: "n9hizezu",
    dataset: "production",
    useCdn: process.env.NODE_ENV === "production",
  });

  const home = await client.fetch(
    `*[_type == 'home'][0]{'mainPostUrl': mainPost -> slug.current}`
  );

  const posts = await client.fetch(`
  *[_type == 'post']{
  title,
  subtitle,
  createdAt,
  'content':content[]{
  ...,
  ...select(_type == 'imageGallery'->{'images':images[]{...,'url':asset ->url}})
  },
  'slug':slug.current,
  'thumbnail': {
    'alt': thumbnail.alt,
    'imageUrl': thumbnail.asset -> url
  },
  'author': author -> {
    name,
    role,
    'image': image.asset -> url
  },
    'tag': tag -> {
    title,
    'slug': slug.current
    }
}

  `);

  return {
    props: {
      home,
      posts,
    },
  };
}
