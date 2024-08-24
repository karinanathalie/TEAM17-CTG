import { Profile } from "./profile";

export type Application = {
    id: string;
    profile: Profile;
    event: Event;
    role_type: string;
}