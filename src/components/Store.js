import react from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import StoreItemsList from "./StoreItemsList/StoreItemsList";
import Product from "./Product/Product";
import CartPage from "./CartPage/CartPage";
import Cart from "./Cart/Cart";
import CartOverlay from "./CartOverlay/CartOverlay";
import SiteNotifications from "components/SiteNotifications/SiteNotifications";

class Store extends react.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: "tech",
    };

    this.handleChangePage = this.handleChangePage.bind(this);
    this.displayMainPage = this.displayMainPage.bind(this);
  }

  handleChangePage(e, value) {
    e.preventDefault();

    if (value) {
      this.setState({ page: value });
    } else {
      this.setState({ page: e.currentTarget.value });
    }
  }

  displayMainPage() {
    if (this.state.page === "tech" || this.state.page === "clothes") {
      return <StoreItemsList key={this.state.page} page={this.state.page} handleChangePage={this.handleChangePage} />;
    }

    if (this.state.page === "cart") {
      return <CartPage />;
    }

    return <Product name={this.state.page} />;
  }

  render() {
    return (
      <div className="Store">
        <SiteNotifications>
          <Cart>
            <Navbar
              page={this.state.page}
              onChangePage={this.handleChangePage}
              handleChangePage={this.handleChangePage}
            />
            <CartOverlay>
              {this.displayMainPage()}
              <Footer />
            </CartOverlay>
          </Cart>
        </SiteNotifications>
      </div>
    );
  }
}

export default Store;
