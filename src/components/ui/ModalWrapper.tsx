import { Button } from "@chakra-ui/button";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/modal";
import { ReactNode } from "react";

type ModalWrapperProps = Pick<ModalProps, "isOpen" | "onClose"> & {
  header?: ReactNode;
  withCloseButton?: boolean;
  confirmButton?: ReactNode;
  body?: ReactNode;
  withFooter?: boolean;
  closeButtonText?: string;
};

const ModalWrapper = ({
  isOpen,
  header,
  withCloseButton = false,
  confirmButton,
  body,
  withFooter = false,
  closeButtonText,
  onClose,
}: ModalWrapperProps) => {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent margin={4} borderRadius={24}>
        {header && <ModalHeader>{header}</ModalHeader>}
        {withCloseButton && <ModalCloseButton />}

        {body && <ModalBody>{body}</ModalBody>}

        {withFooter && (
          <ModalFooter>
            {withCloseButton && (
              <Button onClick={onClose}>{closeButtonText ?? "Close"}</Button>
            )}
            {confirmButton}
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalWrapper;
