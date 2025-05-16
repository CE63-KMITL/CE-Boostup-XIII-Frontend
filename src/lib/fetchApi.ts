import { goto } from "$app/navigation";
import { getCookie } from "./cookie";
import { showPopup } from "$lib/components/PopUp.svelte";
import { say } from "./normalFunction";

const API_HOST = import.meta.env.VITE_API_HOST;

export async function call(
	route: string,
	options: { method?: string; data?: any; withToken?: boolean } = { method: "GET", data: null, withToken: false }
) {
	try {
		const response = await fetch(`${API_HOST}${route}`, {
			method: options.method,
			headers: {
				"Content-Type": "application/json",
				Authorization: options.withToken ? `Bearer ${getCookie("token")}` : null,
			},
			body: options.data ? JSON.stringify(options.data) : null,
		});

		console.log(route);

		const contentType = response.headers.get("content-type");
		if (contentType && contentType.indexOf("application/json") !== -1) {
			const responseData = await response.json();

			if (responseData.message == "User not found") {
				showPopup(
					say(
						"⚠️ เกิดข้อผิดพลาด\n\nไม่พบข้อมูลผู้ใช้ หรือ เซสชั่นหมดอายุ\n\nกรุณาเข้าสู่ระบบใหม่อีกครั้ง",
						"(*￣3￣)╭"
					)
				);
				goto("/login?clear");
				return;
			}

			console.log(response);

			if (responseData.message) {
				if (responseData.message.includes("Too Many Requests")) {
					showPopup(say("ใจเย็นๆหน่อย~\n\nคุณดูเหนื่อยๆนะดื่มน้ำหน่อยไหม", "♪(´▽｀)"));
					return;
				} else if (responseData.message.includes("Unauthorized")) {
					showPopup(say("กรุณาเข้าสู่ระบบก่อนใช้งาน", "( •̀ ω •́ )✧"));
					return;
				}
			}

			if (!response.ok) {
				showPopup(
					say(
						`${route}\n\n⚠️ เกิดข้อผิดพลาด\n\n${responseData.error ?? ""}\n${
							typeof responseData.message == "object"
								? JSON.stringify(responseData.message)
								: responseData.message
						}`,
						"(┬┬﹏┬┬)"
					)
				);
				return;
			}

			console.log(responseData);

			return await responseData;
		} else {
			return await response.text();
		}
	} catch (error) {
		try {
			if (error.toString().includes("Failed to fetch")) {
				showPopup(
					say(
						"⚠️ เกิดข้อผิดพลาด\n\nไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ โปรดติดต่อ CE63@KMITL",
						"(˘･_･˘)"
					)
				);
			} else {
				showPopup(`${route}\n\n${error}`);
			}
		} catch (error) {}
		return null;
	}
}
