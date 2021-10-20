import react from "react";
import { pickTextColor } from "helpers/colorHelpers";

class ProductSwatchAttributes extends react.Component {
  render() {
    const items = this.props.items.map((item) => {
      const className = this.props.className;
      const isSelected = item.id === this.props.selected;
      const additionalClass = isSelected ? " " + className + "--Selected  Btn--Selected" : "";
      const isDisabled = this.props.disableInactive && !isSelected ? true : false;

      return (
        <button
          className={className + " " + className + "--Swatch Btn" + additionalClass}
          key={item.id}
          value={item.id}
          disabled={isDisabled}
          aria-label={item.displayValue}
          aria-pressed={isSelected ? "true" : "false"}
          onClick={this.props.handleItemClick}
          style={{
            backgroundColor: item.value,
            color: pickTextColor(item.value, "white", "black"),
          }}
        >
          {isSelected ? "✔" : ""}
        </button>
      );
    });
    return <react.Fragment>{items}</react.Fragment>;
  }
}

export default ProductSwatchAttributes;
