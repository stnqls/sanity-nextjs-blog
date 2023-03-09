import SanityService from "@/services/SanityService";
import Header from "../components/Header";
import BlogHeadline from "../components/BlogHeadline";
import BlogMainPost from "../components/BlogMainPost";
import BlogList from "../components/BlogList";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.css";

export default function Home({ home, posts }) {
  const mainPost = posts.find((p) => p.slug === home.mainPostUrl);
  const otherPosts = posts.filter((p) => p.slug !== home.mainPostUrl);

  return (
    <div className={styles.container}>
      <Header />
      <BlogHeadline />
      <BlogMainPost {...mainPost} />
      <BlogList posts={otherPosts} />
      <Footer />
    </div>
  );
}

// sanity로부터 데이터 가져오기
export async function getStaticProps() {
  const sanityService = new SanityService();
  const home = await sanityService.getHome();
  const posts = await sanityService.getPosts();

  return {
    props: {
      home,
      posts,
    },
  };
}
