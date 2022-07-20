import {
  AccordionButton,
  AccordionButtonProps,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import { ReactNode } from "react";

export type AccordionItemType = {
  button: ReactNode;
  content: ReactNode;
  buttonProps: AccordionButtonProps;
};

type AccordionItemWrapperProps = {
  item: AccordionItemType;
};

const AccordionItemWrapper = ({
  item: { button, content, buttonProps },
}: AccordionItemWrapperProps) => {
  return (
    <AccordionItem>
      <AccordionButton {...buttonProps}>
        {button}
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>{content}</AccordionPanel>
    </AccordionItem>
  );
};

export default AccordionItemWrapper;
