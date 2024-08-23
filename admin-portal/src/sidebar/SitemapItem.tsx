import { List, ListItem, ListItemIcon, ListItemText, Collapse, ListItemButton } from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';
import { SitemapElement } from "./types"; 

interface SitemapItemProps {
    item: SitemapElement;
    level?: number; 
    isDrawerOpen: boolean; 
}

const SitemapItem: React.FC<SitemapItemProps> = ({ 
    item, 
    level = 0, 
    isDrawerOpen 
}) => {
    const [open, setOpen] = useState(false);
    // const navigate = useNavigate();

    useEffect(() => {
        if (!isDrawerOpen) {
            setOpen(false);  
        }
    }, [isDrawerOpen]);

    const handleClick = () => {
        if (item.type === 'sitemap' && isDrawerOpen) {
            setOpen(!open);
        } else if (item.type === 'page') {
            // navigate(item.path);
        }
    };

    return (
        <>
            <ListItemButton onClick={handleClick}>
                {item.icon && <ListItemIcon sx={{ marginLeft: 0.5 }}>{item.icon}</ListItemIcon>}
                <ListItemText primary={item.label} sx={{ marginLeft: 2 * level }}/>
                {item.type === 'sitemap' ? (open? <ExpandLess /> : <ExpandMore />) : null}
            </ListItemButton>
            {item.type === 'sitemap' && item.children && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {item.children.map((child) => (
                            <SitemapItem key={child.key} item={child} level={level + 1} isDrawerOpen={isDrawerOpen}/>
                        ))}
                    </List>
                </Collapse>
            )}
        </>
    );
};

export default SitemapItem;
