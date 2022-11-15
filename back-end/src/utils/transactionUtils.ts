export function formatDate(date:Date) {  
    return date.toISOString().split('T')[0];
};

export function tomorrow(date:any) {
    const tomorrow = new Date(date);
    return tomorrow.setDate(tomorrow.getDate() + 1); 
};