export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","favicon.png","img/B_RBm_Skzl_Logo_DE_V_PT_RGB.svg","img/kiezlabor.svg","img/logo-berlin-seninnds-de.svg","img/logo-citylab-berlin.svg","img/logo-odis-berlin.svg","img/logo-technologiestiftung-berlin-de.svg","img/logo-tsb.svg","img/opengraph-800x600.png","img/twitter.png","tiles/.DS_Store","tiles/10/.DS_Store","tiles/10/549/335.pbf","tiles/10/549/336.pbf","tiles/10/550/335.pbf","tiles/10/550/336.pbf","tiles/10/551/336.pbf","tiles/11/.DS_Store","tiles/11/1098/670.pbf","tiles/11/1098/671.pbf","tiles/11/1098/672.pbf","tiles/11/1099/670.pbf","tiles/11/1099/671.pbf","tiles/11/1099/672.pbf","tiles/11/1100/670.pbf","tiles/11/1100/671.pbf","tiles/11/1100/672.pbf","tiles/11/1100/673.pbf","tiles/11/1101/670.pbf","tiles/11/1101/671.pbf","tiles/11/1101/672.pbf","tiles/11/1101/673.pbf","tiles/11/1102/672.pbf","tiles/12/.DS_Store","tiles/12/2196/1345.pbf","tiles/12/2197/1341.pbf","tiles/12/2197/1342.pbf","tiles/12/2197/1343.pbf","tiles/12/2197/1344.pbf","tiles/12/2197/1345.pbf","tiles/12/2198/1341.pbf","tiles/12/2198/1342.pbf","tiles/12/2198/1343.pbf","tiles/12/2198/1344.pbf","tiles/12/2198/1345.pbf","tiles/12/2199/1340.pbf","tiles/12/2199/1341.pbf","tiles/12/2199/1342.pbf","tiles/12/2199/1343.pbf","tiles/12/2199/1344.pbf","tiles/12/2199/1345.pbf","tiles/12/2200/1340.pbf","tiles/12/2200/1341.pbf","tiles/12/2200/1342.pbf","tiles/12/2200/1343.pbf","tiles/12/2200/1344.pbf","tiles/12/2200/1345.pbf","tiles/12/2200/1346.pbf","tiles/12/2201/1340.pbf","tiles/12/2201/1341.pbf","tiles/12/2201/1342.pbf","tiles/12/2201/1343.pbf","tiles/12/2201/1344.pbf","tiles/12/2201/1345.pbf","tiles/12/2202/1341.pbf","tiles/12/2202/1342.pbf","tiles/12/2202/1343.pbf","tiles/12/2202/1344.pbf","tiles/12/2202/1345.pbf","tiles/12/2202/1346.pbf","tiles/12/2203/1342.pbf","tiles/12/2203/1343.pbf","tiles/12/2203/1344.pbf","tiles/12/2203/1345.pbf","tiles/12/2203/1346.pbf","tiles/12/2204/1344.pbf","tiles/12/2204/1345.pbf","tiles/13/.DS_Store","tiles/13/4393/2690.pbf","tiles/13/4394/2683.pbf","tiles/13/4394/2684.pbf","tiles/13/4394/2685.pbf","tiles/13/4394/2686.pbf","tiles/13/4394/2687.pbf","tiles/13/4394/2688.pbf","tiles/13/4394/2689.pbf","tiles/13/4394/2690.pbf","tiles/13/4394/2691.pbf","tiles/13/4395/2683.pbf","tiles/13/4395/2684.pbf","tiles/13/4395/2685.pbf","tiles/13/4395/2686.pbf","tiles/13/4395/2687.pbf","tiles/13/4395/2688.pbf","tiles/13/4395/2689.pbf","tiles/13/4395/2690.pbf","tiles/13/4395/2691.pbf","tiles/13/4396/2682.pbf","tiles/13/4396/2683.pbf","tiles/13/4396/2684.pbf","tiles/13/4396/2685.pbf","tiles/13/4396/2686.pbf","tiles/13/4396/2687.pbf","tiles/13/4396/2688.pbf","tiles/13/4396/2689.pbf","tiles/13/4396/2690.pbf","tiles/13/4397/2682.pbf","tiles/13/4397/2683.pbf","tiles/13/4397/2684.pbf","tiles/13/4397/2685.pbf","tiles/13/4397/2686.pbf","tiles/13/4397/2687.pbf","tiles/13/4397/2688.pbf","tiles/13/4397/2689.pbf","tiles/13/4397/2690.pbf","tiles/13/4398/2681.pbf","tiles/13/4398/2682.pbf","tiles/13/4398/2683.pbf","tiles/13/4398/2684.pbf","tiles/13/4398/2685.pbf","tiles/13/4398/2686.pbf","tiles/13/4398/2687.pbf","tiles/13/4398/2688.pbf","tiles/13/4398/2689.pbf","tiles/13/4398/2690.pbf","tiles/13/4398/2691.pbf","tiles/13/4399/2682.pbf","tiles/13/4399/2683.pbf","tiles/13/4399/2684.pbf","tiles/13/4399/2685.pbf","tiles/13/4399/2686.pbf","tiles/13/4399/2687.pbf","tiles/13/4399/2688.pbf","tiles/13/4399/2689.pbf","tiles/13/4399/2690.pbf","tiles/13/4399/2691.pbf","tiles/13/4400/2681.pbf","tiles/13/4400/2682.pbf","tiles/13/4400/2683.pbf","tiles/13/4400/2684.pbf","tiles/13/4400/2685.pbf","tiles/13/4400/2686.pbf","tiles/13/4400/2687.pbf","tiles/13/4400/2688.pbf","tiles/13/4400/2689.pbf","tiles/13/4400/2690.pbf","tiles/13/4400/2691.pbf","tiles/13/4401/2681.pbf","tiles/13/4401/2682.pbf","tiles/13/4401/2683.pbf","tiles/13/4401/2684.pbf","tiles/13/4401/2685.pbf","tiles/13/4401/2686.pbf","tiles/13/4401/2687.pbf","tiles/13/4401/2688.pbf","tiles/13/4401/2689.pbf","tiles/13/4401/2690.pbf","tiles/13/4401/2691.pbf","tiles/13/4402/2680.pbf","tiles/13/4402/2681.pbf","tiles/13/4402/2682.pbf","tiles/13/4402/2683.pbf","tiles/13/4402/2684.pbf","tiles/13/4402/2685.pbf","tiles/13/4402/2686.pbf","tiles/13/4402/2687.pbf","tiles/13/4402/2688.pbf","tiles/13/4402/2689.pbf","tiles/13/4402/2690.pbf","tiles/13/4402/2691.pbf","tiles/13/4403/2681.pbf","tiles/13/4403/2682.pbf","tiles/13/4403/2683.pbf","tiles/13/4403/2684.pbf","tiles/13/4403/2685.pbf","tiles/13/4403/2686.pbf","tiles/13/4403/2687.pbf","tiles/13/4403/2688.pbf","tiles/13/4403/2689.pbf","tiles/13/4403/2690.pbf","tiles/13/4403/2691.pbf","tiles/13/4404/2683.pbf","tiles/13/4404/2684.pbf","tiles/13/4404/2685.pbf","tiles/13/4404/2686.pbf","tiles/13/4404/2687.pbf","tiles/13/4404/2688.pbf","tiles/13/4404/2689.pbf","tiles/13/4404/2690.pbf","tiles/13/4404/2691.pbf","tiles/13/4405/2684.pbf","tiles/13/4405/2685.pbf","tiles/13/4405/2686.pbf","tiles/13/4405/2687.pbf","tiles/13/4405/2688.pbf","tiles/13/4405/2689.pbf","tiles/13/4405/2690.pbf","tiles/13/4405/2691.pbf","tiles/13/4405/2692.pbf","tiles/13/4406/2685.pbf","tiles/13/4406/2686.pbf","tiles/13/4406/2687.pbf","tiles/13/4406/2688.pbf","tiles/13/4406/2689.pbf","tiles/13/4406/2690.pbf","tiles/13/4406/2691.pbf","tiles/13/4406/2692.pbf","tiles/13/4406/2693.pbf","tiles/13/4407/2688.pbf","tiles/13/4407/2689.pbf","tiles/13/4407/2690.pbf","tiles/13/4407/2691.pbf","tiles/13/4407/2692.pbf","tiles/13/4408/2688.pbf","tiles/13/4408/2689.pbf","tiles/13/4408/2690.pbf","tiles/13/4408/2691.pbf","tiles/13/4409/2689.pbf","tiles/metadata.json"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml",".json":"application/json"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.9f0f3048.mjs","imports":["_app/immutable/entry/start.9f0f3048.mjs","_app/immutable/chunks/index.1f10dd1a.mjs","_app/immutable/chunks/singletons.34f2d98f.mjs","_app/immutable/chunks/index.3b39a4aa.mjs"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.719462b5.mjs","imports":["_app/immutable/entry/app.719462b5.mjs","_app/immutable/chunks/index.1f10dd1a.mjs"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js')
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
