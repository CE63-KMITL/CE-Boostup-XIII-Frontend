export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.nr9sR_Kw.js","app":"_app/immutable/entry/app.DXaMv9XJ.js","imports":["_app/immutable/entry/start.nr9sR_Kw.js","_app/immutable/chunks/entry.CXFfQHK7.js","_app/immutable/chunks/runtime.CjW1g8Ru.js","_app/immutable/chunks/index-client.DZP8gCzs.js","_app/immutable/entry/app.DXaMv9XJ.js","_app/immutable/chunks/runtime.CjW1g8Ru.js","_app/immutable/chunks/render.ChYStYkm.js","_app/immutable/chunks/disclose-version.jDRZ-Uhl.js","_app/immutable/chunks/index-client.DZP8gCzs.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/Login",
				pattern: /^\/Login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/Menu",
				pattern: /^\/Menu\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/Problem/Create",
				pattern: /^\/Problem\/Create\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/code",
				pattern: /^\/code\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/home_score",
				pattern: /^\/home_score\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
