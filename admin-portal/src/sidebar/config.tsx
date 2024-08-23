import { Sitemap } from "./types";
import AssignmentIcon from '@mui/icons-material/Assignment';
import InsightsIcon from '@mui/icons-material/Insights';
import EventIcon from '@mui/icons-material/Event';
import SendIcon from '@mui/icons-material/Send';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

export const SITEMAP: Sitemap = [
    {
        key: 'analytics',
        type: 'sitemap',
        label: 'Analytics',
        icon: <InsightsIcon />,
        children: [
            {
                key: 'sign-up-rate',
                type: 'page',
                label: 'Sign Up Rate',
                path: '',
            },
            {
                key: 'registration',
                type: 'page',
                label: 'Registration',
                path: '',
            },
            {
                key: 'engangement-metrics',
                type: 'page',
                label: 'Engangement Metrics',
                path: '',
            },
        ]
    },
    {
        key: 'workflow',
        type: 'sitemap',
        label: 'Workflow',
        icon: <AssignmentIcon />,
        children: [
            {
                key: 'application',
                type: 'sitemap',
                label: 'Application',
                children: [
                    {
                        key: 'private-event',
                        type: 'page',
                        label: 'Private Event',
                        path: '',
                    },
                    {
                        key: 'public-event',
                        type: 'sitemap',
                        label: 'Public Event',
                        children: [
                            {
                                key: 'volunteer-application',
                                type: 'page',
                                label: 'Volunteer Application',
                                path: '',
                            },
                            {
                                key: 'participant-application',
                                type: 'page',
                                label: 'Participant Application',
                                path: '',
                            },
                        ]
                    },
                ]
            },
            {
                key: 'users',
                type: 'sitemap',
                label: 'Users',
                children: [
                    {
                        key: 'participant',
                        type: 'page',
                        label: 'Participant',
                        path: '',
                    },
                    {
                        key: 'group-participant',
                        type: 'page',
                        label: 'Group Participant',
                        path: '',
                    },
                    {
                        key: 'volunteer',
                        type: 'page',
                        label: 'Volunteer',
                        path: ''
                    },
                    {
                        key: 'staff',
                        type: 'page',
                        label: 'Staff',
                        path: '',
                    },
                    
                ]
            }
        ]
    },
    {
        key: 'event',
        type: 'sitemap',
        label: 'Event',
        icon: <EventIcon />,
        children: [
            {
                key: 'event-type',
                type: 'page',
                label: 'Event Type',
                path: '',
            },
            {
                key: 'event',
                type: 'page',
                label: 'Event',
                path: '',
            },
        ]
    },
    {
        key: 'crm',
        type: 'sitemap',
        label: 'CRM',
        icon: <SendIcon />,
        children: [
            {
                key: 'email',
                type: 'page',
                label: 'Email',
                path: '',
            },
            {
                key: 'whatsapp',
                type: 'page',
                label: 'Whatsapp',
                path: '',
            },
        ]
    },
    {
        key: 'services',
        type: 'sitemap',
        label: 'Services',
        icon: <SupportAgentIcon />,
        children: [
            {
                key: 'zendesk',
                type: 'page',
                label: 'Zendesk',
                path: '',
            },
        ]
    },

]