import { forwardRef } from "react";
import { Box } from "rebass/styled-components";
import styled from "styled-components";
import { WidthProps, HeightProps, width, height } from "styled-system";

import { Flex } from "./styled-rebass";
import { Field } from "formik";

type CheckboxCSSProperties = {
  position: string;
  opacity: number;
  zIndex: number;
  width: number;
  height: number;
  overflow: string;
};

interface CheckboxTypes {
  className: string;
  sx: CheckboxCSSProperties;
  variant: string;
}

interface SwitchProptype {
  checked: boolean;
}
// const rebassProps = [
//   ...systemProps,
//   'sx',
//   'variant',
// ]

// const PRE = new RegExp(`^(${rebassProps.join('|')})$`)
// const MRE = /^m[trblxy]?$/

// const getProps = (test) => (props) => {
//   const next = {}
//   for (const key in props) {
//     if (test(key || '')) next[key] = props[key]
//   }
//   return next
// }

// const getSystemProps = getProps(k => PRE.test(k))
// const getMarginProps = getProps(k => MRE.test(k))
// const omitMarginProps = getProps(k => !MRE.test(k))

export const StyledForm = forwardRef<HTMLFormElement, any>((props, ref) => {
  return <Flex as="form" ref={ref} {...props} />;
});

const SVG2 = styled.svg<WidthProps & HeightProps>`
  ${width}
  ${height}
`;

const SVG = ({ size = 24, ...props }) => (
  <SVG2
    as="svg"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    fill="currentcolor"
    {...props}
  />
);

export const Label = forwardRef<HTMLDivElement, any>((props, ref) => {
  // if (!props.children) {
  return (
    <Flex
      ref={ref}
      as="label"
      tx="forms"
      variant="label"
      {...props}
      sx={{
        width: "100%",
        cursor: "pointer"
      }}
    />
  );
  // } else {
  //   <Flex
  //     ref={ref}
  //     as="label"
  //     tx="forms"
  //     variant="label"
  //     {...props}
  //     sx={{
  //       width: "100%",
  //       cursor: "pointer"
  //     }}
  //   >
  //     {props.children}
  //   </Flex>;
  // }
});

const NewLabelBase = styled(Flex)`
  :hover {
    background-color: red;
  }
`;

export const NewLabel = forwardRef<HTMLDivElement, any>((props, ref) => (
  <NewLabelBase
    ref={ref}
    as="label"
    tx="forms"
    variant="label"
    bg="blue"
    alignItems="center"
    justifyContent="center"
    flexDirection="column"
    color="white"
    px={3}
    py={2}
    borderRadius="4px"
    width="auto"
    {...props}
    sx={{
      width: "100%"
    }}
  />
));

const NewBoxBase = styled(Box)`
  :focus {
    outline: 1px dotted #000;
    outline: -webkit-focus-ring-color auto 5px;
  }
`;

export const Input = forwardRef<any, any>(({ field, form, ...props }, ref) => {
  const baseStyles = {
    display: "block",
    width: "100%",
    p: 2,
    appearance: "none",
    fontSize: "inherit",
    lineHeight: "inherit",
    border: "1px solid",
    borderRadius: "default",
    color: "inherit",
    bg: "transparent"
  };
  const stylesForUploadInputs = {
    ...baseStyles,
    width: "0.1px",
    height: "0.1px",
    opacity: 0,
    overflow: "hidden",
    position: "absolute",
    zIndex: -1,
    cursor: "pointer",
    pointerEvents: "none"
  };
  return (
    <NewBoxBase
      ref={ref}
      as="input"
      type="text"
      tx="forms"
      variant="input"
      {...field}
      {...form}
      {...props}
      sx={props.type === "file" ? stylesForUploadInputs : baseStyles}
    />
  );
});

const DownArrow = (props: any) => (
  <SVG {...props}>
    <path d="M7 10l5 5 5-5z" />
  </SVG>
);

export const Select = forwardRef<HTMLDivElement, any>((props, ref) => (
  <Flex {...props}>
    <Box
      ref={ref}
      as="select"
      tx="forms"
      variant="select"
      {...props}
      sx={{
        display: "block",
        width: "100%",
        p: 2,
        appearance: "none",
        fontSize: "inherit",
        lineHeight: "inherit",
        border: "1px solid",
        borderRadius: "default",
        color: "inherit",
        bg: "transparent"
      }}
    />
    <DownArrow
      sx={{
        ml: -28,
        alignSelf: "center",
        pointerEvents: "none"
      }}
    />
  </Flex>
));

export const Textarea = forwardRef<HTMLDivElement, any>((props, ref) => {
  // what next?
  // props.field.onChange((e: any) => {
  //   console.log("do some void stuff", { e });
  // });

  const { field, form } = props;
  return (
    <Box
      ref={ref}
      as="textarea"
      tx="forms"
      variant="textarea"
      {...props}
      {...field}
      {...form}
      sx={{
        display: "block",
        width: "100%",
        p: 2,
        appearance: "none",
        fontSize: "inherit",
        lineHeight: "inherit",
        border: "1px solid",
        borderRadius: "default",
        color: "inherit",
        bg: "transparent",
        ...props.sx
      }}
    />
  );
});

const RadioChecked = (props: any) => (
  <SVG {...props}>
    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
  </SVG>
);

const RadioUnchecked = (props: any) => (
  <SVG {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
  </SVG>
);

const RadioIcon = (props: any) => (
  <>
    <RadioChecked
      {...props}
      sx={{
        display: "none",
        "input:checked ~ &": {
          display: "block"
        }
      }}
    />
    <RadioUnchecked
      {...props}
      sx={{
        display: "block",
        "input:checked ~ &": {
          display: "none"
        }
      }}
    />
  </>
);

export const Radio = forwardRef<HTMLDivElement, any>(
  ({ className, sx, variant = "radio", ...props }, ref) => (
    <Box>
      <Box
        ref={ref}
        as="input"
        type="radio"
        {...props}
        sx={{
          position: "absolute",
          opacity: 0,
          zIndex: -1,
          width: 1,
          height: 1,
          overflow: "hidden"
        }}
      />
      <Box
        as={RadioIcon}
        aria-hidden="true"
        tx="forms"
        variant={variant}
        className={className}
        // sx={sx}
        {...props}
        // {...getSystemProps(props)}
        sx={{
          mr: 2,
          borderRadius: 9999,
          color: "gray",
          "input:checked ~ &": {
            color: "primary"
          },
          "input:focus ~ &": {
            bg: "highlight"
          },
          ...sx
        }}
      />
    </Box>
  )
);

const CheckboxChecked = (props: any) => (
  <SVG {...props}>
    <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </SVG>
);

const CheckboxUnchecked = (props: any) => (
  <SVG {...props}>
    <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
  </SVG>
);

const CheckboxIcon = (props: any) => (
  <>
    <CheckboxChecked
      {...props}
      sx={{
        display: "none",
        "input:checked ~ &": {
          display: "block"
        }
      }}
    />
    <CheckboxUnchecked
      {...props}
      sx={{
        display: "block",
        "input:checked ~ &": {
          display: "none"
        }
      }}
    />
  </>
);

export const Checkbox = forwardRef<HTMLDivElement, CheckboxTypes>(
  ({ className, sx, variant = "checkbox", ...props }, ref) => (
    <Box>
      <Box
        ref={ref}
        as="input"
        type="checkbox"
        {...props}
        sx={{
          position: "absolute",
          opacity: 0,
          zIndex: -1,
          width: 1,
          height: 1,
          overflow: "hidden"
        }}
      />
      <Box
        as={CheckboxIcon}
        aria-hidden="true"
        tx="forms"
        variant={variant}
        className={className}
        // {...getSystemProps(props)}
        {...props}
        sx={{
          mr: 2,
          borderRadius: 4,
          color: "gray",
          "input:checked ~ &": {
            color: "primary"
          },
          "input:focus ~ &": {
            color: "primary",
            bg: "highlight"
          },
          ...sx
        }}
      />
    </Box>
  )
);

export const Slider = forwardRef(({ ...props }, ref) => (
  <Box
    ref={ref}
    as="input"
    type="range"
    tx="forms"
    variant="slider"
    {...props}
    sx={{
      display: "block",
      width: "100%",
      height: 4,
      my: 2,
      cursor: "pointer",
      appearance: "none",
      borderRadius: 9999,
      color: "inherit",
      bg: "gray",
      ":focus": {
        outline: "none",
        color: "primary"
      },
      "&::-webkit-slider-thumb": {
        appearance: "none",
        width: 16,
        height: 16,
        bg: "currentcolor",
        border: 0,
        borderRadius: 9999,
        variant: "forms.slider.thumb"
      }
    }}
  />
));

export const Switch = forwardRef<HTMLDivElement, SwitchProptype>(
  ({ checked, ...props }, ref) => (
    <Box
      ref={ref}
      as="button"
      type="button"
      role="switch"
      tx="forms"
      variant="switch"
      aria-checked={checked}
      {...props}
      sx={{
        appearance: "none",
        m: 0,
        p: 0,
        width: 40,
        height: 24,
        color: "primary",
        bg: "transparent",
        border: "1px solid",
        borderColor: "primary",
        borderRadius: 9999,
        "&[aria-checked=true]": {
          bg: "primary"
        },
        ":focus": {
          outline: "none",
          boxShadow: "0 0 0 2px"
        }
      }}
    >
      <Box
        aria-hidden
        style={{
          transform: checked ? "translateX(16px)" : "translateX(0)"
        }}
        sx={{
          mt: "-1px",
          ml: "-1px",
          width: 24,
          height: 24,
          borderRadius: 9999,
          border: "1px solid",
          borderColor: "primary",
          bg: "background",
          transitionProperty: "transform",
          transitionTimingFunction: "ease-out",
          transitionDuration: "0.1s",
          variant: "forms.switch.thumb"
        }}
      />
    </Box>
  )
);

// Pre-prepared Formik stuff

interface TextareaFormikFieldProps {
  channelId: string;
  submitForm: () => Promise<any>;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  values: {
    channel_message: string;
  };
}

export const TextareaFormikField: React.FC<TextareaFormikFieldProps> = ({
  channelId,
  submitForm,
  setFieldValue,
  values
}) => {
  return (
    <Field
      disabled={channelId ? false : true}
      label="channel message"
      id="channel_message"
      name="channel_message"
      onKeyDown={(e: React.KeyboardEvent) => {
        // console.log("VIEW EVENT KEY", e.key);
        console.log("FORM VALUES", values);
        if (e.key === "Enter") {
          submitForm();
          // e.preventDefault();
          // handleReset();
          // resetForm({ values: { channel_message: "" } });
          // setFieldValue("channel_message", "");
        }
      }}
      onChange={(e: any) => {
        e.preventDefault();
        let lastLetter = e.target.value.slice(-1);
        let allButLastLetter = e.target.value.slice(0, -1);

        let isLastLetterEnterKey =
          lastLetter === "\n" ? "isAnEnterKey" : "isNOTAnEnterKey";

        if (isLastLetterEnterKey === "isAnEnterKey") {
          setFieldValue("channel_message", allButLastLetter);
        }
        if (e.target.value === "\n") {
          console.log("CAN I SEE NEWLINES?");
        }
        console.log("ON CHANGE", {
          value: e.target.value,
          key: e.key,
          lastLetter,
          isLastLetterEnterKey,
          allButLastLetter
        });
      }}
      placeholder="Message: #"
      type="textarea"
      rows={1}
      component={Textarea}
      mr={2}
      sx={{
        overflowY: "hidden",
        resize: "none"
        // border: "1px transparent solid"
      }}
    />
  );
};
