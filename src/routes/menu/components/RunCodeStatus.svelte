<script lang="ts">
	import type { RunCodeResult } from "$lib/enum/runCode";

	export let result: RunCodeResult = {};
</script>

<div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; width: 100%;">
	<div style="display: flex; flex-direction: row; align-items: center; gap:10px; font-size: 0.8rem">
		<div class="runCodeStatus" data-status={result?.exit_status}></div>
		{result.exit_status || "NOT_RUNNING"}
	</div>

	<div class="status-container">
		<div class="status">
			เวลาที่ใช้ : <div class="used-time">
				{result.used_time == null ? "-" : `${result.used_time} ms`}
			</div>
		</div>
		<div class="status">
			exit code: <div class="exit-code">{result.exit_code == null ? "-" : result.exit_code}</div>
		</div>
	</div>
</div>

<style lang="scss">
	div {
		white-space: nowrap;
	}
	.status-container {
		display: flex;
		gap: var(--n-gap);

		div {
			font-size: 1rem;
		}
	}

	.used-time,
	.exit-code {
		font-weight: 500;
		padding: 3px;
		background: var(--bg);
		border-radius: var(--n-border-radius);
		outline: 1px solid var(--outline);
	}

	.exit-code {
		color: var(--exit-code);
	}

	.used-time {
		color: var(--used-time);
	}

	.status {
		display: flex;
		text-align: end;
		flex-direction: row;
		gap: 5px;
		align-items: center;
	}

	.runCodeStatus {
		width: 10px;
		height: 10px;
		border-radius: 999px;
		aspect-ratio: 1/1;
		font-weight: 700;
	}

	:global(html) {
		--DEFAULT: rgb(105, 105, 105);
		--SUCCESS: rgb(31, 156, 26);
		--TIMEOUT: rgb(26, 147, 156);
		--COMPILE_TIMEOUT: rgb(26, 147, 156);
		--INTERNAL_SERVER_ERROR: rgb(156, 26, 26);
		--RUNNING: rgb(233, 215, 54);
		--COMPILE_ERROR: rgb(156, 26, 26);
		--RUNTIME_ERROR: rgb(156, 26, 26);
		--REQUEST_ERROR: rgb(156, 26, 26);

		.runCodeStatus {
			background: var(--DEFAULT);
		}

		.runCodeStatus[data-status="SUCCESS"] {
			background: var(--SUCCESS);
		}

		.runCodeStatus[data-status="TIMEOUT"] {
			background: var(--TIMEOUT);
		}

		.runCodeStatus[data-status="COMPILE_TIMEOUT"] {
			background: var(--COMPILE_TIMEOUT);
		}

		.runCodeStatus[data-status="INTERNAL_SERVER_ERROR"] {
			background: var(--INTERNAL_SERVER_ERROR);
		}

		.runCodeStatus[data-status="RUNNING"] {
			background: var(--RUNNING);
		}

		.runCodeStatus[data-status="COMPILE_ERROR"] {
			background: var(--COMPILE_ERROR);
		}

		.runCodeStatus[data-status="RUNTIME_ERROR"] {
			background: var(--RUNTIME_ERROR);
		}

		.runCodeStatus[data-status="REQUEST_ERROR"] {
			background: var(--REQUEST_ERROR);
		}
	}

	:global(html[dark]) {
		--DEFAULT: rgb(158, 158, 158);
		--SUCCESS: rgb(101, 224, 97);
		--TIMEOUT: rgb(100, 223, 231);
		--COMPILE_TIMEOUT: rgb(100, 223, 231);
		--INTERNAL_SERVER_ERROR: rgb(224, 186, 81);
		--RUNNING: rgb(224, 186, 81);
		--COMPILE_ERROR: rgb(212, 73, 73);
		--RUNTIME_ERROR: rgb(212, 73, 73);
		--REQUEST_ERROR: rgb(212, 73, 73);
	}
</style>
