import React from "react";
import ReactDOM from "react-dom";
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

const Home = ({ post: { date }, locale }) => {
  let flag = () => {
    switch (locale) {
      case "de":
        return `🇩🇪`;
      case "en":
        return `🇬🇧`;
      case "fr":
        return `🇫🇷`;
      case "es":
        return `🇪🇸`;
      default:
        return `🇬🇧`;
    }
  };

  return (
    <div>
      <h1>Locale : {flag()}</h1>
      <p>
        <PostDate date={date} />
      </p>
      <FormattedMessage
        id="body.greeting"
        defaultMessage="Hello to our new app"
      />
    </div>
  );
};

const Root = styled.div`
  padding: 2rem;
`;

class Wrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locale: "de",
      index: 0
    };
    this.changeLocale = this.changeLocale.bind(this);
  }

  changeLocale() {
    let index = this.state.index;
    if (index < locales.length - 1) {
      index = index + 1;
    } else {
      index = 0;
    }

    this.setState({
      locale: locales[index],
      index: index
    });
  }

  componentDidMount() {
    setInterval(this.changeLocale, 3000);
  }

  render() {
    return (
      <Root>
        <IntlProvider
          locale={this.state.locale}
          messages={messages[this.state.locale]}
        >
          <Home
            post={{
              date: new Date(1459913574887)
            }}
            locale={this.state.locale}
          />
        </IntlProvider>
      </Root>
    );
  }
}

ReactDOM.render(<Wrapper />, document.getElementById("root"));
registerServiceWorker();
