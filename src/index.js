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

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsRow = styled(Row)``;

const Label = styled.h3`
  padding-right: 0.5rem;
`;

const Root = styled.div`
  padding: 2rem;
`;

const Button = styled.button`
  border-radius: 2px;
  border: 1px solid green;
  background-color: white;
  padding: 0.25rem;
  font-size: 1rem;
  display: flex;
  width: 6rem;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  :not(:last-child) {
    margin-right: 1rem;
  }
`;

const Home = ({ post: { date }, locale, switchLocale }) => {
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
      <h1>Current locale : {flag()}</h1>
      <Row>
        <Label>Formated date: </Label>
        <h2>
          <PostDate date={date} />
        </h2>
      </Row>
      <Row>
        <Label>Formated message: </Label>
        <h2>
          <FormattedMessage
            id="body.greeting"
            defaultMessage="Hello to our new app"
          />
        </h2>
      </Row>
      <ButtonsRow>
        <Button onClick={switchLocale} value="de">
          {`🇩🇪`}
        </Button>
        <Button onClick={switchLocale} value="es">
          {`🇪🇸`}
        </Button>
        <Button onClick={switchLocale} value="en">
          {`🇬🇧`}
        </Button>
        <Button onClick={switchLocale} value="fr">
          {`🇫🇷`}
        </Button>
      </ButtonsRow>
    </div>
  );
};

class Wrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locale: "de",
      index: 0
    };
    this.changeLocale = this.changeLocale.bind(this);
    this.switchLocale = this.switchLocale.bind(this);
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

  switchLocale(e) {
    console.log(e.target.value);
    switch (e.target.value) {
      case "de":
        this.setState({ locale: "de" });
        break;
      default:
    }
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
            switchLocale={this.switchLocale}
          />
        </IntlProvider>
      </Root>
    );
  }
}

ReactDOM.render(<Wrapper />, document.getElementById("root"));
registerServiceWorker();
