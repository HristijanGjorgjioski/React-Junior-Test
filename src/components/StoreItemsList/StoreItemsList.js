import react from "react";
import StoreItem from "./StoreItem/StoreItem";
import "./StoreItemsList.css";
import StoreApolloClient, { ALL_CLOTHES, ALL_TECH } from "graphql/GraphQLQueries";

class StoreItemsList extends react.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    this.products = [];
    this.setPageProducts = this.setPageProducts.bind(this);
  }

  componentDidMount() {
    this.setPageProducts();
  }

  capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  setPageProducts() {
    let query = false;
    if (this.props.page === "tech") {
      query = ALL_TECH;
    }

    if (this.props.page === "clothes") {
      query = ALL_CLOTHES;
    }

    StoreApolloClient.query({ query: query }).then((result) => {
      this.products = result.data.category.products;
      this.currentPageDisplayed = this.props.page;
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    let items = this.products;

    let title = "Loading...";
    if (!this.state.loading) {
      title = this.capitalize(this.props.page);
    }

    items = items.map((item) => (
      <StoreItem key={item.name} item={item} handleChangePage={this.props.handleChangePage} />
    ));

    return (
      <div className="Container">
        <div className="StoreItemsList__TitleWrapper">
          <h1 className="StoreItemsList__Title">{title}</h1>
        </div>
        <div className="StoreItemsList__ListWrapper">{items}</div>
      </div>
    );
  }
}

export default StoreItemsList;
