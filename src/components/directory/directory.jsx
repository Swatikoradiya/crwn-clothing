import MenuItem from "../menu-item/menu-item";
import "./directory.scss";
import React from "react";
import {createStructuredSelector} from "reselect";
import {selectDirectorySections} from "../../redux/directory/directory.selector";
import {connect} from "react-redux";

const Directory = ({sections}) => (
    <div className="directory-menu">
        {sections.map(({id, ...otherProps}) => (
            <MenuItem key={id} {...otherProps}/>
        ))}
    </div>
)

const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySections
})
export default connect(mapStateToProps)(Directory);