import { List, ListItem, ListItemIcon, ListItemText, Collapse } from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";
import { SitemapElement } from "./types";  // Adjust the import path as necessary

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

    useEffect(() => {
        if (!isDrawerOpen) {
            setOpen(false);  
        }
    }, [isDrawerOpen]);

    const handleClick = () => {
        if (item.type === 'sitemap' && isDrawerOpen) {
            setOpen(!open);
        } else if (item.type === 'page') {
            // Handle navigation to the page if needed, e.g., using React Router
        }
    };

    return (
        <>
            <ListItem onClick={handleClick}>
                {item.icon && <ListItemIcon sx={{ marginLeft: 0.5 }}>{item.icon}</ListItemIcon>}
                <ListItemText primary={item.label} sx={{ marginLeft: 2 * level}}/>
                {item.type === 'sitemap' ? (open? <ExpandLess /> : <ExpandMore />) : null}
            </ListItem>
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
