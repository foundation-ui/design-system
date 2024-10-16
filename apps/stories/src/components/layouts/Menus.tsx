import React from "react";
import { Page, Button } from "@foundation-ui/components";

export const QuickActionsMenu = () => {
  return (
    <Page.Menu className="flex justify-between align-center">
      <small>
        <span className="opacity-default-30">@team_name/</span>
        path
      </small>
      <div className="flex g-medium-30 align-center">
        <Button
          id="templates-funnel-trigger"
          name="templates"
          title="get-templates"
          variant="border"
          sizing="small"
        >
          <svg
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            height={16}
            width={16}
            fill="currentColor"
          >
            <path d="m12 2-5.5 9h11z"></path>
            <circle cx="17.5" cy="17.5" r="4.5"></circle>
            <path d="M3 13.5h8v8H3z"></path>
          </svg>
        </Button>
        <Button
          id="upload-funnel-trigger"
          name="import"
          title="import-payload"
          variant="border"
          sizing="small"
        >
          <svg
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            height={16}
            width={16}
            fill="currentColor"
          >
            <path d="M5 4v2h14V4zm0 10h4v6h6v-6h4l-7-7z"></path>
          </svg>
        </Button>
        <Button
          id="download-funnel-trigger"
          name="download"
          title="download-collections"
          variant="border"
          sizing="small"
        >
          <svg
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            height={16}
            width={16}
            fill="currentColor"
          >
            <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7zm-6 .67 2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z"></path>
          </svg>
        </Button>
        <Button
          id="save-funnel-trigger"
          name="sync"
          title="sync-collections"
          variant="border"
          sizing="small"
        >
          <svg
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            height={16}
            width={16}
            fill="currentColor"
          >
            <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8m0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4z"></path>
          </svg>
        </Button>
        <Button
          id="automations-funnel-trigger"
          name="automations"
          title="automations-collections"
          variant="border"
          sizing="small"
        >
          <svg
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            height={16}
            width={16}
            fill="currentColor"
          >
            <path d="M19.03 3.56c-1.67-1.39-3.74-2.3-6.03-2.51v2.01c1.73.19 3.31.88 4.61 1.92zM11 3.06V1.05c-2.29.2-4.36 1.12-6.03 2.51l1.42 1.42C7.69 3.94 9.27 3.25 11 3.06M4.98 6.39 3.56 4.97C2.17 6.64 1.26 8.71 1.05 11h2.01c.19-1.73.88-3.31 1.92-4.61M20.94 11h2.01c-.21-2.29-1.12-4.36-2.51-6.03l-1.42 1.42c1.04 1.3 1.73 2.88 1.92 4.61M7 12l3.44 1.56L12 17l1.56-3.44L17 12l-3.44-1.56L12 7l-1.56 3.44z" />
            <path d="M12 21c-3.11 0-5.85-1.59-7.46-4H7v-2H1v6h2v-2.7c1.99 2.84 5.27 4.7 9 4.7 4.87 0 9-3.17 10.44-7.56l-1.96-.45C19.25 18.48 15.92 21 12 21" />
          </svg>
        </Button>
      </div>
    </Page.Menu>
  );
};
