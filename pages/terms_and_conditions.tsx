import { Flex } from "../modules/primitives/styled-rebass";
import { getLayout } from "../modules/site-layout/main-v2";

interface TermsAndConditionsTypes {
  (): JSX.Element;

  getLayout: (page: any) => JSX.Element;

  title: string;
}

const TermsAndConditions: TermsAndConditionsTypes = () => (
  <Flex flexDirection="column" alignItems="center">
    TERMS AND CONDITIONS
  </Flex>
);

TermsAndConditions.getLayout = getLayout;
TermsAndConditions.title = "Terms and Conditions";

export default TermsAndConditions;
