import { useRadio, Box } from "@chakra-ui/react";

function RadioColor({ color, ...otherProps }) {
  const { getInputProps, getRadioProps } = useRadio(otherProps)

  const input = getInputProps()
  const checkbox = getRadioProps()

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='0'
        borderRadius='lg'
        bg={color}
        _checked={{
          bg: color,
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={3}
        py={3}
      />
    </Box>
  )
}

export default RadioColor;