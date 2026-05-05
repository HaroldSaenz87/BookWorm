export function formatMemberSince(dateString: string) {

    if (!dateString) return "Recently"; // Handle undefined

    const date = new Date(dateString);
    
    // Check if the date is actually valid
    if (isNaN(date.getTime())) {
        return "Recently"; 
    }

    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    return `${month} ${year}`;
};

export function formatPublishDate(dateString: string){

    const date = new Date(dateString);

    const month = date.toLocaleString("default", { month: "long" });

    const day = date.getDate();

    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;

}