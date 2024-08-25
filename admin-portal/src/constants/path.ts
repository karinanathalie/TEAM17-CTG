export const Path = {
    Root: `/`,
    Analytics: {
        Root: `/analytics`,
    },
    Operations: {
        Root: `/operations`,
        Application: {
            Volunteer: `/operations/application/volunteer`,
            Participant: `/operations/application/participant`,
        },
        Users:  {
            Root: `/operations/users`,
            Participant: `/operations/participant`,
            GroupParticipant : `/operations/group-participant`,
            Volunteer: `/operations/volunteer`,
            Staff: `/operations/staff`,
            StaffCreate: `/operations/staff/create`,
        },
    },
    Event: {
        Root: `/event`,
        Create: `/event/create`,
        Edit: `/event/edit/:id`,
        Type: `/event/type`,
        Calendar: `/event/calendar`,
    },
    CRM: {
        Email: `/email`,
        CreateEmail: `/email/create`,
        ReminderEmail: `/email/reminder`,
        Whatsapp: `/whatsapp`,
        CreateWhatsapp: `/whatsapp/create`,
        ReminderWhatsapp: `/whatsapp/reminder`,
    },
    Services: {
        Zendesk: `/services/zendesk`
    }
}