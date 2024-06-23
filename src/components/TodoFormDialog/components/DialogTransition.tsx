import { forwardRef, ReactElement, Ref } from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const DialogTransition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default DialogTransition;
