"use client";
/**

TestPage
  GeneralContainer
    AppHeader
      ButtonTheme

*/

import GeneralContainer from "./GeneralContainer";
import MyThemeProvider from "./MyThemeProvider";

const TestPage = () => {
  return (
    <div className="p-5">
      <MyThemeProvider>
        <GeneralContainer />
      </MyThemeProvider>
    </div>
  );
};

export default TestPage;
