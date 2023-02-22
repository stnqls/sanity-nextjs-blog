import { Col, Row } from "antd";
import SanityBlockContent from "@sanity/block-content-to-react";
import SyntaxHighlightet from "react-syntax-highlighter";

const serializers = {
  types: {
    code: ({ node }) => {
      const { code } = node;
      return (
        <SyntaxHighlightet language="javascript">{code}</SyntaxHighlightet>
      );
    },
    video: ({ node }) => {
      return <p>video</p>;
    },
    link: ({ node }) => {
      const { metadata } = node;
      return <a href={metadata}>link</a>;
    },
    imageGallery: ({ node }) => {
      return <p>imageGallery</p>;
    },
  },
};

export default function BlogPostDetail({ blocks }) {
  return (
    <Row>
      <Col span={24}>
        <SanityBlockContent
          blocks={blocks}
          projectId="n9hizezu"
          dataset="production"
          serializers={serializers}
        />
      </Col>
    </Row>
  );
}
