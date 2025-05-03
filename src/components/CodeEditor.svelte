<script lang="ts">
	/*
	-------------------------------------------------------
	Imports
	-------------------------------------------------------
	*/
	import Active4D from "monaco-themes/themes/Active4D.json";
	import AllHallowsEve from "monaco-themes/themes/All Hallows Eve.json";
	import Amy from "monaco-themes/themes/Amy.json";
	import BirdsOfParadise from "monaco-themes/themes/Birds of Paradise.json";
	import Blackboard from "monaco-themes/themes/Blackboard.json";
	import BrillianceBlack from "monaco-themes/themes/Brilliance Black.json";
	import BrillianceDull from "monaco-themes/themes/Brilliance Dull.json";
	import ChromeDevTools from "monaco-themes/themes/Chrome DevTools.json";
	import CloudsMidnight from "monaco-themes/themes/Clouds Midnight.json";
	import Clouds from "monaco-themes/themes/Clouds.json";
	import Cobalt from "monaco-themes/themes/Cobalt.json";
	import Cobalt2 from "monaco-themes/themes/Cobalt2.json";
	import Dawn from "monaco-themes/themes/Dawn.json";
	import DominionDay from "monaco-themes/themes/Dominion Day.json";
	import Dracula from "monaco-themes/themes/Dracula.json";
	import Dreamweaver from "monaco-themes/themes/Dreamweaver.json";
	import Eiffel from "monaco-themes/themes/Eiffel.json";
	import EspressoLibre from "monaco-themes/themes/Espresso Libre.json";
	import GitHubDark from "monaco-themes/themes/GitHub Dark.json";
	import GitHubLight from "monaco-themes/themes/GitHub Light.json";
	import GitHub from "monaco-themes/themes/GitHub.json";
	import IDLE from "monaco-themes/themes/IDLE.json";
	import idleFingers from "monaco-themes/themes/idleFingers.json";
	import iPlastic from "monaco-themes/themes/iPlastic.json";
	import Katzenmilch from "monaco-themes/themes/Katzenmilch.json";
	import krTheme from "monaco-themes/themes/krTheme.json";
	import KuroirTheme from "monaco-themes/themes/Kuroir Theme.json";
	import LAZY from "monaco-themes/themes/LAZY.json";
	import MagicWB from "monaco-themes/themes/MagicWB (Amiga).json";
	import MerbivoreSoft from "monaco-themes/themes/Merbivore Soft.json";
	import Merbivore from "monaco-themes/themes/Merbivore.json";
	import monoindustrial from "monaco-themes/themes/monoindustrial.json";
	import MonokaiBright from "monaco-themes/themes/Monokai Bright.json";
	import Monokai from "monaco-themes/themes/Monokai.json";
	import NightOwl from "monaco-themes/themes/Night Owl.json";
	import Nord from "monaco-themes/themes/Nord.json";
	import OceanicNext from "monaco-themes/themes/Oceanic Next.json";
	import PastelsOnDark from "monaco-themes/themes/Pastels on Dark.json";
	import SlushAndPoppies from "monaco-themes/themes/Slush and Poppies.json";
	import Solarizeddark from "monaco-themes/themes/Solarized-dark.json";
	import Solarizedlight from "monaco-themes/themes/Solarized-light.json";
	import SpaceCadet from "monaco-themes/themes/SpaceCadet.json";
	import Sunburst from "monaco-themes/themes/Sunburst.json";
	import Textmate from "monaco-themes/themes/Textmate (Mac Classic).json";
	import TomorrowNightBlue from "monaco-themes/themes/Tomorrow-Night-Blue.json";
	import TomorrowNightBright from "monaco-themes/themes/Tomorrow-Night-Bright.json";
	import TomorrowNightEighties from "monaco-themes/themes/Tomorrow-Night-Eighties.json";
	import TomorrowNight from "monaco-themes/themes/Tomorrow-Night.json";
	import Tomorrow from "monaco-themes/themes/Tomorrow.json";
	import Twilight from "monaco-themes/themes/Twilight.json";
	import UpstreamSunburst from "monaco-themes/themes/Upstream Sunburst.json";
	import VibrantInk from "monaco-themes/themes/Vibrant Ink.json";
	import Xcodedefault from "monaco-themes/themes/Xcode_default.json";
	import Zenburnesque from "monaco-themes/themes/Zenburnesque.json";

	import { onMount } from "svelte";
	import Dropdown from "./Dropdown.svelte";

	/*
	-------------------------------------------------------
	Component State
	-------------------------------------------------------
	*/
	let monaco;
	let editor: HTMLElement;
	let editorInstance;
	const themes = [
		{ name: "VS Dark (Default)", id: "vs-dark" },
		{ name: "VS Light", id: "vs" },
		{ name: "High Contrast Black", id: "hc-black" },
		{ name: "Monokai", id: "monokai" },
		{ name: "Dracula", id: "dracula" },
		{ name: "GitHub Dark", id: "github-dark" },
		{ name: "Active4D", id: "active4d" },
		{ name: "All Hallows Eve", id: "allhallowseve" },
		{ name: "Amy", id: "amy" },
		{ name: "Birds of Paradise", id: "birdsofparadise" },
		{ name: "Blackboard", id: "blackboard" },
		{ name: "Brilliance Black", id: "brillianceblack" },
		{ name: "Brilliance Dull", id: "brilliancedull" },
		{ name: "Chrome DevTools", id: "chromedevtools" },
		{ name: "Clouds", id: "clouds" },
		{ name: "Clouds Midnight", id: "cloudsmidnight" },
		{ name: "Cobalt", id: "cobalt" },
		{ name: "Cobalt2", id: "cobalt2" },
		{ name: "Dawn", id: "dawn" },
		{ name: "Dominion Day", id: "dominionday" },
		{ name: "Dreamweaver", id: "dreamweaver" },
		{ name: "Eiffel", id: "eiffel" },
		{ name: "Espresso Libre", id: "espressolibre" },
		{ name: "GitHub", id: "github" },
		{ name: "GitHub Light", id: "githublight" },
		{ name: "IDLE", id: "idle" },
		{ name: "idleFingers", id: "idlefingers" },
		{ name: "iPlastic", id: "iplastic" },
		{ name: "Katzenmilch", id: "katzenmilch" },
		{ name: "krTheme", id: "krtheme" },
		{ name: "Kuroir Theme", id: "kuroir-theme" },
		{ name: "LAZY", id: "lazy" },
		{ name: "MagicWB (Amiga)", id: "magicwb-amiga" },
		{ name: "Merbivore", id: "merbivore" },
		{ name: "Merbivore Soft", id: "merbivore-soft" },
		{ name: "monoindustrial", id: "monoindustrial" },
		{ name: "Monokai Bright", id: "monokai-bright" },
		{ name: "Night Owl", id: "night-owl" },
		{ name: "Nord", id: "nord" },
		{ name: "Oceanic Next", id: "oceanic-next" },
		{ name: "Pastels on Dark", id: "pastels-on-dark" },
		{ name: "Slush and Poppies", id: "slush-and-poppies" },
		{ name: "Solarized-dark", id: "solarized-dark" },
		{ name: "Solarized-light", id: "solarized-light" },
		{ name: "SpaceCadet", id: "space-cadet" },
		{ name: "Sunburst", id: "sunburst" },
		{ name: "Textmate (Mac Classic)", id: "textmate-mac-classic" },
		{ name: "Tomorrow", id: "tomorrow" },
		{ name: "Tomorrow-Night", id: "tomorrow-night" },
		{ name: "Tomorrow-Night-Blue", id: "tomorrow-night-blue" },
		{ name: "Tomorrow-Night-Bright", id: "tomorrow-night-bright" },
		{ name: "Tomorrow-Night-Eighties", id: "tomorrow-night-eighties" },
		{ name: "Twilight", id: "twilight" },
		{ name: "Upstream Sunburst", id: "upstream-sunburst" },
		{ name: "Vibrant Ink", id: "vibrant-ink" },
		{ name: "Xcode_default", id: "xcode-default" },
		{ name: "Zenburnesque", id: "zenburnesque" },
	];
	let selectedTheme: string = localStorage.getItem("codeEditorTheme") || "dracula";

	/*
	-------------------------------------------------------
	Lifecycle and Editor Initialization
	-------------------------------------------------------
	*/

	export let onChange = null;

	// @ts-ignore
	onMount(async () => {
		// @ts-ignore
		self.MonacoEnvironment = {
			getWorker: function (workerId: string, label: string) {
				const getWorkerModule = (moduleUrl: string, label: string): Worker => {
					// @ts-ignore
					return new Worker(self.MonacoEnvironment.getWorkerUrl(moduleUrl), {
						name: label,
						type: "module",
					});
				};

				switch (label) {
					case "json":
						return getWorkerModule("/monaco-editor/esm/vs/language/json/json.worker?worker", label);
					case "css":
					case "scss":
					case "less":
						return getWorkerModule("/monaco-editor/esm/vs/language/css/css.worker?worker", label);
					case "html":
					case "handlebars":
					case "razor":
						return getWorkerModule("/monaco-editor/esm/vs/language/html/html.worker?worker", label);
					case "typescript":
					case "javascript":
						return getWorkerModule(
							"/monaco-editor/esm/vs/language/typescript/ts.worker?worker",
							label
						);
					default:
						return getWorkerModule("/monaco-editor/esm/vs/editor/editor.worker?worker", label);
				}
			},
		};

		monaco = await import("monaco-editor");

		monaco.editor.defineTheme("monokai", Monokai);
		monaco.editor.defineTheme("dracula", Dracula);
		monaco.editor.defineTheme("github-dark", GitHubDark);
		monaco.editor.defineTheme("active4d", Active4D);
		monaco.editor.defineTheme("allhallowseve", AllHallowsEve);
		monaco.editor.defineTheme("amy", Amy);
		monaco.editor.defineTheme("birdsofparadise", BirdsOfParadise);
		monaco.editor.defineTheme("blackboard", Blackboard);
		monaco.editor.defineTheme("brillianceblack", BrillianceBlack);
		monaco.editor.defineTheme("brilliancedull", BrillianceDull);
		monaco.editor.defineTheme("chromedevtools", ChromeDevTools);
		monaco.editor.defineTheme("clouds", Clouds);
		monaco.editor.defineTheme("cloudsmidnight", CloudsMidnight);
		monaco.editor.defineTheme("cobalt", Cobalt);
		monaco.editor.defineTheme("cobalt2", Cobalt2);
		monaco.editor.defineTheme("dawn", Dawn);
		monaco.editor.defineTheme("dominionday", DominionDay);
		monaco.editor.defineTheme("dreamweaver", Dreamweaver);
		monaco.editor.defineTheme("eiffel", Eiffel);
		monaco.editor.defineTheme("espressolibre", EspressoLibre);
		monaco.editor.defineTheme("github", GitHub);
		monaco.editor.defineTheme("githublight", GitHubLight);
		monaco.editor.defineTheme("idle", IDLE);
		monaco.editor.defineTheme("idlefingers", idleFingers);
		monaco.editor.defineTheme("iplastic", iPlastic);
		monaco.editor.defineTheme("katzenmilch", Katzenmilch);
		monaco.editor.defineTheme("krtheme", krTheme);
		monaco.editor.defineTheme("kuroir-theme", KuroirTheme);
		monaco.editor.defineTheme("lazy", LAZY);
		monaco.editor.defineTheme("magicwb-amiga", MagicWB);
		monaco.editor.defineTheme("merbivore", Merbivore);
		monaco.editor.defineTheme("merbivore-soft", MerbivoreSoft);
		monaco.editor.defineTheme("monoindustrial", monoindustrial);
		monaco.editor.defineTheme("monokai-bright", MonokaiBright);
		monaco.editor.defineTheme("night-owl", NightOwl);
		monaco.editor.defineTheme("nord", Nord);
		monaco.editor.defineTheme("oceanic-next", OceanicNext);
		monaco.editor.defineTheme("pastels-on-dark", PastelsOnDark);
		monaco.editor.defineTheme("slush-and-poppies", SlushAndPoppies);
		monaco.editor.defineTheme("solarized-dark", Solarizeddark);
		monaco.editor.defineTheme("solarized-light", Solarizedlight);
		monaco.editor.defineTheme("space-cadet", SpaceCadet);
		monaco.editor.defineTheme("sunburst", Sunburst);
		monaco.editor.defineTheme("textmate-mac-classic", Textmate);
		monaco.editor.defineTheme("tomorrow", Tomorrow);
		monaco.editor.defineTheme("tomorrow-night", TomorrowNight);
		monaco.editor.defineTheme("tomorrow-night-blue", TomorrowNightBlue);
		monaco.editor.defineTheme("tomorrow-night-bright", TomorrowNightBright);
		monaco.editor.defineTheme("tomorrow-night-eighties", TomorrowNightEighties);
		monaco.editor.defineTheme("twilight", Twilight);
		monaco.editor.defineTheme("upstream-sunburst", UpstreamSunburst);
		monaco.editor.defineTheme("vibrant-ink", VibrantInk);
		monaco.editor.defineTheme("xcode-default", Xcodedefault);
		monaco.editor.defineTheme("zenburnesque", Zenburnesque);

		editorInstance = monaco.editor.create(editor, {
			value: "",
			language: "cpp",
			theme: selectedTheme,
			automaticLayout: true,
		});

		editorInstance.onDidChangeModelContent(function () {
			if (onChange) {
				onChange(editorInstance.getValue());
			}
		});

		return () => {
			editorInstance?.dispose();
		};
	});

	/*
	-------------------------------------------------------
	Reactive Theme Update
	-------------------------------------------------------
	*/
	$: {
		if (editorInstance) {
			monaco.editor.setTheme(selectedTheme);
		}
	}

	/*
	-------------------------------------------------------
	Event Handlers
	-------------------------------------------------------
	*/
	function handleThemeChange(event: CustomEvent<string>) {
		selectedTheme = event.detail;
		localStorage.setItem("codeEditorTheme", selectedTheme);
	}

	export function setValue(value: string) {
		editorInstance?.setValue(value);
	}
</script>

<div class="editorContainer">
	<div class="controls">
		<Dropdown
			label="ธีม Code editor"
			options={themes}
			bind:selectedId={selectedTheme}
			on:change={handleThemeChange}
		/>
	</div>

	<div bind:this={editor} class="editor"></div>
</div>

<style>
	.editorContainer {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.controls {
		padding: 5px 10px;
		display: flex;
		flex-direction: row;
	}

	.editor {
		width: 100%;
		flex-grow: 1;
		min-height: 0;
		border-radius: 10px;
		overflow: hidden;
	}

	:global(.monaco-highlighted-label) {
		color: white;
	}

	:global(.monaco-editor) {
		padding-block: 10px;
	}
</style>
