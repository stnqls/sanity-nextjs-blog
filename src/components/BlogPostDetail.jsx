import { Col, Row } from "antd";
import SanityBlockContent from "@sanity/block-content-to-react";
import SyntaxHighlightet from "react-syntax-highlighter";
import imageUrlBuilder from "@sanity/image-url";
import SanityClient from "@sanity/client";

const serializers = {
  types: {
    code: ({ node }) => {
      const { code } = node;
      return (
        <SyntaxHighlightet language="javascript">{code}</SyntaxHighlightet>
      );
    },
    image: ({ node }) => {
      const image = node.asset._ref;
      const builder = imageUrlBuilder({
        projectId: process.env.projectId,
        dataset: "production",
      });
      function urlFor(source) {
        return builder.image(source);
      }
      return <img src={urlFor(image).width(650).url()} />;
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
  console.log(blocks);
  return (
    <Row style={{ padding: "20px" }}>
      <Col span={24}>
        <SanityBlockContent
          blocks={blocks}
          projectId={process.env.projectId}
          dataset="production"
          serializers={serializers}
        />
      </Col>
    </Row>
  );
}
