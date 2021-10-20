import react from "react";
import { CartContext, PriceFormatContext } from "helpers/contexts";
import { shortCurrencyText, longCurrencyText } from "helpers/currencyHelpers";
import StoreApolloClient, { ALL_CURRENCIES } from "graphql/GraphQLQueries";
import "./Navbar.css";
import NavbarCart from "./NavbarCart/NavbarCart";
import StoreLogo from "assets/logo.svg";
import { ReactComponent as ArrowHeadUp } from "assets/ArrowHeadUp.svg";
import { ReactComponent as ArrowHeadDown } from "assets/ArrowHeadDown.svg";
import { ReactComponent as CartSvg } from "assets/Cart.svg";

class Navbar extends react.Component {
  constructor(props) {
    super(props);

    this.currencies = [];

    this.state = {
      showCart: false,
      showCurrencySelector: false,
      finishedFetching: false,
    };

    this.handleShowCurrencies = this.handleShowCurrencies.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleCurrencyBlur = this.handleCurrencyBlur.bind(this);
    this.handleCartBlur = this.handleCartBlur.bind(this);
  }

  handleShowCurrencies() {
    this.setState((prevState) => {
      return { showCurrencySelector: !prevState.showCurrencySelector };
    });
  }

  handleCurrencyChange(e) {
    this.props.changeCurrency(e);
    this.setState({ showCurrencySelector: false });
  }

  handleCurrencyBlur(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      this.setState({ showCurrencySelector: false });
    }
  }

  handleCartBlur(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      this.props.cartContext.changeMiniCartVisibility(e, false);
    }
  }

  componentDidMount() {
    return StoreApolloClient.query({ query: ALL_CURRENCIES }).then((result) => {
      this.currencies = result.data.currencies;
      this.setState({ finishedFetching: true });
    });
  }

  render() {
    const cartItems = this.props.cartContext.getCartItems();

    let additionalCurrenciesClass = "";
    let additionalCurrenciesOpenClass = "";
    let currencyBtnArrowHead = <ArrowHeadDown />;
    let currencyBtnPressed = "false";
    if (this.state.showCurrencySelector) {
      additionalCurrenciesClass = " Navbar__CurrencySelectorMenu--Open";
      additionalCurrenciesOpenClass = " Navbar__CurrencySelectorWrapper--Open";
      currencyBtnArrowHead = <ArrowHeadUp />;
      currencyBtnPressed = "true";
    }

    const currencyButtons = this.currencies.map((item) => (
      <button key={item} className="Navbar__CurrencySetBtn Btn" onClick={this.handleCurrencyChange} value={item}>
        {longCurrencyText(item)}
      </button>
    ));

    const btnActiveClass = " Navbar__Btn--Active";

    // The category buttons are set manual, because there isn't a way to get them dynamically.
    return (
      <header className="Navbar">
        <div className="Container Navbar__Container">
          <div className="Navbar__MenuWrapper">
            <button
              className={"Navbar__Btn Btn" + (this.props.page === "tech" ? btnActiveClass : "")}
              onClick={this.props.onChangePage}
              value="tech"
            >
              Tech
            </button>
            <button
              className={"Navbar__Btn Btn" + (this.props.page === "clothes" ? btnActiveClass : "")}
              onClick={this.props.onChangePage}
              value="clothes"
            >
              Clothes
            </button>
          </div>

          <div className="Navbar__LogoWrapper">
            <img className="Navbar__Logo" src={StoreLogo} alt="Store Logo" />
          </div>

          <div className="Navbar__GlobalControllers">
            <div
              className={"Navbar__CurrencySelectorWrapper" + additionalCurrenciesOpenClass}
              onBlur={this.handleCurrencyBlur}
            >
              <button
                className="Navbar__Btn Btn"
                onClick={this.handleShowCurrencies}
                aria-label="Select current currency"
                aria-pressed={currencyBtnPressed}
              >
                {shortCurrencyText(this.props.currency)}{" "}
                <span className="Navbar__CurrencySelectorArrowHead">{currencyBtnArrowHead}</span>
              </button>
              <div className={"Navbar__CurrencySelectorMenu" + additionalCurrenciesClass}>{currencyButtons}</div>
            </div>

            <div className="Navbar__CartWrapper" onBlur={this.handleCartBlur}>
              <button
                className="Navbar__CartOpenBtn Navbar__Btn Btn"
                onClick={this.props.cartContext.changeMiniCartVisibility}
              >
                <CartSvg />
                {cartItems > 0 ? <span className="Navbar__CartBadge">{cartItems}</span> : ""}
              </button>
              <NavbarCart
                isOpen={this.props.cartContext.miniCartOpen}
                cartContext={this.props.cartContext}
                currency={this.props.currency}
                handleChangePage={this.props.handleChangePage}
              />
            </div>
          </div>
        </div>
      </header>
    );
  }
}

class NavbarWithContext extends react.Component {
  render() {
    return (
      <CartContext.Consumer>
        {(cartContext) => (
          <PriceFormatContext.Consumer>
            {(currencyContext) => (
              <Navbar
                {...this.props}
                cartContext={cartContext}
                currency={currencyContext.currency}
                changeCurrency={currencyContext.changeCurrency}
              />
            )}
          </PriceFormatContext.Consumer>
        )}
      </CartContext.Consumer>
    );
  }
}

export default NavbarWithContext;
