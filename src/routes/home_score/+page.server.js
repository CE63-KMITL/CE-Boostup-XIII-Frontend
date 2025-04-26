export const load = async () => {
    const fetchusers = async () => {
        const res = await fetch('https://dummyjson.com/users'); // ดึงข้อมูลจาก API
        const data = await res.json();
        return data.users;
    };

    const users = await fetchusers();
    const houseScores = [
        { houseName: 'Priest', score: 1200 },
        { houseName: 'Knight', score: 1100 },
        { houseName: 'Mage', score: 900 },
        { houseName: 'Warlock', score: 1000000 }
    ];
    const myHouseName = 'Warlock';
    const myHouseMembers = users.filter(u => u.house === myHouseName);

    return {
        users,
        houseScores,
        myHouseMembers,
        myHouseName
    };
};