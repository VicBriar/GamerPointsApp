
let today = new Date;
let end = new Date;
let endOfWeek = today.getDate() + 7
end.setDate(endOfWeek);

export const standard = () => ({
  one: {
    id: 1,
    creatorId: null,
    description: "this is a test task",
    complete: false,
    value: .50,
    occurence: "daily",
    startDate: today.toISOString(),
    endDate: end.toISOString(),
    completedOn: null,
    createdAt: today.toISOString(),
  }
})