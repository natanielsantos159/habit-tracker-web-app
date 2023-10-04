import { IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { ReactComponent as BookmarkIcon } from '../assets/habit-icons/bookmark.svg'
import IconsGrid from './IconsGrid.js';

const webApp = window.Telegram.WebApp;

function IconsModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (isOpen) {
      webApp.BackButton.onClick(onClose);
    } else {
      webApp.BackButton.offClick(onClose);
    }
  }, [isOpen]);

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