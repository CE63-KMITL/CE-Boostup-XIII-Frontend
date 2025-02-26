

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/Login/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.Cp84QPVk.js","_app/immutable/chunks/disclose-version.jDRZ-Uhl.js","_app/immutable/chunks/runtime.CjW1g8Ru.js","_app/immutable/chunks/legacy.BB78Cu0g.js"];
export const stylesheets = [];
export const fonts = [];
