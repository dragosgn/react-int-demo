import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {
  injectIntl,
  IntlProvider,
  FormattedRelative,
  FormattedMessage,
  addLocaleData
} from "react-intl";
import registerServiceWorker from "./registerServiceWorker";

import styled from "styled-components";

import fr from "react-intl/locale-data/fr";
import de from "react-intl/locale-data/de";
import es from "react-intl/locale-data/es";
import en from "react-intl/locale-data/en";

import messages from "./messages";

addLocaleData([...fr, ...de, ...es, ...en]);

const PostDate = injectIntl(({ date, intl }) => (
  <span title={intl.formatDate(date)}>
    <FormattedRelative value={date} />
  </span>
));

const locales = ["en", "de", "es", "fr"];

let index;
let locale = "de";

const changeLocale = () => {
  if (index < locales.length - 1) {
    index = index + 1;
  } else {
    index = 0;
  }
  console.log(locale);
  locale = locales[index];
};

const App = ({ post: { date, title, body } }) => {
  window.setInterval(changeLocale, 2000);
  return (
    <div>
      <h1>{title}</h1>
      {console.log(navigator.language, navigator.languages)}
      <p>
        <PostDate date={date} />
      </p>
      <FormattedMessage
        id="body.greeting"
        defaultMessage="Hello to our new app"
      />
      <div>{body}</div>
    </div>
  );
};

const Root = styled.div``;

ReactDOM.render(
  <Root locale={locale}>
    <IntlProvider locale={locale} messages={messages[locale]}>
      <App
        post={{
          title: "Hello, World!",
          date: new Date(1459913574887),
          body: "Amazing content"
        }}
      />
    </IntlProvider>
  </Root>,
  document.getElementById("root")
);
registerServiceWorker();
