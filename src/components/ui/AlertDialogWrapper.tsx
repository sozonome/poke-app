import { Button } from "@chakra-ui/button";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogProps,
} from "@chakra-ui/modal";
import { ReactNode, useRef } from "react";

type AlertDialogWrapperProps = Pick<AlertDialogProps, "isOpen" | "onClose"> & {
  header?: ReactNode;
  confirmButton?: ReactNode;
  body?: ReactNode;
  cancelButtonText?: string;
};

const AlertDialogWrapper = ({
  isOpen,
  header,
  confirmButton,
  body,
  cancelButtonText,
  onClose,
}: AlertDialogWrapperProps) => {
  const cancelRef = useRef(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent margin={4} borderRadius={24}>
          <AlertDialogHeader>{header}</AlertDialogHeader>

          <AlertDialogBody>{body}</AlertDialogBody>

          <AlertDialogFooter gridGap={2}>
            <Button ref={cancelRef} onClick={onClose}>
              {cancelButtonText ?? "cancel"}
            </Button>
            {confirmButton}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default AlertDialogWrapper;
