export const load = async () => {
    const fetchusers = async () => {
        const res = await fetch('https://dummyjson.com/users'); // ดึงข้อมูลจาก API
        const data = await res.json();
        return data.users;
    };

    const users = await fetchusers(); 

    return {
        users
    };
};