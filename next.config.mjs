import nextMDX from "@next/mdx";
import remarkGfm from 'remark-gfm'
import rehypeExternalLinks from "rehype-external-links";

/** @type {import('next').NextConfig} */

const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
};
const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['noopener', 'noreferrer']
        }
      ]
    ],
  }
})

export default withMDX(nextConfig)
