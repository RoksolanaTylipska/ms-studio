// The page is capped at 1440px (globals.css). For coloured full-width blocks
// this extends just the background to the edges of wider screens; the content
// keeps its width and no horizontal scroll appears.
export const fullBleed = (color: string) => ({
  boxShadow: `0 0 0 100vmax ${color}`,
  clipPath: "inset(0 -100vmax)",
});

// For blocks whose background is a photo/slider (a colour trick can't extend
// an image): the block itself spans the whole viewport. Its parent must be the
// 1440px page column; globals.css clips the scrollbar-width overflow.
// How far the screen extends past one side of the 1440px page column (0 on
// narrower screens): lets a block at the column's edge reach the screen edge
export const pageOverhang = "max(0px, (100vw - 1440px) / 2)";

export const fullBleedMedia = {
  width: "100vw",
  maxWidth: "100vw",
  marginLeft: "calc(50% - 50vw)",
  marginRight: "calc(50% - 50vw)",
};
