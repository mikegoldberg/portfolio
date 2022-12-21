import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import { WebRtcCanvas } from "../../components";

const WebRtcCanvasExample = () => {
  const [hostId, setHostId] = useState<string>();

  return (
    <Box paddingBottom="20px">
      <Flex paddingBottom="10px" gap="5px" alignItems={"start"}>
        <Box padding="3px" fontSize="2xl">
          <MdInfoOutline />
        </Box>
        <Text>
          {
            "Click and drag to draw. Each instance uses PeerJS to establish a connection to a host instance using the PeerServer Cloud service as a connection broker. Draw events are sent to the host, then rebroadcast to all connected clients."
          }
        </Text>
      </Flex>
      <Grid templateColumns={"50% 50%"} gap="10px">
        <GridItem>
          <WebRtcCanvas isHost={true} onOpen={setHostId} />
        </GridItem>
        {hostId && (
          <GridItem>
            <WebRtcCanvas hostId={hostId} />
          </GridItem>
        )}
        {hostId && (
          <GridItem>
            <WebRtcCanvas hostId={hostId} />
          </GridItem>
        )}
        {hostId && (
          <GridItem>
            <WebRtcCanvas hostId={hostId} />
          </GridItem>
        )}
      </Grid>
    </Box>
  );
};

export default WebRtcCanvasExample;
