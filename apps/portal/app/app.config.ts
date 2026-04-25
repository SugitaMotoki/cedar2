export default defineAppConfig({
  ui: {
    colors: {
      primary: "sky",
      secondary: "amber",
      success: "green",
      info: "lime",
      warning: "yellow",
      error: "red",
      neutral: "slate",
    },
    pageHeader: {
      slots: {
        root: "relative border-b border-default p-4",
      },
    },
  },
});
