const dev = "http://localhost:8080";
const prod = "https://facebook-automate-1526f.ew.r.appspot.com";

export const config = {
	apiUrl: location.host.includes("localhost") ? dev : prod,
};
