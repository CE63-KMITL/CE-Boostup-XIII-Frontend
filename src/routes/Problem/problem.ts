export interface Problem {
	id: string;
	title: string;
	author: string;
	tags: string[];
	difficulty: 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
	status: "Done" | "In Progress" | "Not Started";
}

/*
-------------------------------------------------------
Problems data
-------------------------------------------------------
*/
export const testProblems: (Problem | string)[] = [
	{
		id: "P001",
		title: "Sum of Two Numbers",
		author: "John Doe",
		tags: ["Basic I/O", "Math"],
		difficulty: 1,
		status: "Done",
	},
	{
		id: "P002",
		title: "Calculate Average",
		author: "Jane Smith",
		tags: ["Basic I/O", "Math", "Array"],
		difficulty: 1.5,
		status: "In Progress",
	},
	{
		id: "P003",
		title: "Even or Odd",
		author: "Peter Jones",
		tags: ["Basic I/O", "If - else"],
		difficulty: 2,
		status: "In Progress",
	},
	{
		id: "F001",
		title: "Find Max Value",
		author: "Alice Brown",
		tags: ["If - else", "Array"],
		difficulty: 2.5,
		status: "Not Started",
	},
	{
		id: "F002",
		title: "Grade Calculator",
		author: "Bob Williams",
		tags: ["If - else", "Math"],
		difficulty: 2,
		status: "Not Started",
	},
	{
		id: "L001",
		title: "Factorial",
		author: "Charlie Davis",
		tags: ["Loop", "Math"],
		difficulty: 1,
		status: "Not Started",
	},
	{
		id: "L002",
		title: "Fibonacci Sequence",
		author: "Diana Miller",
		tags: ["Loop", "Math", "Array"],
		difficulty: 1,
		status: "Not Started",
	},
	{
		id: "A001",
		title: "Array Sum",
		author: "Ethan Wilson",
		tags: ["Array", "Loop"],
		difficulty: 1,
		status: "Not Started",
	},
	{
		id: "A002",
		title: "Reverse Array",
		author: "Fiona Moore",
		tags: ["Array", "Loop"],
		difficulty: 2,
		status: "Not Started",
	},
	{
		id: "PT01",
		title: "Right Triangle Pattern",
		author: "George Taylor",
		tags: ["Pattern", "Loop"],
		difficulty: 2,
		status: "In Progress",
	},
	{
		id: "PT02",
		title: "Number Pyramid",
		author: "Hannah Clark",
		tags: ["Pattern", "Loop"],
		difficulty: 1,
		status: "In Progress",
	},
	{
		id: "S001",
		title: "String Length",
		author: "Ivy Green",
		tags: ["String", "Basic I/O"],
		difficulty: 1,
		status: "Done",
	},
	{
		id: "S002",
		title: "Palindrome Check",
		author: "Jack White",
		tags: ["String", "Loop", "If - else"],
		difficulty: 2.5,
		status: "In Progress",
	},
	{
		id: "H001",
		title: "Calculate Hypotenuse",
		author: "Kevin Black",
		tags: ["Math", "Basic I/O"],
		difficulty: 2,
		status: "Not Started",
	},
	{
		id: "H002",
		title: "Area of Circle",
		author: "Lily Purple",
		tags: ["Math", "Basic I/O"],
		difficulty: 1.5,
		status: "Done",
	},
	{
		id: "C001",
		title: "Celsius to Fahrenheit",
		author: "Mia Grey",
		tags: ["Conversion", "Math"],
		difficulty: 1,
		status: "Not Started",
	},
	{
		id: "C002",
		title: "Kilograms to Pounds",
		author: "Noah Red",
		tags: ["Conversion", "Math"],
		difficulty: 1,
		status: "In Progress",
	},
	{
		id: "D001",
		title: "Days in Month",
		author: "Olivia Blue",
		tags: ["Date", "If - else"],
		difficulty: 2,
		status: "Not Started",
	},
	{
		id: "D002",
		title: "Leap Year Check",
		author: "Peter Gold",
		tags: ["Date", "If - else"],
		difficulty: 2.5,
		status: "Done",
	},
	{
		id: "R001",
		title: "Random Number Generator",
		author: "Quinn Silver",
		tags: ["Random", "Math"],
		difficulty: 1.5,
		status: "In Progress",
	},
	"loading",
];

export const testDetail = {
	id: "F001",
	title: "Find Max Value",
	author: "John Doe",
	description:
		"Given an array of numbers, your task is to write a program that efficiently finds the maximum value within that array. This is a fundamental problem in computer science and is often used as a building block in more complex algorithms. Consider different approaches to solve this, thinking about time complexity and efficiency.  For example, you might iterate through the array, keeping track of the largest number encountered so far. Pay attention to edge cases, such as empty arrays or arrays with only one element.",
	tags: ["If - else", "Array"],
	difficulty: 2.5,
	status: "Not Started",
};

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

import { writable } from "svelte/store";

/*
-------------------------------------------------------
Problem Store
-------------------------------------------------------
*/
export const selectedProblemId = writable<string | null>(null);
export const searchParams = writable({});
