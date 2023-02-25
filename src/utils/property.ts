import { PageType, RichTextType } from "@/types/types";

export const getText = (richTextArray: RichTextType[]) => {
  try {
    const textArray = richTextArray.map((richText) => richText.plain_text);
    return textArray.join("");
  } catch (error) {
    console.error(error);
  }
  return "";
};

export const getCover = (cover: PageType["cover"]) => {
  if (cover && cover.file) return cover.file.url;
  if (cover && cover.external) return cover.external.url;
  return "/noimage.png";
};

export const getDate = (date: { start: string }) => {
  try {
    return date.start;
  } catch (error) {
    console.error(error);
  }
  return "-";
};

export const getMultiSelect = (multiSelect: [{ name: string }]) => {
  try {
    return multiSelect.map((tag) => tag.name);
  } catch (error) {
    console.error(error);
  }
  return [];
};
