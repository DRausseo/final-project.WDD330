const proxy = "https://api.allorigins.win/get?url=";

export async function getQuote() {
  try {
    const res = await fetch(
      `${proxy}${encodeURIComponent("https://zenquotes.io/api/random")}`
    );
    const data = await res.json();
    const parsed = JSON.parse(data.contents);
    return `"${parsed[0].q}" – ${parsed[0].a}`;
  } catch (e) {
    console.error("Error fetching quote:", e);
    return "Unable to fetch quote.";
  }
}

export async function getActivity() {
  try {
    const res = await fetch(
      `${proxy}${encodeURIComponent("https://www.boredapi.com/api/activity/")}`
    );
    const data = await res.json();
    const parsed = JSON.parse(data.contents);
    return `Try this: ${parsed.activity}`;
  } catch (e) {
    console.error("Error fetching activity:", e);
    return "Unable to fetch activity.";
  }
}
