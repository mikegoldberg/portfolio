import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";

const theme = {
  colors: {
    brand: {
      dark: "#0d0d0d",
      blue: "#21609a",
      lightBlue: "#abcde3",
      light: "#dfdfdf",
    },
  },
  components: {
    Checkbox: {
      variants: {
        demo: {
          control: {
            borderColor: "blackAlpha.300",
            _checked: {
              background: "black",
              color: "#fff",
            },
          },
        },
      },
    },
    Button: {
      variants: {
        ghost: (props: StyleFunctionProps) => ({
          _hover: {
            bg: mode("blackAlpha.200", "whiteAlpha.200")(props),
          },
        }),
      },
    },
    Heading: {
      baseStyle: (props: StyleFunctionProps) => ({
        fontFamily: "Roboto Flex, sans-serif",
        fontWeight: 500,
        color: mode("brand.blue", "brand.blue")(props),
        marginBottom: "10px",
      }),
    },
    Modal: {
      baseStyle: () => ({
        dialog: {
          color: "brand.dark",
          background: "brand.light",
        },
      }),
    },
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        fontFamily: "Roboto Flex, sans-serif",
        fontWeight: 300,
        color: mode("brand.dark", "brand.light")(props),
        bg: mode("brand.light", "brand.dark")(props),
      },
    }),
  },
};

export const defaultLight = extendTheme({
  config: {
    initialColorMode: "light",
  },
  ...theme,
});

export const defaultDark = extendTheme({
  config: {
    initialColorMode: "dark",
  },
  ...theme,
});
