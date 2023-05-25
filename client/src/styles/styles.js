import { RadioGroup } from "@chakra-ui/react";
import { redirect } from "next/dist/server/api-utils";

export const containerStyles = {
    backgroundColor: 'yellow',
    padding: '1rem',
    fontFamily: "'ui-monospace', Menlo, Monaco, 'Cascadia Mono', 'Segoe UI Mono', 'Roboto Mono', 'Oxygen Mono', 'Ubuntu Monospace', 'Source Code Pro', 'Fira Mono', 'Droid Sans Mono', 'Courier New', monospace",
  };
  
  export const stackStyles = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };
  
  export const buttonGroupStyles = {
    margin: "1rem 0",
    backgroundColor: "blue"
       
  };
  
  export const iconButtonStyles = {
    color: "blue",
  };
  
  export const textStyles = {
    fontSize: "1.2rem",
  };