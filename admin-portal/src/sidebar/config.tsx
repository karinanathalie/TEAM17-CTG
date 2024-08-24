import { Sitemap } from "./types";
import AssignmentIcon from '@mui/icons-material/Assignment';
import InsightsIcon from '@mui/icons-material/Insights';
import EventIcon from '@mui/icons-material/Event';
import SendIcon from '@mui/icons-material/Send';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Path } from "../constants/path";

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
        key: 'operations',
        type: 'sitemap',
        label: 'Operations',
        icon: <AssignmentIcon />,
        children: [
            {
                key: 'application',
                type: 'sitemap',
                label: 'Application',
                children: [
                            {
                                key: 'volunteer-application',
                                type: 'page',
                                label: 'Volunteer Application',
                                path: Path.Operations.Application.Volunteer,
                            },
                            {
                                key: 'participant-application',
                                type: 'page',
                                label: 'Participant Application',
                                path: Path.Operations.Application.Participant,
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
                        path: Path.Operations.Users.Participant,
                    },
                    {
                        key: 'group-participant',
                        type: 'page',
                        label: 'Group Participant',
                        path: Path.Operations.Users.GroupParticipant,
                    },
                    {
                        key: 'volunteer',
                        type: 'page',
                        label: 'Volunteer',
                        path: Path.Operations.Users.Volunteer,
                    },
                    {
                        key: 'staff',
                        type: 'page',
                        label: 'Staff',
                        path: Path.Operations.Users.Staff,
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
                path: Path.Event.Type,
            },
            {
                key: 'event',
                type: 'page',
                label: 'List View',
                path: Path.Event.Root,
            },
            {
                key: 'calendar',
                type: 'page',
                label: 'Calendar View',
                path: Path.Event.Calendar,
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
                path: Path.CRM.Email,
            },
            {
                key: 'whatsapp',
                type: 'page',
                label: 'Whatsapp',
                path: Path.CRM.Whatsapp,
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
                path: Path.Services.Zendesk,
            },
        ]
    },

]