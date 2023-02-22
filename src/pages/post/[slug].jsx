import { createClient } from "@sanity/client";

export default function PostAll({ slug, post }) {
  console.log(post);
  return (
    <div>
      <h1>Post : {slug}</h1>
    </div>
  );
}

export async function getStaticPaths() {
  const client = createClient({
    projectId: "n9hizezu",
    dataset: "production",
    useCdn: process.env.NODE_ENV === "production",
  });

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
  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));
  return {
    paths,
    fallback: false, //paths에 없는 경로일경우, 404페이지가 나타난다.
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const client = createClient({
    projectId: "n9hizezu",
    dataset: "production",
    useCdn: process.env.NODE_ENV === "production",
  });

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
  const post = posts.find((p) => p.slug === slug);
  return {
    props: {
      slug,
      post,
    },
  };
}
