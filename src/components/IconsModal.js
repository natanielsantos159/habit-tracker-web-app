import {
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import React from "react";
import HabitIcon from "./HabitIcon";

function IconsModal({ onClick, currentIcon, currentColor }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const iconNames = [
    "academic-cap",
    "annotation",
    "bookmark",
    "book-open",
    "briefcase-alt",
    "bulb-on",
    "gamepad",
    "heart",
    "home-alt",
    "moon",
    "news",
    "notebook",
    "note",
    "pencil",
    "play-circle",
    "shopping-bag",
    "shopping-cart",
    "sparkles",
    "star",
    "sun",
    "terminal",
    "users",
  ];

  return (
    <>
      <IconButton bg={currentColor} onClick={onOpen} icon={<HabitIcon iconName={currentIcon} fill="var(--tg-theme-button-text-color)" />} />
      <Modal isOpen={isOpen} onClose={onClose} variant="telegram-theme">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose an Icon</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns="repeat(4, 1fr)" placeItems="center">
              {iconNames.map((iconName) => (
                <GridItem
                  p="10px"
                  onClick={() => {
                    onClick(iconName)
                    onClose()
                  }}
                  backgroundColor={currentIcon===iconName ? "var(--tg-theme-secondary-bg-color)": "var(--tg-theme-bg-color)"}
                  cursor="pointer"
                  borderRadius="md"
                >
                  <HabitIcon
                    iconName={iconName}
                    fill="var(--tg-theme-text-color)"
                  />
                </GridItem>
              ))}
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default IconsModal;
