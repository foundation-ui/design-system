"use client";

import React from "react";

import { Accordion } from "..";
import {
  TreeList,
  TreeItem,
  TreeItemContent,
  TreeLine,
  TreeLink,
} from "./styles";

import { ComponentSizeEnum } from "../types";
import type { ITreeBranchProperties, ITreeProperties } from "./types";

const TreeBranch = (props: ITreeBranchProperties) => {
  const {
    raw,
    sizing = ComponentSizeEnum.Medium,
    label,
    links,
    defaultOpen = true,
    nested = false,
    icon,
    ...restProps
  } = props;
  const branchId = React.useId();

  return (
    <Accordion.Root>
      <Accordion>
        <TreeLink
          as={Accordion.Trigger}
          value={branchId}
          data-nested={nested}
          sizing={sizing}
          variant="ghost"
        >
          {icon}
          {label}
        </TreeLink>

        <Accordion.Content value={branchId} defaultOpen={defaultOpen}>
          <TreeList
            data-raw={Boolean(raw)}
            data-size={sizing}
            data-nested={nested}
            {...restProps}
          >
            {links.map((item, index) => {
              const key = `${item.label}-${index}`;

              // Branch: recurse with the children as a new subtree
              if (item.links?.length) {
                return (
                  <TreeItem key={key} data-raw={Boolean(raw)} data-branch>
                    <TreeBranch
                      raw={raw}
                      sizing={sizing}
                      label={item.label}
                      links={item.links}
                      icon={item.icon}
                      defaultOpen={item.defaultOpen}
                      nested
                    />
                  </TreeItem>
                );
              }

              return (
                <TreeItem key={key} data-raw={Boolean(raw)}>
                  <TreeLine data-raw={Boolean(raw)} aria-hidden="true" />

                  <TreeItemContent data-raw={Boolean(raw)}>
                    <TreeLink
                      variant="ghost"
                      sizing={sizing}
                      data-raw={Boolean(raw)}
                      onClick={item.onClick}
                      disabled={item.disabled}
                      rawicon
                    >
                      {item.icon}
                      {item.label}
                    </TreeLink>
                  </TreeItemContent>
                </TreeItem>
              );
            })}
          </TreeList>
        </Accordion.Content>
      </Accordion>
    </Accordion.Root>
  );
};
TreeBranch.displayName = "Tree.Branch";

const Tree = (props: ITreeProperties) => <TreeBranch {...props} />;
Tree.displayName = "Tree";

export { Tree };
