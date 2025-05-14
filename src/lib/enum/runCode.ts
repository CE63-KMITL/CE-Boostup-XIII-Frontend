export enum RunCodeExitStatusEnum {
	SUCCESS = "SUCCESS",
	TIMEOUT = "TIMEOUT",
	COMPILE_TIMEOUT = "COMPILE_TIMEOUT",
	INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
	COMPILE_ERROR = "COMPILE_ERROR",
	RUNTIME_ERROR = "RUNTIME_ERROR",
	REQUEST_ERROR = "REQUEST_ERROR",
}

export type RunCodeResult = {
	exit_code?: string;
	exit_status?: RunCodeExitStatusEnum;
	output?: string;
	used_time?: number;
	isPass?: boolean;
};
