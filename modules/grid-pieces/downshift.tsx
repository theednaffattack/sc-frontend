import React from "react";
import Downshift from "downshift";

import { Input, Label } from "../primitives/forms";
import {
  Button,
  Flex,
  UnstyledList,
  StyledListItem
} from "../primitives/styled-rebass";
import { GetAllTeamMembersQuery } from "modules/gql-gen/generated/apollo-graphql";
import { FieldArrayRenderProps } from "formik";

// const items = [
//   { value: "apple" },
//   { value: "pear" },
//   { value: "orange" },
//   { value: "grape" },
//   { value: "banana" }
// ];

interface DownshiftExampleProps {
  handleBlur: {
    (e: React.FocusEvent<any>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  onChange: any;
  items: GetAllTeamMembersQuery;
  arrayHelpers: FieldArrayRenderProps;
  values: any;
}

export const DownshiftExample: React.FC<DownshiftExampleProps> = ({
  arrayHelpers,
  items,
  onChange,
  values
}) => {
  return (
    <Downshift
      onChange={onChange}
      itemToString={item => (item ? item.value : "")}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        highlightedIndex,
        // isOpen,

        inputValue,
        selectedItem,
        getRootProps
      }) => (
        <div>
          <Label {...getLabelProps()}>Enter a name</Label>
          <div
            style={{ display: "inline-block" }}
            {...getRootProps({ refKey: "hello" }, { suppressRefError: true })}
          >
            <Input {...getInputProps()} />
          </div>
          <UnstyledList
            {...getMenuProps()}
            style={{
              minHeight: "250px",
              overflow: "auto",
              border: "2px pink solid",
              paddingLeft: "6px",
              paddingTop: "6px",
              cursor: "pointer"
            }}
          >
            INPUT VALUE: {inputValue ? inputValue : ""}
            {items && items.getAllTeamMembers
              ? items.getAllTeamMembers
                  .filter(
                    item =>
                      !inputValue ||
                      (item && item.name && item.name.includes(inputValue))
                  )
                  .map((item, index) => {
                    console.log("VIEW MAPPING VALUES", {
                      item,
                      highlightedIndex,
                      selectedItem
                    });
                    if (item && item.name) {
                      return (
                        <StyledListItem
                          {...getItemProps({
                            key: item.name,
                            index,
                            item,
                            style: {
                              backgroundColor: values.invitees.includes(item)
                                ? "lightgray"
                                : "white",
                              fontWeight: "normal"
                            }
                          })}
                        >
                          <Flex border="lime">
                            <Flex alignItems="center" border="lime">
                              {item.name}
                            </Flex>
                            {values.invitees.includes(item) ? (
                              <Flex
                                alignItems="center"
                                border="crimson"
                                ml="auto"
                              >
                                <Button
                                  p={1}
                                  type="button"
                                  onClick={() =>
                                    arrayHelpers.replace(index, "")
                                  }
                                >
                                  X
                                </Button>
                              </Flex>
                            ) : (
                              ""
                            )}
                          </Flex>
                        </StyledListItem>
                      );
                    } else {
                      return item;
                    }
                  })
              : null}
          </UnstyledList>
        </div>
      )}
    </Downshift>
  );
};
