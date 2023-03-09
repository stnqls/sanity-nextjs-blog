import { Card, Col, Row } from "antd";
import dayjs from "dayjs";
import Link from "next/link";

export default function BlogList({ posts }) {
  return (
    <>
      <Row align="middle" style={{ height: 100 }}>
        <Col span={24}>
          <h1 style={{ fontSize: 30, fontWeight: "bold" }}> Latest Posts</h1>
        </Col>
      </Row>
      <Row gutter={16} align="top" style={{ height: "auto" }}>
        {posts.map((post, index) => {
          return (
            <Col span={6} key={`post-${index}`}>
              <Link href={`/post/${post.slug}`}>
                <Card
                  style={{
                    width: "100%",
                    border: "none",
                    marginBottom: 30,
                  }}
                  cover={
                    <img
                      alt={post.thumbnail.alt}
                      src={post.thumbnail.imageUrl}
                      style={{
                        height: "250px",
                        borderRadius: "8px",
                      }}
                    />
                  }
                >
                  <h3 style={{ margin: 0 }}>{post.title}</h3>
                  <h4 style={{ color: "#333" }}>
                    {post.author.name} (
                    {dayjs(post.createdAp).format("MMMM D YYYY")})
                  </h4>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </>
  );
}
