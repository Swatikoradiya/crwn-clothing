import MenuItem from "../menu-item/menu-item";
import React from "react";
import {createStructuredSelector} from "reselect";
import {selectDirectorySections} from "../../redux/directory/directory.selector";
import {connect} from "react-redux";
import {DirectoryMenuContainer} from "./directory.styles";

const Directory = ({sections}) => (
    <DirectoryMenuContainer>
        {sections.map(({id, ...otherProps}) => (
            <MenuItem key={id} {...otherProps}/>
        ))}
    </DirectoryMenuContainer>
)

const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySections
})
export default connect(mapStateToProps)(Directory);