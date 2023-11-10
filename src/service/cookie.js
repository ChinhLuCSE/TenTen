export const token = document.cookie
  ? document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      .split("=")[1]
  : "none";
