// import type { Config } from "tailwindcss";
// import daisyui from 'daisyui'
// const flowbite = require("flowbite-react/tailwind");
// export default {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: "var(--background)",
//         foreground: "var(--foreground)",
//       },
//     },
//   },
//   plugins: [daisyui , flowbite.plugin()],
//   daisyui: {
//     themes: ["light", "dark"], 
//   }
// } satisfies Config;


const flowbite = require("flowbite-react/tailwind");
import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [daisyui, flowbite.plugin()],
  daisyui: {
    themes: ["light", "dark"],
  },
} satisfies Config;
