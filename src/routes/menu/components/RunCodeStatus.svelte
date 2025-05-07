<script lang="ts">
	export let status = "";
</script>

<div class="runCodeStatus" data-status={status}></div>

<style lang="scss">
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
