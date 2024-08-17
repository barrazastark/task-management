import React from "react"

import { Button, Flex, Box, useRadio, useRadioGroup, HStack } from '@chakra-ui/react'
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"
import { useTasks } from "../context/TaskManagement"
import { Priority, SortOrder } from "../types/Task"

const options = ["All", 'High', 'Medium', 'Low']

const RadioCard = (props: ReturnType<typeof getRadioProps>) => {
  const { getInputProps, getRadioProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getRadioProps()

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        _checked={{
          bg: 'green.100',
          color: 'black',
          borderColor: 'green.100',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  )
}

export const Filters = () => {
  const { setFilter, toggleOrder, order, filter } = useTasks();
  
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'priority',
    defaultValue: filter,
    onChange: (value: "All" | Priority) => {
      setFilter(value);
    },
  });

  const group = getRootProps()

  return (
    <>
    <HStack {...group} wrap="wrap">
      {options.map((value) => {
        const radio = getRadioProps({ value })
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        )
      })}
    </HStack>
      <Flex mt="1em" alignItems="center">
        <span>Sort by: </span>
        <Button
          colorScheme="blue"
          onClick={toggleOrder}
          ml="1em" variant='link' rightIcon={order === SortOrder.ASC ? <TriangleDownIcon /> : <TriangleUpIcon />}>
            Created date
        </Button>
      </Flex>
    </>
  )

}