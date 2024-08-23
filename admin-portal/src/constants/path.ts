export const Path = {
    Root: `/`,
    Analytics: {
        Root: `/analytics`,
    },
    Operations: {
        Root: `/operations`,
        Application: {
            Root: `/operations/application`,
            PrivateEvent: `/operations/application/private`,
            PublicEvent: `/operations/application/public`,
        },
        Users:  {
            Root: `/operations/users`,
            Participant: `/operations/participant`,
            GroupParticipant : `/operations/group-participant`,
            Volunteer: `/operations/volunteer`,
            Staff: `/operations/staff`,
        },
    },
    Event: {
        Root: `/event`,
        EventType: `/event/type`,
    },
    CRM: {
        Email: `/email`,
        Whatsapp: `/whatsapp`,
    },
    Services: {
        Zendesk: `/services/zendesk`
    }
}