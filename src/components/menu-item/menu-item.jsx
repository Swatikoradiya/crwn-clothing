import {useNavigate} from "react-router-dom";
import {
    BackgroundImageContainer,
    ContentContainer,
    ContentSubtitle,
    ContentTitle,
    MenuItemContainer
} from "./menu-item.styles";

const MenuItem = ({title, imageUrl, size, linkUrl}) => {
    const navigate = useNavigate();
    return (
        <MenuItemContainer
            size={size}
            onClick={() => navigate(`${linkUrl}`)}
        >
            <BackgroundImageContainer imageUrl={imageUrl}/>
            <ContentContainer>
                <ContentTitle>{title.toUpperCase()}</ContentTitle>
                <ContentSubtitle>SHOP NOW</ContentSubtitle>
            </ContentContainer>
        </MenuItemContainer>
    )
}

export default MenuItem;