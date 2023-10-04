import { IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react';
import React from 'react';
import { ReactComponent as BookmarkIcon } from '../assets/habit-icons/bookmark.svg'
import IconsGrid from './IconsGrid.js';


function IconsModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton onClick={onOpen} icon={<BookmarkIcon />} />
      <Modal isOpen={isOpen} onClose={onClose} variant="telegram-theme">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose an Icon</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <IconsGrid />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default IconsModal;