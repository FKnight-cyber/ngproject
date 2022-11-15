export function tomorrow(date:any) {
    const tomorrow = new Date(date);
    return tomorrow.setDate(tomorrow.getDate() + 1); 
};