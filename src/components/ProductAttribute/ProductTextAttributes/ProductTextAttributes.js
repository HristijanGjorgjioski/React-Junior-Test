import react from "react";

class ProductTextAttributes extends react.Component {
  render() {
    const items = this.props.items.map((item) => {
      const className = this.props.className;
      const isSelected = item.id === this.props.selected;
      const additionalClass = isSelected ? " " + className + "--Selected Btn--Selected" : "";
      const isDisabled = this.props.disableInactive && !isSelected ? true : false;

      return (
        <button
          className={className + " " + className + "--Text Btn" + additionalClass}
          key={item.id}
          value={item.id}
          disabled={isDisabled}
          aria-pressed={isSelected ? "true" : "false"}
          onClick={this.props.handleItemClick}
        >
          {item.displayValue}
        </button>
      );
    });
    return <react.Fragment>{items}</react.Fragment>;
  }
}

export default ProductTextAttributes;
