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

const App = ({ post: { date, title, body } }) => (
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

const locales = ["en", "de", "es", "fr"];

const lang = () => window.setTimeout(locales.map(locale => locale), 5000);

ReactDOM.render(
  <IntlProvider locale={lang} messages={messages[lang]}>
    <App
      post={{
        title: "Hello, World!",
        date: new Date(1459913574887),
        body: "Amazing content"
      }}
    />
  </IntlProvider>,
  document.getElementById("root")
);
registerServiceWorker();
