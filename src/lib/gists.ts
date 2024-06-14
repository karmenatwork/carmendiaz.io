import glob from "fast-glob";

interface Gist {
  title: string;
  description: string;
  author: string;
  date: string;
}

export interface GistWithSlug extends Gist {
  slug: string;
}

async function importGist(gistFilename: string): Promise<GistWithSlug> {
  let { gist } = (await import(`../app/gists/${gistFilename}`)) as {
    default: React.ComponentType;
    gist: Gist;
  };
  console.log(gist);
  return {
    slug: gistFilename.replace(/(\/page)?\.mdx$/, ""),
    ...gist,
  };
}

export async function getAllGists() {
  let gistFilename = await glob("*/page.mdx", {
    cwd: "./src/app/gists",
  });

  let gists = await Promise.all(gistFilename.map(importGist));

  return gists.sort((a, z) => +new Date(z.date) - +new Date(a.date));
}
