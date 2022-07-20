import { Grid, IconButton, Skeleton } from "@chakra-ui/react";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";

type PageNavButtonsProps = {
  isLoading?: boolean;
  prevDisabled: boolean;
  nextDisabled: boolean;
  handleChangePage: (type: "next" | "prev") => () => void;
};

const PageNavButtons = ({
  isLoading,
  prevDisabled,
  nextDisabled,
  handleChangePage,
}: PageNavButtonsProps) => {
  return (
    <Skeleton marginY={4} isLoaded={!isLoading}>
      <Grid templateColumns={["repeat(2, 1fr)"]} gap={4}>
        <IconButton
          aria-label="prev"
          icon={<AiOutlineCaretLeft />}
          disabled={prevDisabled}
          onClick={handleChangePage("prev")}
          borderRadius={24}
        />
        <IconButton
          aria-label="next"
          icon={<AiOutlineCaretRight />}
          disabled={nextDisabled}
          onClick={handleChangePage("next")}
          borderRadius={24}
        />
      </Grid>
    </Skeleton>
  );
};

export default PageNavButtons;
