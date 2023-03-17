import { Col, Row } from "antd";
import SanityBlockContent from "@sanity/block-content-to-react";
import SyntaxHighlightet from "react-syntax-highlighter";
import imageUrlBuilder from "@sanity/image-url";
import SanityClient from "@sanity/client";
import ImageGallery from "./ImageGallery";

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
      const video = node.href;
      // console.log(video);
      return <video src={video}>{node.caption}</video>;
    },
    link: ({ node }) => {
      const { metadata } = node;
      return (
        <a href={metadata} style={{ fontSize: "18px" }}>
          {node.name}
        </a>
      );
    },
    imageGallery: ({ node }) => {
      const images = node.images;
      return <ImageGallery images={images} />;
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
