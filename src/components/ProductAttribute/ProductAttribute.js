import react from "react";
import ProductSwatchAttributes from "./ProductSwatchAttributes/ProductSwatchAttributes";
import ProductTextAttributes from "./ProductTextAttributes/ProductTextAttributes";
import "./ProductAttribute.css";

class ProductAttribute extends react.Component {
  constructor(props) {
    super(props);

    this.attributeControllers = {
      swatch: ProductSwatchAttributes,
      text: ProductTextAttributes,
    };
  }

  render() {
    const attribute = this.props.attribute;
    const AttributeComponent = this.attributeControllers[attribute.type];
    const bemBaseClass = this.props.bemBaseClass;
    const displayTitle = typeof this.props.displayTitle === "boolean" ? this.props.displayTitle : true;
    const disableInactive = typeof this.props.disableInactive === "boolean" ? this.props.disableInactive : false;

    return (
      <div className={bemBaseClass}>
        {displayTitle ? <div className={bemBaseClass + "__Title"}>{attribute.name + ":"}</div> : ""}
        <div className={bemBaseClass + "__BtnWrapper"}>
          <AttributeComponent
            className={bemBaseClass + "__ItemBtn"}
            handleItemClick={this.props.handleItemClick}
            disableInactive={disableInactive}
            selected={this.props.selected}
            items={attribute.items}
          />
        </div>
      </div>
    );
  }
}

export default ProductAttribute;
