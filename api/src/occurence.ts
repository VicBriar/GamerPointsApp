export interface OccurenceEnumType {
    daily: "daily";
    weekly: "weekly";
    monthly: "monthly";
    bonus: "bonus";
}
const Occurence = {
    enum: {
        daily: "daily",
        weekly: "weekly",
        monthly: "monthly",
        bonus: "bonus",
    },
    list: "daily, weekly, monthly, or bonus",
};

export default Occurence;