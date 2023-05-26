import { StatLabel } from "@chakra-ui/react"

//Custom stat label
export default function CustomStatLabel({ text }) {
    return (
        <StatLabel color={"gray.500"}>{text}</StatLabel>
    )
}