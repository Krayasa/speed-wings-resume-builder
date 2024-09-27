import { View, Image } from "@react-pdf/renderer";
import {
  ResumePDFIcon,
  type IconType,
} from "components/Resume/ResumePDF/common/ResumePDFIcon";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import {
  ResumePDFLink,
  ResumePDFSection,
  ResumePDFText,
} from "components/Resume/ResumePDF/common";
import type { ResumeProfile } from "lib/redux/types";

export const ResumePDFProfile = ({
  profile,
  themeColor,
  isPDF,
}: {
  profile: ResumeProfile;
  themeColor: string;
  isPDF: boolean;
}) => {
  const { name, email, phone, url, summary, homeAddress, picture } = profile;
  const iconProps = { email, phone, homeAddress, url };

  return (
    <ResumePDFSection style={{ marginTop: spacing["4"] }}>
      <View
        style={{
          ...styles.flexRowBetween,
          flexWrap: "wrap",
          marginTop: spacing["0.5"],
        }}
      >
        <View
          style={{
            ...styles.flexCol,
            flexWrap: "wrap",
            marginTop: spacing["0.5"],
            maxWidth: picture ? "80%" : "100%",
          }}
        >
          <ResumePDFText
            bold={true}
            themeColor={themeColor}
            style={{ fontSize: "20pt" }}
          >
            {name}
          </ResumePDFText>
          {summary && (
            <View
              style={{
                display: "flex",
                //   flexWrap: "wrap",
                //   maxWidth: "100%",
                //   overflow: "hidden",
              }}
            >
              <ResumePDFText
                style={{
                  marginTop: 20,
                  textAlign: "justify",
                }}
              >
                {summary}
              </ResumePDFText>
            </View>
          )}
        </View>

        {picture !== "" ? (
          <View style={{ alignContent: "center" }}>
            <Image
              src={picture}
              style={{
                width: 100,
                height: 100,
                borderRadius: 40,
                marginLeft: spacing["1"],
              }}
            />
            <img
              src={picture}
              style={{
                width: 100,
                height: 100,
                borderRadius: 40,
                marginLeft: spacing["1"],
              }}
            />
          </View>
        ) : null}
      </View>

      <View
        style={{
          ...styles.flexRowBetween,
          flexWrap: "wrap",
          marginTop: spacing["0.5"],
        }}
      >
        {Object.entries(iconProps).map(([key, value]) => {
          if (!value) return null;

          let iconType = key as IconType;
          if (key === "url") {
            if (value.includes("github")) {
              iconType = "url_github";
            } else if (value.includes("linkedin")) {
              iconType = "url_linkedin";
            }
          }

          const shouldUseLinkWrapper = ["email", "url", "phone"].includes(key);
          const Wrapper = ({ children }: { children: React.ReactNode }) => {
            if (!shouldUseLinkWrapper) return <>{children}</>;

            let src = "";
            switch (key) {
              case "email": {
                src = `mailto:${value}`;
                break;
              }
              case "phone": {
                src = `tel:${value.replace(/[^\d+]/g, "")}`; // Keep only + and digits
                break;
              }
              default: {
                src = value.startsWith("http") ? value : `https://${value}`;
              }
            }

            return (
              <ResumePDFLink src={src} isPDF={isPDF}>
                {children}
              </ResumePDFLink>
            );
          };

          return (
            <View
              key={key}
              style={{
                ...styles.flexRow,
                alignItems: "center",
                gap: spacing["1"],
              }}
            >
              <ResumePDFIcon type={iconType} isPDF={isPDF} />
              <Wrapper>
                <ResumePDFText>{value}</ResumePDFText>
              </Wrapper>
            </View>
          );
        })}
      </View>
    </ResumePDFSection>
  );
};
