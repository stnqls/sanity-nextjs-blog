import SanityService from "@/services/SanityService";
import styles from "../../styles/Home.module.css";
import Header from "@/components/Header";
import BlogMainPost from "@/components/BlogMainPost";
import BlogPostDetail from "@/components/BlogPostDetail";
import Footer from "@/components/Footer";

export default function PostAll({ slug, post }) {
  return (
    <div className={styles.container}>
      <Header />
      <BlogMainPost {...post} />
      <BlogPostDetail blocks={post.content} />
      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const posts = await new SanityService().getPosts();

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
  const posts = await new SanityService().getPosts();
  const post = posts.find((p) => p.slug === slug);

  return {
    props: {
      slug,
      post,
    },
  };
}
