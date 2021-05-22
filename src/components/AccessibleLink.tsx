import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/layout";
import Link, { LinkProps } from "next/link";

type AccessibleLinkProps = Pick<LinkProps, "href" | "as"> &
  Pick<
    ChakraLinkProps,
    "children" | "isExternal" | "display" | "alignItems" | "gridGap"
  > & {
    disabled?: boolean;
  };

const AccessibleLink = ({
  href,
  isExternal,
  children,
  as,
  disabled,
  display,
  alignItems,
  gridGap,
}: AccessibleLinkProps) => {
  if (disabled) {
    return <>{children}</>;
  }

  return (
    <Link href={href} as={as} passHref>
      <ChakraLink
        display={display}
        alignItems={alignItems}
        isExternal={isExternal}
        gridGap={gridGap}
      >
        {children}
      </ChakraLink>
    </Link>
  );
};

export default AccessibleLink;
