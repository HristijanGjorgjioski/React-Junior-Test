import react from "react";
import { SiteNotificationsContext } from "helpers/contexts";
import "./SiteNotifications.css";

class SiteNotifications extends react.Component {
  constructor(props) {
    super(props);

    this.state = { showAddToCartNotification: false };

    this.showAddToCartNotification = this.showAddToCartNotification.bind(this);
  }

  showAddToCartNotification() {
    this.setState({ showAddToCartNotification: true });

    setTimeout(() => {
      this.setState({ showAddToCartNotification: false });
    }, 2000);
  }

  render() {
    const additionalClass = this.state.showAddToCartNotification ? " SiteNotifications_ItemAdded--Visible" : "";
    return (
      <SiteNotificationsContext.Provider value={{ showAddToCartNotification: this.showAddToCartNotification }}>
        <div className={"SiteNotifications_ItemAdded" + additionalClass}>Item added to cart!</div>
        <>{this.props.children}</>
      </SiteNotificationsContext.Provider>
    );
  }
}

export default SiteNotifications;
