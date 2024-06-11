import fs from "fs";
import path from "path";

interface AboutData {
  shortName: string;
  fullName?: string;
  headline?: string;
  // github: string;
  linkedIn: string;
  intro: string;
  shortBio: string[];
  bio: string[];
  mojo: string;
  mailto: string;
  // date: string;
}

const dataPath = path.join(process.cwd(), "data");

export const getAboutData = (): AboutData =>{
  const fullPath = path.join(dataPath, "about.json");
  const aboutData = JSON.parse(fs.readFileSync(fullPath, "utf8"));
  return aboutData;
}

