import { createCookie } from "@remix-run/node";
import { createTypedCookie } from "remix-utils/typed-cookie";
import { z } from "zod";

export const schema = z.enum(["dark", "light", "system"]).default("system");

// this cookie does not possess sensible data but for the fun, base64 and hash function are used to prevent user tempering
const colorSchemeCookie = createCookie("color-scheme", {
    path: "/",
    sameSite: "strict",
    httpOnly: true,
    secrets: ["theBestPa$$w0rdEverThoughtOf!"], // this secret will be moved to an env variable the day the project is put on a server for prod
});

export const typedColorSchemeCookie = createTypedCookie({
    cookie: colorSchemeCookie,
    schema,
});

export async function getColorScheme(request) {
    const colorScheme = await typedColorSchemeCookie.parse(request.headers.get("Cookie") ?? "");
    ;
    return colorScheme ?? "system";
}

export async function setColorScheme(colorScheme) {
    return await typedColorSchemeCookie.serialize(colorScheme);
}

export async function action({ request }) {
    const formData = await request.formData();
    const colorScheme = schema.parse(formData.get("color-scheme"));

    return new Response(null, {
        headers: {
            "Set-Cookie": await typedColorSchemeCookie.serialize(colorScheme),
        },
    });
}