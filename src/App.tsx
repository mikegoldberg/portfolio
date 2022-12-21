import { ChakraProvider, Box, Flex } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Resume, CodeExamples } from "./views";
import { defaultDark } from "./theme";
import { Navigation, ColorModeSwitcher } from "./components";
import { useScrollToTop as UseScrollToTop } from "./hooks";

export const App = () => (
  <ChakraProvider theme={defaultDark}>
    <BrowserRouter>
      <UseScrollToTop />
      <ColorModeSwitcher />
      <Flex>
        <Navigation />
        <Box flex="1">
          <Routes>
            <Route path="/" element={<Resume />} />
            <Route path="code-examples" element={<CodeExamples />} />
          </Routes>
        </Box>
      </Flex>
    </BrowserRouter>
  </ChakraProvider>
);
