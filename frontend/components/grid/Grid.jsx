import React, {Component} from "react";

import GridItem from "./item/GridItem";

import "./_grid.scss";

class Grid extends Component {
  renderItems = () => {
    const {items} = this.props;

    return items.map((item, index) => (
      <GridItem key={`grid-item-${item.id || index}`}
                item={item}/>
    ))
  }

  render() {
    return (
      <div className={"grid"}>
        {this.renderItems()}
      </div>
    )
  }
}

export default Grid;
