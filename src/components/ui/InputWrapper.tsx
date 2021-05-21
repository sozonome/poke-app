import {
  FormControl,
  FormControlProps,
  FormHelperText,
  FormLabel,
  HelpTextProps,
} from "@chakra-ui/form-control";
import { Input, InputProps } from "@chakra-ui/input";

type InputWrapperProps = {
  helperText?: HelpTextProps["children"];
  formControlWidth?: FormControlProps["width"];
} & Pick<FormControlProps, "label" | "isInvalid"> &
  InputProps;

const InputWrapper = ({
  label,
  formControlWidth,
  isInvalid,
  helperText,
  ...inputProps
}: InputWrapperProps) => {
  return (
    <FormControl isInvalid={isInvalid} width={formControlWidth}>
      {label && <FormLabel>{label}</FormLabel>}
      <Input borderRadius={24} {...inputProps} />
      {helperText && (
        <FormHelperText color="red.400">{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default InputWrapper;
