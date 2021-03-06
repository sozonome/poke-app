import { Button, Image, useDisclosure, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { FormikErrors, useFormik } from "formik";

import MotionBox from "components/motion/Box";
import InputWrapper from "components/ui/InputWrapper";
import ModalWrapper from "components/ui/ModalWrapper";

import {
  CaughtPokemonContext,
  CaughtPokemons,
} from "components/provider/CaughtPokemonProvider";
import { rand50 } from "util/rand50";

import { PokemonDetail } from "../query";

type CapturedPokemonInput = {
  nickName: string;
};

type CatchWrapperProps = {
  pokemon: PokemonDetail;
};

const CatchWrapper = ({ pokemon }: CatchWrapperProps) => {
  const { pokemons, updateCaughtPokemons } = useContext(CaughtPokemonContext);

  const router = useRouter();
  const toast = useToast();
  const {
    isOpen: isCaptureModalOpen,
    onOpen: onOpenCaptureModal,
    onClose: onCloseCaptureModal,
  } = useDisclosure();
  const {
    isOpen: isSuccessModalOpen,
    onOpen: onOpenSuccessModal,
    onClose: onCloseSuccessModal,
  } = useDisclosure();

  const { values, dirty, errors, setFieldValue, handleChange, handleSubmit } =
    useFormik<CapturedPokemonInput>({
      initialValues: {
        nickName: "",
      },
      validate: (formValue) => {
        const formErrors: FormikErrors<CapturedPokemonInput> = {};

        if (formValue.nickName === "") {
          formErrors.nickName = "Nickname must be filled.";
        }

        if (
          pokemons?.[pokemon.name]?.nickNames
            ?.map((nickName) => nickName.toLowerCase())
            .includes(formValue.nickName.toLowerCase())
        ) {
          formErrors.nickName =
            "You already use this nickname for this pokemon. Type another nickname.";
        }

        return formErrors;
      },
      onSubmit: (formValue) => {
        const tempPokemons = { ...pokemons };
        const tempNickNames = tempPokemons[pokemon.name]?.nickNames ?? [];
        const updateStoredPokemons: CaughtPokemons = Object.assign(
          tempPokemons,
          {
            [pokemon.name]: {
              image: pokemon.sprites.front_default,
              nickNames: [...tempNickNames, formValue.nickName],
            },
          }
        );

        updateCaughtPokemons(updateStoredPokemons);
        toast.closeAll();
        toast({
          title: `saved as ${formValue.nickName}`,
          status: "success",
        });
        setFieldValue("nickName", "");
        onCloseSuccessModal();
        router.push("/pokedex/owned");
      },
    });

  const handleCapturePokemon = () => {
    onOpenCaptureModal();
    const success = rand50();

    setTimeout(() => {
      onCloseCaptureModal();
      toast.closeAll();

      if (success) {
        toast({
          title: `${pokemon.name} captured!`,
          status: "success",
          isClosable: true,
        });
        onOpenSuccessModal();
      } else {
        toast({
          title: `The ${pokemon.name} ran away! Try again some time...`,
          status: "info",
          isClosable: true,
        });
      }
    }, 2000);
  };

  return (
    <>
      <Button
        onClick={handleCapturePokemon}
        isFullWidth
        size="lg"
        colorScheme="orange"
      >
        catch
      </Button>

      <ModalWrapper
        isOpen={isCaptureModalOpen}
        onClose={() => {}}
        header="Attempting to Capture..."
        body={
          <MotionBox
            marginY={20}
            initial={{ y: 80 }}
            animate={{ y: -100, rotate: 180 }}
            transition={{
              repeat: Infinity,
              ease: "easeOut",
              duration: 0.5,
              repeatType: "reverse",
            }}
            width={100}
            marginX="auto"
          >
            <Image
              src="/pokeball.svg"
              layout="responsive"
              width="100%"
              height="100%"
            />
          </MotionBox>
        }
      />

      <ModalWrapper
        isOpen={isSuccessModalOpen}
        onClose={() => {}}
        header={`Give your ${pokemon.name} a nickname!`}
        body={
          <InputWrapper
            label="nickname"
            name="nickName"
            value={values.nickName}
            onChange={handleChange}
            placeholder={`your ${pokemon.name}'s nickname`}
            isInvalid={!!errors.nickName}
            helperText={errors.nickName}
          />
        }
        withFooter
        confirmButton={
          <Button
            disabled={!dirty || (dirty && Object.keys(errors).length > 0)}
            colorScheme="teal"
            onClick={() => handleSubmit()}
          >
            save
          </Button>
        }
      />
    </>
  );
};

export default CatchWrapper;
