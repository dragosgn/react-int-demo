import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { injectIntl, IntlProvider, FormattedRelative } from "react-intl";
import registerServiceWorker from "./registerServiceWorker";

const PostDate = injectIntl(({ date, intl }) => (
  <span title={intlFormatDate(date)}>
    <FormattedRelative value={date} />
  </span>
));

const App = ({ post: { date, title, body } }) => (
  <div>
    <h1>{title}</h1>
    <p>PostDate date={date}</p>
    <div>{body}</div>
  </div>
);

ReactDOM.render(
  <IntlProvider locale={navigator.language}>
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
