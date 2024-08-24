import { Badges } from "./badges";
import { Training } from "./training";

export type Profile = {
    id: string;
    name: string;
    age: number;
    phone: string;
    gender: string;
    role_type: string;
    badges: Badges[];
    trainings: Training[];
    streak: number;
}