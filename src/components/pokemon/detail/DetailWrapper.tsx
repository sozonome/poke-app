import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Badge,
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { useToast } from "@chakra-ui/toast";
import { FormikErrors, useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";

import AccordionWrapper from "components/ui/accordion";
import ModalWrapper from "components/ui/ModalWrapper";
import InputWrapper from "components/ui/InputWrapper";
import MotionBox from "components/motion/Box";

import {
  CaughtPokemonContext,
  CaughtPokemons,
} from "components/provider/CaughtPokemonProvider";
import { rand50 } from "util/rand50";

import { PokemonDetail } from "./query";

import { textGradientStyle } from "styles/textGradient";

type DetailWrapperProps = {
  pokemon: PokemonDetail;
  isLoading?: boolean;
};

type CapturedPokemonInput = {
  nickName: string;
};

const DetailWrapper = ({ pokemon, isLoading }: DetailWrapperProps) => {
  const { pokemons, updateCaughtPokemons } = useContext(CaughtPokemonContext);
  const router = useRouter();
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

        if (pokemons?.[pokemon.name]?.nickNames?.includes(formValue.nickName)) {
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
    <Grid gap={8}>
      <Grid gap={8} templateColumns={["1fr", "1fr", "repeat(2, 1fr)"]}>
        <Box>
          <Skeleton isLoaded={!isLoading}>
            <Image
              layout="responsive"
              src={pokemon.sprites.front_default}
              width="100%"
              height="100%"
            />
          </Skeleton>
          <Skeleton isLoaded={!isLoading}>
            <Flex gridGap={2} alignItems="center">
              <Heading {...textGradientStyle}>{pokemon.name}</Heading>
              <Text fontWeight="bold" fontSize="md" opacity={0.3}>
                #{pokemon.id}
              </Text>
            </Flex>
          </Skeleton>
        </Box>

        <Skeleton
          isLoaded={!isLoading}
          display="grid"
          gridGap={8}
          alignItems="center"
        >
          <Button
            onClick={handleCapturePokemon}
            isFullWidth
            size="lg"
            colorScheme="orange"
          >
            catch
          </Button>

          <Flex alignItems="center" gridGap={2} wrap="wrap">
            <Heading width="full" size="sm">
              abilities
            </Heading>
            <Grid templateColumns={["repeat(2, 1fr)"]} gap={1}>
              {pokemon.abilities.map(({ ability: { name } }) => (
                <Text key={name}>{name}</Text>
              ))}
            </Grid>
          </Flex>

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
        </Skeleton>
      </Grid>

      <Skeleton isLoaded={!isLoading}>
        <Flex alignItems="center" gridGap={2}>
          <Heading size="sm">types</Heading>
          <Wrap>
            {pokemon.types.map(({ type: { name } }) => (
              <WrapItem key={name}>
                <Badge colorScheme="purple">{name}</Badge>
              </WrapItem>
            ))}
          </Wrap>
        </Flex>
      </Skeleton>

      <AccordionWrapper
        allowToggle
        isLoading={isLoading}
        items={[
          {
            button: (
              <Heading flex={1} textAlign="left" size="md">
                moves
              </Heading>
            ),
            buttonProps: {
              paddingX: 0,
            },
            content: (
              <Grid templateColumns={["repeat(2, 1fr)"]} gap={1}>
                {pokemon.moves.map(({ move: { name } }) => (
                  <Text key={name}>{name}</Text>
                ))}
              </Grid>
            ),
          },
        ]}
      />
    </Grid>
  );
};

export default DetailWrapper;
