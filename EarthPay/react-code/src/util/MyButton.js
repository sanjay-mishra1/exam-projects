import React from "react";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({
  children,
  onClick,
  tip,
  btnClassName,
  tipClassName,
  btId,
  inlineCss,
}) => (
  <Tooltip title={tip} className={tipClassName} placement="bottom">
    <IconButton
      fontSize="21px"
      onClick={onClick}
      className={btnClassName}
      id={btId}
      style={inlineCss}
    >
      {children}
    </IconButton>
  </Tooltip>
);
