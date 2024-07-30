import React from "react";
import styled, { keyframes } from "styled-components";
import type { Meta } from "@storybook/react";

import { ColorModeContext } from "@foundation-ui/tokens";
import {
  useBehaviorAnalytics,
  useABTesting,
  useIndexedDB,
} from "@foundation-ui/core";
import { useSaveOnUnload } from "@foundation-ui/hooks";

import { Page, Button } from "@foundation-ui/components";
import appconfig from "./config/app.config.json";
import abvariantsmock from "./mocks/abvariants.json";

const meta = {
  title: "Sandbox/Sandbox",
  component: Page,
} satisfies Meta<typeof Page>;
export default meta;

/* HTML: <div class="loader"></div> */
const LoaderAnimation = keyframes`
  100% {height:40%}
`;
const Loader3D = styled.div`
  --size: 12px;
  --dimension: calc(0.353 * var(--size));

  height: calc(var(--size) + var(--dimension));
  aspect-ratio: 1;
  display: grid;

  &::before {
    content: "";
    height: 100%;
    margin: auto 0;
    clip-path: polygon(
      var(--dimension) 0,
      100% 0,
      100% calc(100% - var(--dimension)),
      calc(100% - var(--dimension)) 100%,
      0 100%,
      0 var(--dimension)
    );
    background: conic-gradient(
      from -90deg at var(--size) var(--dimension),
      ${({ theme }) => theme.colors.text.alpha[8].rgb} 135deg,
      ${({ theme }) => theme.colors.text.alpha[5].rgb} 0 270deg,
      ${({ theme }) => theme.colors.text.alpha[3].rgb} 0
    );

    animation: ${LoaderAnimation} 0.8s infinite alternate;
  }
`;

const Loader = () => {
  return (
    <section
      className="flex justify-center align-center"
      style={{
        height: "100dvh",
        width: "100%",
      }}
    >
      <Loader3D />
    </section>
  );
};

const Component = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [indexedABValues, setIndexedABValues] = React.useState<
    typeof abvariantsmock | []
  >([]);
  const abconfig = React.useMemo(() => {
    return {
      ...appconfig.ab,
      variations: indexedABValues,
    };
  }, [indexedABValues]);

  const colorMode = React.useContext(ColorModeContext);
  const hasMounted = React.useRef(false);

  const idb = useIndexedDB(appconfig.idb);
  const uba = useBehaviorAnalytics(appconfig.uba_funnels);
  const ab = useABTesting(abconfig);

  // Fetch app config from IDB or from api responses mocks
  React.useEffect(() => {
    if (idb.db) {
      idb
        .getDataFromIDB("ab", "variants") // Fetch from IDB
        .then((res) => {
          if (res) {
            setIndexedABValues(res.value);
            console.log("[getDataFromIDB] use values from IndexedDB");
          } else {
            idb.setDataInIDB("ab", "variants", abvariantsmock); // Set values to IDB if not defined
            setIndexedABValues(abvariantsmock);
            console.log("[getDataFromIDB] use mocked values");
          }
        })
        .catch((error) => {
          console.error("Error fetching data from IndexedDB:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [idb.db]);

  // Update Mounted ref when the component is mounted
  React.useEffect(() => {
    hasMounted.current = true;
    return () => {
      hasMounted.current = false;
    };
  }, []);

  // Init AB when the component is mounted and the app config is set
  React.useEffect(() => {
    if (hasMounted.current && appconfig.ab.enabled && !isLoading) {
      colorMode.setColorMode(ab?.variant?.theme);
    }
  }, [ab, indexedABValues, colorMode]);

  useSaveOnUnload({
    url: "api.foundation/sandbox",
    payload: {
      ...uba,
      ab,
    },
  });

  if (isLoading) return <Loader />;
  return (
    <section style={{ height: "100dvh", width: "100%" }}>
      <Page.Content>
        <hgroup className="m-b-medium-80" style={{ width: 768 }}>
          <h2>User Behavior Analytics</h2>
          <p className="m-b-medium-60">
            <small>
              AB version:&nbsp;
              <b>{appconfig.ab.enabled ? ab.version : "disabled"}</b>
            </small>
          </p>

          <div style={{ opacity: 0.6 }}>
            <p className="m-b-medium-30">
              {(appconfig.ab.enabled &&
                ab.variant?.translations?.pageDescription) || (
                <>
                  With the application of user behavior analytics software and
                  tools, you will help your company in the process of
                  identifying and responding to security threats and other risks
                  more quickly and effectively.
                </>
              )}
            </p>
          </div>
        </hgroup>

        <p className="m-b-medium-60">
          <b>Time before interaction:</b>&nbsp;{uba.time_before_interact}
        </p>

        <div className="flex g-medium-10 m-b-medium-60">
          {appconfig.uba_funnels.map((item: string, key: number) => (
            <Button
              id={item}
              key={`${item}${key}`}
              variant={
                (appconfig.ab.enabled &&
                  ab.variant?.components?.buttonsVariant) ||
                "mono"
              }
              sizing={
                (appconfig.ab.enabled && ab.variant?.components?.buttonsSize) ||
                "medium"
              }
            >
              {item}
            </Button>
          ))}
        </div>

        <div className="flex g-medium-10">
          <Button
            variant="tertiary"
            sizing="small"
            onClick={() => {
              idb.flushDBStore("ab");
            }}
          >
            Flush IndexedDB store
          </Button>
          <Button
            variant="tertiary"
            sizing="small"
            onClick={() => ab.forceABVersion(1)}
          >
            Force AB version
          </Button>
          <Button
            variant="tertiary"
            sizing="small"
            onClick={() =>
              console.log({
                ...uba,
                ab,
              })
            }
          >
            Log output
          </Button>
        </div>
      </Page.Content>
      <Page.Panel side="bottom" sizing="medium" fixed defaultOpen>
        <code
          data-emphasis-level="low"
          style={{
            fontSize: "66%",
            opacity: 0.8,
          }}
        >
          {JSON.stringify({ ...uba })}
        </code>
      </Page.Panel>
    </section>
  );
};

export const Sandbox = {
  render: () => {
    return (
      <Page>
        <Component />
      </Page>
    );
  },
};
