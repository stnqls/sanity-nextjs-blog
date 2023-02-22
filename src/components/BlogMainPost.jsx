import { Card, Col, Row } from "antd";
import Link from "next/link";
import dayjs from "dayjs";

export default function BlogMainPost({
  slug,
  thumbnail,
  title,
  subtitle,
  author,
  createdAt,
}) {
  return (
    <Row align="middle" style={{ height: "auto" }}>
      <Col span={24}>
        <Link href={`/post${slug}`} />
        <a href="">
          <Card
            style={{ border: "none" }}
            cover={<img alt={thumbnail.alt} src={thumbnail.imageUrl} />}
          >
            <h1>Title : {title}</h1>
            <h3>SubTitle : {subtitle}</h3>
            <h4>
              Author : {author.name}({dayjs(createdAt).format("YYYY MMMM D")})
            </h4>
          </Card>
        </a>
      </Col>
    </Row>
  );
}
