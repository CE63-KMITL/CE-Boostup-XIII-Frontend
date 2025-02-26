

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/home_score/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.B4t27Hru.js","_app/immutable/chunks/disclose-version.jDRZ-Uhl.js","_app/immutable/chunks/runtime.CjW1g8Ru.js","_app/immutable/chunks/legacy.BB78Cu0g.js"];
export const stylesheets = ["_app/immutable/assets/4.p_ML2QNB.css"];
export const fonts = [];
