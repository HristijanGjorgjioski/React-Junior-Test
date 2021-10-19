import React, { Component } from "react";
import { connect } from "react-redux";

import { selectCurrency } from '../../actions/product';
import './styles.scss';

export class CurrencySwitcher extends Component {
  render() {
    return (
      <ul
        ref={this.props.refs}
        className={`currency-dropdown__currency-menu ${
          this.props.currency.isOpen ? "currency-dropdown__currency-menu--open" : ""
        }`}
      >
        {this.props.currency.list.map((c) => {
          return (
            <li
              key={c}
              onClick={() => this.props.selectCurrency(c)}
              className="currency-menu__item"
            >
              {c}
            </li>
          );
        })}
      </ul>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      selectCurrency: (currency) => dispatch(selectCurrency(currency)),
    };
  };

export default connect(null, mapDispatchToProps)(CurrencySwitcher);
