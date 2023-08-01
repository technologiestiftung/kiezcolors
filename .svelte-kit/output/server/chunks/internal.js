import { c as create_ssr_component, s as setContext, v as validate_component, m as missing_component } from "./index2.js";
const base = "";
let assets = base;
function set_assets(path) {
  assets = path;
}
let public_env = {};
function set_private_env(environment) {
}
function set_public_env(environment) {
  public_env = environment;
}
function afterUpdate() {
}
function set_building() {
}
const Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page } = $$props;
  let { constructors } = $$props;
  let { components = [] } = $$props;
  let { form } = $$props;
  let { data_0 = null } = $$props;
  let { data_1 = null } = $$props;
  {
    setContext("__svelte__", stores);
  }
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.constructors === void 0 && $$bindings.constructors && constructors !== void 0)
    $$bindings.constructors(constructors);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.data_0 === void 0 && $$bindings.data_0 && data_0 !== void 0)
    $$bindings.data_0(data_0);
  if ($$props.data_1 === void 0 && $$bindings.data_1 && data_1 !== void 0)
    $$bindings.data_1(data_1);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      stores.page.set(page);
    }
    $$rendered = `


${constructors[1] ? `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(constructors[1] || missing_component, "svelte:component").$$render(
            $$result,
            { data: data_1, form, this: components[1] },
            {
              this: ($$value) => {
                components[1] = $$value;
                $$settled = false;
              }
            },
            {}
          )}`;
        }
      }
    )}` : `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, form, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {}
    )}`}

${``}`;
  } while (!$$settled);
  return $$rendered;
});
const options = {
  app_template_contains_nonce: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  embedded: false,
  env_public_prefix: "PUBLIC_",
  hooks: null,
  // added lazily, via `get_hooks`
  root: Root,
  service_worker: false,
  templates: {
    app: ({ head, body, assets: assets2, nonce, env }) => '<!DOCTYPE html>\n<html lang="de">\n  <head>\n    <meta charset="utf-8" />\n    <link rel="icon" href="' + assets2 + '/favicon.png" />\n    <meta name="viewport" content="width=device-width" />\n\n    <meta property="og:locale" content="de_DE" />\n    <meta property="og:type" content="website" />\n    <meta property="og:title" content="Kiezcolors" />\n    <meta\n      property="og:description"\n      content="Zeige dir die Flächennutzung in deinem Berliner Kiez an."\n    />\n    <meta property="og:url" content="https://kiezcolors.odis-berlin.de/" />\n    <meta property="og:site_name" content="Kiezcolors" />\n    <meta\n      property="og:image"\n      content="https://kiezcolors.odis-berlin.de/img/twitter.png"\n    />\n\n    <!-- TWITTER -->\n    <meta name="twitter:card" content="summary_large_image" />\n    <meta name="twitter:site" content="@citylabberlin" />\n    <meta name="twitter:creator" content="@citylabberlin" />\n    <meta name="twitter:url" content="https://kiezcolors.odis-berlin.de/" />\n    <meta name="twitter:title" content="Kiezcolors" />\n    <meta\n      name="twitter:description"\n      content="Zeige dir die Flächennutzung in deinem Berliner Kiez an."\n    />\n    <meta\n      name="twitter:image"\n      content="https://kiezcolors.odis-berlin.de/img/twitter.png"\n    />\n\n    ' + head + '\n  </head>\n  <body data-sveltekit-preload-data="hover">\n    <div style="display: contents">' + body + '</div>\n    <script>\n      var _paq = (window._paq = window._paq || []);\n      /* tracker methods like "setCustomDimension" should be called before "trackPageView" */\n      _paq.push(["trackPageView"]);\n      _paq.push(["enableLinkTracking"]);\n      (function () {\n        var u = "https://piwik.technologiestiftung-berlin.de/";\n        _paq.push(["setTrackerUrl", u + "matomo.php"]);\n        _paq.push(["setSiteId", "30"]);\n        var d = document,\n          g = d.createElement("script"),\n          s = d.getElementsByTagName("script")[0];\n        g.async = true;\n        g.src = u + "matomo.js";\n        s.parentNode.insertBefore(g, s);\n      })();\n    <\/script>\n  </body>\n</html>\n',
    error: ({ status, message }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
					Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid #ccc;
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "1byv7iz"
};
function get_hooks() {
  return {};
}
export {
  assets as a,
  base as b,
  set_assets as c,
  set_building as d,
  set_private_env as e,
  get_hooks as g,
  options as o,
  public_env as p,
  set_public_env as s
};
