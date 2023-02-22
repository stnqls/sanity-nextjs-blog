import SanityService from "@/services/SanityService";

export default function Home({ home, posts }) {
  return (
    <div>
      <h1>Home</h1>
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
