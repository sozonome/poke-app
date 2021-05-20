import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/layout";
import Link, { LinkProps } from "next/link";

type AccessibleLinkProps = Pick<LinkProps, "href" | "as"> &
  Pick<ChakraLinkProps, "children" | "isExternal"> & {
    disabled?: boolean;
  };

const AccessibleLink = ({
  href,
  isExternal,
  children,
  as,
  disabled,
}: AccessibleLinkProps) => {
  if (disabled) {
    return <>{children}</>;
  }

  return (
    <Link href={href} as={as} passHref>
      <ChakraLink isExternal={isExternal}>{children}</ChakraLink>
    </Link>
  );
};

export default AccessibleLink;
