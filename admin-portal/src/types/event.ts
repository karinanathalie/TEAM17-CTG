import { Training } from "./training";

export type Event = {
    id: string;
    description: string;
    date: string;
    location: string;
    target_population: string;
    skillset: string;
    training: Training[];
}