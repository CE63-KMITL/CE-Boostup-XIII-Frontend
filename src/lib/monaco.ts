import type monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
export type { monaco };

import Active4D from "Monaco-themes/themes/Active4D.json";
import AllHallowsEve from "Monaco-themes/themes/All Hallows Eve.json";
import Amy from "Monaco-themes/themes/Amy.json";
import BirdsOfParadise from "Monaco-themes/themes/Birds of Paradise.json";
import Blackboard from "Monaco-themes/themes/Blackboard.json";
import BrillianceBlack from "Monaco-themes/themes/Brilliance Black.json";
import BrillianceDull from "Monaco-themes/themes/Brilliance Dull.json";
import ChromeDevTools from "Monaco-themes/themes/Chrome DevTools.json";
import CloudsMidnight from "Monaco-themes/themes/Clouds Midnight.json";
import Clouds from "Monaco-themes/themes/Clouds.json";
import Cobalt from "Monaco-themes/themes/Cobalt.json";
import Cobalt2 from "Monaco-themes/themes/Cobalt2.json";
import Dawn from "Monaco-themes/themes/Dawn.json";
import DominionDay from "Monaco-themes/themes/Dominion Day.json";
import Dracula from "Monaco-themes/themes/Dracula.json";
import Dreamweaver from "Monaco-themes/themes/Dreamweaver.json";
import Eiffel from "Monaco-themes/themes/Eiffel.json";
import EspressoLibre from "Monaco-themes/themes/Espresso Libre.json";
import GitHubDark from "Monaco-themes/themes/GitHub Dark.json";
import GitHubLight from "Monaco-themes/themes/GitHub Light.json";
import GitHub from "Monaco-themes/themes/GitHub.json";
import IDLE from "Monaco-themes/themes/IDLE.json";
import idleFingers from "Monaco-themes/themes/idleFingers.json";
import iPlastic from "Monaco-themes/themes/iPlastic.json";
import Katzenmilch from "Monaco-themes/themes/Katzenmilch.json";
import krTheme from "Monaco-themes/themes/krTheme.json";
import KuroirTheme from "Monaco-themes/themes/Kuroir Theme.json";
import LAZY from "Monaco-themes/themes/LAZY.json";
import MagicWB from "Monaco-themes/themes/MagicWB (Amiga).json";
import MerbivoreSoft from "Monaco-themes/themes/Merbivore Soft.json";
import Merbivore from "Monaco-themes/themes/Merbivore.json";
import monoindustrial from "Monaco-themes/themes/monoindustrial.json";
import MonokaiBright from "Monaco-themes/themes/Monokai Bright.json";
import Monokai from "Monaco-themes/themes/Monokai.json";
import NightOwl from "Monaco-themes/themes/Night Owl.json";
import Nord from "Monaco-themes/themes/Nord.json";
import OceanicNext from "Monaco-themes/themes/Oceanic Next.json";
import PastelsOnDark from "Monaco-themes/themes/Pastels on Dark.json";
import SlushAndPoppies from "Monaco-themes/themes/Slush and Poppies.json";
import Solarizeddark from "Monaco-themes/themes/Solarized-dark.json";
import Solarizedlight from "Monaco-themes/themes/Solarized-light.json";
import SpaceCadet from "Monaco-themes/themes/SpaceCadet.json";
import Sunburst from "Monaco-themes/themes/Sunburst.json";
import Textmate from "Monaco-themes/themes/Textmate (Mac Classic).json";
import TomorrowNightBlue from "Monaco-themes/themes/Tomorrow-Night-Blue.json";
import TomorrowNightBright from "Monaco-themes/themes/Tomorrow-Night-Bright.json";
import TomorrowNightEighties from "Monaco-themes/themes/Tomorrow-Night-Eighties.json";
import TomorrowNight from "Monaco-themes/themes/Tomorrow-Night.json";
import Tomorrow from "Monaco-themes/themes/Tomorrow.json";
import Twilight from "Monaco-themes/themes/Twilight.json";
import UpstreamSunburst from "Monaco-themes/themes/Upstream Sunburst.json";
import VibrantInk from "Monaco-themes/themes/Vibrant Ink.json";
import Xcodedefault from "Monaco-themes/themes/Xcode_default.json";
import Zenburnesque from "Monaco-themes/themes/Zenburnesque.json";

export const themes = [
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

export let Monaco;

export async function initMonaco() {
	if (Monaco) return;

	self.MonacoEnvironment = {
		getWorker: function (_moduleId: any, label: string) {
			return new editorWorker();
		},
	};

	Monaco = await import("monaco-editor");

	Monaco.editor.defineTheme("monokai", Monokai);
	Monaco.editor.defineTheme("dracula", Dracula);
	Monaco.editor.defineTheme("github-dark", GitHubDark);
	Monaco.editor.defineTheme("active4d", Active4D);
	Monaco.editor.defineTheme("allhallowseve", AllHallowsEve);
	Monaco.editor.defineTheme("amy", Amy);
	Monaco.editor.defineTheme("birdsofparadise", BirdsOfParadise);
	Monaco.editor.defineTheme("blackboard", Blackboard);
	Monaco.editor.defineTheme("brillianceblack", BrillianceBlack);
	Monaco.editor.defineTheme("brilliancedull", BrillianceDull);
	Monaco.editor.defineTheme("chromedevtools", ChromeDevTools);
	Monaco.editor.defineTheme("clouds", Clouds);
	Monaco.editor.defineTheme("cloudsmidnight", CloudsMidnight);
	Monaco.editor.defineTheme("cobalt", Cobalt);
	Monaco.editor.defineTheme("cobalt2", Cobalt2);
	Monaco.editor.defineTheme("dawn", Dawn);
	Monaco.editor.defineTheme("dominionday", DominionDay);
	Monaco.editor.defineTheme("dreamweaver", Dreamweaver);
	Monaco.editor.defineTheme("eiffel", Eiffel);
	Monaco.editor.defineTheme("espressolibre", EspressoLibre);
	Monaco.editor.defineTheme("github", GitHub);
	Monaco.editor.defineTheme("githublight", GitHubLight);
	Monaco.editor.defineTheme("idle", IDLE);
	Monaco.editor.defineTheme("idlefingers", idleFingers);
	Monaco.editor.defineTheme("iplastic", iPlastic);
	Monaco.editor.defineTheme("katzenmilch", Katzenmilch);
	Monaco.editor.defineTheme("krtheme", krTheme);
	Monaco.editor.defineTheme("kuroir-theme", KuroirTheme);
	Monaco.editor.defineTheme("lazy", LAZY);
	Monaco.editor.defineTheme("magicwb-amiga", MagicWB);
	Monaco.editor.defineTheme("merbivore", Merbivore);
	Monaco.editor.defineTheme("merbivore-soft", MerbivoreSoft);
	Monaco.editor.defineTheme("monoindustrial", monoindustrial);
	Monaco.editor.defineTheme("monokai-bright", MonokaiBright);
	Monaco.editor.defineTheme("night-owl", NightOwl);
	Monaco.editor.defineTheme("nord", Nord);
	Monaco.editor.defineTheme("oceanic-next", OceanicNext);
	Monaco.editor.defineTheme("pastels-on-dark", PastelsOnDark);
	Monaco.editor.defineTheme("slush-and-poppies", SlushAndPoppies);
	Monaco.editor.defineTheme("solarized-dark", Solarizeddark);
	Monaco.editor.defineTheme("solarized-light", Solarizedlight);
	Monaco.editor.defineTheme("space-cadet", SpaceCadet);
	Monaco.editor.defineTheme("sunburst", Sunburst);
	Monaco.editor.defineTheme("textmate-mac-classic", Textmate);
	Monaco.editor.defineTheme("tomorrow", Tomorrow);
	Monaco.editor.defineTheme("tomorrow-night", TomorrowNight);
	Monaco.editor.defineTheme("tomorrow-night-blue", TomorrowNightBlue);
	Monaco.editor.defineTheme("tomorrow-night-bright", TomorrowNightBright);
	Monaco.editor.defineTheme("tomorrow-night-eighties", TomorrowNightEighties);
	Monaco.editor.defineTheme("twilight", Twilight);
	Monaco.editor.defineTheme("upstream-sunburst", UpstreamSunburst);
	Monaco.editor.defineTheme("vibrant-ink", VibrantInk);
	Monaco.editor.defineTheme("xcode-default", Xcodedefault);
	Monaco.editor.defineTheme("zenburnesque", Zenburnesque);

	const cKeywords = [
		"auto",
		"break",
		"case",
		"char",
		"const",
		"continue",
		"default",
		"do",
		"double",
		"else",
		"enum",
		"extern",
		"float",
		"for",
		"goto",
		"if",
		"int",
		"long",
		"register",
		"return",
		"short",
		"signed",
		"sizeof",
		"static",
		"struct",
		"switch",
		"typedef",
		"union",
		"unsigned",
		"void",
		"volatile",
		"while",
	];

	const cStdLibFuncs = [
		"printf",
		"scanf",
		"fprintf",
		"fscanf",
		"sprintf",
		"sscanf",
		"fopen",
		"fclose",
		"fread",
		"fwrite",
		"fseek",
		"ftell",
		"rewind",
		"malloc",
		"calloc",
		"realloc",
		"free",
		"strcpy",
		"strncpy",
		"strcat",
		"strncat",
		"strcmp",
		"strncmp",
		"strlen",
		"memcpy",
		"memmove",
		"memcmp",
		"memset",
		"abs",
		"labs",
		"fabs",
		"sqrt",
		"pow",
		"exp",
		"log",
		"log10",
		"sin",
		"cos",
		"tan",
		"time",
		"clock",
		"difftime",
		"mktime",
		"rand",
		"srand",
	];

	const cStdLibHeaders = ["stdio.h", "stdlib.h", "string.h", "math.h", "time.h", "ctype.h", "limits.h", "float.h"];

	const cPreprocessor = [
		"#include",
		"#define",
		"#undef",
		"#if",
		"#ifdef",
		"#ifndef",
		"#else",
		"#elif",
		"#endif",
		"#error",
		"#pragma",
	];

	const cSuggestionsData = [
		...cKeywords.map((kw) => ({
			label: kw,
			kind: Monaco.languages.CompletionItemKind.Keyword,
			insertText: kw,
		})),
		...cStdLibFuncs.map((fn) => ({
			label: fn,
			kind: Monaco.languages.CompletionItemKind.Function,
			insertText: `${fn}($0)`,
		})),
		...cStdLibHeaders.map((h) => ({
			label: h,
			kind: Monaco.languages.CompletionItemKind.Module,
			insertText: h,
		})), // แนะนำชื่อ header เฉยๆ
		...cStdLibHeaders.map((h) => ({
			label: `#include <${h}>`,
			kind: Monaco.languages.CompletionItemKind.Snippet,
			insertText: `#include <${h}>`,
		})),
		...cPreprocessor.map((p) => ({
			label: p,
			kind: Monaco.languages.CompletionItemKind.Keyword,
			insertText: p,
		})),
		{
			label: "main",
			kind: Monaco.languages.CompletionItemKind.Snippet,
			insertText: "int main(int argc, char *argv[]) {\n\t${1}\n\treturn 0;\n}",
			documentation: "Main function snippet",
		},
	];

	let cCompletionProviderRegistration: monaco.IDisposable | null = Monaco.languages.registerCompletionItemProvider(
		"c",
		{
			triggerCharacters: [".", "-", ">", "#", "<", '"'],
			provideCompletionItems: (model: monaco.editor.ITextModel, position: monaco.Position) => {
				const wordInfo = model.getWordUntilPosition(position);
				const currentWord = wordInfo.word;
				const range = {
					startLineNumber: position.lineNumber,
					endLineNumber: position.lineNumber,
					startColumn: wordInfo.startColumn,
					endColumn: wordInfo.endColumn,
				};

				const filteredSuggestions = cSuggestionsData
					.filter((item) => item.label.toLowerCase().startsWith(currentWord.toLowerCase()))
					.map((item) => ({
						...item,
						range: range,
					}));

				const textUntilPosition = model.getValueInRange({
					startLineNumber: position.lineNumber,
					startColumn: 1,
					endLineNumber: position.lineNumber,
					endColumn: position.column,
				});
				if (textUntilPosition.trim().endsWith("#")) {
					const preprocessorSuggestions = cPreprocessor.map((p) => ({
						label: p,
						kind: Monaco.languages.CompletionItemKind.Keyword,
						insertText: p.substring(1),
						range: { ...range, startColumn: position.column },
					}));
					return { suggestions: preprocessorSuggestions };
				}

				return { suggestions: filteredSuggestions };
			},
		}
	);

	return cCompletionProviderRegistration;
}
