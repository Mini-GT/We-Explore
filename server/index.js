import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, NavLink, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse, Link } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, useState } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
function Navbar() {
  return /* @__PURE__ */ jsx("header", { className: "w-full px-8 text-gray-700 bg-white shadow-sm", children: /* @__PURE__ */ jsx("div", { className: "container flex flex-col md:flex-row items-center justify-between py-5 mx-auto max-w-7xl", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center", children: [
    /* @__PURE__ */ jsx(NavLink, { to: "/", className: "flex items-center mb-5 md:mb-0", children: /* @__PURE__ */ jsxs("span", { className: "text-xl font-black text-gray-900 select-none", children: [
      "W",
      /* @__PURE__ */ jsx("span", { className: "text-indigo-600", children: "Explorer" })
    ] }) }),
    /* @__PURE__ */ jsxs("nav", { className: "flex flex-wrap items-center ml-0 md:ml-8 md:border-l md:pl-8", children: [
      /* @__PURE__ */ jsx(
        NavLink,
        {
          to: "/",
          end: true,
          className: "mr-5 font-medium text-gray-600 hover:text-gray-900",
          children: "Home"
        }
      ),
      /* @__PURE__ */ jsx(
        NavLink,
        {
          to: "/countries",
          className: "mr-5 font-medium text-gray-600 hover:text-gray-900",
          children: "Countries"
        }
      ),
      /* @__PURE__ */ jsx(
        NavLink,
        {
          to: "/about",
          className: "mr-5 font-medium text-gray-600 hover:text-gray-900",
          children: "About"
        }
      )
    ] })
  ] }) }) });
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx(Navbar, {}), /* @__PURE__ */ jsx(Outlet, {})]
  });
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function meta({}) {
  return [{
    title: "WExplorer"
  }, {
    name: "Check out country data!",
    content: "Welcome to WExplorer!"
  }];
}
const home = withComponentProps(function Home() {
  return /* @__PURE__ */ jsx("div", {
    className: "px-2 py-32 bg-white md:px-0",
    children: /* @__PURE__ */ jsx("div", {
      className: "container items-center max-w-6xl mx-auto xl:px-5",
      children: /* @__PURE__ */ jsxs("div", {
        className: "flex flex-wrap items-center sm:-mx-3",
        children: [/* @__PURE__ */ jsx("div", {
          className: "w-full md:w-1/2 md:px-3",
          children: /* @__PURE__ */ jsxs("div", {
            className: "space-y-6 sm:max-w-md lg:max-w-lg",
            children: [/* @__PURE__ */ jsxs("h1", {
              className: "text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl",
              children: [/* @__PURE__ */ jsx("span", {
                className: "block xl:inline",
                children: "Explore Countries with"
              }), /* @__PURE__ */ jsx("span", {
                className: "block text-indigo-600 xl:inline",
                children: "Real-Time Data"
              })]
            }), /* @__PURE__ */ jsx("p", {
              className: "mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl",
              children: "Discover details about every country around the world – from capitals to regions!"
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex flex-col sm:flex-row sm:space-x-4",
              children: [/* @__PURE__ */ jsxs(Link, {
                to: "/countries",
                className: "flex items-center justify-center px-6 py-3 text-lg text-white bg-indigo-600 rounded-md hover:bg-indigo-700",
                children: ["Explore Now", /* @__PURE__ */ jsxs("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  className: "w-5 h-5 ml-1",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  children: [/* @__PURE__ */ jsx("line", {
                    x1: "5",
                    y1: "12",
                    x2: "19",
                    y2: "12"
                  }), /* @__PURE__ */ jsx("polyline", {
                    points: "12 5 19 12 12 19"
                  })]
                })]
              }), /* @__PURE__ */ jsx(Link, {
                to: "/about",
                className: "flex items-center px-6 py-3 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600",
                children: "Learn More"
              })]
            })]
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "w-full md:w-1/2",
          children: /* @__PURE__ */ jsx("div", {
            className: "overflow-hidden rounded-md shadow-xl",
            children: /* @__PURE__ */ jsx("img", {
              src: "https://image.winudf.com/v2/image/Ymx1ZWNhcC5pbWFnZXouYmVhdXRpZnVsX2NvdW50cmllc193YWxscGFwZXJzX3NjcmVlbl8wXzlpMW14OWl1/screen-0.webp?fakeurl=1&type=.webp",
              alt: "Explore countries",
              className: "w-full h-auto"
            })
          })
        })]
      })
    })
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const about = withComponentProps(function About() {
  return /* @__PURE__ */ jsx("div", {
    className: "py-16 bg-white",
    children: /* @__PURE__ */ jsxs("div", {
      className: "container mx-auto px-4 max-w-4xl",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-4xl font-extrabold text-gray-900 mb-6 text-center",
        children: "About This Website"
      }), /* @__PURE__ */ jsxs("p", {
        className: "text-xl text-gray-700 leading-relaxed mb-4",
        children: ["This website uses the", " ", /* @__PURE__ */ jsx("span", {
          className: "font-semibold text-indigo-600",
          children: "REST Countries API"
        }), " ", "to display comprehensive information about countries from around the world."]
      }), /* @__PURE__ */ jsx("p", {
        className: "text-lg text-gray-700 leading-relaxed mb-4",
        children: "Explore our data to learn about country names, capitals, regions, populations, flags, and much more. Whether you’re curious about a particular country or looking for insights about global regions, our interactive explorer makes it easy."
      })]
    })
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: about
}, Symbol.toStringTag, { value: "Module" }));
async function clientLoader$1() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const data = await res.json();
  return data;
}
const countries = withComponentProps(function Countries({
  loaderData
}) {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const filteredCountries = loaderData.filter((country2) => {
    const matchesRegion = !region || country2.region.toLowerCase() === region.toLowerCase();
    const matchesSearch = !search || country2.name.common.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && matchesRegion;
  }).sort((a, b) => {
    if (sortOrder === "highest") {
      return b.population - a.population;
    } else if (sortOrder === "lowest") {
      return a.population - b.population;
    }
    return 0;
  });
  return /* @__PURE__ */ jsxs("div", {
    className: "p-6",
    children: [/* @__PURE__ */ jsx("h2", {
      className: "text-2xl font-bold mb-6 text-gray-900",
      children: "Countries"
    }), /* @__PURE__ */ jsxs("div", {
      className: "flex flex-col sm:flex-row gap-4 mb-6",
      children: [/* @__PURE__ */ jsx("input", {
        type: "text",
        placeholder: "Search by name...",
        value: search,
        onChange: (e) => setSearch(e.target.value),
        className: "border border-gray-300 rounded px-3 py-2 w-full sm:w-1/2 focus:outline-none focus:border-indigo-500"
      }), /* @__PURE__ */ jsxs("select", {
        value: region,
        onChange: (e) => setRegion(e.target.value),
        className: "border border-gray-300 rounded px-3 py-2 w-full sm:w-1/2 focus:outline-none focus:border-indigo-500",
        children: [/* @__PURE__ */ jsx("option", {
          value: "",
          children: "All Regions"
        }), /* @__PURE__ */ jsx("option", {
          value: "africa",
          children: "Africa"
        }), /* @__PURE__ */ jsx("option", {
          value: "americas",
          children: "Americas"
        }), /* @__PURE__ */ jsx("option", {
          value: "asia",
          children: "Asia"
        }), /* @__PURE__ */ jsx("option", {
          value: "europe",
          children: "Europe"
        }), /* @__PURE__ */ jsx("option", {
          value: "oceania",
          children: "Oceania"
        })]
      }), /* @__PURE__ */ jsxs("select", {
        value: sortOrder,
        onChange: (e) => setSortOrder(e.target.value),
        className: "border border-gray-300 rounded px-3 py-2 w-full sm:w-1/2 focus:outline-none focus:border-indigo-500",
        children: [/* @__PURE__ */ jsx("option", {
          value: "",
          children: "Population"
        }), /* @__PURE__ */ jsx("option", {
          value: "highest",
          children: "Highest"
        }), /* @__PURE__ */ jsx("option", {
          value: "lowest",
          children: "Lowest"
        })]
      })]
    }), filteredCountries.length === 0 ? /* @__PURE__ */ jsx("div", {
      children: " No countries match your filters. "
    }) : /* @__PURE__ */ jsx("ul", {
      className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6",
      children: filteredCountries.map((country2) => /* @__PURE__ */ jsxs("li", {
        className: "bg-white border border-gray-200 rounded-xl p-4 shadow hover:shadow-lg transition",
        children: [/* @__PURE__ */ jsx(Link, {
          to: `/countries/${country2.name.common}`,
          className: "text-indigo-600 hover:underline text-lg font-semibold",
          children: country2.name.common
        }), /* @__PURE__ */ jsxs("div", {
          className: "text-gray-600 text-sm mt-1",
          children: ["Region: ", country2.region, " ", /* @__PURE__ */ jsx("br", {}), "Population: ", country2.population.toLocaleString()]
        })]
      }, country2.cca3))
    })]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clientLoader: clientLoader$1,
  default: countries
}, Symbol.toStringTag, { value: "Module" }));
async function clientLoader({
  params
}) {
  const countryName = params.countryName;
  const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
  const data = await res.json();
  return data;
}
const country = withComponentProps(function Country({
  loaderData
}) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const country2 = {
    name: ((_b = (_a = loaderData[0]) == null ? void 0 : _a.name) == null ? void 0 : _b.common) || "N/A",
    officialName: ((_d = (_c = loaderData[0]) == null ? void 0 : _c.name) == null ? void 0 : _d.official) || "N/A",
    region: ((_e = loaderData[0]) == null ? void 0 : _e.region) || "N/A",
    subregion: ((_f = loaderData[0]) == null ? void 0 : _f.subregion) || "N/A",
    capital: ((_g = loaderData[0]) == null ? void 0 : _g.capital) || "N/A",
    population: ((_h = loaderData[0]) == null ? void 0 : _h.population) || "N/A",
    flagUrl: ((_j = (_i = loaderData[0]) == null ? void 0 : _i.flags) == null ? void 0 : _j.png) || ""
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "p-6 grid grid-cols-1 md:grid-cols-2 gap-8",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex flex-col gap-4",
      children: [/* @__PURE__ */ jsx("h2", {
        className: "text-3xl font-bold text-gray-900",
        children: country2.name
      }), /* @__PURE__ */ jsxs("div", {
        className: "space-y-2 text-gray-700",
        children: [/* @__PURE__ */ jsxs("p", {
          children: [/* @__PURE__ */ jsx("span", {
            className: "font-semibold",
            children: "Official Name:"
          }), " ", country2.officialName]
        }), /* @__PURE__ */ jsxs("p", {
          children: [/* @__PURE__ */ jsx("span", {
            className: "font-semibold",
            children: "Capital:"
          }), " ", country2.capital]
        }), /* @__PURE__ */ jsxs("p", {
          children: [/* @__PURE__ */ jsx("span", {
            className: "font-semibold",
            children: "Region:"
          }), " ", country2.region]
        }), /* @__PURE__ */ jsxs("p", {
          children: [/* @__PURE__ */ jsx("span", {
            className: "font-semibold",
            children: "Subregion:"
          }), " ", country2.subregion]
        }), /* @__PURE__ */ jsxs("p", {
          children: [/* @__PURE__ */ jsx("span", {
            className: "font-semibold",
            children: "Population:"
          }), " ", country2.population.toLocaleString()]
        })]
      })]
    }), country2.flagUrl && /* @__PURE__ */ jsx("div", {
      className: "flex justify-center items-center",
      children: /* @__PURE__ */ jsx("img", {
        src: country2.flagUrl,
        className: "w-56 h-auto border rounded shadow-lg"
      })
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clientLoader,
  default: country
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/We-Exploreassets/entry.client-BBQEEHxa.js", "imports": ["/We-Exploreassets/chunk-K6CSEXPM-CQSxDGJ2.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/We-Exploreassets/root-Vwsl0YE7.js", "imports": ["/We-Exploreassets/chunk-K6CSEXPM-CQSxDGJ2.js", "/We-Exploreassets/with-props-BUHJMvrq.js"], "css": ["/We-Exploreassets/root-CSPTkz8r.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/We-Exploreassets/home-DzUsvRDi.js", "imports": ["/We-Exploreassets/with-props-BUHJMvrq.js", "/We-Exploreassets/chunk-K6CSEXPM-CQSxDGJ2.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/about": { "id": "routes/about", "parentId": "root", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/We-Exploreassets/about-D2sDCxYf.js", "imports": ["/We-Exploreassets/with-props-BUHJMvrq.js", "/We-Exploreassets/chunk-K6CSEXPM-CQSxDGJ2.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/countries": { "id": "routes/countries", "parentId": "root", "path": "countries", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": true, "hasErrorBoundary": false, "module": "/We-Exploreassets/countries-DPQJeRQF.js", "imports": ["/We-Exploreassets/with-props-BUHJMvrq.js", "/We-Exploreassets/chunk-K6CSEXPM-CQSxDGJ2.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/country": { "id": "routes/country", "parentId": "root", "path": "countries/:countryName", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": true, "hasErrorBoundary": false, "module": "/We-Exploreassets/country-BGM0lNRG.js", "imports": ["/We-Exploreassets/with-props-BUHJMvrq.js", "/We-Exploreassets/chunk-K6CSEXPM-CQSxDGJ2.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/We-Exploreassets/manifest-a818e609.js", "version": "a818e609" };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const publicPath = "/We-Explore";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/countries": {
    id: "routes/countries",
    parentId: "root",
    path: "countries",
    index: true,
    caseSensitive: void 0,
    module: route3
  },
  "routes/country": {
    id: "routes/country",
    parentId: "root",
    path: "countries/:countryName",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routes,
  ssr
};
