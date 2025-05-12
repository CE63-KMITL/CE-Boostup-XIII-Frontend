export interface Problem {
	id: string;
	title: string;
	author: {
		id: string;
		icon: string;
		name: string;
	};
	description?: string;
	tags: string[];
	difficulty: 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
	status: string;
	devStatus: string;
}

export const tagsColors: { [key: string]: string } = {
	"Basic I/O": "#a98a58",
	"If - else": "#d4b57c",
	Loop: "#8fbc8f",
	Array: "#9370db",
	Pattern: "#8b5f65",
};

export const statusColors: { [key: string]: string } = {
	"Not Started": "var(--status-not-started)",
	"In Progress": "var(--status-in-progress)",
	Done: "var(--status-done)",
};

export const statusText: { [key: string]: string } = {
	"Not Started": "ยังไม่ได้ลองทำ",
	"In Progress": "ลองทำแล้ว",
	Done: "ผ่านแล้ว",
};

export const statusStaffColors: { [key: string]: string } = {
	"In Progress": "var(--status-in-progress)",
	"Need Review": "var(--used-time)",
	Published: "var(--status-done)",
	Rejected: "var(--status-not-started)",
	Archived: "โดนสั่งเก็บ",
};

export const statusStaffText: { [key: string]: string } = {
	"In Progress": "กำลังแก้ไข",
	"Need Review": "ต้องตรวจสอบ",
	Published: "เผยแพร่แล้ว",
	Rejected: "ถูกปฏิเสธดั่งเขาไม่รับรัก",
	Archived: "โดนสั่งเก็บ",
};
