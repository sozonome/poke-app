import {
  FormControl,
  FormControlProps,
  FormHelperText,
  FormLabel,
  HelpTextProps,
  Input,
  InputElementProps,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";

type InputWrapperProps = {
  helperText?: HelpTextProps["children"];
  formControlWidth?: FormControlProps["width"];
  leftElement?: InputElementProps["children"];
  rightElement?: InputElementProps["children"];
} & Pick<FormControlProps, "label" | "isInvalid"> &
  InputProps;

const InputWrapper = ({
  label,
  formControlWidth,
  isInvalid,
  helperText,
  leftElement,
  rightElement,
  ...inputProps
}: InputWrapperProps) => {
  const hasAddon = !!(rightElement || leftElement);

  return (
    <FormControl isInvalid={isInvalid} width={formControlWidth}>
      {label && <FormLabel>{label}</FormLabel>}

      {hasAddon ? (
        <InputGroup>
          {leftElement && <InputLeftElement children={leftElement} />}
          <Input borderRadius={24} {...inputProps} />
          {rightElement && <InputRightElement children={rightElement} />}
        </InputGroup>
      ) : (
        <Input borderRadius={24} {...inputProps} />
      )}

      {helperText && (
        <FormHelperText color="red.400">{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default InputWrapper;
