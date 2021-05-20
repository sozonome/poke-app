import { Accordion, AccordionProps } from "@chakra-ui/accordion";
import { Skeleton } from "@chakra-ui/skeleton";

import AccordionItemWrapper, {
  AccordionItemType,
} from "./AccordionItemWrapper";

type AccordionWrapperProps = {
  items: Array<AccordionItemType>;
  isLoading?: boolean;
} & AccordionProps;

const AccordionWrapper = ({
  items,
  isLoading,
  ...accordionProps
}: AccordionWrapperProps) => {
  return (
    <Skeleton isLoaded={!isLoading}>
      <Accordion {...accordionProps}>
        {items.map((item, itemIndex) => (
          <AccordionItemWrapper
            item={item}
            key={`accordionItem-${itemIndex}`}
          />
        ))}
      </Accordion>
    </Skeleton>
  );
};

export default AccordionWrapper;
