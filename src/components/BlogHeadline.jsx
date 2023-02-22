import { Col, Row } from "antd";

export default function BlogHeadline() {
  return (
    <Row align="middle" style={{ height: 400, textAlign: "center" }}>
      <Col span={24}>
        <h1
          style={{
            fontSize: 70,
            fontWeight: "bold",
          }}
        >
          Subin Blog
        </h1>
        <p style={{ fontSize: 24 }}>Next.js와 Sanity를 이용한 블로그 만들기!</p>
      </Col>
    </Row>
  );
}
